import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const app = initializeApp({
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  databaseURL: "YOUR_DB_URL",
  projectId: "YOUR_ID"
});

const db = getDatabase(app);
const chatRef = ref(db, "chats");

// Send
function sendMessage() {
  let msg = input.value;
  push(chatRef, {
    text: msg,
    sender: "doctor"
  });
  input.value = "";
}

// Receive (real-time)
onChildAdded(chatRef, (data) => {
  let msg = data.val();

  let div = document.createElement("div");
  div.className = "msg " + msg.sender;
  div.innerText = msg.text;

  messagesBox.appendChild(div);
});