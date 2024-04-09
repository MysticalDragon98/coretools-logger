import Plugins from "../lib/const/Plugins.const";
import { ModuleInspectorMessage } from "./createModuleInspector";

export function addInspectorPlugin (plugin: (message: ModuleInspectorMessage & { module: string }) => any) {
  Plugins.push(plugin);
}