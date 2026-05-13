export interface Route {
  from: string;
  to: string;
}

export interface Train {
  id: string;
  number: string;
  type: string; 
  route: Route;
  departureTime: string; 
  arrivalTime: string;
  duration: string;
}