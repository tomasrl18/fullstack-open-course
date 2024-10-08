const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')

const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

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
          let token;

          beforeEach(async () => {
            await User.deleteMany({})

            const passwordHash = await bcrypt.hash('123456789', 10)
            const user = new User({ username: 'holapaco', passwordHash })
            
            await user.save() 

            const loginResponse = await api
              .post('/api/login')
              .send({ username: 'holapaco', password: '123456789' });
            
            token = loginResponse.body.token;

            if (!token) {
              throw new Error('Failed to retrieve token during login');
            }
          });

          test('a valid blog can be added with token', async () => {
            const newBlog = {
              title: 'Invicto',
              author: 'Marcos Vazquez',
              url: 'https://latam.casadellibro.com/libro-invicto/9788413980577/12505205',
              likes: 123456789,
            };
        
            await api
              .post('/api/blogs')
              .set('Authorization', `Bearer ${token}`)
              .send(newBlog)
              .expect(201)
              .expect('Content-Type', /application\/json/);
        
            const blogsAtEnd = await helper.blogsInDb();
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);
        
            const titles = blogsAtEnd.map(n => n.title);
            assert(titles.includes('Invicto'));
          });
      
          test('blog without likes set blog likes to 0', async () => {
            const newBlog = {
              title: 'A test title',
              author: 'A test author',
              url: 'https://aTestURL.com'
            };
        
            const response = await api
              .post('/api/blogs')
              .set('Authorization', `Bearer ${token}`)
              .send(newBlog)
              .expect(201)
              .expect('Content-Type', /application\/json/);
        
            assert.strictEqual(response.body.likes, 0);
          });
      
          test('blog without title is not added', async () => {
            const newBlog = {
              author: 'A test author',
              url: 'https://aTestURL.com',
            };
        
            await api
              .post('/api/blogs')
              .set('Authorization', `Bearer ${token}`)
              .send(newBlog)
              .expect(400);
        
            const blogsAtEnd = await helper.blogsInDb();
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
          });
      
          test('blog without url is not added', async () => {
            const newBlog = {
              title: 'A test title',
              author: 'A test author',
            };
        
            await api
              .post('/api/blogs')
              .set('Authorization', `Bearer ${token}`)
              .send(newBlog)
              .expect(400);
        
            const blogsAtEnd = await helper.blogsInDb();
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
          });

          test('blog addition fails with 401 Unauthorized if token is not provided', async () => {
            const newBlog = {
              title: 'Unauthorized Blog',
              author: 'No Token Author',
              url: 'https://unauthorized.com'
            };
        
            await api
              .post('/api/blogs')
              .send(newBlog)
              .expect(401);
        
            const blogsAtEnd = await helper.blogsInDb();
            assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
          });
        })

        describe('updating a blog', () => {
            test('a blog can be updated', async () => {
              const blogsAtStart = await Blog.find({})
              const blogToUpdate = blogsAtStart[0]
          
              const updatedBlogData = {
                likes: blogToUpdate.likes + 10
              }

              const response = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .send(updatedBlogData)
                .expect(200)
                .expect('Content-Type', /application\/json/)
              
              assert.strictEqual(response.body.likes, blogToUpdate.likes + 10)
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