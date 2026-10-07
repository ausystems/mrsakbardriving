// Shared projection for the service-area map and the area pages' mini-maps.
// Equirectangular projection scaled to true kilometres at the map's centre latitude.
export const BBOX = { west: -80.09, east: -79.485, south: 43.03, north: 43.39 };
const LAT_C = (BBOX.north + BBOX.south) / 2;
export const KM_LON = 111.32 * Math.cos((LAT_C * Math.PI) / 180);
export const KM_LAT = 111.09;
export const WIDTH = 1000;
export const UNITS_PER_KM = WIDTH / ((BBOX.east - BBOX.west) * KM_LON);
export const HEIGHT = Math.round((BBOX.north - BBOX.south) * KM_LAT * UNITS_PER_KM);

export function project(lat, lon) {
  return [
    (lon - BBOX.west) * KM_LON * UNITS_PER_KM,
    (BBOX.north - lat) * KM_LAT * UNITS_PER_KM,
  ];
}
