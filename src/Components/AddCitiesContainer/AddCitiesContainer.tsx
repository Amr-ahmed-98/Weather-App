import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import AddCitiesCard from '../AddCitiesCard/AddCitiesCard';

const AddCitiesContainer = () => {
  const [isClicked, setIstClicked] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('Select a city');
  const [savedCities, setSavedCities] = useState<string[]>([]);

  useEffect(() => {
    const loadedCities = JSON.parse(
      localStorage.getItem('savedCities') || '[]'
    );
    setSavedCities(loadedCities);
  }, []);

  const addCityToLocalStorage = (city: string) => {
    const updatedCities = [...savedCities];
    if (!updatedCities.includes(city)) {
      updatedCities.push(city);
      localStorage.setItem('savedCities', JSON.stringify(updatedCities));
      setSavedCities(updatedCities);
    }
  };

  return (
    <div className='overflow-scroll max-h-[400px]'>
        {isClicked === false ? (
          <div
            className='border-black border-2 border-dashed rounded-md cursor-pointer py-5 px-5 flex gap-3 items-center mb-5 dark:border-white'
            onClick={() => setIstClicked(!isClicked)}
          >
            <FaPlus className=' text-black bg-white w-[40px] h-[40px] p-2 rounded-md ' />
            <span className='text-black dark:text-white '>
              Add cities you are interested in
            </span>
          </div>
        ) : null}
        {isClicked == true ? (
          <>
            <select
              className='select select-bordered w-[80%]   bg-white text-black'
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option disabled selected>
                Select a city
              </option>
              <option value='Paris'>Paris</option>
              <option value='New York'>New York</option>
              <option value='Tokyo'>Tokyo</option>
              <option value='London'>London</option>
              <option value='Rome'>Rome</option>
              <option value='Dubai'>Dubai</option>
              <option value='Hong Kong'>Hong Kong</option>
              <option value='Singapore'>Singapore</option>
              <option value='Istanbul'>Istanbul</option>
              <option value='Barcelona'>Barcelona</option>
              <option value='Rio de Janeiro'>Rio de Janeiro</option>
              <option value='Sydney'>Sydney</option>
              <option value='Amsterdam'>Amsterdam</option>
              <option value='Cairo'>Cairo</option>
              <option value='Moscow'>Moscow</option>
              <option value='Berlin'>Berlin</option>
              <option value='Bangkok'>Bangkok</option>
              <option value='Vienna'>Vienna</option>
              <option value='Prague'>Prague</option>
              <option value='San Francisco'>San Francisco</option>
              <option value='Cape Town'>Cape Town</option>
              <option value='Buenos Aires'>Buenos Aires</option>
              <option value='Stockholm'>Stockholm</option>
              <option value='Seoul'>Seoul</option>
              <option value='Vancouver'>Vancouver</option>
              <option value='Edinburgh'>Edinburgh</option>
              <option value='Mumbai'>Mumbai</option>
            </select>
            <button
              className='btn text-white ms-5'
              onClick={() => {
                if (selectedOption === 'Select a city') return;
                setIstClicked(!isClicked);
                addCityToLocalStorage(selectedOption);
                setSelectedOption('Select a city');
              }}
            >
              Add
            </button>
          </>
        ) : null}
        <div>
          {savedCities.map((city) => (
            <AddCitiesCard key={city} selectedData={city} />
          ))}
        </div>
      </div>
  );
};

export default AddCitiesContainer;
