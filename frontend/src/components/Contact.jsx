import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState(null);
    useEffect(() => {
        const fetchLandLord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandLord();
    }, [listing.userRef]);
    return (
        <div>
            {landlord &&
                <div className='flex flex-col gap-2'>
                    <p> Contact <span className='font-bold'>{landlord.userName}</span> for
                        <span> {listing.name}</span></p>
                    <textarea name='message' id='message' placeholder='Enter your message here'
                        rows='2' value={message} onChange={(e) => { setMessage(e.target.value) }}
                        className='w-full border p-3 rounded-lg'>
                    </textarea>
                    <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}
                     $body=${message}`}
                     className='text-white bg-slate-700 text-center rounded-lg hover:opacity-55 uppercase p-3'>Send Meesage</Link>
                </div>
            }
        </div>
    )
}

export default Contact
