/**

* @file main.js
  */

import { khoiTaoBenhNhanUI } from './ui/benh-nhan-ui.js';
import { khoiTaoKhamBenhUI } from './ui/kham-benh-ui.js';
import { khoiTaoDonThuocUI } from './ui/don-thuoc-ui.js';
import {
hienThiThongBaoLoi,
hienThiThongBaoThanhCong,
xacNhanThaoTac
} from './ui/thong-bao-ui.js';

import { taoBenhNhanService } from './services/benh-nhan-service.js';
import { taoDonThuocService } from './services/don-thuoc-service.js';

/**

* Storage đơn giản (có thể mock khi test)
  */
  function taoLocalStorageRepository(key) {
  return {
  layDanhSach() {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
  },
  luuDanhSach(ds) {
  localStorage.setItem(key, JSON.stringify(ds));
  }
  };
  }

/**

* Utils
  */
  function taoId() {
  return Date.now().toString();
  }

function taoMa(prefix) {
return prefix + '-' + Math.floor(Math.random() * 100000);
}

function layThoiGianHienTai() {
return new Date().toISOString();
}

/**

* Navigation
  */
  function khoiTaoNavigation() {
  const tabs = document.querySelectorAll('[data-tab]');
  const sections = document.querySelectorAll('[data-section]');

tabs.forEach((tab) => {
tab.addEventListener('click', () => {
const target = tab.getAttribute('data-tab');


  sections.forEach((sec) => {
    sec.classList.add('an');
  });

  const el = document.querySelector(`[data-section="${target}"]`);
  if (el) el.classList.remove('an');
});


});

// mặc định
const macDinh = document.querySelector('[data-section="benh-nhan"]');
if (macDinh) macDinh.classList.remove('an');
}

/**

* Khởi tạo toàn bộ app
  */
  function khoiTaoApp() {
  try {
  // 1. Repository
  const benhNhanRepo = taoLocalStorageRepository('benh_nhan');
  const donThuocRepo = taoLocalStorageRepository('don_thuoc');

  // 2. Service
  const benhNhanService = taoBenhNhanService({
  benhNhanRepository: benhNhanRepo,
  donThuocRepository: donThuocRepo,
  taoId,
  taoMaBenhNhan: () => taoMa('BN'),
  layThoiGianHienTai
  });

  const donThuocService = taoDonThuocService({
  donThuocRepository: donThuocRepo,
  benhNhanRepository: benhNhanRepo,
  taoId,
  taoMaDonThuoc: () => taoMa('DT'),
  layThoiGianHienTai
  });

  // 3. UI modules
  khoiTaoBenhNhanUI({ service: benhNhanService });
  khoiTaoKhamBenhUI({ service: donThuocService });
  khoiTaoDonThuocUI({ service: donThuocService });

  // 4. Navigation
  khoiTaoNavigation();

  // 5. Nút tạo dữ liệu mẫu
  document.getElementById('btn-tao-du-lieu')?.addEventListener('click', () => {
  try {
  benhNhanService.taoDuLieuBenhNhanMau();
  hienThiThongBaoThanhCong('Da tao du lieu mau');
  document.dispatchEvent(new Event('cap-nhat-du-lieu'));
  } catch (err) {
  hienThiThongBaoLoi(err.message);
  }
  });

  // 6. Nút xóa dữ liệu
  document.getElementById('btn-xoa-du-lieu')?.addEventListener('click', () => {
  const ok = xacNhanThaoTac('Ban co chac chan xoa toan bo du lieu?');
  if (!ok) return;

  localStorage.clear();
  hienThiThongBaoThanhCong('Da xoa du lieu');
  location.reload();
  });

} catch (err) {
hienThiThongBaoLoi(err.message);
}
}

/**

* Bắt lỗi toàn cục
  */
  window.addEventListener('error', (e) => {
  hienThiThongBaoLoi('Da xay ra loi: ' + e.message);
  });

/**

* Start app
  */
  document.addEventListener('DOMContentLoaded', khoiTaoApp);
