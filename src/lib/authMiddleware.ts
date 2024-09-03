import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fs from 'fs';

// Get the path to the service account JSON file
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!serviceAccountPath) {
  throw new Error('GOOGLE_APPLICATION_CREDENTIALS environment variable is not set');
}

// Read and parse the service account JSON file
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize Firebase Admin SDK if it hasn't been initialized yet
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export const verifyToken = async (token: string) => {
  try {
    console.log("Verifying token:", token);
    const decodedToken = await getAuth().verifyIdToken(token);
    console.log("Decoded token:", decodedToken);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error('Unauthorized');
  }
};
