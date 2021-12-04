import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    padding: '0 7%',
  },
  desc: {
    fontStyle: 'italic',
    fontWeight: '300',
  },
  btn: {
    marginTop: '20px',
  },
  source: {
    opacity: 0.5,
  },
});

const NewsFeedContent = ({
  source,
  header,
  description,
  articleUrl,
  setPaused,
}) => {
  const [descVisible, setDescVisible] = useState(false);
  const onTap = (val) => {
    setPaused(val);
    setDescVisible(val);
  };

  const classes = useStyles();
  return (
    <div className={classes.container}>
      {descVisible ? (
        <>
          <Typography
            className={classes.desc}
            variant="h6"
            onClick={() => onTap(false)}
          >
            {description || 'No description available'}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => window.middleware.web.openBrowser(articleUrl)}
            className={classes.btn}
          >
            Read more
          </Button>
        </>
      ) : (
        <>
          <Typography className={classes.source}>{source.name}</Typography>
          <Typography variant="h5" onClick={() => onTap(true)}>
            {header.substr(0, header.lastIndexOf('-'))}
          </Typography>
        </>
      )}
    </div>
  );
};

export default NewsFeedContent;
