import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import HolidayApi from '../EndPoints/HolidayApi.ts';
import { HolidayMutation } from '../Models/Holiday.ts';
import { holidayKeys } from '../Querykeys.ts';

export const useCreateHoliday = () => {
  const client = useQueryClient();
  return useMutation((holiday: HolidayMutation) => HolidayApi.createHoliday(holiday), {
    onSuccess: () => {
      // L'invalidation se fait asynchronement mais ne renvoie pas de données, donc pas besoin du .then()
      client.invalidateQueries(holidayKeys.all);
    },
  });
};

export const useGetAllHoliday = (participantId : string) => {
  return useQuery({
    queryKey: holidayKeys.list(),
    queryFn: () => HolidayApi.getAllHoliday(participantId).then((content) => content.data),
    initialData: [],
  });
};

export const useGetHolidayById = (holidayId: string) => {
  return useQuery({
    queryKey: holidayKeys.all,
    queryFn: () => HolidayApi.getHolidayById(holidayId).then((content) => content.data),
    initialData: {},
  });
};

export const useGetAllHolidayCountForDate = (date : string) => {
  return useQuery({
    queryKey: ['holiday'],
    queryFn: () => HolidayApi.getAllHolidayCountForDate(date).then((content) => content.data),
    initialData: 0,
  });
};
