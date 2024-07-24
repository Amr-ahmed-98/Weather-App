import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useGeoLocation from "../../Hooks/useGeoLocation";
import { useContext } from "react";
import { searchContex } from "../../Context/searchContext";



function getNextSevenDays(): string[] {
    const today = new Date();
    const nextSevenDays: string[] = [];
  
    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const isTomorrow = i === 1;
  
      const formatter = new Intl.DateTimeFormat('en-GB', {
        weekday: 'long',
        day: '2-digit',
        month: 'short',
      });
  
      const parts = formatter.formatToParts(date);
      const weekday = parts.find(part => part.type === 'weekday')?.value || '';
      const day = parts.find(part => part.type === 'day')?.value || '';
      const month = parts.find(part => part.type === 'month')?.value || '';
  
      let formattedDate = `${weekday}, ${day} ${month}`;
      
      if (isTomorrow) {
        formattedDate = `Tomorrow, ${day} ${month}`;
      }
  
      nextSevenDays.push(formattedDate);
    }
  
    return nextSevenDays;
  }
  
  const get7days = getNextSevenDays();
  
  const CardDays = () => {
    const tomorrow = get7days[0];
    const reorderedDays = [...get7days.slice(1), tomorrow];

   

    const {coordinates, loaded, error} = useGeoLocation();
    const { lat, lng } = coordinates;
    const apiKey = import.meta.env.VITE_API_KEY;
  
    if (!apiKey) {
      throw new Error('No API key provided');
    }
  
    const cleanApiKey = apiKey.replace(/^['"%]|['"%];?$/g, '');

    const context = useContext(searchContex);

    if (!context) {
        throw new Error("useWeatherData must be used within a SearchProvider");
    }

    const { search } = context;

    const query = search.length > 4 ? search : `${lat},${lng}`;
  
    

    const {  data } = useQuery({
      queryKey: ['cardDays'],
      queryFn: async () => {
        if (!loaded || error || !lat || !lng) {
          throw new Error('Location not available');
        }
        return await axios.get(`http://api.weatherapi.com/v1/forecast.json`, {
          params: {
            key: cleanApiKey,
            q: query,
            days : 7,
          },
        });
      },
      enabled: !!lat && !!lng,
    });

 

    return (
      <div className="card bg-white  shadow-xl">
      <h2 className="card-title text-black text-2xl font-bold p-4">Next 7 days</h2>
      <div>
        {reorderedDays.map((day, index) => (
          <div 
            key={index} 
            className={`flex items-center px-2 ${day.startsWith('Tomorrow') ? 'bg-graidientBg rounded-md text-white' : ''} py-[3px]`}
          >
            <p className={`flex-1 ${day.startsWith('Tomorrow') ? 'font-bold' : 'text-black'}`}>
              {day}
            </p>
            <div className="w-[50px] flex justify-center">
              <img 
                src={`${data?.data?.forecast?.forecastday[index]?.day?.condition.icon}`} 
                className="w-[50px]" 
                alt="icon" 
              />
            </div>
            <p className={`flex-1 text-right ${day.startsWith('Tomorrow') ? 'text-white' : 'text-black'}`}>
              {data?.data?.forecast?.forecastday[index]?.day?.avgtemp_c}°C
            </p>
          </div>
        ))}
      </div>
    </div>
    );
  };
  
  export default CardDays;