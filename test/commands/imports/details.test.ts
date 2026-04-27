import { runCommand } from '@oclif/test'
import { expect } from 'chai'


describe('imports:details', () => {
  it('runs NoC', async () => {
    const { stdout } = await runCommand<{ name: string }>(['imports:noc'])
    expect(stdout).to.contain('-= NoC =-')
  }).timeout(15000)
})
