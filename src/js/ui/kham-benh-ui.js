/**

* @file kham-benh-ui.js
  */

import {
hienThiThongBaoThanhCong,
hienThiThongBaoLoi,
hienThiThongBaoCanhBao,
xacNhanThaoTac
} from './thong-bao-ui.js';

let donThuocService;

let benhNhanDangKham = null;
let donThuocDangXuLy = null;

let khuVucThongTin;
let formKham;
let formThuoc;
let danhSachThuocEl;

/**

* Khởi tạo UI khám bệnh
  */
  export function khoiTaoKhamBenhUI({ service }) {
  donThuocService = service;

khuVucThongTin = document.getElementById('benh-nhan-dang-kham');
formKham = document.getElementById('form-kham-benh');
formThuoc = document.getElementById('form-thuoc');
danhSachThuocEl = document.getElementById('ds-thuoc');

formThuoc.addEventListener('submit', xuLyThemThuoc);

document.getElementById('btn-luu-nhap')?.addEventListener('click', xuLyLuuNhapDonThuoc);
document.getElementById('btn-hoan-tat')?.addEventListener('click', xuLyHoanTatDonThuoc);
document.getElementById('btn-huy-kham')?.addEventListener('click', xuLyHuyKham);

document.addEventListener('chon-benh-nhan-kham', (e) => {
chonBenhNhanDeKham(e.detail);
});
}

/**

* Chọn bệnh nhân để khám
  */
  export function chonBenhNhanDeKham(benhNhan) {
  benhNhanDangKham = benhNhan;

try {
donThuocDangXuLy = donThuocService.taoDonThuocNhap(benhNhan.id, {});
} catch (err) {
hienThiThongBaoLoi(err.message);
return;
}

hienThiBenhNhanDangKham();
hienThiDanhSachThuoc();
}

/**

* Hiển thị bệnh nhân đang khám
  */
  export function hienThiBenhNhanDangKham() {
  if (!benhNhanDangKham) {
  khuVucThongTin.textContent = 'Chua chon benh nhan';
  return;
  }

khuVucThongTin.textContent =
benhNhanDangKham.hoTen + ' - ' + benhNhanDangKham.soDienThoai;
}

/**

* Lấy dữ liệu thuốc từ form
  */
  function layDuLieuThuoc() {
  const data = new FormData(formThuoc);
  return {
  tenThuoc: data.get('tenThuoc'),
  hamLuong: data.get('hamLuong'),
  soLuongMoiLan: Number(data.get('soLuongMoiLan')),
  soLanMoiNgay: Number(data.get('soLanMoiNgay')),
  soNgayDung: Number(data.get('soNgayDung')),
  cachDung: data.get('cachDung')
  };
  }

/**

* Xử lý thêm thuốc
  */
  export function xuLyThemThuoc(e) {
  e.preventDefault();

try {
const thuoc = layDuLieuThuoc();


donThuocDangXuLy = donThuocService.themThuocVaoDon(
  donThuocDangXuLy.id,
  thuoc
);

formThuoc.reset();
hienThiDanhSachThuoc();
hienThiThongBaoThanhCong('Da them thuoc');


} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Hiển thị danh sách thuốc
  */
  export function hienThiDanhSachThuoc() {
  danhSachThuocEl.innerHTML = '';

if (!donThuocDangXuLy || !donThuocDangXuLy.danhSachThuoc) return;

donThuocDangXuLy.danhSachThuoc.forEach((thuoc) => {
const tr = document.createElement('tr');


const tdTen = document.createElement('td');
tdTen.textContent = thuoc.tenThuoc;

const tdTong = document.createElement('td');
tdTong.textContent = thuoc.tongSoLuong;

const tdXoa = document.createElement('td');

const btnXoa = document.createElement('button');
btnXoa.textContent = 'Xoa';
btnXoa.addEventListener('click', () => {
  try {
    donThuocDangXuLy = donThuocService.xoaThuocKhoiDon(
      donThuocDangXuLy.id,
      thuoc.id
    );
    hienThiDanhSachThuoc();
  } catch (err) {
    hienThiThongBaoLoi(err.message);
  }
});

tdXoa.appendChild(btnXoa);

tr.appendChild(tdTen);
tr.appendChild(tdTong);
tr.appendChild(tdXoa);

danhSachThuocEl.appendChild(tr);


});
}

/**

* Lấy thông tin khám
  */
  function layThongTinKham() {
  const data = new FormData(formKham);
  return {
  tenBacSi: data.get('tenBacSi'),
  chanDoan: data.get('chanDoan'),
  ghiChu: data.get('ghiChu')
  };
  }

/**

* Lưu nháp
  */
  export function xuLyLuuNhapDonThuoc() {
  if (!donThuocDangXuLy) return;

try {
const thongTin = layThongTinKham();


donThuocDangXuLy = donThuocService.capNhatThongTinKham(
  donThuocDangXuLy.id,
  thongTin
);

donThuocService.luuNhapDonThuoc(donThuocDangXuLy.id);

hienThiThongBaoThanhCong('Da luu nhap');


} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Hoàn tất đơn
  */
  export function xuLyHoanTatDonThuoc() {
  if (!donThuocDangXuLy) return;

try {
const thongTin = layThongTinKham();


donThuocDangXuLy = donThuocService.capNhatThongTinKham(
  donThuocDangXuLy.id,
  thongTin
);

donThuocService.hoanTatDonThuoc(donThuocDangXuLy.id);

hienThiThongBaoThanhCong('Da hoan tat don thuoc');

// reset
benhNhanDangKham = null;
donThuocDangXuLy = null;

formKham.reset();
formThuoc.reset();
hienThiDanhSachThuoc();
hienThiBenhNhanDangKham();

document.dispatchEvent(new Event('cap-nhat-du-lieu'));


} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Hủy khám
  */
  export function xuLyHuyKham() {
  if (!donThuocDangXuLy) return;

const ok = xacNhanThaoTac('Ban co chac chan huy?');
if (!ok) return;

try {
donThuocService.huyDonThuoc(donThuocDangXuLy.id);


hienThiThongBaoCanhBao('Da huy kham');

benhNhanDangKham = null;
donThuocDangXuLy = null;

formKham.reset();
formThuoc.reset();
hienThiDanhSachThuoc();
hienThiBenhNhanDangKham();

document.dispatchEvent(new Event('cap-nhat-du-lieu'));


} catch (err) {
hienThiThongBaoLoi(err.message);
}
}
