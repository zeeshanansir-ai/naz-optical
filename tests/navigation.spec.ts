import { test, expect } from '@playwright/test'

test.describe('Header navigation', () => {
  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    await page.click('text=Naz Optical Service')
    await expect(page).toHaveURL('/')
  })

  test('Reviews link works', async ({ page }) => {
    await page.goto('/')
    await page.click('a[href="/reviews"]')
    await expect(page).toHaveURL('/reviews')
    await expect(page.locator('h1')).toContainText('Reviews')
  })

  test('mega menu: Eyeglasses appears on hover', async ({ page }) => {
    await page.goto('/')
    await page.hover('text=Eyeglasses')
    await expect(page.locator('text=Men Glasses').first()).toBeVisible()
    await expect(page.locator('text=Women Glasses').first()).toBeVisible()
    await expect(page.locator('text=Kids Glasses').first()).toBeVisible()
  })

  test('mega menu: Sunglasses submenu links navigate', async ({ page }) => {
    await page.goto('/')
    await page.hover('text=Sunglasses')
    await page.click('text=All Sunglasses')
    await expect(page).toHaveURL('/?category=sunglasses')
  })

  test('mega menu: brand link filters correctly', async ({ page }) => {
    await page.goto('/')
    await page.hover('text=Eyeglasses')
    await page.click('text=Ray Ban')
    await expect(page.url()).toContain('q=Ray')
  })

  test('Contact Lenses menu navigates correctly', async ({ page }) => {
    await page.goto('/')
    await page.hover('text=Contact Lenses')
    await page.click('text=All Contact Lenses')
    await expect(page).toHaveURL('/?category=contact')
  })
})

test.describe('Footer links', () => {
  test('About Us link works', async ({ page }) => {
    await page.goto('/')
    await page.click('footer a[href="/about"]')
    await expect(page).toHaveURL('/about')
  })

  test('Exchange Policy link works', async ({ page }) => {
    await page.goto('/')
    await page.click('footer a[href="/exchange-policy"]')
    await expect(page).toHaveURL('/exchange-policy')
  })

  test('Reviews link in footer works', async ({ page }) => {
    await page.goto('/')
    await page.click('footer a[href="/reviews"]')
    await expect(page).toHaveURL('/reviews')
  })

  test('footer category links navigate correctly', async ({ page }) => {
    await page.goto('/')
    await page.click('footer a[href="/?category=women"]')
    await expect(page).toHaveURL('/?category=women')
  })
})
