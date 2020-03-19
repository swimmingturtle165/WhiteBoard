const imageupload=document.querySelector(".image-upload");
imageupload.addEventListener("change",function(e){
    const img=document.createElement("img");

    const  imgdata=imageupload.files[0];
    img.src=URL.createObjectURL(imgdata);
    console.log(img.src);
    const body=document.querySelector("body");
    img.height=400;
    img.width=400;
    body.appendChild(img);
    socket.emit('upd',img.src);

})