import { Keys, RuntimeArgs } from "casper-js-sdk";
export declare const camelCased: (myString: string) => string;
export declare const getKeyPairOfContract: (pathToFaucet: string) => Keys.AsymmetricKey;
export declare const getBinary: (pathToBinary: string) => Uint8Array;
export declare const getStateRootHash: (nodeAddress: string) => Promise<string>;
export declare const getAccountInfo: any;
export declare const getAccountNamedKeyValue: (accountInfo: any, namedKey: string) => any;
export declare const getContractData: (nodeAddress: string, stateRootHash: string, contractHash: string, path?: string[]) => Promise<import("casper-js-sdk").StoredValue>;
export declare const contractDictionaryGetter: (nodeAddress: string, dictionaryItemKey: string, seedUref: string) => Promise<any>;
export declare const contractHashToByteArray: (contractHash: string) => Uint8Array;
export declare const sleep: (num: number) => Promise<unknown>;
export declare const parseEvent: ({ contractPackageHash, eventNames, eventsURef }: {
    contractPackageHash: string;
    eventNames: any[];
    eventsURef: string;
}, value: any) => {
    error: any;
    success: boolean;
    data?: undefined;
} | {
    error: any;
    success: boolean;
    data: any;
};
interface IInstallParams {
    nodeAddress: string;
    keys: Keys.AsymmetricKey;
    chainName: string;
    pathToContract: string;
    runtimeArgs: RuntimeArgs;
    paymentAmount: string;
}
export declare const installWasmFile: ({ nodeAddress, keys, chainName, pathToContract, runtimeArgs, paymentAmount, }: IInstallParams) => Promise<string>;
export declare const toAccountHashString: (hash: Uint8Array) => string;
export declare const getDictionaryKeyHash: (uref: string, id: string) => string;
export {};
