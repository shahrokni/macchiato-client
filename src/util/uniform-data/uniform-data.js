function uniformUserDetail(userDetail) {
    console.log('1');
    console.log(userDetail);
    uniformUserDetailObj = {        
        userName: (!userDetail.userName) ? '' : (userDetail.userName.trim()).toLowerCase(),
        name: (!userDetail.name) ? '' : (userDetail.name.trim()).toLowerCase(),
        lastName: (!userDetail.lastName) ? '' : (userDetail.lastName.trim()).toLowerCase(),
        cellphone: (!userDetail.cellphone) ? '' : userDetail.cellphone.trim(),
        email: (!userDetail.email) ? '' : (userDetail.email.trim()).toLowerCase(),
        birthDate: userDetail.birthDate,
        gender: userDetail.gender,
        province: userDetail.province,
        password: userDetail.password,
        studentNumber: userDetail.studentNumber,
        introducerCode: userDetail.introducerCode
    };

    if (uniformUserDetailObj.name) {

        uniformUserDetailObj.name = uniformUserDetailObj.name[0].toUpperCase() +
            uniformUserDetailObj.name.substring(1, (uniformUserDetailObj.name.length));
    }

    if (uniformUserDetailObj.lastName) {

        uniformUserDetailObj.lastName = uniformUserDetailObj.lastName[0].toUpperCase() +
            uniformUserDetailObj.lastName.substring(1, (uniformUserDetailObj.lastName.length));
    }
    console.log('2');
    console.log(uniformUserDetailObj);
    return uniformUserDetailObj;
}
module.exports.uniformUserDetail = uniformUserDetail;

