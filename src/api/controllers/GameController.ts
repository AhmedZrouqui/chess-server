import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  ConnectedSocket,
  MessageBody,
  OnMessage,
  SocketController,
} from "socket-controllers";
import { Socket } from "socket.io";
import db from "../../config/firebase";
import { initial_state } from "../../helpers/initial";
import { IRoom } from "../../types/room.type";

@SocketController()
export class GameController {
  @OnMessage("JOIN_ROOM")
  async joinRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    try {
      var roomId = message?.room_id;
      var userId = message?.user_id;

      // fetch collections from firestore
      // TODO: make these imports on different file
      const rooms = collection(db, "rooms");
      const usersToRooms = collection(db, "usersToRooms");

      //verifies if userId is passed on the message body
      //else it creates a new guest user
      if (!userId) {
        throw new Error("AUTH_REQUIRED");
      }

      //verifies if room id is passed on the message body
      //else it creates a new room
      if (!roomId) {
        const newRoom = await addDoc(rooms, {
          room_id: "new_room",
          game_state: JSON.stringify(initial_state),
        });

        roomId = newRoom.id;
      }

      await addDoc(usersToRooms, {
        room_id: `rooms/${roomId}`,
        user_id: `users/${userId}`,
      });

      const entered_room = await getDoc(doc(db, `rooms/${roomId}`));

      socket.emit("JOIN_ROOM_SUCCESS", {
        room_id: (entered_room.data() as IRoom).room_id,
        game_state: (entered_room.data() as IRoom).game_state,
        ref: entered_room.id,
      });
    } catch (err: any) {
      socket.emit(err.message);
    }
  }

  @OnMessage("VERIFY_USER_INGAME")
  async verifyUserInGame(
    @ConnectedSocket() socket: Socket,
    @MessageBody() message: any
  ) {
    try {
      console.log("connected on verify");
      const usersToRooms = collection(db, "usersToRooms");
      if (!message?.user_id) {
        throw new Error("USER_ID_REQUIRED");
      }
      const userInGame = query(
        usersToRooms,
        where("user_id", "==", "users/" + message?.user_id)
      );

      const userInGameSnapshot = await getDocs(userInGame);

      if (userInGameSnapshot.docs.length < 1) {
        socket.emit("USER_INGAME", false);
      } else {
        socket.emit("USER_INGAME", true);
      }
    } catch (err: any) {
      socket.emit(err.message);
    }
  }

  @OnMessage("FINISH_GAME")
  async finish(@ConnectedSocket() socket: Socket, @MessageBody() message: any) {
    try {
      if (message?.ref) {
        throw new Error("FINISH_GAME_FAIL");
      }

      const userToRoom = doc(db, `usersToRooms/${message?.ref}`);
      const DELETE_REQUEST = await deleteDoc(userToRoom);
      socket.emit("FINISH_GAME_SUCCESS");
    } catch (err: any) {
      socket.emit(err.message);
    }
  }
}
