import data from "./data/data.js";

let template = "";

const t20ListElement = document.getElementById("t20Leagues");

for(let key in data.t20) {
    template += `<li>
                    <p>${data.t20[key].name}</p>
                    <img src=${data.t20[key].img}>
                </li>`
}
t20ListElement.innerHTML = template;

const worldCupListElement = document.getElementById("worldCupLeagues");

template = "";
for(let key in data.worldCup) {
    template += `<li>
                    <p>${data.worldCup[key].name}</p>
                    <img src=${data.worldCup[key].img}>
                </li>`
}
worldCupListElement.innerHTML = template;

if('serviceWorker' in navigator) {

    // Register service worker only after loading the website
    window.addEventListener('load', () => {
        navigator.serviceWorker.register("./serviceWorker.js")
        .then(reg => console.log(`Service Worker is registered: ${reg}`))
        .catch(err => console.log(`Service Worker Error: ${err}`));
    })
}

const notifyButton = document.getElementById("notification");

notifyButton.addEventListener('click', async ()=> {
    const result = await Notification.requestPermission();
    if(result == "granted") {
        console.log(`Granted Access: ${result}`);
        // randomNotification()
    } else {
        console.log(`Access not granted: ${result}`);
    }
})

const randomNotification = function() {
    const notifyTitle = `New Status is : ${navigator.onLine ? "online": "offline"}`;
    const notifyBody = "Created by Sreeram";
    const opt = {
        body: notifyBody
    }
    new Notification(notifyTitle, opt);
}

window.ononline = function() {
    // console.log("Online....")
    randomNotification();
}

window.onoffline = function() {
    // console.log("Offline...");
    randomNotification();
}