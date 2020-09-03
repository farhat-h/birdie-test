import { Connection, createConnection, MysqlError } from 'mysql'
import { Transform } from 'stream'
import { DBCredentials } from './config'

const NO_TRANSFORM = (obj: any) => obj

const DATE_FORMAT = '%d-%m-%Y'
const TIME_FORMAT = '%H:%i:%S'
const CONCERN_EVENTS = ['regular_medication_not_taken', 'concern_raised', 'no_medication_observation_received', 'visit_cancelled', 'alert_raised']
const HIGHLIGHT_EVENTS = ['physical_health_observation', 'mood_observation', 'general_observation']

/**
 * Object of this class will handle communication with the database
 * mainly querying and parsing the data since we can perform reads
 * on a single table
 */
class Database {

    private connection: Connection

    constructor() {
        this.connection = createConnection({
            database: DBCredentials.database,
            debug: false,
            host: DBCredentials.host,
            password: DBCredentials.password,
            port: DBCredentials.port,
            user: DBCredentials.user
        })
        this.connect().then()
    }
    /**
     * Wrapper around Connection.query to promisify the method
     * @param sql SQL query string or template
     * @param values Values that will be used in an SQL query template
     * @param options additional query options
     */
    /**
     * Makes Connection.connect in promise form
     */
    public connect(options?: any) {
        return new Promise((resolve, reject) => {
            if (!/(connected|authenticated)/.test(this.connection.state)) {
                this.connection.connect(options, (error: MysqlError) => {
                    if (error) {
                        return reject(error)
                    }
                    return resolve()
                })
            }
            else {
                resolve()
            }
        })
    }

    public getCareRecipients() {
        const sql = `
            select distinct care_recipient_id
            from events; 
        `
        return this.transformQuery((object) => object.care_recipient_id, sql)
    }

    public getTimeline(recipId: string) {
        const sql = `
            select 
                date_format(timestamp, '${DATE_FORMAT}') formatted_date,
                GROUP_CONCAT(
                    IF(
                        event_type in (?),
                        CONCAT_WS(";;", event_type, id, timestamp, JSON_EXTRACT(payload, '$.note'), JSON_EXTRACT(payload, '$.medication_failure_reason'), JSON_EXTRACT(payload, '$.severity')), 

                        NULL) SEPARATOR '||'
                    ) concerns,
                GROUP_CONCAT(
                    IF (
                        event_type in (?), 
                        CONCAT_WS(";;", event_type, id, timestamp, JSON_EXTRACT(payload, '$.note'), JSON_EXTRACT(payload, '$.mood')), 
                        NULL
                    )  SEPARATOR '||') highlights
            from events
            where care_recipient_id = ?
            group by formatted_date
            order by timestamp desc
        `
        const transform = (obj: any) => {
            obj.highlights = obj.highlights?.split('||').map((item: string) => item.split(';;'))
            obj.concerns = obj.concerns?.split('||').map((item: string) => item.split(';;'))

            return obj
        }
        return this.transformQuery(transform, sql, [CONCERN_EVENTS, HIGHLIGHT_EVENTS, recipId])
    }
    public getDayEvents(recipId: string, date: string) {
        const sql = `
            select 
                id,
                event_type type,
                date_format(timestamp, '${TIME_FORMAT}') time,
                CONCAT_WS('::', JSON_EXTRACT(payload, '$.note'), JSON_EXTRACT(payload, '$.consumed_volume_ml'), JSON_EXTRACT(payload, '$.task_schedule_note'), JSON_EXTRACT(payload, '$.task_definition_description')) note,
                caregiver_id
            from events
            where care_recipient_id = ?
                and date_format(timestamp, '${DATE_FORMAT}') = ?
            order by timestamp DESC
        `
        return this.transformQuery((obj) => obj, sql, [recipId, date])
    }


    public getEventsByType = (recipId: string, type: string/* startDate: string, endDate: string*/) => {
        const sql = `
            select id, event_type, payload, timestamp
            from events 
            where care_recipient_id = ?
            and event_type = ?
        `
        return this.transformQuery(NO_TRANSFORM, sql, [recipId, type])
    }

    public getMedicationChart(recipId: string) {
        const sql = `
        select event_type label, count(event_type) data
        from events
        where event_type in ('regular_medication_taken', 'regular_medication_partially_taken', 'regular_medication_not_taken', 'regular_medication_maybe_taken')
        and care_recipient_id = ?
        group by label
        `
        return this.transformQuery(NO_TRANSFORM, sql, [recipId])
    }

    public getMoodChart(recipId: string) {
        const sql = `
        select json_extract(payload, '$.mood') label, count(json_extract(payload, '$.mood')) data
        from events
        where event_type='mood_observation'
        and care_recipient_id = ?
        group by label
        `
        return this.transformQuery(NO_TRANSFORM, sql, [recipId])
    }

    /**
     * Wrapper around connection.query, provides a promise based approach with the advantage
     * of transform streams
     * 
     * @param transform maps a row to return value  
     * @param sql sql query string
     * @param values values to be injected in sql query
     */
    private transformQuery<T = any>(transform: (object: any) => T, sql: string, values?: any) {
        return new Promise<T[]>((resolve, reject) => {

            const data: T[] = []
            return this.connection.query({ sql, values })
                .stream()
                .pipe(new Transform({
                    objectMode: true,
                    transform: (object, _, callback) => {
                        callback(undefined, transform(object))
                    }
                }))
                .on("data", (item) => data.push(item))
                .on("end", () => resolve(data))
                .on("error", reject)

        })
    }


}


/**
 * We just need a single Database object (Singleton pattern)
 * that will handle all the communication with DB
 */
export default new Database()