type InterestZone = {
  id: string;
  userId: string;
  description?: string;
  lat: number;
  lng: number;
  name: string;
  priority: 'unset' | 'low' | 'medium' | 'high';
};
