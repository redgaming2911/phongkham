import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
await page.addInitScript(() => localStorage.clear());
await page.goto('/');
});

test.describe('Tiếp nhận bệnh nhân', () => {
test('Mở ứng dụng thành công', async ({ page }) => {
await expect(page).toHaveURL('/');
});

test('Thêm bệnh nhân hợp lệ', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'Nguyen Van A');
await page.fill('[data-testid=so-dien-thoai]', '0912345678');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await expect(page.locator('[data-testid=danh-sach-benh-nhan]')).toContainText('Nguyen Van A');


});

test('Hiển thị mã bệnh nhân', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'A');
await page.fill('[data-testid=so-dien-thoai]', '0911111111');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await expect(page.locator('[data-testid=ma-benh-nhan]')).toBeVisible();


});

test('Trạng thái chờ khám', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'B');
await page.fill('[data-testid=so-dien-thoai]', '0922222222');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await expect(page.locator('[data-testid=trang-thai]')).toContainText('cho_kham');


});

test('Từ chối thiếu họ tên', async ({ page }) => {
await page.click('[data-testid=btn-them-benh-nhan]');
await expect(page.locator('[data-testid=loi]')).toBeVisible();
});

test('Từ chối số điện thoại sai', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'A');
await page.fill('[data-testid=so-dien-thoai]', 'abc');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await expect(page.locator('[data-testid=loi]')).toBeVisible();


});

test('Xóa bệnh nhân', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'X');
await page.fill('[data-testid=so-dien-thoai]', '0999999999');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await page.click('[data-testid=btn-xoa]');
await expect(page.locator('[data-testid=danh-sach-benh-nhan]')).not.toContainText('X');


});

test('Dữ liệu tồn tại sau reload', async ({ page }) => {
await page.fill('[data-testid=ho-ten]', 'Persist');
await page.fill('[data-testid=so-dien-thoai]', '0900000000');
await page.fill('[data-testid=ngay-sinh]', '2000-01-01');
await page.click('[data-testid=btn-them-benh-nhan]');


await page.reload();

await expect(page.locator('[data-testid=danh-sach-benh-nhan]')).toContainText('Persist');


});
});
