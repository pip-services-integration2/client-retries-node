const assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-nodex';
import { PagingParams } from 'pip-services3-commons-nodex';

import { IRetriesClientV1 } from '../../src/version1/IRetriesClientV1';

export class RetriesClientV1Fixture {
    private _client: IRetriesClientV1;

    constructor(persistence) {
        assert.isNotNull(persistence);
        this._client = persistence;
    }

    public async testGetRetryGroups() {
        // Add retries
        await this._client.addRetry(null, "Common.Group", "123", 3);
        await this._client.addRetry(null, "Common.AnotherGroup", "123", 3);
        await this._client.addRetry(null, "Common.Group", "ABC", 3);

        let items = await this._client.getGroupNames(null);
        assert.equal(2, items.length);
        assert.include(items, "Common.Group");
        assert.include(items, "Common.AnotherGroup");

    }

    public async testGetRetries() {
        // Add retries
        await this._client.addRetry(null, "Common.Group", "123", 3);
        await this._client.addRetry(null, "Common.AnotherGroup", "123", 3);
        await this._client.addRetry(null, "Common.Group", "ABC", 3);
        await this._client.addRetry(null, "Common.Group", "AAA", 3);

        let retries = await this._client.getRetries(null, FilterParams.fromTuples("group", "Common.Group"), new PagingParams(1, 10, false));
        assert.isNotNull(retries.data);
        assert.equal(2, retries.data.length);
    }


    public async testRetries() {
        // Add retries
        await this._client.addRetry(null, "Common.Group", "123", 3);;
        await this._client.addRetry(null, "Common.AnotherGroup", "123", 3);
        await this._client.addRetry(null, "Common.OtherGroup", "ABC", 3);

        // Try to read 1 retry
        let retry = await this._client.getRetryById(null, "Common.Group", "123");
        assert.isNotNull(retry);
        assert.equal(retry.id, "123");
        assert.equal(retry.group, "Common.Group");

        // Try to read 2 retry
        retry = await this._client.getRetryById(null, "Common.AnotherGroup", "123");
        assert.isNotNull(retry);
        assert.equal(retry.id, "123");
        assert.equal(retry.group, "Common.AnotherGroup");

        // Try to read 3 retry
        retry = await this._client.getRetryById(null, "Common.OtherGroup", "ABC");
        assert.isNotNull(retry);
        assert.equal(retry.id, "ABC");
        assert.equal(retry.group, "Common.OtherGroup");

        // Test non-exiting group
        retry = await this._client.getRetryById(null, "Common.Group1", "123");
        assert.isNull(retry);

        // Test non-exiting retry
        retry = await this._client.getRetryById(null, "Common.Group", "1234");
        assert.isNull(retry);
    }
}
