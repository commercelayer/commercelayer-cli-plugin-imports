
import { expect } from 'chai'
import { runCommand } from '@oclif/test'

describe('imports:list', () => {
  it('runs NoC', async () => {
    const { stdout } = await runCommand<{ name: string }>(['imports:noc'])
    expect(stdout).to.contain('-= NoC =-')
  })
})
