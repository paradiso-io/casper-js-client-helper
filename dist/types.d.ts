import { CLAccountHash, CLByteArray, CLPublicKey, Keys, RuntimeArgs, DeployUtil } from 'casper-js-sdk';
export declare type RecipientType = CLPublicKey | CLAccountHash | CLByteArray;
export interface IPendingDeploy {
    deployHash: string;
    deployType: any;
}
export interface IClassContractCallParams {
    keys: Keys.AsymmetricKey;
    entryPoint: string;
    runtimeArgs: RuntimeArgs;
    paymentAmount: string;
    cb?: (deployHash: string) => void;
    ttl: number;
    dependencies?: string[];
}
export interface IClassContractCallParamsUnsigned {
    publicKey: CLPublicKey;
    entryPoint: string;
    runtimeArgs: RuntimeArgs;
    paymentAmount: string;
    cb?: (deployHash: string) => void;
    ttl: number;
    dependencies?: string[];
}
export interface IContractCallParams {
    nodeAddress: string;
    keys: Keys.AsymmetricKey;
    chainName: string;
    contractHash: string;
    entryPoint: string;
    runtimeArgs: RuntimeArgs;
    paymentAmount: string;
    ttl: number;
    dependencies?: string[];
}
export interface IContractCallParamsUnsigned {
    nodeAddress: string;
    publicKey: CLPublicKey;
    chainName: string;
    contractHash: string;
    entryPoint: string;
    runtimeArgs: RuntimeArgs;
    paymentAmount: string;
    ttl: number;
    dependencies?: string[];
}
export interface IAppendSignature {
    publicKey: CLPublicKey;
    deploy: DeployUtil.Deploy;
    signature: Uint8Array;
    nodeAddress: string;
}
