const { JSDOM } = require('jsdom');
const fsp = require('fs').promises
function parse(content) {
    const doc = (new JSDOM(content)).window.document
    const table = doc.querySelector('table')
    const rows = table.querySelectorAll('tr')
    console.log(`${rows.length} rows found`) // = concaténation
    rows.forEach(function parserow(row) {
        const colonnes = row.querySelectorAll('td')
        colonnes.forEach(function parsecolonnes(cellule) {
            console.log(cellule.textContent)
        })
    })

};
function onerror() {
    console.log('cant read file');
}
fsp.readFile("./artemyst.html", { encoding: 'UTF8' }).then(parse).catch(onerror)
