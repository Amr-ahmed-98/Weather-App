import { useTodayVerse } from '../../Hooks/useTodayVerse'
import Loader from '../Loader/Loader';

const TodayVerse = () => {
  const { data, isLoading, error } = useTodayVerse();

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error(error);
    return <div>Error loading verse</div>;
  }

  return (
    <div className='card bg-white h-full  text-black shadow-xl flex flex-col dark:bg-slate-800 dark:text-white'>
      <h2 className='card-title text-black text-2xl font-bold p-4 dark:text-white'>
        Today's Verse
      </h2>
      <div className='text-[40px]  text-center flex-grow '>
        {data?.data.text}
      </div>
    </div>
  );
};

export default TodayVerse;