export interface IDevice {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
}

export interface ICartItem extends IDevice {
  quantity: number;
}

export interface IUser {
  name: string;
  email: string;
}
