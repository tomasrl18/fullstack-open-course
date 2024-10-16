const loginWith = async (page, username, password)  => {
    await page.goto('/');
    
    await page.getByRole('button', { name: 'Login' }).click()

    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)

    await page.getByRole('button', { name: 'Login' }).click()
}

const logOut = async (page) => {
    await page.getByRole('button', { name: 'Logout' }).click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'New blog' }).click()

    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)

    await page.getByRole('button', { name: 'Add' }).click()
    
    await page.getByText(`Título: ${title}`).waitFor()
}
  
export { loginWith, logOut, createBlog }