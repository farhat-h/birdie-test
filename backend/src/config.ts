/**
 * @todo
 * These are hard coded here but in production we will pull these from environment variable
 * for security
 */
import * as dotEnv from 'dotenv'
dotEnv.config({ path: `${__dirname}/.env` })
export const DBCredentials = {
    database: process.env.database,
    host: process.env.host,
    password: process.env.password,
    port: process.env.port ? parseInt(process.env.port, 10) : 3306,
    user: process.env.user,

}