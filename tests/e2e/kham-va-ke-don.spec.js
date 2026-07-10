import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
await page.addInitScript(() => localStorage.clear());
await page.goto('/');
});

test.describe('Khám và kê đơn', () => {
test('Luồng chính hoàn chỉnh', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'A');
await page.fill('[data-testid=so-dien-thoai]', '0911111111');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await page.click('[data-testid=btn-bat-dau-kham]');
await expect(page.locator('[data-testid=ten-benh-nhan-kham]')).toContainText('A');

await page.fill('[data-testid=ten-bac-si]', 'BS A');
await page.fill('[data-testid=chan-doan]', 'Cảm');
await page.fill('[data-testid=loi-dan]', 'Uống nước');

await page.fill('[data-testid=ten-thuoc]', 'Paracetamol');
await page.fill('[data-testid=so-luong-moi-lan]', '1');
await page.fill('[data-testid=so-lan-moi-ngay]', '2');
await page.fill('[data-testid=so-ngay-dung]', '3');
await page.click('[data-testid=btn-them-thuoc]');

await expect(page.locator('[data-testid=tong-so-luong]')).toContainText('6');

await page.click('[data-testid=btn-luu-nhap]');
await page.reload();

await page.click('[data-testid=mo-benh-nhan-dang-kham]');
await expect(page.locator('[data-testid=bang-thuoc]')).toBeVisible();

await page.click('[data-testid=btn-hoan-tat]');
await expect(page.locator('[data-testid=thong-bao]')).toBeVisible();


});

test('Không hoàn tất khi thiếu bác sĩ', async ({ page }) => {
await page.click('[data-testid=btn-hoan-tat]');
await expect(page.locator('[data-testid=loi]')).toBeVisible();
});

test('Không thêm thuốc khi số lượng = 0', async ({ page }) => {
await page.fill('[data-testid=ten-thuoc]', 'A');
await page.fill('[data-testid=so-luong-moi-lan]', '0');
await page.click('[data-testid=btn-them-thuoc]');


await expect(page.locator('[data-testid=loi]')).toBeVisible();


});
});
