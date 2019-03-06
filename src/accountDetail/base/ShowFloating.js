import React, { Component } from 'react'
class ShowFloating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFloat: false
    };
  }
  componentDidMount = () => {
    document.getElementById('app-content-children-id').onscroll = () => {
      console.log('====================================');
      console.log(111);
      console.log('====================================');
    }
  }
  componentWillUnmount = () => {
    document.getElementById('app-content-children-id').onscroll = null
  }
  render() {
    const { floatContent, showContent } = this.props

    return (
      <div>
        <div >
          {floatContent}
        </div>
        {showContent}
        <div id="bottom-over-id" style={{ border: '1px solod #f00' }}>s</div>
      </div>
    );
  }
}

export default ShowFloating;
