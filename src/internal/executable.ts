/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

import fs from "fs"
import path from "path";
import {exec} from "child_process";
import {pandoraRuntimeError} from "./errors";

export class Executable {

    private readonly name: string

    constructor(name: string) {
        this.name = name
    }

    public lookPath(): string | null {
        if (process.env.PATH === void 0 || process.env.PATH === "") {
            return null
        }
        const binPaths = process.platform === "win32"
            ? process.env.PATH.split(";")
            : process.env.PATH.split(":")
        for (const binPath of binPaths) {
            if (fs.existsSync(binPath)) {
                const files = fs.readdirSync(binPath)
                for (const file of files) {
                    if (file === this.name) {
                        return path.join(binPath, file)
                    }
                }
            }
        }
        return null
    }

    public found(): boolean {
        return this.lookPath() !== null
    }

    public async run(...args: string[]): Promise<string> {
        return new Promise((resolve, reject) => {
            const command = [this.name, ...args]
            exec(command.join(" "), (error, stdout) => {
                if (error !== null) {
                    reject(pandoraRuntimeError)
                    return
                }
                resolve(`${stdout}`)
            })
        })
    }

}