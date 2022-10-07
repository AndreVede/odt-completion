var fs = require('fs');

class Odt {
    constructor(template){
        /* An odt is a zip, and when you extract an odt you have a file : content.xml which is our template */
        this.template = template;
    };
    setTemplate = function(template) {
        this.template = template;
    };
};