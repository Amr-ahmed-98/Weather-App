
import { usePrayerTimes } from "../../Hooks/usePrayerTimes";
import Loader from "../Loader/Loader";

const PrayerCard = () => {
    const { data, isLoading, error: queryError } = usePrayerTimes();

    if (isLoading) return <Loader/>;
    if (queryError) return <div>Error: {queryError.message}</div>;
    if (!data || !data.data || !data.data.timings) return <div>No data available</div>;

    const filteredData = Object.entries(data.data.timings).slice(0, 7);

    return (
        <div className="card bg-white  text-black  px-2 shadow-xl dark:bg-slate-800 dark:text-white">
            <h2 className="card-title text-black text-2xl font-bold p-4 dark:text-white">Prayer Times</h2>
            <div className=" text-lg ">
                {filteredData.map(([prayer, time]) => (
                    <div key={prayer} className='flex justify-between py-3'>
                        <span>{prayer}</span>
                        <span>{time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrayerCard;