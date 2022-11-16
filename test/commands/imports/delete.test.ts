import { expect, test } from '@oclif/test'

describe('imports:delete', () => {
  test
    .timeout(5000)
    .stdout()
    .command(['imports:noc'])
    .it('runs NoC', ctx => {
      expect(ctx.stdout).to.contain('-= NoC =-')
    })

})
