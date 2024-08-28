const express=require('express');
const {createListing}=require('../controllers/listingController');
const {veifyToken}=require('../utils/verifyUser')
const route=express.Router();

route.post('/create',veifyToken , createListing);
module.exports=route;