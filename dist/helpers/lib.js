var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendSignatureToUnsignedDeployAndSend = exports.createUnsignedContractCallFn = exports.contractCallFn = exports.contractSimpleGetter = exports.setClient = exports.installContract = exports.fromCLMap = exports.toCLMap = exports.createRecipientAddress = void 0;
var casper_js_sdk_1 = require("casper-js-sdk");
var utils = __importStar(require("./utils"));
var createRecipientAddress = function (recipient) {
    if (recipient.clType().toString() === casper_js_sdk_1.PUBLIC_KEY_ID) {
        return new casper_js_sdk_1.CLKey(new casper_js_sdk_1.CLAccountHash(recipient.toAccountHash()));
    }
    else {
        return new casper_js_sdk_1.CLKey(recipient);
    }
};
exports.createRecipientAddress = createRecipientAddress;
var toCLMap = function (map) {
    var clMap = casper_js_sdk_1.CLValueBuilder.map([
        casper_js_sdk_1.CLTypeBuilder.string(),
        casper_js_sdk_1.CLTypeBuilder.string(),
    ]);
    for (var _i = 0, _a = Array.from(map.entries()); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        clMap.set(casper_js_sdk_1.CLValueBuilder.string(key), casper_js_sdk_1.CLValueBuilder.string(value));
    }
    return clMap;
};
exports.toCLMap = toCLMap;
var fromCLMap = function (map) {
    var jsMap = new Map();
    for (var _i = 0, map_1 = map; _i < map_1.length; _i++) {
        var _a = map_1[_i], innerKey = _a[0], value = _a[1];
        jsMap.set(innerKey.value(), value.value());
    }
    return jsMap;
};
exports.fromCLMap = fromCLMap;
var installContract = function (chainName, nodeAddress, keys, runtimeArgs, paymentAmount, wasmPath) { return __awaiter(_this, void 0, void 0, function () {
    var deployHash;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, utils.installWasmFile({
                    chainName: chainName,
                    paymentAmount: paymentAmount,
                    nodeAddress: nodeAddress,
                    keys: keys,
                    pathToContract: wasmPath,
                    runtimeArgs: runtimeArgs,
                })];
            case 1:
                deployHash = _a.sent();
                if (deployHash !== null) {
                    return [2, deployHash];
                }
                else {
                    throw Error('Problem with installation');
                }
                return [2];
        }
    });
}); };
exports.installContract = installContract;
var setClient = function (nodeAddress, contractHash, listOfNamedKeys) { return __awaiter(_this, void 0, void 0, function () {
    var stateRootHash, contractData, _a, contractPackageHash, namedKeys, namedKeysParsed;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4, utils.getStateRootHash(nodeAddress)];
            case 1:
                stateRootHash = _b.sent();
                return [4, utils.getContractData(nodeAddress, stateRootHash, contractHash)];
            case 2:
                contractData = _b.sent();
                _a = contractData.Contract, contractPackageHash = _a.contractPackageHash, namedKeys = _a.namedKeys;
                namedKeysParsed = namedKeys.reduce(function (acc, val) {
                    var _a;
                    if (listOfNamedKeys.includes(val.name)) {
                        return __assign(__assign({}, acc), (_a = {}, _a[utils.camelCased(val.name)] = val.key, _a));
                    }
                    return acc;
                }, {});
                return [2, {
                        contractPackageHash: contractPackageHash,
                        namedKeys: namedKeysParsed,
                    }];
        }
    });
}); };
exports.setClient = setClient;
var contractSimpleGetter = function (nodeAddress, contractHash, key) { return __awaiter(_this, void 0, void 0, function () {
    var stateRootHash, clValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, utils.getStateRootHash(nodeAddress)];
            case 1:
                stateRootHash = _a.sent();
                return [4, utils.getContractData(nodeAddress, stateRootHash, contractHash, key)];
            case 2:
                clValue = _a.sent();
                if (clValue && clValue.CLValue instanceof casper_js_sdk_1.CLValue) {
                    return [2, clValue.CLValue.value()];
                }
                else {
                    throw Error('Invalid stored value');
                }
                return [2];
        }
    });
}); };
exports.contractSimpleGetter = contractSimpleGetter;
var contractCallFn = function (_a) {
    var nodeAddress = _a.nodeAddress, keys = _a.keys, chainName = _a.chainName, contractHash = _a.contractHash, entryPoint = _a.entryPoint, runtimeArgs = _a.runtimeArgs, paymentAmount = _a.paymentAmount, ttl = _a.ttl, _b = _a.dependencies, dependencies = _b === void 0 ? [] : _b;
    return __awaiter(_this, void 0, void 0, function () {
        var client, contractHashAsByteArray, dependenciesBytes, deploy, deployHash;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    client = new casper_js_sdk_1.CasperClient(nodeAddress);
                    contractHashAsByteArray = utils.contractHashToByteArray(contractHash);
                    dependenciesBytes = dependencies.map(function (d) {
                        return Uint8Array.from(Buffer.from(d, 'hex'));
                    });
                    deploy = casper_js_sdk_1.DeployUtil.makeDeploy(new casper_js_sdk_1.DeployUtil.DeployParams(keys.publicKey, chainName, 1, ttl, dependenciesBytes), casper_js_sdk_1.DeployUtil.ExecutableDeployItem.newStoredContractByHash(contractHashAsByteArray, entryPoint, runtimeArgs), casper_js_sdk_1.DeployUtil.standardPayment(paymentAmount));
                    deploy = client.signDeploy(deploy, keys);
                    return [4, client.putDeploy(deploy)];
                case 1:
                    deployHash = _c.sent();
                    return [2, deployHash];
            }
        });
    });
};
exports.contractCallFn = contractCallFn;
var createUnsignedContractCallFn = function (_a) {
    var nodeAddress = _a.nodeAddress, publicKey = _a.publicKey, chainName = _a.chainName, contractHash = _a.contractHash, entryPoint = _a.entryPoint, runtimeArgs = _a.runtimeArgs, paymentAmount = _a.paymentAmount, ttl = _a.ttl, _b = _a.dependencies, dependencies = _b === void 0 ? [] : _b;
    return __awaiter(_this, void 0, void 0, function () {
        var client, contractHashAsByteArray, dependenciesBytes, deploy;
        return __generator(this, function (_c) {
            client = new casper_js_sdk_1.CasperClient(nodeAddress);
            contractHashAsByteArray = utils.contractHashToByteArray(contractHash);
            dependenciesBytes = dependencies.map(function (d) {
                return Uint8Array.from(Buffer.from(d, 'hex'));
            });
            deploy = casper_js_sdk_1.DeployUtil.makeDeploy(new casper_js_sdk_1.DeployUtil.DeployParams(publicKey, chainName, 1, ttl, dependenciesBytes), casper_js_sdk_1.DeployUtil.ExecutableDeployItem.newStoredContractByHash(contractHashAsByteArray, entryPoint, runtimeArgs), casper_js_sdk_1.DeployUtil.standardPayment(paymentAmount));
            return [2, deploy];
        });
    });
};
exports.createUnsignedContractCallFn = createUnsignedContractCallFn;
var appendSignatureToUnsignedDeployAndSend = function (_a) {
    var publicKey = _a.publicKey, deploy = _a.deploy, signature = _a.signature, nodeAddress = _a.nodeAddress;
    return __awaiter(_this, void 0, void 0, function () {
        var client, approval, deployHash;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = new casper_js_sdk_1.CasperClient(nodeAddress);
                    approval = new casper_js_sdk_1.DeployUtil.Approval();
                    approval.signer = publicKey.toHex();
                    if (publicKey.isEd25519()) {
                        approval.signature = casper_js_sdk_1.Keys.Ed25519.accountHex(signature);
                    }
                    else {
                        approval.signature = casper_js_sdk_1.Keys.Secp256K1.accountHex(signature);
                    }
                    deploy.approvals.push(approval);
                    return [4, client.putDeploy(deploy)];
                case 1:
                    deployHash = _b.sent();
                    return [2, [deploy, deployHash]];
            }
        });
    });
};
exports.appendSignatureToUnsignedDeployAndSend = appendSignatureToUnsignedDeployAndSend;
//# sourceMappingURL=lib.js.map