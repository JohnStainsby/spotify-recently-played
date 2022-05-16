# Spotify Recently Played

A web application that displays a grid of recently played tracks for a Spotify user. Each track on the grid is shown with the album art, track title and artist name.

The sidebar shows a list of recently played artists. Artists can be selected to filter the main track grid.

The grid updates every 30 seconds to show up-to-date information.

## Getting Started

1. In the project directory run:

### `npm run start`

2. Open http://localhost:3000/ in a web browser.

3. Click the login button to authenticate with Spotify.

Note: Spotify requires apps in development mode to manually allow access to users, let me know the email address of the account you wish to test with and I will add it.

4. Tests can be run with:

### `npm run test`

## Requirements

-  Single-page application, using any modern web framework ✅

-  A user should be able to view a grid of their recently played tracks ✅

-  This should include a relevant image for each track✅

-  In a sidebar, a user should be able to view a list of all recently played artists✅

-  This should be in order of most recently played✅

-  On click of an artist, the grid of recently played tracks should be filtered by the relevant artist✅

-  On refresh of the page, any applied filter should be persisted✅

-  The displayed data should automatically update when a user listens to a new track (within 30 seconds)✅

## About

### Framework

The application is built with React using create-react-app to setup for speed and simplicity. Other options that could have been used include Next.js or configuring the project manually. If features like server side rendering were required or more control over build configurations then one of these options might have been a better choice.

Some parts of the application use items from the react CSS/component library Mantine. Other parts have been styled using SASS within CSS modules to scope styles to individual components.

The application uses Testing Library and Jest for automated testing.

## Potential Improvements

### Data fetching

I had initially built a more complex data fetching method using redux and the redux toolkit to query the API endpoints, I have left these files in the project under the services folder. However I felt that this was overkill for a small project and so reverted to a simpler method using the Fetch API. If the application got any more complicated then ideally this logic would be refactored into it's own component to handle fetching data or by using something like redux, this would make it easier to implement features such as error handling and caching.

#### Automatic grid update

Currently the grid updates every 30 seconds to show the latest tracks played by the user automatically. This is implemented by polling the API every 30 seconds which is not the most efficient method as most of the requests won't result in new data. A better method would be to implement "push" events to the client when the data changes on the server using something like websockets, long polling or server sent events.

### Authentication/Security

The client ID for the spotify app is in a config file and is checked into GitHub, this is not best practice, the id will be publicly available if the repository is visible. I have left it like this for simplicity to allow other parties to easily run the code. The connected spotify app will be removed after a period of time.

Once authenticated the API access token is stored in local storage and is valid for 1 hour before the user is required to re-authenticate.

It's possible that local storage could be compromised by a cross-site scripting (XSS) attack. A 3rd party library could be injected with code to extract objects from local storage obtaining the access token. The risk of this is reduced or could further be reduced by:

-  limiting the number of 3rd party libraries and ensuring that they are trustworthy and kept up-to-date

-  use session storage rather than local storage for objects that don't need to persist browser sessions

-  ensure access tokens expire after a period of time

### Accessibility

I haven't given much time to accessibility, the application has not been tested against industry standards e.g. WCAG 2.1

General consideration was given in terms of rendering standard compliant HTML, colour contrast, font-size and layout.

### Styling

The styling is basic, it could definitely be improved in a number of ways:

-  animating between states (when logging in/out and filtering the grid)

-  more detailed empty state before a user logs in

-  alternate layouts of the items

-  check very long artist and track names and how they fit

The layout is responsive but further optimisation can be made for mobile devices. For example the sidebar is hidden on mobile with no way to show it.

### Functionality

-  Options to sort the grid

-  Ability to search the grid for specific tracks/artists

### Testing

There are test for each component of the application but further testing would be desirable.

With more time I would add integration testing to test different parts of the application interacting and end-to-end testing in a browser like envirnment.

Fake API data is used to test some of the components, a more complete dataset would be required to test further.

### Documentation

In addition to this readme there are comments throughout the code for each component and their properties. In a larger application I would suggest an automated documentation tool such as React Styleguidist or Storybook UI for managing a larger library of components.

There are no on-page help instructions or title attributes to help users navigate the site. On page help is preferable as it helps the user immediately before the need to rely on separate manuals or documentation.

### Error handling

With more time I would add more robust UI implementation for errors that occur within the application. These would ensure that the application could fail and fallback gracefully if an error occurred e.g. failing to get a response from the API, auto retrying then notifiying the user.
