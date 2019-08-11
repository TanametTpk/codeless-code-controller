const supertest = require('supertest')
const chai = require('chai')
const express = require('../config/express')
const server = express().server;
const mockup = require('./data/builder')

const { expect } = chai

// agent can check cookies in header
// const request = supertest.agent(server)

describe('Generator routes', () => {

    const apiVersion = "/api/v1"
    const request = supertest(server)

    describe('Build', () => {

        // success
        it('responds with json', (done) => {
            request
                .post(apiVersion + '/generator')
                .send(mockup)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(412 , done)
        });

    });

})