const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

const testList1 = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  }
]

const testList2 = []

const testList3 = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {

  test('array with one blog', () => {

    const result = listHelper.totalLikes(testList1)

    assert.strictEqual(result, 7)
  })

  test('empty array', () => {

    const result = listHelper.totalLikes(testList2)

    assert.strictEqual(result, 0)
  })

  test('array with several blogs', () => {

    const result = listHelper.totalLikes(testList3)

    assert.strictEqual(result, 36)
  })
})

describe('favorite blog', () => {

  test('array with one blog', () => {

    const expected = {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    }

    const result = listHelper.favoriteBlog(testList1)

    assert.deepStrictEqual(result, expected)
  })

  test('empty array', () => {

    const result = listHelper.favoriteBlog(testList2)

    assert.deepStrictEqual(result, null)
  })

  test('array with several blogs', () => {

    const expected = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    }

    const result = listHelper.favoriteBlog(testList3)

    assert.deepStrictEqual(result, expected)
  })
})

describe('most blogs', () => {

  test('array with one blog', () => {

    const expected = {
      author: "Michael Chan",
      blogs: 1
    }

    const result = listHelper.mostBlogs(testList1)

    assert.deepStrictEqual(result, expected)
  })

  test('empty array', () => {

    const result = listHelper.mostBlogs(testList2)

    assert.deepStrictEqual(result, null)
  })

  test('array with several blogs', () => {

    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    }

    const result = listHelper.mostBlogs(testList3)

    assert.deepStrictEqual(result, expected)
  })
})

describe('most likes', () => {

  test('array with one blog', () => {

    const expected = {
      author: "Michael Chan",
      likes: 7
    }

    const result = listHelper.mostLikes(testList1)

    assert.deepStrictEqual(result, expected)
  })

  test('empty array', () => {

    const result = listHelper.mostLikes(testList2)

    assert.deepStrictEqual(result, null)
  })

  test('array with several blogs', () => {

    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    const result = listHelper.mostLikes(testList3)

    assert.deepStrictEqual(result, expected)
  })
})