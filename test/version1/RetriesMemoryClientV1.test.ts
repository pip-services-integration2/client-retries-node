import { RetriesMemoryClientV1 } from '../../src/version1/RetriesMemoryClientV1';
import { RetriesClientV1Fixture } from './RetriesClientV1Fixture';

suite('RetriesDirectClientV1', () => {
    let client: RetriesMemoryClientV1;
    let fixture: RetriesClientV1Fixture;

    setup(() => {

        client = new RetriesMemoryClientV1();
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