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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var casper_js_sdk_1 = require("casper-js-sdk");
var constants_1 = require("./constants");
var utils = __importStar(require("./helpers/utils"));
var lib_1 = require("./helpers/lib");
var ContractClient = (function () {
    function ContractClient(nodeAddress, chainName, eventStreamAddress) {
        this.nodeAddress = nodeAddress;
        this.chainName = chainName;
        this.eventStreamAddress = eventStreamAddress;
        this.isListening = false;
        this.pendingDeploys = [];
    }
    ContractClient.prototype.contractCall = function (_a) {
        var keys = _a.keys, paymentAmount = _a.paymentAmount, entryPoint = _a.entryPoint, runtimeArgs = _a.runtimeArgs, cb = _a.cb, _b = _a.ttl, ttl = _b === void 0 ? constants_1.DEFAULT_TTL : _b, _c = _a.dependencies, dependencies = _c === void 0 ? [] : _c;
        return __awaiter(this, void 0, void 0, function () {
            var deployHash;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, (0, lib_1.contractCallFn)({
                            chainName: this.chainName,
                            contractHash: this.contractHash,
                            entryPoint: entryPoint,
                            paymentAmount: paymentAmount,
                            nodeAddress: this.nodeAddress,
                            keys: keys,
                            runtimeArgs: runtimeArgs,
                            ttl: ttl,
                            dependencies: dependencies,
                        })];
                    case 1:
                        deployHash = _d.sent();
                        if (deployHash !== null) {
                            cb && cb(deployHash);
                            return [2, deployHash];
                        }
                        else {
                            throw Error('Invalid Deploy');
                        }
                        return [2];
                }
            });
        });
    };
    ContractClient.prototype.createUnsignedContractCall = function (_a) {
        var publicKey = _a.publicKey, paymentAmount = _a.paymentAmount, entryPoint = _a.entryPoint, runtimeArgs = _a.runtimeArgs, cb = _a.cb, _b = _a.ttl, ttl = _b === void 0 ? constants_1.DEFAULT_TTL : _b, _c = _a.dependencies, dependencies = _c === void 0 ? [] : _c;
        return __awaiter(this, void 0, void 0, function () {
            var deploy;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4, (0, lib_1.createUnsignedContractCallFn)({
                            chainName: this.chainName,
                            contractHash: this.contractHash,
                            entryPoint: entryPoint,
                            paymentAmount: paymentAmount,
                            nodeAddress: this.nodeAddress,
                            publicKey: publicKey,
                            runtimeArgs: runtimeArgs,
                            ttl: ttl,
                            dependencies: dependencies,
                        })];
                    case 1:
                        deploy = _d.sent();
                        return [2, deploy];
                }
            });
        });
    };
    ContractClient.prototype.putSignatureAndSend = function (_a) {
        var publicKey = _a.publicKey, deploy = _a.deploy, signature = _a.signature, nodeAddress = _a.nodeAddress;
        return __awaiter(this, void 0, void 0, function () {
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
    ContractClient.prototype.addPendingDeploy = function (deployType, deployHash) {
        this.pendingDeploys = __spreadArray(__spreadArray([], this.pendingDeploys, true), [{ deployHash: deployHash, deployType: deployType }], false);
    };
    ContractClient.prototype.handleEvents = function (eventNames, callback) {
        var _this = this;
        if (!this.eventStreamAddress) {
            throw Error('Please set eventStreamAddress before!');
        }
        if (this.isListening) {
            throw Error('Only one event listener can be create at a time. Remove the previous one and start new.');
        }
        var es = new casper_js_sdk_1.EventStream(this.eventStreamAddress);
        this.isListening = true;
        es.subscribe(casper_js_sdk_1.EventName.DeployProcessed, function (value) {
            var deployHash = value.body.DeployProcessed.deploy_hash;
            var pendingDeploy = _this.pendingDeploys.find(function (pending) { return pending.deployHash === deployHash; });
            if (!pendingDeploy) {
                return;
            }
            var parsedEvent = utils.parseEvent({
                contractPackageHash: _this.contractPackageHash,
                eventNames: eventNames,
                eventsURef: _this.namedKeys.events,
            }, value);
            if (parsedEvent.error !== null) {
                callback(pendingDeploy.deployType, {
                    deployHash: deployHash,
                    error: parsedEvent.error,
                    success: false,
                }, null);
            }
            else {
                parsedEvent.data.forEach(function (d) {
                    return callback(d.name, { deployHash: deployHash, error: null, success: true }, d.clValue);
                });
            }
            _this.pendingDeploys = _this.pendingDeploys.filter(function (pending) { return pending.deployHash !== deployHash; });
        });
        es.start();
        return {
            stopListening: function () {
                es.unsubscribe(casper_js_sdk_1.EventName.DeployProcessed);
                es.stop();
                _this.isListening = false;
                _this.pendingDeploys = [];
            },
        };
    };
    return ContractClient;
}());
exports.default = ContractClient;
//# sourceMappingURL=casper-contract-client.js.map