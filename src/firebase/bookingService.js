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

export const saveBooking = async (bookingData) => {
  const bookingsCollection = collection(db, "Bookings");
  const docRef = await addDoc(bookingsCollection, {
    ...bookingData,
    date: bookingData.date, // Ensure date is a string
    createdAt: serverTimestamp(),
  });
  console.log("Saved document ID:", docRef.id);
  return docRef.id; // Return the document ID
};

export const fetchBookings = async () => {
  const snapshot = await getDocs(collection(db, BOOKINGS_COLLECTION));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      date: data.date?.toDate ? data.date.toDate().toISOString().split("T")[0] : data.date,
      createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt,
    };
  });
};

export const addBooking = async (data) => {
  const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
    ...data,
    date: data.date,
    createdAt: serverTimestamp(),
  });
  return docRef;
};

export const updateBooking = async (id, data) => {
  return await updateDoc(doc(db, BOOKINGS_COLLECTION, id), {
    ...data,
    date: data.date,
  });
};

export const deleteBooking = async (id) => {
  return await deleteDoc(doc(db, BOOKINGS_COLLECTION, id));
};