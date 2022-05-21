const fs = require("fs");
const SambaClient = require('samba-client');

const config = require("../config")

module.exports.index = (req, res) => {
    res.json({name: config.APP_NAME})
}