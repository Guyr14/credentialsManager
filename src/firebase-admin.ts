import * as admin from 'firebase-admin';

const serviceAccount = {

    "type": "service_account",
    "project_id": "passwordssystem-73c2f",
    "private_key_id": "63f4b0f3819ffab9fd96bcbde4725d66c8a89398",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDND9/+J+zMrJp/\nVyqP+3vHM71Q+QpduZUJW51+e6MjvrPtq/WoKV1bwznoas8gkWx7neMPDTYHHDhQ\nkFOz1sTHhAbxA4p9dE9YAwQS39XUUzM64BuFwe2aiG5bmJ0wzNRbd0KRQEw8g40K\nVs051liJWKiwCGArKH250H9gqw+ZnNri3aSvmEjx11KLygoaYh4g1dzUnPn2N/3r\niFoMTi2tGv+vRgfH68E7nn2SdYbVTWqwwNI7upg9YddtQeGaiF+4DLKkNnUYueUo\nEL1AfqpRRHQ181CwamYjYsVGyLnzrj1Vixri/JkiRjnYNFqaFQWyQiTDADYpcGBm\nbjX2suMHAgMBAAECggEAAaMqjccCkzkjYL+Dw5lxY/uLX0G9OIZKa+CYnjGFkuHT\npGoA6GjMcQmwNt4sDlVLhh/UukTRSrI0lOixhV40ILRyxI5D55qKL4Az/1iof1yr\nc0XmBCODIHBZxt08LBUZk/K5IXXH74mKQiJ39y/thK5+gurNnHG4gom5xLltGA4L\nLUc8al+YHjlDaOkltC/O7+dksdUQtrJSV6Vxy2iszik0YwewI9yt5gDLAkh1xz3c\nZu6l5PCUuPA/zUeNwzvpXIK58LXNSZvRkSBuZ/KYdZ5FCLYmSMmSytfPmJIlbjMq\nmiWT9DGwYJwwcujpeGn0fVWgCgIDoaHM4G/OT3gtyQKBgQDlnVaESFv31euk+RB4\nLrVEj6nKXrvZlnytygrq3ikn/DfoR/CFTTKriVIlv+R5swaxLIcpTAF0VbesNjdC\nIuCZRMLEPDIjnXlIa8bG++eTNRBotFpbP244Z7mpGShzzNlph6s0wIe7s8VdGJwo\nJSEsNXRW5P+K50M564S8HJjCjQKBgQDkoEORChURE2rjUZ+YVZUbqP/ukMbAD/lH\nO2nZhL1w8ZWVSWbEIFgoZ8zDUfc6r3iZRpQs7xeT0vgGe7gEWQfuGuYX/iXypXQT\nAVvIrUw5RKZq6SWihkWQ39/wq2M/1xIJ705kbNh+BFJuaToeo3kD7MtSAXP9fc+8\nGP2MZc/g4wKBgQDfOVvf1HzcbzLcumohfL8q/UPDAuA7A8sIJXEBrqNyRQiRIEcb\nQNau3xxmqKxVCA/MdQ6dvk93qtGacUa9XCzftHJo1mCkMTa0ilrAHiue+CqQsC1b\noknkOirL0zJ5icAfkQ6HhVkvyPBptkAx4w7h7MHCrHQmtPetOmNbga2dDQKBgHpU\n0rJ53ZncdPYbR7UgHf/F5uPE7cP5CB44SUQNhbw4WBygQO+yitlb6TGd2xa4q2QA\nYurEKC591R7K9kTFSrv6AqJV6AI0y64brPvs1ntSI2XTSML066ZAVDgXzKxtLQbJ\n2H1dzF1pfJ39ig6409jozEYd5u19czknegu0so2XAoGBAIWevnQkAuMrXnrtGhrE\nIhXFgjCuyZAUofscv9PA4F138ktRmpxCI9TPZZ49XAPvPAGPkTGxPL8/u8H0Q0Ji\n9xGsd+paXvanCDLXhpAVzMC5oCMIMGvqipPYKfcnIhTN/F9aSSWOh+KQ03NlmSXj\n0srd+/MYSbyOQkrxBThq5+I1\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-kdpni@passwordssystem-73c2f.iam.gserviceaccount.com",
    "client_id": "109737764120244731681",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kdpni%40passwordssystem-73c2f.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"

};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://passwordssystem-73c2f-default-rtdb.europe-west1.firebasedatabase.app"
});

export const adminDb = admin.database();