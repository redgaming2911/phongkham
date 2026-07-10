/**

* @file kho-luu-tru.js
* @description Tạo lớp quản lý lưu trữ (localStorage hoặc storage giả)
  */

import { KHOA_LUU_TRU } from '../constants/hang-so.js';

/**

* Parse JSON an toàn
* @param {string|null} chuoi
* @param {*} giaTriMacDinh
* @returns {*}
  */
  function parseJsonAnToan(chuoi, giaTriMacDinh) {
  if (!chuoi) return giaTriMacDinh;

try {
return JSON.parse(chuoi);
} catch (error) {
console.error('Loi parse JSON:', error);
return giaTriMacDinh;
}
}

/**

* Stringify JSON an toàn
* @param {*} duLieu
* @returns {string}
  */
  function stringifyJsonAnToan(duLieu) {
  try {
  return JSON.stringify(duLieu);
  } catch (error) {
  console.error('Loi stringify JSON:', error);
  throw error;
  }
  }

/**

* Factory tạo kho lưu trữ
* @param {Storage} [storage]
* @returns {Object}
  */
  export function taoKhoLuuTru(storage = window.localStorage) {
  if (!storage) {
  throw new Error('Storage khong hop le');
  }

return {
/**
* Đọc danh sách
* @param {string} khoa
* @returns {Array}
*/
docDanhSach(khoa) {
const duLieu = storage.getItem(khoa);
const ketQua = parseJsonAnToan(duLieu, []);
return Array.isArray(ketQua) ? ketQua : [];
},


/**
 * Ghi danh sách
 * @param {string} khoa
 * @param {Array} danhSach
 */
ghiDanhSach(khoa, danhSach) {
  if (!Array.isArray(danhSach)) {
    throw new Error('Danh sach phai la mang');
  }
  storage.setItem(khoa, stringifyJsonAnToan(danhSach));
},

/**
 * Đọc giá trị bất kỳ
 * @param {string} khoa
 * @param {*} giaTriMacDinh
 * @returns {*}
 */
docGiaTri(khoa, giaTriMacDinh = null) {
  const duLieu = storage.getItem(khoa);
  return parseJsonAnToan(duLieu, giaTriMacDinh);
},

/**
 * Ghi giá trị bất kỳ
 * @param {string} khoa
 * @param {*} giaTri
 */
ghiGiaTri(khoa, giaTri) {
  storage.setItem(khoa, stringifyJsonAnToan(giaTri));
},

/**
 * Xóa theo khóa
 * @param {string} khoa
 */
xoaTheoKhoa(khoa) {
  storage.removeItem(khoa);
},

/**
 * Xóa toàn bộ dữ liệu
 */
xoaToanBo() {
  storage.clear();
},

/**
 * Khởi tạo dữ liệu mẫu
 */
khoiTaoDuLieuMau() {
  const benhNhanMau = [
    {
      id: '1',
      ma: 'BN-20240101-0001',
      hoTen: 'Nguyen Van A',
      ngaySinh: '1990-01-01',
      soDienThoai: '0912345678',
      trangThai: 'cho_kham'
    },
    {
      id: '2',
      ma: 'BN-20240101-0002',
      hoTen: 'Tran Thi B',
      ngaySinh: '1985-05-10',
      soDienThoai: '0987654321',
      trangThai: 'dang_kham'
    }
  ];

  const donThuocMau = [];

  this.ghiDanhSach(KHOA_LUU_TRU.BENH_NHAN, benhNhanMau);
  this.ghiDanhSach(KHOA_LUU_TRU.DON_THUOC, donThuocMau);
  this.ghiGiaTri(KHOA_LUU_TRU.PHIEN_BAN_DU_LIEU, 1);
}
};
}
