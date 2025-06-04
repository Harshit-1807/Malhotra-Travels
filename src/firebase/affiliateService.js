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

export const fetchTopAffiliatesByAmount = async () => {
  try {
    const snapshot = await getDocs(affiliatesCollection);
    const earningsMap = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const name = data.name || "Unnamed";
      const amount = Number(data.amount) || 0;

      if (!earningsMap[name]) {
        earningsMap[name] = 0;
      }
      earningsMap[name] += amount;
    });

    // Convert to array and sort descending
    const sorted = Object.entries(earningsMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5); // top 5

    const labels = sorted.map(([name]) => name);
    const values = sorted.map(([, amount]) => amount);
    

    return { labels, values };
  } catch (error) {
    throw new Error("Failed to fetch top affiliates: " + error.message);
  }
};
