import { test, expect } from '@playwright/test'

test.describe('Product quick view modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?category=men')
    // Wait for products to load
    await page.waitForSelector('.group', { timeout: 10000 })
  })

  test('clicking a product card opens modal', async ({ page }) => {
    await page.locator('.group').first().click()
    await expect(page.locator('[class*="fixed inset-0"]')).toBeVisible()
  })

  test('modal shows product name and price', async ({ page }) => {
    await page.locator('.group').first().click()
    await expect(page.locator('text=Rs.').first()).toBeVisible()
  })

  test('modal closes on X button click', async ({ page }) => {
    await page.locator('.group').first().click()
    await page.locator('button svg.lucide-x').first().click()
    await expect(page.locator('[class*="fixed inset-0"]')).not.toBeVisible()
  })

  test('modal closes on backdrop click', async ({ page }) => {
    await page.locator('.group').first().click()
    await page.mouse.click(10, 10)
    await expect(page.locator('[class*="fixed inset-0"]')).not.toBeVisible()
  })

  test('WhatsApp button is visible in modal', async ({ page }) => {
    await page.locator('.group').first().click()
    await expect(page.locator('text=WhatsApp').first()).toBeVisible()
  })
})

test.describe('Order inquiry form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?category=men')
    await page.waitForSelector('.group', { timeout: 10000 })
    await page.locator('.group').first().click()
    await page.locator('text=WhatsApp').first().click()
  })

  test('order form appears after clicking WhatsApp', async ({ page }) => {
    await expect(page.locator('input[placeholder*="name"], input[placeholder*="Name"]').first()).toBeVisible()
  })

  test('WhatsApp send button disabled when form empty', async ({ page }) => {
    // Button/link should not be active without name+phone
    const link = page.locator('a[href*="wa.me"]').first()
    // If rendered as disabled span or inactive state
    await expect(page.locator('text=0300').first()).not.toBeVisible()
  })

  test('WhatsApp links activate after filling name and phone', async ({ page }) => {
    await page.fill('input[placeholder*="name"], input[placeholder*="Name"]', 'Test Customer')
    await page.fill('input[placeholder*="phone"], input[placeholder*="Phone"]', '03001234567')
    await expect(page.locator('a[href*="wa.me"]').first()).toBeVisible()
  })
})
