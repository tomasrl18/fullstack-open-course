const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const Blog = require('../models/blog')

const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('api tests', () => {
    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
    
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    
    test('the unique identifier property of blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
    
        for (let blog of response.body) {
            assert(blog.id)
            assert.strictEqual(blog._id, undefined)
        }
    })
})

after(async () => {
    await mongoose.connection.close()
})