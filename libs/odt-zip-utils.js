var fs = require('fs');
var fsPromises = require('fs').promises;

var jszip = require('jszip');

var odtZipUtils = {};

odtZipUtils.getTemplateOdtFromZip = async function (odtZip) {
    contentPromise = new jszip.external.Promise(function (resolve, reject) {
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
        return data
    });
    await contentPromise;
    return contentPromise;
};
module.exports = odtZipUtils;