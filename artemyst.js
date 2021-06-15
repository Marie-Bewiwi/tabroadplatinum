// importation bib JSDOM & fsp(Node.js)
const { JSDOM } = require('jsdom');
const fsp = require('fs').promises
//fonction qui parse le document
function parse(content) {
    //crée un dom à partir d'un fichier
    const doc = (new JSDOM(content)).window.document

    const table = doc.querySelector('table')
    const rows = table.querySelectorAll('tr')
    //j'initialise un tableau vide qui va contenir le texte des celulles divisé en tableau
    const filecontent = [];
    console.log(`${rows.length} rows found`) // = concaténation
    // j'itère sur les lignes en poussant le contenu des cellules
    rows.forEach(function parserow(row) {
        const rowcontent = [];
        const colonnes = row.querySelectorAll('td')
        colonnes.forEach(function parsecolonnes(cellule) {
            rowcontent.push(cellule.textContent);
        })
        filecontent.push(rowcontent);
    })
    // j'utlise la méthode writefile pour créer un fichier, dans lequel je vais pousser le contenu de mon tableau de tableaux "filecontent"
    fsp.writeFile('data.json', JSON.stringify(filecontent));
};
// garde l'erreur si y'a padfichié
function onerror() {
    console.log('cant read file');
}
// execution du script
fsp.readFile("./artemyst.html", { encoding: 'UTF8' }).then(parse).catch(onerror)
