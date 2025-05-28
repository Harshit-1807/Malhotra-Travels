import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const affiliatesCollection = collection(db, "Affiliates");

export const saveAffiliate = async (affiliateData) => {
  try {
    const { id, ...data } = affiliateData;
    const docRef = await addDoc(affiliatesCollection, {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    throw new Error("Failed to save affiliate: " + error.message);
  }
};

export const fetchAffiliates = async () => {
  try {
    const snapshot = await getDocs(affiliatesCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    throw new Error("Failed to fetch affiliates: " + error.message);
  }
};

export const deleteAffiliate = async (id) => {
  try {
    if (!id) throw new Error("Invalid affiliate ID");
    const docRef = doc(db, "Affiliates", id);
    await deleteDoc(docRef);
  } catch (error) {
    throw new Error("Failed to delete affiliate: " + error.message);
  }
};

export const updateAffiliate = async (affiliateData) => {
  try {
    const { id, ...data } = affiliateData;
    if (!id) throw new Error("Affiliate ID is missing");
    const docRef = doc(db, "Affiliates", id);
    await updateDoc(docRef, data);
  } catch (error) {
    throw new Error("Failed to update affiliate: " + error.message);
  }
};
