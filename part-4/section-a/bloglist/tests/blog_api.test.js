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

    test('a valid blog can be added ', async () => {
        const newBlog = {
          title: 'Invicto',
          author: 'Marcos Vazquez',
          url: 'https://latam.casadellibro.com/libro-invicto/9788413980577/12505205',
          likes: 123456789
        }
    
        await api
          .post('/api/blogs')
          .send(newBlog)
          .expect(201)
          .expect('Content-Type', /application\/json/)
    
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
        const titles = blogsAtEnd.map(n => n.title)
        assert(titles.includes('Invicto'))
    })
})

after(async () => {
    await mongoose.connection.close()
})