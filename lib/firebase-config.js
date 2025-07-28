// src/lib/firebase-config.js
const firebaseAdminConfig = {
    type: "service_account",
    project_id: "frevi-50f39",
    private_key_id: "77b50da356593dd0416c429bf10350e7801f02fc",
    private_key: process.env.FIREBASE_PRIVATE_KEY
        ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
        : "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEQSmv02TZXZUS\nsVjrW3Jf9HYkPNCYnAfAfUVqQT0Bs41Hg2brVw3VbAzWTGtZbXCoSSK7EN0I3HHL\nemzQ5z8mlYYTUToQ8wGN6IuG4LJ7o5/G/U8ZZTUfU9R9fjBIJDA5MIL+lq6AiRmI\nis4EGWHyxLERa5KfeA2PKf/ZonYn60IZEFBe9wO7ABURPeWGzGmpw49gH65dGHlq\nx19PXvxCeXlsiDbekRdstl9UEIGtrtFjBxSwjOKiKXTQMzzAMwQoJHxcchPWiErk\nuYgF0ve81i7Vik5ySWZtysNyLP+KqVgttgwnvhbRCIRZ/rd+iOEkNBAtK4sogMd+\nKSWmiW+BAgMBAAECggEAEkfBksudirOxVY7oae/YLQDv2jtB8N0jybXBd/7AqH5p\ni/484XH362fHoFR48VkE0+AQGJ2fARrLjLkIFsNbegQWe4km3/pKrEW7bWJTrbmV\ngesJaaOoOZVM5y2QYL/iMAmJQh6V/YoHs1S+kNouafcRST6cZzc/CBVQ7Bw6ZkhV\nWxPn4WpG2AEcvFQtW3YnMeYwemZFElV2SghQIK2ugVz5Ql0cR2aqU2+GmWyRaSN5\naGEPHKAAZaIkbh+kyPfet6jGo9t5lZO1EBbU2QDIfr9BM7eCEApn1O1UszsLH5zT\nHdddPQUXc1iVMe2FWBEBW92xsiytkTw3arfyyK/24wKBgQDiKl0/WgYXfHufPPyC\nYcNGHC8nriqYzv0vIAJKm1bwdM86US5NADKPV9ChCn3ej+bOLFvxr4eVvCUy/AWV\naetcaVdL9LhXuVYooyUnGSqKabKKFeTG+0B5hjMLntRWGpROSlbM1xZiDoWvSnvC\nWMXIj5VnQWF/KotcPFSQ8kfgfwKBgQDeJLPStaINAXBnmB9ZIxXRay0ELTf5SSQX\ndy0TfMnTcGusJeH4RfRGyFlW1SvxMWmMlPwNm9g9Kq+FsQha7Kgp721KCyrW41/c\nBX1GPSuKeB3WZwFmWq/xJbGGRnjgAuc8Dtb+Nr7gizzWwjFmr7JjNif05OVhEDsh\ntCIkVIav/wKBgQCbesBMExlo//0EhaqZ/5d9FVcdklBaaMIJqZmprIziFYt47eJE\nsUQQ4y/b5hiN7qOfTUOQLTmqqINyP2ufQge5qfmHkB9Cv3kJys55yIVETlGdOFvk\np0m1wZpJ/NDAuNkH0XdGrv8GPjGNRkk6XEjsDjmJmJrsD1Vq/VatpsHfBQKBgHla\nn4nqg76LHLbbGbT+P7sJy6vOcBeU50ySZGOS9ka10XxXrZyNyqaoaHXROpImpjyQ\nXymoC3dOzFhCoAfb5PoTvCaI9zwxNnrh3M/0NscMW3B3EQKzZA5ewx5RfVMTAvOC\nP9zcV2Yfanr/1zD7pn4gZa+ZI93kmgkNeOFT88hNAoGARkhToK5Bz8Cu2L7is5eO\nztXFe3aAORGmLa4x1N/95PtsTVrvVWsTfEUk7xWKYCdBDeWQ5j7QHKVcv0kKU0Ia\nSLIYJgXtxunLhVWEFmFrM4FI1zhVFtPypGypZA/cD5Npc1A0xa5Z0SjnSp8uXY1X\n6hcCpzSbg9XGRKbIVs6yabo=\n-----END PRIVATE KEY-----",
    client_email: process.env.FIREBASE_CLIENT_EMAIL || "firebase-adminsdk-fbsvc@frevi-50f39.iam.gserviceaccount.com",
    client_id: "101230263122722284920",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40frevi-50f39.iam.gserviceaccount.com",
    universe_domain: "googleapis.com"
};

export const firebaseClientConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSy...", // Замініть на ваш ключ
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "frevi-50f39.firebaseapp.com",
    projectId: "frevi-50f39",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "frevi-50f39.appspot.com",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

// Валідація конфігурації
if (!firebaseAdminConfig.private_key || !firebaseAdminConfig.client_email) {
    throw new Error('Firebase Admin SDK credentials are incomplete!');
}

export default firebaseAdminConfig;