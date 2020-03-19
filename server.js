// server side
const express=require('express');
// expresss server create
const app=express();
// nodejs
const server=require('http').Server(app);
// nodejs => socket enabled
const io= require('socket.io')(server);
// serve static assets to client

app.use(express.static('public'));

io.on('connection',function(socket){
    socket.on("message",function(message){
        console.log(message);

        socket.broadcast.emit('broadcast',message);
    });
    socket.on("color-change",function(cl){
        console.log(cl);
        socket.broadcast.emit('color-changer',cl);

    })
    socket.on("mouseMoving",function(pt_x,pt_y){
        socket.broadcast.emit('mouse-mover',pt_x,pt_y);

    })
    socket.on("mouseMovingS",function(pt_x,pt_y){
        socket.broadcast.emit('mouse-moverr',pt_x,pt_y);

    })
    socket.on("mouseMovingR",function(){
        socket.broadcast.emit('mouse-moverre');

    })
    socket.on("upd",function(img){
        socket.broadcast.emit('upd-img',img);
    })

});
// nodejs server
const port=process.env.PORT||3000;
server.listen(port,function(req,res){
    console.log("Server listening at port " +port);
});