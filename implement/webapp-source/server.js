// Importing nessecary modules
const express = require('express');
const { json } = require('express/lib/response');
const app = express();
const path = require('path')
const fs = require('fs');

// creating Server instance
const http = require('http').Server(app);
const cors = require('cors');

// CORS for crossing HTTP with HTTPS
const io = require('socket.io')(http, {
    cors: {
        origin: "*"
    }
});

// Parse questions JSON file
var lis = JSON.parse(fs.readFileSync('./poly.json', 'utf8'));
console.log(lis)


// resolves COR problem when accessing webapp from internet
app.use(cors())
// serves static files for webapp
app.use('/public', express.static(__dirname + '/public'));
// routing, sends the client_page when entered correct address
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client_page.html'));
})


// global variables set
var users = []
var ran_num; 
// assign first_answer for check if the incoming answer socket is first or others (1 = first and any other num = not first).
var first_answer = 0;


function getRandomInt() {
    // Generates ran_num in [0, list length]
    ran_num = Math.floor(Math.random() * lis.length);
}
// for initial question
getRandomInt()


// when a new socket connects with server
io.on('connection', (socket) => {
    // waits for client to emit() new-user data
    socket.on('new-user', (data) => {
        console.log(`socket_user_id: ${data.user_id}`)
        // add the data as an object to users list
        users.push({
            socket_id: data.user_id,
            user_name: data.user,
            score: 0
        })
        // emit back same data for other client-side operations
        io.emit('new-user', {
            inst: data,
            users: users
        });
        console.log(users);
    });

    // init question
    var question_dis = lis[ran_num];
 
    socket.on('display-question', () => {
        console.log(question_dis)
        io.emit('display-question', question_dis);
    });
    
    socket.on('req-username', (data) => {
        for (let users_entry of users) {
            if (users_entry.socket_id == data.user_id) {
                //console.log(users_entry.user_name)
                socket.emit('req-username', users_entry.user_name)
            } else {
                console.log('THROW ERR NO USER IN ARR')
            }
        }
    })

    // point system and updates list for ALL answers
    socket.on('answer-user-recog', data => {
        // first person answered
        first_answer += 1;
        console.log(`new answer, f_ans val = ${first_answer}`)
        for (let users_entry of users) {
            if (users_entry.user_name == data.point_user) {
                users_entry.score += 1
                console.log(users)

                // return correct answer by user for all to display
                io.sockets.emit('answer-user-recog', {
                    point_user: data.point_user,
                    user_score: users_entry.score
                })
            } else {
                console.log('THROW ERR ON SERVER SCORE SYS')
            };
        };
    });

    // checks if it is first answer in new round or not
    socket.on('first-answer-check', () => {
        if (first_answer == 1) {
            socket.emit('first-answer-check', {data: 'yes'})
        } else {
            socket.emit('first-answer-check', {data: 'no'})
        }
    })

    // when someone gets answer correct
    socket.on('answer-correct', () => {
        // removes the answered question from array
        lis.splice(ran_num, 1);
        getRandomInt();
        // emit new random question from array
        io.sockets.emit('answer-correct', lis[ran_num])
    });
    
    socket.on('music', () => {
        io.sockets.emit('music')
    })

    // loading new round, so reset first_answer value to 0
    socket.on('reset-first-value', () => {
        first_answer = 0
        console.log(`reseted round, f_ans val = ${first_answer}`)
    });

    socket.on('disconnect', (socket) => {
        console.log('user disconnected');
    });
});

http.listen(3000, () => {
    console.log('server live for localhost:3000')
})
