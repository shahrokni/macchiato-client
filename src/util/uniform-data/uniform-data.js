function uniformUserDetail(userDetail) {

    uniformUserDetail = {

        userName: (userDetail.userName.trim()).toLowerCase(),
        name: (userDetail.name.trim()).toLowerCase(),
        lastName: (userDetail.lastName.trim()).toLowerCase(),
        cellphone: userDetail.cellphone.trim(),
        email: (userDetail.email.trim()).toLowerCase(),
        birthDate: userDetail.birthDate,
        gender: userDetail.gender,
        province: userDetail.province,
        password : userDetail.password,
        studentNumber : userDetail.studentNumber
    };

    if(uniformUserDetail.name){

        uniformUserDetail.name = uniformUserDetail.name[0].toUpperCase() +
        uniformUserDetail.name.substring(1,(uniformUserDetail.name.length));
    }

    if(uniformUserDetail.lastName){

        uniformUserDetail.lastName = uniformUserDetail.lastName[0].toUpperCase() +
        uniformUserDetail.lastName.substring(1,(uniformUserDetail.lastName.length));
    }
    return uniformUserDetail;
}
module.exports.uniformUserDetail = uniformUserDetail;