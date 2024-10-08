import { Command, Flags, Args } from '@oclif/core'
import { clOutput, clUpdate, clColor, clToken, type ApiMode, clUtil } from '@commercelayer/cli-core'
import commercelayer, { type CommerceLayerClient, CommerceLayerStatic } from '@commercelayer/sdk'
import type { CommandError } from '@oclif/core/lib/interfaces'
import * as cliux from '@commercelayer/cli-ux'


const pkg: clUpdate.Package = require('../package.json')


export default abstract class extends Command {

  static enableJsonFlag = false

  static baseFlags = {
    organization: Flags.string({
      char: 'o',
      description: 'the slug of your organization',
      required: true,
      env: 'CL_CLI_ORGANIZATION',
      hidden: true,
    }),
    domain: Flags.string({
      char: 'd',
      required: false,
      hidden: true,
      dependsOn: ['organization'],
      env: 'CL_CLI_DOMAIN',
    }),
    accessToken: Flags.string({
      hidden: true,
      required: true,
      env: 'CL_CLI_ACCESS_TOKEN',
    }),
  }


  protected environment: ApiMode = 'test'




  // INIT (override)
  async init(): Promise<any> {
    // Check for plugin updates only if in visible mode
    if (!this.argv.includes('--blind') && !this.argv.includes('--silent') && !this.argv.includes('--quiet')) clUpdate.checkUpdate(pkg)
    return super.init()
  }


  async catch(error: CommandError): Promise<any> {
    if (error.message?.includes('quit')) this.exit()
    else return super.catch(error)
  }


  protected handleError(error: CommandError, flags?: any, id?: string): never {
    if (CommerceLayerStatic.isApiError(error)) {
      if (error.status === 401) {
        const err = error.first()
        this.error(clColor.msg.error(`${err.title}:  ${err.detail}`),
          { suggestions: ['Execute login to get access to the organization\'s imports'] },
        )
      } else
      if (error.status === 404) {
        this.error(`Unable to find import${id ? ` with id ${clColor.msg.error(id)}` : ''}`)
      } else this.error(clOutput.formatOutput(error, flags))
    } else throw error
  }



  protected importStatus(status?: string): string {
    if (!status) return ''
    switch (status.toLowerCase()) {
      case 'completed': return clColor.msg.success(status)
      case 'interrupted': return clColor.msg.error(status)
      case 'pending':
      case 'in_progress':
      default: return status
    }
  }


  protected checkApplication(accessToken: string, kinds: string[]): boolean {

    const info = clToken.decodeAccessToken(accessToken)

    if (info === null) this.error('Invalid access token provided')
    else
      if (!kinds.includes(info.application.kind))
        this.error(`Invalid application kind: ${clColor.msg.error(info.application.kind)}. Application kind must be one of the following: ${clColor.cyanBright(kinds.join(', '))}`)

    return true

  }


  protected commercelayerInit(flags: any): CommerceLayerClient {

    const organization = flags.organization
    const domain = flags.domain
    const accessToken: string = flags.accessToken
    const userAgent = clUtil.userAgent(this.config)

    this.environment = clToken.getTokenEnvironment(accessToken)

    return commercelayer({
      organization,
      domain,
      accessToken,
      userAgent
    })

  }

}


export { Flags, Args, cliux }
