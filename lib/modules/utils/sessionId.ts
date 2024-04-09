import { randomUUID } from "crypto";

let _sessionId: string;

export default function sessionId () {
    return _sessionId ?? (_sessionId = randomUUID());
}
