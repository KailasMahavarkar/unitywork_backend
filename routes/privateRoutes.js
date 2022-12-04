import express from 'express';
import readAllSellerGigs from '../controllers/public/readAllSellerGigs';
import deleteGIG from '../controllers/seller/deleteGig';
import _authToken from '../middlewares/_authToken';
const router = express.Router();


router.get(
    '/seller/:sellerId/gigs',
    _authToken,
    readAllSellerGigs
);

router.delete(
    '/seller/gigs/:gigId',
    _authToken,
    deleteGIG
)


export default router;