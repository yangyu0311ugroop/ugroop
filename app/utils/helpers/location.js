// once there are more full-size pages, we need to refactor this function
import { URL_HELPERS } from 'appConstants';

export const isMaxSize = match => URL_HELPERS.isDashboardPage(match);
