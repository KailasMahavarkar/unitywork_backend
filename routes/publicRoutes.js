const userRegister = require("../controllers/public/auth/userRegister");
const userLogin = require("../controllers/public/auth/userLogin");
const mailVerify = require('../controllers/public/auth/verifyMailToken');

const readSellerGigs = require('../controllers/public/sellers/readSellerGigs');
const gigListing = require('../controllers/public/gigs/gigsListing');

const singleListing = require('../controllers/public/gigs/singleListing');
const searchGigs = require('../controllers/public/gigs/searchGigs');
const renewToken = require("../controllers/public/auth/renewToken");
const resetPassword = require('../controllers/public/auth/resetPassword');
const { readSellerProfile } = require('../controllers/private/sellers/profile');
const readSellerSocials = require("../controllers/public/sellers/readSellerSocials");
const readAllSellers = require("../controllers/private/sellers/readAllSellers");
const searchSeller = require("../controllers/public/sellers/searchSeller");
const express = require('express');
const readSeller = require("../controllers/public/sellers/readSeller");


// use express router
const router = express.Router();

// ----------------- Auth ROUTES ----------------- //
router.post('/auth/register', userRegister);
router.post('/auth/login', userLogin);
router.post('/auth/mailverify', mailVerify);
router.post('/auth/refresh', renewToken);
router.post('/auth/reset', resetPassword);


// ----------------- Many Seller ROUTES ----------------- //
router.get('/sellers', readAllSellers);
router.get('/sellers/search', searchSeller);



// ----------------- Single Seller ROUTES ----------------- //
router.get('/seller/:username', readSeller);
router.get('/seller/gigs/:username', readSellerGigs);
router.get('/seller/socials/:username', readSellerSocials);
router.get('/seller/profile/:username', readSellerProfile);


// ----------------- Gigs ROUTES ----------------- //
router.get('/gigs', gigListing);
router.get('/gigs/search', searchGigs);
router.get('/gigs/:id', singleListing);



module.exports = router;