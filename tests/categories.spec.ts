import { test, expect } from '@playwright/test'

const CATEGORIES = [
  { value: 'men',        label: 'Men Glasses'      },
  { value: 'women',      label: 'Women Glasses'    },
  { value: 'kids',       label: 'Kids Glasses'     },
  { value: 'sunglasses', label: 'Sunglasses'       },
  { value: 'computer',   label: 'Computer Glasses' },
  { value: 'contact',    label: 'Contact Lenses'   },
]

for (const cat of CATEGORIES) {
  test(`category: ${cat.label} shows products`, async ({ page }) => {
    await page.goto(`/?category=${cat.value}`)
    // Active filter pill should be highlighted
    await expect(page.locator(`text=${cat.label}`).first()).toBeVisible()
    // At least one product card should appear
    await expect(page.locator('[class*="ProductCard"], .group').first()).toBeVisible({ timeout: 10000 })
  })
}

test('filter bar shows correct product count', async ({ page }) => {
  await page.goto('/?category=sunglasses')
  await expect(page.locator('text=/\\d+ products?/')).toBeVisible({ timeout: 10000 })
})

test('search by brand works', async ({ page }) => {
  await page.goto('/?q=Ray+Ban')
  // Should show Ray Ban products
  await expect(page.locator('text=Ray Ban').first()).toBeVisible({ timeout: 10000 })
})

test('search by brand + category works', async ({ page }) => {
  await page.goto('/?category=sunglasses&q=Gucci')
  await expect(page.locator('text=Gucci').first()).toBeVisible({ timeout: 10000 })
})
