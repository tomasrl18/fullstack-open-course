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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}