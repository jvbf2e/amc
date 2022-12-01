/*
 * @Author: jvb
 * @LastEditors: jvb
 * @email: tusktalk@163.com
 * @github: https://github.com/tusktalk
 * @Date: 2021-06-11 09:59:40
 * @LastEditTime: 2021-06-23 13:37:35
 * @motto: Hi Virtual Mode
 * @Description: Modify here please
 * @FilePath: \Development\qucentSaasHtml\branches\v3\src\views\customer\src\personalLitigation\src\components\form\src\config.ts
 */
export default {
  tabs: {
    cpws: [
      {
        label: '标题',
        value: 'title',
        isBlock: true,
      },
      {
        label: '案号',
        value: 'caseNo',
      },
      {
        label: '法院名称',
        value: 'court',
      },
      {
        label: '审判员',
        value: 'judge',
      },
      {
        label: '依据',
        value: 'yiju',
      },
      {
        label: '审结日期',
        value: 'sortTime',
        type: 'date',
      },
      {
        label: '审理状态',
        value: 'trialProcedure',
      },
      {
        label: '判决结果',
        value: 'judgeResult',
        isBlock: true,
      },
      {
        label: null,
        value: 'body',
        isBlock: true,
      },
      {
        label: '当事人',
        value: 'partys',
        isBlock: true,
        children: {
          birthday: '当事人出生日期',
          caf: '受理费',
          caseCauseT: '案由',
          courtTypeT: '法院类型',
          caseTypeT: '文书类型',
          lawOffice: '律师事务所',
          lawyer: '委托律师（辩护人）',
          partyFeeT: '判决金额',
          partyPositionT: '诉讼地位（原审）',
          partyResultT: '胜负关系',
          partyTitleT: '当前称号',
          partyType: '主体类型',
          pname: '当事人名称',
        },
      },
    ],
    zxgg: [
      {
        label: '标题',
        value: 'title',
      },
      {
        label: '状态',
        value: 'sign',
      },
      {
        label: '案号',
        value: 'caseNo',
      },
      {
        label: '法院名称',
        value: 'court',
      },
      {
        label: '申请人',
        value: 'proposer',
      },
      {
        label: '地址',
        value: 'address',
      },
      {
        label: '立案日期',
        value: 'sortTime',
        type: 'date',
      },
      {
        label: '终本日期',
        value: 'closeDate',
        type: 'date',
      },
      {
        label: '依据单位',
        value: 'yjdw',
      },
      {
        label: '依据文书',
        value: 'yjCode',
      },
      {
        label: '当事人',
        value: 'partys',
        isBlock: true,
        children: {
          caseStateT: '案件状态',
          execMoney: '执行金额',
          idcardNo: '身份证号码',
          partyType: '主体类型',
          pname: '当事人名称',
        },
      },
    ],
    shixin: [
      {
        label: '案号',
        value: 'caseNo',
      },
      {
        label: '状态',
        value: 'sign',
      },
      {
        label: '法院名称',
        value: 'court',
        isBlock: true,
      },
      {
        label: '发布时间',
        value: 'postTime',
        type: 'date',
      },
      {
        label: '立案时间',
        value: 'sortTime',
        type: 'date',
      },
      {
        label: '依据单位',
        value: 'yjdw',
      },
      {
        label: '依据文号',
        value: 'yjCode',
      },
      {
        label: '义务',
        value: 'yiwu',
        isBlock: true,
      },
      {
        label: null,
        value: 'body',
        isBlock: true,
      },
      {
        label: '当事人',
        value: 'partys',
        isBlock: true,
        children: {
          age: '年龄',
          idcardNo: '身份证号码',
          jtqx: '具体情形',
          lxqkT: '履行情况',
          money: '涉案金额',
          partyType: '主体类型',
          pname: '当事人名称',
          province: '省份',
        },
      },
    ],
    ktgg: [
      {
        label: '标题',
        value: 'title',
        isBlock: true,
      },
      {
        label: '案号',
        value: 'caseNo',
      },
      {
        label: '法院名称',
        value: 'court',
      },
      {
        label: '法庭名称',
        value: 'courtroom',
      },
      {
        label: '法官',
        value: 'judge',
      },
      {
        label: '组织者',
        value: 'organizer',
        isBlock: true,
      },
      {
        label: '开庭日期',
        value: 'ktggId',
        type: 'date',
      },
      {
        label: '开庭时间',
        value: 'sortTime',
        type: 'date',
      },
      {
        label: null,
        value: 'body',
        isBlock: true,
      },
      {
        label: '当事人',
        value: 'partys',
        isBlock: true,
        children: {
          caseCauseT: '案由',
          courtTypeT: '法院类型',
          partyPositionT: '诉讼地位（原审）',
          partyTitleT: '当前称号',
          partyType: '主体类型',
          pname: '当事人名称',
        },
      },
    ],
    fygg: [
      {
        label: '标题',
        value: 'title',
        isBlock: true,
      },
      {
        label: '案号',
        value: 'caseNo',
      },
      {
        label: '法院名称',
        value: 'court',
      },
      {
        label: '立案时间',
        value: 'sortTime',
        type: 'date',
      },
      {
        label: '版面',
        value: 'layout',
      },
      {
        label: null,
        value: 'body',
        isBlock: true,
      },
      {
        label: '当事人',
        value: 'partys',
        isBlock: true,
        children: {
          caseCauseT: '案由',
          courtTypeT: '法院类型',
          ggTypeT: '公告类型',
          partyPositionT: '诉讼地位（原审）',
          partyTitleT: '当前称号',
          partyType: '主体类型',
          pname: '当事人名称',
        },
      },
    ],
    ajlc: [
      {
        label: '标题',
        value: 'title',
        isBlock: true,
      },
      {
        label: '案号',
        value: 'caseNo',
      },
      {
        label: '法院名称',
        value: 'court',
      },
      {
        label: '组织者',
        value: 'sortTime',
      },
      {
        label: '立案时间',
        value: 'sortTime',
        type: 'date',
      },
      {
        label: '诉讼标的',
        value: 'actionObject',
        isBlock: true,
      },
      {
        label: null,
        value: 'body',
        isBlock: true,
      },
      {
        label: '当事人',
        value: 'partys',
        isBlock: true,
        children: {
          ajlcStatusT: '案件状态',
          caseCauseT: '案由',
          courtTypeT: '法院类型',
          partyPositionT: '诉讼地位（原审）',
          partyTitleT: '当前称号',
          partyType: '主体类型',
          pname: '当事人名称',
          trialProcedureS: '审理状态',
        },
      },
    ],
    bgt: [
      {
        label: '标题',
        value: 'title',
      },
      {
        label: '状态',
        value: 'sign',
      },
      {
        label: '案号',
        value: 'caseNo',
      },
      {
        label: '法院名称',
        value: 'court',
      },
      {
        label: '法院等级',
        value: 'courtRankT',
      },
      {
        label: '申请人',
        value: 'proposer',
      },
      {
        label: '立案时间',
        value: 'sortTime',
        type: 'date',
      },
      {
        label: '依据文书',
        value: 'yjCode',
      },
      {
        label: '依据',
        value: 'yiju',
        isBlock: true,
      },
      {
        label: null,
        value: 'body',
        isBlock: true,
      },
      {
        label: '当事人',
        value: 'partys',
        isBlock: true,
        children: {
          address: '地址',
          caseCauseT: '案由',
          execMoney: '标的金额',
          idcardNo: '身份证号码',
          partyType: '主体类型',
          pname: '当事人名称',
        },
      },
    ],
  },
}
