import {
  Owner,
  Fetch,
  Main,
  Cooperation,
  Strategy,
  Content,
  Other,
  Price,
  Personal,
  Dashboard,
  Trinity,
  Orders
} from "../components/packageComponents";
import intersection from 'lodash/intersection'
import update from 'immutability-helper'
import { platformView } from "@/accountManage/constants/platform";
import {
  cooperateBrandPlaceHolderMap,
  cooperateContentPlaceHolderMap,
  cooperateLinkPlaceHolderMap
} from "./platformConfigureSubDiff";

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
    perfectionDegreeKey: 'base'
  },
  'cooperation': {
    anchorId: "cooperation",
    title: "合作相关",
    component: Cooperation,
    perfectionDegreeKey: 'cooperation'
  },
  'strategy': {
    anchorId: "strategy",
    title: "策略信息",
    component: Strategy
  },
  'content': {
    anchorId: "content",
    title: "内容相关",
    component: Content,
    perfectionDegreeKey: "content"
  },
  'other': {
    anchorId: "other",
    title: "其他信息",
    component: Other
  },
  'price': {
    anchorId: "price",
    title: "账号报价",
    component: Price,
    perfectionDegreeKey: 'sku'
  },
  'personal': {
    anchorId: "personal",
    title: "博主个人信息",
    component: Personal,
    perfectionDegreeKey: 'personal'
  },
  'dashboard': {
    anchorId: "dashboard",
    title: "数据统计",
    component: Dashboard
  },
  'trinity': {
    anchorId: "trinity",
    title: "三方平台报价",
    component: Trinity
  },
  'orders': {
    anchorId: "orders",
    title: "预约订单信息",
    component: Orders
  }
}

// 处理模块差异性并注入配置数据
/**
 * 新增模块
 * 1. 新增modulesMap中的组件
 * 2. 在tab中添加
 * 3. 在客户端差异中配置
 * 4. 在平台差异中配置
 */
export function platformToModules(platformId, filterSource) {
  filterSource = filterSource || Object.keys(modulesMap)
  let platformData = platformToType[platformId] || platformToType["-1"]
  // 获取该平台的差异性配置
  // let _modules = intersection(filterSource, platformData.visibility.modules).map(key => modulesMap[key])
  let _modules = []
  if (process.env.REACT_APP_CLIENT === 'NB') {
    _modules = intersection(diffByClient['NB'].wrap, filterSource, platformData.visibility.modules)
  } else if (process.env.REACT_APP_CLIENT === 'NC') {
    _modules = intersection(diffByClient['NC'].wrap, platformData.visibility.modules)
  }
  _modules = _modules.map(key => modulesMap[key])
  return update(platformData, { visibility: { modules: { $set: _modules } } })
}
// 维护页面可编辑
export const tabs = [
  {
    index: '1',
    title: '账号信息',
    warp: [
      "owner",
      "fetch",
      "main",
      "cooperation",
      "content",
      "strategy",
      "other"
    ]
  }, {
    index: '2',
    title: '报价信息',
    warp: [
      "price",
      "trinity"
    ],
    perfectionDegreeKey: 'sku'
  }, {
    index: '3',
    title: '数据统计',
    warp: [
      "dashboard"
    ]
  }, {
    index: '4',
    title: '博主信息',
    warp: [
      "personal"
    ],
    perfectionDegreeKey: 'personal'
  }
]
// 维护页面查看
export const viewTabs = [
  {
    index: '1',
    title: '账号信息',
    warp: [
      "owner",
      "main",
      "cooperation",
      "content",
      "strategy",
      "other"
    ]
  }, {
    index: '2',
    title: '报价信息',
    warp: [
      "price",
      "trinity"
    ],
    perfectionDegreeKey: 'sku'
  }, {
    index: '3',
    title: '数据统计',
    warp: [
      "dashboard"
    ]
  }, {
    index: '4',
    title: '博主信息',
    warp: [
      "personal"
    ],
    perfectionDegreeKey: 'personal'
  }, {
    index: '5',
    title: '订单信息',
    warp: [
      "orders"
    ],
  }
]

// 客户端差异性
export const diffByClient = {
  "NB": {
    wrap: [
      "owner",
      "fetch",
      "main",
      "cooperation",
      "content",
      "strategy",
      "other",
      "price",
      "dashboard",
      "personal",
      "trinity",
      "orders"
    ]
  },
  "NC": {
    wrap: [
      "main",
      "price",
      "dashboard",
      "cooperation",
      "content",
      "strategy",
      "personal"
    ]
  }
}
// 平台差异性
export const diffByTypes = {
  "default": {
    platforms: [24, 120, 111, 119, 118, 116, 30, 29, 110, 100, 101, 102],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '搞笑视频达人，视频风格犀利独到，容易引起话题性传播；曾创作过“xxxx”系列节目，取得xxx万播放量。在XXX等多个视频平台均可发布。若您不接受原创合作，可写：帐号支持发布客户的指定视频，支持多平台发布等',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "douyin": {
    platforms: [103, 115],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true,
        showWindow: true,
        isSupportLive: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '搞笑视频达人，视频风格犀利独到，容易引起话题性传播；曾创作过“xxxx”系列节目，取得xxx万播放量。在XXX等多个视频平台均可发布。若您不接受原创合作，可写：帐号支持发布客户的指定视频，支持多平台发布等',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "panda": {
    platforms: [114],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "sina": {
    platforms: [1],
    visibility: {
      fields: {
        weiboUrl: false,
        uniqueId: true,
        url: true,
        referencePrice: true,
        priceInclude: true,
        trueFansRate: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '微博知名段子手/大V/星座达人，致力于网络新起事物、热点事件、热门电影等相关的创作，内容有自己的独特视角；出版作品《xxxx》等。若您不接受原创合作，可写：帐号支持转发，可支持下微任务防屏蔽，可购买粉丝头条等',
      cooperateContentPlaceHolder: '在微博活跃的时间段，通过抽奖的形式进行微博图文直发，使xxx剃须刀曝光在广大男性用户的视野中，通过网页链接，直接跳转到京东店铺购买。阅读量100W+，点赞量3W+，评论量1000W+等；'
    }
  },
  "weChat": {
    platforms: [9],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true,
        qcCode: true,
        isFansNumberImg: true,
        isLowQuality: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '知名微信公众号媒体，“学最好的穿搭，做最好的女人”。专注时尚穿搭，拥有XX万粉丝，粉丝多为高黏性的女性白领群体，具有较高的商业转化价值；合作过多个时尚美妆品牌，紧抓客户要点，撰稿经验丰富。若您不接受原创合作，可写：帐号支持客户给稿直发，可添加二维码、原文链接等',
      disabledFollowersCount: true,
      cooperateContentPlaceHolder: '如：原创多图文第一条发布，按照帐号一贯的专业风格，围绕xx产品的促销活动进行创作和发布。因为帐号调性匹配，精准针对目标用户，推广效果良好。阅读量100W+，点赞量3W+，评论量1000W+等；'
    }
  },
  "friends": {
    platforms: [23],
    visibility: {
      fields: {
        weiboUrl: true,
        qcCode: true,
        uniqueId: false,
        url: false,
        isFansNumberImg: true
      },
      modules: [
        "orders",
        "owner",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '请输入账号简介',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "normal": {
    platforms: [33, 28, 32, 27, 31, 2, 5, 19, 117],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: false,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
      ]
    },
    configure: {
      introductionPlaceholder: '请输入账号简介',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "redBook": {
    platforms: [93],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '请输入账号简介',
      levelText: {
        1: "尿布薯",
        2: "奶瓶薯",
        3: "困困薯",
        4: "泡泡薯",
        5: "甜筒薯",
        6: "小马薯",
        7: "文化薯",
        8: "铜冠薯",
        9: "银冠薯",
        10: "金冠薯"
      },
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "headline": {
    platforms: [26],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '请输入账号简介',
      cooperateContentPlaceHolder: '请填写合作案例的数据情况或案例亮点'
    }
  },
  "beautyPat": {
    platforms: [25],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '搞笑视频达人，视频风格犀利独到，容易引起话题性传播；曾创作过“xxxx”系列节目，取得xxx万播放量。在XXX等多个视频平台均可发布。若您不接受原创合作，可写：帐号支持发布客户的指定视频，支持多平台发布等',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "yy": {
    platforms: [104, 113],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "videos": {
    platforms: [109, 106, 108, 105, 112],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "douyu": {
    platforms: [107],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  },
  "zhanQi": {
    platforms: [112],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
      },
      modules: [
        "orders",
        "owner",
        "fetch",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other",
        "price",
        "personal",
        "dashboard",
        "trinity"
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。',
      cooperateContentPlaceHolder: '1.播放量100w，点赞量3w，转发量1w、观看量3W等等；\n2.以关爱女性为主题，搭配浪漫温馨风格，完美植入了XX产品或进行了xx主题视频发布；\n	3.促进了产品销售，达到了推广效果，登上平台热门推荐，取得良好效果。'
    }
  }
}
// 平台对应模块码表
export const platformToType = Object.entries(diffByTypes).reduce((obj, [key, item]) => {
  item['platforms'].forEach(i => {
    obj[i] = {
      key,
      platformId: i,
      platformName: platformView[i] || '未知平台',
      ...item,
      configure: {
        ...item.configure,
        cooperateContentPlaceHolder: cooperateContentPlaceHolderMap[i],
        cooperateBrandPlaceHolder: cooperateBrandPlaceHolderMap[i],
        cooperateLinkPlaceHolder: cooperateLinkPlaceHolderMap[i]
      }
    }

    delete obj[i].platforms
  })
  // 添加一个未知平台
  obj["-1"] = {
    key: '-1',
    platformId: -1,
    platformName: '未知平台',
    ...diffByTypes.normal
  }
  delete obj["-1"].platforms
  return obj
}, {})

// 配置项itemKey对应字段名称
export const configItemKeyToField = {
  "ggzdxs1": "postPlatform",
  "ggzdxs2": "productPlacement",
  "hzxz1": "isAcceptHardAd",
  "hzxz2": "refuseBrands",
  "hzxz3": "isAcceptProductUse",
  "hzxz4": "manuscriptModificationLimit",
  "hzxz5": "videoShotArea",
  "hzxz6": "liveArea",
  "hzxz7": "manuscriptModificationLimit",
  "zhzdxs1": "showWindow",
  "zhzdxs2": "isSupportLive"
}
export const configOptions = {
  mediaTypeMap: {
    "2": "个人号-具有个人的属性特征",
    "3": "企业号-社会上的企业或官方注册",
    "4": " 内容号-不具有人的属性特征、仅以内容存在"
  },
  educationQualification: [
    { key: 1, text: '初中' },
    { key: 2, text: '高中' },
    { key: 3, text: '中技' },
    { key: 4, text: '中专' },
    { key: 5, text: '大专' },
    { key: 6, text: '本科' },
    { key: 7, text: '硕士' },
    { key: 8, text: 'MBA' },
    { key: 9, text: 'EMBA' },
    { key: 10, text: '博士' }
  ],
  relationshipStatus: [
    { value: 1, label: '单身' },
    { value: 2, label: '情侣' },
    { value: 3, label: '已婚' },
    { value: 4, label: '离婚' }
  ]
}
