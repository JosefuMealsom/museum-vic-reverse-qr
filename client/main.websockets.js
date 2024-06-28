const socket = io();
const codeDictionary = {};


socket.on("connect", () => {
    console.log("connected!", socket.id);
});

socket.on("disconnect", () => {
    console.log("disconnected!", socket.id);
});

socket.on("code_scanned", (data) => {
    const eventList = document.getElementById("content");
    codeDictionary[data] = data;
    eventList.textContent = `Codes scanned: ${Object.values(codeDictionary).join(", ")}`;
});
