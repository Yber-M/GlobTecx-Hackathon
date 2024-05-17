let archivoSeleccionado = null;
let archivoConfirmado = false;

function handleFileUpload(files) {
    archivoSeleccionado = files[0];
    const urlArchivo = URL.createObjectURL(archivoSeleccionado);

    document.getElementById("inputContainer").style.display = "none";
    document.getElementById("visualizadorPDF").style.display = "block";
    document.getElementById("pdfEmbed").setAttribute("src", urlArchivo);
    document.getElementById("btnConfirmar").style.display = "block";
    document.getElementById("btnCambiar").style.display = "block";
}

function confirmarSubida() {
    if (archivoSeleccionado) {
        alert("¡El archivo se ha subido con éxito!");
        archivoConfirmado = true;
        document.getElementById("btnConfirmar").style.display = "none";
        document.getElementById("btnCambiar").style.display = "none";
    }
}

function cambiarArchivo() {
    archivoSeleccionado = null;
    archivoConfirmado = false;
    document.getElementById("archivoInput").value = "";
    document.getElementById("inputContainer").style.display = "block";
    document.getElementById("visualizadorPDF").style.display = "none";
    document.getElementById("btnConfirmar").style.display = "none";
    document.getElementById("btnCambiar").style.display = "none";
}

// Verificar si hay un archivo confirmado al cargar la página
window.addEventListener("DOMContentLoaded", function () {
    if (archivoConfirmado) {
        document.getElementById("inputContainer").style.display = "none";
        document.getElementById("visualizadorPDF").style.display = "block";
        document.getElementById("btnConfirmar").style.display = "none";
        document.getElementById("btnCambiar").style.display = "block";
    }
});


function actualizarTitulo(event) {
    if (event.keyCode === 13) { // Verificar si se presionó la tecla Enter
        event.preventDefault(); // Evitar el comportamiento por defecto del Enter (enviar formulario)
        const inputTitulo = document.getElementById("inputTitulo");
        const tituloTesis = document.getElementById("tituloTesis");

        const tituloIngresado = inputTitulo.value;
        tituloTesis.textContent = `"${tituloIngresado}"`;

        inputTitulo.style.display = "none"; // Ocultar el input
        tituloTesis.style.display = "block"; // Mostrar el título

        inputTitulo.value = ""; // Limpiar el valor del input
    }
}

const tituloTesis = document.getElementById("tituloTesis");
const botonEditar = document.getElementById("botonEditar");

botonEditar.addEventListener("click", function () {
    tituloTesis.style.display = "none"; // Ocultar el título
    inputTitulo.style.display = "block"; // Mostrar el input
});

// * TECx-BOT
class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector(".chatbox__button"),
            chatBox: document.querySelector(".chatbox__support"),
            sendButton: document.querySelector(".send__button"),
        };

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener("click", () => this.toggleState(chatBox));

        sendButton.addEventListener("click", () => this.onSendButton(chatBox));

        const node = chatBox.querySelector("input");
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add("chatbox--active");
        } else {
            chatbox.classList.remove("chatbox--active");
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector("input");
        let text1 = textField.value;

        if (text1 === "") {
        } else {
            let msg2 = { name: "user", message: text1 };
            this.updateChatText(msg2);
            this.messages.push(msg2);
            textField.value = "";
        }
    }

    async updateChatText(chatbox) {
        var html = "";
        let data = { question: chatbox.message };

        try {
            let bot = await axios.post("http://127.0.0.1:5001/", data);
            let bot_response = bot.data;
            this.messages.push(bot_response);
        } catch (err) {
            this.messages.push({
                name: "tecx-bot",
                message: "Ocurrio un error en el servidor",
            });
        }
        this.messages
            .slice()
            .reverse()
            .forEach(function (item, index) {
                if (item.name === "tecx-bot") {
                    html +=
                        '<div class="messages__item messages__item--visitor">' +
                        item.message +
                        "</div>";
                } else {
                    html +=
                        '<div class="messages__item messages__item--operator">' +
                        item.message +
                        "</div>";
                }
            });

        const chatmessage = document.querySelector(".chatbox__messages");
        chatmessage.innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();

function validarCorreo() {
    let almacs;
}
