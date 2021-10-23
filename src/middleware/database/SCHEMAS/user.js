/* SCHEME OF THE USER DOCUMENT */

const userScheme = (userData) => {
  return {
    ...userData,
    settings: {
      volume: '50',
      brightness: '100',
      leds: {
        color: 'white',
      },
      widgets: {
        news: {
          visible: true / false,
          settings: {
            topics: {
              health: true / false,
              sport: true / false,
              business: true / false,
              technology: true / false,
              entertainment: true / false,
            },
          },
        },
        weather: {
          visible: true / false,
          settings: {
            location: 'Wrocław',
          },
        },
      },
    },
  };
};

module.exports = userScheme;
