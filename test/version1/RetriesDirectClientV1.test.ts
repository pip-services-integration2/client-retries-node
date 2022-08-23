
import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { RetriesMemoryPersistence } from 'service-retries-node';
import { RetriesController } from 'service-retries-node';

import { RetriesDirectClientV1 } from '../../src/version1/RetriesDirectClientV1';
import { RetriesClientV1Fixture } from './RetriesClientV1Fixture';


suite('RetriesDirectClientV1', () => {
    let persistence: RetriesMemoryPersistence;
    let controller: RetriesController;
    let client: RetriesDirectClientV1;
    let fixture: RetriesClientV1Fixture;

    setup(async () => {
        persistence = new RetriesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new RetriesController();
        controller.configure(new ConfigParams());

        client = new RetriesDirectClientV1();

        let references = References.fromTuples(
            new Descriptor('service-retries', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-retries', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-retries', 'client', 'direct', 'default', '1.0'), client
        );

        controller.setReferences(references);
        client.setReferences(references);

        fixture = new RetriesClientV1Fixture(client);

        await persistence.open(null);
    });

    teardown(async () => {
        await persistence.close(null);
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