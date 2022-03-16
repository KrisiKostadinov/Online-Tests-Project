const mongoose = require('mongoose');

const conn = process.env.CONN_STR;

try {
    mongoose.connect(conn, () => {
        console.log('database is ready on: ' + conn);
    });
} catch (error) {
    console.log(error);
}