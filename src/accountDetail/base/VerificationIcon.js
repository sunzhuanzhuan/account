
import React from 'react'
const styleProps = {
  width: 16,
  height: 16,
  marginLeft: 12,
  marginBottom: 3
}
const VerificationIcon = ({ platformId,
  status,
}) => {
  const mapIcon = platformIdStatusMap
  const url = mapIcon[`${platformId}-${status}`]
  return url ? <img src={url} style={styleProps} /> : null
}
const platformIdStatusMap = {
  '1-2': 'http://img.weiboyi.com/vol1/1/102/124/m/p/9047osppo35q11r99p5o506o4op229o2/p1_weibo_v2_2x.png',
  '1-3': 'http://img.weiboyi.com/vol1/1/102/124/d/y/8s6ss564o35q11r99p5o506o4op229o2/p1_weibo_v3_2x.png',
  '1-4': 'http://img.weiboyi.com/vol1/1/102/124/x/e/8s6r837oo35q11r99p5o506o4op229o2/p1_weibo_v4_2x.png',
  '1-6': 'http://img.weiboyi.com/vol1/1/102/124/n/a/8s6sn46qo35q11r99p5o506o4op229o2/p1_weibo_v6_2x.png',
  '9-1': 'http://img.weiboyi.com/vol1/1/102/124/k/l/8so094p1o35q11r99p5o506o4op229o2/p9_weixin_v1.png',
  '24-1': 'http://img.weiboyi.com/vol1/1/102/124/r/x/8so7238so35q11r99p5o506o4op229o2/p24_miaopai_v1_2x.png',
  '30-1': 'http://img.weiboyi.com/vol1/1/102/124/e/o/8sonrposo35q11r99p5o506o4op229o2/p30_tudou_v1_2x.png',
  '93-1': 'http://img.weiboyi.com/vol1/1/102/124/i/t/8sp7pp0oo35q11r99p5o506o4op229o2/p93_red_book_v1.png',
  '102-1': 'http://img.weiboyi.com/vol1/1/102/124/d/m/900102r5o35q11r99p5o506o4op229o2/p102_tencent_v1_2x.png',
  '100-1': 'http://img.weiboyi.com/vol1/1/102/124/j/h/8sq50160o35q11r99p5o506o4op229o2/p100_iqiyi_v1_2x.png',
  '101-1': 'http://img.weiboyi.com/vol1/1/102/124/s/i/8ssrrq35o35q11r99p5o506o4op229o2/p101_sohu_v1_2x.png',
  '105-1': 'http://img.weiboyi.com/vol1/1/102/124/y/z/901460n5o35q11r99p5o506o4op229o2/p105_yingke_v1_2x.png',
  '106-1': 'http://img.weiboyi.com/vol1/1/102/124/p/n/9009qp4qo35q11r99p5o506o4op229o2/p106_yizhibo_v1_2x_.png',
  '109-1': 'http://img.weiboyi.com/vol1/1/102/124/x/k/901460n1o35q11r99p5o506o4op229o2/p109_xiaokaxiu_v1_2x.png',
  '115-3': 'http://img.weiboyi.com/vol1/1/102/124/x/l/903276pno35q11r99p5o506o4op229o2/p115_douyin_v3_2x.png',
  '115-5': 'http://img.weiboyi.com/vol1/1/102/124/y/k/90433n15o35q11r99p5o506o4op229o2/p115_douyin_v5_2x.png',
  '115-6': 'http://img.weiboyi.com/vol1/1/102/124/o/e/90465s30o35q11r99p5o506o4op229o2/p115_douyin_v6_2x.png',
  '116-1': 'http://img.weiboyi.com/vol1/1/102/124/h/i/90462po1o35q11r99p5o506o4op229o2/p116_huo_shan_v1.png',
  '118-1': 'http://img.weiboyi.com/vol1/1/102/124/b/m/90479s0po35q11r99p5o506o4op229o2/p118_xi_gua_v1.png',
  '115-1': 'http://img.weiboyi.com/vol1/1/102/124/x/l/903276pno35q11r99p5o506o4op229o2/p115_douyin_v3_2x.png',
  '25-1': 'http://img.weiboyi.com/vol1/1/102/124/a/b/8so893poo35q11r99p5o506o4op229o2/p25_meipai_v1_2x.png',
  '103-1': 'http://img.weiboyi.com/vol1/1/102/124/m/c/90034r0qo35q11r99p5o506o4op229o2/p103_kuaishou_v1.png',
  '110-1': 'http://img.weiboyi.com/vol1/1/102/124/t/g/8s704no1o35q11r99p5o506o4op229o2/p110_bili_v1.png'
}
export default VerificationIcon


