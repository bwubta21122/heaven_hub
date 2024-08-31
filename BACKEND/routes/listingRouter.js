const express=require('express');
const {createListing,deleteListing,updateListing}=require('../controllers/listingController');
const {veifyToken}=require('../utils/verifyUser')
const route=express.Router();

route.post('/create',veifyToken , createListing);
route.delete('/delete/:id',veifyToken , deleteListing);
route.post('/update/:id',veifyToken , updateListing);

module.exports=route;