import {db} from '../config/firebase'

// const getData = async () => {
//   const snap = await db.collection("chat-rooms").get();
//   return snap.docs.map(doc=>doc.data())
// }

async function AddUserToRoom(roomName , userName){
    const roomRef = db.collection("chat-rooms");
    const users = [];
    await roomRef.where("roomName", "==", roomName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            doc.data().connectedUsers.forEach(user=> users.push(user))
        });
        users.push(userName);
    });
    console.log(users)
    await roomRef.where("roomName", "==", roomName).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
                    doc.ref.update({
                        connectedUsers : users
                    })
        });
    });
}


export default AddUserToRoom;
