// IMPORT WIDGET ICONS
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import ChatIcon from '@material-ui/icons/Chat';
import EuroSymbolIcon from '@material-ui/icons/EuroSymbol';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
// IMPORT WIDGET
import CalendarWidget from './calendarWidget/CalendarWidget';
import ClockWidget from './clockWidget/ClockWidget';
import ComplimentWidget from './ComplimentWidget';
import CurrenciesWidget from './CurrenciesWidget';
import MailboxWidget from './mailboxWidget/MailboxWidget';
import WeatherWidget from './WeatherWidget';

/* --- IDs OF ALL AVAILABLE WIDGETS --- */
export const widgetIds = {
  calendar: 'calendar',
  clock: 'clock',
  compliment: 'compliment',
  currencies: 'currencies',
  mailbox: 'mailbox',
  weather: 'weather',
};

/* --- widgetId -> Icon MAPPING --- */
/* widget id is mapped to icon that will be displayed in toolBox */
export const widgetIdToIcon = {
  [widgetIds.calendar]: CalendarTodayIcon,
  [widgetIds.clock]: AccessTimeIcon,
  [widgetIds.compliment]: ChatIcon,
  [widgetIds.currencies]: EuroSymbolIcon,
  [widgetIds.mailbox]: MailOutlineIcon,
  [widgetIds.weather]: WbSunnyIcon,
};

/* --- widgetId -> Component MAPPING --- */
/* widget id is mapped to component that will be displayed in Grid Layout */
export const widgetIdToComponent = {
  [widgetIds.calendar]: CalendarWidget,
  [widgetIds.clock]: ClockWidget,
  [widgetIds.compliment]: ComplimentWidget,
  [widgetIds.currencies]: CurrenciesWidget,
  [widgetIds.mailbox]: MailboxWidget,
  [widgetIds.weather]: WeatherWidget,
};
