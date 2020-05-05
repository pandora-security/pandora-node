/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

export type PlainText = string
export type CipherText = string

export type DecryptionResult = {
    decrypted: PlainText
}

export type EncryptionResult = {
    encrypted: CipherText
}

export type VersionResult = {
    major: number
    minor: number
    patch: number
}