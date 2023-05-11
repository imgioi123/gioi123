function emailIsValid(email) {
    return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/.test(email)
}

function addNew() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';

        if (document.getElementById('male').checked) {
            gender = document.getElementById('male').value;
        }else if (document.getElementById('female').checked) {
            gender = document.getElementById('female').value;
        }

        if (_.isEmpty(fullname)) {
            fullname = '';
            document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập Họ và tên';
        }else if(fullname.trim().length <= 2) {
            fullname = '';
            document.getElementById('fullname-error').innerHTML = 'Không được nhỏ hơn 2 ký tự';
        }else if(fullname.trim().length > 50) {
            fullname = '';
            document.getElementById('fullname-error').innerHTML = 'Không được lớn hơn 50 ký tự';
        }else {
            document.getElementById('fullname-error').innerHTML = '';
        }

        if (_.isEmpty(email)) {
            email = '';
            document.getElementById('email-error').innerHTML = 'Vui lòng nhập email của bạn';
        }else if (!emailIsValid(email)) {
            email = '';
            document.getElementById('email-error').innerHTML = 'Email không đúng định dạng';
        }else {
            document.getElementById('email-error').innerHTML = '';
        }

        if (_.isEmpty(phone)) {
            phone = '';
            document.getElementById('phone-error').innerHTML = 'Vui lòng nhập số điện thoại';
        }else if (phone.trim().length > 10) {
            phone = '';
            document.getElementById('phone-error').innerHTML = 'Số điện thoại không đúng';
        }else {
            document.getElementById('phone-error').innerHTML = '';
        }

        if (_.isEmpty(address)) {
            address = '';
            document.getElementById('address-error').innerHTML = 'Vui lòng nhập địa chỉ';
        }else {
            document.getElementById('address-error').innerHTML = '';
        }

        if (_.isEmpty(gender)) {
            gender = '';
            document.getElementById('gender-error').innerHTML = 'Vui lòng chọn giới tính';
        }else {
            document.getElementById('gender-error').innerHTML = '';
        }

        if (fullname && email && phone && address && gender) {
            let staffs = localStorage.getItem('staffs') ? JSON.parse(localStorage.getItem('staffs')) : [];

            staffs.push({
                fullname: fullname,
                email: email,
                phone: phone,
                address: address,
                gender: gender,
        }); 

        localStorage.setItem('staffs', JSON.stringify((staffs)));
        this.showListStaff ();
    }
}

function showListStaff() {
    let staffs = localStorage.getItem('staffs') ? JSON.parse(localStorage.getItem('staffs')) : [];
    
    if (staffs.length === 0) {
        document.getElementById('list-staff').style.display = 'none';
        return false;
    }
    document.getElementById('list-staff').style.display = 'block';
    
    let tableStaff = `<tr>
        <td>Stt</td>
        <td>Họ và tên</td>
        <td>Email</td>
        <td>Điện thoại</td>
        <td>Địa chỉ</td>
        <td>Giới tính</td>
        <td>Hiệu chỉnh</td>
    </tr>`;

    staffs.forEach((staff, index) => {
        let staffId = index;
        let genderShow = parseInt(staff.gender) === 1 ? 'Nam' : 'Nữ';
        index++;

        tableStaff += `<tr>
            <td>${index}</td>
            <td>${staff.fullname}</td>
            <td>${staff.email}</td>
            <td>${staff.phone}</td>
            <td>${staff.address}</td>
            <td>${genderShow}</td>
            <td>
                <button onclick="editStaff(${staffId})" class="btn btn-info" >Sửa</button>
                <button onclick="deleteStaff(${staffId})" class="btn btn-danger">Xoá</button>
            </td>
        </tr>`;   
    });
    document.getElementById('display-staffs').innerHTML= tableStaff;
}

function deleteStaff(id) {
    let staffs = localStorage.getItem('staffs') ? JSON.parse(localStorage.getItem('staffs')) : [];
    if (confirm("Bạn có chắc muốn xoá dữ liệu này? (Chú ý: khi thực hiện xoá, dữ liệu sẽ không thể phục hồi")) {
        staffs.splice(id, 1);
    }
    localStorage.setItem('staffs', JSON.stringify(staffs));
    showListStaff();
}

function editStaff(id) {
    let staffs = localStorage.getItem('staffs') ? JSON.parse(localStorage.getItem('staffs')) : [];
    let staff = staffs[id];

    // Đổ dữ liệu của nhân viên vào các trường nhập liệu
    document.getElementById('fullname').value = staff.fullname;
    document.getElementById('email').value = staff.email;
    document.getElementById('phone').value = staff.phone;
    document.getElementById('address').value = staff.address;

    // Chọn giới tính tương ứng
    if (staff.gender === '1') {
        document.getElementById('male').checked = true;
    } else {
        document.getElementById('female').checked = true;
    }

    // Hiển thị form sửa thông tin và ẩn form thêm mới
    document.getElementById('add-form').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';

    // Lưu lại vị trí của nhân viên đang được chỉnh sửa để sử dụng trong hàm updateStaff()
    document.getElementById('edit-staff-id').value = id;
}

function updateStaff() {
    let id = document.getElementById('edit-staff-id').value;
    let staffs = localStorage.getItem('staffs') ? JSON.parse(localStorage.getItem('staffs')) : [];
    let staff = staffs[id];

    // Cập nhật thông tin của nhân viên
    staff.fullname = document.getElementById('fullname').value;
    staff.email = document.getElementById('email').value;
    staff.phone = document.getElementById('phone').value;
    staff.address = document.getElementById('address').value;
    staff.gender = document.querySelector('input[name="gender"]:checked').value;

    // Lưu lại vào localStorage
    localStorage.setItem('staffs', JSON.stringify(staffs));

    // Hiển thị lại danh sách nhân viên
    showListStaff();

    // Ẩn form sửa thông tin và hiện form thêm mới
    document.getElementById('edit-form').style.display = 'none';
    document.getElementById('add-form').style.display = 'block';

    // Xóa giá trị của input lưu vị trí nhân viên đang được chỉnh sửa
    document.getElementById('edit-staff-id').value = '';
}