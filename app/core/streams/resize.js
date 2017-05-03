'use strict';


const sharp = require('sharp');
const Transform = require('stream').Transform;

module.exports = next => new Transform({
    objectMode: true,
    transform: (image, encoding, callback) => {

        try {
            setImmediate(async () => {
                if (image.output.width > 0 || image.output.height > 0) {
                    image.body = await sharp(image.body)
                        .resize(image.output.width, image.output.height)
                        .withoutEnlargement()
                        .toBuffer();
                }

                callback(null, image);
            });
        } catch (error) {
            callback(error);
        }
    }
}).once('error', next);
