/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

import {Application} from "./application";

export type Response = {
    success: boolean
    initiator: Application
    message: string
    data: string
    signature: string
}