// Configuração
firebase.initializeApp({
    apiKey: "AIzaSyBQjjRssZ7jIgcMnoPY37zoQD0ZVjbDzas",
    authDomain: "chat-a45c9.firebaseapp.com",
    databaseURL: "https://chat-a45c9.firebaseio.com",
    projectId: "chat-a45c9",
    storageBucket: "chat-a45c9.appspot.com",
    messagingSenderId: "320574609837"
});


// Inicializa o Cloud Firestore Firebase
var db = firebase.firestore();

// Desativa funcionalidades depreciadas
db.settings({
    timestampsInSnapshots: true
});

function init() {

    // Coleta a collection
    db.collection("Chat")
    .orderBy("dataCriacao", "desc").onSnapshot(function(querySnapshot) {
        
        // Div das mensagens
        var divPai = document.querySelector("#mensagens");
        divPai.innerHTML = "";

        // Percorre as mensagens enviados
        querySnapshot.forEach(function(doc) {

            // Apenda a mensagem
            var element = document.createElement("p");
            element.textContent = doc.data().mensagem;
            divPai.appendChild(element);
        });
    });
};
init();

function Add_Usuario(){

    db.collection("Usuario").add({
        nome: "Kathe",
        idade: 27,
        email: "kathe@psi.com" 
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });    
}

function Filtrar() {

    var divPai = document.querySelector("#mensagens");
    divPai.innerHTML = "";

    // Coleta a referencia
    var reference = db.collection("Usuario").doc("smTP5I6TJTeVfS97VvQ4");

    // Faz a pesquisa das mensagens do usuário linkando a referencia
    var query = db.collection("Chat").where("usuario", "==", reference);

    // Executa
    query.onSnapshot(function(querySnapshot) {
        
        // Percorre as mensagens enviados
        querySnapshot.forEach(function(doc) {
    
            var element = document.createElement("p");
            element.textContent = doc.data().mensagem;
    
            divPai.appendChild(element);
    
        });
    })
}

function Add_Message(){

    var mensagem = window.prompt("Qual mensagem?");

    db.collection("Chat").add({
        usuario: db.doc(`/Usuario/CKiAy7If7Zpr9kNJ8j5V/`),
        mensagem: mensagem,
        dataCriacao: + new Date()
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    
}