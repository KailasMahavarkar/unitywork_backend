const createGig = require('../controllers/private/sellers/createGig');
const deleteGIG = require('../controllers/private/sellers/deleteGig');
const updateGig = require('../controllers/private/sellers/updateGig');
const changeGigStatus = require('../controllers/private/sellers/changeGigStatus');
const updateSocials = require('../controllers/private/sellers/updateSocials');
const { updateSellerProfile } = require('../controllers/private/sellers/profile');


const _singleFileUpload = require('../middlewares/_singleFileUpload');
const deleteImageCloudinary = require('../controllers/private/cloudinary/deleteImageCloudinary');
const uploadImageCloudinary = require('../controllers/private/cloudinary/uploadImageCloudinary');
const readImageCloudinary = require('../controllers/private/cloudinary/readImageCloudinary');

const {
    createVerification,
    getVerification,
    getAllVerifications,
    changeVerificationStatus,
} = require('../controllers/private/sellers/verification');

const _authToken = require('../middlewares/_authToken');
const multer = require('multer');

const router = require('express').Router();
const upload = multer({})


// ----------------- cloudinary ROUTES ----------------- //
router.post('/cloudinary', _authToken, upload.single('file'), _singleFileUpload, uploadImageCloudinary);
router.delete('/cloudinary', _authToken, deleteImageCloudinary);
router.get('/cloudinary', _authToken, readImageCloudinary);

// ----------------- Seller ROUTES ----------------- //
router.post('/seller/gig', _authToken, createGig);
router.delete('/seller/gig', _authToken, deleteGIG);
router.patch('/seller/gig/:gigId/status', _authToken, changeGigStatus);
router.patch('/seller/gig/:gigId', _authToken, updateGig);
router.patch('/seller/socials', _authToken, updateSocials);


// ----------------- Seller Verification ROUTES ----------------- //
router.post('/seller/verification', _authToken, createVerification);
router.get('/seller/verification', _authToken, getVerification);
router.patch('/seller/status', _authToken, changeVerificationStatus);

// get all verifications
router.get('/seller/verifications', _authToken, getAllVerifications);


// get seller profile
router.patch('/seller/profile', _authToken, updateSellerProfile);


module.exports = router;