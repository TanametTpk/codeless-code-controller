const supertest = require('supertest')
const chai = require('chai')
const express = require('../../config/express')
const server = express().server;
const mockup = require('../data/nodeBuild')

const { expect } = chai

// agent can check cookies in header
// const request = supertest.agent(server)

describe('Generator routes', () => {

    
    const request = supertest(server)

    describe('Build', () => {

        // success
        it('responds with json', (done) => {
            request
                .post('/generator')
                .send(mockup)
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .then( res => {
                    expect(res.body.url.length > 5).to.equal(true)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        });

    });

})