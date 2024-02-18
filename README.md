# math-club-webapp
Highschool version of Mathletics, designed for fast-paced maths with VCE concepts. Expandable to other topics. The website implements Express and Socket.io for real-time backend, MyScript handwritting recognision and MathJax for math input and display.  

There are two files that this repo is going into details, server.js and client_page.html. The server.js is for management of questions from a JSON file and distribute them to the clients for display. The client_page.html is to recieve questions emitted from the server and emit data (user inputs) back to the server.

## How to navigate
- If you only care about the application and want to start a local web that is interactive with other devices on the same local area network, go to implement/ folder
- If you would like to go in depth with the code and how client and server communicates, go to code-walkthrough/ and read the two .md files


18/02/2024 note:
codebase is actually pretty bad, making it harder by not using bootstrap or alternatives for UIs and using sockets instead of POST and GETs. So all of above is just a marker for my own skill and I can look back with amusement.
