"use strict";

var fs = require('fs');
var fsPromises = require('fs').promises;

var jszip = require('jszip');

var odtZipUtils = require('./libs/odt-zip-utils');
class Odt {
    template;
    odtFile;
    odtZip;

    constructor(odtFile){
        /* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
        try {
            //passage de odt à zip
            var odtZip = odtFile.substring(0, odtFile.length - 4);
            odtZip = odtZip + '.zip';
            // renommer le fichier odt en zip
            fsPromises.rename(odtFile, odtZip);
            this.odtZip = odtZip; //odtZip est l'odt en format zip
            this.odtFile = odtFile;
            //lecture de content.xml
            this.template = odtZipUtils.getTemplateOdtFromZip(this.odtZip);

        } catch (err) {
            console.error(err);
        };
        console.log(this.template);
    };
    changeVariable = function (variableName, variable) {
        if (this.template !== null && this.template !== undefined) {
            // recherche de l'emplacement de la variable dans le content.xml, variable stockée comme ça : {{variable}}
            // regex the name
            var variableNameRegex = new RegExp('{{' + variableName + '}}', 'g');
            this.template.replace(variableNameRegex, variable);
        } else {
            console.error("Il n'y a pas de template dans votre objet");
        };
    };
    recreateOdtFile = function () {
        if (this.template !== null && this.template !== undefined) {
            try {
                var zip = new jszip();
                var outZip = new jszip();
                fs.readFile(this.odtZip, function (err, zipData) {
                    if (err) throw err;
                    zip.loadAsync(zipData).then(function(zip) {
                        outZip = zip;
                        outZip.remove('content.xml');
                        outZip.file('content.xml', this.template); //pas le même this
                        outZip.generateNodeStream({type:'nodebuffer',streamFiles:true})
                        .pipe(fs.createWriteStream(this.odtZip))
                        .on('finish', function () {
                            // JSZip generates a readable stream with a "end" event,
                            // but is piped here in a writable stream which emits a "finish" event.
                            console.log(this.odtZip+" written");
                        });
                        fsPromises.rename(this.odtZip, this.odtFile);
                    });
                });         
            } catch (err) {console.error(err);};
        } else {
            console.error('Il faut d\'abord créer un template');
        }
    };
};
module.exports = {Odt: Odt};