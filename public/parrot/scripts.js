const messageInput = document.querySelector("#user-input");
const conversationElem = document.querySelector("#conversation-container");

// focus the input on load
const handleFocus = () => {
  messageInput.focus();
};

// updateConversation expects an object with 'user' and 'text'
const updateConversation = (message) => {
  const { author, text } = message;
  const messageElem = document.createElement("p");

  messageElem.classList.add("message", author);
  messageElem.innerHTML = `<span>${text}</span>`;
  conversationElem.appendChild(messageElem);
  conversationElem.scrollTop = conversationElem.scrollHeight;

  if (author === "user") messageInput.value = "";
  handleFocus();
};

const sendMessage = (event) => {
  event.preventDefault();

  const message = { author: "user", text: messageInput.value };

  fetch(`/parrot-message?message=${messageInput.value}`)
    // { message: ${messageInput.value} } the syntax requires the key followed by =
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      updateConversation(data.message);
    });

  updateConversation(message);
};
// the type that deals with databases you use fetches like this
//query most basic way of sending data to back end;
// query is grabbing what comes after the q marks and makes an object ouf of it, test
// the key, 123 being the value; you now have access in the backend to info that
// was sent from the front end; you want the parrot to be repeating what you're sending
// the back end...

// call handleFocus on load
handleFocus();
