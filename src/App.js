import React, { useState, useEffect } from 'react';
import { AppShell, Navbar, Header } from '@mantine/core';
import TrackGrid from './components/TrackGrid/TrackGrid';
import styles from './App.module.scss';
import { useGetRecentlyPlayedQuery } from './services/api';

function App() {
   const [token, setToken] = useState('');
   const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
   const redirect_uri = 'http://localhost:3000';
   const scope = 'user-read-recently-played';
   const auth_url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}`;

   const { data, isSuccess } = useGetRecentlyPlayedQuery();
   console.log(data);

   useEffect(() => {
      // Get hash fragment from spotify redirect url
      const hash = window.location.hash;

      // Reference to local storage for access token
      let token = window.localStorage.getItem('spotify_token');

      // If a token doesn't already exist and spotify returned the hash
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

   const logout = () => {
      window.localStorage.removeItem('spotify_token');
      setToken('');
   };

   return (
      <AppShell
         padding='md'
         navbar={
            <Navbar width={{ base: 300 }} height={500} p='xs'>
               {/* Navbar content */}
            </Navbar>
         }
         header={
            <Header height={60} p='xs'>
               {!token ? <a href={auth_url}>Login</a> : <button onClick={logout}>Logout</button>}
            </Header>
         }
         styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
         className={styles['app']}
      >
         {isSuccess ? <TrackGrid tracks={data.items} /> : <div>No previous tracks</div>}
      </AppShell>
   );
}

export default App;
