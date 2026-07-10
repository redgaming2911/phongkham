/**

* @file benh-nhan-business.js
* @description Logic nghiệp vụ thuần cho bệnh nhân (không phụ thuộc IO)
  */

import { TRANG_THAI_BENH_NHAN, TRANG_THAI_DON_THUOC } from '../constants/hang-so.js';
import { chuanHoaChuoi, kiemTraBenhNhan } from '../utils/kiem-tra.js';
import { laNgayTrongTuongLai } from '../utils/ngay-thang.js';

/**

* Tạo bệnh nhân mới (pure)
  */
  export function taoBenhNhanMoi(duLieu, { taoId, taoMaBenhNhan, layThoiGianHienTai }) {
  const thoiGian = layThoiGianHienTai();

const benhNhan = {
id: taoId(),
ma: taoMaBenhNhan(thoiGian),
hoTen: chuanHoaChuoi(duLieu.hoTen),
ngaySinh: duLieu.ngaySinh,
soDienThoai: duLieu.soDienThoai,
trangThai: TRANG_THAI_BENH_NHAN.CHO_KHAM,
ngayTao: thoiGian
};

return benhNhan;
}

/**

* Chuẩn hóa dữ liệu bệnh nhân
  */
  export function chuanHoaBenhNhan(benhNhan) {
  return {
  ...benhNhan,
  hoTen: chuanHoaChuoi(benhNhan.hoTen)
  };
  }

/**

* Tìm bệnh nhân trùng
  */
  export function timBenhNhanTrung(danhSach, benhNhanMoi) {
  return danhSach.find(
  (bn) =>
  bn.soDienThoai === benhNhanMoi.soDienThoai &&
  bn.ngaySinh === benhNhanMoi.ngaySinh
  );
  }

/**

* Lọc theo từ khóa
  */
  export function locBenhNhanTheoTuKhoa(danhSach, tuKhoa) {
  if (!tuKhoa) return danhSach;

const keyword = tuKhoa.toLowerCase();

return danhSach.filter(
(bn) =>
(bn.hoTen || '').toLowerCase().includes(keyword) ||
(bn.soDienThoai || '').includes(keyword)
);
}

/**

* Lọc theo trạng thái
  */
  export function locBenhNhanTheoTrangThai(danhSach, trangThai) {
  if (!trangThai) return danhSach;
  return danhSach.filter((bn) => bn.trangThai === trangThai);
  }

/**

* Sắp xếp mới nhất
  */
  export function sapXepBenhNhanMoiNhat(danhSach) {
  return [...danhSach].sort(
  (a, b) => new Date(b.ngayTao) - new Date(a.ngayTao)
  );
  }

/**

* Kiểm tra có thể xóa
  */
  export function coTheXoaBenhNhan(benhNhan, danhSachDonThuoc) {
  const coDonHoanTat = danhSachDonThuoc.some(
  (dt) =>
  dt.benhNhanId === benhNhan.id &&
  dt.trangThai === TRANG_THAI_DON_THUOC.DA_HOAN_TAT
  );

return !coDonHoanTat;
}

/**

* Kiểm tra có thể bắt đầu khám
  */
  export function coTheBatDauKham(benhNhan) {
  return benhNhan.trangThai === TRANG_THAI_BENH_NHAN.CHO_KHAM;
  }

/**

* Kiểm tra có thể lập đơn
  */
  export function coTheLapDonThuoc(benhNhan) {
  return (
  benhNhan.trangThai === TRANG_THAI_BENH_NHAN.CHO_KHAM ||
  benhNhan.trangThai === TRANG_THAI_BENH_NHAN.DANG_KHAM
  );
  }

/**

* Validate nghiệp vụ
  */
  export function kiemTraNghiepVuBenhNhan(benhNhan) {
  const kq = kiemTraBenhNhan(benhNhan);

if (!kq.hopLe) return kq;

if (laNgayTrongTuongLai(benhNhan.ngaySinh)) {
return {
hopLe: false,
loi: { ngaySinh: 'Ngay sinh khong duoc lon hon ngay hien tai' }
};
}

return kq;
}
