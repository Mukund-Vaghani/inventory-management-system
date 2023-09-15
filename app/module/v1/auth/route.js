var express = require('express');
var router = express.Router();
var auth = require('./auth_model');
const middleware = require('../../../middleware/middleware');
const multer = require('multer');
var path = require('path');
const { measureMemory } = require('vm');
const { request } = require('http');
const message = require('../../../language/en');

//SIGN UP 
router.post('/signup', function (req, res) {
    var request = req.body;
    // middleware.decryption(req.body, function (request) {
        const rules = {
            name: "required",
            email: "required",
            role: "required",
            password: "required",
        };
        const message = {
            required: req.language.rest_keywords_required_messages,
        };
        if (middleware.checkValidationRules(request, res, rules, message)) {
            auth.addUser(request, function (code, message, data) {
                middleware.sendResponse(req, res, code, message, data);
            });
        };
    // });
});

//LOG IN
router.post('/login', function (req, res) {
    var request = req.body;
    // middleware.decryption(req.body, function (request) {
        const rules = {
            email: "required",
            password: "required"
        };
        const message = {
            required: req.language.rest_keywords_required_messages
        };
        if (middleware.checkValidationRules(request, res, rules, message)) {
            auth.logIn(request, function (code, message, data) {
                middleware.sendResponse(req, res, code, message, data);
            });
        };
    // });
});

//LOG OUT
router.post('/logout', function (req, res) {
    auth.logOut(req, function (code, message, data) {
        middleware.sendResponse(req, res, code, message, data);
    });
});

//USER DETAIL
router.post('/getprofile', function(req,res){
    auth.userDetails(req,function(code,message,data){
        middleware.sendResponse(req,res,code,message,data);
    })
})

// INSERT CATEGORY
router.post('/addcategory', function(req,res){
    var request = req.body;
    var rules = {
        category_name:'required'
    };
    var message = {
        required: req.language.rest_keywords_required_messages
    }
    if(middleware.checkValidationRules(request,res,rules,message)){
        auth.addCategory(request,function(code,message,data){
            middleware.sendResponse(req,res,code,message,data);
        })
    }
})

// CATEGORY LIST
router.post('/categorylist', function(req,res){
    auth.ListCategory(req, function(code,message,data){
        middleware.sendResponse(req,res,code,message,data);
    })
})

// Remove CATEGORY
router.post('/removecategory', function(req,res){
    var request = req.body;
    var rules = {
        category_id:'required'
    };
    var message = {
        required: req.language.rest_keywords_required_messages
    }
    if(middleware.checkValidationRules(request,res,rules,message)){
        auth.removeCategory(request,function(code,message,data){
            middleware.sendResponse(req,res,code,message,data);
        })
    }
})

// CUSTOMER LIST
router.post('/customerlist', function(req,res){
    auth.customerList(req, function(code,message,data){
        middleware.sendResponse(req,res,code,message,data)
    })
})

// SUPPLIER LIST
router.post('/supplierlist', function(req,res){
    auth.supplierList(req, function(code,message,data){
        middleware.sendResponse(req,res,code,message,data)
    })
})

// ADD PRODUCT
router.post('/addproduct', function(req,res){
    var request = req.body
    var rules = {
        product_name:'required',
        price:'required',
        qty:'required',
        category_id:'required'
    }

    var message = {
        required: req.language.rest_keywords_required_messages
    }

    if(middleware.checkValidationRules(request,res,rules,message)){
        auth.addProduct(request,function(code,message,data){
            middleware.sendResponse(req,res,code,message,data);
        })
    }
})

// PRODUCT LIST
router.post('/productlist', function(req,res){
    auth.productList(req, function(code,message,data){
        middleware.sendResponse(req,res,code,message,data)
    })
})

// REMOVE PRODUCT
router.post('/removeproduct', function(req,res){
    var request = req.body;
    var rules = {
        product_id:'required'
    };
    var message = {
        required: req.language.rest_keywords_required_messages
    }
    if(middleware.checkValidationRules(request,res,rules,message)){
        auth.removeProduct(request,function(code,message,data){
            middleware.sendResponse(req,res,code,message,data);
        })
    }
})

// SYSTEM USER LIST
router.post('/systemuserlist', function(req,res){
    auth.systemUserList(req, function(code,message,data){
        middleware.sendResponse(req,res,code,message,data)
    })
})

// DASHBOARD
router.post('/dashboard', function(req,res){
    auth.Dashboard(req, function(code,message,data){
        middleware.sendResponse(req,res,code,message,data)
    })
})












//FORGOT PASSWORD
router.post('/forgotpassword', function (req, response) {
    middleware.decryption(req.body, function (request) {
        // var request = req.body;
        const rules = {
            email: "required|email"
        }
        const message = {
            required: req.language.rest_keywords_required_messages,
            email: req.language.rest_keywords_email_required_message
        };
        if (middleware.checkValidationRules(request, response, rules, message)) {
            auth.forgotPassword(request, function (code, message, data) {
                middleware.sendResponse(req, response, code, message, data);
            });
        };
    });
});
router.get('/reset/:id', function (request, response) {
    var id = request.params.id;
    auth.getUserDetails(id, function (userDetails) {
        if (userDetails) {
            if (userDetails.forgot_password_token == '1') {
                response.render('resetpassform.html', {
                    id
                });
            } else {
                response.render("passwordChanged.html");
            }
        } else {
            response.send('Something Went wrongg!!!');
        };
    });
});
router.post('/resetpass/:id', function (req, response) {
    var id = req.params.id;
    var request = req.body;
    auth.getUserDetails(id, function (details) {
        if (details.forgot_password_token == 0) {
            response.render("passwordChanged.html");
        } else {
            auth.updatePassword(request, id, function (code, message, data) {
                middleware.sendResponse(request, response, code, message, data);
            });
        };
    });
});

//USER PROFILE IMAGE
var storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, 'public/user/');
    },
    filename: function (request, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname))
    },
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: (12 * 1024 * 1024)
    }
}).single('profile_image');

router.post('/profileimage', function (request, response) {
    upload(request, response, function (error) {
        auth.profileImage(request, error, function (code, message, data) {
            middleware.sendResponse(request, response, code, message, data);
        });
    });
});
module.exports = router;