import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  hint: {
    fontSize: '20px',
    lineHeight: '35px',
    marginTop: '35px',
  },
});

const Hint = ({ timeout }) => {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), timeout * 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Typography
      align="center"
      variant="overline"
      display="block"
      className={classes.hint}
    >
      {visible ? 'Having troubles?' : ''}
      <br />
      {visible ? 'Try options below ;)' : ''}
    </Typography>
  );
};

export default Hint;
