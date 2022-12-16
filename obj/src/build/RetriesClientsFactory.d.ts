import { Factory } from 'pip-services3-components-nodex';
import { Descriptor } from 'pip-services3-commons-nodex';
export declare class RetriesClientsFactory extends Factory {
    static Descriptor: Descriptor;
    static DirectClientDescriptor: Descriptor;
    static MemoryClientDescriptor: Descriptor;
    static CmdHttpClientDescriptor: Descriptor;
    static NullClientDescriptor: Descriptor;
    constructor();
}
