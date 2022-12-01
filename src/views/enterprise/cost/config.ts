import { markRaw } from 'vue'

import Detailed from './detailed/index.vue'
import Account from './account/index.vue'

export default {
  tabItems: {
    EnterpriseCostAccount: markRaw(Account),
    EnterpriseCostDetailed: markRaw(Detailed),
  } as { [key: string]: any },
}
