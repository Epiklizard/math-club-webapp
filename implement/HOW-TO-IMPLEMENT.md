# This doc will teach you how to implement the webapp locally and accessible via local IP
before we start, make sure you have a Git Bash console for installing modules, Windows machines do not have one, so here's a 5 minute tutorial on how to install the Git Bash emulator: https://www.youtube.com/watch?v=qdwWe9COT9k

The only two commands needed to implement this web application is cd, and git clone. Cd teleports you into directories, or travel to a relative directory. To get to /Desktop, or /Documents, first do
```sh
$ cd ~
$ ls
```
ls just shows you all the files in the current directory, now from the ls command you should recognise familiar folders like /Document, /Downloads, etc. In my case, /Desktop was in OneDrive/, so I had to:
```sh
$ cd OneDrive/Desktop
```
## Git Clone
Once we are in /Desktop or wherever, type in:
```sh
$ git clone https://github.com/Epiklizard/math-club-webapp
```
and you should have a folder 'math-club-webapp' on your current directory, navigate yourself into math-club-webapp/implement/webapp-source and you'd have the all the files needed to start the application, copy them into a new folder (on Desktop) and cd into that folder.

Once we have the git bash console in the new directory along all the files and folder (server.js, client_page.html, poly.js, and public/) in the same directory, it is time to install the nessecary modules:
```sh
$ npm init -y
$ npm i express socket.io nodejs nodemon
```
That's it! You are ready to deploy on localhost:3000, this means that only your device can see it at the moment. To deploy for other interfaces in THE SAME LOCAL NETWORK, edit the server.js file on line

