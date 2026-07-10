/**

* @file kiem-tra.js
* @description Các hàm kiểm tra dữ liệu đầu vào
  */

/**

* @returns {{hopLe: boolean, loi: Object}}
  */
  function taoKetQua() {
  return { hopLe: true, loi: {} };
  }

/**

* Kiểm tra chuỗi rỗng
* @param {string} giaTri
* @returns {boolean}
  */
  export function laChuoiRong(giaTri) {
  return !giaTri || String(giaTri).trim() === '';
  }

/**

* Chuẩn hóa chuỗi
* @param {string} giaTri
* @returns {string}
  */
  export function chuanHoaChuoi(giaTri) {
  if (giaTri == null) return '';
  return String(giaTri).trim().replace(/\s+/g, ' ');
  }

/**

* Kiểm tra số điện thoại (Việt Nam đơn giản)
* @param {string} so
* @returns {{hopLe: boolean, loi: Object}}
  */
  export function kiemTraSoDienThoai(so) {
  const ketQua = taoKetQua();

const soDaChuanHoa = chuanHoaChuoi(so);

const regex = /^(0|+84)[0-9]{9}$/;

if (laChuoiRong(soDaChuanHoa)) {
ketQua.hopLe = false;
ketQua.loi.soDienThoai = 'So dien thoai khong duoc de trong';
} else if (!regex.test(soDaChuanHoa)) {
ketQua.hopLe = false;
ketQua.loi.soDienThoai = 'So dien thoai khong hop le';
}

return ketQua;
}

/**

* Kiểm tra số dương
* @param {number|string} giaTri
* @param {string} tenTruong
* @returns {{hopLe: boolean, loi: Object}}
  */
  export function kiemTraSoDuong(giaTri, tenTruong = 'giaTri') {
  const ketQua = taoKetQua();

const so = Number(giaTri);

if (isNaN(so) || so <= 0) {
ketQua.hopLe = false;
ketQua.loi[tenTruong] = 'Gia tri phai la so duong';
}

return ketQua;
}

/**

* Kiểm tra dữ liệu bệnh nhân
* @param {Object} benhNhan
* @returns {{hopLe: boolean, loi: Object}}
  */
  export function kiemTraBenhNhan(benhNhan) {
  const ketQua = taoKetQua();

if (!benhNhan) {
return {
hopLe: false,
loi: { chung: 'Du lieu benh nhan khong ton tai' }
};
}

if (laChuoiRong(benhNhan.hoTen)) {
ketQua.hopLe = false;
ketQua.loi.hoTen = 'Ho ten bat buoc';
}

if (laChuoiRong(benhNhan.ngaySinh)) {
ketQua.hopLe = false;
ketQua.loi.ngaySinh = 'Ngay sinh bat buoc';
}

const kqSdt = kiemTraSoDienThoai(benhNhan.soDienThoai);
if (!kqSdt.hopLe) {
ketQua.hopLe = false;
Object.assign(ketQua.loi, kqSdt.loi);
}

return ketQua;
}

/**

* Kiểm tra thuốc trong đơn
* @param {Object} thuoc
* @returns {{hopLe: boolean, loi: Object}}
  */
  export function kiemTraThuocTrongDon(thuoc) {
  const ketQua = taoKetQua();

if (!thuoc) {
return {
hopLe: false,
loi: { chung: 'Thuoc khong ton tai' }
};
}

if (laChuoiRong(thuoc.tenThuoc)) {
ketQua.hopLe = false;
ketQua.loi.tenThuoc = 'Ten thuoc bat buoc';
}

['soLuongMoiLan', 'soLanMoiNgay', 'soNgayDung'].forEach((truong) => {
const kq = kiemTraSoDuong(thuoc[truong], truong);
if (!kq.hopLe) {
ketQua.hopLe = false;
Object.assign(ketQua.loi, kq.loi);
}
});

return ketQua;
}

/**

* Kiểm tra thông tin khám bệnh
* @param {Object} thongTin
* @returns {{hopLe: boolean, loi: Object}}
  */
  export function kiemTraThongTinKham(thongTin) {
  const ketQua = taoKetQua();

if (!thongTin) {
return {
hopLe: false,
loi: { chung: 'Thong tin kham khong ton tai' }
};
}

if (laChuoiRong(thongTin.tenBacSi)) {
ketQua.hopLe = false;
ketQua.loi.tenBacSi = 'Ten bac si bat buoc';
}

if (laChuoiRong(thongTin.chuanDoan)) {
ketQua.hopLe = false;
ketQua.loi.chuanDoan = 'Chan doan bat buoc';
}

return ketQua;
}
