
function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function save() {
    let fullname = document.getElementById('fullname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let gender = '';
    if (document.getElementById('male').checked) {
        gender = document.getElementById('male').value;
    } else if (document.getElementById('famale').checked) {
        gender = document.getElementById('famale').value;
    }

    if (_.isEmpty(fullname)) {
        document.getElementById('fullname-error').innerHTML = 'Vui lòng nhập họ và tên!';


    } else if (fullname.trim().length <= 2) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'không được nhỏ hơn 2 kí tự';
    } else if (fullname.trim().length > 50) {
        fullname = '';
        document.getElementById('fullname-error').innerHTML = 'không được lớn hơn 50 kí tự';
    } else {
        document.getElementById('fullname-error').innerHTML = '';
    }
    if (_.isEmpty(email)) {
        email = '';
        document.getElementById('email-error').innerHTML = 'vui lòng nhập lại email';
    } else if (!emailIsValid(email)) {
        document.getElementById('email-error').innerHTML = 'email không đúng định dạng';
    } else {
        document.getElementById('email-error').innerHTML = '';
    }
    if (_.isEmpty(phone)) {
        phone = '';
        document.getElementById('phone-error').innerHTML = 'vui lòng nhập số điện thoại';
    } else if (phone.trim().length > 10) {
        document.getElementById('phone-error').innerHTML = 'số điện thoại không đúng';
    } else {
        document.getElementById('phone-error').innerHTML = '';
    }
    if (_.isEmpty(address)) {
        address = '';
        document.getElementById('address-error').innerHTML = 'vui lòng nhập địa chỉ ';
    } else {
        document.getElementById('address-error').innerHTML = ' ';
    }
    if (_.isEmpty(gender)) {
        gennder = '';
        document.getElementById('gender-error').innerHTML = 'vui lòng chọn giới tính ';
    } else {
        document.getElementById('gender-error').innerHTML = '';
    }
    if (fullname && email && phone && address && gender) {

        let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];

        students.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });     
        localStorage.setItem('students',JSON.stringify(students))   ;
        this.renderListStudent();
    }
}
function renderListStudent(){
    let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];

    if(students.length === 0){
        document.getElementById('list-student').style.display = 'none';
     return false;
    }

    document.getElementById('list-student').style.display = 'block  ';
      let tableContent = `<tr> 
        <td width ='20'>#</td> 
        <td>Họ và tên</td>  
        <td>email</td> 
        <td>điện thoại</td> 
        <td>giới tính</td> 
        <td>địa chỉ</td> 
        <td>hành động</td></tr>`;

            students.forEach((student, index) => {
           
            let studentId = index;
            let genderLabel = parseInt(student.gender) == 1? 'Nam' : 'Nữ ';
            index++;
            tableContent += `<tr> 
            <td>${index}</td> 
            <td>${student.fullname}</td>  
            <td>${student.email}</td> 
            <td>${student.phone}</td> 
            <td>${genderLabel}</td>
            <td>${student.address}</td> 
            <td> 
            <a href = '#' onclick = 'editStudent(${studentId})'> Edit </a> | <a href = '#' onclick = 'deletestudent(${studentId})'> Delete </a> 
            </td>
            </tr>`;
        })
        document.getElementById('crid-students').innerHTML = tableContent;
    }
    function deletestudent(id){
        let students = localStorage.getItem('students') ?  JSON.parse(localStorage.getItem('students')) : [];
        students.splice(id, 1);
        localStorage.setItem('students',JSON.stringify(students))   ;
        renderListStudent();
       
    }
    function editStudent(id) {
        let students = localStorage.getItem('students') ? JSON.parse(localStorage.getItem('students')) : [];
        let student = students[id];
    
       
        document.getElementById('fullname').value = student.fullname;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('address').value = student.address;
        if (student.gender == 1) {
            document.getElementById('male').checked = true;
        } else if (student.gender == 2) {
            document.getElementById('famale').checked = true;
        }
    
        
        document.getElementById('fullname').readOnly = false;
        document.getElementById('email').readOnly = false;
        document.getElementById('phone').readOnly = false;
        document.getElementById('address').readOnly = false;
        document.getElementById('male').disabled = false;
        document.getElementById('famale').disabled = false;
    
        
        document.getElementsByTagName('button')[0].innerHTML = 'Lưu';
        document.getElementsByTagName('button')[0].onclick = function () {
            
            student.fullname = document.getElementById('fullname').value;
            student.email = document.getElementById('email').value;
            student.phone = document.getElementById('phone').value;
            student.address = document.getElementById('address').value;
            student.gender = document.getElementById('male').checked ? 1 : 2;
            localStorage.setItem('students', JSON.stringify(students));
            
            
            renderListStudent();
    
            
            this.innerHTML = 'Thêm mới';
            this.onclick = save;
    
            
            document.getElementById('fullname').readOnly = true;
            document.getElementById('email').readOnly = true;
            document.getElementById('phone').readOnly = true;
            document.getElementById('address').readOnly = true;
            document.getElementById('male').disabled = true;
            document.getElementById('famale').disabled = true;
        };
    }