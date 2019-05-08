import {
  Owner,
  Fetch,
  Main,
  Cooperation,
  Strategy,
  Content,
  Other
} from "../components/packageComponents";
import intersection from 'lodash/intersection'
import update from 'immutability-helper'

export const modulesMap = {
  'owner': {
    anchorId: "owner",
    title: "主账号信息",
    component: Owner
  },
  'fetch': {
    anchorId: "fetch",
    title: "信息自动抓取",
    component: Fetch
  },
  'main': {
    anchorId: "main",
    title: "账号基本信息",
    component: Main,
    children: {
      'base': {
        anchorId: "base",
        title: "基础信息"
      }
    }
  },
  'cooperation': {
    anchorId: "cooperation",
    title: "合作相关",
    component: Cooperation
  },
  'strategy': {
    anchorId: "strategy",
    title: "策略信息",
    component: Strategy
  },
  'content': {
    anchorId: "content",
    title: "内容相关",
    component: Content
  },
  'other': {
    anchorId: "other",
    title: "其他信息",
    component: Other
  }
}

// 处理模块差异性并注入配置数据
export function platformToModules(platformId, filterSource) {
  filterSource = filterSource || Object.keys(modulesMap)
  let platformData = platformToType[platformId] || diffByTypes.normal
  // 获取该平台的差异性配置
  let _modules = intersection(filterSource, platformData.visibility.modules).map(key => modulesMap[key])
  return update(platformData, { visibility: { modules: { $set: _modules } } })
}
export const tabs = [
  {
    index: '1',
    title: '账号信息',
    warp: [
      "owner",
      "fetch",
      "main",
      "cooperation",
      "strategy",
      "content",
      "other"
    ]
  }, {
    index: '2',
    title: '报价信息',
    warp: [
      "owner",
      "fetch",
      "other"
    ]
  }, {
    index: '3',
    title: '数据统计',
    warp: [
      "content"
    ]
  }, {
    index: '4',
    title: '博主信息',
    warp: [
      "strategy",
      "content",
      "other"
    ]
  }
]

// TODO: 交集重构
// 平台差异性
export const diffByTypes = {
  "default": {
    platforms: [115, 24, 103, 120, 111, 119, 118, 116, 30, 29, 110, 100, 101, 102],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: '',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'url',
          placeholder: '请输入主页链接'
        }
      ]
    }
  },
  "panda": {
    platforms: [114],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'url',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'url',
          placeholder: '请输入直播间URL'
        }
      ]
    }
  },
  "sina": {
    platforms: [1],
    visibility: {
      fields: {
        referencePrice: true,
        priceInclude: true
      },
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: (isID) => isID ? 'snsId' : 'snsName',
      fetchTypes: [
        {
          title: '账号名称',
          field: 'snsName',
          placeholder: '请输入账号名称'
        }, {
          title: '账号ID',
          field: 'snsId',
          placeholder: '请输入账号ID'
        }
      ]
    }
  },
  "weChat": {
    platforms: [9],
    visibility: {
      fields: {
        qcCode: true,
        isFansNumberImg: true
      },
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'url',
      fetchTypes: [
        {
          title: '历史图文消息(URL)',
          field: 'url',
          placeholder: '请输入历史图文链接'
        }, {
          title: '微信号',
          field: 'snsId',
          placeholder: '请输入微信号'
        }
      ]
    }
  },
  "friends": {
    platforms: [23],
    visibility: {
      fields: {
        qcCode: true,
        hideUniqueId: true,
        hideLink: true,
        isFansNumberImg: true
      },
      modules: [
        "owner",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: '',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'url',
          placeholder: '请输入主页链接'
        }
      ]
    }
  },
  "normal": {
    platforms: [33, 28, 32, 27, 31, 2, 5, 19, 117],
    visibility: {
      fields: {
        hideUniqueId: true
      },
      modules: [
        "owner",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: ''
    }
  },
  "readBook": {
    platforms: [93],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'url',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'url',
          placeholder: '请输入主页链接'
        }
      ]
    }
  },
  "headline": {
    platforms: [26],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'snsId',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'snsId',
          placeholder: '请输入主页链接'
        }
      ]
    }
  },
  "beautyPat": {
    platforms: [25],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'snsId',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'snsId',
          placeholder: '请输入账号ID'
        }
      ]
    }
  },
  "yy": {
    platforms: [104, 113],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'snsId',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'snsId',
          placeholder: '请输入YY号'
        }
      ]
    }
  },
  "videos": {
    platforms: [109, 106, 108, 105, 112],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'snsId',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'snsId',
          placeholder: '请输入账号ID'
        }
      ]
    }
  },
  "douyu": {
    platforms: [107],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: 'snsId',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'snsId',
          placeholder: '请输入房间号'
        }
      ]
    }
  },
  "zhanQi": {
    platforms: [112],
    visibility: {
      fields: {},
      modules: [
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      fetchDefaultKeys: '',
      fetchTypes: [
        {
          title: '抓取信息',
          field: 'url',
          placeholder: '请输入主页链接'
        }
      ]
    }
  }
}
// 平台对应模块码表
export const platformToType = Object.entries(diffByTypes).reduce((obj, [key, item]) => {
  item['platforms'].forEach(i => {
    obj[i] = {
      key,
      ...item
    }
    delete obj[i].platforms
  })
  return obj
}, {})
