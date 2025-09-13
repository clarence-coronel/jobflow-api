import admin, { type ServiceAccount } from "firebase-admin";
import type { Auth } from "firebase-admin/auth";

import serviceAccount from "./firebaseServiceAccount.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}

export const adminAuth: Auth = admin.auth();
