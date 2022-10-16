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
            odtZipUtils.setTemplate(this).then(function() {
                console.log('Template mis à jour');
            });
        } catch (err) {
            console.error(err);
        };
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
                odtZipUtils.writeOdtZip(this);      
            } catch (err) {console.error(err);};
        } else {
            console.error('Il faut d\'abord créer un template');
        }
    };
};
module.exports = {Odt: Odt};