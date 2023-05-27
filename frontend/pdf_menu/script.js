// Obtener referencias a los elementos HTML
const pdfFileInput = document.getElementById("pdf-file");
const pdfEmbed = document.getElementById("pdf-embed");
const messagesContainer = document.getElementById("messages");
const inputMessage = document.getElementById("input-message");

// Manejar la carga de un archivo PDF
pdfFileInput.addEventListener("change", async function (event) {
  const file = event.target.files[0];
  const fileURL = URL.createObjectURL(file);

  pdfEmbed.setAttribute("src", fileURL);
});

// Manejar el envío de un mensaje
inputMessage.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const message = inputMessage.value;
    if (message.trim() !== "") {
      addMessage("Tú", message);
      inputMessage.value = "";
    }
  }
});

// Función para agregar un mensaje al chat
function addMessage(author, text) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${author}:</strong> ${text}`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
