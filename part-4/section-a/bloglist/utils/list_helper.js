const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let sum = 0

    blogs.forEach(blog => {
        sum += blog.likes
    })

    return sum
}

const favouriteBlog = (blogs) => {
    let favouriteBlog = {
        likes: 0
    }

    blogs.forEach(blog => {
        if (blog.likes > favouriteBlog.likes) {
            favouriteBlog = blog
        }
    })

    return favouriteBlog
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.groupBy(blogs, 'author')

    const authorBlogCounts = _.map(blogsByAuthor, (blogs, author) => ({
        author,
        blogs: blogs.length
    }))

    return _.maxBy(authorBlogCounts, 'blogs')
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs
}