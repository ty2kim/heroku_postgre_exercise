const pg = require('pg');
const settings = require('./settings'); // settings.json

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl,
});

const person = process.argv[2];

client.connect((err) => {
  if (err) {
    return console.error('Connection Error', err);
  }

  const query = 'SELECT * FROM famous_people WHERE first_name=$1 OR last_name=$1';
  client.query(query, [person], (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }

    console.log('Searching ...');
    const numPeople = result.rows.length;
    console.log(`Found ${numPeople} person(s) by the name '${person}':`);
    for (row of result.rows) {
      console.log(`- ${row.id}: ${row.first_name} ${row.last_name}, born '${row.birthdate}'`);
    }

    client.end();
  });
});
