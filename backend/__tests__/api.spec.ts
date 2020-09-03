import * as request from 'supertest';
import app from '../src/application';

const mock_recipId = 'e3e2bff8-d318-4760-beea-841a75f00227'
describe('Api controller', () => {
    it('Responds with 404 for unknown routes', async () => {
        await request(app)
            .get('/api/well-this-doesnt-exist-does-it')
            .expect(404)
    })
    it('Retrieves list of unique care recipients', async () => {
        await request(app)
            .get('/api/recipients')
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBeTruthy()
                expect(res.body.length).toBeGreaterThan(0)
            })
    })
    it('Retrieves timeline data for given recipient_id', async () => {
        await request(app)
            .get('/api/timeline/' + mock_recipId)
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBeTruthy()
                expect(res.body.length).toBeGreaterThan(0)
            })
        await request(app)
            .get('/api/timeline/this-doesnt-exist-also')
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBeTruthy()
                expect(res.body.length).toEqual(0)
            })
    })
    it('Retrieves Chart data', async () => {
        await request(app)
            .get('/api/medication/' + mock_recipId)
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBeTruthy()
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body.every((item: any) => Object.hasOwnProperty.call(item, "label")
                    && Object.hasOwnProperty.call(item, "data")))
                    .toBeTruthy()
            })
        await request(app)
            .get('/api/mood/' + mock_recipId)
            .expect(200)
            .expect(res => {
                expect(Array.isArray(res.body)).toBeTruthy()
                expect(res.body.length).toBeGreaterThan(0)
                expect(res.body.every((item: any) => Object.hasOwnProperty.call(item, "label")
                    && Object.hasOwnProperty.call(item, "data")))
                    .toBeTruthy()
            })
    })
});
