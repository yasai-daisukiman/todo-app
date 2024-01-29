import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/firebase';

type userProps = {
  username: string;
  password: string;
};

export const signInUser = async (user: userProps) => {
  const { username, password } = user;
  const response = await signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      return userCredential.user;
    })
    .catch((error) => {
      return error.code;
    });

  return response;
};
