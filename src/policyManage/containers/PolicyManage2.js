import React from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Form, DatePicker, Spin, Input, message } from 'antd';
// import CommonTitle from "../components/CommonTitle";
// import RulesWrapper from "../components/RulesWrapper";
// import WhiteList from "../components/WhiteList";
import PageInfo from "../components/PageInfo";
import StopReasonModal from "../components/StopReasonModal";
import moment from 'moment';
import * as actions from '../actions/pricePolicy';
import './PolicyManage.less';
import qs from 'qs';
import RuleModule from '../components/RuleModule'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
// const RadioGroup = Radio.Group;
const { TextArea } = Input;

class PolicyManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stopModal: false
        }
        // this.rateOption = [
        // 	{ label: '未知', value: 0 },
        // 	{ label: '月', value: 1 },
        // 	{ label: '季', value: 2 },
        // 	{ label: '半年', value: 3 },
        // 	{ label: '年', value: 4 },
        // ];
    }

    componentDidMount() {
        const search = this.props.location.search.substring(1);
        const userId = qs.parse(search)['userId'];
        const policyId = qs.parse(search)['id'];
        const userName = qs.parse(search)['name'];

        if (policyId !== undefined)
            this.props.getPolicyDetail(policyId);
        this.setState({ policyId, userName, userId })
    }

    componentDidUpdate(prevProps) {
        const { progress: prevProgress } = prevProps;
        const { errorMsg = '操作失败', newPolicyId, progress, msg = '操作成功' } = this.props;

        if (prevProgress !== progress && progress === 'fail') {
            this.getErrorTips(errorMsg, 'error');
        } else if (prevProgress !== progress && progress === 'saveSuccess') {
            this.getErrorTips(msg, 'success');
            if (newPolicyId) {
                this.props.history.replace(`/account/policy?id=${newPolicyId}`)
                window.location.reload();
            }
        }
    }

    getErrorTips = (msg, type = 'error') => {
        try {
            if (typeof message.destroy === 'function') {
                message.destroy();
            }
            message[type](msg);
        } catch (error) {
            console.log(error);
        }
    };

    getDisabledDate = (current) => {
        const { timeRange = [] } = this.state;

        if (timeRange[0])
            // return !(!(current && current <= moment().subtract(1, 'days').endOf('day')) && current.diff(timeRange[0], 'days') > 60); //60天内不可选
            return current && current <= moment().subtract(1, 'days').endOf('day');
    }

    handleSavePolicy = () => {
        const { form, policyDetail = {} } = this.props;
        const { policyId, userId } = this.state;
        const { id, policyStatus } = policyDetail;

        form.validateFields((err, values) => {
            if (err) return;
            const { policyTime = [], illustration } = values;
            const updateObj = {
                validStartTime: policyTime[0].format('YYYY-MM-DD 00:00:00'),
                validEndTime: policyTime[1].format('YYYY-MM-DD 00:00:00'),
                illustration
            };
            const isEdit = policyId !== undefined;
            let method = isEdit ? 'editPolicy' : 'addPolicy';

            if (isEdit) {
                Object.assign(updateObj, { id, policyStatus })
            } else {
                Object.assign(updateObj, { userId })
            }

            this.props.updatePriceInfo(updateObj, method).then(() => {
                if (isEdit)
                    this.props.getPolicyDetail(policyId);
            });
        })
    }

    handleChangeDate = (timeRange) => {
        this.setState({ timeRange });
    }

    handleChangeDateRange = () => {
        this.setState({ timeRange: [] })
    }

    judgeInputLenth = (_, value, callback) => {
        if (value && value.length <= 2000) {
            callback();
        } else if (!value) {
            callback('请输入政策说明')
        } else if (value.length > 200) {
            callback('政策说明最多可输入2000字')
        }
    }

    isShowStopModal = () => {
        this.setState({ stopModal: !this.state.stopModal })
    }

    handleStopPolicy = (value) => {
        const { policyDetail = {} } = this.props;
        const { policyId } = this.state;
        const { id, policyStatus } = policyDetail;
        Object.assign(value, { id, policyStatus });

        this.props.updatePriceInfo(value, 'stopPolicy').then(() => {
            if (policyId !== undefined)
                this.props.getPolicyDetail(policyId);
        });
        this.isShowStopModal();
    }

    render() {
        return [
            <div key='policyWrapper' className='policyWrapper'>
                <RuleModule></RuleModule>
            </div>
        ]
    }
}

const mapStateToProps = (state) => {
    const { pricePolicyReducer = {} } = state;
    const { policyDetail, newPolicyId, progress, errorMsg, msg } = pricePolicyReducer;

    return { policyDetail, newPolicyId, progress, errorMsg, msg };
}

const mapDispatchToProps = (dispatch) => (
    bindActionCreators({
        ...actions
    }, dispatch)
)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(PolicyManage))
