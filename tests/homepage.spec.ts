import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Naz Optical/)
    await expect(page.locator('text=Naz Optical Service')).toBeVisible()
  })

  test('shows all product category sections', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Premium Sunglasses')).toBeVisible()
    await expect(page.locator('text=Eyeglasses')).toBeVisible()
    await expect(page.locator('text=Women')).toBeVisible()
    await expect(page.locator('text=Kids Glasses')).toBeVisible()
    await expect(page.locator('text=Computer')).toBeVisible()
    await expect(page.locator('text=Contact Lenses')).toBeVisible()
  })

  test('trust bar is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Free Delivery')).toBeVisible()
  })

  test('FAQ section loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('text=Frequently Asked Questions')).toBeVisible()
  })
})
