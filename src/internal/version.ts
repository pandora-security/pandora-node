/**
 * This code is part of internal core of
 * Pandora Security Driver for NodeJS
 **/

export class SemanticVersion {

    private readonly major: number
    private readonly minor: number
    private readonly patch: number

    constructor(major: number, minor: number, patch: number) {
        this.major = major
        this.minor = minor
        this.patch = patch
    }

    private static compareSubVersion(subA: number, subB: number): number {
        if (subA > subB) {
            return 1
        } else if (subA < subB) {
            return -1
        } else {
            return 0
        }
    }

    public getMajor(): number {
        return this.major;
    }

    public getMinor(): number {
        return this.minor;
    }

    public getPatch(): number {
        return this.patch;
    }

    public compareVersion(version: SemanticVersion): number {
        const majorCompare = SemanticVersion.compareSubVersion(this.major, version.getMajor())
        if (majorCompare !== 0) return majorCompare
        const minorCompare = SemanticVersion.compareSubVersion(this.minor, version.getMinor())
        if (minorCompare !== 0) return minorCompare
        return SemanticVersion.compareSubVersion(this.patch, version.getPatch())
    }

    public toString(): string {
        return `v${this.major}.${this.minor}.${this.patch}`
    }

}