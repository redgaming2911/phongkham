import { describe, it, expect, beforeEach } from 'vitest';
import { taoKhoLuuTruGia } from '../helpers/kho-luu-tru-gia';

// Giả lập dependency ổn định
const taoId = () => 'id-co-dinh';
const taoMaBenhNhan = () => 'BN-00001';
const layThoiGianHienTai = () => new Date('2024-06-15');

// Repository thật (giả lập đơn giản dùng storage)
function taoBenhNhanRepository(storage) {
const KEY = 'BENH_NHAN';

function layDanhSach() {
const raw = storage.getItem(KEY);
return raw ? JSON.parse(raw) : [];
}

function luu(ds) {
storage.setItem(KEY, JSON.stringify(ds));
}

return {
them(bn) {
const ds = layDanhSach();
ds.push(bn);
luu(ds);
return bn;
},
capNhat(bn) {
const ds = layDanhSach();
const index = ds.findIndex(x => x.id === bn.id);
if (index === -1) return null;
ds[index] = bn;
luu(ds);
return bn;
},
layTheoId(id) {
return layDanhSach().find(x => x.id === id) || null;
},
layDanhSach
};
}

// Service đơn giản để test
function taoBenhNhanService(repo) {
return {
themBenhNhan(data) {
if (!data.hoTen || data.hoTen.trim() === '') {
throw new Error('Họ tên không hợp lệ');
}
return repo.them({
id: taoId(),
ma: taoMaBenhNhan(),
hoTen: data.hoTen.trim(),
trangThai: 'cho_kham',
soDienThoai: data.soDienThoai,
ngaySinh: data.ngaySinh
});
}
};
}

describe('Benh nhan service', () => {
let storage;
let repo;
let service;

beforeEach(() => {
storage = taoKhoLuuTruGia();
repo = taoBenhNhanRepository(storage);
service = taoBenhNhanService(repo);
});

it('Thêm bệnh nhân hợp lệ', () => {
const bn = service.themBenhNhan({
hoTen: 'Nguyen Van A',
soDienThoai: '0912345678',
ngaySinh: '2000-01-01'
});


expect(bn).toBeTruthy();


});

it('Tự sinh id', () => {
const bn = service.themBenhNhan({
hoTen: 'A',
soDienThoai: '0912345678',
ngaySinh: '2000-01-01'
});


expect(bn.id).toBe('id-co-dinh');


});

it('Tự sinh mã bệnh nhân', () => {
const bn = service.themBenhNhan({
hoTen: 'A',
soDienThoai: '0912345678',
ngaySinh: '2000-01-01'
});


expect(bn.ma.startsWith('BN')).toBe(true);


});

it('Tự đặt trạng thái cho_kham', () => {
const bn = service.themBenhNhan({
hoTen: 'A',
soDienThoai: '0912345678',
ngaySinh: '2000-01-01'
});


expect(bn.trangThai).toBe('cho_kham');


});

it('Chuẩn hóa họ tên', () => {
const bn = service.themBenhNhan({
hoTen: '  Nguyen Van A  ',
soDienThoai: '0912345678',
ngaySinh: '2000-01-01'
});


expect(bn.hoTen).toBe('Nguyen Van A');


});

it('Từ chối khi thiếu họ tên', () => {
expect(() =>
service.themBenhNhan({
hoTen: '',
soDienThoai: '091',
ngaySinh: '2000'
})
).toThrow();
});
});
