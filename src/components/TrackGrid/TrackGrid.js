import React from 'react';
import { Grid } from '@mantine/core';
import styles from './TrackGrid.module.scss';

const TrackGrid = ({ items, filterOnArtist }) => {
   const filteredList = filterOnArtist
      ? items.filter(
           (item) =>
              item.track.artists.filter((artist) => {
                 return artist.id === filterOnArtist;
              }).length > 0
        )
      : items;

   return (
      <Grid className={styles['track-grid']}>
         {filteredList.map((item, i) => (
            <Grid.Col key={i}>
               <div className={styles['track-card']}>
                  <div className={styles['image']} style={{ backgroundImage: `url(${item.track.album.images[1].url})` }} />
                  <div className={styles['overlay']} />
                  <div className={styles['content']}>
                     <div>{item.track.name}</div>
                     <div>{item.track.artists[0].name}</div>
                  </div>
               </div>
            </Grid.Col>
         ))}
      </Grid>
   );
};

export default TrackGrid;
