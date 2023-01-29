import requests from "./ajax";

// 管理 + 报价

// 获取管理界面的报价员人员信息
export const reqQuotationList = () => { return requests({ url: '/Manager/getQuotationInfo', method: 'get' }); }

// 获取管理界面的计算书人员信息
export const reqCalculationList = () => requests({ url: '/Manager/getCalculationInfo', method: 'get' });

// 获取登录用户信息
export const reqUserInfo = (params) => requests({ url: '/Login/Person', method: 'post', params });

// 创建用户
export const reqCreateInfo = (params) => requests({ url: '/Manager/createPerson', method: 'post', params });

// 获取报价列表信息
export const reqTitleList = () => requests({ url: '/Quotation/getInitModel', method: 'get' });

// 获取报价页面筛选列表
export const reqFilterList = (data) => requests({ url: '/Quotation/getCombinationInfo', method: 'post', data })

// 发送xlsx文件内容
export const reqSheetList = (data, token) => requests({ url: '/Quotation/putQuoAllInfo', method: 'put', headers: { token }, data })

// 获取最新位号
export const reqLastBit = () => requests({ url: '/Quotation/getLastBit', method: 'get' })

// 获取xlsx静态模板
export const reqInitDemo = (token) => requests({ url: '/Quotation/getStaticInitDemo', headers: { token }, method: 'get' })

// 版本查看
export const reqVersion = (token) => requests({ url: '/Quotation/getAllOrderNumbers', headers: { token }, method: 'get' })

// 版本查看渲染
export const reqVersionDetail = (data, token) => requests({ url: '/Quotation/getPointQuoInfo', headers: { token }, method: 'post', data })

// 获取所有计算书人员
export const reqCounterList = () => requests({ url: '/Quotation/getAllQuoEmployeesName', method: 'get' })

// 获取编号
export const reqSerialcode = () => requests({ url: '/Quotation/getSerialNumber', method: 'get' })
// 计算书


// 计算书

export const getcovered = (token, data) => requests({ url: '/Calculation/getAlarm', headers: { token }, method: 'post', data })
//获取是否覆盖 1 :将编号改为订单号

export const getunfinish = (token) => requests({ url: '/Calculation/getPendingInfo', headers: { token }, method: 'get' })
//获取未完成订单信息 ok 1 :新增订单编号

export const getfinish = (token) => requests({ url: '/Calculation/getCompleteCal', headers: { token }, method: 'get' })
//获取完成订单信息 ok 1 :新增订单编号

export const getunfinishtagnum = (data) => requests({ url: '/Calculation/getBitNumbers', method: 'post', data })
//获取未完成位号信息 ok 1  :将编号改为订单号

export const getfinishtagnum = (data) => requests({ url: '/Calculation/getBitCompleteNumbers', method: 'post', data })
//获取完成位号信息 ok 1 :将编号

export const getcountinform = (data) => requests({ url: '/Calculation/getInputAndOutputInfoAndInitDemo', method: 'post', data })
//获取计算表信息 ok 1  ：将编号改为订单号

export const getsave = (token, data) => requests({ url: '/Calculation/putCalAllInfo', headers: { token }, method: 'post', data })
//保存计算书  ok 1：新增订单号

export const getfinishcount = (data) => requests({ url: '/Calculation/getCalPointCompleteInfo', method: 'post', data })
//获取完成计算书信息 ok 1:：将编号

