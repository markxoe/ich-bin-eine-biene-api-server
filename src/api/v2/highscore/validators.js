const { request } = require("express");
const speakeasy = require("speakeasy");
const crypto = require("crypto");
const uuids = require("uuid");

const secrets = require("../../../secrets");
/**
 * Validate TOTP from request
 * @param {number} totp
 */
const totpChecker = (totp) => {
  return speakeasy.totp({ secret: secrets.v2.totpSecret }) == totp;
};

/**
 *
 * @param {string} data
 * @param {string} chksum
 */
const checksumChecker = (data, chksum) => {
  return crypto.createHash("md5").update(data).digest("base64") == chksum;
};
const userids = (uuid) => {
  return uuids.validate(uuid);
};

module.exports = { totpChecker, checksumChecker, userids };
