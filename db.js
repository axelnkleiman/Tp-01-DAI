export const DBConfig = {
    host:"localhost",
    port: 3000,
    user: "root",
    password: "root",
    database: "DAI-Eventos",
}
import 'dotenv/config'

const config = {
    user    : process.env.DB_USER,
    password    : process.env.DB_PASSWORD,
    database    : process.env.DB_DATABASE,
}
export default config;