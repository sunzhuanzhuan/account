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
import { platformView } from "@/accountManage/constants/platform";

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
  let platformData = platformToType[platformId] || platformToType["-1"]
  // 获取该平台的差异性配置
  let _modules = intersection(filterSource, platformData.visibility.modules).map(key => modulesMap[key])
  return update(platformData, { visibility: { modules: { $set: _modules } } })
}
export const tabs = [
  {
    index: '1',
    title: '账号信息',
    warp: [
      // "owner",
      // "fetch",
      // "main",
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

// 平台差异性
export const diffByTypes = {
  "default": {
    platforms: [115, 24, 103, 120, 111, 119, 118, 116, 30, 29, 110, 100, 101, 102],
    visibility: {
      fields: {
        weiboUrl: true,
        uniqueId: true,
        url: true
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
          title: '抓取信息',
          field: 'url',
          placeholder: '请输入主页链接'
        }
      ],
      introductionPlaceholder: '搞笑视频达人，视频风格犀利独到，容易引起话题性传播；曾创作过“xxxx”系列节目，取得xxx万播放量。在XXX等多个视频平台均可发布若您不接受原创合作，可写：帐号支持发布客户的指定视频，支持多平台发布等',
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。',
      verifiedType: {
        2: "达人认证",
        3: "企业认证"
      }
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
      ],
      introductionPlaceholder: '微博知名段子手/大V/星座达人，致力于网络新起事物、热点事件、热门电影等相关的创作，内容有自己的独特视角；出版作品《xxxx》等。若您不接受原创合作，可写：帐号支持转发，可支持下微任务防屏蔽，可购买粉丝头条等',
      verifiedType: {
        2: "黄V",
        3: "蓝V",
        6: "金V",
        4: "达人"
      }
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
      ],
      introductionPlaceholder: '知名微信公众号媒体，“学最好的穿搭，做最好的女人”。专注时尚穿搭，拥有XX万粉丝，粉丝多为高黏性的女性白领群体，具有较高的商业转化价值；合作过多个时尚美妆品牌，紧抓客户要点，撰稿经验丰富。若您不接受原创合作，可写：帐号支持客户给稿直发，可添加二维码、原文链接等',
      disabledFollowersCount: true
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
        "owner",
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
      ],
      introductionPlaceholder: '请输入账号简介'
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
        "owner",
        "main",
        "cooperation",
        "strategy",
        "content",
        "other"
      ]
    },
    configure: {
      introductionPlaceholder: '请输入账号简介'
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
      }
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
      ],
      introductionPlaceholder: '请输入账号简介'
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
      ],
      introductionPlaceholder: '搞笑视频达人，视频风格犀利独到，容易引起话题性传播；曾创作过“xxxx”系列节目，取得xxx万播放量。在XXX等多个视频平台均可发布若您不接受原创合作，可写：帐号支持发布客户的指定视频，支持多平台发布等'
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。'
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。'
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。'
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
      ],
      introductionPlaceholder: '美女主播，自带90后美女coser属性，微博月流量百万金v用户。善于表达，接地气打破传统女神形象，多才多艺满足粉丝的多重胃口，知识+正能量打破以往的美女花瓶界限；拥有微博，直播，QQ粉丝群，粉丝粘滞性互动性强； 参加过XXX等品牌的线下发布活动，直播平台专题直播策划活动等。可支持直播活动前在微博上进行预热。'
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
      ...item
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
