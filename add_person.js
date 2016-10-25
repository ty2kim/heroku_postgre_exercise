// initializing the library
const settings = require('./settings'); // settings.json
const knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database,
    port: settings.port,
    ssl: settings.ssl,
  },
});

// getting the input
const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];

knex('famous_people')
.insert({ first_name: firstName, last_name: lastName, birthdate: date })
.then(() => {
  knex.destroy(() => {
    return { inserted: true };
  });
});
