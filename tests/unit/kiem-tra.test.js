import { describe, it, expect } from 'vitest';

/**

* Hàm giả lập validation (thuần) để test
  */

function hopLeHoTen(ten) {
if (!ten) return false;
if (typeof ten !== 'string') return false;
return ten.trim().length > 0;
}

function laNgayTuongLai(ngay, ngayHienTai) {
const d = new Date(ngay);
if (isNaN(d)) return false;
return d.getTime() > ngayHienTai.getTime();
}

function hopLeSoDienThoai(sdt) {
if (!sdt) return false;
return /^[0-9]{9,11}$/.test(sdt);
}

function hopLeBenhNhan(bn, ngayHienTai) {
if (!bn) return false;
if (!hopLeHoTen(bn.hoTen)) return false;
if (laNgayTuongLai(bn.ngaySinh, ngayHienTai)) return false;
if (!hopLeSoDienThoai(bn.soDienThoai)) return false;
return true;
}

function hopLeThongTinKham(tt) {
if (!tt) return false;
if (!tt.tenBacSi || tt.tenBacSi.trim() === '') return false;
if (!tt.chanDoan || tt.chanDoan.trim() === '') return false;
return true;
}

function hopLeThuoc(t) {
if (!t) return false;
if (!t.tenThuoc || t.tenThuoc.trim() === '') return false;

if (typeof t.soLuongMoiLan !== 'number' || t.soLuongMoiLan <= 0) return false;
if (typeof t.soLanMoiNgay !== 'number' || t.soLanMoiNgay <= 0) return false;
if (typeof t.soNgayDung !== 'number' || t.soNgayDung <= 0) return false;

return true;
}

describe('Kiểm tra validation dữ liệu', () => {
const ngayHienTai = new Date('2024-06-15');

it('Họ tên rỗng', () => {
// Arrange
const ten = '';


// Act
const kq = hopLeHoTen(ten);

// Assert
expect(kq).toBe(false);


});

it('Họ tên chỉ có khoảng trắng', () => {
// Arrange
const ten = '   ';


// Act
const kq = hopLeHoTen(ten);

// Assert
expect(kq).toBe(false);


});

it('Ngày sinh ở tương lai', () => {
// Arrange
const bn = {
hoTen: 'A',
ngaySinh: '2025-01-01',
soDienThoai: '0912345678'
};


// Act
const kq = hopLeBenhNhan(bn, ngayHienTai);

// Assert
expect(kq).toBe(false);


});

it('Số điện thoại không hợp lệ', () => {
// Arrange
const bn = {
hoTen: 'A',
ngaySinh: '2000-01-01',
soDienThoai: 'abc'
};


// Act
const kq = hopLeBenhNhan(bn, ngayHienTai);

// Assert
expect(kq).toBe(false);


});

it('Bệnh nhân hợp lệ', () => {
// Arrange
const bn = {
hoTen: 'Nguyen Van A',
ngaySinh: '2000-01-01',
soDienThoai: '0912345678'
};

// Act
const kq = hopLeBenhNhan(bn, ngayHienTai);

// Assert
expect(kq).toBe(true);


});

it('Tên bác sĩ rỗng', () => {
// Arrange
const tt = {
tenBacSi: '',
chanDoan: 'Cảm'
};


// Act
const kq = hopLeThongTinKham(tt);

// Assert
expect(kq).toBe(false);


});

it('Chẩn đoán rỗng', () => {
// Arrange
const tt = {
tenBacSi: 'BS A',
chanDoan: ''
};


// Act
const kq = hopLeThongTinKham(tt);

// Assert
expect(kq).toBe(false);


});

it('Tên thuốc rỗng', () => {
// Arrange
const t = {
tenThuoc: '',
soLuongMoiLan: 1,
soLanMoiNgay: 2,
soNgayDung: 3
};


// Act
const kq = hopLeThuoc(t);

// Assert
expect(kq).toBe(false);


});

it('Số lượng mỗi lần bằng 0', () => {
// Arrange
const t = {
tenThuoc: 'Paracetamol',
soLuongMoiLan: 0,
soLanMoiNgay: 2,
soNgayDung: 3
};


// Act
const kq = hopLeThuoc(t);

// Assert
expect(kq).toBe(false);


});

it('Số lần mỗi ngày âm', () => {
// Arrange
const t = {
tenThuoc: 'Paracetamol',
soLuongMoiLan: 1,
soLanMoiNgay: -1,
soNgayDung: 3
};


// Act
const kq = hopLeThuoc(t);

// Assert
expect(kq).toBe(false);


});

it('Số ngày dùng không phải số', () => {
// Arrange
const t = {
tenThuoc: 'Paracetamol',
soLuongMoiLan: 1,
soLanMoiNgay: 2,
soNgayDung: 'abc'
};


// Act
const kq = hopLeThuoc(t);

// Assert
expect(kq).toBe(false);


});

it('Thuốc hợp lệ', () => {
// Arrange
const t = {
tenThuoc: 'Paracetamol',
soLuongMoiLan: 1,
soLanMoiNgay: 2,
soNgayDung: 3
};


// Act
const kq = hopLeThuoc(t);

// Assert
expect(kq).toBe(true);


});

it('Dữ liệu null', () => {
// Act
const kq = hopLeBenhNhan(null, ngayHienTai);

// Assert
expect(kq).toBe(false);


});

it('Dữ liệu undefined', () => {
// Act
const kq = hopLeThuoc(undefined);


// Assert
expect(kq).toBe(false);


});
});
