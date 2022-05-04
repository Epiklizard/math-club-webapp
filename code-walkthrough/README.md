# The overall interaction between client and server can be summarized through diagrams below

The application starts by initiating a HTTP handshake and upgrades to a websocket connection.
![img1](./pictures/client-server-handshake.PNG)

## Initializing New Users and Displaying Math Question
Once the user has given their username in the username form on client side, the client will send off two events to the server called 'new-user' and 'display-question'. The first event would send the username of the player to the server to update and store in users list, and the 'display-question' would simply flag the server that the client is ready so the sever would send the on-going question to the new client. Then the server would emit 'new-user' event for clients to update the total players counter.
![img2](./pictures/new-user.PNG)

## Receiving Correct Answers and Updating Questions
The game is built so that once the first correct answer has been received, there would be a 10 second countdown for other players to finish up their working outs and put in their answers. So there are two scenarios on if-else condition:

- The answer received IS the first answer
![img3](./pictures/first-answer.PNG)
for the two events above
