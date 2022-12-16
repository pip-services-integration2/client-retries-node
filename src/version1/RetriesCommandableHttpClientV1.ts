import { FilterParams } from "pip-services3-commons-nodex";
import { PagingParams } from "pip-services3-commons-nodex";
import { DataPage } from "pip-services3-commons-nodex";
import { CommandableHttpClient } from 'pip-services3-rpc-nodex';

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { RetryV1 } from "./RetryV1";

export class RetriesCommandableHttpClientV1 extends CommandableHttpClient implements IRetriesClientV1 {

    public constructor() {
        super('v1/retries');
    }

    public async addRetry(correlationId: string, group: string, id: string, timeToLive: number): Promise<RetryV1> {
        let timing = this.instrument(correlationId, 'retries.add_retry');

        try {
            return await this.callCommand(
                'add_retry',
                correlationId,
                {
                    id: id,
                    group: group,
                    ttl: timeToLive
                }
            );
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
            return await this.callCommand(
                'add_retries',
                correlationId,
                {
                    ids: ids,
                    group: group,
                    ttl: timeToLive
                }
            );
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
            return await this.callCommand(
                'get_retry_by_id',
                correlationId,
                {
                    id: id,
                    group: group
                }
            );
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
            return await this.callCommand(
                'get_retry_by_ids',
                correlationId,
                {
                    ids: ids,
                    group: group
                }
            );
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
            return await this.callCommand(
                'delete_retry',
                correlationId,
                {
                    ids: id,
                    group: group
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }

    public async getGroupNames(correlationId: string): Promise<string[]> {
        let timing = this.instrument(correlationId, 'retries.get_group_names');

        try {
            return await this.callCommand(
                'get_group_names',
                correlationId,
                {}
            );
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
            return await this.callCommand(
                'get_retries',
                correlationId,
                {
                    filter: filter,
                    paging: paging
                }
            );
        } catch (err) {
            timing.endFailure(err);
            throw err;
        } finally {
            timing.endTiming();
        }
    }
}