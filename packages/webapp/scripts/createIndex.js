const renderToHtml = require('../server/renderToHtml');
const fs = require('fs');

renderToHtml('/').then((html) => fs.writeFile('./build/index.html', html));
