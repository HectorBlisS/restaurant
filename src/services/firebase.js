import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { updateUsersFromDBAction, updateOrdersFromDBAction } from '../redux/menuDuck'

let firebaseConfig = {
    apiKey: "AIzaSyACb7imRmi0T5rHkZ3zanCvr3Qr2zSgE1Q",
    authDomain: "sherlock-holmes-1db20.firebaseapp.com",
    databaseURL: "https://sherlock-holmes-1db20.firebaseio.com",
    projectId: "sherlock-holmes-1db20",
    storageBucket: "sherlock-holmes-1db20.appspot.com",
    messagingSenderId: "540929236256",
    appId: "1:540929236256:web:e926f371452c9657cd4b45"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();
let adminsRef = db.collection('admins')
let ordersRef = db.collection('orders')

export function passwordRecovery(email) {
    return firebase.auth().sendPasswordResetEmail(email)
}

export function addOrder(order) {
    return ordersRef.add(order)
        .then(r => {
            console.log(r)
        })
}

export function signOut() {
    return firebase.auth().signOut()
}

export function signIn(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

export function createUser(data) {
    return firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(snap => adminsRef.doc(snap.user.uid).set({ ...data, uid: snap.user.uid }))
}

export function setDataListeners(dispatch, getState) {
    db.collection("admins")
        .onSnapshot(function (snaps) {
            let docs = []
            snaps.forEach(doc => docs.push(doc.data()))
            updateUsersFromDBAction(docs)(dispatch, getState)
        });
    db.collection("orders")
        .onSnapshot(function (snaps) {
            let docs = []
            snaps.forEach(doc => docs.push(doc.data()))
            updateOrdersFromDBAction(docs)(dispatch, getState)
        });
}



