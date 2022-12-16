import { ConfigParams } from 'pip-services3-commons-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
import { References } from 'pip-services3-commons-nodex';

import { RetriesMemoryPersistence } from 'service-retries-node';
import { RetriesController } from 'service-retries-node';
import { RetriesCommandableHttpServiceV1 } from 'service-retries-node';

import { RetriesCommandableHttpClientV1 } from '../../src/version1/RetriesCommandableHttpClientV1';
import { RetriesClientV1Fixture } from './RetriesClientV1Fixture';

suite('RetriesHttpClientV1', () => {
    let persistence: RetriesMemoryPersistence;
    let controller: RetriesController;
    let service: RetriesCommandableHttpServiceV1;
    let client: RetriesCommandableHttpClientV1;
    let fixture: RetriesClientV1Fixture;

    setup(async () => {
        persistence = new RetriesMemoryPersistence();
        persistence.configure(new ConfigParams());

        controller = new RetriesController();
        controller.configure(new ConfigParams());

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        service = new RetriesCommandableHttpServiceV1();
        service.configure(httpConfig);

        client = new RetriesCommandableHttpClientV1();
        client.configure(httpConfig);

        let references = References.fromTuples(
            new Descriptor('service-retries', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('service-retries', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('service-retries', 'service', 'commandable-http', 'default', '1.0'), service,
            new Descriptor('service-retries', 'client', 'commandable-http', 'default', '1.0'), client
        );
        controller.setReferences(references);
        service.setReferences(references);
        client.setReferences(references);

        fixture = new RetriesClientV1Fixture(client);

        await persistence.open(null);
        await service.open(null);
        await client.open(null);
    });

    teardown(async () => {
        await client.close(null);
        await service.close(null);
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