const express = require('express')
const app = express()
const http = require('http').createServer(app)

const PORT = process.env.PORT || 5000

http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket 
const io = require('socket.io')(http)  //http is used to know on which server socket has to work

var userdata=[];
io.on('connection', (socket) => {   //runs when a user enters the localserver

    socket.on("newuser",(name)=>{
        userdata[socket.id]=name;
  socket.broadcast.emit('userconnected',name);

      io.emit("online",userdata);
    })

    socket.on("disconnect",()=>{
   socket.broadcast.emit('user-disconnected',user=userdata[socket.id])
   delete userdata[socket.id]; 
 
   io.emit("online",userdata);
})

    socket.on('message', (msg) => {
               socket.broadcast.emit('message', msg)
    })
    }

)