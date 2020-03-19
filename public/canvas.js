// const socket=io.connect("http://localhost:3000");

let isMouseDown=false;
ctx.strokeStyle="blue";

board.addEventListener("mousedown",function(e){
    ctx.beginPath();
    isMouseDown=true;
    ctx.moveTo(e.clientX-rect.x,e.clientY-rect.y);
    ctx.stroke();
    socket.emit('mouseMovingS',e.clientX-rect.x,e.clientY-rect.y);
});
board.addEventListener("mousemove",function(e){
    if(isMouseDown==true)
    {
        console.log(ctx);
        ctx.lineTo(e.clientX-rect.x,e.clientY-rect.y);
        ctx.stroke();
        socket.emit('mouseMoving',e.clientX-rect.x,e.clientY-rect.y);
    }
    
});
board.addEventListener("mouseup",function(e){
    isMouseDown=false;
    ctx.closePath();
    socket.emit('mouseMovingR');

    
});
socket.on('mouse-mover',function(pt_x,pt_y){

    if(isMouseDown==true)
    {
        console.log(ctx);
        ctx.lineTo(pt_x,pt_y);
        ctx.stroke();
    }

});
socket.on('mouse-moverr',function(pt_x,pt_y){
    ctx.moveTo(pt_x,pt_y);
    ctx.beginPath();
    isMouseDown=true;
    ctx.stroke();


});
socket.on('mouse-moverre',function(){
    isMouseDown=false;
    ctx.closePath();
});