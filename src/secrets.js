const insertApiKey = process.env.insertApiKey;
const deleteApiKey = process.env.deleteApiKey;
const usersApiSecret = process.env.usersApiSecret;

const v2 = {
  privateUploadKeyBase64: process.env.v2_private_upload_key_base64,
  publicUploadKeyBase64: process.env.v2_public_upload_key_base64,
  publicUploadKeyKey: process.env.v2_private_upload_key_key,
  totpSecret: process.env.v2_totp_secret,
};

module.exports = {
  insertApiKey,
  deleteApiKey,
  usersApiSecret,
  v2,
};
