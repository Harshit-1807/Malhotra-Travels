import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebaseConfig";

/**
 * Save booking data to Firestore
 * @param {Object} bookingData - The booking data to save
 * @returns {Promise<void>}
 */
export const saveBooking = async (bookingData) => {
  const bookingsCollection = collection(db, "Bookings");
  await addDoc(bookingsCollection, {
    ...bookingData,
    createdAt: serverTimestamp(), // Add a timestamp for when the booking was created
  });
};