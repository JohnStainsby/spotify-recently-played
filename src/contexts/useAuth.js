import React, { useState, useEffect, useContext } from 'react';

const AuthContext = React.createContext();

export const useAuth = () => {
   return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
   const [token, setToken] = useState();
   const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
   const redirect_uri = 'http://localhost:3000';
   const scope = 'user-read-recently-played';
   const auth_url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;

   useEffect(() => {
      // Get hash fragment from spotify callback url
      const hash = window.location.hash;

      // Reference to local storage for access token
      let token = window.localStorage.getItem('spotify_token');

      // If a token doesn't already exist and spotify returned a token
      if (!token && hash) {
         // Extract token from hash fragment
         token = hash
            .substring(1)
            .split('&')
            .find((item) => item.startsWith('access_token'))
            .split('=')[1];

         // Save token in local storage
         window.location.hash = '';
         window.localStorage.setItem('spotify_token', token);
      }

      setToken(token);
   }, []);

   // Initiate spotify auth process by navigating to authentication url
   const login = () => {
      window.location.replace(auth_url);
   };

   // Remove token from local storage to logout
   const logout = () => {
      window.localStorage.removeItem('spotify_token');
      window.localStorage.removeItem('selected_artist');
      setToken();
   };

   //Provide properties to components within this context
   const value = {
      token,
      login,
      logout,
   };

   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
