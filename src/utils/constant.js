// 图片上传地址
export const UPLOAD_URL =
  "https://api.51cheyaoshi.com/security/sysFiles/upload";

// 上传图片限制格式
export const IMG_ACCEPT =
  ".jpg,.jpeg,.png,.gif,.bmp,.webp,.JPG,.JPEG,.GIF,.BMP,.WEBP";

// 上传图片限制大小
export const IMG_LIMIT_SIZE = 10;

// 车系类型
export const CAR_TYPES = [
  { value: "0", label: "新能源车" },
  { value: "1", label: "平行进口车" },
  { value: "2", label: "国产车" },
];

// 车型同步轮询时间
export const SYNC_CAR_TYPE_TIME = 5000;

//// 风控
// 适用客户
export const CUSTOM_TYPE = [
  { value: "1", label: "个人用户" },
  { value: "2", label: "企业用户" },
];

export const CUSTOM_TYPE_STATUS = {
  1: "个人用户",
  2: "企业用户",
};

// 适用业务
export const BUSINESS_TYPE = [
  { value: "1", label: "汽车订阅" },
  { value: "2", label: "会员租车" },
  { value: "3", label: "汽车金融" },
];

// 模型状态
export const MODEL_TYPE = [
  { value: "1", label: "启用" },
  { value: "0", label: "停用" },
];

export const MODEL_TYPE_STATUS = {
  0: "停用",
  1: "启用",
};

// 最小金额
export const MIN_AMOUNT = [
  { value: "0", label: "0" },
  { value: "50000", label: "5万" },
  { value: "100000", label: "10万" },
  { value: "150000", label: "15万" },
  { value: "200000", label: "20万" },
  { value: "250000", label: "25万" },
  { value: "300000", label: "30万" },
  { value: "350000", label: "35万" },
  { value: "400000", label: "40万" },
  { value: "500000", label: "50万" },
  { value: "600000", label: "60万" },
  { value: "800000", label: "80万" },
  { value: "1000000", label: "100万" },
  { value: "2000000", label: "200万" },
  { value: "3000000", label: "300万" },
];

// 最大金额
export const MAX_AMOUNT = [
  { value: "50000", label: "5万" },
  { value: "100000", label: "10万" },
  { value: "150000", label: "15万" },
  { value: "200000", label: "20万" },
  { value: "250000", label: "25万" },
  { value: "300000", label: "30万" },
  { value: "350000", label: "35万" },
  { value: "400000", label: "40万" },
  { value: "500000", label: "50万" },
  { value: "600000", label: "60万" },
  { value: "800000", label: "80万" },
  { value: "1000000", label: "100万" },
  { value: "2000000", label: "200万" },
  { value: "3000000", label: "300万" },
  { value: "-1", label: "不限" },
];

// 判断逻辑
export const LOGIC_TYPE = [
  { value: "1", label: "准入" },
  { value: "2", label: "禁入" },
  { value: "3", label: "人工" },
];

// 审核逻辑
export const STATUS_TYPE = [
  { value: "1", label: "成功" },
  { value: "2", label: "失败" },
];

// 车辆信息
export const CAR_TYPE = [
  { value: "1", label: "品牌" },
  { value: "2", label: "车系" },
  { value: "3", label: "年款" },
  { value: "4", label: "车型" },
];

// 审核进度
export const REVIEW_PROGRESS = [
  { value: "1", label: "贷前审核" },
  { value: "2", label: "贷中审核" },
];

// 查询状态
export const SEARCH_STATUS = [
  { value: "0", label: "查询中" },
  { value: "1", label: "成功" },
  { value: "2", label: "失败" },
];

// 审批结果
export const APPROVE_RESULT = [
  { value: "1", label: "通过" },
  { value: "2", label: "拒绝" },
  { value: "3", label: "人工" },
  { value: "4", label: "人工（补充材料）" },
];

// 复审
export const RETRIAL_STATUS = [
  { value: "1", label: "复审通过" },
  { value: "2", label: "复审拒绝" },
  { value: "3", label: "补充材料" },
];

// 审核状态
export const CHECKED_STATUS = {
  1: { label: "初审-通过", fontColor: "#1D2129" },
  2: { label: "初审-未通过", fontColor: "#EA0000" },
  3: { label: "初审-人工", fontColor: "#FF8C00" },
  4: { label: "初审-补充材料", fontColor: "#FF8C00" },
  5: { label: "复审-通过", fontColor: "#1D2129" },
  6: { label: "复审-未通过", fontColor: "#EA0000" },
  7: { label: "复审-补充材料", fontColor: "#FF8C00" },
};

// 审核状态 数组
export const CHECKED_STATUS_ARRAY = [
  { value: "1", label: "初审-通过" },
  { value: "2", label: "初审-未通过" },
  { value: "3", label: "初审-人工" },
  { value: "4", label: "初审-补充材料" },
  { value: "5", label: "复审-通过" },
  { value: "6", label: "复审-未通过" },
  { value: "7", label: "复审-补充材料" },
];

// 个人/企业 风险查询模型状态
export const RISK_QUERY_STATUS = {
  1: { label: "通过", fontColor: "#1D2129" },
  2: { label: "未通过", fontColor: "#EA0000" },
  3: { label: "人工审核", fontColor: "#FF8C00" },
  4: { label: "查询中", fontColor: "#1D2129" },
  5: { label: "查询失败", fontColor: "#EA0000" },
};

// 订单状态 1待签约、2待支付押金、3备车中、4待支付订阅费用、5待交车、6订阅中、7合约结束、8已取消、10待审核、11已审核、12 审核拒绝 13上牌中
export const ORDER_STATUS = {
  1: "待签约",
  2: "待支付押金",
  3: "备车中",
  4: "待支付订阅费用",
  5: "待交车",
  6: "订阅中",
  7: "合约结束",
  8: "已取消",
  10: "待审核",
  11: "已审核",
  12: "审核拒绝",
  13: "上牌中",
};

export const ORDER_STATUS_LIST = [
  { value: "10", label: "待审核" },
  { value: "1", label: "待签约" },
  { value: "2", label: "待支付押金" },
  { value: "3", label: "备车中" },
  { value: "13", label: "上牌中" },
  { value: "5", label: "待交车" },
  { value: "4", label: "待支付订阅费用" },
  { value: "6", label: "订阅中" },
  { value: "7", label: "合约结束" },
  { value: "12", label: "审核拒绝" },
  { value: "8", label: "已取消" },
];

// 支付方式
export const PAYMENT_TYPE = {
  1: "月付",
  2: "季付",
  3: "年付",
  4: "分两次付",
  0: "一次性付",
};

// 适用业务
export const applyServiceList = [
  // {value: 1, label: '省心订阅'},
  // {value: 2, label: '轻松订阅'},
  { value: 3, label: "省心订阅" },
];

// 跟进状态列表
export const FOLLOW_STATUS_TYPE = [
  { value: "0", label: "已取消" },
  { value: "1", label: "待跟进" },
  { value: "2", label: "跟进中" },
  { value: "3", label: "已完成" },
];

export const FOLLOW_STATUS = {
  0: "已取消",
  1: "待跟进",
  2: "跟进中",
  3: "已完成",
};

// 车辆状态列表
export const CAR_STATUS = [
  { value: "0", label: "在库车" },
  { value: "1", label: "待交车" },
  { value: "2", label: "订阅中" },
];

// 车辆新旧列表
export const CAR_NEW_STATUS = [
  { value: 1, label: "全新车" },
  { value: 2, label: "二手车" },
];

export const CAR_NEW_STATUS_KEY = {
  1: "全新车",
  2: "二手车",
};

// 维修记录跟进状态列表
export const MAINTENANCE_STATUS = [
  { value: "1", label: "跟进中" },
  { value: "2", label: "已完成" },
];

// 认证业务节点，10线上签约、20确认验车
export const IDENTITY_BUSINESS_NODE = {
  10: "签署订阅协议",
  20: "确认交车",
  30: "实名认证",
};

// 认证信息来源，10wecars小程序
export const IDENTITY_RESOURCE = {
  10: "wecars小程序",
};

// 商户角色：1 4s，2 二级销售网络，3 二手车商
export const COMPANY_ROLE = {
  1: "4S店",
  2: "二级销售网络",
  3: "二手车商",
};

// 商户角色：1 4s，2 二级销售网络，3 二手车商
export const COMPANY_ROLE_LIST = [
  { value: 1, label: "4S店" },
  { value: 2, label: "二级销售网络" },
  { value: 3, label: "二手车商" },
];

// 商户所属行业：1 汽车经销商，2金融服务商，3 汽车制造商，4 保险公司，5 修理厂，6 二手车商，7 加油站，8 充电站，9洗车房
export const COMPANY_TYPE = {
  1: "汽车经销商",
  2: "金融服务商",
  3: "汽车制造商",
  4: "保险公司",
  5: "修理厂",
  6: "二手车商",
  7: "加油站",
  8: "充电站",
  9: "洗车房",
};

// 商户状态
export const MERCHANT_STATUS = {
  0: "待入驻",
  1: "已入驻",
};

// 商户状态
export const MERCHANT_STATUS_LIST = [
  { value: 0, label: "待入驻" },
  { value: 1, label: "已入驻" },
];

// 资产持有公司
export const ASSET_COMPANY = {
  1: "是",
  0: "否",
};

// 资产持有公司
export const ASSET_COMPANY_LIST = [
  { value: 1, label: "是" },
  { value: 0, label: "否" },
];

// 差异化服务
export const SERVICE_LIST = [
  {
    id: 1,
    serviceName: "免费大保养",
    size: undefined,
    isChecked: false,
    requireInputCount: true,
  },
  {
    id: 2,
    serviceName: "免费小保养",
    size: undefined,
    isChecked: false,
    requireInputCount: true,
  },
  {
    id: 3,
    serviceName: "免费洗车",
    size: undefined,
    isChecked: false,
    requireInputCount: true,
  },
  {
    id: 4,
    serviceName: "美容装饰",
    size: 1,
    isChecked: false,
    requireInputCount: false,
  },
];

// 保障服务
export const SAFE_LIST = [
  { id: 0, label: "24小时道路救援" },
  { id: 1, label: "免费送车上门" },
];

// 二手车方案状态
export const OLD_CAR_CHECK_STATUS = {
  0: "待入驻",
  1: "已入驻",
  2: "已入驻",
};

// 动力类型
export const POWER_TYPE_LIST = [
  { value: 7, label: "燃油车型" },
  { value: 4, label: "混动车型" },
  { value: 3, label: "纯电车型" },
  { value: 8, label: "其他能源车型" },
];

export const POWER_TYPE = {
  1: "燃油车型",
  4: "混动车型",
  3: "纯电车型",
  7: "其他能源车型",
};

// 价格区间
export const PRICE_SECTION_LIST = [
  { value: 0, label: "30万以内" },
  { value: 1, label: "30万-50万" },
  { value: 2, label: "50万-100万" },
  { value: 3, label: "100万-200万" },
  { value: 4, label: "200万-300万" },
  { value: 5, label: "300万以上" },
];

export const PRICE_SECTION = {
  0: "30万以内",
  1: "30万-50万",
  2: "50万-100万",
  3: "100万-200万",
  4: "200万-300万",
  5: "300万以上",
};

// 订单牌照选择
export const USE_PLATE = {
  0: "第三方牌照",
  1: "自有牌照",
};

// 车辆证照信息
export const CAR_CERTIFICATE = {
  1: "车体发票",
  2: "购置税完税证明",
  3: "车辆合格证",
  4: "车辆登记证（大绿本）",
};

// 风控初审
export const RISK_STATUS = [
  { value: "1", label: "初审通过" },
  { value: "2", label: "初审拒绝" },
];

// 提现状态 1批准，0不批准，2待放款
export const BROKERAGE_RISK_STATUS = [
  { value: 0, label: "不批准" },
  { value: 1, label: "批准" },
  { value: 2, label: "待放款" },
];

export const BROKERAGE_RISK = {
  0: "信息有误",
  1: "已放款",
  2: "待放款",
};

// 签约时间
export const SIGNTIME = [
  { value: 1, label: "立即签约" },
  { value: 2, label: "稍后签约" },
];

export const SIGNTIME_STATUS = {
  1: "立即签约",
  2: "稍后签约",
};

// 签约方式
export const SIGNTYPE = [
  { value: 1, label: "线上签约" },
  { value: 2, label: "线下签约" },
];

export const SIGNTYPE_STATUS = {
  1: "线上签约",
  2: "线下签约",
};

// 订阅周期
export const SUBSCRIBE_PERIOD = [
  { value: 1, label: "半年" },
  { value: 2, label: "一年" },
  { value: 3, label: "一年半" },
  { value: 4, label: "二年" },
  { value: 5, label: "二年半" },
  { value: 6, label: "三年" },
];

export const SUBSCRIBE_PERIOD_STATUS = {
  1: "半年",
  2: "一年",
  3: "一年半",
  4: "二年",
  5: "二年半",
  6: "三年",
};

// 免押金认证职业
export const OCCUPATION = [
  { value: 1, label: "公务人员" },
  { value: 2, label: "教师" },
  { value: 3, label: "医生" },
  { value: 4, label: "世界500强" },
  { value: 5, label: "国内500强" },
  { value: 6, label: "事业单位正式编" },
  { value: 7, label: "其他" },
];

export const OCCUPATION_STATUS = {
  1: "公务人员",
  2: "教师",
  3: "医生",
  4: "世界500强",
  5: "国内500强",
  6: "事业单位正式编",
  7: "其他",
};

// 风控白名单认证状态
export const AUTHENTICATION = [
  { value: 0, label: "未认证" },
  { value: 1, label: "已认证" },
];

export const AUTHENTICATION_STATUS = {
  0: "未认证",
  1: "已认证",
};

// 风控白名单状态
export const AUTHENTICATION_RISK = [
  { value: 0, label: "全部", total: 0 },
  { value: 1, label: "启用", total: 0 },
  { value: 2, label: "停用", total: 0 },
  { value: 3, label: "到期", total: 0 },
];

export const AUTHENTICATION_RISK_DIALOG = [
  { value: 1, label: "启用" },
  { value: 2, label: "停用" },
];

export const AUTHENTICATION_RISK_STATUS = {
  1: "启用",
  2: "停用",
  3: "到期",
};

export const violationDeposit = 10000;

// 计算规则
export const CALCULATOR_RULE_LIST = [
  { value: 1, label: "自动摊销计算" },
  { value: 2, label: "手动设置租金" },
];

export const CALCULATOR_RULE_LIST_STATUS = {
  1: "自动摊销计算",
  2: "手动设置租金",
};

// 模板启用停用状态
export const TEMPLATE_STATUS_LIST = [
  { value: 1, label: "启用" },
  { value: 0, label: "停用" },
];

export const TEMPLATE_STATUS = {
  1: "启用",
  0: "停用",
};

export const defaultApportionFeeRecordList = () => [
  {
    title: "1-6期",
    mouthPayment: undefined,
    input: true,
    rate: "",
    buyoutsFee: undefined,
  },
  {
    title: "7-12期",
    mouthPayment: undefined,
    input: true,
    rate: "",
    buyoutsFee: undefined,
  },
  {
    title: "13-18期",
    mouthPayment: undefined,
    input: true,
    rate: "",
    buyoutsFee: undefined,
  },
  {
    title: "19-24期",
    mouthPayment: undefined,
    input: true,
    rate: "",
    buyoutsFee: undefined,
  },
  {
    title: "25-30期",
    mouthPayment: undefined,
    input: true,
    rate: "",
    buyoutsFee: undefined,
  },
  {
    title: "31-36期",
    mouthPayment: undefined,
    input: true,
    rate: "",
    buyoutsFee: undefined,
  },
];

// 合伙人申请状态
export const PARTNER_APPLY_STATUS_LIST = [
  { value: 0, label: "待审核" },
  { value: 1, label: "审核通过" },
  { value: 2, label: "审核不通过" },
];

export const PARTNER_APPLY_STATUS = {
  0: "待审核",
  1: "审核通过",
  2: "审核不通过",
};

// 租车周期
export const CAR_RENTAL_PERIOD_LIST = [
  { value: 180, label: "180天", period: 180, money: undefined },
  { value: 360, label: "360天", period: 360, money: undefined },
  { value: 720, label: "720天", period: 720, money: undefined },
];

export const CAR_RENTAL_PERIOD_STATUS = {
  180: "半年套餐",
  360: "一年套餐",
  720: "两年套餐",
};

// 租车业务
export const CAR_RENTAL_BUSINESS_TYPE_LIST = [
  { value: 2, label: "随用随还" },
  { value: 1, label: "折扣长租" },
];

export const CAR_RENTAL_BUSINESS_TYPE_STATUS = {
  1: "随用随还",
  2: "折扣长租",
};

// 租车订单状态
export const CAR_RENTAL_ORDER_STATUS = {
  10: "待审核", // 风控审核
  20: "审核拒绝", // 风控审核拒绝
  30: "待签约",
  40: "待支付",
  50: "已取消", // 24小时未支付租金，订单自动取消
  60: "待审核", // 租金 银行转账 财务审核
  70: "备车中",
  80: "待取车",
  85: "送车中",
  90: "待验车",
  100: "用车中",
  110: "待还车",
  115: "接车中",
  120: "已逾期",
  130: "结算中",
  140: "需补缴",
  150: "已完成",
};

// 融购置税
export const TAX_OPEN_LIST = [
  { value: 1, label: "是" },
  { value: 0, label: "否" },
];

export const TAX_OPEN_STATUS = {
  0: "否",
  1: "是",
};

export const POWER_MODE_STATUS = {
  1: "汽油",
  2: "柴油",
  3: "纯电",
  4: "油电混合",
  5: "插电混合",
  6: "增程式混合",
};

// 竞拍车辆状态
export const auctionCarStatusList = [
  { value: 0, label: "审核中" },
  { value: 1, label: "待开始" },
  { value: 2, label: "审核拒绝" },
  { value: 3, label: "已取消" },
  { value: 4, label: "进行中" },
  { value: 5, label: "竞价结束" },
  { value: 6, label: "交易完成" },
];

export const auctionCarStatus = {
  0: "审核中",
  1: "待开始",
  2: "审核拒绝",
  3: "已取消",
  4: "进行中",
  5: "竞价结束",
  6: "交易完成",
};

export const photoType = {
  0: "左前45度",
  1: "车辆正前",
  3: "车辆正侧",
  5: "车辆正后",
  7: "车辆内饰",
  2: "右前45度",
  4: "左后45度",
  6: "右后45度",
  8: "其他细节",
};

// 纠纷审核状态
export const disputeStatusList = [
  { value: 1, label: "待审核" },
  { value: 2, label: "已处理" },
  { value: 3, label: "已驳回" },
];

export const disputeStatus = {
  1: "待审核",
  2: "已处理",
  3: "已驳回",
};

// 取消竞价原因
export const disputeReasonList = [
  { value: "联系不上竞买方", label: "联系不上竞买方" },
  { value: "竞买方毁约行为", label: "竞买方毁约行为" },
  { value: "卖家长时间不联系", label: "卖家长时间不联系" },
  { value: "对最终出价不满意", label: "对最终出价不满意" },
  { value: "车辆出现问题", label: "车辆出现问题" },
  { value: "其他", label: "其他" },
];

// 纠纷处理结果 Disputes.result
export const disputeResultList = [
  { value: 1, label: "商家赔付" },
  { value: 2, label: "用户赔付" },
];

export const disputeResultStatus = {
  1: "商家赔付",
  2: "用户赔付",
};

// 合伙人列表
export const PARTNER_STATUS = [
  { value: 1, label: "个人合伙人" },
  { value: 2, label: "企业合伙人" },
];

export const PARTNER_STATUS_KEY = {
  1: "个人合伙人",
  2: "企业合伙人",
};

// 合伙人任务类型
export const PARTNER_TASK_TYPE = {
  1: "合伙人邀请客户使用WECARS小程序",
  2: "合伙人邀请客户使用WECARS小程序",
  3: "邀请二级合伙人",
  4: "二级合伙人成单后，抽取佣金支付给一级合伙人",
  5: "选择爆单排行榜更新方式",
};

// 合伙人爆单排行榜更新方式
export const PARTNER_RANK_LIST = [
  { value: "1", label: "按周更新" },
  { value: "2", label: "按月更新" },
  { value: "3", label: "按季度更新" },
];

export const PARTNER_RANK_STATUS = {
  1: "按周更新",
  2: "按月更新",
  3: "按季度更新",
};

// 线索管理
// 客户需求
export const PARTNER_CUSTOMERDEMAND_LIST = [
  { value: 1, label: "全款买车" },
  { value: 2, label: "银行分期" },
  { value: 3, label: "融资租赁" },
  { value: 4, label: "长租" },
  { value: 5, label: "零租" },
];

export const PARTNER_CUSTOMERDEMAND_STATUS = {
  1: "全款买车",
  2: "银行分期",
  3: "融资租赁",
  4: "长租",
  5: "零租",
};

// 用车场景
export const PARTNER_VEHICLESCENARIO_LIST = [
  { value: 1, label: "个人用车" },
  { value: 2, label: "企业用车" },
  { value: 3, label: "网约车运营" },
  { value: 4, label: "未知" },
];

export const PARTNER_VEHICLESCENARIO_STATUS = {
  1: "个人用车",
  2: "企业用车",
  3: "网约车运营",
  4: "未知",
};

// 沟通结果
export const PARTNER_COMMUNICATERESULT_LIST = [
  { value: 1, label: "客户忙" },
  { value: 2, label: "信号差" },
  { value: 3, label: "接通挂断" },
  { value: 4, label: "拒绝沟通" },
  { value: 5, label: "随便看看" },
  { value: 6, label: "非本人操作" },
  { value: 7, label: "无人接听" },
  { value: 8, label: "停机" },
  { value: 9, label: "无法拨通" },
  { value: 10, label: "空号" },
];

export const PARTNER_COMMUNICATERESULT_STATUS = {
  1: "客户忙",
  2: "信号差",
  3: "接通挂断",
  4: "拒绝沟通",
  5: "随便看看",
  6: "非本人操作",
  7: "无人接听",
  8: "停机",
  9: "无法拨通",
  10: "空号",
};

// 能源类型
export const PARTNER_ENERGYTYPE_LIST = [
  { value: 1, label: "汽油" },
  { value: 2, label: "新能源" },
  { value: 3, label: "混动" },
  { value: 4, label: "未知" },
];

export const PARTNER_ENERGYTYPE_STATUS = {
  1: "汽油",
  2: "新能源",
  3: "混动",
  4: "未知",
};

// 处理状态
export const PARTNER_STATUS_LIST = [
  { value: 0, label: "待跟进" },
  { value: 1, label: "跟进中" },
  { value: 2, label: "已完成" },
];

export const PARTNER_STATUS_STATUS = {
  0: "待跟进",
  1: "跟进中",
  2: "已完成",
};

// 价格区间
export const PARTNER_PRICERANGE_LIST = [
  { value: 1, label: "10万以内" },
  { value: 2, label: "10-20万" },
  { value: 3, label: "20-30万" },
  { value: 4, label: "30-50万" },
  { value: 5, label: "50-80万" },
  { value: 6, label: "80-100万" },
  { value: 7, label: "100万以上" },
  { value: 8, label: "未知" },
];

export const PARTNER_PRICERANGE_STATUS = {
  1: "10万以内",
  2: "10-20万",
  3: "20-30万",
  4: "30-50万",
  5: "50-80万",
  6: "80-100万",
  7: "100万以上",
  8: "未知",
};

// 用车时间
export const PARTNER_VEHICLEUSAGETIME_LIST = [
  { value: 1, label: "7天内" },
  { value: 2, label: "2周内" },
  { value: 3, label: "30天内" },
  { value: 4, label: "60天内" },
  { value: 5, label: "90天内" },
  { value: 6, label: "半年以内" },
  { value: 7, label: "未知" },
];

export const PARTNER_VEHICLEUSAGETIME_STATUS = {
  1: "7天内",
  2: "2周内",
  3: "30天内",
  4: "60天内",
  5: "90天内",
  6: "半年以内",
  7: "未知",
};

// 是否有效客户
export const PARTNER_VALID_LIST = [
  { value: 0, label: "无效" },
  { value: 1, label: "有效" },
  { value: 2, label: "待定" },
];

export const PARTNER_VALID_STATUS = {
  0: "无效",
  1: "有效",
  2: "待定",
};

// 客户来源
export const PARTNER_SOURCE_LIST = [
  { value: 1, label: "微信-个人注册" },
  { value: 2, label: "微信-合伙人邀请" },
];

export const PARTNER_SOURCE_STATUS = {
  1: "微信-个人注册",
  2: "微信-合伙人邀请",
};

// 可否联系上客户
export const PARTNER_ESTABLISHINGCOMMUNICATIONS_LIST = [
  { value: 1, label: "可以联系上客户" },
  { value: 0, label: "不能联系上客户" },
];

export const PARTNER_ESTABLISHINGCOMMUNICATIONS_STATUS = {
  1: "可以联系上客户",
  0: "不能联系上客户",
};

// 客户意向
export const PARTNER_CUSTOMERINTENTION_LIST = [
  { value: 1, label: "稍后联系客户" },
  { value: 2, label: "客户愿意沟通" },
  { value: 3, label: "客户拒绝沟通" },
];

export const PARTNER_CUSTOMERINTENTION_STATUS = {
  1: "稍后联系客户",
  2: "客户愿意沟通",
  3: "客户拒绝沟通",
};

// 性别
export const SEX_LIST = [
  { value: 1, label: "男" },
  { value: 2, label: "女" },
];

export const SEX_STATUS = {
  1: "男",
  2: "女",
};

// 企业合伙人角色
export const partnerCompanyRoleList = [
  { value: 1, label: "超级管理员", isChecked: false },
  { value: 20, label: "管理员", isChecked: false },
  { value: 30, label: "员工", isChecked: false },
];

export const partnerCompanyRoleStatus = {
  1: "超级管理员",
  20: "管理员",
  30: "员工",
};

// 学历
export const EDUCATION_LIST = [
  { value: 1, label: "博士" },
  { value: 2, label: "研究生" },
  { value: 3, label: "本科" },
  { value: 4, label: "专科" },
  { value: 5, label: "高中" },
  { value: 6, label: "初中" },
];

export const EDUCATION_STATUS = {
  1: "博士",
  2: "研究生",
  3: "本科",
  4: "专科",
  5: "高中",
  6: "初中",
};

// 商务活动
export const BUSINESS_ACTIVITY_LIST = [
  { value: 1, label: "高尔夫" },
  { value: 2, label: "餐饮" },
  { value: 4, label: "娱乐" },
];

export const BUSINESS_ACTIVITY_STATUS = {
  1: "高尔夫",
  2: "餐饮",
  3: "会议",
  4: "娱乐",
};

// 租车订单支付方式
export const PAY_WAY_LIST = [
  { value: 0, label: "微信支付" },
  { value: 2, label: "余额支付" },
  { value: 3, label: "先租后付" },
];

export const PAY_WAY_STATUS = {
  0: "微信支付",
  1: "银行转账",
  2: "余额支付",
  3: "先租后付",
};

// 租车订单状态
export const MEMBER_CAR_RENTAL_ORDER_LIST = [
  { value: 0, label: "待支付" },
  { value: 1, label: "审核中" },
  { value: 2, label: "支付完成" },
  { value: 3, label: "已取消" },
  { value: 4, label: "已完成" },
];

export const MEMBER_CAR_RENTAL_ORDER_STATUS = {
  0: "待支付",
  1: "审核中",
  2: "支付完成",
  3: "已取消",
  4: "已完成",
};

// 商务订单支付方式
export const BUSINESS_ORDER_PAY_WAY_LIST = [
  { value: 1, label: "账户抵扣" },
  { value: 2, label: "支付定金" },
  { value: 3, label: "仅预定" },
];

export const BUSINESS_ORDER_PAY_WAY_STATUS = {
  1: "账户抵扣",
  2: "支付定金",
  3: "仅预定",
};

// 充值订单状态
export const RECHARGE_ORDER_LIST = [
  { value: 0, label: "待支付" },
  { value: 1, label: "待支付" },
  { value: 2, label: "支付完成" },
];

export const RECHARGE_ORDER_STATUS = {
  0: "待支付",
  1: "待支付",
  2: "支付完成",
};
