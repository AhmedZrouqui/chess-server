import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
} from "socket-controllers";
import { Socket } from "socket.io";
import db from "../../config/firebase";

@SocketController()
export class AuthController {
  @OnMessage("AUTH_LOGIN")
  async login(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    try {
      const users = collection(db, "users");

      if (message?.isGuest) {
        const user_id = uuidv4();
        await addDoc(users, {
          user_id: user_id,
          isGuest: true,
        });
        socket.emit("AUTH_LOGIN_SUCCESS", {
          user_id: user_id,
        });
      } else {
        if (message?.username && message?.password) {
          const user = query(users, where("username", "==", message?.username));
          if (!user) {
            throw new Error("CREDS UNMATCHED!");
          } else {
            const userSnapshot = await getDocs(user);
            // test user password (HINT) => userSnapshot.docs[0].data().password;
          }
        } else {
          throw new Error("CREDS REQUIRED!");
        }
      }
    } catch (err: any) {
      socket.emit("AUTH_LOGIN_FAIL", "ERROR");
    }
  }
}
