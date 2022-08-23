import { CLKey, Keys, RuntimeArgs, CLValue, DeployUtil } from 'casper-js-sdk';
import { IContractCallParams, RecipientType, IContractCallParamsUnsigned, IAppendSignature } from '../types';
export declare const createRecipientAddress: (recipient: RecipientType) => CLKey;
export declare const toCLMap: (map: Map<string, string>) => import("casper-js-sdk").CLMap<CLValue, CLValue>;
export declare const fromCLMap: (map: [CLValue, CLValue][]) => Map<any, any>;
export declare const installContract: (chainName: string, nodeAddress: string, keys: Keys.AsymmetricKey, runtimeArgs: RuntimeArgs, paymentAmount: string, wasmPath: string) => Promise<string>;
export declare const setClient: (nodeAddress: string, contractHash: string, listOfNamedKeys: string[]) => Promise<{
    contractPackageHash: string;
    namedKeys: {};
}>;
export declare const contractSimpleGetter: (nodeAddress: string, contractHash: string, key: string[]) => Promise<any>;
export declare const contractCallFn: ({ nodeAddress, keys, chainName, contractHash, entryPoint, runtimeArgs, paymentAmount, ttl, dependencies, }: IContractCallParams) => Promise<string>;
export declare const createUnsignedContractCallFn: ({ nodeAddress, publicKey, chainName, contractHash, entryPoint, runtimeArgs, paymentAmount, ttl, dependencies, }: IContractCallParamsUnsigned) => Promise<DeployUtil.Deploy>;
export declare const appendSignatureToUnsignedDeployAndSend: ({ publicKey, deploy, signature, nodeAddress, }: IAppendSignature) => Promise<(string | DeployUtil.Deploy)[]>;
