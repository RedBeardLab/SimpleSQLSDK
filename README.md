# [SimpleSQL][simplesql] SDK

[SimpleSQL][simplesql] is a complete SQL database accessible via HTTP API.

It is based on SQLite and allow to create a multitude of small databases.

(Consider that we run our front-end test against the live service and each test create a new database.)

The API is [documented on swagger][swagger] where it is possible to create a new database and execute commands and query against it. 
Don't worry it is free!

User without authentication can create and work only with public databases, for private databases is necessary to register and then the user will have access to authentication tokens.

A simple TODO app implemented with SimpleSQL is available [following this link](https://redisql.redbeardlab.com/SimpleSQLSDK/) while the source is in the `index.html` file.

## Subscribe to the mail list

SimpleSQL is a growing project, you can [subscribe to updates here.][subscribe]

## The SDK

This package provide a Javascript SDK that allow to write severless application that can comunicate with a database directly from the browser. The same SDK can be used to develop nodejs application.

The SDK is simple just like the API and it should be possible to understand it very quickly, especially if guided by the tests.

## Installation

On server environments `npm i @redbearlab/simplesql`.

On browsers:

```html
<script type="text/javascript" src="https://unpkg.com/@redbeardlab/simplesql@>=1.0.8"></script>
```

In the browser environment is necessary to set the CORS headers to use the authentication/private databases.

```
Access-Control-Allow-Origin: https://simplesql.redbeardlab.com
```

## API

The API is await/async first.

### [Create new database](https://app.swaggerhub.com/apis-docs/redbeardlab/simplesql.redbeardlab.com/0.1.1#/developers/post_database)

```
let new_public_database = await SimpleSQL.newDatabase();
let new_private_database = await SimpleSQL.newDatabase('your_token_here');
```

`SimpleSQL.newDatabase([token])` create a new (private if you provide the token) database and returns its ID.

### [Send Command](https://app.swaggerhub.com/apis-docs/redbeardlab/simplesql.redbeardlab.com/0.1.1#/developers/post_command__databaseID_)

```
let result_public = await SimpleSQL.command(database_id, query);
let result_private = await SimpleSQL.command(database_id, query, 'your_token_here');
```

`SimpleSQL.command(database, command [, token] )` execute an SQL command against the database and return the results.
If you provide a token it is possible to execute commands also against the private databases create by the costumer.

### [List databases](https://app.swaggerhub.com/apis-docs/redbeardlab/simplesql.redbeardlab.com/0.1.1#/developers/get_databases)

```
let databases = await SimpleSQL.listDatabases('your_token_here');
```

`SimpleSQL.listDatabases(token)` returns all the databases of the costumer.
The command must be invoked with a token, it is not possible to list all the public databases.

### [Create new token](https://app.swaggerhub.com/apis-docs/redbeardlab/simplesql.redbeardlab.com/0.1.1#/developers/post_token)

```
let new_token = await SimpleSQL.newToken('your_token_here');
```

`SimpleSQL.newToken(token)` create a new token and return it.
The new token can be used to access all the databases created with the original token, to create new databases, or to create new tokens.

### [List all tokens](https://app.swaggerhub.com/apis-docs/redbeardlab/simplesql.redbeardlab.com/0.1.1#/developers/get_tokens)

```
let tokens = await SimpleSQL.listTokens('your_token_here');
```

`SimpleSQL.listTokens(token)` returns a list of all the token associate with the account.
Each token can be used to create private databases, query private databases or create new tokens.

## Contributing

The biggest contribution is your feedback on the product and API.

Feel free to open an issue, a PR or send directly an email to [simone@redbeardlab.com](mailto:simone@redbeardlab.com)

If you want to contribute to the code, feel free to run the tests.

A dummy user with a dummy token is present in the tests, it can be used freely.

[simplesql]: https://simplesql.redbeardlab.com
[swagger]: https://app.swaggerhub.com/apis-docs/redbeardlab/simplesql.redbeardlab.com/0.1.1
[subscribe]: https://landing.mailerlite.com/webforms/landing/d5m9d6

