const userRegister = require("../controllers/auth/userRegister");
const userLogin = require("../controllers/auth/userLogin");
const mailVerify = require('../controllers/auth/verifyMailToken');

const readAllSellerGigs = require('../controllers/public/readAllSellerGigs');
const gigListing = require('../controllers/public/gigListing');

const _singleFileUpload = require('../middlewares/_singleFileUpload');
const multer = require('multer');
const singleListing = require('../controllers/public/singleListing');
const searchGigs = require('../controllers/public/searchGigs');
const renewToken = require("../controllers/auth/renewToken");
const resetPassword = require('../controllers/auth/resetPassword');


const deleteImageCloudinary = require('../controllers/cloudinary/deleteImageCloudinary');
const uploadImageCloudinary = require('../controllers/cloudinary/uploadImageCloudinary');
const readImageCloudinary = require('../controllers/cloudinary/readImageCloudinary');
const { useRouter } = require('../helper');

const upload = multer({})

const cloudinaryRoutes = [
    {
        // handle image upload to cloudinary
        path: "/cloudinary",
        method: 'post',
        middlewares: [
            upload.single('file'),
            _singleFileUpload
        ],
        controller: uploadImageCloudinary,
    },
    {
        // delete image from cloudinary
        path: "/cloudinary",
        method: 'delete',
        controller: deleteImageCloudinary,
    },
    {
        // read image from cloudinary
        path: "/cloudinary",
        method: 'get',
        controller: readImageCloudinary,
    }
]

const authRoutes = [
    {
        // register a new user
        path: '/auth/register',
        method: 'post',
        controller: userRegister
    },
    {
        // login a user
        path: '/auth/login',
        method: 'post',
        controller: userLogin
    },
    {
        // verify mail token
        path: '/auth/mailverify',
        method: 'post',
        controller: mailVerify
    },
    {
        // renew token
        path: '/auth/refresh',
        method: 'post',
        controller: renewToken
    },
    {
        // reset password
        path: '/auth/reset',
        method: 'post',
        controller: resetPassword
    },
]

const sellerRoutes = [
    {
        path: '/seller/:sellerId/gigs',
        method: 'get',
        controller: readAllSellerGigs
    },
]

const gigRoutes = [
    {
        // single listing
        path: '/gigs/:id',
        method: 'get',
        controller: singleListing
    },
    {
        // all gigs
        path: '/gigs',
        method: 'get',
        controller: gigListing
    },
    {
        // search gigs
        path: '/search',
        method: 'get',
        controller: searchGigs
    },
]

const router = useRouter([
    ...authRoutes,
    ...sellerRoutes,
    ...gigRoutes,
    ...cloudinaryRoutes
])


module.exports = router;