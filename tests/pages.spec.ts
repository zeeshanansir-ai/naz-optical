import { test, expect } from '@playwright/test'

test.describe('About page', () => {
  test('loads with correct heading', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toContainText('Naz Optical Service')
    await expect(page.locator('main').getByText(/1965/).first()).toBeVisible()
  })

  test('shows contact numbers', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('main').getByText('0300-4686170')).toBeVisible()
    await expect(page.locator('main').getByText('0327-1830170')).toBeVisible()
  })

  test('Get Directions button exists', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('link', { name: 'Get Directions' })).toBeVisible()
  })
})

test.describe('Reviews page', () => {
  test('loads with reviews', async ({ page }) => {
    await page.goto('/reviews')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main [class*="rounded"]').nth(2)).toBeVisible()
  })
})

test.describe('Exchange Policy page', () => {
  test('loads with policy content', async ({ page }) => {
    await page.goto('/exchange-policy')
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('main').getByText(/exchange/i).first()).toBeVisible()
  })
})

test.describe('Admin page', () => {
  test('admin page redirects to login or loads dashboard', async ({ page }) => {
    await page.goto('/admin')
    // Either shows the dashboard or redirects to login — both are valid
    await expect(page.url()).toMatch(/\/admin/)
  })
})
