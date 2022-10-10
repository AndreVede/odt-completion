var fs = require('fs');
var jszip = require('jszip');

var odtOut = new jszip();
class Odt {
    constructor(template){
        /* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
        try {
            this.template = fs.readFileSync(template);
        } catch (err) {
            console.error(err);
        };
    };
    setTemplate = function(template) {
        try {
            this.template = fs.readFileSync(template);
        } catch (err) {
            console.error(err);
        };
    };
};