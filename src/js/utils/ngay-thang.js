/**

* @file ngay-thang.js
* @description Các hàm tiện ích xử lý ngày tháng an toàn
  */

/**

* Kiểm tra Date hợp lệ
* @param {Date} ngay
* @returns {boolean}
  */
  function laNgayHopLe(ngay) {
  return ngay instanceof Date && !isNaN(ngay.getTime());
  }

/**

* Chuyển input bất kỳ sang Date an toàn
* @param {Date|string|number} giaTri
* @returns {Date|null}
  */
  function chuyenSangDate(giaTri) {
  if (giaTri instanceof Date) {
  return laNgayHopLe(giaTri) ? giaTri : null;
  }

const ngay = new Date(giaTri);
return laNgayHopLe(ngay) ? ngay : null;
}

/**

* Lấy ngày hiện tại
* @param {() => Date} [hamLayThoiGian]
* @returns {Date}
  */
  export function layNgayHienTai(hamLayThoiGian = () => new Date()) {
  const ngay = hamLayThoiGian();
  if (!laNgayHopLe(ngay)) {
  throw new Error('Khong lay duoc ngay hien tai hop le');
  }
  return ngay;
  }

/**

* Định dạng ngày dd/MM/yyyy
* @param {Date|string|number} giaTri
* @returns {string}
  */
  export function dinhDangNgay(giaTri) {
  const ngay = chuyenSangDate(giaTri);
  if (!ngay) return '';

const d = String(ngay.getDate()).padStart(2, '0');
const m = String(ngay.getMonth() + 1).padStart(2, '0');
const y = ngay.getFullYear();

return `${d}/${m}/${y}`;
}

/**

* Định dạng ngày giờ dd/MM/yyyy HH:mm
* @param {Date|string|number} giaTri
* @returns {string}
  */
  export function dinhDangNgayGio(giaTri) {
  const ngay = chuyenSangDate(giaTri);
  if (!ngay) return '';

const ngayStr = dinhDangNgay(ngay);
const h = String(ngay.getHours()).padStart(2, '0');
const p = String(ngay.getMinutes()).padStart(2, '0');

return `${ngayStr} ${h}:${p}`;
}

/**

* Kiểm tra ngày có nằm trong tương lai không
* @param {Date|string|number} giaTri
* @param {Date} [mocSoSanh]
* @returns {boolean}
  */
  export function laNgayTrongTuongLai(giaTri, mocSoSanh = new Date()) {
  const ngay = chuyenSangDate(giaTri);
  const moc = chuyenSangDate(mocSoSanh);

if (!ngay || !moc) return false;

return ngay.getTime() > moc.getTime();
}

/**

* Tính tuổi từ ngày sinh
* @param {Date|string|number} ngaySinh
* @param {Date} [ngayHienTai]
* @returns {number|null}
  */
  export function tinhTuoi(ngaySinh, ngayHienTai = new Date()) {
  const ns = chuyenSangDate(ngaySinh);
  const now = chuyenSangDate(ngayHienTai);

if (!ns || !now) return null;

let tuoi = now.getFullYear() - ns.getFullYear();

const chuaDenSinhNhat =
now.getMonth() < ns.getMonth() ||
(now.getMonth() === ns.getMonth() && now.getDate() < ns.getDate());

if (chuaDenSinhNhat) {
tuoi -= 1;
}

return tuoi >= 0 ? tuoi : null;
}

/**

* Chuyển ngày sang ISO (yyyy-MM-dd)
* @param {Date|string|number} giaTri
* @returns {string}
  */
  export function chuyenNgaySangISO(giaTri) {
  const ngay = chuyenSangDate(giaTri);
  if (!ngay) return '';

const y = ngay.getFullYear();
const m = String(ngay.getMonth() + 1).padStart(2, '0');
const d = String(ngay.getDate()).padStart(2, '0');

return `${y}-${m}-${d}`;
}
