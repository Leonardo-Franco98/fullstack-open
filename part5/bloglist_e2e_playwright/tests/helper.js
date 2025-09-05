const { expect } = require('@playwright/test')

const login = async (page, username, password) => {
  const usernameInput = page.getByLabel('username:')
  const passwordInput = page.getByLabel('password:')
  const loginBtn = page.getByText('login', { exact: true })

  await usernameInput.fill(username)
  await passwordInput.fill(password)
  await loginBtn.click()
}

const openCreateBlogForm = async (page) => {
  const openFormBtn = page.getByText('Create new blog')
  await openFormBtn.click()
}

const createBlog = async (page, title, author, url) => {
  const titleInput = page.getByLabel('title:')
  const authorInput = page.getByLabel('author:')
  const urlInput = page.getByLabel('url:')
  const createBtn = page.getByText('Create', { exact: true })

  await titleInput.fill(title)
  await authorInput.fill(author)
  await urlInput.fill(url)
  await createBtn.click()

  await page.getByText(title).waitFor()
}

const openLastBlog = async (page) => {
  const showDetailsBtn = page.getByText('show details')
  await showDetailsBtn.click()
}

const likeBlog = async (page, blogName, numberOfLikes, currentLikes) => {
  let likeBtn = page.locator('.blog').filter({ hasText: blogName }).getByText('like', { exact: true })

  for (let i = 1; i <= numberOfLikes; i++) {
    await likeBtn.click()
    await page.locator('.blog').filter({ hasText: blogName }).getByText(`${currentLikes + i} likes`).waitFor()
  }
}

const verifyBlogOrder = async (page, titleArray) => {
  let blogs = await page.locator('.blog').all()

  for (let i = 0; i < titleArray.length; i++) {
    expect(blogs[i]).toContainText(titleArray[i])
  }
}

module.exports = { login, openCreateBlogForm, createBlog, openLastBlog, likeBlog, verifyBlogOrder }