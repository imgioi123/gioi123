class SanPham {
  constructor(ma, ten, gia, hinh) {
    this.maSp = ma;
    this.tenSp = ten;
    this.gia = gia;
    this.hinh = hinh;
  }
}

const SAN_PHAM_KEY = "danhSachSanPham";
class CuaHang {
  constructor(ds) {
    this.sanPhams = ds;
  }

  DocDuLieu() {
    let data = localStorage.getItem(SAN_PHAM_KEY);
    if (data === null) {
      this.sanPhams = [];
      return [];
    } else {
      let objs = JSON.parse(data);
      this.sanPhams = objs;
      return objs;
    }
  }

  GhiDuLieu() {
    localStorage.setItem(SAN_PHAM_KEY, JSON.stringify(this.sanPhams));
  }

  TimTheoMaSP(maCanTim) {
    for (let idx in this.sanPhams) {
      if (this.sanPhams[idx].maSp === maCanTim) {
        return this.sanPhams[idx];
      }
    }

    return null;
  }

  TimTheoTenSP(tenCanTim) {
    for (let idx in this.sanPhams) {
      if (this.sanPhams[idx].tenSp.indexOf(tenCanTim) > -1) {
        return this.sanPhams[idx];
      }
    }

    return null;
  }

  ThemSanPham(sanPhamThem) {
    this.DocDuLieu();

    //check xem sản phẩm đã có trước đó hay chưa, vd dựa vào maSp
    let existedProd = this.TimTheoMaSP(sanPhamThem.maSp);
    if (existedProd === null) {
      this.sanPhams.push(sanPhamThem);
      this.GhiDuLieu();
    }
  }

  CapNhatSanPham(sanPhamCanSua) {
    this.DocDuLieu();

    //check xem sản phẩm đã có trước đó hay chưa, vd dựa vào maSp
    let existedProd = this.TimTheoMaSP(sanPhamCanSua.maSp);
    if (existedProd !== null) {
      //update từng field
      existedProd.tenSp = sanPhamCanSua.tenSp;

      this.GhiDuLieu();
    }
  }

  XoaSanPham(maSP) {
    this.DocDuLieu();

    //check xem sản phẩm đã có trước đó hay chưa, vd dựa vào maSp
    let existedProd = this.TimTheoMaSP(maSP);
    if (existedProd !== null) {
      this.sanPhams.remove(existedProd);
      this.GhiDuLieu();
    }
  }
}
