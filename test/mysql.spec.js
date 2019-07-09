var expect = require('chai').expect;
const { migrate, run } = require('../index')
const config = require('../config_test').mysql
const adapter = require('../adapters/mysql')

const LOGGER = console;
let mysql = adapter(config, LOGGER)

describe('Mysql', () => {

  describe('when the migrations is executed', async () => {
    before(async () => {
      await run(config, mysql)
      await migrate(config, mysql)
    })

    it('should have 4 lines on database', async () => {
      const bd = adapter(config, LOGGER)
      const migrations = await bd.appliedMigrations()
      expect(migrations.length).to.be.equals(4)
    })

  })

})
