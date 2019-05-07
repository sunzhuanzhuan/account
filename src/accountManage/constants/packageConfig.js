import {
  Owner,
  Fetch,
  Main,
  Cooperation,
  Strategy,
  Content,
  Other
} from "../components/packageComponents";

export const modules = {
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

// 处理差异性模块展示
function handleDiff(keys = []) {
  return (platform) => {
    // 获取该平台的差异性配置
    let { diff } = platformToType[platform] || diffByTypes.normal
    // 过滤配置的模块
    return keys.filter(key => {
      if (key in diff) {
        return diff[key]
      }
      return true
    })
      .map(key => modules[key] || {})
  }
}
export const tabs = [
  {
    index: '1',
    title: '账号信息',
    warp: handleDiff([
      "owner",
      "fetch",
      "main",
      "cooperation",
      "strategy",
      "content",
      "other"
    ])
  }, {
    index: '2',
    title: '报价信息',
    warp: handleDiff([
      "owner",
      "fetch",
      "other"
    ])
  }, {
    index: '3',
    title: '数据统计',
    warp: handleDiff([
      "content"
    ])
  }, {
    index: '4',
    title: '博主信息',
    warp: handleDiff([
      "strategy",
      "content",
      "other"
    ])
  }
]

// 平台差异性
export const diffByTypes = {
  "default": {
    platforms: [115, 24, 103, 120, 111, 119, 118, 116, 30, 29, 110, 100, 101, 102, 114],
    visibility: {
      fields: {
        qcCode: false,
        snsUniqueId: false,
        url: false,
        fansNumberImg: false,
        referencePrice: true,
        priceInclude: true,
      },
      modules: {
        fetch: false
      }
    },
    configure: {
      fetchDefaultKeys: ''
    }
  },
  "sina": {
    platforms: [1],
    diff: {
      fetch: {
        defaultKeys: ''
      },
      main: {

      },
      price: {
        referencePrice: true,
        priceInclude: true
      }
    }
  },
  "weChat": {
    platforms: [9],
    diff: {
      fetch: {
        defaultKeys: ''
      },
      base: {
        qcCode: true,
        isFansNumberImg: true
      }
    }

  },
  "friends": {
    platforms: [23],
    diff: {
      fetch: false,
      base: {
        qcCode: true,
        hideUniqueId: true,
        hideLink: true,
        isFansNumberImg: true
      }
    }

  },
  "normal": {
    platforms: [33, 28, 32, 27, 31, 2, 5, 19, 117],
    diff: {
      fetch: false,
      base: {
        hideUniqueId: true
      }
    }
  },
  "readBook": {
    platforms: [93],
    diff: {
      fetch: {
        defaultKeys: ''
      }
    }
  },
  "headline": {
    platforms: [26],
    diff: {
      fetch: {
        defaultKeys: 'snsId'
      }
    }
  },
  "beautyPat": {
    platforms: [25],
    diff: {
      fetch: {
        defaultKeys: 'snsId'
      }
    }
  },
  "yy": {
    platforms: [109, 106, 108, 105, 104, 113, 112, 107],
    diff: {
      fetch: {
        defaultKeys: 'snsId'
      }
    }
  },
  "zhanQi": {
    platforms: [112],
    diff: {
      fetch: {
        defaultKeys: ''
      }
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
