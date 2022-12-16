import { FilterParams } from "pip-services3-commons-nodex";
import { PagingParams } from "pip-services3-commons-nodex";
import { Descriptor } from "pip-services3-commons-nodex";
import { DataPage } from "pip-services3-commons-nodex";

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { DirectClient } from 'pip-services3-rpc-nodex';
import { RetryV1 } from "./RetryV1";

export class RetriesDirectClientV1 extends DirectClient<any> implements IRetriesClientV1 {

    public constructor() {
        super();
        this._dependencyResolver.put('controller', new Descriptor('service-retries', 'controller', '*', '*', '1.0'));
    }

    public async addRetry(correlationId: string, group: string, id: string, timeToLive: number): Promise<RetryV1> {
        let timing = this.instrument(correlationId, 'retries.add_retry');

        try {
            let res = await this._controller.addRetry(correlationId, group, id, timeToLive);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async addRetries(correlationId: string, group: string, ids: string[], timeToLive: number): Promise<RetryV1[]> {
        let timing = this.instrument(correlationId, 'retries.add_retries');

        try {
            let res = await this._controller.addRetries(correlationId, group, ids, timeToLive);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async getRetryById(correlationId: string, group: string, id: string): Promise<RetryV1> {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_id');
        
        try {
            let res = await this._controller.getRetryById(correlationId, group, id);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async getRetryByIds(correlationId: string, group: string, ids: string[]): Promise<RetryV1[]> {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_ids');
        
        try {
            let res = await this._controller.getRetryByIds(correlationId, group, ids);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async deleteRetry(correlationId: string, group: string, id: string): Promise<void> {
        let timing = this.instrument(correlationId, 'retries.delete_retry');
        
        try {
            let res = await this._controller.deleteRetry(correlationId, group, id);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async getGroupNames(correlationId: string): Promise<string[]> {
        let timing = this.instrument(correlationId, 'retries.get_groups_names');
        
        try {
            let res = await this._controller.getGroupNames(correlationId);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }

    public async getRetries(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RetryV1>> {
        let timing = this.instrument(correlationId, 'retries.get_retries');
        
        try {
            let res = await this._controller.getRetries(correlationId, filter, paging);
            timing.endTiming();
            return res;
        } catch (err) {
            timing.endFailure(err);
            throw err;
        }
    }
}