import { test, expect } from '@playwright/test'

import { loginWith, createNote } from './helper'

test.describe('Note app', () => {
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
    
    test.skip('Front page can be opened', async ({ page }) => {
      const locator = await page.getByText('Notes')
      await expect(locator).toBeVisible()
      await expect(page.getByText('Note app, Department of Computer Science, University of Helsinki 2024')).toBeVisible()
    })

    test('login fails with wrong password', async ({ page }) => {
        await loginWith(page, 'tomarl', 'wrong')
    
        await expect(page.getByText('wrong credentials')).toBeVisible()
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
            await loginWith(page, 'tomasrl', '123456789')
        })

        test('A new note can be created', async ({ page }) => {
            await createNote(page, 'A note created by playwright', true)
            await expect(page.getByText('A note created by playwright')).toBeVisible()
        })

        test.describe('and several notes exists', () => {
            test.beforeEach(async ({ page }) => {
                await createNote(page, 'first note', true)
                await createNote(page, 'second note', true)
                await createNote(page, 'third note', true)
            })
        
            test('one of those can be made nonimportant', async ({ page }) => {
                const otherNoteText = await page.getByText('second note')
                const otherdNoteElement = await otherNoteText.locator('..')
          
                await otherdNoteElement.getByRole('button', { name: 'Make not important' }).click()
                await expect(otherdNoteElement.getByText('Make important')).toBeVisible()
            })
        })
    })

})