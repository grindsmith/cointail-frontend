import { collection, query, where, getDocs } from "firebase/firestore";
import { firestoreDB } from '../../../firebase';

export const getAllDocuments = async (table) => {
    const querySnapshot = await getDocs(collection(firestoreDB, table));

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id, 
        ...doc.data()
      }
    });
}

export const getWalletDocuments = async (table, field, value) => {
    const q = query(collection(firestoreDB, table), where(field, "==", value));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        return {
          id: doc.id, 
          ...doc.data()
        }
    });
}
