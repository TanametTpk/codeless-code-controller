const supertest = require('supertest')
const chai = require('chai')
const express = require('../../config/express')
const server = express().server;
const mockup = require('../data/nodeBuild')
const auth = require('../data/auth')

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
                .set('Authorization', auth.jwt)
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

    describe('Build inplace', () => {

        const DatabaseMeta = require('../../app/classes/databaseMeta')
        const Attribute = require('../../app/classes/attribute')

        beforeEach(async()=> {

            await Promise.all(mockup.requirement.schemas.map((s) => {
                s.attributes.map((a) => Attribute.create(a))
                DatabaseMeta.create({...s , box:mockup.boxID})
            }))

        })

        afterEach(async() => {
            require( "mongoose" ).model( "attribute" ).deleteMany({})
            require( "mongoose" ).model( "databaseMeta" ).deleteMany({})
        })

        // success
        it('responds with json', (done) => {
            request
                .post('/generator/inplace')
                .send({boxID: mockup.boxID})
                .set('Authorization', auth.jwt)
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