const { JSDOM } = require('jsdom');
const fsp = require('fs').promises
function parse(content) {
    const doc = (new JSDOM(content)).window.document
    const table = doc.querySelector('table')
    console.log(table)
};
function onerror() {
    console.log('cant read file');
}
fsp.readFile("./page.html", { encoding: 'UTF8' }).then(parse).catch(onerror)