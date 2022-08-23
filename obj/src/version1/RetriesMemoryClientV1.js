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
exports.RetriesMemoryClientV1 = void 0;
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_2 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_3 = require("pip-services3-commons-nodex");
const pip_services3_commons_nodex_4 = require("pip-services3-commons-nodex");
class RetriesMemoryClientV1 {
    constructor(...items) {
        this._maxPageSize = 100;
        this._defaultTTL = 7 * 24 * 60 * 60 * 1000;
        this._items = items;
    }
    composeFilter(filter) {
        filter = filter || new pip_services3_commons_nodex_1.FilterParams();
        let id = filter.getAsNullableString('id');
        let group = filter.getAsNullableString('group');
        let attempt_count = filter.getAsNullableString('attempt_count');
        let last_attempt_time = filter.getAsNullableBoolean('last_attempt_time');
        let ids = filter.getAsObject('ids');
        // Process ids filter
        if (typeof ids === 'string')
            ids = ids.split(',');
        if (!Array.isArray(ids))
            ids = null;
        return (item) => {
            if (id && item.id != id)
                return false;
            if (ids && ids.indexOf(item.id) < 0)
                return false;
            if (group && item.group != group)
                return false;
            if (attempt_count && item.customer_id != attempt_count)
                return false;
            if (last_attempt_time != null && item.saved != last_attempt_time)
                return false;
            return true;
        };
    }
    createRetries(group, ids, timeToLive) {
        let now = new Date();
        let expirationTime = new Date(Date.now() + timeToLive);
        let result = [];
        for (let _id of ids) {
            let retry = {
                id: _id,
                group: group,
                last_attempt_time: now,
                expiration_time: expirationTime,
                attempt_count: 1
            };
            result.push(retry);
        }
        return result;
    }
    addRetry(correlationId, group, id, timeToLive) {
        return __awaiter(this, void 0, void 0, function* () {
            let retries = yield this.addRetries(correlationId, group, [id], timeToLive);
            return retries && retries.length > 0 ? retries[0] : null;
        });
    }
    addRetries(correlationId, group, ids, timeToLive) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            if (group == null || ids == null || ids.length == 0)
                return result;
            let retries;
            retries = this.createRetries(group, ids, timeToLive);
            let index = retries.length - 1;
            do {
                let retry = retries[index--];
                let item = yield this.getRetryById(correlationId, retry.group, retry.id);
                if (item != null) {
                    retry.attempt_count = ++item.attempt_count;
                    retry.last_attempt_time = new Date();
                    let updatedItem = yield this.updateRetry(correlationId, retry);
                    result.push(updatedItem);
                }
                else {
                    let item = yield this.createRetry(correlationId, retry);
                    result.push(item);
                }
            } while (index >= 0);
            return result;
        });
    }
    getRetryById(correlationId, group, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let retries = this._items.filter((x) => { return x.id == id && x.group == group; });
            let retry = retries.length > 0 ? retries[0] : null;
            return retry;
        });
    }
    getRetryByIds(correlationId, group, ids) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterRetries = (item) => {
                return ids.indexOf(item.id) >= 0 && item.group == group;
            };
            let retrys = this._items.filter(filterRetries);
            return retrys;
        });
    }
    deleteRetry(correlationId, group, id) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let index = this._items.length - 1; index >= 0; index--) {
                let retry = this._items[index];
                if (retry.group == group
                    && retry.id == id) {
                    this._items.splice(index, 1);
                    break;
                }
            }
        });
    }
    getGroupNames(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = [];
            for (let retry of this._items) {
                let group = retry.group;
                if (result.indexOf(group) < 0)
                    result.push(group);
            }
            return result;
        });
    }
    getRetries(correlationId, filter, paging) {
        return __awaiter(this, void 0, void 0, function* () {
            let filterRetries = this.composeFilter(filter);
            let retrys = this._items.filter(filterRetries);
            // Extract a page
            paging = paging != null ? paging : new pip_services3_commons_nodex_2.PagingParams();
            let skip = paging.getSkip(-1);
            let take = paging.getTake(this._maxPageSize);
            let total = null;
            if (paging.total)
                total = retrys.length;
            if (skip > 0)
                retrys = retrys.slice(skip);
            retrys = retrys.slice(0, take);
            let page = new pip_services3_commons_nodex_4.DataPage(retrys, total);
            return page;
        });
    }
    createRetry(correlationId, retry) {
        return __awaiter(this, void 0, void 0, function* () {
            if (retry == null)
                return;
            retry = Object.assign({}, retry);
            retry.id = retry.id || pip_services3_commons_nodex_3.IdGenerator.nextLong();
            this._items.push(retry);
            return retry;
        });
    }
    updateRetry(correlationId, retry) {
        return __awaiter(this, void 0, void 0, function* () {
            let index = this._items.map((x) => { return x.id; }).indexOf(retry.id);
            if (index < 0)
                return;
            retry = Object.assign({}, retry);
            this._items[index] = retry;
            return retry;
        });
    }
}
exports.RetriesMemoryClientV1 = RetriesMemoryClientV1;
//# sourceMappingURL=RetriesMemoryClientV1.js.map