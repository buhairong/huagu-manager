import instance from "@/api"

// 数据来源
export function selectCooperationServiceName() {
    return instance({
        url: '/manager/riskManage/riskCondition/selectCooperationServiceName',
        method: 'GET',
    })
}

// 风控条件列表
export function getConditions(data) {
    return instance({
        url: '/manager/riskManage/riskCondition/selectRiskConditionByPage',
        method: 'POST',
        data
    })
}

// 修改判断逻辑
export function updateRiskConditionRule(data) {
    return instance({
        url: '/manager/riskManage/riskCondition/updateRiskConditionRule',
        method: 'POST',
        data
    })
}

// 风控模型列表
export function getModels(data) {
    return instance({
        url: '/manager/riskManage/riskModel/selectModelByPage',
        method: 'POST',
        data
    })
}

// 风控模型创建逻辑条件
export function selectAllServiceApi(data) {
    return instance({
        url: '/manager/riskManage/riskModel/selectAllServiceApi',
        method: 'POST',
        data
    })
}

// 风控模型详情
export function getModelDetail(params) {
    return instance({
        url: '/manager/riskManage/riskModel/selectModelInfo',
        method: 'GET',
        params
    })
}

// 删除风控模型
export function deleteModel(params) {
    return instance({
        url: '/manager/riskManage/riskModel/deleteModel',
        method: 'GET',
        params
    })
}

// 风控模型——启用或停用模板
export function openOrCloseModel(params) {
    return instance({
        url: '/manager/riskManage/riskModel/openOrCloseModel',
        method: 'GET',
        params
    })
}

// 查询金融公司
export function selectCompanyList() {
    return instance({
        url: '/manager/riskManage/selectCompanyListByType',
        method: 'GET',
    })
}

// 创建以及修改模板
export function createAndUpdateModel(data) {
    return instance({
        url: '/manager/riskManage/riskModel/createAndUpdateModel',
        method: 'POST',
        data
    })
}

// 风控订单列表
export function selectRiskListByPage(data) {
    return instance({
        url: '/manager/riskAudit/selectRiskListByPage',
        method: 'POST',
        data
    })
}

// 风控租车订单列表
export function selectRentalRiskList(data) {
    return instance({
        url: '/manager/riskAudit/selectCarRentalRiskListByPage',
        method: 'POST',
        data
    })
}

// 风控订单详情
export function selectRiskOrderDetail(data) {
    return instance({
        url: '/manager/riskAudit/selectRiskOrderDetail',
        method: 'POST',
        data
    })
}

// 风控租车订单详情
export function selectCarRentalRiskOrderDetail(data) {
    return instance({
        url: '/manager/riskAudit/selectCarRentalRiskOrderDetail',
        method: 'POST',
        data
    })
}

// 风控订单 撤销审批
export function updateAuditStatusToPersonal(data) {
    return instance({
        url: '/manager/riskAudit/updateAuditStatusToPersonal',
        method: 'POST',
        data
    })
}

// 风控订单 复审通过或者不通过
export function updateAuditStatusOfAgain(data) {
    return instance({
        url: '/manager/riskAudit/updateAuditStatusOfAgain',
        method: 'POST',
        data
    })
}

// 风控订单 个人/公司风险查询 通过或者不通过
export function updateAuditStatusOfLog(data) {
    return instance({
        url: '/manager/riskAudit/updateAuditStatusOfLog',
        method: 'POST',
        data
    })
}

// 查询需要选择的材料配置
export function certificationConfigList() {
    return instance({
        url: '/manager/riskAudit/certificationConfigList',
        method: 'GET',
    })
}

// 风控订单 添加材料
export function addUserCarSubscribeCertification(data) {
    return instance({
        url: '/manager/riskAudit/addUserCarSubscribeCertification',
        method: 'POST',
        data
    })
}

// 风控订单 添加材料 - 保存保证金、备注
export function addOtherDeposit(data) {
    return instance({
        url: '/manager/riskAudit/addOtherDeposit',
        method: 'POST',
        data
    })
}

// 风控订单 — 失败后重新查询
export function updateRiskQueryAgain(data) {
    return instance({
        url: '/manager/riskAudit/updateRiskQueryAgain',
        method: 'POST',
        data
    })
}

// 风控订单 — 证明材料配置—更新材料审核状态
export function updateCertificationStatus(data) {
    return instance({
        url: '/manager/riskAudit/updateCertificationStatus',
        method: 'POST',
        data
    })
}

// 风控日志列表
export function getLogs(data) {
    return instance({
        url: '/manager/riskManage/riskLog/selectRiskLogByPage',
        method: 'POST',
        data
    })
}

// 开放城市列表
export function getCityList(data) {
    return instance({
        url: '/manager/riskAudit/selectCity',
        method: 'GET',
        data
    })
}

// 风控审核人员列表
export function getAuditUserList(data) {
    return instance({
        url: '/security/authorise/manager/user/selectList',
        method: 'POST',
        data
    })
}

// 担保人审批
export function updateGuarantorInfo(params) {
    return instance({
        url: '/manager/riskAudit/updateGuarantorInfo',
        method: 'GET',
        params
    })
}

// 免押审批
export function updateDepositFreeApply(params) {
    return instance({
        url: '/manager/riskAudit/updateDepositFreeApply',
        method: 'GET',
        params
    })
}

// 租车业务-加收押金
export function addDeposit(params) {
    return instance({
        url: '/manager/manager/depositFreeApply/addDeposit',
        method: 'GET',
        params
    })
}

// 租车业务风控审批
export function rentalApprove(params) {
    return instance({
        url: '/manager/manager/userCarRental/approve',
        method: 'GET',
        params
    })
}
