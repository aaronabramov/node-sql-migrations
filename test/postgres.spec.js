var expect = require('chai').expect;
const { migrate, run } = require('../index')
const config = require('../config_test').postgres
const adapter = require('../adapters/pg')

const LOGGER = console;
let pg = adapter(config, LOGGER)

describe('PostgreSQL', () => {

  describe('when the migrations is executed', async () => {
    before(async () => {
      await run(config, pg)
      await migrate(config, pg)
    })

    it('should have 3 lines on database', async () => {
      const bd = adapter(config, LOGGER)
      const migrations = await bd.appliedMigrations()
      expect(migrations.length).to.be.equals(3)
    })

  })

})
