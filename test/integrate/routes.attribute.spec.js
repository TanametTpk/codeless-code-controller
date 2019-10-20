const supertest = require('supertest')
const chai = require('chai')
const express = require('../../config/express')
const server = express().server;
const mockup = require('../data/attribute')
const Attribute = require( "mongoose" ).model( "attribute" );

const { expect } = chai

describe('Attribute routes', () => {

    // clear database
    afterEach( async() => {

        await Attribute.deleteMany({})

    })

    
    const request = supertest(server)

    describe('Get', () => {

        // success
        it('responds with json', (done) => {

            request
                .get('/attribute')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('many attribute should return array', (done) => {

            request
                .get('/attribute')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, [], done);
        });

        it('single attribute should return object', (done) => {

            request
                .get('/attribute/507f1f77bcf86cd799439011')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, {}, done);

        });

    });

    describe('Create', () => {

        beforeEach(async()=>{
            await (new Attribute(mockup.attribute[0])).save()
        })

        // success
        it('attribute add to database completely', (done) => {

            request
            .post('/attribute')
            .send(mockup.attribute[0])
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200 , done)

        });

    });

    describe('Update', () => {

        let attribute = null

        beforeEach(async()=>{
            attribute = await (new Attribute(mockup.attribute[0])).save()
        })

        // success
        it('attribute change data completely', (done) => {

            request
            .put('/attribute/' + attribute._id)
            .send({
                name:mockup.attribute[1].name
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {

                expect(res.body.name).to.equal(mockup.attribute[1].name)
                done()

            })
            .catch((error) => {
                done(error)
            })

        });

        // error
        it('not found attribute should response not found', (done) => {

            request
            .put('/attribute/' + "507f1f77bcf86cd799439011")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, done);

        });

    });

    describe('Delete', () => {

        let attribute = null

        beforeEach(async()=>{
            attribute = await (new Attribute(mockup.attribute[0])).save()
        })

        it('attribute completely delete', (done) => {

            request
            .del('/attribute/' + attribute._id )
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

        });

        it('not found attribute should response not found', (done) => {

            request
            .del('/attribute/' + "507f1f77bcf86cd799439011" )
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, done);

        });

    });

})