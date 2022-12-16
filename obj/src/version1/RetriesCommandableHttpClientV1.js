"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetriesCommandableHttpClientV1 = void 0;
const pip_services3_rpc_nodex_1 = require("pip-services3-rpc-nodex");
class RetriesCommandableHttpClientV1 extends pip_services3_rpc_nodex_1.CommandableHttpClient {
    constructor() {
        super('v1/retries');
    }
    addRetry(correlationId, group, id, timeToLive) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('add_retry', correlationId, {
                id: id,
                group: group,
                ttl: timeToLive
            });
        });
    }
    addRetries(correlationId, group, ids, timeToLive) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('add_retries', correlationId, {
                ids: ids,
                group: group,
                ttl: timeToLive
            });
        });
    }
    getRetryById(correlationId, group, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_retry_by_id', correlationId, {
                id: id,
                group: group
            });
        });
    }
    getRetryByIds(correlationId, group, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_retry_by_ids', correlationId, {
                ids: ids,
                group: group
            });
        });
    }
    deleteRetry(correlationId, group, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('delete_retry', correlationId, {
                ids: id,
                group: group
            });
        });
    }
    getGroupNames(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_group_names', correlationId, {});
        });
    }
    getRetries(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.callCommand('get_retries', correlationId, {
                filter: filter,
                paging: paging
            });
        });
    }
}
exports.RetriesCommandableHttpClientV1 = RetriesCommandableHttpClientV1;
//# sourceMappingURL=RetriesCommandableHttpClientV1.js.map