const controller = {
  register: async function (registerInfo) {
    let email = registerInfo.email;
    let password = registerInfo.password;
    let name = registerInfo.username;

    document.getElementById("message").innerText = "";

    try {
      document
        .querySelector(".form__register-btn")
        .setAttribute("disabled", true);
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.updateProfile({
        displayName: name,
      });
    } catch (error) {
      document.getElementById("message").setAttribute("class", "err");
      document.getElementById("message").innerText = error.message;
      document.querySelector(".form__register-btn").removeAttribute("disabled");
    }
  },
  login: async function (loginInfo) {
    let email = loginInfo.email;
    let password = loginInfo.password;

    document.getElementById("message").innerText = "";

    try {
      document.querySelector(".form__login-btn").setAttribute("disabled", true);
      let result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (result.user) {
        view.showScreen("chat");
      }
    } catch (error) {
      document.getElementById("message").setAttribute("class", "err");
      document.getElementById("message").innerText = error.message;
      document.querySelector(".form__login-btn").removeAttribute("disabled");
    }
  },

  loadConversations: async function () {
    let currentEmail = firebase.auth().currentUser.email;

    let result = await firebase
      .firestore()
      .collection("conversations")
      .where("users", "array-contains", currentEmail)
      .get();

    let conversations = utils.getDataFromDocs(result.docs);

    if (conversations.length) {
      let currentConversation = conversations[0];
      model.saveCurrentConversation(currentConversation);
    }
    model.saveConversations(conversations);
  },

  updateNewMessage: async function (messageContent) {
    let currentEmail = firebase.auth().currentUser.email;
    let message = {
      content: messageContent,
      owner: currentEmail,
      createdAt: new Date().toISOString(),
    };
    let currentConversationId = model.currentConversation.id;

    await firebase
      .firestore()
      .collection("conversations")
      .doc(currentConversationId)
      .update({
        messages: firebase.firestore.FieldValue.arrayUnion(message),
      });
  },

  setupConversationChanges() {
    let currentEmail = firebase.auth().currentUser.email;
    let isFirstRun = true;

    firebase
      .firestore()
      .collection("conversations")
      .where("users", "array-contains", currentEmail)
      .onSnapshot(function (snapshot) {
        if (isFirstRun) {
          isFirstRun = false;
          return;
        }

        let docChanges = snapshot.docChanges();
        for (let docChange of docChanges) {
          let type = docChange.type;
          let doc = docChange.doc;
          let conversation = utils.getDataFromDoc(doc);

          if (type == "modified") {
            model.updateConversation(conversation);
            if (
              model.currentConversation &&
              model.currentConversation.id == conversation.id
            ) {
              controller.showCurrentConversation(model.currentConversation);
            }
          }

          if (type == "added") {
            model.updateConversation(conversation);
            controller.showListConversation(model.conversations);
          }

          if (type == "removed") {
            model.removeConversation(conversation);
            controller.showCurrentConversation();
            controller.showListConversation(model.conversations);
          }
        }
      });
  },

  async createNewConversation(title, friendEmail) {
    let currentEmail = firebase.auth().currentUser.email;
    let conversation = {
      title: title,
      users: [currentEmail, friendEmail],
      messages: [],
      createdAt: new Date().toISOString(),
    };

    await firebase.firestore().collection("conversations").add(conversation);
  },

  async leaveCurrentConversation(conversation) {
    if (model.currentConversation) {
      let currentConversationId = model.currentConversation.id;
      let currentEmail = firebase.auth().currentUser.email;

      await firebase
        .firestore()
        .collection("conversations")
        .doc(currentConversationId)
        .update({
          users: firebase.firestore.FieldValue.arrayRemove(currentEmail),
        });
    }
  },

  loadDetaildConversation(conversation) {
    let btnWrap = document.querySelector(".btn-wrap");

    btnWrap.innerHTML = "";

    let detailsTitleEl = document.querySelector(".details-title");
    let detailsListEmailEl = document.querySelector(".details-list-email");
    let detailsCreatedAtEl = document.querySelector(".details-created-at");

    let detailsTitle = conversation.title;
    let detailsListEmail = conversation.users;
    let detailsCreatedAt = utils.formatDate(conversation.createdAt);

    detailsTitleEl.innerText = detailsTitle;

    detailsListEmailEl.innerHTML = "";
    detailsListEmail.forEach(function (i) {
      let iEl = document.createElement("div");
      let textNode = document.createTextNode(i);
      iEl.appendChild(textNode);
      detailsListEmailEl.appendChild(iEl);
    });

    detailsCreatedAtEl.innerText = detailsCreatedAt;

    let icon = document.createElement("i");
    icon.setAttribute("class", "fa-solid fa-minus");

    let btnLeaveConversation = document.createElement("button");
    btnLeaveConversation.setAttribute("id", "leave-conversation-btn");
    btnLeaveConversation.appendChild(icon);
    console.log(btnLeaveConversation);
    console.log(btnWrap);
    btnWrap.appendChild(btnLeaveConversation);

    let leaveConversationBtn = document.getElementById(
      "leave-conversation-btn"
    );

    leaveConversationBtn.onclick = async function () {
      let confirmLeave = confirm("Bạn có muốn rời cuộc hội thoại không?");

      if (confirmLeave) {
        controller.leaveCurrentConversation(conversation);
        location.reload();
      }
    };
  },

  showCurrentConversation(conversation) {
    let listMessage = document.querySelector(".list-message");
    listMessage.innerHTML = "";

    if (conversation) {
      let messages = conversation.messages;
      let currentEmail = firebase.auth().currentUser.email;

      for (let message of messages) {
        let owner = message.owner;
        let content = message.content;
        let className = null;
        if (currentEmail == owner) {
          className = "message your";
        } else {
          className = "message";
        }

        let messageHtml = `
        <div class="${className}">
          <span class="message-owner">${owner}</span>
          <span class="message-content">${content}</span>
        </div>
        `;
        listMessage.innerHTML += messageHtml;
      }

      // Details conversation
      controller.loadDetaildConversation(conversation);
    }
  },
  showListConversation(conversations) {
    let listContainer = document.querySelector(".list-conversations");
    listContainer.innerHTML = "List conversation";

    if (conversations && conversations.length) {
      for (let conversation of conversations) {
        let title = conversation.title || "...";
        let usersNumber = conversation.users.length;

        let usersText =
          usersNumber > 1 ? `${usersNumber} members` : `${usersNumber} member`;
        let className =
          model.currentConversation &&
          model.currentConversation.id == conversation.id
            ? `conversation current`
            : `conversation`;

        let conversationDom = document.createElement("div");
        conversationDom.className = className;
        conversationDom.innerHTML = `
          <span class="conversation-title">${title}</span>
          <span class="conversation-users">${usersText}</span>
        `;
        conversationDom.onclick = function () {
          model.saveCurrentConversation(conversation);
          controller.showCurrentConversation(model.currentConversation);
          controller.showListConversation(model.conversations);
        };

        listContainer.appendChild(conversationDom);
      }
    }
  },
};
