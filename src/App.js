import React, { useState } from 'react';
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
   const [selectedArtist, setSelectedArtist] = useState();

   return (
      <AppShell
         padding='md'
         navbar={
            <Navbar width={{ base: 300 }} height={500} p='xs'>
               {token && isSuccess ? (
                  <ArtistList items={data.items} selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} />
               ) : (
                  <div>No previous tracks</div>
               )}
            </Navbar>
         }
         header={
            <Header height={60} p='xs'>
               {!token ? (
                  <Button color='indigo' onClick={login}>
                     Login
                  </Button>
               ) : (
                  <Button color='indigo' onClick={logout}>
                     Logout
                  </Button>
               )}
            </Header>
         }
         styles={(theme) => ({
            main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
         })}
         className={styles['app']}
      >
         <Container>
            {token && isSuccess ? <TrackGrid items={data.items} filterOnArtist={selectedArtist} /> : <div>No previous tracks</div>}
         </Container>
      </AppShell>
   );
}

export default App;
