// Obtener referencias a los elementos HTML
const pdfFileInput = document.getElementById("pdf-file");
const pdfEmbed = document.getElementById("pdf-embed");
const messagesContainer = document.getElementById("messages");
const inputMessage = document.getElementById("input-message");
const inputTitle = document.getElementById("input-title");
const btnGuardar = document.getElementById("btn-guardar");
let filename;
let response_html = "";

btnGuardar.addEventListener("click", async (event) => {
  let title = inputTitle.value;
  if (title === "") alert("Debe ingresar un titulo");
  else if (pdfEmbed.getAttribute("src") === "")
    alert("Debe de subir un archivo");
  else {
    let file = filename.name;
    let response = await axios.post("http://localhost:3000/files/", {
      body: {
        title,
        file,
      },
    });

    response_html = response;
  }
});

// Manejar la carga de un archivo PDF
pdfFileInput.addEventListener("change", async function (event) {
  const file = event.target.files[0];
  const fileURL = URL.createObjectURL(file);
  filename = file;
  // let response = await axios.post("http://localhost:3000/files",{
  //   body: {

  //   }
  // })

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
async function addMessage(author, text) {
  const messageElement = document.createElement("div");
  messageElement.innerHTML = `<strong>${author}:</strong> ${text}`;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  let response = await axios.post("http://localhost:5000/", {
    body: {
      consulta: "ola",
    },
  });
  console.log(response);
}
