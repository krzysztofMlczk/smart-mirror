import React, { useEffect, useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { RadioBrowserApi } from 'radio-browser-api';
import AudioPlayer from 'react-h5-audio-player';

const filters = [
  'all',
  'classical',
  'country',
  'dance',
  'disco',
  'house',
  'jazz',
  'pop',
  'rap',
  'retro',
  'rock',
];

const useStyles = makeStyles({
  root: {
    height: 'inherit',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  topBar: {
    width: '60%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid white',
  },
});

export default function Radio() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState('all');
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const classes = useStyles();

  const setupApi = async (currentFilter) => {
    const api = new RadioBrowserApi(fetch.bind(window), 'My Radio App');

    const availableStations = await api
      .searchStations({
        language: 'english',
        tag: currentFilter,
        limit: 30,
      })
      .then((data) => {
        return data;
      });

    return availableStations;
  };

  useEffect(() => {
    setupApi(stationFilter)
      .then((data) => {
        setStations(data);
        setCurrentStationIndex(0);
      })
      .catch((err) => console.log(err));
  }, [stationFilter]);

  const changeStation = (direction) => {
    setCurrentStationIndex((prevIndex) => {
      console.log('clicked');
      /* eslint-disable no-else-return */
      if (direction === 'next') {
        return (prevIndex + 1) % stations.length;
      } else if (direction === 'prev') {
        return prevIndex - 1 < 0 ? stations.length - 1 : prevIndex - 1;
      }
      return prevIndex;
    });
  };

  const handleGenreChange = (event) => {
    setStationFilter(event.target.value);
  };

  const setDefaultSrc = (event) => {
    event.target.src =
      'https://cdn.pixabay.com/photo/2016/09/16/19/18/microphone-1674903_960_720.png';
  };

  return (
    <div className={classes.root}>
      <div className={classes.topBar}>
        <Typography>Radio</Typography>
        <FormControl variant="outlined">
          <InputLabel id="demo-simple-select-outlined-label">Genre</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={stationFilter}
            onChange={handleGenreChange}
            label="Age"
          >
            {filters.map((filter) => (
              <MenuItem key={filter} value={filter}>
                {filter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {stations ? (
        <>
          <div className="stationName">
            <img
              className="logo"
              src={stations[currentStationIndex].favicon}
              alt="station logo"
              onError={setDefaultSrc}
            />
            <Typography
              className="name"
              variant="overline"
              display="block"
              noWrap
              style={{ lineHeight: '15px' }}
            >
              {stations[currentStationIndex].name}
            </Typography>
          </div>
          <AudioPlayer
            className="player"
            layout="stacked"
            showSkipControls
            showJumpControls={false}
            onClickNext={() => changeStation('next')}
            onClickPrevious={() => changeStation('prev')}
            src={stations[currentStationIndex].urlResolved}
            customProgressBarSection={[]}
            customControlsSection={['MAIN_CONTROLS', 'VOLUME_CONTROLS']}
          />
        </>
      ) : (
        <CircularProgress color="secondary" />
      )}
    </div>
  );
}
