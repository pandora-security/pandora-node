/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

export type ErrorCode = number

export class Error {

    private readonly _code: ErrorCode
    private readonly _message: string

    constructor(code: ErrorCode, message: string) {
        this._code = code
        this._message = message
    }

    private get code(): ErrorCode {
        return this._code
    }

    private get message(): string {
        return this._message
    }

    public toString(): string {
        return `${this.message} [code: ${this.code}]`
    }

}

export const pandoraNotInstalledError = new Error(100, "pandora is not installed")

export const pandoraRuntimeError = new Error(101, "pandora runtime error")

export const invalidSignatureError = new Error(300, "invalid signature")