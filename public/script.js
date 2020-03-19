// const io= require('socket.io')(server);
const socket=io.connect("https://sachitwhiteboard.herokuapp.com/");

const board = document.querySelector(".board");
const rect=board.getBoundingClientRect();
const eraser=document.querySelector(".eraser");
const pen_s=document.querySelector('#pen-size');
const pen_sz=pen_s.value;
const eraser_s=document.querySelector('#eraser-size');
const eraser_sz=eraser_s.value;
// const pencil=document.querySelector("pencil");


board.height = window.innerHeight-rect.y;
board.width = window.innerWidth-rect.x;

// canvasRenderingContext2d=> tool
const ctx = board.getContext("2d");

ctx.strokeStyle="red";
ctx.imageSmoothingEnabled=true
// ctx.fillRect(0,0,board.width,board.height);
// ctx.beginPath();
// ctx.moveTo(0,0);

// ctx.strokeStyle="blue";

// ctx.lineTo(500,100);
// ctx.stroke();

pen_s.addEventListener("change",function(e)
{
    ctx.lineWidth  =pen_s.value;
});

eraser_s.addEventListener("change",function(e)
{
    ctx.lineWidth  =eraser_s.value;
    ctx.strokeStyle="cyan";

});

eraser.addEventListener("click",function(){
    ctx.strokeStyle="cyan";
    ctx.lineWidth=16;
});

// pencil.addEventListener("click",function(){
//     ctx.strokeStyle="red";
//     ctx.lineWidth=pen_sz;
// });
let activeTool="pencil";
function handleToolChange(tool){
    if(tool=='pencil')
    {
        if(activeTool=='pencil')
        {

        }
        else
        {
            activeTool=='pencil';
            ctx.strokeStyle='red';
            ctx.lineWidth=pen_sz;

        }
    }

}
document.querySelector('a').addEventListener('click', event =>
  event.target.href = canvas.toDataURL()
);
function colorchange(cl){
    ctx.strokeStyle=cl;
    socket.emit('color-change',cl);
};
socket.on('color-changer',function(cl)
{
    ctx.strokeStyle=cl;;

})
socket.on('upd-img',function(img_src){
    
    const img=document.createElement("img");

    
    img.src=img_src;
    console.log(img.src);
    const body=document.querySelector("body");
    img.height=400;
    img.width=400;
    body.appendChild(img);

});