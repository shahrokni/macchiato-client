function uniformUserDetail(userDetail) {

    uniformUserDetailObj = {

        userName: (userDetail.userName.trim()).toLowerCase(),
        name: (userDetail.name.trim()).toLowerCase(),
        lastName: (userDetail.lastName.trim()).toLowerCase(),
        cellphone: userDetail.cellphone.trim(),
        email: (userDetail.email.trim()).toLowerCase(),
        birthDate: userDetail.birthDate,
        gender: userDetail.gender,
        province: userDetail.province,
        password : userDetail.password,
        studentNumber : userDetail.studentNumber,
        introducerCode: userDetail.introducerCode
    };

    if(uniformUserDetailObj.name){

        uniformUserDetailObj.name = uniformUserDetailObj.name[0].toUpperCase() +
        uniformUserDetailObj.name.substring(1,(uniformUserDetailObj.name.length));
    }

    if(uniformUserDetailObj.lastName){

        uniformUserDetailObj.lastName = uniformUserDetailObj.lastName[0].toUpperCase() +
        uniformUserDetailObj.lastName.substring(1,(uniformUserDetailObj.lastName.length));
    }
    return uniformUserDetailObj;
}
module.exports.uniformUserDetail = uniformUserDetail;

