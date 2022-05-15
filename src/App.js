import { useEffect, useState } from 'react';
import { AppShell, Navbar, Header, Container, LoadingOverlay, Skeleton, Button } from '@mantine/core';
import { useAuth } from './contexts/useAuth';
import { FaMusic } from 'react-icons/fa';
import { MdMusicOff } from 'react-icons/md';
import TrackGrid from './components/TrackGrid/TrackGrid';
import ArtistList from './components/ArtistList/ArtistList';
import styles from './App.module.scss';

function App() {
   const { token, login, logout } = useAuth();
   const [loading, setLoading] = useState(false);
   const [data, setData] = useState();

   // Fetch data
   useEffect(() => {
      // Fetch recently played list from api
      const fetchData = async () => {
         const response = await fetch('https://api.spotify.com/v1/me/player/recently-played', {
            headers: {
               Authorization: `Bearer ${token}`,
            },
         });
         if (response.ok) {
            const data = await response.json();
            setData(data);
            setLoading(false);
         }
      };

      // If user is authenticated the fetch data
      if (token) {
         setLoading(true);
         fetchData();
      }

      // Re-fetch the data every 30 seconds to update the grid
      let refreshTimer = setInterval(() => {
         if (token) fetchData();
      }, 30000);

      return () => {
         clearTimeout(refreshTimer);
      };
   }, [token]);

   // Check local storage for saved artist filter
   const item = window.localStorage.getItem('selected_artist');
   const [selectedArtist, setSelectedArtist] = useState(item);

   // Set selected artist in local storage to persist refresh
   useEffect(() => {
      if (selectedArtist) {
         window.localStorage.setItem('selected_artist', selectedArtist);
      } else {
         window.localStorage.removeItem('selected_artist');
      }
   }, [selectedArtist]);

   return (
      <>
         <AppShell
            header={
               <Header height={60} p='xs' className={styles['header']}>
                  <div className={styles['title']}>
                     <FaMusic />
                     <span>Spotify Recently Played</span>
                  </div>
                  <div className={styles['login-button']}>
                     {/* If user is not authenticated show login button, otherwise show logout button */}
                     {!token ? (
                        <Button data-testid='button-login' color='indigo' onClick={login}>
                           Login
                        </Button>
                     ) : (
                        <Button color='indigo' onClick={logout}>
                           Logout
                        </Button>
                     )}
                  </div>
               </Header>
            }
            navbar={
               <Navbar width={{ base: 300 }} height={500} p='xs'>
                  {/* Show list of artist in side menu. Show placeholder if user is not authenticated. */}
                  {token && data ? (
                     <ArtistList items={data.items} selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} />
                  ) : (
                     <div className={styles['nav-info']}>
                        <Skeleton height={8} mt={6} radius='xl' />
                        <Skeleton height={8} mt={6} radius='xl' />
                        <Skeleton height={8} mt={6} radius='xl' />
                        <Skeleton height={8} mt={6} width='70%' radius='xl' />
                     </div>
                  )}
               </Navbar>
            }
            styles={(theme) => ({
               main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
            className={styles['app']}
         >
            <Container fluid className={styles['grid-container']}>
               {/* Show the grid component to render grid of recently played items if user if logged in. Otherwise show no content message. */}
               {token && data ? (
                  <TrackGrid items={data.items} filterOnArtist={selectedArtist} />
               ) : (
                  <Container>
                     <div className={styles['no-content']}>
                        <div className={styles['icon']}>
                           <MdMusicOff />
                        </div>

                        <div className={styles['title']}>No content found</div>
                        <div className={styles['subtitle']}>Please login to show your recent items</div>
                     </div>
                  </Container>
               )}
            </Container>
         </AppShell>

         <LoadingOverlay visible={loading} />
      </>
   );
}

export default App;
