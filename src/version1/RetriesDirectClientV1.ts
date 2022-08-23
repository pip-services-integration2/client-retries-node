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
            return await this._controller.addRetry(correlationId, group, id, timeToLive);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async addRetries(correlationId: string, group: string, ids: string[], timeToLive: number): Promise<RetryV1[]> {
        let timing = this.instrument(correlationId, 'retries.add_retries');

        try {
            return await this._controller.addRetries(correlationId, group, ids, timeToLive);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getRetryById(correlationId: string, group: string, id: string): Promise<RetryV1> {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_id');
        
        try {
            return await this._controller.getRetryById(correlationId, group, id);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getRetryByIds(correlationId: string, group: string, ids: string[]): Promise<RetryV1[]> {
        let timing = this.instrument(correlationId, 'retries.get_retry_by_ids');
        
        try {
            return await this._controller.getRetryByIds(correlationId, group, ids);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async deleteRetry(correlationId: string, group: string, id: string): Promise<void> {
        let timing = this.instrument(correlationId, 'retries.delete_retry');
        
        try {
            return await this._controller.deleteRetry(correlationId, group, id);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getGroupNames(correlationId: string): Promise<string[]> {
        let timing = this.instrument(correlationId, 'retries.get_groups_names');
        
        try {
            return await this._controller.getGroupNames(correlationId);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getRetries(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RetryV1>> {
        let timing = this.instrument(correlationId, 'retries.get_retries');
        
        try {
            return await this._controller.getRetries(correlationId, filter, paging);
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}