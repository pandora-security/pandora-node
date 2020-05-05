/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

import {Application} from "./application";
import {CipherText, PlainText} from "./result";
import {SemanticVersion} from "./version";

export type DecryptionReport = {
    application: Application
    plain: PlainText
}

export type EncryptionReport = {
    application: Application
    cipher: CipherText
}

export type VersionSatisfactionReport = {
    isSatisfied: boolean
    minimumVersion?: SemanticVersion
    foundVersion?: SemanticVersion
}