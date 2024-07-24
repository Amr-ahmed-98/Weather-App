import { useEffect, useState } from 'react';
interface Location {
  loaded: boolean;
  coordinates: { lat: number | null; lng: number | null };
  error: string | null;
}
const useGeoLocation = (): Location => {
  const [location, setLocation] = useState<Location>({
    loaded: false,
    coordinates: { lat: null, lng: null },
    error: null,
  });
  const onSuccess = (position: GeolocationPosition) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      error: null,
    });
  };
  const onError = (error: GeolocationPositionError) => {
    setLocation({
      loaded: true,
      coordinates: { lat: null, lng: null },
      error: error.message,
    });
  };
  
  useEffect(()=>{
    if(!('geolocation' in navigator)){
        setLocation({
          loaded: true,
          coordinates: { lat: null, lng: null },
          error: 'Geolocation is not supported by this browser.',
        });
    } else {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    
  },[])

  return location;
};

export default useGeoLocation;
