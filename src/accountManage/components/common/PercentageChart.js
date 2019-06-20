import React from "react"
import numeral from '@/util/numeralExpand'
const PercentageChart = props => {
  const { title, value = [], colors = ["red"] } = props
  return <div className='percentage-chart-container' style={props.style}>
    <header>
      {title}
    </header>
    <main>
      {
        value.map(({ name, value }, n) =>
          <div
            key={name}
            className='column-item'
            style={{height: numeral(value).format('0%'), backgroundColor: colors[n] || colors[0]}}
          />)
      }
    </main>
    {
      value.length ? <footer>
        <div className='value'>
          {value.map(({ value }) => numeral(value).format('0%')).join(' / ')}
        </div>
        <div className='legend'>
          {
            value.map(({ name }, n) => <span key={name}>
            <b style={{backgroundColor: colors[n] || colors[0]}}/>
              {name}
          </span>)
          }
        </div>
      </footer> : "暂无数据"
    }
  </div>

}
export default PercentageChart
