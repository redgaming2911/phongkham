/**

* @file ma.js
* @description Các hàm tạo mã định danh và mã nghiệp vụ
  */

/**

* Đảm bảo chuỗi có độ dài cố định bằng cách thêm số 0 phía trước
* @param {number|string} giaTri
* @param {number} doDai
* @returns {string}
  */
  function padSo(giaTri, doDai) {
  return String(giaTri).padStart(doDai, '0');
  }

/**

* Chuyển Date sang dạng YYYYMMDD
* @param {Date} ngay
* @returns {string}
  */
  function dinhDangYYYYMMDD(ngay) {
  if (!(ngay instanceof Date) || isNaN(ngay.getTime())) {
  throw new Error('Ngay khong hop le');
  }

const nam = ngay.getFullYear();
const thang = padSo(ngay.getMonth() + 1, 2);
const ngayTrongThang = padSo(ngay.getDate(), 2);

return `${nam}${thang}${ngayTrongThang}`;
}

/**

* Sinh chuỗi số ngẫu nhiên có độ dài cố định
* @param {number} doDai
* @param {() => number} hamRandom
* @returns {string}
  */
  function sinhChuoiNgauNhien(doDai, hamRandom) {
  let ketQua = '';
  for (let i = 0; i < doDai; i++) {
  const so = Math.floor(hamRandom() * 10);
  ketQua += so;
  }
  return ketQua;
  }

/**

* Tạo ID chung (có thể dùng cho nhiều mục đích)
* @param {Object} [tuyChon]
* @param {Date} [tuyChon.thoiGian]
* @param {() => number} [tuyChon.hamRandom]
* @returns {string}
  */
  export function taoId(tuyChon = {}) {
  const {
  thoiGian = new Date(),
  hamRandom = Math.random
  } = tuyChon;

const phanNgay = dinhDangYYYYMMDD(thoiGian);
const phanNgauNhien = sinhChuoiNgauNhien(6, hamRandom);

return `${phanNgay}-${phanNgauNhien}`;
}

/**

* Tạo mã bệnh nhân
* Định dạng: BN-YYYYMMDD-XXXX
* @param {Object} [tuyChon]
* @param {Date} [tuyChon.thoiGian]
* @param {() => number} [tuyChon.hamRandom]
* @returns {string}
  */
  export function taoMaBenhNhan(tuyChon = {}) {
  const {
  thoiGian = new Date(),
  hamRandom = Math.random
  } = tuyChon;

const phanNgay = dinhDangYYYYMMDD(thoiGian);
const phanNgauNhien = sinhChuoiNgauNhien(4, hamRandom);

return `BN-${phanNgay}-${phanNgauNhien}`;
}

/**

* Tạo mã đơn thuốc
* Định dạng: DT-YYYYMMDD-XXXX
* @param {Object} [tuyChon]
* @param {Date} [tuyChon.thoiGian]
* @param {() => number} [tuyChon.hamRandom]
* @returns {string}
  */
  export function taoMaDonThuoc(tuyChon = {}) {
  const {
  thoiGian = new Date(),
  hamRandom = Math.random
  } = tuyChon;

const phanNgay = dinhDangYYYYMMDD(thoiGian);
const phanNgauNhien = sinhChuoiNgauNhien(4, hamRandom);

return `DT-${phanNgay}-${phanNgauNhien}`;
}
