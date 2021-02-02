const { request } = require("express");

/**
 *
 * @param {{data:string,totp:string,chksum:string}} requestData
 */
const postRequestBody = (requestData) => {
  const rqd = requestData;
  return rqd.data && rqd.totp && rqd.chksum;
};

/**
 *
 * @param {request} req
 */
const postRequestHeaders = (req) => {
  const totp = req.header("totp");
  const totpDouble = req.header("totpdouble");
  return totp && totp == totpDouble;
};

module.exports = { postRequestBody, postRequestHeaders };
