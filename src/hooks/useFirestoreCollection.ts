import { useState, useEffect, useCallback } from 'react'
import {
  collection,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore'
import { getFirestoreInstance } from '@/lib/firebase'

export function useFirestoreCollection<T>(collectionName: string) {
  const [data, setData] = useState<(T & { id: string })[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(false)
    const db = getFirestoreInstance()
    const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as T),
        })) as (T & { id: string })[]
        setData(items)
        setLoading(false)
      },
      () => {
        setError(true)
        setLoading(false)
      },
    )

    return unsubscribe
  }, [collectionName])

  useEffect(() => {
    const unsubscribe = fetchData()
    return () => {
      unsubscribe?.()
    }
  }, [fetchData])

  return { data, loading, error }
}
