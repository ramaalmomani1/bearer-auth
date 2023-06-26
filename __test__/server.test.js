'use strict'

require('dotenv').config()

const { app } = require("../src/server");
const { DB } = require("../src/auth/models/index");
const supertest = require('supertest');
const mockServer = supertest(app);
const base64 = require('base-64')
const basicAuthMiddleWare = require('../src/auth/middleware/basicAuth')

beforeAll(async () => {
  await DB.sync();
});

afterAll(async () => {
  await DB.drop();
});
  
// Test endpoints
describe('Test the signin & signup endpoints', () => {

  it(' POST to /signup to create a new user.  ', async () => {
    const result = await mockServer.post('/signup').send({
      userName: 'rama1',
      password: '1234'
    });
    expect(result.status).toEqual(201);
  });

  const base = base64.encode('rama1:1234')
  it('signin test' , async () =>{
    //   const base = base64.encode('rama1:1234')

    const res = await mockServer.post('/signin').set('Authorization', `Basic ${base}`)

    expect(res.statusCode).toBe(200)
    // expect(JSON.parse(res.text).message).toBe('This user is Authorized!!!')

})
});