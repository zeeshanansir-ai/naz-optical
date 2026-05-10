import { test, expect } from '@playwright/test'

test.describe('Product quick view modal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?category=men')
    await page.waitForSelector('.group', { timeout: 10000 })
  })

  test('clicking a product card opens modal', async ({ page }) => {
    await page.locator('.group').first().click()
    // Modal is a fixed overlay
    await expect(page.locator('.fixed.inset-0').first()).toBeVisible()
  })

  test('modal shows price', async ({ page }) => {
    await page.locator('.group').first().click()
    await expect(page.locator('text=Rs.').first()).toBeVisible()
  })

  test('modal closes on X button click', async ({ page }) => {
    await page.locator('.group').first().click()
    await expect(page.locator('.fixed.inset-0').first()).toBeVisible()
    // Click the X button inside the modal
    await page.locator('.fixed.inset-0 button').filter({ has: page.locator('svg') }).first().click()
    await expect(page.locator('.fixed.inset-0')).not.toBeVisible()
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

  test('order form shows name and phone fields', async ({ page }) => {
    await expect(page.locator('input').first()).toBeVisible()
  })

  test('WhatsApp links activate after filling name and phone', async ({ page }) => {
    const inputs = page.locator('input')
    await inputs.nth(0).fill('Test Customer')
    await inputs.nth(1).fill('03001234567')
    // Check the wa.me link appears (check href attribute, don't navigate)
    const link = page.locator('[href*="wa.me"]').first()
    await expect(link).toBeVisible({ timeout: 5000 })
    const href = await link.getAttribute('href')
    expect(href).toContain('wa.me')
    expect(href).toContain('Test+Customer')
  })
})
