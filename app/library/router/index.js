'use strict';


let fs = require('fs'),
    setup = function router$setup(router) {

        let schemaPath = __dirname + '/routes/',
            control = __dirname + '/../../controllers/';

        fs.readdirSync(schemaPath).forEach(function (file) {
            if (file.match(/(.+)\.js(on)?$/)) {
                fs.stat(control + file, function (err) {
                    if (!err) {
                        router = require(schemaPath + file)(router, require(control + file));
                    } else {
                        console.error('I was not able to find a controller for the', file, 'route.');
                    }
                });
            }
        });
        return router;
    };

module.exports = function (express) {
    return setup(express.Router());
};