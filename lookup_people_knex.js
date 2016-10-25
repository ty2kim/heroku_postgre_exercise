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
const person = process.argv[2];

// using promises
// knex.select('*')
// .from('famous_people')
// .where('first_name', person)
// .orWhere('last_name', person)
// .then((rows) => {
//   console.log('Searching ...');
//   const numPeople = rows.length;
//   console.log(`Found ${numPeople} person(s) by the name '${person}':`);
//   for (row of rows) {
//     console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);
//   }
//
//   knex.destroy();
// })
// .catch((error) => {
//   console.log(error);
// });

// using ascallback
knex.select('*')
.from('famous_people')
.where('first_name', person)
.orWhere('last_name', person)
.asCallback((err, rows) => {
  if (err) return console.error(err);
  console.log('Searching ...');
  const numPeople = rows.length;
  console.log(`Found ${numPeople} person(s) by the name '${person}':`);
  for (row of rows) {
    console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);
  }

  knex.destroy();

});
