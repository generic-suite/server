export class SubmitOrderDto {
  // 用户id
  readonly userId: number;

  // 订单总数量
  readonly trade_order_count: number;

  // 今日订单数量
  readonly today_trade_order_count: number;

  // 交易总金额
  readonly trade_money: number;

  // 今日交易金额
  readonly today_trade_money: number;
}