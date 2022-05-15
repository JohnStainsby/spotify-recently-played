import { render, screen } from '@testing-library/react';
import { AuthProvider } from './contexts/useAuth';
import App from './App';

test('login button shows when no user is authenticated', () => {
   render(
      <AuthProvider>
         <App />
      </AuthProvider>
   );
   const clearButton = screen.getByTestId('button-login');
   expect(clearButton).toBeInTheDocument();
});

test('recently played grid does not show when no user is authenticated', () => {
   render(
      <AuthProvider>
         <App />
      </AuthProvider>
   );
   const trackGrid = screen.queryByTestId('track-grid');
   expect(trackGrid).toBeNull();
});

test('artist list does not show when no user is authenticated', () => {
   render(
      <AuthProvider>
         <App />
      </AuthProvider>
   );
   const artistList = screen.queryByTestId('artist-list');
   expect(artistList).toBeNull();
});
