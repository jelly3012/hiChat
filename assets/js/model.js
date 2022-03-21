const model = {
  user: null,
  conversations: null,
  currentConversation: null,
  saveUser(user) {
    model.user = user;
  },
  saveConversations(conversations) {
    model.conversations = conversations;
  },
  saveCurrentConversation(conversation) {
    model.currentConversation = conversation;
  },
  updateConversation(newConversation) {
    if (
      model.currentConversation &&
      model.currentConversation.id == newConversation.id
    ) {
      model.saveCurrentConversation(newConversation);
    }
    if (model.conversations) {
      let indexInConversations = model.conversations.findIndex(function (item) {
        return item.id == newConversation.id;
      });
      if (indexInConversations >= 0) {
        model.conversations.splice(indexInConversations, 1, newConversation);
      } else {
        model.conversations.push(newConversation);
      }
    }
  },
  removeConversation(conversation) {
    if (model.conversations) {
      let findIndex = model.conversations.findIndex(function (item) {
        return item.id == conversation.id;
      });
      if (findIndex >= 0) {
        model.conversations.splice(findIndex, 1);
      }
    }
    if (model.currentConversation) {
      if (model.currentConversation.id == conversation.id) {
        model.saveCurrentConversation(null);
      }
    }
  },
};
