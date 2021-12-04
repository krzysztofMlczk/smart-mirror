import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import useWindowDimensions from 'renderer/hooks/useWindowDimensions';

const useStyles = makeStyles({
  root: {
    height: 'inherit',
    width: 'inherit',
    overflowY: 'hidden',
  },
  shiftUp: {
    marginTop: '-25px', // deny top padding of the component (it is not useful)
  },
});

const customStyles = {
  fontFamily: 'Helvetica, sans-serif',
  gradientStart: 'rgb(40, 31, 53)',
  gradientMid: 'rgb(40, 31, 53)',
  gradientEnd: 'rgb(40, 31, 53)',
  locationFontColor: '#FFF',
  todayTempFontColor: '#FFF',
  todayDateFontColor: 'rgba(255, 255, 255, 0.7)',
  todayRangeFontColor: '#B5DEF4',
  todayDescFontColor: 'rgba(255, 255, 255, 0.7)',
  todayInfoFontColor: 'rgba(255, 255, 255, 0.5)',
  todayIconColor: '#FFF',
  forecastBackgroundColor: 'rgb(40, 31, 53)',
  forecastSeparatorColor: 'rgba(255, 255, 255, 0.5)',
  forecastDateColor: 'rgba(255, 255, 255, 0.6)',
  forecastDescColor: 'rgba(255, 255, 255, 0.5)',
  forecastRangeColor: 'rgba(255, 255, 255, 0.7)',
  forecastIconColor: 'rgb(142, 115, 180)',
};

const WeatherWidget = () => {
  const classes = useStyles();
  const { height } = useWindowDimensions();
  const [coordinates, setCoordinates] = useState(null);
  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '9b8235da36ebb6b0250b78e50b901276',
    lat: coordinates ? coordinates.lat : '0',
    lon: coordinates ? coordinates.lon : '0',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });

  useEffect(() => {
    const apiKey = '0a5456cb6c8c7db0dd6eb65cf74439865d7833238006c791e9bf436e';
    fetch(`https://api.ipdata.co?api-key=${apiKey}`)
      .then((res) => res.json())
      .then((locationData) => {
        setCoordinates({
          lat: locationData.latitude,
          lon: locationData.longitude,
        });
        return data.ip;
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.shiftUp}>
        <ReactWeather
          isLoading={isLoading}
          errorMessage={errorMessage}
          data={data}
          lang="en"
          theme={customStyles}
          unitsLabels={{ temperature: '\u00BAC', windSpeed: 'Km/h' }}
          showForecast={height >= 1045}
        />
      </div>
    </div>
  );
};

export default WeatherWidget;
