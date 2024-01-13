import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { FirestoreResponse } from '@/types/firestore';

export const getDocuments = async (
  correctionName: string,
): Promise<FirestoreResponse[]> => {
  const collectionRef = collection(db, correctionName);

  const response = await getDocs(collectionRef).then((querySnapshot) => {
    return querySnapshot.docs.map(
      (doc) => ({ ...doc.data(), id: doc.id } as FirestoreResponse),
    );
  });

  console.log(response);

  return response;
};
