import dotenv from 'dotenv';
dotenv.config()
const _config = {
    PORT: process.env.PORT || 5008,
    DB_URL: process.env.DATABASE_URL
}
Object.freeze(_config);

export default _config;
