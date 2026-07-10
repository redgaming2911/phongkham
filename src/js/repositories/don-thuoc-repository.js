/**

* @file don-thuoc-repository.js
* @description Repository quản lý dữ liệu đơn thuốc
  */

import { KHOA_LUU_TRU } from '../constants/hang-so.js';

/**

* @param {Object} khoLuuTru
  */
  export function taoDonThuocRepository(khoLuuTru) {
  if (!khoLuuTru) {
  throw new Error('khoLuuTru la bat buoc');
  }

/**

* Lấy toàn bộ đơn thuốc
* @returns {Array}
  */
  function layTatCaDonThuoc() {
  return khoLuuTru.docDanhSach(KHOA_LUU_TRU.DON_THUOC);
  }

/**

* Tìm đơn thuốc theo ID
* @param {string} id
* @returns {Object|null}
  */
  function timDonThuocTheoId(id) {
  if (!id) return null;
  const danhSach = layTatCaDonThuoc();
  return danhSach.find((dt) => dt.id === id) || null;
  }

/**

* Tìm đơn thuốc theo bệnh nhân
* @param {string} benhNhanId
* @returns {Array}
  */
  function timDonThuocTheoBenhNhan(benhNhanId) {
  if (!benhNhanId) return [];
  const danhSach = layTatCaDonThuoc();
  return danhSach.filter((dt) => dt.benhNhanId === benhNhanId);
  }

/**

* Thêm đơn thuốc
* @param {Object} donThuoc
* @returns {Object}
  */
  function themDonThuoc(donThuoc) {
  if (!donThuoc || !donThuoc.id) {
  throw new Error('Du lieu don thuoc khong hop le');
  }


const danhSach = layTatCaDonThuoc();



const daTonTai = danhSach.some((dt) => dt.id === donThuoc.id);
if (daTonTai) {
  throw new Error('Don thuoc da ton tai');
}

danhSach.push(donThuoc);
khoLuuTru.ghiDanhSach(KHOA_LUU_TRU.DON_THUOC, danhSach);

return donThuoc;


}

/**

* Cập nhật đơn thuốc
* @param {string} id
* @param {Object} duLieuMoi
* @returns {Object}
  */
  function capNhatDonThuoc(id, duLieuMoi) {
  if (!id) {
  throw new Error('id la bat buoc');
  }


const danhSach = layTatCaDonThuoc();



const index = danhSach.findIndex((dt) => dt.id === id);

if (index === -1) {
  throw new Error('Khong tim thay don thuoc');
}

const donThuocCapNhat = {
  ...danhSach[index],
  ...duLieuMoi,
  id
};

danhSach[index] = donThuocCapNhat;
khoLuuTru.ghiDanhSach(KHOA_LUU_TRU.DON_THUOC, danhSach);

return donThuocCapNhat;


}

/**

* Xóa đơn thuốc
* @param {string} id
  */
  function xoaDonThuoc(id) {
  if (!id) {
  throw new Error('id la bat buoc');
  }


const danhSach = layTatCaDonThuoc();



const danhSachMoi = danhSach.filter((dt) => dt.id !== id);

if (danhSachMoi.length === danhSach.length) {
  throw new Error('Khong tim thay don thuoc de xoa');
}

khoLuuTru.ghiDanhSach(KHOA_LUU_TRU.DON_THUOC, danhSachMoi);


}

return {
layTatCaDonThuoc,
timDonThuocTheoId,
timDonThuocTheoBenhNhan,
themDonThuoc,
capNhatDonThuoc,
xoaDonThuoc
};
}
