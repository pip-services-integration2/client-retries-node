"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetriesClientsFactory = void 0;
const pip_services3_components_nodex_1 = require("pip-services3-components-nodex");
const pip_services3_commons_nodex_1 = require("pip-services3-commons-nodex");
const RetriesDirectClientV1_1 = require("../version1/RetriesDirectClientV1");
const RetriesMockClientV1_1 = require("../version1/RetriesMockClientV1");
const RetriesCommandableHttpClientV1_1 = require("../version1/RetriesCommandableHttpClientV1");
const RetriesNullClientV1_1 = require("../version1/RetriesNullClientV1");
class RetriesClientsFactory extends pip_services3_components_nodex_1.Factory {
    constructor() {
        super();
        this.registerAsType(RetriesClientsFactory.DirectClientDescriptor, RetriesDirectClientV1_1.RetriesDirectClientV1);
        this.registerAsType(RetriesClientsFactory.MockClientDescriptor, RetriesMockClientV1_1.RetriesMockClientV1);
        this.registerAsType(RetriesClientsFactory.CmdHttpClientDescriptor, RetriesCommandableHttpClientV1_1.RetriesCommandableHttpClientV1);
        this.registerAsType(RetriesClientsFactory.NullClientDescriptor, RetriesNullClientV1_1.RetriesNullClientV1);
    }
}
exports.RetriesClientsFactory = RetriesClientsFactory;
RetriesClientsFactory.Descriptor = new pip_services3_commons_nodex_1.Descriptor("client-retries", "factory", "default", "default", "1.0");
RetriesClientsFactory.DirectClientDescriptor = new pip_services3_commons_nodex_1.Descriptor("client-retries", "client", "direct", "*", "1.0");
RetriesClientsFactory.MockClientDescriptor = new pip_services3_commons_nodex_1.Descriptor("client-retries", "client", "mock", "*", "1.0");
RetriesClientsFactory.CmdHttpClientDescriptor = new pip_services3_commons_nodex_1.Descriptor("client-retries", "client", "commandable-http", "*", "1.0");
RetriesClientsFactory.NullClientDescriptor = new pip_services3_commons_nodex_1.Descriptor("client-retries", "client", "null", "*", "1.0");
//# sourceMappingURL=RetriesClientsFactory.js.map