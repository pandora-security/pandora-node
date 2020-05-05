/**
 * Pandora Security Driver for NodeJS
 *
 * An official NodeJS library which will help any NodeJS application to communicate
 * with Pandora Security Box APIs.
 **/
import {getCommandDefinition, Command, CommandDefinition} from "./internal/commands";
import {decodePandoraOutput, decodePlainText, encodePlainText} from "./internal/encoding";
import {Executable} from "./internal/executable";
import {DecryptionReport, EncryptionReport, VersionSatisfactionReport} from "./internal/reports";
import {Response} from "./internal/response";
import {CipherText, DecryptionResult, EncryptionResult, PlainText, VersionResult} from "./internal/result";
import {SemanticVersion} from "./internal/version";
import {invalidSignatureError, pandoraNotInstalledError} from "./internal/errors";
import {verify} from "./internal/sign";
/**
 * Pandora Security Driver
 *
 * @class
 */
export class Pandora {

    private readonly applicationGUID: string
    private readonly executable: Executable
    private minimumVersion?: SemanticVersion

    /**
     * Represent Pandora for specific application.
     *
     * @constructor
     * @param   {string}    applicationGUID      The application GUID given by Pandora's Author.
     */
    constructor(applicationGUID: string) {
        this.applicationGUID = applicationGUID
        this.executable = new Executable("pandora")
    }

    private async executeCommand(command: CommandDefinition, ...args: string[]): Promise<Response> {
        if (!this.executable.found()) {
            throw pandoraNotInstalledError
        }
        try {
            const commandToRun = [command.command]
            if (command.requiresAuth) {
                commandToRun.push("-a")
                commandToRun.push(this.applicationGUID)
            }
            commandToRun.push(...args)
            const output = await this.executable.run(...commandToRun)
            const response = decodePandoraOutput<Response>(output) as Response
            if (!verify(response.data, response.signature)) {
                throw invalidSignatureError
            }
            return response
        } catch (error) {
            throw error
        }
    }

    /**
     * Check Pandora version.
     *
     * Check the version of Pandora installed on the system.
     *
     * @since      2020.04.30
     * @access     public
     *
     * @memberOf    Pandora
     *
     * @see     SemanticVersion
     *
     * @return  {Promise<SemanticVersion>}  Returns the semantic version of Pandora.
     */
    public async checkVersion(): Promise<SemanticVersion> {
        try {
            const response = await this.executeCommand(
                getCommandDefinition(Command.VERSION)
            )
            if (!response.success) {
                throw new Error(response.message)
            }
            const result = decodePandoraOutput<VersionResult>(response.data) as VersionResult
            return new SemanticVersion(result.major, result.minor, result.patch)
        } catch (error) {
            throw error
        }
    }

    /**
     * Decrypt.
     *
     * Decrypt a given cipher text into a plain text.
     *
     * @since      2020.04.30
     * @access     public
     *
     * @memberOf    Pandora
     *
     * @see     DecryptionReport
     *
     * @param   {CipherText}    cipher      The cipher text to be decrypted.
     *
     * @return  {Promise<DecryptionReport>} Returns the operation report of the decryption.
     */
    public async decrypt(cipher: CipherText): Promise<DecryptionReport> {
        try {
            const {isSatisfied,minimumVersion,foundVersion} = await this.isSatisfyMinimumVersion()
            if (!isSatisfied) {
                throw new Error(`Required Pandora ${minimumVersion}; installed ${foundVersion}`)
            }
            const response = await this.executeCommand(
                getCommandDefinition(Command.DECRYPT),
                <string>cipher
            )
            if (!response.success) {
                throw new Error(response.message)
            }
            const result = decodePandoraOutput<DecryptionResult>(response.data)
            return { application: response.initiator, plain: decodePlainText(result.decrypted) }
        } catch (error) {
            throw error
        }
    }

    /**
     * Encrypt.
     *
     * Encrypt a given plain text into a ciphered text.
     *
     * @since      2020.04.30
     * @access     public
     *
     * @memberOf    Pandora
     *
     * @see     EncryptionReport
     *
     * @param   {PlainText}     plain       The plain text to be encrypted.
     *
     * @return  {Promise<EncryptionReport>} Returns the operation report of the encryption.
     */
    public async encrypt(plain: PlainText): Promise<EncryptionReport> {
        try {
            const {isSatisfied,minimumVersion,foundVersion} = await this.isSatisfyMinimumVersion()
            if (!isSatisfied) {
                throw new Error(`Required Pandora ${minimumVersion}; installed ${foundVersion}`)
            }
            const response = await this.executeCommand(
                getCommandDefinition(Command.ENCRYPT),
                encodePlainText(plain)
            )
            if (!response.success) {
                throw new Error(response.message)
            }
            const result = decodePandoraOutput<EncryptionResult>(response.data)
            return { application: response.initiator, cipher: result.encrypted }
        } catch (error) {
            throw error
        }
    }

    /**
     * Is Pandora installed?
     *
     * Check whether Pandora is installed or not on the system.
     *
     * @since      2020.04.30
     * @access     public
     *
     * @memberOf    Pandora
     *
     * @return  {boolean} Returns true if Pandora is installed on the system.
     */
    public isInstalled(): boolean {
        return this.executable.found()
    }

    /**
     * Is satisfy minimum version?
     *
     * Check whether the installed Pandora's version is satisfy the minimum
     * version required.
     *
     * @since      2020.04.30
     * @access     public
     *
     * @memberOf    Pandora
     *
     * @see     setMinimumVersion
     * @see     VersionSatisfactionReport
     *
     * @return  {Promise<VersionSatisfactionReport>} Returns the version satisfaction report.
     */
    public async isSatisfyMinimumVersion(): Promise<VersionSatisfactionReport> {
        try {
            if (this.minimumVersion === void 0) {
                return { isSatisfied: true }
            }
            const version = await this.checkVersion()
            const comparison = version.compareVersion(this.minimumVersion)
            return {
                isSatisfied: comparison >= 0,
                minimumVersion: this.minimumVersion,
                foundVersion: version
            }
        } catch (error) {
            throw error
        }
    }

    /**
     * Set minimum Pandora version
     *
     * Set the minimum version of Pandora that required to be installed.
     *
     * @since      2020.04.30
     * @access     public
     *
     * @memberOf    Pandora
     *
     * @see     SemanticVersion
     *
     * @param   {SemanticVersion}   version     The minimum version of Pandora to be required.
     */
    public setMinimumVersion(version: SemanticVersion) {
        this.minimumVersion = version
    }

}