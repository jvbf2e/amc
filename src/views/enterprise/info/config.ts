import { markRaw } from 'vue'

import EnterpriseInfo from './info/index.vue'
import Users from './users/index.vue'
import Roles from './roles/index.vue'
import Setting from './setting/index.vue'
// import Subscribe from './subscribe/index.vue'

export default {
  tabItems: {
    EnterpriseInfoDashboard: markRaw(EnterpriseInfo),
    EnterpriseInfoUser: markRaw(Users),
    EnterpriseInfoRole: markRaw(Roles),
    EnterpriseInfoSetting: markRaw(Setting),
  } as { [key: string]: any },
}
