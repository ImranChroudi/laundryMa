import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };

function Map({ location }: { location: { lat: number, lng: number } }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
  });

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={location} zoom={12}>
      <Marker position={location} />
    </GoogleMap>
  );
}

export default Map;