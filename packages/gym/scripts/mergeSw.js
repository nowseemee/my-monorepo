const fs = require('fs');

// open destination file for appending
const w = fs.createWriteStream('./build/sw.js', { flags: 'a' });
// open source file for reading
const r = fs.createReadStream('./build/service-worker.js');

w.on('close', () => {
    console.log('done writing SW');
});

r.pipe(w);
