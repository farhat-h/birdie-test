/**
 * @todo
 * These are hard coded here but in production we will pull these from environment variable
 * for security
 */
import * as dotEnv from 'dotenv'
dotEnv.config({ path: `${__dirname}/.env` })
export const DBCredentials = {
    host: process.env.host,
    port: process.env.port ? parseInt(process.env.port, 10) : 3306,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,

}