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
        return await this.callCommand(
            'add_retry',
            correlationId,
            {
                id: id,
                group: group,
                ttl: timeToLive
            }
        );
    }

    public async addRetries(correlationId: string, group: string, ids: string[], timeToLive: number): Promise<RetryV1[]> {
        return await this.callCommand(
            'add_retries',
            correlationId,
            {
                ids: ids,
                group: group,
                ttl: timeToLive
            }
        );
    }
    public async getRetryById(correlationId: string, group: string, id: string): Promise<RetryV1> {
        return await this.callCommand(
            'get_retry_by_id',
            correlationId,
            {
                id: id,
                group: group
            }
        );
    }

    public async getRetryByIds(correlationId: string, group: string, ids: string[]): Promise<RetryV1[]> {
        return await this.callCommand(
            'get_retry_by_ids',
            correlationId,
            {
                ids: ids,
                group: group
            }
        );
    }

    public async deleteRetry(correlationId: string, group: string, id: string): Promise<void> {
        return await this.callCommand(
            'delete_retry',
            correlationId,
            {
                ids: id,
                group: group
            }
        );
    }

    public async getGroupNames(correlationId: string): Promise<string[]> {
        return await this.callCommand(
            'get_group_names',
            correlationId,
            {}
        );
    }

    public async getRetries(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RetryV1>> {
        return await this.callCommand(
            'get_retries',
            correlationId,
            {
                filter: filter,
                paging: paging
            }
        );
    }
}