import crypto from "crypto";

export default function sha256 (data: any) {
    if(data instanceof Buffer)
        return crypto.createHash('sha256').update(data).digest('hex')

    if (typeof data === 'undefined')
        return crypto.createHash('sha256').update('').digest('hex')
    return crypto.createHash('sha256').update(JSON.stringify(data)).digest('hex')
}