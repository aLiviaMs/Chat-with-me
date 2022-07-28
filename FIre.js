import firebase from 'firebase';

class Fire {
    constructor() {
        this.init()
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyBbn3xvn6xtUfnynlvgu9Y60tl16P_W5bs",
                authDomain: "chat-with-me-app-558da.firebaseapp.com",
                projectId: "chat-with-me-app-558da",
                storageBucket: "chat-with-me-app-558da.appspot.com",
                messagingSenderId: "676063677426",
                appId: "1:676063677426:web:f2ca1f24d3b89a445a796b",
                measurementId: "G-B34SNWSJ8D"
            })
        }
    };

    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };

    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            }

            this.db.push(message)
        })
    }

    parse = message => {
        const {user, text, timestamp} = message.val();
        const {key: _id} = message;
        const createAt = new Date(timestamp);

        return {
            _id,
            createAt,
            text,
            user
        }
    }

    get = callback => {
        this.db.on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();