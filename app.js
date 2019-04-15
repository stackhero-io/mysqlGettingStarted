require('dotenv').config()
const mysqlx = require('@mysql/xdevapi');
const faker = require('faker');


(async () => {
  if (!process.env.MYSQL_HOST) {
    console.error('You have to define credentials in the `.env` file (see the `.env-example` file as an example).');
    process.exit(1);
  }

  // Connection to MySQL using MySQL X Protocol
  // Note: credentials have to be defined in the `.env` file (see the `.env-example` file as an example).
  const session = await mysqlx.getSession({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
  });


  // Create schema (database) if not exists
  const schemaExists = await session.getSchema('stackherotest').existsInDatabase();
  if (!schemaExists) {
    await session.createSchema('stackherotest');
  }

  // Create table "users" if not exists
  const tableExists = await session
    .getSchema('stackherotest')
    .getTable('users')
    .existsInDatabase();
  if (!tableExists) {
    await session
      .sql('CREATE TABLE `stackherotest`.`users` '
        + '('
        + '`userId` INT UNSIGNED NOT NULL,'
        + '`name` VARCHAR(128) NOT NULL,'
        + '`address` TEXT NOT NULL,'
        + '`email` VARCHAR(265) NOT NULL'
        + ') '
        + 'ENGINE = InnoDB;')
      .execute();
  }


  // Prepare 1000 fake users to be inserted
  const insert = session
    .getSchema('stackherotest') // Database name
    .getTable('users') // Table name
    .insert('userId', 'name', 'address', 'email'); // Columns names

  for (let i = 0; i < 1000; i++) {
    insert.values([
      Math.round(Math.random() * 100000), // Generate a fake userId
      faker.name.findName(), // "name"
      faker.address.streetName(), // "address"
      faker.internet.email() // "email"
    ]);
  }

  // Execute the request (insert 1000 users)
  await insert.execute();


  console.log('Users have been added 👍');
  console.log('Connect to your PhpMyAdmin and see them in database stackherotest, table users');


  // Count number of rows in table users
  const usersCount = await session
    .getSchema('stackherotest') // Database name
    .getTable('users')
    .count();

  console.log(`There is now ${usersCount} in table "users"`);

  await session.close();

})().catch(error => {
  console.error('');
  console.error('🐞 An error occurred!');
  console.error(error);
  process.exit(1);
});