import { test, expect } from '@playwright/test'

test.describe('About page', () => {
  test('loads with correct heading', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toContainText('Naz Optical Service')
    await expect(page.locator('text=1965')).toBeVisible()
  })

  test('shows contact numbers', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=0300-4686170')).toBeVisible()
    await expect(page.locator('text=0327-1830170')).toBeVisible()
  })

  test('Get Directions button exists', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('text=Get Directions')).toBeVisible()
  })
})

test.describe('Reviews page', () => {
  test('loads with reviews', async ({ page }) => {
    await page.goto('/reviews')
    await expect(page.locator('h1')).toBeVisible()
    // Should have at least a few review cards
    await expect(page.locator('[class*="rounded"]').nth(2)).toBeVisible()
  })
})

test.describe('Exchange Policy page', () => {
  test('loads with policy content', async ({ page }) => {
    await page.goto('/exchange-policy')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('text=exchange')).toBeVisible({ timeout: 5000 })
  })
})

test.describe('Admin page', () => {
  test('admin page loads', async ({ page }) => {
    await page.goto('/admin')
    await expect(page).toHaveURL('/admin')
    // Should show upload form or product list
    await expect(page.locator('text=Product')).toBeVisible({ timeout: 10000 })
  })
})
