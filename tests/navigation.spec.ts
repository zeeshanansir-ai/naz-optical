import { test, expect } from '@playwright/test'

test.describe('Header navigation', () => {
  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    await page.getByRole('link', { name: 'Naz Optical Service' }).first().click()
    await expect(page).toHaveURL('/')
  })

  test('Reviews link works', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation').getByRole('link', { name: 'Reviews' }).click()
    await expect(page).toHaveURL('/reviews')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('mega menu: Eyeglasses submenu appears on hover', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation').getByText('Eyeglasses').first().hover()
    await expect(page.getByText('Men Glasses').first()).toBeVisible()
    await expect(page.getByText('Women Glasses').first()).toBeVisible()
    await expect(page.getByText('Kids Glasses').first()).toBeVisible()
  })

  test('mega menu: Sunglasses All link navigates', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation').getByText('Sunglasses').first().hover()
    await page.getByRole('link', { name: 'All Sunglasses' }).click()
    await expect(page).toHaveURL('/?category=sunglasses')
  })

  test('mega menu: brand link adds search param', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation').getByText('Eyeglasses').first().hover()
    // Wait for the dropdown to be visible
    const dropdown = page.locator('nav .absolute').first()
    await expect(dropdown).toBeVisible()
    // Click the Ray Ban link inside the dropdown
    await dropdown.getByRole('link', { name: 'Ray Ban' }).click()
    await expect(page).toHaveURL(/q=Ray/)
  })

  test('Contact Lenses menu navigates correctly', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('navigation').getByText('Contact Lenses').first().hover()
    await page.getByRole('link', { name: 'All Contact Lenses' }).click()
    await expect(page).toHaveURL('/?category=contact')
  })
})

test.describe('Footer links', () => {
  test('About Us link works', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').getByRole('link', { name: 'About Us' }).click()
    await expect(page).toHaveURL('/about')
  })

  test('Exchange Policy link works', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').getByRole('link', { name: 'Exchange Policy' }).click()
    await expect(page).toHaveURL('/exchange-policy')
  })

  test('Reviews link in footer works', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').getByRole('link', { name: 'Reviews' }).click()
    await expect(page).toHaveURL('/reviews')
  })

  test('footer Women Glasses link navigates correctly', async ({ page }) => {
    await page.goto('/')
    await page.locator('footer').getByRole('link', { name: 'Women Glasses' }).click()
    await expect(page).toHaveURL('/?category=women')
  })
})
