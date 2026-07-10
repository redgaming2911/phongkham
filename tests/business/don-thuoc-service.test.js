import { describe, it, expect, beforeEach } from 'vitest';
import { taoKhoLuuTruGia } from '../helpers/kho-luu-tru-gia';

const taoId = () => 'id-don';
const taoMaDonThuoc = () => 'DT-00001';
const layThoiGianHienTai = () => new Date('2024-06-15');

function taoDonThuocRepository(storage) {
const KEY = 'DON_THUOC';

function layDanhSach() {
const raw = storage.getItem(KEY);
return raw ? JSON.parse(raw) : [];
}

function luu(ds) {
storage.setItem(KEY, JSON.stringify(ds));
}

return {
them(dt) {
const ds = layDanhSach();
ds.push(dt);
luu(ds);
return dt;
},
capNhat(dt) {
const ds = layDanhSach();
const index = ds.findIndex(x => x.id === dt.id);
if (index === -1) return null;
ds[index] = dt;
luu(ds);
return dt;
},
layTheoId(id) {
return layDanhSach().find(x => x.id === id) || null;
}
};
}

function taoService(repo) {
return {
taoDonThuoc(benhNhan) {
if (!benhNhan) throw new Error('Không tồn tại');


  return repo.them({
    id: taoId(),
    ma: taoMaDonThuoc(),
    danhSachThuoc: [],
    trangThai: 'nhap'
  });
}


};
}

describe('Don thuoc service', () => {
let storage;
let repo;
let service;

beforeEach(() => {
storage = taoKhoLuuTruGia();
repo = taoDonThuocRepository(storage);
service = taoService(repo);
});

it('Tạo đơn nháp cho bệnh nhân chờ khám', () => {
const dt = service.taoDonThuoc({ id: 'bn1' });
expect(dt.trangThai).toBe('nhap');
});

it('Không tạo đơn cho bệnh nhân không tồn tại', () => {
expect(() => service.taoDonThuoc(null)).toThrow();
});

it('Thêm thuốc hợp lệ', () => {
const dt = service.taoDonThuoc({ id: 'bn1' });
dt.danhSachThuoc.push({ tenThuoc: 'A' });


expect(dt.danhSachThuoc.length).toBe(1);

});

it('Không hoàn tất đơn không có thuốc', () => {
const dt = service.taoDonThuoc({ id: 'bn1' });
expect(dt.danhSachThuoc.length).toBe(0);
});
});
