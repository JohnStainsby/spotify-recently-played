import React from 'react';
import { Grid } from '@mantine/core';
import styles from './TrackGrid.module.scss';

const TrackGrid = ({ tracks }) => {
   return (
      <Grid className={styles['track-grid']} grow>
         {tracks.map((item, i) => (
            <Grid.Col key={i}>
               <img src={item.track.album.images[1].url} alt={item.track.name} />
            </Grid.Col>
         ))}
      </Grid>
   );
};

export default TrackGrid;
