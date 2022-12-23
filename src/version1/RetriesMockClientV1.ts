import { FilterParams } from "pip-services3-commons-nodex";
import { PagingParams } from "pip-services3-commons-nodex";
import { IdGenerator } from "pip-services3-commons-nodex";
import { DataPage } from "pip-services3-commons-nodex";

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { RetryV1 } from "./RetryV1";

export class RetriesMockClientV1 implements IRetriesClientV1 {
    private _maxPageSize: number = 100;
    private _items: RetryV1[];
    private readonly _defaultTTL: number = 7 * 24 * 60 * 60 * 1000;

    public constructor(...items: RetryV1[]) {
        this._items = items;
    }

    private composeFilter(filter: FilterParams): any {
        filter = filter || new FilterParams();

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

    private createRetries(group: string, ids: string[], timeToLive: number): RetryV1[] {
        let now = new Date();
        let expirationTime = new Date(Date.now() + timeToLive);
        let result: RetryV1[] = [];

        for (let _id of ids) {
            let retry: RetryV1 = {
                id: _id,
                group: group,
                last_attempt_time: now,
                expiration_time: expirationTime,
                attempt_count: 1
            }
            result.push(retry);
        }
        return result;
    }

    public async addRetry(correlationId: string, group: string, id: string, timeToLive: number): Promise<RetryV1> {
        let retries = await this.addRetries(correlationId, group, [id], timeToLive);
        return retries && retries.length > 0 ? retries[0] : null;
    }

    public async addRetries(correlationId: string, group: string, ids: string[], timeToLive: number): Promise<RetryV1[]> {
        let result: RetryV1[] = [];
        if (group == null || ids == null || ids.length == 0)
            return result;

        let retries: RetryV1[];

        retries = this.createRetries(group, ids, timeToLive);

        let index = retries.length - 1;

        do {
            let retry = retries[index--];
            let item = await this.getRetryById(correlationId, retry.group, retry.id);
            if (item != null) {
                retry.attempt_count = ++item.attempt_count;
                retry.last_attempt_time = new Date();
                let updatedItem = await this.updateRetry(correlationId, retry);
                result.push(updatedItem);
            } else {
                let item = await this.createRetry(correlationId, retry);
                result.push(item);
            }
        } while (index >= 0)

        return result;
    }

    public async getRetryById(correlationId: string, group: string, id: string): Promise<RetryV1> {
        let retries = this._items.filter((x) => { return x.id == id && x.group == group; });
        let retry = retries.length > 0 ? retries[0] : null;
        return retry;
    }

    public async getRetryByIds(correlationId: string, group: string, ids: string[]): Promise<RetryV1[]> {
        let filterRetries = (item: RetryV1) => {
            return ids.indexOf(item.id) >= 0 && item.group == group;
        }
        let retrys = this._items.filter(filterRetries);
        return retrys;
    }

    public async deleteRetry(correlationId: string, group: string, id: string): Promise<void> {
        for (let index = this._items.length - 1; index >= 0; index--) {
            let retry = this._items[index];
            if (retry.group == group
                && retry.id == id) {
                this._items.splice(index, 1);
                break;
            }
        }
    }

    public async getGroupNames(correlationId: string): Promise<string[]> {
        let result: string[] = [];
        for (let retry of this._items) {
            let group = retry.group;
            if (result.indexOf(group) < 0)
                result.push(group);
        }
        return result;
    }

    public async getRetries(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RetryV1>> {
        let filterRetries = this.composeFilter(filter);
        let retrys = this._items.filter(filterRetries);

        // Extract a page
        paging = paging != null ? paging : new PagingParams();
        let skip = paging.getSkip(-1);
        let take = paging.getTake(this._maxPageSize);

        let total = null;
        if (paging.total)
            total = retrys.length;

        if (skip > 0)
            retrys = retrys.slice(skip);
        retrys = retrys.slice(0, take);

        let page = new DataPage<RetryV1>(retrys, total);
        return page;
    }


    private async createRetry(correlationId: string, retry: RetryV1): Promise<RetryV1> {
        if (retry == null)
            return;

        retry = Object.assign({}, retry);
        retry.id = retry.id || IdGenerator.nextLong();

        this._items.push(retry);

        return retry;
    }

    private async updateRetry(correlationId: string, retry: RetryV1): Promise<RetryV1> {
        let index = this._items.map((x) => { return x.id; }).indexOf(retry.id);

        if (index < 0)
            return;

        retry = Object.assign({}, retry);
        this._items[index] = retry;
        return retry;
    }
}