view = {
  showScreen: async function (screenName) {
    const app = document.getElementById("app");
    switch (screenName) {
      case "register": {
        app.innerHTML = components.register;

        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const registerLink = document.querySelector(
          ".form__register-footer-link"
        );
        registerLink.onclick = function () {
          view.showScreen("login");
        };

        const registerForm = document.querySelector(".form__register");

        registerForm.onsubmit = function (e) {
          e.preventDefault();

          const registerInfo = {
            username: registerForm.username.value.trim(),
            email: registerForm.email.value.trim().toLowerCase(),
            password: registerForm.password.value.trim().toLowerCase(),
            confirmPassword: registerForm.confirmPassword.value
              .trim()
              .toLowerCase(),
          };

          let validateResult = [
            utils.validate(
              registerInfo.username,
              "#username__err",
              "Vui lòng nhập tên"
            ),

            utils.validate(
              registerInfo.email && regex.test(registerInfo.email),
              "#email__err",
              "Vui lòng nhập email"
            ),

            utils.validate(
              registerInfo.password.length >= 6,
              "#password__err",
              "Mật khẩu ít nhất 6 ký tự"
            ),

            utils.validate(
              registerInfo.confirmPassword.length >= 6 &&
                registerInfo.confirmPassword === registerInfo.password,
              "#confirm-password__err",
              "Vui lòng nhập lại mật khẩu"
            ),
          ];

          if (utils.allPassed(validateResult)) {
            controller.register(registerInfo);
          }
        };
        let inputEl = document.querySelectorAll(".form__register-input");

        inputEl.forEach(function (e) {
          e.oninput = function () {
            e.parentNode.getElementsByTagName("span")[0].innerHTML = "";
          };
        });

        break;
      }

      case "login": {
        app.innerHTML = components.login;
        const regex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        const loginLink = document.querySelector(".form__login-footer-link");

        const loginForm = document.querySelector(".form__login");

        loginForm.onsubmit = function (e) {
          e.preventDefault();

          const loginInfo = {
            email: loginForm.email.value.trim().toLowerCase(),
            password: loginForm.password.value.trim().toLowerCase(),
          };

          let validateResult = [
            utils.validate(
              loginInfo.email && regex.test(loginInfo.email),
              "#email__err",
              "Vui lòng nhập email"
            ),

            utils.validate(
              loginInfo.password.length >= 6,
              "#password__err",
              "Mật khẩu ít nhất 6 ký tự"
            ),
          ];

          if (utils.allPassed(validateResult)) {
            controller.login(loginInfo);
          }
        };

        loginLink.onclick = function () {
          view.showScreen("register");
        };

        let inputEl = document.querySelectorAll(".form__login-input");

        inputEl.forEach(function (e) {
          e.oninput = function () {
            e.parentNode.getElementsByTagName("span")[0].innerHTML = "";
          };
        });

        break;
      }

      case "chat": {
        app.innerHTML = components.chat;

        // load conversations from db then save model
        await controller.loadConversations();
        controller.setupConversationChanges(); // 'added', 'modified', 'removed'
        controller.showCurrentConversation(model.currentConversation);
        controller.showListConversation(model.conversations);

        let currentEmailEl = document.querySelector(".user-email");
        currentEmailEl.innerText = firebase.auth().currentUser.displayName;

        let btnSignout = document.querySelector(".btn-icon");
        btnSignout.onclick = function () {
          firebase.auth().signOut();
        };

        // events
        let formAddMessage = document.querySelector(".form-add-message");
        formAddMessage.onsubmit = async function (event) {
          event.preventDefault();

          // 1. get info
          let messageContent = formAddMessage.message.value.trim();

          // 2. submit info
          if (messageContent && model.currentConversation) {
            await controller.updateNewMessage(messageContent);

            formAddMessage.message.value = "";
          }
        };

        let formAddConversation = document.querySelector(
          ".form-add-conversation"
        );
        formAddConversation.onsubmit = async function (e) {
          e.preventDefault();
          let title = formAddConversation.title.value.trim();
          let friendEmail = formAddConversation.friendEmail.value
            .trim()
            .toLowerCase();

          let emailValidate = await utils.validateFriendEmail(friendEmail);

          let validateResult = [
            utils.validate(title, "#title-err", "Missing title"),
            utils.validate(
              emailValidate,
              "#friend-email-err",
              "Friend email not found"
            ),
          ];

          if (utils.allPassed(validateResult)) {
            controller.createNewConversation(title, friendEmail);
          }
          formAddConversation.title.value = "";
          formAddConversation.friendEmail.value = "";
        };

        break;
      }
    }
  },
};
