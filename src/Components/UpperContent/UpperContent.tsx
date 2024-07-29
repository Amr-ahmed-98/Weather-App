import { useContext, useState } from 'react';
import ToggleSwitch from '../themeChanger/ToggleSwitch';
import { searchContex } from '../../Context/searchContext';
import Notification from '../Notification/Notification';
import { ThemeContext } from '../../Context/themeContext';

const UpperContent = () => {
  const [searchInput, setSearchInput] = useState('');
  const sContext = useContext(searchContex);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const themeCTX = useContext(ThemeContext);

  if (!themeCTX) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }
  const { isDarkMode } = themeCTX;

  if (!sContext) {
    return null;
  }

  const { setSearch } = sContext;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearch(e.target.value);
  };

  return (
    <div className='flex items-center justify-between gap-5 '>
      <div className='flex-grow'>
        <label className='input input-bordered bg-white rounded-3xl flex items-center gap-2'>
          <input
            type='text'
            className='grow'
            value={searchInput}
            onChange={handleSearchChange}
            placeholder='Search for a city'
          />
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 16 16'
            fill='currentColor'
            className='h-4 w-4 opacity-70 '
          >
            <path
              fillRule='evenodd'
              d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
              clipRule='evenodd'
            />
          </svg>
        </label>
      </div>
      <div>
        <ToggleSwitch />
      </div>
      <div>
        <div
          className='rounded-full p-1 inline-block '
          onClick={() => setIsClicked(!isClicked)}
        >
          <div className='indicator cursor-pointer'>
            {!isDarkMode ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='black'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  fill='none'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-7 w-7'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='white'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  fill='none'
                  d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
                />
              </svg>
            )}
            {!isClicked ? (
              <span className='badge badge-xs badge-error indicator-item'></span>
            ) : null}
          </div>
          {isClicked && <Notification />}
        </div>
      </div>
    </div>
  );
};

export default UpperContent;
