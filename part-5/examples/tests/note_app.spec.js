import { test, expect } from '@playwright/test'

test.describe('Note app', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })
    
    test.skip('Front page can be opened', async ({ page }) => {
      const locator = await page.getByText('Notes')
      await expect(locator).toBeVisible()
      await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })

    test('user can log in', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click()
        
        await page.getByTestId('username').fill('tomasrl')
        await page.getByTestId('password').fill('123456789')

        await page.getByRole('button', { name: 'Login' }).click()

        await expect(page.getByText('Tomas logged in')).toBeVisible()
    })
    
    test.describe('When logged in', () => {
        test.beforeEach(async ({ page }) => {
            await page.getByRole('button', { name: 'Login' }).click()

            await page.getByTestId('username').fill('tomasrl')
            await page.getByTestId('password').fill('123456789')

            await page.getByRole('button', { name: 'Login' }).click()
        })

        test('A new note can be created', async ({ page }) => {
            await page.getByTestId('new-note').fill('A note created by playwright')
            await page.getByRole('button', { name: 'Save' }).click()
            await expect(page.getByText('A note created by playwright')).toBeVisible()
        })
    })

})