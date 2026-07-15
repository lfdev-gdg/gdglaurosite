import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore'
import { getFirestoreInstance } from '@/lib/firebase'
import type { Job } from '@/types/job'

const COLLECTION = 'jobs'

export async function addJob(job: Omit<Job, 'id'>): Promise<string> {
  const db = getFirestoreInstance()
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...job,
    createdAt: Timestamp.now(),
  })
  return docRef.id
}

export async function getJobs(): Promise<(Job & { id: string })[]> {
  const db = getFirestoreInstance()
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Job, 'id'>),
  }))
}

export async function deleteJob(id: string): Promise<void> {
  const db = getFirestoreInstance()
  await deleteDoc(doc(db, COLLECTION, id))
}
