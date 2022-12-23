import { RetriesMockClientV1 } from '../../src/version1/RetriesMockClientV1';
import { RetriesClientV1Fixture } from './RetriesClientV1Fixture';

suite('RetriesMockClientV1', () => {
    let client: RetriesMockClientV1;
    let fixture: RetriesClientV1Fixture;

    setup(() => {

        client = new RetriesMockClientV1();
        fixture = new RetriesClientV1Fixture(client);
    });

    test('Get Retry Groups', async () => {
        await fixture.testGetRetryGroups();
    });

    test('Get Retries', async () => {
        await fixture.testGetRetries();
    });

    test('Retries', async () => {
        await fixture.testRetries();
    });

});