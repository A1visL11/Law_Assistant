import axios from "axios";
import { firebase } from "./database";

export function loginUser(email, password, setUser) {
    firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('Users') 
                // console.log(usersRef)
                setUser(uid)
            })
            .catch(error => {
                alert("打錯ㄌㄡ")
            })
}


export function signup(name,email,password){
    firebase
            .auth()
            .createUserWithEmailAndPassword(email,password)
            .then((response)=>{
                const uid = response.user.uid
                const data = {
                    uid: uid,
                    email,
                    name,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch(error=>alert(error))
}

export default {loginUser, signup}