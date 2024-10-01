const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const Blog = require('../models/blog')

const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')

const app = require('../app')

const api = supertest(app)

describe('when there is initially some notes saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
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
    
        describe('addition of a new blog', () => {
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
        
            test('blog without likes set blog likes to 0', async () => {
                const newBlog = {
                  title: 'A test title',
                  author: 'A test author',
                  url: 'https://aTestURL.com'
                }
              
                const response = await api
                  .post('/api/blogs')
                  .send(newBlog)
                  .expect(201)
                  .expect('Content-Type', /application\/json/)
              
                assert.strictEqual(response.body.likes, 0)
            })
        
            test('blog without title is not added', async () => {
                const newBlog = {
                    author: 'A test author',
                    url: 'https://aTestURL.com',
                }
              
                await api
                  .post('/api/blogs')
                  .send(newBlog)
                  .expect(400)
              
                const blogsAtEnd = await helper.blogsInDb()
              
                assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
            })
        
            test('blog without url is not added', async () => {
                const newBlog = {
                    title: 'A test title',
                    author: 'A test author',
                }
              
                await api
                  .post('/api/blogs')
                  .send(newBlog)
                  .expect(400)
              
                const blogsAtEnd = await helper.blogsInDb()
              
                assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
            })
        })
    
    
        describe('deletion of a blog', () => {
            test('succeeds with status code 204 if id is valid', async () => {
              const blogsAtStart = await helper.blogsInDb()
              const blogToDelete = blogsAtStart[0]
        
              await api
                .delete(`/api/blogs/${blogToDelete.id}`)
                .expect(204)
        
              const blogsAtEnd = await helper.blogsInDb()
        
              assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
        
              const titles = blogsAtEnd.map(r => r.title)
              assert(!titles.includes(blogToDelete.title))
            })
        })
    })
})


after(async () => {
    await mongoose.connection.close()
})