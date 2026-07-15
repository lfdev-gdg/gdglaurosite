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
import type { SocialProject } from '@/types/job'

const COLLECTION = 'socialProjects'

export async function addProject(project: Omit<SocialProject, 'id'>): Promise<string> {
  const db = getFirestoreInstance()
  const docRef = await addDoc(collection(db, COLLECTION), {
    ...project,
    createdAt: Timestamp.now(),
  })
  return docRef.id
}

export async function getProjects(): Promise<(SocialProject & { id: string })[]> {
  const db = getFirestoreInstance()
  const q = query(collection(db, COLLECTION), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<SocialProject, 'id'>),
  }))
}

export async function deleteProject(id: string): Promise<void> {
  const db = getFirestoreInstance()
  await deleteDoc(doc(db, COLLECTION, id))
}
