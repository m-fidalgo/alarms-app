const admin = require("firebase-admin");

const serviceAccount = require("./private-keys.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const topic = "atualizacoes";
const token =
  "cwJFNnNvR6ONxacUHrVX8G:APA91bGF6TiXdnPec6WJiwyjzH9LDnUzZfbOdHPzR0BotyWaByaju4g7arhlfHdwmcqZYOdiFqnSzIRtcShN3FwF0vyVC73KsL_XRN8UBrQScP2n3crbuGjmSaFYLg2RAyUfTTD2GcHs";
const options = {
  priority: "normal",
  timeToLive: 24 * 60 * 60,
};

admin
  .messaging()
  .sendToDevice(
    token,
    {
      data: {
        title: "Notificacao",
        message: "teste",
      },
    },
    options
  )
  .then((resp) => {})
  .catch((error) => console.log("Erro"));
