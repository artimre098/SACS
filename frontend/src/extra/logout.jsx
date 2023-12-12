import React from 'react'

const logout = () => {
    const handleLogout = async () => {
        try {
          // Make a request to your server to invalidate the user's session
          const response = await fetch('/logout', {
            method: 'POST', // Adjust the method as per your server-side implementation
            credentials: 'include', // Use 'include' if your server and client are on different domains
          });
    
          if (response.ok) {
            // Redirect or perform any additional actions upon successful logout
            window.location.href = '/'; // Adjust the URL as needed
          } else {
            console.error('Logout failed:', response.statusText);
          }
        } catch (error) {
          console.error('Logout failed:', error.message);
        }
      };
    
      return (
        <button onClick={handleLogout}>
          Logout
        </button>
      );
}

export default logout