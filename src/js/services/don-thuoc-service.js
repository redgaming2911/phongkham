/**

* @file don-thuoc-service.js
* @description Service xử lý đơn thuốc
  */

import {
taoDonThuocMoi,
taoThuocTrongDon,
themThuocVaoDanhSach,
xoaThuocKhoiDanhSach,
kiemTraDonThuocCoTheHoanTat,
coTheSuaDonThuoc,
coTheHuyDonThuoc,
timKiemDonThuoc,
sapXepDonThuocMoiNhat
} from '../business/don-thuoc-business.js';

import {
TRANG_THAI_DON_THUOC,
TRANG_THAI_BENH_NHAN
} from '../constants/hang-so.js';

/**

* Factory
  */
  export function taoDonThuocService({
  donThuocRepository,
  benhNhanRepository,
  taoId,
  taoMaDonThuoc,
  layThoiGianHienTai
  }) {
  if (!donThuocRepository || !benhNhanRepository) {
  throw new Error('Thieu repository');
  }

function layDanhSachDonThuoc() {
return sapXepDonThuocMoiNhat(
donThuocRepository.layTatCaDonThuoc()
);
}

function layDonThuocTheoId(id) {
const dt = donThuocRepository.timDonThuocTheoId(id);
if (!dt) throw new Error('Khong tim thay don thuoc');
return dt;
}

function taoDonThuocNhap(benhNhanId, thongTinKham = {}) {
const bn = benhNhanRepository.timBenhNhanTheoId(benhNhanId);
if (!bn) throw new Error('Benh nhan khong ton tai');

if (
  bn.trangThai !== TRANG_THAI_BENH_NHAN.CHO_KHAM &&
  bn.trangThai !== TRANG_THAI_BENH_NHAN.DANG_KHAM
) {
  throw new Error('Benh nhan khong hop le de tao don thuoc');
}

const donThuoc = taoDonThuocMoi(
  benhNhanId,
  thongTinKham,
  { taoId, taoMaDonThuoc, layThoiGianHienTai }
);

const ketQua = donThuocRepository.themDonThuoc(donThuoc);

// chuyển trạng thái bệnh nhân
benhNhanRepository.thayDoiTrangThaiBenhNhan(
  benhNhanId,
  TRANG_THAI_BENH_NHAN.DANG_KHAM
);

return ketQua;


}

function themThuocVaoDon(donThuocId, duLieuThuoc) {
const dt = layDonThuocTheoId(donThuocId);


if (!coTheSuaDonThuoc(dt)) {
  throw new Error('Khong the sua don thuoc');
}

const thuoc = taoThuocTrongDon(duLieuThuoc, { taoId });

const danhSachMoi = themThuocVaoDanhSach(
  dt.danhSachThuoc,
  thuoc
);

return donThuocRepository.capNhatDonThuoc(donThuocId, {
  danhSachThuoc: danhSachMoi
});


}

function xoaThuocKhoiDon(donThuocId, thuocId) {
const dt = layDonThuocTheoId(donThuocId);


if (!coTheSuaDonThuoc(dt)) {
  throw new Error('Khong the sua don thuoc');
}

const danhSachMoi = xoaThuocKhoiDanhSach(
  dt.danhSachThuoc,
  thuocId
);

return donThuocRepository.capNhatDonThuoc(donThuocId, {
  danhSachThuoc: danhSachMoi
});


}

function capNhatThongTinKham(donThuocId, thongTinKham) {
const dt = layDonThuocTheoId(donThuocId);

if (!coTheSuaDonThuoc(dt)) {
  throw new Error('Khong the sua don thuoc');
}

return donThuocRepository.capNhatDonThuoc(donThuocId, {
  thongTinKham: {
    ...dt.thongTinKham,
    ...thongTinKham
  }
});


}

function luuNhapDonThuoc(donThuocId) {
return layDonThuocTheoId(donThuocId);
}

function hoanTatDonThuoc(donThuocId) {
const dt = layDonThuocTheoId(donThuocId);

if (!coTheSuaDonThuoc(dt)) {
  throw new Error('Khong the hoan tat don thuoc');
}

const kq = kiemTraDonThuocCoTheHoanTat(dt);
if (!kq.hopLe) {
  const loi = Object.values(kq.loi)[0];
  throw new Error(loi);
}

const donMoi = donThuocRepository.capNhatDonThuoc(
  donThuocId,
  { trangThai: TRANG_THAI_DON_THUOC.DA_HOAN_TAT }
);

benhNhanRepository.thayDoiTrangThaiBenhNhan(
  dt.benhNhanId,
  TRANG_THAI_BENH_NHAN.DA_KHAM
);

return donMoi;


}

function huyDonThuoc(donThuocId) {
const dt = layDonThuocTheoId(donThuocId);

if (!coTheHuyDonThuoc(dt)) {
  throw new Error('Khong the huy don thuoc');
}

const donMoi = donThuocRepository.capNhatDonThuoc(
  donThuocId,
  { trangThai: TRANG_THAI_DON_THUOC.DA_HUY }
);

benhNhanRepository.thayDoiTrangThaiBenhNhan(
  dt.benhNhanId,
  TRANG_THAI_BENH_NHAN.CHO_KHAM
);

return donMoi;


}

function timKiemDonThuocService(tuKhoa, trangThai) {
const danhSach = donThuocRepository.layTatCaDonThuoc();


return sapXepDonThuocMoiNhat(
  timKiemDonThuoc(danhSach, tuKhoa, trangThai)
);


}

return {
taoDonThuocNhap,
layDonThuocTheoId,
layDanhSachDonThuoc,
themThuocVaoDon,
xoaThuocKhoiDon,
capNhatThongTinKham,
luuNhapDonThuoc,
hoanTatDonThuoc,
huyDonThuoc,
timKiemDonThuoc: timKiemDonThuocService
};
}
