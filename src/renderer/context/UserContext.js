import { createContext } from 'react';

/**
 * Context that allows user data to be accessible
 * in all Consumer components
 *
 * It may be compared to global storage
 */

/**
 * UserContext Structure
 * [defaults to null]
 * {
 *  --TAKEN FROM DB--
 *  userName: "usrNm",
 *  avatar: "https://avatars.dicebear.com/api/bottts/usrNm.svg",
 *  --FETCHED FROM GOOGLE--
 *  accessToken: "a0ARrdaM-OOl01IvK2IBKLkCyUgyPPnzVHCVarSUyuIngZ5-kdpElKijt3xpRbjDg-BIgB-tKzVnY9miFufxXjUDnw0UUx23NYh-wKPGah3wmv4RvW3ya-KNgVuPfcC28KFUcRCEaNphQ7cbkAZjwEhr9VX_JJ",
 *  expiresIn: 3599,
 *  tokenType: "Bearer",
 *  idToken,
 *  email: "usrNm@gmail.com",
 *  locale: "en",
 *  name: "Usr Nm",
 *  picture: "https://lh3.googleusercontent.com/a-/AOh14Ggv8M0zrMqzLCmg4pqn_9s_2qXmsJ_Qb1BuHMKm=",
 * }
 *
 */
export default createContext(null);
