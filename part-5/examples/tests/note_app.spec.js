import { test, expect } from '@playwright/test'

test.describe('Note app', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5173')
    })
    
    test.skip('front page can be opened', async ({ page }) => {
      const locator = await page.getByText('Notes')
      await expect(locator).toBeVisible()
      await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })

    test('login form can be opened', async ({ page }) => {
        await page.getByRole('button', { name: 'Login' }).click()

        await page.getByTestId('username').fill('tomasrl')
        await page.getByTestId('password').fill('123456789')

        await page.getByRole('button', { name: 'Login' }).click()
    
        await expect(page.getByText('Tomas logged in')).toBeVisible()
    })
})