import sha256 from "../lib/modules/crypto/sha256";
import sessionId from "../lib/modules/utils/sessionId";
import { createModuleInspector } from "./createModuleInspector";
import { createProcessInspector, IProcessInspector } from "./createProcessInspector";

let uniqueProcessId = 0;
const Cache: { [key: string]: IMethodInspector } = {};

export interface IMethodInspector {
    log: (data: MethodInspectorMessage) => Promise<void>,
    process: (processId?: string) => IProcessInspector
}

export interface MethodInspectorMessage {
    processId?: string;
    type: string;
    data?: any;

    tags?: string[];
}

export const createMethodInspector = ({ module, method }: { module: string, method: string }) => {
    let key = module + "-" + method;
    if (Cache[key]) return Cache[key];

    const moduleInspector = createModuleInspector(module);

    return Cache[key] = {
        log: (data: MethodInspectorMessage) => moduleInspector.log({
            ...data,
            method
        }),

        process: (processId?: string) => createProcessInspector({
            module,
            method,
            processId: processId ?? sha256({
                sessionId: sessionId(),
                processId: uniqueProcessId++
            })
        })
    }
}