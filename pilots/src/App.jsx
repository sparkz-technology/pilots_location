import { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import SearchForm from './features/SearchForm';
import PilotList from './features/PilotList';
import { adminIcon, pilotIcon } from './utils/icons';
import MapUpdater from './features/MapUpdater';



const App = () => {
  const [pilots, setPilots] = useState([]);
  const [adminLocation, setAdminLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [location, setLocation] = useState({ lat: 51.505, lng: -0.09 });
  const [showSearch, setShowSearch] = useState(true);
  const [showLocation, setShowLocation] = useState({ lat: 51.505, lng: -0.09 })

  useEffect(() => {
    const getAdminLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setAdminLocation({ lat: latitude, lng: longitude });
            setShowLocation({ lat: latitude, lng: longitude })
            setLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getAdminLocation();
  }, []);

  const fetchPilots = useCallback(async (val) => {
    const { locationLat, locationLng, experience, range } = val
    try {
      const response = await axios.post('http://localhost:5000/api/pilots', {
        latitude: locationLat,
        longitude: locationLng,
        experience: Number(experience),
        range: Number(range),
      });
      setPilots(response.data);
      setShowSearch(false);
    } catch (error) {
      console.error('Error fetching pilots:', error);
    }
  }, []);


  const handleLocatePilot = (pilot) => {
    setShowLocation({ lat: pilot.coordinates[1], lng: pilot.coordinates[0] });
  };

  const myLocation = () => {
    setShowLocation({ lat: adminLocation.lat, lng: adminLocation.lng })
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-green-700">Drone Pilot Map</h1>
      <div className="flex flex-col md:flex-row gap-4">
        {showSearch ? (
          <SearchForm
            location={location}
            onFetchPilots={fetchPilots}
          />
        ) : (
          <PilotList
            pilots={pilots}
            onLocatePilot={handleLocatePilot}
            onBack={() => setShowSearch(true)}
          />
        )}
        <div className="w-full md:w-2/3 relative">
          <button
            onClick={myLocation}
            className='absolute z-[99999] top-1 right-1 bg-blue-500 ring-1 text-white py-2 px-1 rounded-xl'>
            Current location
          </button>
          <MapContainer center={[adminLocation.lat, adminLocation.lng]} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker
              position={[adminLocation.lat, adminLocation.lng]}
              icon={adminIcon}
            >
              <Popup>
                <h3 className="text-lg font-semibold">Admin</h3>
                <p>This is the location of the admin.</p>
              </Popup>
            </Marker>
            {pilots.map(pilot => (
              <Marker
                key={pilot._id}
                position={[pilot.coordinates[1], pilot.coordinates[0]]}
                icon={pilotIcon}
              >
                <Popup>
                  <h3 className="text-lg font-semibold">{pilot.name}</h3>
                  <p>Experience: {pilot.workExperience} years</p>
                </Popup>
                <Tooltip>
                  <span>{pilot.name}</span>
                </Tooltip>
              </Marker>
            ))}
            <MapUpdater center={showLocation} />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default App;
