// importing nessecary modules
const { json } = require('express/lib/response');
const path = require('path')
var fs = require('fs');
var lis = JSON.parse(fs.readFileSync('./test.json', 'utf8'));
console.log(lis)

// setting up socket.io and creating server instance
const express = require('express');
const app = express();
const http = require('http')
const server = http.createServer(app);
const io = require('socket.io')(server)


// serves static files for webapp
app.use('/public', express.static(__dirname + '/public'));
// routing, sends the client_page when entered correct address
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client_page.html'));
})


// global variables set
var users = []
var cur_player_count = 0;
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
        cur_player_count += 1
        // add the data as an object to users list
        users.push({
            socket_id: data.user_id,
            user_name: data.user,
            score: 0
        })
        // emit back same data for other client-side operations
        io.emit('new-user', {
            inst: data,
            users: users,
            cur_player_count: cur_player_count
        });
        console.log(users);
    });

    // initial question
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
            }
        }
    })

    // point system and updates list for ALL answers
    socket.on('answer-user-recog', data => {
        // Point progression 
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
            }
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
        // lis.splice(ran_num, 1); commented this out for testing and looped gameplay
        getRandomInt();
        // emit new random question from array
        io.sockets.emit('answer-correct', lis[ran_num])
    });
    
    socket.on('music', () => {
        // turn off this feature for testing cause it is loud
        // io.sockets.emit('music')
    })

    // loading new round, so reset first_answer value to 0
    socket.on('reset-first-value', () => {
        first_answer = 0
    });

    socket.on('disconnect', (socket) => {
        console.log('user disconnected');
        cur_player_count -= 1;
    });
});

server.listen(3000, () => {
    console.log('server live for localhost:3000')
})
