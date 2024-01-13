import { DocumentData } from 'firebase/firestore';

export type FirestoreResponse = DocumentData & { id: string };
