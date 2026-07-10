/**

* @file thong-bao-ui.js
* @description Quản lý hiển thị thông báo và lỗi form
  */

const THOI_GIAN_MAC_DINH = 3000;

/**

* Lấy container thông báo
  */
  function layContainerThongBao() {
  return document.getElementById('thong-bao');
  }

/**

* Tạo phần tử thông báo
  */
  function taoPhanTuThongBao(noiDung, loai) {
  const el = document.createElement('div');
  el.className = `thong-bao ${loai}`;
  el.textContent = noiDung;
  return el;
  }

/**

* Hiển thị thông báo
  */
  function hienThiThongBao(noiDung, loai = 'thanh-cong', thoiGian = THOI_GIAN_MAC_DINH) {
  const container = layContainerThongBao();
  if (!container) return;

const el = taoPhanTuThongBao(noiDung, loai);
container.appendChild(el);

setTimeout(() => {
el.remove();
}, thoiGian);
}

/**

* Hiển thị thành công
  */
  export function hienThiThongBaoThanhCong(noiDung) {
  hienThiThongBao(noiDung, 'thanh-cong');
  }

/**

* Hiển thị lỗi
  */
  export function hienThiThongBaoLoi(noiDung) {
  hienThiThongBao(noiDung, 'loi');
  }

/**

* Hiển thị cảnh báo
  */
  export function hienThiThongBaoCanhBao(noiDung) {
  hienThiThongBao(noiDung, 'canh-bao');
  }

/**

* Xóa toàn bộ thông báo
  */
  export function xoaThongBao() {
  const container = layContainerThongBao();
  if (!container) return;
  container.innerHTML = '';
  }

/**

* Hiển thị lỗi form
  */
  export function hienThiLoiForm(form, loiObj) {
  if (!form || !loiObj) return;

Object.keys(loiObj).forEach((tenTruong) => {
const input = form.querySelector(`[name="${tenTruong}"]`);
if (!input) return;

```
let span = input.parentElement.querySelector('.loi');

if (!span) {
  span = document.createElement('span');
  span.className = 'loi';
  input.parentElement.appendChild(span);
}

span.textContent = loiObj[tenTruong];
```

});
}

/**

* Xóa lỗi form
  */
  export function xoaLoiForm(form) {
  if (!form) return;

const loiEls = form.querySelectorAll('.loi');
loiEls.forEach((el) => el.remove());
}

/**

* Xác nhận thao tác
  */
  export function xacNhanThaoTac(thongDiep = 'Ban co chac chan?') {
  return window.confirm(thongDiep);
  }
