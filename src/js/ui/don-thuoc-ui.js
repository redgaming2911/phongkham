/**

* @file don-thuoc-ui.js
  */

import {
hienThiThongBaoThanhCong,
hienThiThongBaoLoi,
hienThiThongBaoCanhBao,
xacNhanThaoTac
} from './thong-bao-ui.js';

let donThuocService;

let bangDonThuoc;
let inputTimKiem;
let selectTrangThai;
let modal;
let modalNoiDung;

/**

* Khởi tạo UI
  */
  export function khoiTaoDonThuocUI({ service }) {
  donThuocService = service;

bangDonThuoc = document.getElementById('ds-don-thuoc');
inputTimKiem = document.getElementById('tim-kiem-don-thuoc');
selectTrangThai = document.getElementById('loc-trang-thai-don');
modal = document.getElementById('modal-don-thuoc');
modalNoiDung = document.getElementById('modal-noi-dung');

inputTimKiem.addEventListener('input', xuLyTimKiemDonThuoc);
selectTrangThai.addEventListener('change', xuLyTimKiemDonThuoc);

document.getElementById('dong-modal')?.addEventListener('click', dongChiTietDonThuoc);

document.addEventListener('cap-nhat-du-lieu', () => {
hienThiDanhSachDonThuoc();
});

hienThiDanhSachDonThuoc();
}

/**

* Render danh sách
  */
  export function hienThiDanhSachDonThuoc(dsInput) {
  let ds = dsInput;

if (!ds) {
ds = donThuocService.layDanhSachDonThuoc();
}

bangDonThuoc.innerHTML = '';

ds.forEach((don) => {
const tr = document.createElement('tr');


const tdMa = document.createElement('td');
tdMa.textContent = don.maDonThuoc;

const tdTrangThai = document.createElement('td');
tdTrangThai.textContent = don.trangThai;

const tdHanhDong = document.createElement('td');

// xem
const btnXem = document.createElement('button');
btnXem.textContent = 'Xem';
btnXem.addEventListener('click', () => {
  hienThiChiTietDonThuoc(don.id);
});

// hủy
const btnHuy = document.createElement('button');
btnHuy.textContent = 'Huy';
btnHuy.addEventListener('click', () => {
  xuLyHuyDonThuoc(don.id);
});

// in
const btnIn = document.createElement('button');
btnIn.textContent = 'In';
btnIn.addEventListener('click', () => {
  hienThiChiTietDonThuoc(don.id);
  xuLyInDonThuoc();
});

tdHanhDong.appendChild(btnXem);
tdHanhDong.appendChild(btnHuy);
tdHanhDong.appendChild(btnIn);

tr.appendChild(tdMa);
tr.appendChild(tdTrangThai);
tr.appendChild(tdHanhDong);

bangDonThuoc.appendChild(tr);


});
}

/**

* Tìm kiếm
  */
  export function xuLyTimKiemDonThuoc() {
  const tuKhoa = inputTimKiem.value;
  const trangThai = selectTrangThai.value;

try {
const ds = donThuocService.timKiemDonThuoc(tuKhoa, trangThai);
hienThiDanhSachDonThuoc(ds);
} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Hiển thị chi tiết
  */
  export function hienThiChiTietDonThuoc(id) {
  try {
  const don = donThuocService.layDonThuocTheoId(id);

  modalNoiDung.innerHTML = '';

  const tieuDe = document.createElement('h3');
  tieuDe.textContent = 'Don thuoc: ' + don.maDonThuoc;

  const bacSi = document.createElement('p');
  bacSi.textContent = 'Bac si: ' + (don.tenBacSi || '');

  const chanDoan = document.createElement('p');
  chanDoan.textContent = 'Chan doan: ' + (don.chanDoan || '');

  const table = document.createElement('table');

  don.danhSachThuoc.forEach((t) => {
  const tr = document.createElement('tr');

  const tdTen = document.createElement('td');
  tdTen.textContent = t.tenThuoc;

  const tdTong = document.createElement('td');
  tdTong.textContent = t.tongSoLuong;

  tr.appendChild(tdTen);
  tr.appendChild(tdTong);

  table.appendChild(tr);
  });

  modalNoiDung.appendChild(tieuDe);
  modalNoiDung.appendChild(bacSi);
  modalNoiDung.appendChild(chanDoan);
  modalNoiDung.appendChild(table);

  modal.classList.remove('an');
  } catch (err) {
  hienThiThongBaoLoi(err.message);
  }
  }

/**

* Hủy đơn
  */
  export function xuLyHuyDonThuoc(id) {
  const ok = xacNhanThaoTac('Ban co chac chan huy don?');
  if (!ok) return;

try {
donThuocService.huyDonThuoc(id);
hienThiThongBaoCanhBao('Da huy don');
hienThiDanhSachDonThuoc();
} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* In đơn
  */
  export function xuLyInDonThuoc() {
  window.print();
  }

/**

* Đóng modal
  */
  export function dongChiTietDonThuoc() {
  modal.classList.add('an');
  }
