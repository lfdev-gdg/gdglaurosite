import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import {
  getFirestore,
  type Firestore,
  connectFirestoreEmulator,
} from 'firebase/firestore'
import {
  getAuth,
  type Auth,
  connectAuthEmulator,
} from 'firebase/auth'
import {
  getAnalytics,
  type Analytics,
} from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

function getApp(): FirebaseApp {
  if (getApps().length === 0) {
    return initializeApp(firebaseConfig)
  }
  return getApps()[0]
}

let firestoreInstance: Firestore | null = null

export function getFirestoreInstance(): Firestore {
  if (!firestoreInstance) {
    const app = getApp()
    firestoreInstance = getFirestore(app)
    if (process.env.NEXT_PUBLIC_USE_FIRESTORE_EMULATOR === 'true') {
      connectFirestoreEmulator(firestoreInstance, 'localhost', 8080)
    }
  }
  return firestoreInstance
}

let authInstance: Auth | null = null

export function getAuthInstance(): Auth {
  if (!authInstance) {
    const app = getApp()
    authInstance = getAuth(app)
    if (process.env.NEXT_PUBLIC_USE_AUTH_EMULATOR === 'true') {
      connectAuthEmulator(authInstance, 'http://localhost:9099')
    }
  }
  return authInstance
}

let analyticsInstance: Analytics | null = null

export function getAnalyticsInstance(): Analytics | null {
  if (typeof window === 'undefined') return null
  if (!analyticsInstance) {
    const app = getApp()
    analyticsInstance = getAnalytics(app)
  }
  return analyticsInstance
}

const app = getApp()
export default app
