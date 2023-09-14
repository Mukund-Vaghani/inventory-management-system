var con = require('../../../config/database');
var common = require('../../../config/common');
var template = require('../../../config/template');
var global = require('../../../config/constant');
var middleware = require('../../../middleware/middleware');

var auth = {
    addUser: function (req, callback) {
        auth.checkEmail(req, function (isExist) {
            if (isExist) {
                callback('0', 'rest_keywords_unique_email', null)
            } else {
                var insertObject = {
                    name: req.name,
                    email: req.email,
                    role: req.role,
                    password: req.password,
                };
                var sql = `INSERT INTO tbl_user SET ?`;
                con.query(sql, [insertObject], function (error, result) {
                    if (!error) {
                        var id = result.insertId;
                        common.checkeUpdateToken(id, req, function (token) {
                            auth.getUserDetails(id, function (userDetails) {
                                if (userDetails != null) {
                                    callback('1', 'rest_keywords_sign_up', userDetails);
                                } else {
                                    callback('0', 'rest_keywords_data_not_found', null);
                                };
                            });
                        });
                    } else {
                        callback('0', 'rest_keywords_something_wrong', error);
                    };
                });
            };
        });
    },

    checkEmail: function (req, callback) {
        var sql = `SELECT * FROM tbl_user WHERE email = ? AND status='active'`;
        con.query(sql, [req.email], function (error, result) {
            if (!error && result.length > 0) {
                callback(true);
            } else {
                callback(false);
            };
        });
    },

    getUserDetails: function (id, callback) {
        var sql = `SELECT tu.*,IFNULL(di.token,'') as tokens FROM tbl_user tu LEFT JOIN tbl_user_deviceinfo di ON tu.id = di.user_id WHERE tu.id = ? AND tu.status = 'active'`;
        con.query(sql, [id], function (error, result) {
            if (!error && result.length > 0) {
                callback(result[0]);
            } else {
                callback(null);
            };
        });
    },

    logIn: function (req, callback) {
        auth.checkEmail(req, function (isExist) {
            if (isExist) {
                var sql = `SELECT * FROM tbl_user WHERE email = ? AND status = 'active'`;
                con.query(sql, [req.email], function (error, result) {
                    if (!error && result.length > 0) {
                        if (result[0].password = req.password) {
                            common.checkeUpdateToken(result[0].id, req, function (token) {
                                auth.getUserDetails(result[0].id, function (userDetails) {
                                    callback('1', 'rest_keywords_loggedin', userDetails);
                                });
                            });
                        } else {
                            callback('0', 'rest_keywords_wrong_password', null);
                        };
                    } else {
                        callback('0', 'rest_keywords_wrong_email', null);
                    };
                });
            } else {
                callback('0', 'rest_keywords_not_signup', null);
            };
        });
    },

    logOut: function(req, callback){
        con.query(`UPDATE tbl_user_deviceinfo SET token = '' WHERE user_id = ${req.user_id}`,function(err, result){
            if (!err) {
                callback('1','rest_keywords_logout', null);
            } else {
                callback('0','rest_keywords_nodata', null);
            };
        });
    },

    userDetails: function(req,callback){
        con.query(`SELECT * FROM tbl_user WHERE id = ${req.user_id} AND status='active'`, function(err,result){
            if(!err){
                callback('1','rest_success',result[0])
            }else{
                callback('0','rest_keywords_nodata',null);
            }
        })
    },

    addCategory: function(request,callback){
        const catObj = {
            category_name:request.category_name
        }

        con.query(`INSERT INTO tbl_category SET ?`,catObj, function(error,result){
            if(!error){
                const id = result.insertId;
                con.query(`SELECT * FROM tbl_category WHERE id = ${id}`, function(err,res){
                    if(!err){
                        callback('1','rest_success',res[0]);
                    }else{
                        callback('0',"rest_keywords_something_wrong",null);
                    }
                })
            }else{
                callback('0','rest_keywords_something_wrong',null)
            }
        })
    },

    ListCategory: function(req,callback){
        con.query(`SELECT * FROM tbl_category WHERE is_active = '1' AND is_deleted = '0'`, function(err,res){
            if(!err){
                callback('1','rest_success',res);
            }else{
                callback('0',"rest_keywords_something_wrong",null);
            }
        })
    },

    removeCategory: function(request,callback){
        con.query(`delete from tbl_category where id = ${request.category_id}`, function(err,res){
            if(!err){
                callback('1','rest_success',res);
            }else{
                callback('0',"rest_keywords_something_wrong",null);
            }
        })
    }
};
module.exports = auth;