import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import NewsFeedContent from './NewsFeedContent';
// API KEY: 91160a551f32429d8ed0a5350ec35174

const useStyles = makeStyles({
  root: {
    height: 'inherit',
    width: 'inherit',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
    textAlign: 'center',
  },
});

const API =
  'https://newsapi.org/v2/top-headlines?country=us&apiKey=91160a551f32429d8ed0a5350ec35174';

const NewsFeedWidget = () => {
  const newsDuration = 15; // news duration in seconds
  const [news, setNews] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(newsDuration);
  const classes = useStyles();
  const { source, title, description, url } =
    news.length && news[Math.min(currentNewsIndex, news.length - 1)];

  useEffect(() => {
    if (currentNewsIndex === Math.max(news.length - 1, 0)) {
      fetch(API)
        .then((res) => res.json())
        .then((data) => {
          setNews(data.articles ? data.articles : []);
          setCurrentNewsIndex(0);
        })
        .catch((err) => {
          console.log(err);
          setNews([]);
          setCurrentNewsIndex(0);
        });
    }
  }, [currentNewsIndex]);

  useEffect(() => {
    // set interval for changing currently displayed news
    // Each news is displayed for 15s
    const interval = setInterval(() => {
      if (!paused) {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else {
          setCurrentNewsIndex((prevIndex) => prevIndex + 1);
          setSeconds(newsDuration);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={classes.root}>
      {news.length ? (
        <NewsFeedContent
          source={source}
          header={title}
          description={description}
          articleUrl={url}
          setPaused={setPaused}
        />
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  );
};

export default NewsFeedWidget;
