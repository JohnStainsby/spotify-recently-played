import { render, screen } from '@testing-library/react';
import TrackGrid from './TrackGrid';

const fakeData = [
   {
      track: {
         album: {
            images: [
               { url: 'http://localhost:3000/logo192.png' },
               { url: 'http://localhost:3000/logo192.png' },
               { url: 'http://localhost:3000/logo192.png' },
            ],
         },
         artists: [
            {
               id: '123456',
               name: 'Test Artist',
            },
            {
               id: 'abcdef',
               name: 'Another Artist',
            },
         ],
         name: 'Test track name',
      },
   },
];

test('render grid', () => {
   render(<TrackGrid items={fakeData} />);
});

test('filter grid when artist is selected', () => {
   render(<TrackGrid items={fakeData} filterOnArtist='123456' />);
   const items = screen.queryAllByTestId('track-grid-item');
   expect(items).toHaveLength(1);
});
