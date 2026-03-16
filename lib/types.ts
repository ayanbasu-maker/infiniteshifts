export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export interface GarageVehicle {
  name: string;
  image: string;
  description?: string;
  bought?: number;
  sold?: number;
  status: "sold" | "current";
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
}
