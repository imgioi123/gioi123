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
        let student = []
        student.push({
            fullname: fullname,
            email: email,
            phone: phone,
            address: address,
            gender: gender,
        });

        let tableContent = `< tr > 
        <td > #< /td> 
        <td > Họ và tên < /td>  
        <td > email < /td> 
        <td > điện thoại < /td> 
        <td > giới tính < /td> 
        <td > địa chỉ < /td> 
        <td > hành động < /td>
        /tr>`;

        students.forEach((student, index) => {
            index++;
            tableContent += `< tr > 
            <td > ${index} < /td> 
            <td > ${student.fullname} < /td>  
            <td > ${student.email} < /td> 
            <td > ${student.phone} < /td> 
            <td > ${student.gender} < /td>
            <td > ${student.address} < /td> 
            <td > 
            <a href = '#'> Edit </a> | <a href = '#'> Delete </a> 
            < /td>
            /tr>`;
        })
        document.getElementById('crid-students').innerHTML = tableContent;
    }
}