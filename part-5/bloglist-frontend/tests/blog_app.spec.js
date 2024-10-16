import { test, expect } from '@playwright/test'

import { loginWith, createBlog } from './helper'

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

    test.describe('When logged in', () => {
        test.beforeEach(async ({ page }) => {
            await loginWith(page, 'tomasrl', '123456789')
        })

        test('A new blog can be created', async ({ page }) => {
            await createBlog(page, 'A blog created by playwright', 'Some author', 'some-url', true)
            await expect(page.getByText('Título: A blog created by playwright')).toBeVisible()
        })

        /* test('A new blog can be created', async ({ page }) => {
            await loginWith(page, 'tomasrl', '123456789')

            await page.getByRole('button', { name: 'New blog' }).click();
            await page.getByTestId('title').click();
            await page.getByTestId('title').fill('Someone');
            await page.getByTestId('title').press('Tab');
            await page.getByTestId('author').fill('Someone');
            await page.getByTestId('author').press('Tab');
            await page.getByTestId('url').fill('Someone');
            await page.getByRole('button', { name: 'Add' }).click();
            await page.getByText('Título: SomeoneView details').click();
        }); */
    })
})
