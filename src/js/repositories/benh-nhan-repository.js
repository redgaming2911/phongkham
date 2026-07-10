/**

* @file benh-nhan-repository.js
* @description Repository quản lý dữ liệu bệnh nhân
  */

import { KHOA_LUU_TRU } from '../constants/hang-so.js';

/**

* @param {Object} khoLuuTru
  */
  export function taoBenhNhanRepository(khoLuuTru) {
  if (!khoLuuTru) {
  throw new Error('khoLuuTru la bat buoc');
  }

/**

* Lấy toàn bộ bệnh nhân
* @returns {Array}
  */
  function layTatCaBenhNhan() {
  return khoLuuTru.docDanhSach(KHOA_LUU_TRU.BENH_NHAN);
  }

/**

* Tìm bệnh nhân theo ID
* @param {string} id
* @returns {Object|null}
  */
  function timBenhNhanTheoId(id) {
  if (!id) return null;
  const danhSach = layTatCaBenhNhan();
  return danhSach.find((bn) => bn.id === id) || null;
  }

/**

* Thêm bệnh nhân
* @param {Object} benhNhan
* @returns {Object}
  */
  function themBenhNhan(benhNhan) {
  if (!benhNhan || !benhNhan.id) {
  throw new Error('Du lieu benh nhan khong hop le');
  }

```
const danhSach = layTatCaBenhNhan();
```

```
const daTonTai = danhSach.some((bn) => bn.id === benhNhan.id);
if (daTonTai) {
  throw new Error('Benh nhan da ton tai');
}

danhSach.push(benhNhan);
khoLuuTru.ghiDanhSach(KHOA_LUU_TRU.BENH_NHAN, danhSach);

return benhNhan;
```

}

/**

* Cập nhật bệnh nhân
* @param {string} id
* @param {Object} duLieuMoi
* @returns {Object}
  */
  function capNhatBenhNhan(id, duLieuMoi) {
  if (!id) {
  throw new Error('id la bat buoc');
  }

const danhSach = layTatCaBenhNhan();



const index = danhSach.findIndex((bn) => bn.id === id);

if (index === -1) {
  throw new Error('Khong tim thay benh nhan');
}

const benhNhanCapNhat = {
  ...danhSach[index],
  ...duLieuMoi,
  id // đảm bảo không bị ghi đè id
};

danhSach[index] = benhNhanCapNhat;
khoLuuTru.ghiDanhSach(KHOA_LUU_TRU.BENH_NHAN, danhSach);

return benhNhanCapNhat;


}

/**

* Xóa bệnh nhân
* @param {string} id
  */
  function xoaBenhNhan(id) {
  if (!id) {
  throw new Error('id la bat buoc');
  }


const danhSach = layTatCaBenhNhan();

const danhSachMoi = danhSach.filter((bn) => bn.id !== id);

if (danhSachMoi.length === danhSach.length) {
  throw new Error('Khong tim thay benh nhan de xoa');
}

khoLuuTru.ghiDanhSach(KHOA_LUU_TRU.BENH_NHAN, danhSachMoi);


}

/**

* Thay đổi trạng thái bệnh nhân
* @param {string} id
* @param {string} trangThai
* @returns {Object}
  */
  function thayDoiTrangThaiBenhNhan(id, trangThai) {
  if (!id) {
  throw new Error('id la bat buoc');
  }


return capNhatBenhNhan(id, { trangThai });


}

return {
layTatCaBenhNhan,
timBenhNhanTheoId,
themBenhNhan,
capNhatBenhNhan,
xoaBenhNhan,
thayDoiTrangThaiBenhNhan
};
}
