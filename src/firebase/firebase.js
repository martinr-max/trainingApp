import firebase from 'firebase/app';

const config = {
        apiKey: ' AIzaSyCd0NsNdxQwaBjJXFXmwMocBkhtni6XFOU ',
        authDomain: ' training-app-d460e.firebaseapp.com ',
        databaseURL: 'https://training-app-cf8f3.firebaseio.com>',
        projectId: 'training-app-d460e',
        storageBucket: 'training-app-cf8f3.appspot.com',
        messagingSenderId: '209321811851'
      
}

firebase.initializeApp(config);




export default firebase;