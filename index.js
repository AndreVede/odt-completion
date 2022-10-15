var fs = require('fs');
var fsPromises = require('fs').promises;

var jszip = require('jszip');

var odtOut = new jszip();
class Odt {
    constructor(odtFile){
        /* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
        var file = new ArrayBuffer();
        try {
            //passage de odt à zip
            var odtZip = odtFile.substring(0, odtFile.length - 4);
            odtZip =+ '.zip'        
            fsPromises.rename(odtFile, odtZip);

            //lecture de content.xml
            var zip = new jszip();
            zip.loadAsync(odtZip).then(function(zip) {
                zip.file('content.xml').async("string").then(function (data) {
                    this.template = fs.readFileSync('content.xml', data);
                    this.writeTemplate = fs.writeFileSync('content.xml', data);
                    this.odtZip = odtZip; //odtZip est l'odt en format zip
                });
            });
        } catch (err) {
            console.error(err);
        };
    };
    changeVariable = function (variableName, variable) {
        if (this.template !== null && this.template !== undefined && this.writeTemplate !== null && this.writeTemplate !== undefined) {
            // recherche de l'emplacement de la variable dans le content.xml, variable stockée comme ça : {{variable}}
    
        } else {
            console.error("Il n'y a pas de template dans votre objet");
        };
    };
};
module.exports = {Odt: Odt};