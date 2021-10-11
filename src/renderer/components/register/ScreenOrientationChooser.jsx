import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import BackNextBtn from '../buttons/BackNextBtn';

const useStyles = makeStyles({
  screen: {
    border: '2px solid white',
  },
  horizontal: {
    width: '200px',
    height: '100px',
  },
  vertical: {
    width: '100px',
    height: '200px',
  },
  selected: {
    opacity: '1',
  },
  notSelected: {
    opacity: '0.5',
  },
});

const ScreenOrientationChooser = ({ next, orientation, saveOrientation }) => {
  const [selectedOrientation, setSelectedOrientation] = useState(orientation);
  const classes = useStyles();

  const h = 'horizontal';
  const v = 'vertical';

  const onSelect = (newOrientation) => {
    if (newOrientation !== selectedOrientation) {
      window.middleware.screenOrientation.changeScreenOrientation(
        newOrientation
      );
      setSelectedOrientation(newOrientation);
    }
  };

  const onNext = () => {
    saveOrientation(selectedOrientation);
    next();
  };

  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid
          container // Warning: container prop has to be specified as first otherwise spacing doesn't work
          item
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          xs={6}
          onClick={() => onSelect(h)}
          className={
            selectedOrientation === h ? classes.selected : classes.notSelected
          }
        >
          <Grid item>
            <div className={`${classes.screen} ${classes.horizontal}`} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Horizontal</Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          justifyContent="flex-end"
          spacing={2}
          xs={6}
          onClick={() => onSelect(v)}
          className={
            selectedOrientation === v ? classes.selected : classes.notSelected
          }
        >
          <Grid item>
            <div className={`${classes.screen} ${classes.vertical}`} />
          </Grid>
          <Grid item>
            <Typography variant="h5">Vertical</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Box textAlign="center" mt={5}>
        <BackNextBtn
          variant="next"
          disabled={!selectedOrientation}
          onClick={onNext}
        >
          Continue
        </BackNextBtn>
      </Box>
    </Container>
  );
};

export default ScreenOrientationChooser;
