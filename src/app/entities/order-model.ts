export class OrderModel {
  id: number;
  status: string;
  numberOfProducts: number;
  totalOrderPrice: number;
  addressIds: number;
  customerIds: number;
  tapProductOrderCollection = [];
}
