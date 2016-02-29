'use strict';


let stream = require('stream'),
    config = require('../../config'),
    request = require('request').defaults({ encoding: null }),
    HTTP = function HTTP(params) {
        if (!(this instanceof HTTP)) {
            return new HTTP(params);
        }

        stream.Readable.call(this, { objectMode: true });

        this.imageURL = params.imagePath;
        this.output = params.output;
        this.image = {};
        this.isComplete = false;
    };

HTTP.prototype._read = function HTTP$read() {
    if (this.isComplete) {
        this.image = null;
        return;
    }

    request.get(this.imageURL, (error, res, body) => {
        if (error) {
            this.image.error = error;
        } else {
            this.image.output = this.output;
            this.image.body = body;
            this.image.originalBodyLength = body.length;
        }

        this.isComplete = true;
        this.push(this.image);
        this.push(null);
        this.image = null;
    });
};

require('util').inherits(HTTP, stream.Readable);
module.exports = HTTP;