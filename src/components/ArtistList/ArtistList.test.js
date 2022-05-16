import { render, screen, fireEvent } from '@testing-library/react';
import ArtistList from './ArtistList';

// Create mock data to represent API call
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

test('render list', () => {
   render(<ArtistList items={fakeData} />);
});

test('clear button is hidden when no artist selected', () => {
   render(<ArtistList items={fakeData} />);
   const clearButton = screen.queryByTestId('button-clear-selected');

   //The clear button won't be rendered id no artist is selected so this should be null
   expect(clearButton).toBeNull();
});

test('clear button is shown when artist is selected', () => {
   render(<ArtistList items={fakeData} selectedArtist='123456' />);
   const clearButton = screen.getByTestId('button-clear-selected');
   expect(clearButton).toBeInTheDocument();
});

test('selected artist has appropriate css class', () => {
   render(<ArtistList items={fakeData} selectedArtist='123456' />);
   const artistLabel = screen.getByText('Test Artist');
   expect(artistLabel).toHaveClass('selected');
});

test('calls setSelectedArtist when artist is clicked', () => {
   const handleClick = jest.fn();
   render(<ArtistList items={fakeData} setSelectedArtist={handleClick} />);
   fireEvent.click(screen.getByText('Test Artist'));
   expect(handleClick).toHaveBeenCalledTimes(1);
});
