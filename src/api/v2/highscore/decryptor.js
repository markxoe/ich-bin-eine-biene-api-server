const openpgp = require("openpgp");
const secrets = require("../../../secrets");
const base64 = require("base-64");

/**
 *
 * @param {string} data
 */
const decryptUpload = async (data) => {
  const _privateKey = (
    await openpgp.key.readArmored(
      base64.decode(secrets.v2.privateUploadKeyBase64)
    )
  ).keys;
  for (let i of _privateKey) {
    await i.decrypt(secrets.v2.publicUploadKeyKey);
  }

  const decrypted = await openpgp.decrypt({
    message: await openpgp.message.readArmored(data),
    privateKeys: _privateKey,
  });

  return decrypted.data;
};

module.exports = { decryptUpload };
