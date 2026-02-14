// 🗺️ LEAFLET + CARTO VOYAGER TILES - DOM-BASED GIS ENGINE
// ARCHITECTURE: Leaflet (DOM renderer) + CARTO Voyager tiles (English labels)
// ✅ NO WEBGL - Pure DOM rendering for maximum compatibility
// ✅ NO TOKEN REQUIRED - 100% Free and Open Source
// ✅ Tiles render as <img> DOM elements for reliable cross-browser support
// ✅ Using RAW Leaflet API (not react-leaflet wrapper) for maximum compatibility
// ✅ ENGLISH LABELS - CARTO tiles show place names in English
// ✅ BANGLADESH ONLY - Map bounds restricted to Bangladesh geography

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { SEZZone } from '@/app/data/mockData';
import { useLanguage } from './LanguageContext';

interface ZoneMapDisplayProps {
  zones: SEZZone[];
  onZoneClick: (zone: SEZZone) => void;
  center: [number, number];
  zoom: number;
}

export function ZoneMapDisplay({ 
  zones, 
  onZoneClick,
  center,
  zoom
}: ZoneMapDisplayProps) {
  const { t } = useLanguage();
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedZone, setSelectedZone] = useState<SEZZone | null>(null);

  // Initialize Leaflet map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapRef.current) return; // Prevent duplicate initialization

    try {
      // Bangladesh geographical boundaries
      const bangladeshBounds: L.LatLngBoundsExpression = [
        [20.7, 88.0], // Southwest corner
        [26.6, 92.7]  // Northeast corner
      ];

      // Create Leaflet map instance
      const map = L.map(mapContainerRef.current, {
        center: center,
        zoom: zoom,
        zoomControl: true,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        maxBounds: bangladeshBounds, // Restrict view to Bangladesh only
        maxBoundsViscosity: 0.8, // How strongly map resists dragging outside bounds (0-1)
        minZoom: 6, // Prevent zooming out too far
      });

      // ✅ CARTO VOYAGER TILES - English labels, free, no API key required
      // Replaced OpenStreetMap tiles which show Bengali/local language
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap Contributors, © CARTO',
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      // Stop page scroll when interacting with map
      map.scrollWheelZoom.enable();
      map.dragging.enable();

      const container = map.getContainer();
      if (container) {
        container.addEventListener('wheel', (e) => {
          e.stopPropagation();
        }, { passive: false });

        container.addEventListener('touchmove', (e) => {
          e.stopPropagation();
        }, { passive: false });
      }

      // Force Leaflet to recalculate container size
      // Leaflet calculates size once at init - if container is flex/animated, it gets wrong size
      const invalidateSizeTimer = setTimeout(() => {
        try {
          if (map && map.getContainer() && mapRef.current) {
            map.invalidateSize(true);
          }
        } catch (error) {
          // Silently catch if map is not fully initialized
          console.debug('Map invalidateSize skipped:', error);
        }
      }, 300);

      // Recalculate on window resize
      const handleResize = () => {
        try {
          if (map && map.getContainer() && mapRef.current) {
            map.invalidateSize();
          }
        } catch (error) {
          // Silently catch if map is not ready
          console.debug('Map resize invalidateSize skipped:', error);
        }
      };
      window.addEventListener('resize', handleResize);

      mapRef.current = map;

      // Wait for tiles to load
      setTimeout(() => {
        setMapLoaded(true);
      }, 500);

      // Cleanup on unmount
      return () => {
        clearTimeout(invalidateSizeTimer);
        window.removeEventListener('resize', handleResize);
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];
        map.remove();
        mapRef.current = null;
      };
    } catch (error) {
      console.error('Failed to initialize Leaflet map:', error);
    }
  }, []);

  // Update map center/zoom when props change
  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  // Add/update markers when zones change or map loads
  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    const map = mapRef.current;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create custom colored markers for each zone
    zones.forEach((zone) => {
      const colorMap: Record<string, string> = {
        'SEZ': '#3b82f6',      // blue
        'EPZ': '#a855f7',      // purple
        'Hi-Tech Park': '#10b981' // emerald
      };
      const color = colorMap[zone.type] || '#3b82f6';

      // Pure static marker - no transforms, no animations
      const customIcon = L.divIcon({
        className: '', // Empty class to avoid Leaflet defaults
        html: `
          <div style="
            width: 18px;
            height: 18px;
            border-radius: 50%;
            background: ${color};
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.25);
            cursor: pointer;
          "></div>
        `,
        iconSize: [18, 18],
        iconAnchor: [9, 9],
      });

      // Create marker
      const marker = L.marker([zone.location.lat, zone.location.lng], {
        icon: customIcon,
      }).addTo(map);

      // Add popup
      const popupContent = `
        <div style="padding: 8px; min-width: 200px;">
          <div style="display: inline-block; padding: 2px 8px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-bottom: 4px; background-color: ${color}; color: white;">
            ${zone.type}
          </div>
          <div style="font-weight: 600; font-size: 14px; color: #111827; margin-bottom: 4px;">
            ${zone.name}
          </div>
          <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
            📍 ${zone.address}
          </div>
          <div style="font-size: 12px; color: #10b981; margin-bottom: 4px;">
            ✓ ${zone.availablePlots} plots available
          </div>
          <div style="font-size: 11px; color: #9ca3af; margin-top: 8px;">
            📊 ${zone.location.lat.toFixed(4)}°N, ${zone.location.lng.toFixed(4)}°E
          </div>
          <div style="font-size: 10px; color: #d1d5db; margin-top: 4px;">
            Click marker for full details →
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      // Click handler - opens right-side panel
      marker.on('click', () => {
        onZoneClick(zone);
        setSelectedZone(zone);
      });

      markersRef.current.push(marker);
    });
  }, [zones, mapLoaded, onZoneClick]);

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden border-2 border-blue-200">
      {/* LEAFLET MAP CONTAINER */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0 z-0"
      />

      {/* Loading state */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-[300]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <div className="text-sm font-medium text-gray-700">Loading Map...</div>
          </div>
        </div>
      )}

      {/* Zone List Overlay (bottom) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 pointer-events-auto z-[400]">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {zones.slice(0, 6).map((zone) => {
            const colorMap = {
              'SEZ': { bg: 'bg-blue-500', border: 'border-blue-400', text: 'text-blue-600' },
              'EPZ': { bg: 'bg-purple-500', border: 'border-purple-400', text: 'text-purple-600' },
              'Hi-Tech Park': { bg: 'bg-emerald-500', border: 'border-emerald-400', text: 'text-emerald-600' }
            };
            const colors = colorMap[zone.type as keyof typeof colorMap] || colorMap['SEZ'];
            
            return (
              <button
                key={zone.id}
                onClick={() => onZoneClick(zone)}
                className={`flex-shrink-0 px-4 py-2 bg-white/95 backdrop-blur rounded-lg hover:scale-105 transition-all border-2 ${colors.border}`}
              >
                <div className="text-xs font-semibold text-gray-900">{zone.name}</div>
                <div className={`text-xs ${colors.text}`}>{zone.type}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Attribution - Government-grade compliance */}
      {mapLoaded && (
        <div className="absolute bottom-20 right-2 bg-white/70 backdrop-blur px-2 py-1 rounded text-[9px] text-gray-600 z-[400] pointer-events-none">
          © OpenStreetMap Contributors, © CARTO
        </div>
      )}
    </div>
  );
}