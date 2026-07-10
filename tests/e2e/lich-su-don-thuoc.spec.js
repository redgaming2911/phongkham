import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
await page.addInitScript(() => localStorage.clear());
await page.goto('/');
});

test.describe('Lịch sử đơn thuốc', () => {
test('Tạo và xem đơn thuốc', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'A');
await page.fill('[data-testid=so-dien-thoai]', '0911111111');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await page.click('[data-testid=btn-bat-dau-kham]');
await page.fill('[data-testid=ten-bac-si]', 'BS A');
await page.fill('[data-testid=chan-doan]', 'Cảm');

await page.fill('[data-testid=ten-thuoc]', 'T1');
await page.fill('[data-testid=so-luong-moi-lan]', '1');
await page.fill('[data-testid=so-lan-moi-ngay]', '1');
await page.fill('[data-testid=so-ngay-dung]', '1');
await page.click('[data-testid=btn-them-thuoc]');

await page.click('[data-testid=btn-hoan-tat]');

await page.click('[data-testid=tab-lich-su]');
await expect(page.locator('[data-testid=danh-sach-don]')).toContainText('A');

await page.click('[data-testid=btn-xem-chi-tiet]');
await expect(page.locator('[data-testid=chi-tiet]')).toBeVisible();

await page.evaluate(() => {
  window.print = () => window.__printed = true;
});

await page.click('[data-testid=btn-in]');
const printed = await page.evaluate(() => window.__printed === true);
expect(printed).toBe(true);


});
});
