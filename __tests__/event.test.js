'use strict';

jest.mock('fs');
const event = require('../src/events.js');

require('../src/logger.js');
require('../src/error.js');

const mocks = require('../__mocks__/fs.js');
let readFile = mocks.readFile;
let writeFile = mocks.writeFile;

describe('error event', () => {
    it('it should console log an error event when an error has happend', () => {
        let spy = jest.spyOn(console, 'log');
        event.emit('error', 'you made a mistake', 'oops error');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});

describe('log event', () => {
    it('it should log a message when a save has happend', () => {
        let spy = jest.spyOn(console, 'log');
        event.emit('log', 'saved!', 'saved cosole');
        expect(spy).toHaveBeenCalled();
        spy.mockRestore();
    });
});


describe('readFile ', () => {
    it('Read a file', () => {
        let fileToRead = 'coolFile.txt';
        return readFile(fileToRead, (err, data) => {
            expect(err).toBeUndefined();
            expect(data).toEqual(Buffer.from(fileToRead));
        });
    });
});

describe('writeFile method', () => {
    it('Write a file', () => {
        let fileToWrite = 'convertFile.txt';
        return writeFile(fileToWrite, (err, data) => {
            expect(err).toBeUndefined();
            expect(data).toEqual(Buffer.from(fileToWrite));
        });
    });
});