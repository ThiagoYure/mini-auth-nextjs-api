import { useAuthStore } from "@/stores/authStore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "@/lib/firebase";
import { getUserData } from "@/services/userService";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const extraData = await getUserData(firebaseUser.uid);
        console.log(extraData);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          firstName: "",
          lastName: "",
          birthdate: "",
          country: "",
          state: "",
          city: "",
          postalCode: "",
          phoneNumber: "",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
};
