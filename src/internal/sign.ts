/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/
import {sign} from "tweetnacl";

const publicKey = "Y/97DVIGeTgOzFW7j+vXS8g8j0UUcum3g50QfO1CH+c="

export function verify(data: string, signature: string): boolean {
    const publicKeyBuffer = Buffer.from(publicKey, "base64")
    const dataBuffer = Buffer.from(data)
    const signatureBuffer = Buffer.from(signature, "base64")
    return sign.detached.verify(dataBuffer, signatureBuffer, publicKeyBuffer)
}
