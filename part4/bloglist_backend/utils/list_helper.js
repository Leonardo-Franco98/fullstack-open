const dummy = (blogs) => 1

const totalLikes = (blogs) => {
    let total = 0

    blogs.forEach(b => {
        total += b.likes
    })

    return total
}

const favoriteBlog = (blogs) => {
    let max = -1
    let favorite = null

    for (let i = 0; i < blogs.length; i++) {
        if (blogs[i].likes > max) {
            max = blogs[i].likes
            favorite = {...blogs[i]}
        }
    }

    return favorite
}

const mostBlogs = (blogs) => {
    let blogsPerAuthor = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (blogsPerAuthor.has(blogs[i].author)) {
            blogsPerAuthor.set(blogs[i].author, blogsPerAuthor.get(blogs[i].author) + 1)
        } else {
            blogsPerAuthor.set(blogs[i].author, 1)
        }
    }

    let max = -1
    let result = null

    for (const [key, value] of blogsPerAuthor.entries()) {
        if (blogsPerAuthor.get(key) > max) {
            max = value
            result = {
                author: key,
                blogs: value
            }
        }
    }

    return result
}

const mostLikes = (blogs) => {
    let likesPerAuthor = new Map()

    for (let i = 0; i < blogs.length; i++) {
        if (likesPerAuthor.has(blogs[i].author)) {
            likesPerAuthor.set(blogs[i].author, likesPerAuthor.get(blogs[i].author) + blogs[i].likes)
        } else {
            likesPerAuthor.set(blogs[i].author, blogs[i].likes)
        }
    }

    let max = -1
    let result = null

    for (const [key, value] of likesPerAuthor.entries()) {
        if (likesPerAuthor.get(key) > max) {
            max = value
            result = {
                author: key,
                likes: value
            }
        }
    }

    return result
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }