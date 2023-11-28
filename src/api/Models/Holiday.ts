import { Location, LocationSendFormHoliday } from './Location.ts';
import { Activity } from './Activity.ts';
import { Participant } from './Participant.ts';

export type Holiday = {
  id: string;
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  location: Location;
  participants: Participant[];
  isPublish: boolean;
  activities: Activity[];
  holidayPath: string;
};

export type HolidaySendForm = {
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  location: LocationSendFormHoliday;
  uploadedHolidayPicture: File | null;
};

export type HolidayMutation = Omit<Holiday, 'id'>;
