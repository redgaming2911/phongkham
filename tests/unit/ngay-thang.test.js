import { describe, it, expect } from 'vitest';

/**

* Các hàm thuần giả lập để test
* (không phụ thuộc Date.now thật)
  */

function laNgayTuongLai(ngay, ngayHienTai) {
if (!ngay) return false;
const d = new Date(ngay);
if (isNaN(d)) return false;

return d.getTime() > ngayHienTai.getTime();
}

function tinhTuoi(ngaySinh, ngayHienTai) {
const ns = new Date(ngaySinh);
if (isNaN(ns)) return null;

let tuoi = ngayHienTai.getFullYear() - ns.getFullYear();

const chuaSinhNhat =
ngayHienTai.getMonth() < ns.getMonth() ||
(ngayHienTai.getMonth() === ns.getMonth() &&
ngayHienTai.getDate() < ns.getDate());

if (chuaSinhNhat) tuoi--;

return tuoi;
}

function dinhDangNgay(ngay) {
const d = new Date(ngay);
if (isNaN(d)) return '';

const dd = String(d.getDate()).padStart(2, '0');
const mm = String(d.getMonth() + 1).padStart(2, '0');
const yyyy = d.getFullYear();

return `${dd}/${mm}/${yyyy}`;
}

describe('Kiểm tra xử lý ngày tháng', () => {
const ngayHienTai = new Date('2024-06-15');

it('Nhận biết ngày trong tương lai', () => {
// Arrange
const ngay = '2025-01-01';


// Act
const kq = laNgayTuongLai(ngay, ngayHienTai);

// Assert
expect(kq).toBe(true);


});

it('Ngày hiện tại không phải ngày tương lai', () => {
// Arrange
const ngay = '2024-06-15';


// Act
const kq = laNgayTuongLai(ngay, ngayHienTai);

// Assert
expect(kq).toBe(false);


});

it('Tính đúng tuổi trước sinh nhật', () => {
// Arrange
const ngaySinh = '2000-12-20';


// Act
const tuoi = tinhTuoi(ngaySinh, ngayHienTai);

// Assert
expect(tuoi).toBe(23);


});

it('Tính đúng tuổi sau sinh nhật', () => {
// Arrange
const ngaySinh = '2000-01-10';

// Act
const tuoi = tinhTuoi(ngaySinh, ngayHienTai);

// Assert
expect(tuoi).toBe(24);


});

it('Xử lý ngày không hợp lệ', () => {
// Arrange
const ngay = 'abc';


// Act
const tuoi = tinhTuoi(ngay, ngayHienTai);

// Assert
expect(tuoi).toBe(null);


});

it('Định dạng ngày đúng', () => {
// Arrange
const ngay = '2024-01-05';


// Act
const kq = dinhDangNgay(ngay);

// Assert
expect(kq).toBe('05/01/2024');


});

it('Boundary: ngày đúng bằng hiện tại', () => {
// Arrange
const ngay = '2024-06-15';


// Act
const kq = laNgayTuongLai(ngay, ngayHienTai);

// Assert
expect(kq).toBe(false);


});

it('Xử lý null', () => {
// Act
const kq = laNgayTuongLai(null, ngayHienTai);


// Assert
expect(kq).toBe(false);


});

it('Xử lý undefined', () => {
// Act
const kq = laNgayTuongLai(undefined, ngayHienTai);


// Assert
expect(kq).toBe(false);


});

it('Định dạng ngày không hợp lệ trả về chuỗi rỗng', () => {
// Act
const kq = dinhDangNgay('abc');


// Assert
expect(kq).toBe('');


});
});
