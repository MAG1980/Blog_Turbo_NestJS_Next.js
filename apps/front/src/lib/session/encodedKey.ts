const secretKey = process.env.SESSION_SECRET_KEY!;

//Закодированный секретный ключ JWT.
export const ENCODED_KEY = new TextEncoder().encode(secretKey);