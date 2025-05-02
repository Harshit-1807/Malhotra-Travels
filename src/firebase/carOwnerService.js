import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Save car owner data to Firestore
 * @param {Object} carOwnerData - The car owner data to save
 * @returns {Promise<void>}
 */
export const saveCarOwner = async (carOwnerData) => {
  const carOwnersCollection = collection(db, "CarOwners");
  await addDoc(carOwnersCollection, {
    ...carOwnerData,
    createdAt: serverTimestamp(), // Add a timestamp for when the data was created
  });
};