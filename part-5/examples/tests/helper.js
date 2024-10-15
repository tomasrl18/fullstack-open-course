const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'Login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'Login' }).click()
}

const createNote = async (page, content) => {
    await page.getByTestId('new-note').fill(content)
    await page.getByRole('button', { name: 'save' }).click()
    await page.getByText(content).waitFor()
}
  
export { loginWith, createNote }