
const SimpleSQL = require('../src/index.js');


test('Create a new database', async () => {
  const tdb = await SimpleSQL.newDatabase();
  expect(typeof tdb).toBe('string');
});

describe('Run SQL against a database', function() {
  var db;

  beforeAll(async function() {
    db = await SimpleSQL.newDatabase();
  });

  test('we can query static values', async function() {
    let one_result = await SimpleSQL.execute(db, "SELECT 1;");
    expect(one_result.message).toBe('RESULT');
    expect(one_result.columns_type.length).toBe(1);
    expect(one_result.columns_type[0]).toBe('INT');
    expect(one_result.columns_name.length).toBe(1);
    expect(one_result.columns_name[0]).toBe('1');
    expect(one_result.values.length).toBe(1);
    expect(one_result.values[0].length).toBe(1);
    expect(one_result.values[0][0]).toBe(1);
  });

  test('we can create table', async () => {
    let create_table = await SimpleSQL.execute(db, "CREATE TABLE foo(a int, b int);");
    expect(create_table.message).toBe('DONE');
    expect(create_table.modified_rows).toBe(0);
  });

  test('we can insert into table', async () => {
    await SimpleSQL.execute(db, "CREATE TABLE bar(a int, b string);")
    let insert = await SimpleSQL.execute(db, "INSERT INTO bar VALUES(1, 'AAA'),(2,'BBB');")
    expect(insert.message).toBe('DONE');
    expect(insert.modified_rows).toBe(2);
  });

  test("we can insert in multiple table with a single transaction", async () => {
    let insert = await SimpleSQL.execute(db, "BEGIN; INSERT INTO foo VALUES(1,2),(2,3); INSERT INTO bar VALUES(3, 'CCC'); COMMIT;")
    expect(insert.message).toBe('DONE');
    expect(insert.modified_rows).toBe(3);
  });

  test('query all the values', async () => {
    let query = await SimpleSQL.execute(db, "SELECT * FROM bar ORDER BY a;");
    expect(query.message).toBe('RESULT');
    expect(query.columns_type.length).toBe(2);
    expect(query.columns_type[0]).toBe('INT');
    expect(query.columns_type[1]).toBe('TEXT');
    expect(query.columns_name.length).toBe(2);
    expect(query.columns_name[0]).toBe('a');
    expect(query.columns_name[1]).toBe('b');
    expect(query.values.length).toBe(3);
    expect(query.values[0].length).toBe(2);
    expect(query.values[0][0]).toBe(1);
    expect(query.values[0][1]).toBe("AAA");
    expect(query.values[1][0]).toBe(2);
    expect(query.values[1][1]).toBe("BBB");
    expect(query.values[2][0]).toBe(3);
    expect(query.values[2][1]).toBe("CCC");
  })

});

