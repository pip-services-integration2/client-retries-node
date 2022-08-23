import { FilterParams } from "pip-services3-commons-nodex";
import { PagingParams } from "pip-services3-commons-nodex";
import { DataPage } from "pip-services3-commons-nodex";

import { IRetriesClientV1 } from "./IRetriesClientV1";
import { RetryV1 } from "./RetryV1";


export class RetriesNullClientV1 implements IRetriesClientV1 {
    public async getGroupNames(correlationId: string): Promise<string[]> {
        return new Array<string>();
    }

    public async getRetries(correlationId: string, filter: FilterParams, paging: PagingParams): Promise<DataPage<RetryV1>> {
        return new DataPage<RetryV1>();
    }

    public async addRetry(correlationId: string, group: string, id: string, timeToLive: number): Promise<RetryV1> {
       return null;
    }

    public async addRetries(correlationId: string, group: string, ids: string[], timeToLive: number): Promise<RetryV1[]> {
        return new Array<RetryV1>();
    }

    public async getRetryById(correlationId: string, group: string, id: string): Promise<RetryV1> {
       return null;
    }

    public async getRetryByIds(correlationId: string, group: string, ids: string[]): Promise<RetryV1[]> {
       return null;
    }

    public async deleteRetry(correlationId: string, group: string, id: string): Promise<void> {
        return null;
    }
}