"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var user_1 = require("./user");
var gender_1 = require("./gender");
var skill_score_1 = require("./skill-score");
var UserDetail = /** @class */ (function (_super) {
    __extends(UserDetail, _super);
    function UserDetail() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.registerationDate = new Date();
        _this.email = "";
        _this.birthDate = new Date();
        _this.gender = gender_1.Gender.notSet;
        _this.cellphone = "";
        _this.skillScore = new skill_score_1.SkillScore;
        return _this;
    }
    return UserDetail;
}(user_1["default"]));
exports.UserDetail = UserDetail;
