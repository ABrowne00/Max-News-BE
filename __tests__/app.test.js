const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const { seed } = require('../db/seeds/seed.js');
const app = require('../app')
const request = require('supertest');
const jestSorted = require('jest-sorted')



beforeEach(() => seed(testData));
afterAll(() => db.end());

// describe('api', () => {
//     test('get users', () => {
//         return request(app)
//         .get('/api/users')
//         .expect(200)
//     })
// })



describe.only('api articles', () => {
    test('/api/articles responds with status 200 and array of articles with additional comments', () => {
        return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
            expect(res.body.articles).toBeInstanceOf(Array);
                res.body.articles.forEach((article) => {
                    expect(article).toMatchObject({
                        article_id: expect.any(Number),
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(String)
                    })
                })
           })
     })
     test('/api/aritcles responds with status 200 and sorted by date default', () => {
         return request(app)
         .get('/api/articles')
         .expect(200)
         .then((res) => {
             expect(res.body.articles).toBeSorted('created_at')
         })
     })
})


// res.body.articles.forEach((article) => {
            //     expect(article).toMatchObject({
            //         article_id: expect.any(Number),
            //         title: expect.any(String),
            //         topic: expect.any(String),
            //         author: expect.any(String),
            //         body: expect.any(String),
            //         created_at: expect.any(String),
            //         votes: expect.any(Number),
            //         comment_count: expect.any(String)
                
            //     })
            // }