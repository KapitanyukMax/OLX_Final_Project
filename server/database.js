const admin = require("firebase-admin")
const serviceAccount = require('./firebase/olx-final-project-c6878-firebase-adminsdk-n6vs0-285b84551f.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
