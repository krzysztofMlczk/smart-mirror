import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    // used to represent primary interface elements for a user.It's the color displayed most frequently across your app's screens and components.
    primary: {
      // light: will be calculated from palette.primary.main
      main: '#000000',
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
  },
});

export default theme;
