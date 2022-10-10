var fs = require('fs');
var fsPromises = require('fs').promises;

var jszip = require('jszip');

var odtOut = new jszip();
class Odt {
    constructor(template){
        /* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
        try {
            this.template = fs.readFileSync('content.xml', template);
            this.writeTemplate = fs.writeFileSync('content.xml', template);
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
        zip.file('content.xml').async("string").then(function (data) {
            return new Odt(data);
        });
    } catch (err) {
        console.error(err);
    };
};