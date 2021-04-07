const admin = require("firebase-admin");

const serviceAccount = require("./private-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
