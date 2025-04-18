import { firebase } from "../server/database";
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// async function sendMessage(roomId, user, text) {
//     try {
//         await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
//             uid: user.uid,
//             displayName: user.displayName,
//             text: text.trim(),
//             timestamp: serverTimestamp(),
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }


export function createChatRoom(id,title,user){
    firebase
            .firestore()
            .collection('chatrooms')
            .add({
                cId:id,
                title:title,
                uId:user,
            })
            .catch(err=>console.log(err))
}

export function getRoomTitle(user,setRooms){
    return firebase
            .firestore()
            .collection('chatrooms')
            .where("uId","==",user)
            .get()
            .then((querySnapshot) => {
                let titles = [];
                querySnapshot.forEach((doc) => {
                    titles.push({roomName:doc.data().cId, roomTitle:doc.data().title});
                });
                titles.sort((a, b) => {
                    // Convert the name properties to numbers and compare them
                    return parseInt(a.roomName) - parseInt(b.roomName);
                }).reverse();
                console.log("titles: ",titles)
                titles.unshift({roomName:String(titles.length),roomTitle:'New'})
                return titles
                if(setRooms!==undefined) 
                {
                    
                    // 
                    setRooms(titles) // Return an array of titles
                }
                    
            })
            .catch(err=>{
                console.log(err)
                return [{roomName:'0',roomTitle:'New'}]
                if(setRooms!==undefined)
                    setRooms([{roomName:'0',roomTitle:'New'}]);
            })
}

export function createMessage(cid,user,message){
    firebase
            .firestore()
            .collection('chat')
            .add({
                cid:cid,
                userId:user,
                message:message,
                Timestamp:firebase.firestore.FieldValue.serverTimestamp()
            })
            .catch(err=>console.log(err))
}
//
export function fetchChatLog(name,user) {
    return firebase
      .firestore()
      .collection('chat')
      .where("cid", "==", name )
      .where("userId", "==", user)
      .get()
      .then((querySnapshot) => {
        let chatLog = [];
        querySnapshot.forEach((doc) => {
          chatLog.push({
            cid: doc.data().cid,
            content: doc.data().message.content,
            role: doc.data().message.role,
            Timestamp: doc.data().Timestamp
          });
        });
        const sorted = chatLog.sort(
            (a,b) => a.Timestamp - b.Timestamp
        );
        console.log('inFUNC:', chatLog);
        return sorted;
      })
      .catch((error) => {
        console.error('Error fetching chat log:', error);
        return []; // Return an empty array in case of an error
      });
  }
  
export default {getRoomTitle, createChatRoom, fetchChatLog }
