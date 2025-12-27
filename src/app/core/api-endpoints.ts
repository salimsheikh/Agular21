import { environment } from '../../environments/environment';

export const API = {
  DASHBOARD_SUMMARY: `${environment.apiBaseUrl}/dashboard/summary`,
  LOGIN: `${environment.apiBaseUrl}/account/login`,
  LOGOUT: `${environment.apiBaseUrl}/account/logout`,
  LOCATION: `${environment.apiBaseUrl}/location`  
};
