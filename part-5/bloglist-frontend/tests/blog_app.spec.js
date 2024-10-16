import { test, expect } from '@playwright/test'

import { loginWith } from './helper'

test.describe('Blog app', () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Tomas',
        username: 'tomasrl',
        password: '123456789'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
  })

  test('login fails with wrong password', async ({ page }) => {
    await loginWith(page, 'tomasrl', 'wrong')

    await expect(page.getByText('wrong credentials')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await loginWith(page, 'tomasrl', '123456789')

    await expect(page.getByText('Tomas logged-in')).toBeVisible()
  })
})
