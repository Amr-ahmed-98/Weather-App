import { useContext, useEffect } from 'react';
import LoaderPage from '../LoaderPage/LoaderPage';
import Card from '../Card/Card';
import { LoadingPageContext } from '../../Context/loadingContext';
import CardDays from '../CardDays/CardDays';
// import PrayerCard from '../PrayerCard/PrayerCard';
import { usePrayerTimes } from '../../Hooks/usePrayerTimes';
import TodayVerse from '../TodayVerse/TodayVerse';
import { useTodayVerse } from '../../Hooks/useTodayVerse';
import AddCitiesContainer from '../AddCitiesContainer/AddCitiesContainer';
import useWeatherData from '../../Hooks/useWeatherData';
import UpperContent from '../UpperContent/UpperContent';
import { searchContex } from '../../Context/searchContext';

  import { ThemeContext } from '../../Context/themeContext'

const AppContent = () => {

const themeCTX = useContext(ThemeContext)

if(!themeCTX){
  throw new Error("ThemeContext must be used within a ThemeProvider");
}
const {isDarkMode} = themeCTX

const htmlTag = document.getElementsByTagName('html')[0]

htmlTag.className = isDarkMode ? 'dark' : 'light'




  const pageState = useContext(LoadingPageContext);
  const { isLoading, data } = useWeatherData();


  
  const {data: prayerData} = usePrayerTimes()
  const {data:verseData,isLoading:verseLoading} = useTodayVerse()

  const context = useContext(searchContex);

  if (!context) {
    throw new Error("useWeatherData must be used within a SearchProvider");
  }


  

  if (!pageState) {
    throw new Error('AppContent must be used within a LoadingPageProvider');
  }

  const { loading, setLoading } = pageState;

  

  useEffect(() => {
    if (!isLoading && data && prayerData && verseData && !verseLoading  ) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isLoading, data, setLoading,prayerData,verseData,verseLoading]);

  if (loading || isLoading) {
    return <LoaderPage />;
  }

  return (
    <div className='min-h-screen bg-bgMainColor overflow-auto dark:bg-slate-900'>
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:grid-rows-[repeat(13,1fr)]'>
        <div className='order-2 md:order-1 md:col-span-1 md:col-start-1 md:row-start-1 md:row-span-9'>
          {/* Weather (w) */}
          <Card weatherData={data?.data} />
        </div>
  
        <div className='order-1 md:order-2 md:col-start-2 md:col-span-2 md:row-start-1'>
          {/* Search */}
          <UpperContent/>
        </div>
  
        <div className='order-3 md:col-start-2 md:row-start-2 md:row-span-6 md:col-span-1'>
          {/* Days */}
          <CardDays />
        </div>
  
        <div className='order-4 md:col-start-3 md:row-start-2 md:row-span-6 md:col-span-1'>
          {/* Prayer */}
          {/* <PrayerCard/> */}
        </div>
  
        <div className='order-5 md:col-start-1 md:row-start-8 md:row-span-7'>
          {/* Cities */}
          <AddCitiesContainer/>
        </div>
  
        <div className='order-6 md:col-start-2 md:col-span-2 md:row-start-8 md:row-span-6'>
          {/* Verse */}
          <TodayVerse/>
        </div>
      </div>
    </div>
  </div>
  );
};

export default AppContent;
