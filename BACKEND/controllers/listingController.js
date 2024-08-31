const Listing=require('../models/listingModels');
const { errorHandler } = require('../utils/error');
module.exports.createListing=async(req,res,next)=>{
    try{
        const listing=await Listing.create(req.body);
        res.status(200).json(listing);
    }catch(error){
        next(error)
    }
}
module.exports.deleteListing=async(req,res,next)=>{
    const listing= await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,'Listing not found'));
    }   
    if(req.user.id!==listing.userRef){
        return next(errorHandler(401,'You can delete your own listing'));
    }
    try{
        await  Listing.findByIdAndDelete(req.params.id);
        res.status(200).json('Listing has been deleted');
    }catch(error){
        next(error);
    }
}
module.exports.updateListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    if(!listing){
        return next(errorHandler(404,'No listing found'));
    }if(req.user.id!==listing.userRef){
        return next(errorHandler(401,'You can only update your own listing'));
    }
    try{
        const updateListing=await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.status(200).json(updateListing);
    }catch(error){
        next(error);
    }
}