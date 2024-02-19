const admin = require('firebase-admin');

const firestore = admin.firestore();

const getAllDocuments = async (table) => {
  const collectionRef = firestore.collection(table);

  const querySnapshot = await collectionRef.get();

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
}

const getWalletDocuments = async (table, field, value) => {
  const collectionRef = firestore.collection(table);

  const querySnapshot = await collectionRef.where(field, "==", value).get();

  return querySnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data()
    };
  });
}

module.exports = {
  getAllDocuments,
  getWalletDocuments
};