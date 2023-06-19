import {
  CLValueBuilder,
  CLTypeBuilder,
  CLPublicKey,
  CLKey,
  CLAccountHash,
  Keys,
  RuntimeArgs,
  CasperClient,
  CLString,
  CLValue,
  DeployUtil,
  PUBLIC_KEY_TYPE,
} from 'casper-js-sdk'

import {
  IContractCallParams,
  RecipientType,
  IContractCallParamsUnsigned,
  IAppendSignature,
} from '../types'
import * as utils from './utils'

export const createRecipientAddress = (recipient: RecipientType): CLKey => {
  if (recipient.clType().toString() === PUBLIC_KEY_TYPE) {
    return new CLKey(
      new CLAccountHash((recipient as CLPublicKey).toAccountHash()),
    )
  } else {
    return new CLKey(recipient)
  }
}

export const toCLMap = (map: Map<string, string>) => {
  const clMap = CLValueBuilder.map([
    CLTypeBuilder.string(),
    CLTypeBuilder.string(),
  ])
  for (const [key, value] of Array.from(map.entries())) {
    clMap.set(CLValueBuilder.string(key), CLValueBuilder.string(value))
  }
  return clMap
}

export const fromCLMap = (map: [CLValue, CLValue][]) => {
  const jsMap = new Map()

  for (const [innerKey, value] of map) {
    jsMap.set(innerKey.value(), value.value())
  }

  return jsMap
}

export const installContract = async (
  chainName: string,
  nodeAddress: string,
  keys: Keys.AsymmetricKey,
  runtimeArgs: RuntimeArgs,
  paymentAmount: string,
  wasmPath: string,
) => {
  const deployHash = await utils.installWasmFile({
    chainName,
    paymentAmount,
    nodeAddress,
    keys,
    pathToContract: wasmPath,
    runtimeArgs,
  })

  if (deployHash !== null) {
    return deployHash
  } else {
    throw Error('Problem with installation')
  }
}

export const setClient = async (
  nodeAddress: string,
  contractHash: string,
  listOfNamedKeys: string[],
) => {
  const stateRootHash = await utils.getStateRootHash(nodeAddress)
  const contractData = await utils.getContractData(
    nodeAddress,
    stateRootHash,
    contractHash,
  )

  const { contractPackageHash, namedKeys } = contractData.Contract!

  const namedKeysParsed = namedKeys.reduce((acc, val) => {
    if (listOfNamedKeys.includes(val.name)) {
      return { ...acc, [utils.camelCased(val.name)]: val.key }
    }
    return acc
  }, {})

  return {
    contractPackageHash,
    namedKeys: namedKeysParsed,
  }
}

export const contractSimpleGetter = async (
  nodeAddress: string,
  contractHash: string,
  key: string[],
) => {
  const stateRootHash = await utils.getStateRootHash(nodeAddress)
  const clValue = await utils.getContractData(
    nodeAddress,
    stateRootHash,
    contractHash,
    key,
  )

  if (clValue && clValue.CLValue instanceof CLValue) {
    return clValue.CLValue!.value()
  } else {
    throw Error('Invalid stored value')
  }
}

export const contractCallFn = async ({
  nodeAddress,
  keys,
  chainName,
  contractHash,
  entryPoint,
  runtimeArgs,
  paymentAmount,
  ttl,
  dependencies = [],
}: IContractCallParams) => {
  const client = new CasperClient(nodeAddress)
  const contractHashAsByteArray = utils.contractHashToByteArray(contractHash)

  const dependenciesBytes = dependencies.map((d: string) =>
    Uint8Array.from(Buffer.from(d, 'hex')),
  )

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      keys.publicKey,
      chainName,
      1,
      ttl,
      dependenciesBytes,
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      entryPoint,
      runtimeArgs,
    ),
    DeployUtil.standardPayment(paymentAmount),
  )

  // Sign deploy.
  deploy = client.signDeploy(deploy, keys)

  // Dispatch deploy to node.
  const deployHash = await client.putDeploy(deploy)

  return deployHash
}

export const createUnsignedContractCallFn = async ({
  nodeAddress,
  publicKey,
  chainName,
  contractHash,
  entryPoint,
  runtimeArgs,
  paymentAmount,
  ttl,
  dependencies = [],
}: IContractCallParamsUnsigned) => {
  const client = new CasperClient(nodeAddress)
  const contractHashAsByteArray = utils.contractHashToByteArray(contractHash)

  const dependenciesBytes = dependencies.map((d: string) =>
    Uint8Array.from(Buffer.from(d, 'hex')),
  )

  let deploy = DeployUtil.makeDeploy(
    new DeployUtil.DeployParams(
      publicKey,
      chainName,
      1,
      ttl,
      dependenciesBytes,
    ),
    DeployUtil.ExecutableDeployItem.newStoredContractByHash(
      contractHashAsByteArray,
      entryPoint,
      runtimeArgs,
    ),
    DeployUtil.standardPayment(paymentAmount),
  )

  return deploy
}

export const appendSignatureToUnsignedDeployAndSend = async ({
  publicKey,
  deploy,
  signature,
  nodeAddress,
}: IAppendSignature) => {
  const client = new CasperClient(nodeAddress)
  const approval = new DeployUtil.Approval()

  approval.signer = publicKey.toHex()
  if (publicKey.isEd25519()) {
    approval.signature = Keys.Ed25519.accountHex(signature)
  } else {
    approval.signature = Keys.Secp256K1.accountHex(signature)
  }

  deploy.approvals.push(approval)

  const deployHash = await client.putDeploy(deploy)

  return [deploy, deployHash]
}
