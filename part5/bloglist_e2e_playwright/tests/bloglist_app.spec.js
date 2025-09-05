const { test, expect, beforeEach, describe } = require('@playwright/test')
const { login, openCreateBlogForm, createBlog, openLastBlog, likeBlog, verifyBlogOrder } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'leonardofranco98',
        password: 'secretpassword',
        name: 'Leonardo Franco'
      }
    })
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'anotheruser',
        password: '123',
        name: 'another'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const usernameInput = page.getByLabel('username:')
    const passwordInput = page.getByLabel('password:')
    const loginBtn = page.getByText('login', { exact: true })

    await expect(usernameInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(loginBtn).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page, 'leonardofranco98', 'secretpassword')

      await page.getByText('Logged in as leonardofranco98').waitFor()

      const loggedInNotification = page.getByText('Logged in as leonardofranco98')
      const loggedInText = page.getByText('leonardofranco98 logged in')

      expect(loggedInNotification).toBeVisible()
      expect(loggedInNotification).toHaveCSS('color', 'rgb(0, 128, 0)')
      expect(loggedInText).toBeVisible()
    })

    test('fails with wrong username', async ({ page }) => {
      await login(page, 'wrongusername', 'secretpassword')

      await page.getByText('Username does not exist').waitFor()

      const loggedInNotification = page.getByText('Username does not exist')
      const loggedInText = page.getByText('leonardofranco98 logged in')

      expect(loggedInNotification).toBeVisible()
      expect(loggedInNotification).toHaveCSS('color', 'rgb(255, 0, 0)')
      expect(loggedInText).not.toBeVisible()
    })

    test('fails with wrong password', async ({ page }) => {
      await login(page, 'leonardofranco98', 'wrongpassword')

      await page.getByText('Username/password combination is not correct').waitFor()

      const loggedInNotification = page.getByText('Username/password combination is not correct')
      const loggedInText = page.getByText('leonardofranco98 logged in')

      expect(loggedInNotification).toBeVisible()
      expect(loggedInNotification).toHaveCSS('color', 'rgb(255, 0, 0)')
      expect(loggedInText).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'leonardofranco98', 'secretpassword')

      await page.getByText('Logged in as leonardofranco98').waitFor()
    })

    test('a new blog can be created', async ({ page }) => {
      await openCreateBlogForm(page)
      await createBlog(page, 'playwright title', 'leonardo', 'blogplaywright.com/blogs/asjd2')

      const blogCreated = page.getByText('New blog created successfully')

      expect(blogCreated).toBeVisible()
      expect(blogCreated).toHaveCSS('color', 'rgb(0, 128, 0)')

      const newBlog = page.getByText('playwright title')

      expect(newBlog).toBeVisible()
    })

    describe('and a blog is created', () => {
      beforeEach(async ({ page }) => {
        await openCreateBlogForm(page)
        await createBlog(page, 'playwright title', 'leonardo', 'blogplaywright.com/blogs/asjd2')
      })

      test('the created blog can be liked', async ({ page }) => {
        const showDetailsBtn = page.getByText('show details')
        await showDetailsBtn.click()

        const likeBtn = page.getByText('like', { exact: true })
        await likeBtn.click()

        await page.getByText('1 likes').waitFor()

        const likes = page.getByText('1 likes')
        expect(likes).toBeVisible()
      })

      test('the created blog can be deleted by the user who created it', async ({ page }) => {
        const showDetailsBtn = page.getByText('show details')
        await showDetailsBtn.click()

        const deleteBtn = page.getByText('delete', { exact: true })
        page.on('dialog', dialog => dialog.accept());
        await deleteBtn.click()

        await page.getByText('playwright title deleted').waitFor()

        const blogCreated = page.getByText('playwright title deleted')

        expect(blogCreated).toBeVisible()
        expect(blogCreated).toHaveCSS('color', 'rgb(0, 128, 0)')

        const newBlog = page.getByText('playwright title', { exact: true })

        expect(newBlog).not.toBeVisible()
      })

      test('the blog cannot be deleted by a user other than the one who created it', async ({ page }) => {
        const logoutBtn = page.getByText('logout')
        logoutBtn.click()

        await page.getByText('logged out').waitFor()

        await login(page, 'anotheruser', '123')

        const showDetailsBtn = page.getByText('show details')
        await showDetailsBtn.click()

        const deleteBtn = page.getByText('delete', { exact: true })

        expect(deleteBtn).not.toBeVisible()
      })
    })

    describe('and multiple blogs are created', () => {
      beforeEach(async ({ page }) => {
        let blogs = [
          {
            title: 'title 1',
            author: 'author 1',
            url: 'url 1'
          },
          {
            title: 'title 2',
            author: 'author 2',
            url: 'url 2'
          },
          {
            title: 'title 3',
            author: 'author 3',
            url: 'url 3'
          },
        ]

        await openCreateBlogForm(page)

        for (let i = 0; i < blogs.length; i++) {
          await createBlog(page, blogs[i].title, blogs[i].author, blogs[i].url)
          await openLastBlog(page)
        }
      })

      test('the blogs are ordered by likes', async ({ page }) => {
        let blogs = await page.locator('.blog').all()

        await verifyBlogOrder(page, ['title 1', 'title 2', 'title 3'])
        await likeBlog(page, 'title 2', 1, 0)
        await verifyBlogOrder(page, ['title 2', 'title 1', 'title 3'])
        await likeBlog(page, 'title 3', 2, 0)
        await verifyBlogOrder(page, ['title 3', 'title 2', 'title 1'])
        await likeBlog(page, 'title 2', 2, 1)
        await verifyBlogOrder(page, ['title 2', 'title 3', 'title 1'])
        await likeBlog(page, 'title 1', 1, 0)
        await verifyBlogOrder(page, ['title 2', 'title 3', 'title 1'])
      })
    })
  })
})