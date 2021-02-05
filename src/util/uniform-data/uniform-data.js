function uniformUserDetail(userDetail) { 
   
    uniformUserDetailObj = {};
    uniformUserDetailObj.userName = (!userDetail.userName) ? '' : (userDetail.userName.trim()).toLowerCase();
    uniformUserDetailObj.name = (!userDetail.name) ? '' : (userDetail.name.trim()).toLowerCase();
    uniformUserDetailObj.lastName = (!userDetail.lastName) ? '' : (userDetail.lastName.trim()).toLowerCase();
    uniformUserDetailObj.cellphone = (!userDetail.cellphone) ? '' : userDetail.cellphone.trim();
    uniformUserDetailObj.email = (!userDetail.email) ? '' : (userDetail.email.trim()).toLowerCase();
    uniformUserDetailObj.birthDate = userDetail.birthDate;
    uniformUserDetailObj.gender = userDetail.gender;
    uniformUserDetailObj.province = userDetail.province;
    uniformUserDetailObj.password = userDetail.password;
    uniformUserDetailObj.studentNumber = userDetail.studentNumber;
    uniformUserDetailObj.introducerCode = userDetail.introducerCode;

    if (uniformUserDetailObj.name) {

        uniformUserDetailObj.name = uniformUserDetailObj.name[0].toUpperCase() +
            uniformUserDetailObj.name.substring(1, (uniformUserDetailObj.name.length));
    }

    if (uniformUserDetailObj.lastName) {

        uniformUserDetailObj.lastName = uniformUserDetailObj.lastName[0].toUpperCase() +
            uniformUserDetailObj.lastName.substring(1, (uniformUserDetailObj.lastName.length));
    }   
    
    return uniformUserDetailObj;
}
module.exports.uniformUserDetail = uniformUserDetail;

