import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';

import { RetriesDirectClientV1 } from '../version1/RetriesDirectClientV1';
import { RetriesMockClientV1 } from '../version1/RetriesMockClientV1';
import { RetriesCommandableHttpClientV1 } from '../version1/RetriesCommandableHttpClientV1';
import { RetriesNullClientV1 } from '../version1/RetriesNullClientV1';


export class RetriesClientsFactory extends Factory {
	public static Descriptor = new Descriptor("client-retries", "factory", "default", "default", "1.0");
	public static DirectClientDescriptor = new Descriptor("client-retries", "client", "direct", "*", "1.0");
	public static MockClientDescriptor = new Descriptor("client-retries", "client", "mock", "*", "1.0");
	public static CmdHttpClientDescriptor = new Descriptor("client-retries", "client", "commandable-http", "*", "1.0");
	public static NullClientDescriptor = new Descriptor("client-retries", "client", "null", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(RetriesClientsFactory.DirectClientDescriptor, RetriesDirectClientV1);
		this.registerAsType(RetriesClientsFactory.MockClientDescriptor, RetriesMockClientV1);
		this.registerAsType(RetriesClientsFactory.CmdHttpClientDescriptor, RetriesCommandableHttpClientV1);
		this.registerAsType(RetriesClientsFactory.NullClientDescriptor, RetriesNullClientV1);
	}
	
}
