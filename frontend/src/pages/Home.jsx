import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import Listing from './Listings';
import ListingItem from '../components/ListingItem';

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListing);
  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=4');
        const data = await res.json();
        setOfferListing(data);
        fetchRent();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRent = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=4');
        const data = await res.json();
        setRentListing(data);
        fetchSale();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSale = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sale&limit=4');
        const data = await res.json();
        setSaleListing(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOffer();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className='font-bold text-3xl text-slate-700 lg:text-6xl'>Find your next perfect
          <br />place with ease
        </h1>
        <div className='text-gray-400 text-sm'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate reiciendis unde sunt dolore
          <br />
          eveniet obcaecati minima odio sit itaque! Dolor similique aliquam amet perferendis repudiandae at omnis? Voluptates, exercitationem necessitatibus!
        </div>
        <Link to={"/search"} className='text-sm text-blue-800 hover:underline'>Lets get started...</Link>
      </div>
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
               <img src={listing.imageUrls[0]} alt='listing-image' className='w-full h-[500px] object-cover object-fill object-contain' />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className='flex flex-col max-w-6xl mx-auto p-3 gap-8 my-10'>
        {offerListing && offerListing.length>0 && (
          <div className="div">
            <div className="div">
              <h1 className='text-3xl font-bold text-slate-600'>Recent Offers</h1>
              <Link className='text-sm text-blue-800 hover:underline' to={"/search?offer=true"}> Show more offers</Link>
            </div>
            <div className="flex flex-wrap gap-5">
              {offerListing.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}></ListingItem>
              ))}
            </div>
          </div>
        )}
        {rentListing && rentListing.length>0 && (
          <div className="div">
            <div className="div">
              <h1 className='text-3xl font-bold text-slate-600'>Newly Added for Rent</h1>
              <Link className='text-sm text-blue-800 hover:underline' to={"/search?type=rent"}> Show more places for rent</Link>
            </div>
            <div className="flex flex-wrap gap-5">
              {rentListing.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}></ListingItem>
              ))}
            </div>
          </div>
        )}
        {saleListing && saleListing.length>0 && (
          <div className="div">
            <div className="div">
              <h1 className='text-3xl font-bold text-slate-600'>Latest additions for Sale</h1>
              <Link className='text-sm text-blue-800 hover:underline' to={"/search?type=sale"}> Show more...</Link>
            </div>
            <div className="flex flex-wrap gap-5">
              {saleListing.map((listing)=>(
                <ListingItem listing={listing} key={listing._id}></ListingItem>
              ))}
            </div>
          </div>
        )}
      </div>
    </div >
  )
}

export default Home;