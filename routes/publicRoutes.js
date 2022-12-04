import express from 'express';

import userRegister from "../controllers/auth/userRegister";
import userLogin from "../controllers/auth/userLogin";
import mailVerify from '../controllers/auth/verifyMailToken';
import readAllSellerGigs from '../controllers/public/readAllSellerGigs';
import readSellerInfo from '../controllers/public/readSellerInfo';
import gigListing from '../controllers/public/gigListing';

import _singleFileUpload from '../middlewares/_singleFileUpload';
import multer from 'multer';
import singleListing from '../controllers/public/singleListing';
import searchGigs from '../controllers/public/searchGigs';


const upload = multer({})
const router = express.Router();


// AUTH ROUTES
router.post('/auth/register', userRegister);
router.post('/auth/login', userLogin);
router.post('/auth/mailverify', mailVerify);


// public routes for NON-login user
router.get('/api/seller/:sellerId/gigs', readAllSellerGigs);
router.get('/api/seller/:sellerId/info', readSellerInfo);


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


export default router;