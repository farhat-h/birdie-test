import { Request, Response, Router } from 'express'
import db from '../Database'


export const apiController = Router()

const getRecipients = async (_: Request, res: Response) => {
    try {
        const recipients = await db.getCareRecipients()
        return res.status(200).send(recipients)
    } catch (error) {
        return res.status(error.status || 500)
            .send(error.message)
    }
}


const getRecipientTimeline = async (req: Request, res: Response) => {
    try {
        const { recipId } = req.params
        req.query.page = req.query.page || "0"

        const timeline = await db.getTimeline(recipId)
        return res.status(200).send(timeline)
    } catch (error) {
        return res.status(error.status || 500)
            .send(error.message)
    }
}

const getDayEvents = async (req: Request, res: Response) => {
    try {
        const { recipId, date } = req.params
        const events = await db.getDayEvents(recipId, date)
        return res.status(200).send(events)
    } catch (error) {
        return res.status(error.status || 500)
            .send(error.message)
    }
}
const getInitialTrackingData = async (req: Request, res: Response) => {
    try {
        const { recipId, eventType } = req.params
        const data = await db.getEventsByType(recipId, eventType)
        return res.status(200).send(data)

    } catch (error) {
        return res.status(error.status || 500)
            .send(error.message)

    }
}

const getMedicationChart = async (req: Request, res: Response) => {
    try {
        const { recipId } = req.params
        const data = await db.getMedicationChart(recipId)
        return res.status(200).send(data)

    } catch (error) {
        return res.status(error.status || 500)
            .send(error.message)

    }
}
const getMoodChart = async (req: Request, res: Response) => {
    try {
        const { recipId } = req.params
        const data = await db.getMoodChart(recipId)
        return res.status(200).send(data)

    } catch (error) {
        return res.status(error.status || 500)
            .send(error.message)

    }
}
apiController.get('/recipients', getRecipients)
apiController.get('/timeline/:recipId/', getRecipientTimeline)
apiController.get('/timeline/:recipId/:date', getDayEvents)
apiController.get('/tracking/:recipId/:eventType', getInitialTrackingData)
apiController.get('/medication/:recipId', getMedicationChart)
apiController.get('/mood/:recipId', getMoodChart)
apiController.get('*', (_, res: Response) => res.sendStatus(404))