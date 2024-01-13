import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios if not already installed
import './ProfileSettingStaff.css';
import { useNavigate } from 'react-router-dom';

const ProfileSettingStaff = () => {
  const navigate = useNavigate();
  const [adminEmail, setAdminEmail] = useState('');
  const [adminName, setAdminName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Assuming your server is running at http://localhost:3001

    // Fetch admin email
    axios.get('http://localhost:3001/profile-get-admin-email')
      .then(response => {
        const { success, adminEmail, message } = response.data;

        if (success) {
          setAdminEmail(adminEmail);
        } else {
          setError(message);
        }
      })
      .catch(error => {
        console.error(error);
        setError('Internal Server Error');
      });

    // Fetch admin name
    axios.get('http://localhost:3001/profile-get-admin-name')
      .then(response => {
        const { success, adminName, message } = response.data;

        if (success) {
          setAdminName(adminName);
        } else {
          setError(message);
        }
      })
      .catch(error => {
        console.error(error);
        setError('Internal Server Error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleEmailButtonClick = () => {
    // Add the logic you want to perform when the email button is clicked
    navigate('/UpdateEmailStaff');
  };

  const handleNameButtonClick = () => {
    // Add the logic you want to perform when the name button is clicked
    navigate('/UpdateNameStaff');
  };

  const handleBackClick = () => {
    navigate(`/HomeForStaff`);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          <h2>Staff Name</h2>
          <button onClick={handleBackClick}>Back</button>
          <p>{adminName}</p>
          <button onClick={handleNameButtonClick}>Update Name</button>
          <h2>Staff Email</h2>
          <p>{adminEmail}</p>
          <button onClick={handleEmailButtonClick}>Update Email</button>
        </div>
      )}
    </div>
  );
};

export default ProfileSettingStaff;
