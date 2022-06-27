import data from "./data/data.js";

const showDataElement = document.getElementById("#showData");

let template = "";
for(let key in data) {
    template += `<li>
                    <p>Name: ${data[key].name}</p>
                    <img src=${data[key].img}>
                </li>`
}
showDataElement.innerHTML = template;

if('serviceWorker' in navigator) {

    // Register service worker only after loading the website
    window.addEventListener('load', () => {
        navigator.serviceWorker.register("./serviceWorker.js")
        .then(reg => console.log(`Service Worker is registered: ${reg}`))
        .catch(err => console.log(`Service Worker Error: ${err}`));
    })
}

const notifyButton = document.getElementById("#notification");

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