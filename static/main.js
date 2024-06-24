const evtSource = new EventSource("/stream?id=12345");

evtSource.onmessage = (event) => {
    console.log("new message");
    const newParagraph = document.createElement("p");
    const eventList = document.getElementById("content");

    newParagraph.textContent = `message: ${event.data}`;
    eventList.appendChild(newParagraph);
};

evtSource.addEventListener("ping", () => {
    const newParagraph = document.createElement("p");
    const eventList = document.getElementById("content");

    newParagraph.textContent = "You pinged me!";
    eventList.appendChild(newParagraph);
});