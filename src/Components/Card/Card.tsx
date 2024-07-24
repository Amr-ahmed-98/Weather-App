import React from 'react';
import Loader from '../Loader/Loader';
import { WeatherData } from '../interfaces/WeatherData';
import { FaWind } from 'react-icons/fa';
import { WiHumidity } from "react-icons/wi";
import { FaEye } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

interface CardProps {
  weatherData: WeatherData;
  currentDate?: Date;
}

function formatDate(date: Date): string {
  const today = new Date();
  const isToday = date.toDateString() === today.toDateString();

  const formatter = new Intl.DateTimeFormat('en-GB', {
      weekday: isToday ? undefined : 'long',
      day: '2-digit',
      month: 'short',
      year: '2-digit'
  });

  const parts = formatter.formatToParts(date);
  const formattedDate = parts.map(part => part.value).join(' ').trim();

  return isToday ? `today, ${formattedDate}` : formattedDate;
}

const currentDate = new Date(); 

const Card: React.FC<CardProps> = ({ weatherData }) => {
  if (!weatherData.location) {
    return <Loader />;
  }

  console.log(weatherData);
  

  return (
    <div className='card bg-graidientBg text-primary-content shadow-xl'>
      <div className='card-body'>
        <h2 className='card-title text-white text-md'>
          {formatDate(currentDate)}
          <p className='text-white  text-end'>
            {weatherData.current?.condition.text}</p>
        </h2>
        <div className='flex items-center'>
          <CiLocationOn className='text-white '/>
        <p className='text-white text-sm flex px-1'> {weatherData.location.name}</p>

        </div>
        <div className='flex flex-col items-center relative'>
          <span className='text-[84px] font-medium bg-clip-text text-transparent bg-gradient-to-b from-white to-transparent absolute top-0 '>
            {weatherData.current?.temp_c}°
          </span>
          <img
            src={weatherData.current?.condition.icon}
            className='w-[292px]'
            alt='weather icon'
          />
        </div>
        <div className='flex items-center justify-between'>
          <div className='relative w-[100px] '>
            <div className='after:absolute after:h-16 after:w-[1px] after:bg-white after:right-0 after:top-5 flex flex-col items-center'>
              <i className='text-white text-4xl'>
                <FaWind />
              </i>
              <p className='text-white'>{weatherData.current?.wind_kph} km/h</p>
              <p className='text-white'>
                wind
              </p>
            </div>
          </div>
          <div className='relative w-[100px] '>
            <div className='after:absolute after:h-16 after:w-[1px] after:bg-white after:right-0 after:top-5 flex flex-col items-center'>
              <i className='text-white text-4xl'>
              <WiHumidity />
              </i>
              <p className='text-white'>{weatherData.current?.humidity} %</p>
              <p className='text-white'>
              humidity
              </p>
            </div>
          </div>
          <div className=' w-[100px] '>
            <div className='flex flex-col items-center'>
              <i className='text-white text-4xl'>
              <FaEye />
              </i>
              <p className='text-white'>{weatherData.current?.vis_km} km/h</p>
              <p className='text-white'>
              Visibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
