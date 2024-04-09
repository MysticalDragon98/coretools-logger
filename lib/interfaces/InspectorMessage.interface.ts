export default interface InspectorMessage {
    module: string;
    method: string;
    type: string;
    data?: any;
    timestamp?: number;
}