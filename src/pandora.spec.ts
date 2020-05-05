/**
 * Specification for Pandora
 **/
import "mocha"
import {assert} from "chai"
import {SemanticVersion} from "./internal/version";
import {Pandora} from "./pandora";

const applicationGUID = "00000000-0000-0000-0000-000000000000"
const testWords = "Pandora Security Box"
const minimumVersion = new SemanticVersion(0, 1, 2)

describe("Pandora Security Box", () => {

    it("should be installed", () => {
        const p = new Pandora(applicationGUID)
        const isInstalled = p.isInstalled()
        assert.equal(isInstalled, true)
    });


    it("should have version", async () => {
        const p = new Pandora(applicationGUID)
        const version = await p.checkVersion()
        assert.hasAllKeys(version, ["major", "minor", "patch"])
        assert.isFunction(version.getMajor)
        assert.typeOf(version.getMajor(), "number")
        assert.isFunction(version.getMinor)
        assert.typeOf(version.getMinor(), "number")
        assert.isFunction(version.getPatch)
        assert.typeOf(version.getPatch(), "number")
    });

});

describe("Pandora Cryptography", () => {

    it("should satisfy minimum version", async () => {
        const p = new Pandora(applicationGUID)
        p.setMinimumVersion(minimumVersion)
        const {isSatisfied} = await p.isSatisfyMinimumVersion()
        assert.equal(isSatisfied, true)
    });

    it("should be able to encrypt plain text", async () => {
        const p = new Pandora(applicationGUID)
        p.setMinimumVersion(minimumVersion)
        const {application, cipher} = await p.encrypt(testWords)
        assert.hasAllKeys(application, ["name", "guid", "author"])
        assert.equal(application.guid, applicationGUID)
        assert.typeOf(cipher, "string")
    });


    it("should be able to decrypt ciphered text", async () => {
        const p = new Pandora(applicationGUID)
        p.setMinimumVersion(minimumVersion)
        const {cipher} = await p.encrypt(testWords)
        const {application, plain} = await p.decrypt(cipher)
        assert.hasAllKeys(application, ["name", "guid", "author"])
        assert.equal(application.guid, applicationGUID)
        assert.typeOf(plain, "string")
        assert.equal(plain, testWords)
    });

});