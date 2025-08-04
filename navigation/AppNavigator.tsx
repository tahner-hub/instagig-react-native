import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import FinishAccountScreen from "../screens/FinishAccountScreen";
import HomeScreen from "../screens/HomeScreen";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "../firebase/firebaseConfig";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [user, setUser] = useState<any>(null);
  const [accountComplete, setAccountComplete] = useState(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDoc = await getDoc(doc(db, "Users", firebaseUser.uid));
        if (userDoc.exists()) {
          setAccountComplete(userDoc.data().accountComplete || false);
        }
      } else {
        setUser(null);
        setAccountComplete(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : !accountComplete ? (
        <Stack.Screen name="FinishAccount" component={FinishAccountScreen} />
      ) : (
        <Stack.Screen name="Home" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}