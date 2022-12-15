const createGig = require('../controllers/private/sellers/createGig');
const deleteGIG = require('../controllers/private/sellers/deleteGig');
const updateGig = require('../controllers/private/sellers/updateGig');
const {
    createGigVerification,
    updateGigVerification,
    getAllGigVerifications,
} = require('../controllers/private/sellers/gigVerification');

const changeGigStatus = require('../controllers/private/sellers/changeGigStatus');
const updateSocials = require('../controllers/private/sellers/updateSocials');
const { updateSellerProfile } = require('../controllers/private/sellers/profile');

const { getSellerVerification, getAllSellerVerifications } = require("../controllers/private/sellers/sellerVerification");

const _singleFileUpload = require('../middlewares/_singleFileUpload');
const deleteImageCloudinary = require('../controllers/private/cloudinary/deleteImageCloudinary');
const uploadImageCloudinary = require('../controllers/private/cloudinary/uploadImageCloudinary');
const readImageCloudinary = require('../controllers/private/cloudinary/readImageCloudinary');

const _authToken = require("../middlewares/_authToken");
const _roleCheckAdmin = require("../middlewares/_roleCheckAdmin");
const { getGigVerification } = require("../controllers/private/sellers/gigVerification");

const {
    createSellerVerification,
    updateSellerVerification
} = require('../controllers/private/sellers/sellerVerification');

const multer = require('multer');

const router = require('express').Router();
const upload = multer({})


// ----------------- cloudinary ROUTES ----------------- //
router.post('/cloudinary', _authToken, upload.single('file'), _singleFileUpload, uploadImageCloudinary);
router.delete('/cloudinary', _authToken, deleteImageCloudinary);
router.get('/cloudinary', _authToken, readImageCloudinary);

// ----------------- Seller ROUTES ----------------- //
router.post('/seller/gig', _authToken, createGig);
router.delete('/seller/gig/:gigId', _authToken, deleteGIG);

router.patch('/seller/gig/status-update/:gigId', _authToken, changeGigStatus);
router.patch('/seller/gig/update/:gigId', _authToken, updateGig);
router.patch('/seller/socials', _authToken, updateSocials);



router.get('/seller/verification/:sellerId', _authToken, getSellerVerification);
router.get('/gig/verification/:gigId', _authToken, getGigVerification);


router.patch('/seller/profile', _authToken, updateSellerProfile);


// verification routes
router.post('/seller/create-verification/:sellerId', _authToken, createSellerVerification);
router.post('/gig/create-verification/:gigId', _authToken, createGigVerification);


// seller verification routes | ADMIN ONLY
router.get('/admin/seller/all-verification', _authToken, _roleCheckAdmin, getAllSellerVerifications);
router.patch('/admin/seller/update-verification/:sellerId', _authToken, _roleCheckAdmin, updateSellerVerification); // <-- admin only

// gig verification routes | ADMIN ONLY
router.get('/admin/gig/all-verification', _authToken, _roleCheckAdmin,
    getAllGigVerifications
);
router.patch('/admin/gig/update-verification/:gigId', _authToken, _roleCheckAdmin, updateGigVerification); // <-- admin only

module.exports = router; 