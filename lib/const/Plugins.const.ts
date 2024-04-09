import { ModuleInspectorMessage } from "../../src/createModuleInspector";

const Plugins: ((message: ModuleInspectorMessage & { module: string }) => any)[] = [];
export default Plugins;
