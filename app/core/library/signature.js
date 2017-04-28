'use strict';


const crypto = require('crypto');
const query = require('querystring');
const config = _require('config');

module.exports = (req, res, next) => {

    if (config.noAuthAllowed && req.params.signature === 'noauth') {
        return next();
    }

    let url = '/' + req.params[0] + '?' + query.stringify(req.query),
        serverSignature = crypto.createHmac('sha1', config.key).update(req.get('Host') + url).digest('hex');

    if (serverSignature === req.params.signature) {
        return next();
    }

    next({ status: 403 });
};