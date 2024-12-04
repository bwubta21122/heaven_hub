
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
const ValleyVideo = '/valley-video.mp4';
import ListingItem from '../components/ListingItem';

const Home = () => {
  const [offerListing, setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const offerRes = await fetch('/api/listing/get?offer=true&limit=4');
        const rentRes = await fetch('/api/listing/get?type=rent&limit=4');
        const saleRes = await fetch('/api/listing/get?type=sale&limit=4');

        const offers = await offerRes.json();
        const rents = await rentRes.json();
        const sales = await saleRes.json();

        setOfferListing(offers);
        setRentListing(rents);
        setSaleListing(sales);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div 
        className="h-screen bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: "url('https://www.gibsonarchitecture.com/wp-content/uploads/2018/08/MB1.jpg')",
        }}
      ></div>
      <div className="container mx-auto p-4 pt-6 md:p-6">
        <div className="flex flex-col gap-8 p-8 lg:p-20 max-w-6xl mx-auto">
          <h1 className='font-bold text-4xl text-slate-800 lg:text-6xl'>
            Find Your Next Perfect Place with Ease
          </h1>
          <p className='text-gray-600 text-base lg:text-lg'>
            Discover a wide variety of listings tailored just for you. Let us help you find the perfect home!
          </p>
          <Link to="/search" className='text-lg text-blue-600 bg-blue-100 hover:bg-blue-200 py-2 px-4 rounded-lg transition duration-300'>
            Let’s Get Started...
          </Link>
        </div>



        <Swiper navigation className="my-8">
          {offerListing.length > 0 && offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <img
                src={listing.imageUrls[0]}
                alt="listing-image"
                className="w-full h-[588px] object-cover rounded-lg shadow-md"
              />
            </SwiperSlide>
          ))}
        </Swiper>


        {/* <div className="flex flex-col gap-8"> */}
        <div className='flex flex-col max-w-6xl mx-auto p-4 gap-8'>
          {offerListing.length > 0 && (
            <div className="bg-gray-100 shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h2 className='text-2xl font-bold text-slate-700'>Recent Offers</h2>
                <Link className='text-sm text-blue-600 hover:underline' to="/search?offer=true">Show more offers</Link>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {offerListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {rentListing.length > 0 && (
            <div className="bg-gray-100 shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h2 className='text-2xl font-bold text-slate-700'>Newly Added for Rent</h2>
                <Link className='text-sm text-blue-600 hover:underline' to="/search?type=rent">Show more places for rent</Link>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {rentListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}

          {saleListing.length > 0 && (
            <div className="bg-gray-100 shadow-lg rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h2 className='text-2xl font-bold text-slate-700'>Latest Additions for Sale</h2>
                <Link className='text-sm text-blue-600 hover:underline' to="/search?type=sale">Show more...</Link>
              </div>
              <div className="flex flex-wrap gap-4 mt-4">
                {saleListing.map((listing) => (
                  <ListingItem listing={listing} key={listing._id} />
                ))}
              </div>
            </div>
          )}
        </div>

        <Link to="/foundation">
          <h1 className="text-center mt-10 text-red-400 text-3xl font-thin hover:underline ">NEXT  CHAPTER  THE FOUNDATION</h1>
        </Link>

      </div >
    </>
  );
};

export default Home;
