import React, { useState } from 'react';
import axios from 'axios';
import Container from '../Container/Container';

const AddressForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zip: '',
    address: '',
  });

  const [img, setImg] = useState(null);
  const [imgURL, setImgURL] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    if (file) {
      setImgURL(URL.createObjectURL(file)); // for preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.city || !formData.state || !formData.zip || !formData.address) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      let imageResponse = null;
      if (img) {
        const imageData = new FormData();
        imageData.append('file', img);

        imageResponse = await axios.post("https://api.escuelajs.co/api/v1/files/upload", imageData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        console.log('Image uploaded:', imageResponse.data);
      }

      const fullData = {
        ...formData,
        image: imageResponse?.data?.location || '',
      };

      console.log('Submitted Data:', fullData);

      alert('Form submitted successfully!');
    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Submission failed!');
    }
  };

  return (
    <Container>
      <div className="w-full flex justify-center my-20">
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 lg:w-1/3 border p-6 rounded shadow-md bg-white space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">Enter Your Address</h2>

          <div>
            <label htmlFor="firstName" className="block mb-1">First Name</label>
            <input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block mb-1">Last Name</label>
            <input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block mb-1">Address</label>
            <textarea
              id="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="city" className="block mb-1">City</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="state" className="block mb-1">State</label>
            <input
              id="state"
              type="text"
              value={formData.state}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="zip" className="block mb-1">Zip Code</label>
            <input
              id="zip"
              type="text"
              value={formData.zip}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="file" className="block mb-1">Upload Image</label>
            <input
              id="file"
              type="file"
              onChange={handleImageChange}
              className="w-full"
            />
            {imgURL && <img src={imgURL} alt="Preview" className="mt-2 h-24 rounded" />}
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </Container>
  );
};

export default AddressForm;
