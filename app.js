'use strict';

const fs = require('fs');
const event = require('./src/events.js');

require('./src/logger.js');
require('./src/error.js');



const alterFile = (file) => {
    readFile(file)
        .then(data => {
            writeFile(file, convertCase(data));
        });
};



function convertCase(data) {
    return data.toUpperCase();
}



function readFile(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                event.emit('error', 'readFile error', `${err}`);
            }
            event.emit('log', 'readFile', `${file} saved`);
            resolve(data.toString());
        });

    });

}


function writeFile(file, text) {
    return new Promise((resolve, reject) => {

        fs.writeFile(file, Buffer.from(text), (err, data) => {
            if (err) {
                event.emit('error', 'writeFile error', `${err}`);
            }
            resolve(event.emit('log', 'writeFile', `${file} saved`));
        });
    });
}

let file = process.argv.slice(2).shift();
alterFile(file);