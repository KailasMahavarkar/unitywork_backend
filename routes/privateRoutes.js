const createGig = require('../controllers/private/sellers/createGig');
const deleteGIG = require('../controllers/private/sellers/deleteGig');
const updateGig = require('../controllers/private/sellers/updateGig');
const {
    createGigVerification,
    updateGigVerification,
} = require('../controllers/private/sellers/gigVerification');

const changeGigStatus = require('../controllers/private/sellers/changeGigStatus');
const updateSocials = require('../controllers/private/sellers/updateSocials');
const { updateSellerProfile } = require('../controllers/private/sellers/profile');


const _singleFileUpload = require('../middlewares/_singleFileUpload');
const deleteImageCloudinary = require('../controllers/private/cloudinary/deleteImageCloudinary');
const uploadImageCloudinary = require('../controllers/private/cloudinary/uploadImageCloudinary');
const readImageCloudinary = require('../controllers/private/cloudinary/readImageCloudinary');

const {
    createSellerVerification,
    updateSellerVerification
} = require('../controllers/private/sellers/sellerVerification');

const _authToken = require('../middlewares/_authToken');
const _roleCheckAdmin = require('../middlewares/_roleCheckAdmin');
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

// get seller profile
router.patch('/seller/profile', _authToken, updateSellerProfile);


// ALL seller verification routes
router.post('/seller/:sellerId/create-verification', _authToken, createSellerVerification);
router.patch('/seller/:sellerId/update-verification', _authToken, _roleCheckAdmin, updateSellerVerification); // <-- admin only


// update gig verification by admin
router.post('/gig/:gigId/create-verification', _authToken, createGigVerification);
router.patch('/gig/:gigId/update-verification', _authToken, _roleCheckAdmin, updateGigVerification); // <-- admin only

module.exports = router; 