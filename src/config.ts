import { env } from 'node:process';

export const PORT = env.PORT || 8080;
export const AWS__ACCESS_KEY_ID = env.AWS__ACCESS_KEY_ID || '';
export const AWS__ACCESS_KEY = env.AWS__ACCESS_KEY || '';
export const AWS__REGION = env.AWS__REGION || 'us-east-1';
export const LOCAL_MODE = env.LOCAL_MODE || 'false';

export const DB_BUCKET = env.DB_BUCKET || '';
export const DB_FILE = env.DB_FILE || 'db.json';
