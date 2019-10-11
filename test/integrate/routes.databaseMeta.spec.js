const supertest = require('supertest')
const chai = require('chai')
const express = require('../../config/express')
const server = express().server;
const mockup = require('../data/databaseMeta')
const DatabaseMeta = require( "mongoose" ).model( "databaseMeta" );

const { expect } = chai

describe('DatabaseMeta routes', () => {

    // clear database
    afterEach( async() => {

        await DatabaseMeta.deleteMany({})

    })

    
    const request = supertest(server)

    describe('Get', () => {

        // success
        it('responds with json', (done) => {

            request
                .get('/databaseMeta')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, done);
        });

        it('many databaseMeta should return array', (done) => {

            request
                .get('/databaseMeta')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, [], done);
        });

        it('single databaseMeta should return object', (done) => {

            request
                .get('/databaseMeta/507f1f77bcf86cd799439011')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200, {}, done);

        });

    });

    describe('Create', () => {

        beforeEach(async()=>{
            await (new DatabaseMeta(mockup.databaseMeta[0])).save()
        })

        // success
        it('databaseMeta add to database completely', (done) => {

            request
            .post('/databaseMeta')
            .send(mockup.databaseMeta[0])
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200 , done)

        });

    });

    describe('Update', () => {

        let databaseMeta = null

        beforeEach(async()=>{
            databaseMeta = await (new DatabaseMeta(mockup.databaseMeta[0])).save()
        })

        // success
        it('databaseMeta change data completely', (done) => {

            request
            .put('/databaseMeta/' + databaseMeta._id)
            .send({
                name:mockup.databaseMeta[1].name
            })
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {

                expect(res.body.name).to.equal(mockup.databaseMeta[1].name)
                done()

            })
            .catch((error) => {
                done(error)
            })

        });

        // error
        it('not found databaseMeta should response not found', (done) => {

            request
            .put('/databaseMeta/' + "507f1f77bcf86cd799439011")
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, done);

        });

    });

    describe('Delete', () => {

        let databaseMeta = null

        beforeEach(async()=>{
            databaseMeta = await (new DatabaseMeta(mockup.databaseMeta[0])).save()
        })

        it('databaseMeta completely delete', (done) => {

            request
            .del('/databaseMeta/' + databaseMeta._id )
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

        });

        it('not found databaseMeta should response not found', (done) => {

            request
            .del('/databaseMeta/' + "507f1f77bcf86cd799439011" )
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(412, done);

        });

    });

})