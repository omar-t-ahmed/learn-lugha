import { initializeApp, cert, getApps, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

// Reconstruct the service account JSON object from environment variables
const serviceAccount = {
  type: process.env.GOOGLE_TYPE_FIREBASE,
  project_id: process.env.GOOGLE_PROJECT_ID_FIREBASE,
  private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID_FIREBASE,
  private_key: (process.env.GOOGLE_PRIVATE_KEY_FIREBASE || '').replace(/\\n/g, '\n'), // Replace escaped newlines
  client_email: process.env.GOOGLE_CLIENT_EMAIL_FIREBASE,
  client_id: process.env.GOOGLE_CLIENT_ID_FIREBASE,
  auth_uri: process.env.GOOGLE_AUTH_URI_FIREBASE,
  token_uri: process.env.GOOGLE_TOKEN_URI_FIREBASE,
  auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL_FIREBASE,
  client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL_FIREBASE
};

// Initialize Firebase Admin SDK if it hasn't been initialized yet
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}

export const verifyToken = async (token: string) => {
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    throw new Error('Unauthorized');
  }
};