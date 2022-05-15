import { useEffect, useState } from 'react';
import { AppShell, Navbar, Header, Container } from '@mantine/core';
import { useGetRecentlyPlayedQuery } from './services/api';
import { useAuth } from './contexts/useAuth';
import { Button } from '@mantine/core';
import TrackGrid from './components/TrackGrid/TrackGrid';
import ArtistList from './components/ArtistList/ArtistList';
import styles from './App.module.scss';

function App() {
   const { token, login, logout } = useAuth();
   const { data, isSuccess } = useGetRecentlyPlayedQuery(token);

   // Check for saved artist filter
   const item = window.localStorage.getItem('selected-artist');
   const [selectedArtist, setSelectedArtist] = useState(item);

   // Set selected artist in local storage to persist refresh
   useEffect(() => {
      if (selectedArtist) {
         window.localStorage.setItem('selected-artist', selectedArtist);
      } else {
         window.localStorage.removeItem('selected-artist');
      }
   }, [selectedArtist]);

   return (
      <AppShell
         navbar={
            <Navbar width={{ base: 300 }} height={500} p='xs'>
               {token && isSuccess ? <ArtistList items={data.items} selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} /> : null}
            </Navbar>
         }
         header={
            <Header height={60} p='xs'>
               <div className={styles['login-button']}>
                  {!token ? (
                     <Button color='indigo' onClick={login}>
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
         styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
         className={styles['app']}
      >
         <Container fluid className={styles['grid-container']}>
            {token ? (
               isSuccess ? (
                  <TrackGrid items={data.items} filterOnArtist={selectedArtist} />
               ) : (
                  <div>Error fetching Spotify data</div>
               )
            ) : (
               <div className={styles['no-tracks']}>
                  <h1>No previous tracks</h1>
                  <h3>Please login to show artist grid</h3>
               </div>
            )}
         </Container>
      </AppShell>
   );
}

export default App;
