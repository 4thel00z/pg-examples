import * as pg from "pg";
import {Vertex} from "./entities/Vertex";

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
const config: {} = {
    user: 'moe', //env var: PGUSER
    database: 'ransomware', //env var: PGDATABASE
    //password: 'secret', //env var: PGPASSWORD
    host: 'localhost', // Server hosting the postgres database
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

//noinspection TypeScriptUnresolvedFunction
let pool = new pg.Pool(config);


pool.connect(function (err, client, done) {
    if (err) {
        return console.error('error fetching client from pool', err);
    }

    new Vertex(0).to(new Vertex(1), 10).save(client, done);

    /**
     *
     *    client.query('SELECT $1::int AS number', ['1'], function (err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows[0].number);
        //output: 1
    });
     * */

});

pool.on('error', function (err, client) {
    // if an error is encountered by a client while it sits idle in the pool
    // the pool itself will emit an error event with both the error and
    // the client which emitted the original error
    // this is a rare occurrence but can happen if there is a network partition
    // between your application and the database, the database restarts, etc.
    // and so you might want to handle it and at least log it out
    console.error('idle client error', err.message, err.stack)
});