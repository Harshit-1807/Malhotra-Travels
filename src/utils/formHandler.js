import { db } from '../firebase'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'

export const submitForm = async (collectionName, formData) => {
  try {
    // Check if email already exists in the collection
    const emailQuery = query(collection(db, collectionName), where('email', '==', formData.email))
    const querySnapshot = await getDocs(emailQuery)
    
    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0]
      console.log(`Existing data found for email ${formData.email}. Document ID: ${existingDoc.id}`)
      return { success: true, id: existingDoc.id, existing: true }
    }

    // If no existing record, create a new one
    const docRef = await addDoc(collection(db, collectionName), {
      ...formData,
      timestamp: new Date(),
    })
    console.log(`Data submitted to ${collectionName} successfully! Document ID: ${docRef.id}`)
    return { success: true, id: docRef.id, existing: false }
  } catch (error) {
    console.error(`Error submitting to ${collectionName}:`, error)
    throw error
  }
}