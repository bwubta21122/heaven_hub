import React, { useState } from 'react';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const CreateListing = () => {
  const {currentUser}=useSelector(state=>state.user);
  const navigate=useNavigate();
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name:'',
    address:'',
    description:'',
    type:'rent',
    bedrooms:1,
    bathrooms:1,
    regularPrice:0,
    discountPrice:0,
    offer:false,
    parking:false,
    furnished:false,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  console.log(formData);
  const [uploading,setUploading]=useState(false);
  const [error,setError]=useState(false);
  const [loading,setLoading]=useState(false);


  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      const promises = files.map((file) => storeImage(file));
      setUploading(true);
      Promise.all(promises)
        .then((urls) => {
          setFormData((prev) => ({ ...prev, imageUrls: prev.imageUrls.concat(urls) }));
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((error) => {
          setImageUploadError('Image upload error')
          console.error('Error uploading images:', error);
          setUploading(false);
        });
    }
  };

  const storeImage = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  const handleRemoveImage=(index)=>{
    setFormData({
      ...formData,imageUrls:formData.imageUrls.filter((_,i)=>i!==index)
    })
  }

  const handleChange=(e)=>{
    if(e.target.id==='sale' || e.target.id==='rent'){
      setFormData({
        ...formData,
        type:e.target.id
      })
    }
    if(e.target.id==='parking' || e.target.id==='furnished' || e.target.id==='offer'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked
      })
    }
    if(e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value
      })
    }
  }
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      if (formData.imageUrls.length < 1)
        return setError('You must upload at least one image');
      if (+formData.regularPrice < +formData.discountPrice)
        return setError('Discount price must be lower than regular price');
      setLoading(true);
      setError(false);
      const res=await fetch('/api/listing/create',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify({
          ...formData,
          userRef:currentUser._id,
        })
      });
      const data=await res.json();
      setLoading(false);
      if(data.success===false){
        setError(data.message)
      }
      navigate(`/listing/${data._id}`);
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center font-bold text-3xl my-7">Create a Listing</h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex w-full flex-col gap-4 flex-1">
          <input
            className="border rounded-lg p-3"
            type="text"
            placeholder="Name"
            id="name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            className="border rounded-lg p-3"
            placeholder="Description"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            className="border rounded-lg p-3"
            type="text"
            placeholder="Address"
            id="address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" onChange={handleChange} checked={formData.type==='sale'}/>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" onChange={handleChange} checked={formData.type==='rent'}/>
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" onChange={handleChange} checked={formData.parking}/>
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" onChange={handleChange} checked={formData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" onChange={handleChange} checked={formData.offer}/>
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-12 border-gray-300 rounded-lg"
                id="bedrooms"
                required
                onChange={handleChange} value={formData.bedrooms}
              />
              <p>Bedroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-12 border-gray-300 rounded-lg"
                id="bathrooms"
                required
                onChange={handleChange} value={formData.bathrooms}
              />
              <p>Bathroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-[70px] border-gray-300 rounded-lg"
                id="regularPrice"
                required
                onChange={handleChange} value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>regularPrice</p>
                <span className="text-sm">($/Price)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-[70px] border-gray-300 rounded-lg"
                id="discountPrice"
                required
                onChange={handleChange} value={formData.discountPrice}
              />
              <div className="flex flex-col items-center">
                <p>discountPrice</p>
                <span className="text-sm">($/Price)</span>
              </div>
            </div>
            )} 
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be for cover
            </span>
          </p>
          <div className="flex gap-4">
            <input
              onChange={(e) => setFiles(Array.from(e.target.files))}
              type="file"
              className="border border-gray-300 w-full p-3 rounded-lg"
              id="images"
              accept="image/*"
              multiple
            />
            <button type='button'
              onClick={handleImageSubmit} disabled={uploading}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:opacity-45"
            >
              {uploading?'Uploading..':'Upload'}
            </button>
          </div>
          <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length > 0 && formData.imageUrls.map((url,index) => (
              <div className="flex justify-between p-3 border items-center">
                <img key={url} src={url} alt='listing-image' className='w-20 h-20 object-contain rounded-lg'></img>
                <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-55'>Delete</button>
              </div>
            ))
          }
          <button disabled={loading || uploading} className="uppercase p-3 text-white font-bold rounded-lg bg-slate-700 hover:opacity-45">
            {loading? 'Creating...':'Create Listing'}
          </button>
          {error && <p className='text-red-700 text-sm'>{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
