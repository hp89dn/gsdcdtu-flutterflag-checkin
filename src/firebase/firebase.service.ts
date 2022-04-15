import { App, cert, initializeApp } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseService {
  private readonly serviceAccountKey = {
    type: 'service_account',
    project_id: 'gdsc-event-flutter',
    private_key_id: 'f715879e1cbc315cc95737b9f857f92da6921157',
    private_key:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCastuS4tMKlp+R\nYpItgdJL0rLkRN9pT46O9Bu0mSJMhN+AIkY+HM8Rfpvrfw3nYb43VaDF/x0FvLRr\nH8qBsuaE1xp+dlgHqM03c7WN4K3XUPOgozVfUhhOUwwA/SgliiYXDLpf/HBawSG0\nFN6fypld0tVC6Uh3Dxyye2YuQb//947FJdEYjGggiG8qMyn5u5TA34Gi/lNWhGGp\n1ZanJQF0e++TJwvudSbvCJ+x5R6shaAHS2wTpKcC6vHaWakzrHifRuL9LtJkvoJn\n1pY9ZJ6iUMwJxWaGZmSJHkMVp36WrECbVNMHmPsMGWfmTZRQHYt/t26nYdDFzXFn\njSkKTK/lAgMBAAECggEAJj2GxhdAXGpx3N4tLMcd3STjGEbHJDDomEFS9PByuFAT\nMIkobHOyIwy1TcAtR3BTtTl7Qd5nhfLI9X8ZD7kRvy4uDCtEZPZO7kFx1HXA+0v1\nQVT+3UZ9oCTqv3bU3Py6oDGDA7Wy71g09N9AzeamxTjYA0+H3Hh1m1AiKNaTd9oP\nVWf+N5LQz5p393A85BF+lXwDXePMqRJwOC5TLz3TOEidRrq7SLY6v1uFgU0/jW8x\nuroD71qkWh7REYNHA1q/vIIyvr1JvQaUt8KkscE9KX/SHfumNgeDRTBSwerPNS8G\nhphWk8Zoamw6JaIK7cjfN3/jhsG4muELer5rBtUOKQKBgQDTbPA457ki1duefo3O\n6hH5UsCYk+3z6EBEkA/bIbiUHVSuNtQ3F4UAIENBfU2af7Q2J105Yq7cu1PLKFYB\n4n780HCyWm3VDBtm6apIB6GoDX1RuCl1+wLF7lzH7GYLSIdGxJLYzdPU8gdIBYmt\nx4GQZRdeFQUjxKA5XkUb473ejQKBgQC7UEFzvek1vlvV5AFZ3wVpZpDUuxabICt/\nQh1htUvV6/s3ryqma+TDRaWYiMQs+r2mej5D7PbCPHJ7qaU+JrWA+KFyMDX+XU47\n1qz1xUAze7p9G2Y7khTwghpTdU2Fdk1W423nJo0HNg7oXO+l47NPEzpnl5/LQqSU\nTAQP3VlMuQKBgQCav0GUZQa82IrGlxp0OB6vvkH5a0zfGT7w8ACrAyN2RYGVgcwS\nBsTyMqsHZA9I5e+hM26ocfJK3VGXgQ5ykrUflfDmmgmJxjLIQH7B+dP4jOcMyR6P\nnAmLlcuTCRQnbg6VXYud5AkH854guOzspPnQFi3kTr5UT7Z2RumOYEK4gQKBgG7e\nrw8Z/pqwBN2SanZOen6LlfhEkLnbDcPyVz/JNoz1c6nfBaihvjMS21Rwx2U0OOL8\nAjTkYp5PdxfZLxSdhttCzxSukpbvlWn3xEJosXqHprd8a0OhUMGW0IxLp0ny3w4p\n6ZhjCiCVj7dbowGWyEBqyiwc5BlEZfPdFp5pTv0JAoGAH1w7LOLu5K2EFcMpHwQe\nrCgmF4eODBy2lx2kY+9F6l/+5Mg3plk9Xworq2vip95RspGOUI1s1/FQuz1MgS8x\nMet3B7S6LDT6qtNFV11Srj/7e59sxFczAwU0JHWkXWJ1BAQp7pnyv8gmgs3BB9i6\njaSDaeuZDGGBBg/+26lWLnQ=\n-----END PRIVATE KEY-----\n',
    client_email:
      'firebase-adminsdk-es3gj@gdsc-event-flutter.iam.gserviceaccount.com',
    client_id: '110120208254484744615',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
      'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-es3gj%40gdsc-event-flutter.iam.gserviceaccount.com',
  };
  private readonly app: App;
  private readonly auth: Auth;
  constructor() {
    const firebaseConfig = {
      credential: cert(JSON.parse(JSON.stringify(this.serviceAccountKey))),
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.FIREBASE_DATABASE_URL,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID,
      measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    };
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
  }

  getAuth(): Auth {
    return this.auth;
  }

  getFirestore() {
    const app = this.app;
    return getFirestore(app);
  }
}
