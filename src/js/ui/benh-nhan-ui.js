/**

* @file benh-nhan-ui.js
  */

import {
hienThiThongBaoThanhCong,
hienThiThongBaoLoi,
hienThiThongBaoCanhBao,
xacNhanThaoTac,
hienThiLoiForm,
xoaLoiForm
} from './thong-bao-ui.js';

let benhNhanService;

let form;
let bangDanhSach;
let inputTimKiem;
let selectTrangThai;

let dangSuaId = null;

/**

* Khởi tạo UI
  */
  export function khoiTaoBenhNhanUI({ service }) {
  benhNhanService = service;

form = document.getElementById('form-benh-nhan');
bangDanhSach = document.getElementById('ds-benh-nhan');
inputTimKiem = document.getElementById('tim-kiem-benh-nhan');
selectTrangThai = document.getElementById('loc-trang-thai');

form.addEventListener('submit', xuLyLuuBenhNhan);
inputTimKiem.addEventListener('input', xuLyTimKiemBenhNhan);
selectTrangThai.addEventListener('change', xuLyTimKiemBenhNhan);

hienThiDanhSachBenhNhan();
}

/**

* Lấy dữ liệu form
  */
  function layDuLieuForm() {
  const data = new FormData(form);
  return {
  hoTen: data.get('hoTen'),
  ngaySinh: data.get('ngaySinh'),
  soDienThoai: data.get('soDienThoai'),
  gioiTinh: data.get('gioiTinh'),
  diaChi: data.get('diaChi')
  };
  }

/**

* Xử lý lưu
  */
  export function xuLyLuuBenhNhan(e) {
  e.preventDefault();

try {
xoaLoiForm(form);
const duLieu = layDuLieuForm();

```
if (dangSuaId) {
  benhNhanService.capNhatBenhNhan(dangSuaId, duLieu);
  hienThiThongBaoThanhCong('Cap nhat benh nhan thanh cong');
} else {
  benhNhanService.themBenhNhan(duLieu);
  hienThiThongBaoThanhCong('Them benh nhan thanh cong');
}

lamMoiFormBenhNhan();
hienThiDanhSachBenhNhan();
```

} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Đổ dữ liệu vào form
  */
  export function dienDuLieuBenhNhanVaoForm(bn) {
  form.hoTen.value = bn.hoTen || '';
  form.ngaySinh.value = bn.ngaySinh || '';
  form.soDienThoai.value = bn.soDienThoai || '';
  form.gioiTinh.value = bn.gioiTinh || '';
  form.diaChi.value = bn.diaChi || '';

dangSuaId = bn.id;
}

/**

* Làm mới form
  */
  export function lamMoiFormBenhNhan() {
  form.reset();
  dangSuaId = null;
  xoaLoiForm(form);
  }

/**

* Xử lý xóa
  */
  export function xuLyXoaBenhNhan(id) {
  const ok = xacNhanThaoTac('Ban co chac chan muon xoa?');
  if (!ok) return;

try {
benhNhanService.xoaBenhNhan(id);
hienThiThongBaoThanhCong('Da xoa benh nhan');
hienThiDanhSachBenhNhan();
} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Xử lý tìm kiếm + lọc
  */
  export function xuLyTimKiemBenhNhan() {
  const tuKhoa = inputTimKiem.value;
  const trangThai = selectTrangThai.value;

try {
const ds = benhNhanService.timKiemBenhNhan(tuKhoa, trangThai);
hienThiDanhSachBenhNhan(ds);
} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Hiển thị badge trạng thái
  */
  function taoBadge(trangThai) {
  const span = document.createElement('span');
  span.className = `badge ${trangThai}`;
  span.textContent = trangThai;
  return span;
  }

/**

* Hiển thị danh sách
  */
  export function hienThiDanhSachBenhNhan(dsInput) {
  let ds = dsInput;

if (!ds) {
ds = benhNhanService.layDanhSachBenhNhan();
}

bangDanhSach.innerHTML = '';

ds.forEach((bn) => {
const tr = document.createElement('tr');


const tdTen = document.createElement('td');
tdTen.textContent = bn.hoTen;

const tdNgaySinh = document.createElement('td');
tdNgaySinh.textContent = bn.ngaySinh;

const tdSdt = document.createElement('td');
tdSdt.textContent = bn.soDienThoai;

const tdTrangThai = document.createElement('td');
tdTrangThai.appendChild(taoBadge(bn.trangThai));

const tdHanhDong = document.createElement('td');

// sửa
const btnSua = document.createElement('button');
btnSua.textContent = 'Sua';
btnSua.addEventListener('click', () => {
  dienDuLieuBenhNhanVaoForm(bn);
});

// xóa
const btnXoa = document.createElement('button');
btnXoa.textContent = 'Xoa';
btnXoa.addEventListener('click', () => {
  xuLyXoaBenhNhan(bn.id);
});

// khám
const btnKham = document.createElement('button');
btnKham.textContent = 'Kham';
btnKham.addEventListener('click', () => {
  try {
    benhNhanService.batDauKham(bn.id);
    hienThiThongBaoThanhCong('Da chuyen sang dang kham');
    hienThiDanhSachBenhNhan();
    document.dispatchEvent(new CustomEvent('chon-benh-nhan-kham', { detail: bn }));
  } catch (err) {
    hienThiThongBaoCanhBao(err.message);
  }
});

tdHanhDong.appendChild(btnSua);
tdHanhDong.appendChild(btnXoa);
tdHanhDong.appendChild(btnKham);

tr.appendChild(tdTen);
tr.appendChild(tdNgaySinh);
tr.appendChild(tdSdt);
tr.appendChild(tdTrangThai);
tr.appendChild(tdHanhDong);

bangDanhSach.appendChild(tr);


});
}
