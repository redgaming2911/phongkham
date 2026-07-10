/**

* @file don-thuoc-business.js
* @description Logic nghiệp vụ thuần cho đơn thuốc
  */

import { TRANG_THAI_DON_THUOC } from '../constants/hang-so.js';
import { kiemTraThuocTrongDon, kiemTraThongTinKham } from '../utils/kiem-tra.js';

/**

* Tính tổng số lượng thuốc
  */
  export function tinhTongSoLuongThuoc(thuoc) {
  const soLuong =
  Number(thuoc.soLuongMoiLan) *
  Number(thuoc.soLanMoiNgay) *
  Number(thuoc.soNgayDung);

return soLuong > 0 ? soLuong : 0;
}

/**

* Tạo thuốc trong đơn (pure)
  */
  export function taoThuocTrongDon(duLieu, { taoId }) {
  const thuoc = {
  id: taoId(),
  tenThuoc: duLieu.tenThuoc,
  hamLuong: duLieu.hamLuong,
  soLuongMoiLan: Number(duLieu.soLuongMoiLan),
  soLanMoiNgay: Number(duLieu.soLanMoiNgay),
  soNgayDung: Number(duLieu.soNgayDung),
  cachDung: duLieu.cachDung
  };

return {
...thuoc,
tongSoLuong: tinhTongSoLuongThuoc(thuoc)
};
}

/**

* Tạo đơn thuốc mới
  */
  export function taoDonThuocMoi(benhNhanId, thongTinKham, deps) {
  const { taoId, taoMaDonThuoc, layThoiGianHienTai } = deps;

const thoiGian = layThoiGianHienTai();

return {
id: taoId(),
ma: taoMaDonThuoc(thoiGian),
benhNhanId,
thongTinKham: { ...thongTinKham },
danhSachThuoc: [],
trangThai: TRANG_THAI_DON_THUOC.NHAP,
ngayTao: thoiGian
};
}

/**

* Thêm thuốc vào danh sách
  */
  export function themThuocVaoDanhSach(danhSach, thuoc) {
  return [...danhSach, thuoc];
  }

/**

* Xóa thuốc khỏi danh sách
  */
  export function xoaThuocKhoiDanhSach(danhSach, thuocId) {
  return danhSach.filter((t) => t.id !== thuocId);
  }

/**

* Kiểm tra đơn có thể hoàn tất
  */
  export function kiemTraDonThuocCoTheHoanTat(donThuoc) {
  const loi = {};

const kqThongTin = kiemTraThongTinKham(donThuoc.thongTinKham);
if (!kqThongTin.hopLe) {
Object.assign(loi, kqThongTin.loi);
}

if (!donThuoc.danhSachThuoc || donThuoc.danhSachThuoc.length === 0) {
loi.danhSachThuoc = 'Don thuoc phai co it nhat mot thuoc';
}

(donThuoc.danhSachThuoc || []).forEach((t, index) => {
const kq = kiemTraThuocTrongDon(t);
if (!kq.hopLe) {
loi['thuoc_' + index] = Object.values(kq.loi)[0];
}
});

return {
hopLe: Object.keys(loi).length === 0,
loi
};
}

/**

* Có thể sửa đơn
  */
  export function coTheSuaDonThuoc(donThuoc) {
  return donThuoc.trangThai === TRANG_THAI_DON_THUOC.NHAP;
  }

/**

* Có thể hủy đơn
  */
  export function coTheHuyDonThuoc(donThuoc) {
  return donThuoc.trangThai === TRANG_THAI_DON_THUOC.NHAP;
  }

/**

* Tìm kiếm đơn thuốc
  */
  export function timKiemDonThuoc(danhSach, tuKhoa, trangThai) {
  let ketQua = [...danhSach];

if (tuKhoa) {
const keyword = tuKhoa.toLowerCase();
ketQua = ketQua.filter(
(dt) =>
(dt.ma || '').toLowerCase().includes(keyword) ||
(dt.benhNhanId || '').toLowerCase().includes(keyword)
);
}

if (trangThai) {
ketQua = ketQua.filter((dt) => dt.trangThai === trangThai);
}

return ketQua;
}

/**

* Sắp xếp đơn thuốc mới nhất
  */
  export function sapXepDonThuocMoiNhat(danhSach) {
  return [...danhSach].sort(
  (a, b) => new Date(b.ngayTao) - new Date(a.ngayTao)
  );
  }
