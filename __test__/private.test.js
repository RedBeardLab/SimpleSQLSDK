
const SimpleSQL = require('../dist/simplesql.js');

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

    it('without token list database response 401', async () => {
	const databases = SimpleSQL.listDatabases();
	await expect(databases).rejects.toThrow();
    })

    it('without token a command to a private database response 401', async () => {
	const db = await SimpleSQL.newDatabase(token);
	const non_auth = SimpleSQL.command(db, "SELECT 1;");
	await expect(non_auth).rejects.toThrow();
	const ok_auth = await SimpleSQL.command(db, "SELECT 1;", token);
	expect(ok_auth.message).toBe('RESULT');
	const random_auth = SimpleSQL.command(db, "SELECT 1;", 'ccerbchbehrbrandomcnjernve');
	await expect(random_auth).rejects.toThrow();
    });

    it('is possible to create a new token', async () => {
	const new_token = await SimpleSQL.newToken(token);
    	expect(typeof new_token).toBe('string');
	const another_token = await SimpleSQL.newToken(new_token);
	expect(typeof another_token).toBe('string');
    });
    it('is possible to list all the tokens', async () => {
	const token1 = await SimpleSQL.newToken(token);
	const token2 = await SimpleSQL.newToken(token);
	const token3 = await SimpleSQL.newToken(token);
	const tokens = await SimpleSQL.listTokens(token);
	expect(tokens).toEqual(expect.arrayContaining([token1, token2, token3]));
    });
    it('each token allow to create and command databases', async () => {
	const new_token = await SimpleSQL.newToken(token);
	const new_db = await SimpleSQL.newDatabase(new_token);
	expect(typeof new_db).toBe('string');
	const ok1 = await SimpleSQL.command(new_db, "SELECT 1;", token);
	expect(ok1.message).toBe('RESULT');
	const ok2 = await SimpleSQL.command(new_db, "SELECT 1;", new_token);
	expect(ok2.message).toBe('RESULT');
    });
});
