window.onload = function () {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      view.showScreen("chat");
    } else {
      view.showScreen("login");
    }
  });
};

// async function databaseQueryTemplate() {
//   let collectionName = "conversations";

//   // get one
//   let docId = "2UTNX1zBasdv39c9Uxj3";
//   let doc = await firebase
//     .firestore()
//     .collection(collectionName)
//     .doc(docId)
//     .get();
//   let getData = getDataFormDoc(doc);

//   // get many
//   let result = await firebase.firestore().collection(collectionName).get();
//   let docs = result.docs;

//   //creat
//   let dataToCreate = {
//     name: "Cương",
//     age: 25,
//     address: "HN",
//   };
//   await firebase.firestore().collection(collectionName).add(dataToCreate);

//   //update
//   let docIdToUpdate = "qyW9WKlbAry1oO9N15wV";
//   let dataToUpdate = {
//     name: "Giang",
//     age: 27,
//     address: "Hoàng Mai",
//   };
//   await firebase
//     .firestore()
//     .collection(collectionName)
//     .doc(docIdToUpdate)
//     .update(dataToUpdate);

//   //delete
// }

// function getDataFormDoc(doc) {
//   let data = doc.data();
//   data.id = doc.id;

//   return data;
// }

// function getDataFormDocs(docs) {
//   return docs.map(getDataFormDoc);
// }
