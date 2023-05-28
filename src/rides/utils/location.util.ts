interface DistanceProps {
  lat1: number;
  lon1: number;
  lat2: number;
  lon2: number;
}

export const LocationUtil = {
  getDistance: ({ lat1, lon1, lat2, lon2 }: DistanceProps) => {
    const earthRadius = 6371;

    lat1 = LocationUtil.toRadians(lat1);
    lon1 = LocationUtil.toRadians(lon1);
    lat2 = LocationUtil.toRadians(lat2);
    lon2 = LocationUtil.toRadians(lon2);

    const lonDiff = lon2 - lon1;
    const latDiff = lat2 - lat1;

    const a =
      Math.sin(latDiff / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(lonDiff / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const kms = earthRadius * c;
    return Math.round(kms * 100) / 100;
  },
  toRadians: (degrees: number) => (Math.PI / 180) * degrees,
};
