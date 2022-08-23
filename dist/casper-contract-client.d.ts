import { DeployUtil } from 'casper-js-sdk';
import { IPendingDeploy, IClassContractCallParams, IClassContractCallParamsUnsigned, IAppendSignature } from './types';
declare class ContractClient {
    nodeAddress: string;
    chainName: string;
    eventStreamAddress?: string;
    contractHash?: string;
    contractPackageHash?: string;
    protected namedKeys?: any;
    protected isListening: boolean;
    protected pendingDeploys: IPendingDeploy[];
    constructor(nodeAddress: string, chainName: string, eventStreamAddress?: string);
    contractCall({ keys, paymentAmount, entryPoint, runtimeArgs, cb, ttl, dependencies, }: IClassContractCallParams): Promise<string>;
    createUnsignedContractCall({ publicKey, paymentAmount, entryPoint, runtimeArgs, cb, ttl, dependencies, }: IClassContractCallParamsUnsigned): Promise<DeployUtil.Deploy>;
    putSignatureAndSend({ publicKey, deploy, signature, nodeAddress, }: IAppendSignature): Promise<(string | DeployUtil.Deploy)[]>;
    protected addPendingDeploy(deployType: any, deployHash: string): void;
    handleEvents(eventNames: any[], callback: (eventName: any, deployStatus: {
        deployHash: string;
        success: boolean;
        error: string | null;
    }, result: any | null) => void): any;
}
export default ContractClient;
