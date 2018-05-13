const functions = require('firebase-functions');
const yt = require('./yt');
const app = require('./app');

global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

exports.app = functions.https.onRequest(app);
exports.yt = functions.https.onRequest(yt);
