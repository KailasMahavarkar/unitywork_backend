const express = require('express');
const readAllSellerGigs = require('../controllers/public/readAllSellerGigs');
const createGig = require('../controllers/seller/createGig');
const deleteGIG = require('../controllers/seller/deleteGig');
const _authToken = require('../middlewares/_authToken');

const router = express.Router();



router.get(
    '/seller/:sellerId/gigs',
    _authToken,
    readAllSellerGigs
);

router.post(
    '/seller/gig',
    _authToken,
    createGig
)

router.delete(
    '/seller/gigs/:gigId',
    _authToken,
    deleteGIG
)

module.exports = router;