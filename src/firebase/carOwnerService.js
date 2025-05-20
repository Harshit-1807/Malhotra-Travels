import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const carOwnersCollection = collection(db, "CarOwners");

export const fetchCarOwners = async () => {
  try {
    const snapshot = await getDocs(carOwnersCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching car owners:", error);
    throw new Error("Failed to fetch car owners");
  }
};

export const deleteCarOwner = async (id) => {
  try {
    const docRef = doc(db, "CarOwners", id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting car owner:", error);
    throw new Error("Failed to delete car owner");
  }
};

export const updateCarOwner = async (id, updatedData) => {
  try {
    const docRef = doc(db, "CarOwners", id);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error updating car owner:", error);
    throw new Error("Failed to update car owner");
  }
};

export const saveCarOwner = async (carOwnerData) => {
  try {
    await addDoc(carOwnersCollection, {
      ...carOwnerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error saving car owner:", error);
    throw new Error("Failed to save car owner");
  }
};