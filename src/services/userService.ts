import { db } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { User } from "@/types/User";

export const saveUserData = async (data: User) => {
  if (!data.uid) throw new Error("UID não encontrado");

  const dataToSave = JSON.parse(JSON.stringify(data));

  await setDoc(doc(db, "users", data.uid), dataToSave);
};

export const getUserData = async (uid: string) => {
  const userDoc = await getDoc(doc(db, "users", uid));
  if (userDoc.exists()) {
    return userDoc.data();
  } else {
    return null;
  }
};
