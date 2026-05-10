import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('loads and shows hero section', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Naz Optical/)
    await expect(page.getByRole('link', { name: 'Naz Optical Service' }).first()).toBeVisible()
  })

  test('shows all product category sections', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: 'Premium Sunglasses' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Eyeglasses' })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Women/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Kids Glasses' })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Computer/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Contact Lenses' })).toBeVisible()
  })

  test('trust bar is visible', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Free Delivery').first()).toBeVisible()
  })

  test('FAQ section loads', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Frequently Asked Questions').first()).toBeVisible()
  })
})
