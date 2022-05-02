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
and you should have a folder 'math-club-webapp' on your current directory, navigate yourself into math-club-webapp/implement/
