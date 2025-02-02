export default () => ({
  database: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5433,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
