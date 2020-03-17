
const SimpleSQL = require('../src/index.js');

const token = "test_token";

describe('Private databases', () => {
    it('create a private database', async () => {
	const db = await SimpleSQL.newDatabase(token);
	expect(typeof db).toBe('string');
    });

    it('list all private databases', async () => {
	const db1 = await SimpleSQL.newDatabase(token);
	const db2 = await SimpleSQL.newDatabase(token);
	const db3 = await SimpleSQL.newDatabase(token);
	const databases = await SimpleSQL.listDatabases(token);
	expect(databases).toEqual(expect.arrayContaining([db1, db2, db3]));
    });
});
