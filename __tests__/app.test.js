const { request } = require('../app.js');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');



beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('api', () => {
    test('get', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
    })
})

