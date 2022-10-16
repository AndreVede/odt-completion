var fs = require('fs');
var fsPromises = require('fs').promises;

var jszip = require('jszip');

var odtZipUtils = {};

odtZipUtils.getTemplateOdtFromZip = async function (odtZip) {
    var template = '';
    await new jszip.external.Promise(function (resolve, reject) {
        fs.readFile(odtZip, function(err, data) {
            if (err) {
                reject(e);
            } else {
                resolve(data);
            }
        });
    }).then(function (data) {
        return jszip.loadAsync(data);
    })
    .then(function (zip) {
        return zip.file('content.xml').async("string");
    }).then(function (data) {
        template = data;
    });
    return template;
};
odtZipUtils.setTemplate = async function(odt) {
    await odtZipUtils.getTemplateOdtFromZip(odt.odtZip).then(function(data) {
        odt.template = data;
    });
};

odtZipUtils.writeOdtZip = async function(odt) {
    var outputZip = new jszip;
    await new jszip.external.Promise(function (resolve, reject) {
        fs.readFile(odt.odtZip, function(err, data) {
            if (err) {
                reject(e);
            } else {
                resolve(data);
            }
        });
    }).then(function (data) {
        return jszip.loadAsync(data);
    })
    .then(function (zip) {
        outputZip = zip;
        outputZip.remove('content.xml');
        outputZip.file('content.xml', odt.template);
        outputZip.generateNodeStream({type:'nodebuffer',streamFiles:true})
        .pipe(fs.createWriteStream(odt.odtZip))
        .on('finish', function () {
            // JSZip generates a readable stream with a "end" event,
            // but is piped here in a writable stream which emits a "finish" event.
            console.log(odt.odtZip+" written");
            fsPromises.rename(odt.odtZip, odt.odtFile);
        });
    });
};
module.exports = odtZipUtils;