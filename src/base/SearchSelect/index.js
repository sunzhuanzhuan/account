/**
 * 搜索选择组件
 * Created by lzb on 2018/11/19.
 */
import React, { Component } from "react";
import {
	Select, Spin
} from "antd";
import debounce from 'lodash/debounce';
import PropTypes from 'prop-types'
import uniqBy from 'lodash/uniqBy'

const Option = Select.Option

// 模糊搜索
export default class SearchSelect extends Component {
	static propTypes = {
		placeholder: PropTypes.string,
		empty: PropTypes.string,
		mapResultItemToOption: PropTypes.func,
		action: PropTypes.func.isRequired,
		wordKey: PropTypes.string,
		params: PropTypes.object,
		isEmptySearch: PropTypes.bool
	}
	static defaultProps = {
		mapResultItemToOption: ({ value, label, id, name } = {}) => ({
			value: value || id,
			label: label || name
		}),
		wordKey: 'key_word',
		params: {},
		isEmptySearch: false
	}
	state = {
		data: [],
		searchIng: false,
		value: undefined,
		valueOption: undefined
	}
	search = (value) => {
		// 已经在请求时不再发请求
		// if (this.setState.searchIng) return false
		// 空的时候不发请求
		if (!this.props.isEmptySearch && !value) {
			return
		}
		const { wordKey, params, action } = this.props;
		this.lastFetchId += 1;
		const fetchId = this.lastFetchId;
		this.setState({ searchIng: true });
		action({ [wordKey]: value, ...params })
			.then(({ data: list }) => {
				if (fetchId !== this.lastFetchId) {
					return;
				}
				!this.isUnmount && this.setState({ data: list, searchIng: false });
			})
      .catch(() => {
        !this.isUnmount && this.setState({ searchIng: false });
      })
	}
	handleChange = (value, valueOption) => {
		this.search('')
		this.setState({
			value,
      valueOption,
		}, () => {
			this.props.onChange && this.props.onChange(value)
		});
	}
	focusEvent = () => {
		if (!this.state.searchIng && !this.state.data.length) {
			this.onCancel()
		}
	}
	onCancel = () => {
		if (this.props.isEmptySearch) {
			this.search('')
		} else {
			this.setState({ data: [] })
		}
	}

	constructor(props) {
		super(props);
		this.lastFetchId = 0;
		this.search = debounce(this.search, 800);
	}

	componentDidMount() {
		this.search('')
	}

	componentWillReceiveProps(nextProps) {
		if ('value' in nextProps) {
			this.setState({ value: nextProps.value })
		}
	}

	componentWillUnmount() {
		this.isUnmount = true
	}

	render() {
		const {
			placeholder = '请输入并从下拉框中选择', empty = '输入查询信息',
			mapResultItemToOption,
      labelInValue,
      showSelected
		} = this.props;
		const { searchIng, data, value, valueOption, word } = this.state;
		let options = data.map(mapResultItemToOption)
    if(showSelected && options.length === 0){
      let otherList = valueOption ? valueOption.map(item => {
        return {
          label: item.props.children,
          value: item.key
        }
      }) : []
      options = uniqBy([].concat(options, otherList), 'value')
    }


		return (
			<Select
				showSearch
				allowClear
				labelInValue={labelInValue}
				value={value}
				placeholder={placeholder}
				notFoundContent={searchIng ? <Spin size="small" /> : empty}
				onSearch={this.search}
				onBlur={this.focusEvent}
				onFocus={this.onCancel}
				{...this.props}
				onChange={this.handleChange}
			>
				{options.map(({ value, label }) => {
					return (value && label) ? <Option key={value}>{label}</Option> : null
				})}
			</Select>)
	}
}
