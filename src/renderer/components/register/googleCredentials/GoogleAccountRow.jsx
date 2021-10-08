import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';

const useStyles = makeStyles((theme) => ({
  frame: {
    borderWidth: '2px',
    borderColor: theme.palette.success.main,
    borderStyle: 'solid',
    padding: theme.spacing(1),
    boxShadow: `0 0 10px 2px ${theme.palette.success.main}`,
  },
  googleAvatar: {
    width: '100%',
    backgroundColor: 'white',
  },
  text: {
    paddingLeft: theme.spacing(2),
    wordWrap: 'break-word',
  },
  email: {
    opacity: 0.6,
  },
  checkIcon: {
    color: theme.palette.success.main,
    margin: '0 auto',
  },
  changeAccountBtn: {
    marginTop: theme.spacing(3),
    width: '100%',
  },
}));

const GoogleAccountRow = ({ user }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.frame}>
        <Grid item xs={3}>
          <img
            src={user.pictureUrl} // TODO: add color inversion when black image!
            alt="Not available"
            className={classes.googleAvatar}
          />
        </Grid>
        <Grid item xs={7} className={classes.text}>
          <Typography variant="h5">{user.displayName}</Typography>
          <Typography variant="body1" className={classes.email}>
            {user.email}
          </Typography>
        </Grid>
        <Grid container item justifyContent="center" xs={2}>
          <DoneRoundedIcon fontSize="large" className={classes.checkIcon} />
        </Grid>
      </Grid>
    </>
  );
};

export default GoogleAccountRow;
