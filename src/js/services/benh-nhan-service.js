/**

* @file benh-nhan-service.js
* @description Service xử lý nghiệp vụ bệnh nhân
  */

import {
taoBenhNhanMoi,
chuanHoaBenhNhan,
timBenhNhanTrung,
locBenhNhanTheoTuKhoa,
locBenhNhanTheoTrangThai,
sapXepBenhNhanMoiNhat,
coTheXoaBenhNhan,
coTheBatDauKham,
kiemTraNghiepVuBenhNhan
} from '../business/benh-nhan-business.js';

import { TRANG_THAI_BENH_NHAN } from '../constants/hang-so.js';

/**

* Factory tạo service
  */
  export function taoBenhNhanService({
  benhNhanRepository,
  donThuocRepository,
  taoId,
  taoMaBenhNhan,
  layThoiGianHienTai
  }) {
  if (!benhNhanRepository || !donThuocRepository) {
  throw new Error('Thieu repository');
  }

function layDanhSachBenhNhan() {
return sapXepBenhNhanMoiNhat(
benhNhanRepository.layTatCaBenhNhan()
);
}

function layChiTietBenhNhan(id) {
const bn = benhNhanRepository.timBenhNhanTheoId(id);
if (!bn) throw new Error('Khong tim thay benh nhan');
return bn;
}

function themBenhNhan(duLieu) {
const benhNhan = taoBenhNhanMoi(duLieu, {
taoId,
taoMaBenhNhan,
layThoiGianHienTai
});


const kq = kiemTraNghiepVuBenhNhan(benhNhan);
if (!kq.hopLe) {
  const loi = Object.values(kq.loi)[0];
  throw new Error(loi);
}

const danhSach = benhNhanRepository.layTatCaBenhNhan();
if (timBenhNhanTrung(danhSach, benhNhan)) {
  throw new Error('Benh nhan da ton tai');
}

return benhNhanRepository.themBenhNhan(benhNhan);


}

function capNhatBenhNhan(id, duLieu) {
const bnCu = layChiTietBenhNhan(id);


const bnMoi = chuanHoaBenhNhan({
  ...bnCu,
  ...duLieu
});

const kq = kiemTraNghiepVuBenhNhan(bnMoi);
if (!kq.hopLe) {
  const loi = Object.values(kq.loi)[0];
  throw new Error(loi);
}

return benhNhanRepository.capNhatBenhNhan(id, bnMoi);


}

function xoaBenhNhan(id) {
const bn = layChiTietBenhNhan(id);
const donThuoc = donThuocRepository.layTatCaDonThuoc();


if (!coTheXoaBenhNhan(bn, donThuoc)) {
  throw new Error('Khong the xoa benh nhan da co don thuoc hoan tat');
}

benhNhanRepository.xoaBenhNhan(id);


}

function timKiemBenhNhan(tuKhoa, trangThai) {
let danhSach = benhNhanRepository.layTatCaBenhNhan();


danhSach = locBenhNhanTheoTuKhoa(danhSach, tuKhoa);
danhSach = locBenhNhanTheoTrangThai(danhSach, trangThai);

return sapXepBenhNhanMoiNhat(danhSach);


}

function batDauKham(id) {
const bn = layChiTietBenhNhan(id);


if (!coTheBatDauKham(bn)) {
  throw new Error('Benh nhan khong con o trang thai cho kham');
}

return benhNhanRepository.thayDoiTrangThaiBenhNhan(
  id,
  TRANG_THAI_BENH_NHAN.DANG_KHAM
);


}

function duaVeChoKham(id) {
return benhNhanRepository.thayDoiTrangThaiBenhNhan(
id,
TRANG_THAI_BENH_NHAN.CHO_KHAM
);
}

function taoDuLieuBenhNhanMau() {
return [
{
hoTen: 'Nguyen Van A',
ngaySinh: '1990-01-01',
soDienThoai: '0912345678'
},
{
hoTen: 'Tran Thi B',
ngaySinh: '1985-05-10',
soDienThoai: '0987654321'
}
];
}

return {
layDanhSachBenhNhan,
layChiTietBenhNhan,
themBenhNhan,
capNhatBenhNhan,
xoaBenhNhan,
timKiemBenhNhan,
batDauKham,
duaVeChoKham,
taoDuLieuBenhNhanMau
};
}
