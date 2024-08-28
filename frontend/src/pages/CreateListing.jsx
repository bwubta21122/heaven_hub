import React, { useState } from 'react';
import { getStorage, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
  });
  console.log(formData);

  const handleImageSubmit = (e) => {
    e.preventDefault();
    if (files.length > 0) {
      const promises = files.map((file) => storeImage(file));
      Promise.all(promises)
        .then((urls) => {
          setFormData((prev) => ({ ...prev, imageUrls: prev.imageUrls.concat(urls) }));
        })
        .catch((error) => {
          console.error('Error uploading images:', error);
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

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-center font-bold text-3xl my-7">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex w-full flex-col gap-4 flex-1">
          <input
            className="border rounded-lg p-3"
            type="text"
            placeholder="Name"
            id="name"
            required
          />
          <textarea
            className="border rounded-lg p-3"
            placeholder="Description"
            id="description"
            required
          />
          <input
            className="border rounded-lg p-3"
            type="text"
            placeholder="Address"
            id="address"
            required
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="sale" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="rent" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="parking" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="furnished" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" className="w-5" id="offer" />
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
              />
              <p>Bedroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-12 border-gray-300 rounded-lg"
                id="bathrooms"
                required
              />
              <p>Bathroom</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-12 border-gray-300 rounded-lg"
                id="price"
                required
              />
              <div className="flex flex-col items-center">
                <p>Price</p>
                <span className="text-sm">($/price)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                className="p-3 border w-12 border-gray-300 rounded-lg"
                id="discount"
                required
              />
              <div className="flex flex-col items-center">
                <p>Discount</p>
                <span className="text-sm">($/price)</span>
              </div>
            </div>
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
            <button
              onClick={handleImageSubmit}
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:opacity-45"
            >
              Upload
            </button>
          </div>
          <button className="uppercase p-3 text-white font-bold rounded-lg bg-slate-700 hover:opacity-45">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
