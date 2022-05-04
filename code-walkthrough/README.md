# The overall interaction between client and server can be summarized through diagrams below

The application starts by initiating a HTTP handshake and upgrades to a websocket connection.
![img1](./pictures/client-server-handshake.PNG)

Once the user has given their username in the username form, the client will send off two events to the server
![img2](./pictures/new-user.PNG)
