import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QuranEdition } from '../Components/interfaces/VersesData';

function getRandomNumber() {
  const min = 1;
  const max = 6236;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const useTodayVerse = () => {
  const randomNumber = getRandomNumber();

  return useQuery<QuranEdition>({
    queryKey: ['todayVerse'],
    queryFn: async () => {
      const response = await axios.get<QuranEdition>(
        `http://api.alquran.cloud/v1/ayah/${randomNumber}`
      );
      return response.data;
    },
    staleTime: Infinity,
  });
};