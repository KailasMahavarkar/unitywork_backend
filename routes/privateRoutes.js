const readAllSellerGigs = require('../controllers/public/readAllSellerGigs');
const createGig = require('../controllers/seller/createGig');
const deleteGIG = require('../controllers/seller/deleteGig');
const changeGigStatus = require('../controllers/seller/changeGigStatus');
const _authToken = require('../middlewares/_authToken');
const updateSocials = require('../controllers/seller/updateSocials');
const getSocials = require('../controllers/seller/getSocials');

const getAllSellers = require('../controllers/seller/getAllSellers');

const { useRouter } = require('../helper');


// router for sellers
const router = useRouter([
    {
        // get all gigs of a seller
        path: '/seller/:sellerId/gigs',
        method: 'get',
        controller: readAllSellerGigs,
        middlewares: [_authToken]
    },
    {
        // change gig status from active to inactive (vice versa)
        path: '/seller/gig/status',
        method: 'patch',
        controller: changeGigStatus,
    },
    {
        // create a new gig
        path: '/seller/gig',
        method: 'post',
        controller: createGig,
        middlewares: [_authToken]
    },
    {
        // delete a gig
        path: '/seller/gigs/:gigId',
        method: 'delete',
        controller: deleteGIG,
        middlewares: [_authToken]
    },
    {
        // update socials
        path: '/seller/socials',
        method: 'patch',
        controller: updateSocials,
        middlewares: [_authToken]
    },
    {
        // get socials
        path: '/seller/socials',
        method: 'get',
        controller: getSocials,
        middlewares: [_authToken]
    },
    {
        // get all seller
        path: '/sellers',
        method: 'get',
        controller: getAllSellers,
    }
])


module.exports = router;