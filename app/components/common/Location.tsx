"use client"
import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Check, MapPin, Search, Loader2 } from "lucide-react";
import "leaflet/dist/leaflet.css";





// Fix Leaflet default icon for many bundlers
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });
}

// Component to handle clicks on the map
const ClickHandler = ({
  setPosition,
  setLocationSet,
}: {
  setPosition: (pos: any) => void;
  setLocationSet: (set: boolean) => void;
}) => {
  useMapEvents({
    click(e: any) {
      setPosition((prev: any) => ({ ...prev, latitude: e.latlng.lat, longitude: e.latlng.lng }));
      setLocationSet(true);
    },
  });
  return null;
};

// Component to fly to marker when it changes
const FlyToMarker = ({
  position,
  setLocationSet,
}: {
  position: any | null;
  setLocationSet: (set: boolean) => void;
}) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo([position.latitude, position.longitude], map.getZoom(), {
        duration: 0.5,
      });
    }
  }, [position, map]);
  return null;
};

const LocationForm = ({
  location,
  position,
  setPosition,
  address = "",
  onAddressChange,
  onLocationSet,
}: {
  location: string;
  position: any | null;
  setPosition: (pos: any) => void;
  address?: string;
  onAddressChange?: (address: string) => void;
  onLocationSet?: (set: boolean) => void;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationSet, setLocationSet] = useState(false);

  const [searchResults, setSearchResults] = useState<{display_name: string; lat: string; lon: string}[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const updateLocationSet = (set: boolean) => {
    setLocationSet(set);
    onLocationSet?.(set);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (value: string) => {
    onAddressChange?.(value);
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    if (value.trim().length < 3) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&countrycodes=ma&limit=5&addressdetails=1`,
          { headers: { "Accept-Language": "fr" } }
        );
        const data = await res.json();
        setSearchResults(data);
        setShowResults(data.length > 0);
      } catch {
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 400);
  };

  const handleSelectResult = (result: {display_name: string; lat: string; lon: string}) => {
    setPosition((prev: any) => ({ ...prev, latitude: parseFloat(result.lat), longitude: parseFloat(result.lon) }));
    onAddressChange?.(result.display_name);
    setShowResults(false);
    updateLocationSet(true);
    setError(null);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("La géolocalisation n'est pas supportée. Utilisez la recherche d'adresse ci-dessous.");
      return;
    }
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLoading(false);
        setPosition((prev: any) => ({ ...prev, latitude: pos.coords.latitude, longitude: pos.coords.longitude }));
        updateLocationSet(true);
      },
      (err) => {
        setLoading(false);
        if (err.code === 1) {
          setError("Permission refusée. Utilisez la recherche d'adresse ci-dessous.");
        } else if (err.code === 2) {
          setError("Position indisponible. Utilisez la recherche d'adresse ci-dessous.");
        } else if (err.code === 3) {
          setError("Délai dépassé. Réessayez ou utilisez la recherche d'adresse.");
        } else {
          setError("Impossible d'obtenir la position. Utilisez la recherche d'adresse.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}

      <div className="mt-3">
        <div>
          <p className="text-gray-500 mb-2 text-base">
            Utiliser votre position actuelle en cliquant sur le bouton
          </p>
        </div>
        <button
          onClick={handleGetLocation}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 px-4 py-4 rounded-lg text-white transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : locationSet
              ? "bg-green-600 hover:bg-green-700"
              : "bg-primary hover:bg-primary/55"
          }`}
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : locationSet ? (
            <Check className="w-5 h-5" />
          ) : (
            <MapPin className="w-5 h-5" />
          )}
          {loading
            ? "Localisation en cours..."
            : locationSet
            ? "Position définie"
            : "En utilisant ma position actuelle"}
        </button>
      </div>

      {/* Address input with search */}
      <div className="relative" ref={resultsRef}>
        <label className="flex items-center gap-2 text-gray-700 font-semibold mb-2">
          <MapPin className="w-5 h-5" />
          Adresse {locationSet ? <span className="text-xs font-normal text-green-600">(optionnel — position définie sur la carte)</span> : <span className="text-red-500">*</span>}
        </label>
        <p className="text-gray-400 text-xs mb-2">Tapez votre adresse pour la rechercher ou indiquez-la manuellement</p>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={address}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Ex: 23 Rue Ibn Batouta, Tanger"
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none ${
              !locationSet && !address.trim() ? 'border-gray-300' : 'border-gray-300'
            }`}
          />
          {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-gray-400" />}
        </div>
        {showResults && searchResults.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-48 overflow-y-auto">
            {searchResults.map((r, i) => (
              <li
                key={i}
                onClick={() => handleSelectResult(r)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700 border-b last:border-b-0"
              >
                <MapPin className="inline w-3 h-3 mr-1 text-primary" />
                {r.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Option 3: Click on map */}
      <div>
        <p className="text-gray-500 mb-2 text-base">
          Ou choisissez directement sur la carte
        </p>
        <MapContainer
          center={[
            position?.latitude ?? 35.74804478729811,
            position?.longitude ?? -5.818333625793458,
          ]}
          zoom={15} 
          style={{ height: "300px", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer 
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
          />

          <FlyToMarker position={position} setLocationSet={updateLocationSet} />

          <ClickHandler
            setPosition={setPosition}
            setLocationSet={updateLocationSet}
          />
          {position && (
            <Marker
              draggable={true}
              position={[
                position.latitude ?? 35.74804478729811, 
                position.longitude ?? -5.818333625793458
              ]}
              eventHandlers={{
                dragend: (e: any) => {
                  const latlng = e.target.getLatLng();
                  setPosition({ 
                    ...position, 
                    latitude: latlng.lat, 
                    longitude: latlng.lng 
                  });
                },
              }}
            >
              <Popup>Déplacez-moi ou cliquez sur la carte</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationForm;
