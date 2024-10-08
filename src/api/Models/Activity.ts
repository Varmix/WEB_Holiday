import {Location, LocationSendFormActivity} from './Location.ts';

export type Activity = {
  id: string;
  name: string;
  description: string;
  price: number;
  startDate: string;
  endDate: string;
  location: Location;
  activityPath: string;
  holidayId: string;
};

export type ActivitySendForm = {
  name: string;
  description?: string;
  price?: number;
  startDate?: string;
  endDate?: string;
  location?: LocationSendFormActivity;
  holidayId: string;
};

export type ActivityMutation = Omit<Activity, 'id'>;
