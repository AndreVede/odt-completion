var fs = require('fs');
var fsPromises = require('fs').promises;

var jszip = require('jszip');

var odtOut = new jszip();
class Odt {
    constructor(template, odtZip){
        /* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
        try {
            this.template = fs.readFileSync('content.xml', template);
            this.writeTemplate = fs.writeFileSync('content.xml', template);
            this.odtZip = odtZip; //odtZip est l'odt en format zip
        } catch (err) {
            console.error(err);
        };
    };
    setTemplate = function(template) {
        try {
            this.template = fs.readFileSync('content.xml', template);
            this.writeTemplate = fs.writeFileSync('content.xml', template);
        } catch (err) {
            console.error(err);
        };
    };
};

exports.getOdtObject = function (odtFile) {
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
                return new Odt(data, odtZip);
            });
        });
    } catch (err) {
        console.error(err);
    };
};

exports.changeVariable = function (odtObject, variableName, variable) {
    if (odtObject.template !== null && odtObject.template !== undefined && odtObject.writeTemplate !== null && odtObject.writeTemplate !== undefined) {
        // recherche de l'emplacement de la variable dans le content.xml, variable stockée comme ça : {{variable}}

    } else {
        console.error("Il n'y a pas de template dans votre objet");
    };
};