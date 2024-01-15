import { VipList } from 'src/vip-list/entities/vip-list.entity';
import { MidUser } from '../entities/mid-user.entity';
export type ReturnUser = MidUser & {
  vip: VipList;
};
