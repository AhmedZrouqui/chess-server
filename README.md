# Chess.io - Server

## Project installation :

Everything is already set up, you just need to clone the repository using `git clone {{link}}`, run `npm install` and `npm start` (nodemon is already set up to run the app file).

You also would want to set your env variables, so just create an `ENV` file .env in the project root, there you can set the Firebase env variable : 

`FIREBASE_API_KEY= your key`

## Documentation :

------------------------------------------

### JOIN_ROOM :

Takes `user_id` and `room_id` as parameters (room id is optional).

#### On fail : 

responds with `AUTH_REQUIRED` message if no user has been provided. (Authentication is required to run this endpoint).

#### On success : 

responds with `JOIN_ROOM_SUCCESS` message and returns:

`room_id`: Id of the joined room.

`game_state`: State of the board.

`ref`: Id of the ROOM<->USER relation.  

NOTE: If no `room_id` has been provided with the `JOIN_ROOM` message, it automatically creates a new room and puts the user on it, matchmaking algorithmes will then be ran to find a match.

------------------------------------------

### VERIFY_USER_INGAME :

takes `user_id` as parameter (Required).

#### On fail : 

responds with `USER_ID_REQUIRED` message if no user has been provided. (Authentication is required to run this endpoint).

#### On success :

responds with `USER_INGAME` alongside a Boolean value to tell wether the user is already in a game or not.




