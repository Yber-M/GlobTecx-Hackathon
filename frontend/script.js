// * Abrir y Cerrar Los Formularios Login y Register
const evolutara = document.querySelector('.evolutara');
const linkLogin = document.querySelector('.entrar-login');
const linkRegister = document.querySelector('.entrar-registrar');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

linkRegister.addEventListener('click', () => {
    evolutara.classList.add('active');
});

linkLogin.addEventListener('click', () => {
    evolutara.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
    evolutara.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
    evolutara.classList.remove('active-popup');
});

// * Validar User y Contraseña
function validate() {
    let user = document.getElementById('input-correo').value;
    let clave = document.getElementById('input-pass').value;

    if (user == "ybermarlon@gmail.com" && clave == "123") {
        alert("Se Ingresó Como Administrador");
        window.location = "./admin/index.html";

        return false;
    }
    if (user == "user@gmail.com" && clave == "12") {
        window.location = "./cliente/catalogo.html";
        return false;
    } else {
        alert("Error de credenciales, inténtelo nuevamente.")
    }
}

// * TECx-BOT
class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox))

        sendButton.addEventListener('click', () => this.onSendButton(chatBox))

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox)
            }
        })
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // show or hides the box
        if (this.state) {
            chatbox.classList.add('chatbox--active')
        } else {
            chatbox.classList.remove('chatbox--active')
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value


        if (text1 === "") {

        } else {
            let msg2 = { name: "user", message: text1 };
            this.updateChatText(msg2)
            textField.value = "";
        }
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.push(chatbox);
        this.messages.slice().reverse().forEach(function (item, index) {
            if (item.name === "TEXc-BOT") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>'
            }
            else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>'
            }
        });

        const chatmessage = document.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}


const chatbox = new Chatbox();
chatbox.display();

function validarCorreo() {
    let almacs
}
