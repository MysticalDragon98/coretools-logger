import { createMethodInspector } from "./createMethodInspector";

export interface IProcessInspector {
    log: (data: ProcessInspectorMessage) => Promise<void>
}

interface ProcessInspectorMessage {
    type: string;
    data?: any;

    tags?: string[];
}

export const createProcessInspector = ({ module, method, processId }: { module: string, method: string, processId: string }) => {
    const moduleInspector = createMethodInspector({ module, method });

    return {
        log: (data: ProcessInspectorMessage) => moduleInspector.log({
            ...data,
            processId
        })
    } as IProcessInspector
}