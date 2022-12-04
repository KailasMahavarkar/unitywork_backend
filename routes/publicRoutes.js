const express = require('express');
const userRegister = require("../controllers/auth/userRegister");
const userLogin = require("../controllers/auth/userLogin");
const mailVerify = require('../controllers/auth/verifyMailToken');

const readAllSellerGigs = require('../controllers/public/readAllSellerGigs');
const gigListing = require('../controllers/public/gigListing');

const _singleFileUpload = require('../middlewares/_singleFileUpload');
const multer = require('multer');
const singleListing = require('../controllers/public/singleListing');
const searchGigs = require('../controllers/public/searchGigs');


const upload = multer({})
const router = express.Router();


// AUTH ROUTES
router.post('/auth/register', userRegister);
router.post('/auth/login', userLogin);
router.post('/auth/mailverify', mailVerify);


// public routes for NON-login user
router.get('/api/seller/:sellerId/gigs', readAllSellerGigs);


// gig based routes
router.get('/gigs/:id', singleListing)
router.get('/gigs', gigListing);
router.get('/search', searchGigs);


router
    .route("/blog/uploader")
    .post(upload.single("image"), _singleFileUpload, (req, res) => {
        if (typeof req.singleImage.secure_url === 'string') {
            return res.status(200).json({
                success: 1,
                url: req.singleImage.secure_url
            });
        }
        return res.status(400).json({
            msg: "insert image error"
        });
    });


module.exports = router;