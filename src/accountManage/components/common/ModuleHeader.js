import React, { PureComponent } from "react";

/**
 * 模块的标题部分
 */
export class ModuleHeader extends PureComponent {
  render() {
    const { title, left, right } = this.props;
    return (
      <div className='header-wrap'>
        <div className='content'>
          <div className='text'>{title}</div>
          {left ? <div className='left'>{left}</div> : null}
          <em className="line" />
          {right ? <div className='right'>{right}</div> : null}
        </div>
      </div>
    );
  }
}
