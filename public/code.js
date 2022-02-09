const socket = io()
let name;
let textarea = document.querySelector('#textarea')
let messageArea = document.querySelector('.message__area')
let onlinlist=document.querySelector('.onlinelist');
let click=document.querySelector('.click')
do {
    name = prompt('Please enter your name: ')   //running till the prompt does not get input
} while(!name)

//entry exit code started
socket.emit("newuser",name);

socket.on('userconnected',(socket_name)=>{
    userstatus(socket_name,'joined');
   
})

function userstatus(name,status){
    let div=document.createElement("div");
    div.classList.add('user_joined');
    let content=`<p>${name} has ${status} the chat</p>`;
    div.innerHTML=content;
    messageArea.appendChild(div);
}

socket.on('user-disconnected',(user)=>{
userstatus(user,'left');
})

socket.on('online',(userdata)=>{

onlinlist.innerHTML="";
userarr=Object.values(userdata);
for(i=0;i<userarr.length;i++){
    console.log(userarr[i]);
    let p=document.createElement('p');
    p.innerText=userarr[i];
    onlinlist.appendChild(p);

}}
)


// entry exit code ended
textarea.addEventListener('keyup', (e) => {
    if(e.key === 'Enter') {         //triggered when the enter key is pressed
        sendMessage(e.target.value)          
    }

})

click.addEventListener('click',()=>{
    sendMessage(textarea.value)
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message
    }
    // Append 
    appendMessage(msg, 'outgoing')
    textarea.value = ''
    scrollToBottom()

    // Send to server 
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
        <h3>${msg.user}</h3>
        <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv)
}

// Recieve messages 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
