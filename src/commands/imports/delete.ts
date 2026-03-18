import { clColor } from '@commercelayer/cli-core'
import Command from '../../base'
import ImportsDetails from './details'
import { imports } from '@commercelayer/sdk'



export default class ImportsDelete extends Command {

  static description = 'delete an existing import'

  static aliases = ['imp:delete']

  static examples = [
    '$ commercelayer imports:delete <import-id>>',
    '$ cl imp:delete <import-id>>',
  ]


  static args = {
    ...ImportsDetails.args,
  }


  async run(): Promise<any> {

    const { args, flags } = await this.parse(ImportsDelete)

    const id = args.id

    this.commercelayerInit(flags)


    imports.delete(id)
      .then(() => { this.log(`\n${clColor.msg.success('Successfully')} deleted import with id ${clColor.api.id(id)}\n`) })
      .catch(error => this.handleError(error, flags, id))

  }

}
