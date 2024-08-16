import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oath from '../components/Oath';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);

      if (data.success === false) {
        setError(data.message || 'Sign up failed');
        return;
      }

      setError(null);
      navigate('/sign-in'); // Correctly navigate to the sign-in page
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center my-7 font-semibold">Sign Up</h1>
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border rounded-lg p-3"
          id="userName"
          value={formData.userName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border rounded-lg p-3"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded-lg p-3"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          disabled={loading}
          className="border disabled:opacity-80 rounded-lg p-3 bg-slate-700 text-white uppercase hover:opacity-95"
        >
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
        <Oath />
      </form>
      <div className="flex mt-5 gap-2">
        <p>Already have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign In</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
