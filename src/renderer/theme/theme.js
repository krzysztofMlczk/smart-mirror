import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    // used to represent primary interface elements for a user.It's the color displayed most frequently across your app's screens and components.
    primary: {
      // light: will be calculated from palette.primary.main (has to be RGBA!)
      main: 'rgba(40, 31, 53, 1)',
      // dark: will be calculated from palette.primary.main
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    // used to represent secondary interface elements for a user. It provides more ways to accent and distinguish your product. Having it is optional.
    secondary: {
      // light: will be calculated from palette.secondary.main
      main: '#ffffff',
      // dark: will be calculated from palette.secondary.main
      // contrastText: will be calculated to contrast with palette.secondary.main
    },
    success: {
      main: '#e36bae',
    },
  },
  // this causes errors in the console (better to set elevation for each element separately)
  // shadows: ['none'], // disable shadows globally (elevation 0)
});

export default theme;
