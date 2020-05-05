/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

export type CommandDefinition = {
    command: string
    requiresAuth: boolean
}

export enum Command {
    DECRYPT = "DECRYPT",
    ENCRYPT = "ENCRYPT",
    VERSION = "VERSION"
}

export function getCommandDefinition(command: Command): CommandDefinition {
    return commandDefinitions[command]
}

const commandDefinitions: { [key: string]: CommandDefinition } = {
    DECRYPT: {
        command: "decrypt",
        requiresAuth: true
    },
    ENCRYPT: {
        command: "encrypt",
        requiresAuth: true
    },
    VERSION: {
        command: "version",
        requiresAuth: false
    }
}