import { cold, highlight } from "termx";
import { createMethodInspector, IMethodInspector } from "./createMethodInspector";
import verboseLog from "../lib/modules/logger/verboseLog";
import { $INSPECTOR_ENABLED } from "../lib/env";
import Plugins from "../lib/const/Plugins.const";

export interface IModuleInspector {
    log: (data: ModuleInspectorMessage) => Promise<void>,
    method: (method: string) => IMethodInspector
}

const Cache: { [key: string]: IModuleInspector } = {};

export interface ModuleInspectorMessage {
    method: string;
    processId?: string;
    type: string;
    data?: any;

    tags?: string[];
}
export const createModuleInspector = (module: string): IModuleInspector => {
    if (Cache[module]) return Cache[module];
    const logger = verboseLog(module.toUpperCase());

    return Cache[module] = {
        async log ({ method, processId, type, data }: ModuleInspectorMessage) {
            let logName = processId? `${method}<${processId}>` : method;
            
            if ($INSPECTOR_ENABLED) logger(highlight(`(${type})`), cold(`${logName}:`), data ?? {});
            
            Plugins.forEach(plugin => plugin({ module, method, processId, type, data }));
        },

        method: (method: string) => createMethodInspector({ module, method })
    }
}