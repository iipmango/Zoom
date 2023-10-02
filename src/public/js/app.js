const messageList = document.querySelector("ul");
const nicknameForm = document.querySelector("#nickname");
const messsageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`)

function makeMessage(type, payload) {
    const msg = {type, payload}
    return JSON.stringify(msg);
}

socket.addEventListener("open", () => {
    console.log("Connected to Server");
});

socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
})

socket.addEventListener("close", () =>{
    console.log("Disonnected to Server");
})

function handleSubmit(event){
    event.preventDefault();
    const input = messsageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nicknameForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value)); 
}

messsageForm.addEventListener("submit", handleSubmit);
nicknameForm.addEventListener("submit", handleNickSubmit)