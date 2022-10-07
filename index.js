var fs = require('fs');

class Odt {
    constructor(template){
        /* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
        this.template = template;
    };
}

/* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
exports.setTemplate = function(template) {
    Odt.template = template;
};