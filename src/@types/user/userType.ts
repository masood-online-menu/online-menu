import { RestaurantType } from '../restaurant/restaurantType';

export type UserType = {
  id: String;
  username: String;
  phoneNumber: String;
  password: String;
  userType: 'Admin' | 'superAdmin';
  expireDate: Date;
  restaurant: RestaurantType[];
};
