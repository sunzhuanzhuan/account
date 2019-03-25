import React, { Component } from 'react'
class LookIndex extends Component {
  state = {}
  render() {

    const data = [
      { sex: '男', age: "21", address: "北京" },
      { isfood: '男', cai: "zdasd" },
      { child: 2 }]
    return (
      <div>
        <div style={{ display: "flex" }}>
          <DataItem
            list={[
              { text: '性别', value: '男' },
              { text: '年龄', value: '12' },
              { text: '居住地', value: '北京' }
            ]}
          />
          <DataItem
            list={[
              { text: '是否会自己做饭', value: '是' },
              { text: '擅长菜系', value: '川菜' }
            ]}
          />
          <DataItem
            list={[
              { text: '小孩数量', value: '2' },
              { text: '小孩性别', value: '男' },
              { text: '小孩阶段', value: '小学' }
            ]}
          />

        </div>
        <div style={{ display: "flex" }}>
          <DataItem
            list={[
              { text: '国籍', value: '中国' },
              { text: '语言', value: '汉语' },
              { text: '技能', value: '开发' }
            ]}
          />
          <DataItem
            list={[
              { text: '擅长游戏分类', value: '策略邮箱' },
              { text: '擅长游戏', value: '王者' },
            ]}
          />
          <DataItem list={[]} />
        </div>
        <div style={{ display: "flex" }}>
          <DataItem
            list={[
              { text: '行业', value: '策略邮箱' },
              { text: '社会身份信息外露', value: '王者' },
            ]}
          />
          <DataItem
            list={[
              { text: '养宠物', value: '策略邮箱' },
              { text: '宠物信息', value: '王者' },
              { text: '颜值', value: '王者' },
            ]}
          />
          <DataItem list={[]} />
        </div>
      </div >

    );
  }
}
const DataItem = ({ list }) => {
  return <div style={{ flex: 1 }}>
    {list.map((one, index) => <div key={index} style={{ height: 30 }}>
      {one.text}：{one.value ? one.value : '-'}
    </div>)}
  </div>
}
export default LookIndex;
