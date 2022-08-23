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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDictionaryKeyHash = exports.toAccountHashString = exports.installWasmFile = exports.parseEvent = exports.sleep = exports.contractHashToByteArray = exports.contractDictionaryGetter = exports.getContractData = exports.getAccountNamedKeyValue = exports.getAccountInfo = exports.getStateRootHash = exports.getBinary = exports.getKeyPairOfContract = exports.camelCased = void 0;
var casper_js_sdk_1 = require("casper-js-sdk");
var bytes_1 = require("@ethersproject/bytes");
var blakejs_1 = __importDefault(require("blakejs"));
var fs_1 = __importDefault(require("fs"));
var camelCased = function (myString) {
    return myString.replace(/_([a-z])/g, function (g) { return g[1].toUpperCase(); });
};
exports.camelCased = camelCased;
var getKeyPairOfContract = function (pathToFaucet) {
    return casper_js_sdk_1.Keys.Ed25519.parseKeyFiles("".concat(pathToFaucet, "/public_key.pem"), "".concat(pathToFaucet, "/secret_key.pem"));
};
exports.getKeyPairOfContract = getKeyPairOfContract;
var getBinary = function (pathToBinary) {
    return new Uint8Array(fs_1.default.readFileSync(pathToBinary, null).buffer);
};
exports.getBinary = getBinary;
var getStateRootHash = function (nodeAddress) { return __awaiter(_this, void 0, void 0, function () {
    var client, block;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                client = new casper_js_sdk_1.CasperServiceByJsonRPC(nodeAddress);
                return [4, client.getLatestBlockInfo()];
            case 1:
                block = (_a.sent()).block;
                if (block) {
                    return [2, block.header.state_root_hash];
                }
                else {
                    throw Error("Problem when calling getLatestBlockInfo");
                }
                return [2];
        }
    });
}); };
exports.getStateRootHash = getStateRootHash;
var getAccountInfo = function (nodeAddress, publicKey) { return __awaiter(_this, void 0, void 0, function () {
    var stateRootHash, client, accountHash, blockState;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, exports.getStateRootHash)(nodeAddress)];
            case 1:
                stateRootHash = _a.sent();
                client = new casper_js_sdk_1.CasperServiceByJsonRPC(nodeAddress);
                accountHash = publicKey.toAccountHashStr();
                return [4, client.getBlockState(stateRootHash, accountHash, [])];
            case 2:
                blockState = _a.sent();
                return [2, blockState.Account];
        }
    });
}); };
exports.getAccountInfo = getAccountInfo;
var getAccountNamedKeyValue = function (accountInfo, namedKey) {
    var found = accountInfo.namedKeys.find(function (i) { return i.name === namedKey; });
    if (found) {
        return found.key;
    }
    return undefined;
};
exports.getAccountNamedKeyValue = getAccountNamedKeyValue;
var getContractData = function (nodeAddress, stateRootHash, contractHash, path) {
    if (path === void 0) { path = []; }
    return __awaiter(_this, void 0, void 0, function () {
        var client, blockState;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new casper_js_sdk_1.CasperServiceByJsonRPC(nodeAddress);
                    return [4, client.getBlockState(stateRootHash, "hash-".concat(contractHash), path)];
                case 1:
                    blockState = _a.sent();
                    return [2, blockState];
            }
        });
    });
};
exports.getContractData = getContractData;
var contractDictionaryGetter = function (nodeAddress, dictionaryItemKey, seedUref) { return __awaiter(_this, void 0, void 0, function () {
    var stateRootHash, client, storedValue;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, (0, exports.getStateRootHash)(nodeAddress)];
            case 1:
                stateRootHash = _a.sent();
                client = new casper_js_sdk_1.CasperServiceByJsonRPC(nodeAddress);
                return [4, client.getDictionaryItemByURef(stateRootHash, dictionaryItemKey, seedUref)];
            case 2:
                storedValue = _a.sent();
                if (storedValue && storedValue.CLValue instanceof casper_js_sdk_1.CLValue) {
                    return [2, storedValue.CLValue.value()];
                }
                else {
                    throw Error("Invalid stored value");
                }
                return [2];
        }
    });
}); };
exports.contractDictionaryGetter = contractDictionaryGetter;
var contractHashToByteArray = function (contractHash) {
    return Uint8Array.from(Buffer.from(contractHash, "hex"));
};
exports.contractHashToByteArray = contractHashToByteArray;
var sleep = function (num) {
    return new Promise(function (resolve) { return setTimeout(resolve, num); });
};
exports.sleep = sleep;
var parseEvent = function (_a, value) {
    var contractPackageHash = _a.contractPackageHash, eventNames = _a.eventNames, eventsURef = _a.eventsURef;
    if (value.body.DeployProcessed.execution_result.Failure) {
        return {
            error: value.body.DeployProcessed.execution_result.Failure.error_message,
            success: false,
        };
    }
    else {
        var transforms = value.body.DeployProcessed.execution_result.Success.effect.transforms;
        var cep47Events = transforms.reduce(function (acc, val) {
            if (val.transform.hasOwnProperty("WriteCLValue") &&
                typeof val.transform.WriteCLValue.parsed === "object" &&
                val.transform.WriteCLValue.parsed !== null) {
                var maybeCLValue = casper_js_sdk_1.CLValueParsers.fromJSON(val.transform.WriteCLValue);
                var clValue = maybeCLValue.unwrap();
                if (clValue && clValue instanceof casper_js_sdk_1.CLMap) {
                    var hash = clValue.get(casper_js_sdk_1.CLValueBuilder.string("contract_package_hash"));
                    var event_1 = clValue.get(casper_js_sdk_1.CLValueBuilder.string("event_type"));
                    if (hash &&
                        hash.value() === contractPackageHash.toLowerCase() &&
                        event_1 &&
                        eventNames.includes(event_1.value())) {
                        acc = __spreadArray(__spreadArray([], acc, true), [{ name: event_1.value(), clValue: clValue }], false);
                    }
                }
            }
            return acc;
        }, []);
        return { error: null, success: !!cep47Events.length, data: cep47Events };
    }
};
exports.parseEvent = parseEvent;
var installWasmFile = function (_a) {
    var nodeAddress = _a.nodeAddress, keys = _a.keys, chainName = _a.chainName, pathToContract = _a.pathToContract, runtimeArgs = _a.runtimeArgs, paymentAmount = _a.paymentAmount;
    return __awaiter(_this, void 0, void 0, function () {
        var client, deploy;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    client = new casper_js_sdk_1.CasperClient(nodeAddress);
                    deploy = casper_js_sdk_1.DeployUtil.makeDeploy(new casper_js_sdk_1.DeployUtil.DeployParams(casper_js_sdk_1.CLPublicKey.fromHex(keys.publicKey.toHex()), chainName), casper_js_sdk_1.DeployUtil.ExecutableDeployItem.newModuleBytes((0, exports.getBinary)(pathToContract), runtimeArgs), casper_js_sdk_1.DeployUtil.standardPayment(paymentAmount));
                    deploy = client.signDeploy(deploy, keys);
                    return [4, client.putDeploy(deploy)];
                case 1: return [2, _b.sent()];
            }
        });
    });
};
exports.installWasmFile = installWasmFile;
var toAccountHashString = function (hash) {
    return Buffer.from(hash).toString("hex");
};
exports.toAccountHashString = toAccountHashString;
var getDictionaryKeyHash = function (uref, id) {
    var eventsUref = casper_js_sdk_1.CLURef.fromFormattedStr(uref);
    var eventsUrefBytes = eventsUref.value().data;
    var idNum = Uint8Array.from(Buffer.from(id));
    var finalBytes = (0, bytes_1.concat)([eventsUrefBytes, idNum]);
    var blaked = blakejs_1.default.blake2b(finalBytes, undefined, 32);
    var str = Buffer.from(blaked).toString("hex");
    return "dictionary-".concat(str);
};
exports.getDictionaryKeyHash = getDictionaryKeyHash;
//# sourceMappingURL=utils.js.map