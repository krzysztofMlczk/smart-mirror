const GOOGLE_ENDPOINT = 'https://www.googleapis.com/calendar/v3';

function getMinMaxDate(dayShift) {
  const today = new Date();
  today.setMilliseconds(0);
  today.setSeconds(0);
  today.setMinutes(0);
  today.setHours(0);
  today.setDate(today.getDate() + dayShift);
  const timeMin = today.toISOString();
  const tomorrow = today;
  tomorrow.setDate(today.getDate() + 1);
  const timeMax = tomorrow.toISOString();

  return { timeMin, timeMax };
}

function parseDateToHour({ dateTime }) {
  const date = new Date(dateTime);
  return date.toLocaleTimeString(navigator.language, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 *
 * @param {*} accessToken - google access token
 * @param {*} calendarId - user's gmail address (there is only one callendar for each google account)
 *
 * @returns response Promise resolving to array of events from today + dayShift: [
 *
 * ]
 */
function getCalendarEvents(accessToken, calendarId, dayShift) {
  const { timeMin, timeMax } = getMinMaxDate(dayShift);
  const url = `${GOOGLE_ENDPOINT}/calendars/${calendarId}/events?singleEvents=true&orderBy=startTime&timeMin=${timeMin}&timeMax=${timeMax}`;
  const response = fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((data) => data.json())
    .then(({ items }) =>
      items.map(({ id, summary, start, end }) => ({
        id,
        summary,
        start: parseDateToHour(start),
        end: parseDateToHour(end),
      }))
    );

  return response;
}

module.exports = {
  getCalendarEvents,
};
