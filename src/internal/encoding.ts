/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

import {PlainText} from "./result";

export function decodePandoraOutput<T>(src: string): T {
    const buffer = Buffer.from(src, "base64")
    const json = buffer.toString("utf8")
    return JSON.parse(json) as T
}

export function encodePlainText(src: PlainText): string {
    const buffer = Buffer.from(<string>src, "utf8")
    return buffer.toString("base64")
}

export function decodePlainText(src: PlainText): PlainText {
    const buffer = Buffer.from(<string>src, "base64")
    return buffer.toString("utf8") as PlainText
}