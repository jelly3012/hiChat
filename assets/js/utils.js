const utils = {
  getDataFromDoc(doc) {
    let data = doc.data();
    data.id = doc.id;

    return data;
  },

  getDataFromDocs(docs) {
    return docs.map(utils.getDataFromDoc);
  },

  validate(condition, queryErrorTag, messageError) {
    if (condition) {
      document.querySelector(queryErrorTag).innerHTML = "";
      return true;
    } else {
      document.querySelector(queryErrorTag).innerHTML = messageError;
      return false;
    }
  },

  async validateFriendEmail(email) {
    try {
      let signInMethods = await firebase
        .auth()
        .fetchSignInMethodsForEmail(email);
      let emailExists = signInMethods && signInMethods.length;
      let currentEmail = firebase.auth().currentUser.email;

      return email && email != currentEmail && emailExists;
    } catch (error) {
      return false;
    }
  },

  allPassed(array) {
    return array.every(function (item) {
      return item;
    });
  },

  formatDate(isoString) {
    return new Date(isoString).toLocaleString();
  },
};
