import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { auth, db, storage } from "../firebase/firebaseConfig";
import { deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject, listAll } from "firebase/storage";

export default function DeleteAccountScreen({ navigation }: any) {
  const [error, setError] = useState("");

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (!user) return;

              // Delete all user files in storage
              const userFolderRef = ref(storage, `profileImages/${user.uid}`);
              const files = await listAll(userFolderRef);
              await Promise.all(files.items.map((fileRef) => deleteObject(fileRef)));

              // Delete Firestore user document
              await deleteDoc(doc(db, "Users", user.uid));

              // Delete auth user
              await deleteUser(user);

              Alert.alert("Account Deleted", "Your account has been permanently removed.");
              navigation.navigate("Login");
            } catch (err: any) {
              setError(err.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete Account</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Delete My Account" color="red" onPress={handleDeleteAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "red" },
  error: { color: "red", marginBottom: 10 },
});