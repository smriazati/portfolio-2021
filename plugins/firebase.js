import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/firestore'

// require('dotenv').config()

if (!firebase.apps.length) {
    const config = {
        apiKey: process.env.FB_apikey,
        authDomain: process.env.FB_authDomain,
        databaseURL: process.env.FB_databaseURL,
        projectId: process.env.FB_projectId,
        storageBucket: process.env.FB_storageBucket,
        messagingSenderId: process.env.FB_messagingSenderId,
        appId: process.env.FB_appId,
        measurementId: process.env.FB_measurementId
    }
    firebase.initializeApp(config)
    // firebase.analytics();

}

const fireDb = firebase.firestore()
// const defaultAnalytics = firebase.analytics();

export { fireDb }

