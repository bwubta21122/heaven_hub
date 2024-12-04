import React from 'react'
import { Link } from 'react-router-dom'

const Heaven = () => {
    return (
        <div className=''>
            <div className="relative w-full h-screen pt-24">
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="https://video-previews.elements.envatousercontent.com/f7ec3703-58fb-4c50-b981-84f118b62839/watermarked_preview/watermarked_preview.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white pointer-events-none">
                    <h1 className="text-5xl lg:text-7xl font-bold mb-52 tracking-wide">
                        HEAVEN HUB
                    </h1>
                    <h2 className="text-3xl lg:text-5xl font-semibold mb-8 tracking-wide">
                        DEER VALLEY LUXURY VACATION HOMES
                    </h2>
                </div>
            </div>


            <div className="mt-32 px-48">
                <div className="container mx-auto px-48">
                    <h1 className="text-5xl font-normal text-center mb-10">
                        WELCOME TO THE <span className='text-blue-500'>HEAVEN HUB</span> VACATION HOME COLLECTION
                    </h1>
                </div>
                <div className="container mx-auto mb-24 px-72">
                    <p className="text-lg text-center mb-10">
                        The HEAVEN HUB luxury vacation home community is ideally located in the charming town of Midway, just 9 minutes to Deer Valley's new East Village ski access and 30 minutes to Park City. The extraordinary location provides convenient access to the area's magnificent outdoors for year-round leisure. If you are seeking to buy a second home in one of Utah's most celebrated destinations, Ameyalli presents a unique homeownership opportunity.
                    </p>
                    <p className="text-lg text-center mb-10">
                        The homes are anchored by a future Wellbeing Resort, which will include a farm to table restaurant by an acclaimed Chef, indoor and outdoor pools, natural hot springs, an expansive Fitness Center, and a Wellness Spa, among many other features.
                    </p>
                </div>
            </div>

            <div className=''>
                <img className='bg-fixed w-full h-[680px]' src="https://images.coolwallpapers.me/picsup/2841140-landscape-nature-village-mountain-house-road-grass-shrubs-trees-valley___landscape-nature-wallpapers.jpg" />
            </div>
            <div className='p-32 px-44'>
                <p className='px-48 text-lg'>AMEYALLI’s spacious four-bedroom, four-bath luxury residences make the ideal mountain vacation home—beautifully appointed and fully furnished,  with expansive indoor and outdoor spaces to host families and guests. Interiors evoke a sense of casual elegance—a harmonious design that pays homage to the Park City area’s natural surroundings. The effortless second home ownership is afforded by the on-site property management by Ameyalli Hospitality. Unique to most vacation real estate, AMEYALLI offers a flexible fractional ownership option at an aspirational price.
                </p>
            </div>
            <Link to="/home">
                <h1 className="text-center text-red-400 text-3xl font-thin hover:underline ">NEXT  CHAPTER  HOME</h1>
            </Link>
        </div>
    )
}

export default Heaven
