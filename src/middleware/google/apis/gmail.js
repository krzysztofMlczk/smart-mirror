/* eslint-disable */
const GOOGLE_ENDPOINT = 'https://gmail.googleapis.com';

async function markAsRead(userId, accessToken, messageId) {
  const url = `${GOOGLE_ENDPOINT}/gmail/v1/users/${userId}/messages/${messageId}/modify`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      removeLabelIds: ['UNREAD'],
    }),
  }).then((data) => data.json());

  return response;
}

/**
 * Fetches gmail messages using access token
 *
 * @param userId - id of user on whose behalf the request is performed
 * @param accessToken - google access token of the user
 * @param maxMsgs - maximum amount of messages
 *
 * @returns Promise resolving to response array of UNREAD msgs: [
 * {
 *  id,
 *  from,
 *  date,
 *  snipet,
 *  body,
 * },
 * ...
 * ]
 */
function getMessages(userId, accessToken, maxMsgs) {
  const url = `${GOOGLE_ENDPOINT}/gmail/v1/users/${userId}/messages?maxResults=${maxMsgs}&labelIds=UNREAD`;
  const msgUrl = `${GOOGLE_ENDPOINT}/gmail/v1/users/${userId}/messages`;

  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let resData;
        if (res.messages) {
          resData = Promise.all(
            res.messages.map(({ id }) =>
              fetch(`${msgUrl}/${id}`, {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              })
                .then((data) => data.json())
                .then((parsed) => {
                  const from = parsed.payload.headers.find(
                    ({ name }) => name === 'From'
                  ).value;
                  const date = parsed.payload.headers.find(
                    ({ name }) => name === 'Date'
                  ).value;
                  return {
                    id: parsed.id,
                    from,
                    date,
                    snipet: parsed.snippet,
                    body: getBody(parsed.payload).text,
                  };
                })
            )
          );
        } else {
          resData = [];
        }
        resolve(resData);
      })
      .catch((err) => console.log(err));
  });
}

/**
 * Get body and decode
 * @param {object} payload
 * @returns {object} text, html
 */
function getBody(payload) {
  let result = {
    text: '',
    html: '',
  };

  if (payload.hasOwnProperty('parts')) {
    payload.parts.forEach((part) => {
      if (part.mimeType === 'text/plain') {
        result.text = atob(
          part.body.data.replace(/-/g, '+').replace(/_/g, '/')
        );
      }
    });
  } else {
    if (!!payload.body.size) {
      result.text = atob(
        payload.body.data.replace(/-/g, '+').replace(/_/g, '/')
      );
    }
  }
  return result;
}

module.exports = {
  getMessages,
  markAsRead,
};
