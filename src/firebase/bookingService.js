import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig";

const BOOKINGS_COLLECTION = "Bookings";

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

export const fetchBookings = async () => {
  const snapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const addBooking = async (data) => {
  return await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...data,
    createdAt: serverTimestamp(),
  });
};

export const updateBooking = async (id, data) => {
  return await updateDoc(doc(db, BOOKINGS_COLLECTION, id), data);
};

export const deleteBooking = async (id) => {
  return await deleteDoc(doc(db, BOOKINGS_COLLECTION, id));
};
