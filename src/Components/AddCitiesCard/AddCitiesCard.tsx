import { useQuery } from "@tanstack/react-query"
import axios from "axios";
import { WeatherData } from "../interfaces/WeatherData";


interface AddCitiesInterface{
    selectedData: string;
    setSelectedData?:React.Dispatch<React.SetStateAction<string>>;
  }

const AddCitiesCard : React.FC<AddCitiesInterface> = ({selectedData}) => {
   
  
    
    const apiKey = import.meta.env.VITE_API_KEY;
    if (!apiKey) {
      throw new Error('No API key provided');
    }
    const cleanApiKey = apiKey.replace(/^['"%]|['"%];?$/g, '');
    const {data,isLoading} = useQuery({
        queryKey:['addCitiesCard', selectedData],
        queryFn: async ()=>{
            const {data} = await axios.get<WeatherData>('http://api.weatherapi.com/v1/current.json',{
                params:{
                    key: cleanApiKey,
                    q: selectedData
                }
            })
            return data;
        }
    })
    

   if(!isLoading) {
    console.log(data);
   }
    
    
  return (
    <div className="bg-white mb-5 rounded-md flex justify-between items-center px-5 py-5 h-[100px]">
     {/* icon */}
     <div>
        <img src={data?.current?.condition.icon} alt="icon weather" />
     </div>
     {/* city Name and weather state */}
     <div>
        <h2 className="text-lg font-semibold text-black">{data?.location?.name}</h2>
        <p className="text-sm text-gray-600">{data?.current?.condition.text}</p>
     </div>
     {/* temperature */}
     <div>
        <h1 className="text-4xl font-bold text-black ">{data?.current?.temp_c}°C</h1>
     </div>
    </div>
  )
}

export default AddCitiesCard