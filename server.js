var express=require("express");
const http=require("http");
var app=express();
const server= http.createServer(app);
app.set("view engine", "ejs");
const socketio=require("socket.io");
const io= socketio(server);

app.use(express.static("public"));


const users={};
 
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
        
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message, name: users[socket.id]})
    });
    

socket.on("disconnect",message=>{
    socket.broadcast.emit("left",users[socket.id]);
    delete users[socket.id];
});
});








server.listen(30005,function(){
	console.log("started");
})