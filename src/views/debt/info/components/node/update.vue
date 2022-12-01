<template>
  <a-form ref="formRef" :model="FormData.model" layout="vertical">
    <!-- 债权资料交接 -->
    <h4>债权资料交接</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="data_connect-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.data_connect.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="data_connect-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.data_connect.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="data_connect-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.data_connect.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="data_connect-handling" label="处理方式">
          <a-input
            v-model="FormData.model.data_connect.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="data_connect-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.data_connect.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 债权转让通知 -->
    <h4>债权转让通知</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="transfers_notice-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.transfers_notice.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="transfers_notice-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.transfers_notice.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="transfers_notice-risk_control_tips"
          label="风控提示"
        >
          <a-input
            v-model="FormData.model.transfers_notice.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="transfers_notice-handling" label="处理方式">
          <a-input
            v-model="FormData.model.transfers_notice.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="transfers_notice-overdue_reason"
          label="逾期原因分析"
        >
          <a-textarea
            v-model="FormData.model.transfers_notice.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 申请执行人变更 -->
    <h4>申请执行人变更</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="executor_change-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.executor_change.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="executor_change-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.executor_change.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="executor_change-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.executor_change.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="executor_change-handling" label="处理方式">
          <a-input
            v-model="FormData.model.executor_change.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="executor_change-overdue_reason"
          label="逾期原因分析"
        >
          <a-textarea
            v-model="FormData.model.executor_change.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 申请强制/恢复执行 -->
    <h4>申请强制/恢复执行</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="enforce_resume-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.enforce_resume.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="enforce_resume-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.enforce_resume.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="enforce_resume-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.enforce_resume.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="enforce_resume-handling" label="处理方式">
          <a-input
            v-model="FormData.model.enforce_resume.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="enforce_resume-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.enforce_resume.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 处置权移送 -->
    <h4>处置权移送</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="disposal_transfer-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.disposal_transfer.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="disposal_transfer-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.disposal_transfer.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="disposal_transfer-risk_control_tips"
          label="风控提示"
        >
          <a-input
            v-model="FormData.model.disposal_transfer.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="disposal_transfer-handling" label="处理方式">
          <a-input
            v-model="FormData.model.disposal_transfer.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="disposal_transfer-overdue_reason"
          label="逾期原因分析"
        >
          <a-textarea
            v-model="FormData.model.disposal_transfer.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 排除执行异议 -->
    <h4>排除执行异议</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="execute_opposition-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.execute_opposition.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="execute_opposition-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.execute_opposition.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="execute_opposition-risk_control_tips"
          label="风控提示"
        >
          <a-input
            v-model="FormData.model.execute_opposition.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="execute_opposition-handling" label="处理方式">
          <a-input
            v-model="FormData.model.execute_opposition.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="execute_opposition-overdue_reason"
          label="逾期原因分析"
        >
          <a-textarea
            v-model="FormData.model.execute_opposition.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 排除案外人异议 -->
    <h4>排除案外人异议</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="outsider_opposition-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.outsider_opposition.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="outsider_opposition-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.outsider_opposition.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="outsider_opposition-risk_control_tips"
          label="风控提示"
        >
          <a-input
            v-model="FormData.model.outsider_opposition.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="outsider_opposition-handling" label="处理方式">
          <a-input
            v-model="FormData.model.outsider_opposition.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="outsider_opposition-overdue_reason"
          label="逾期原因分析"
        >
          <a-textarea
            v-model="FormData.model.outsider_opposition.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 主要财产评估报告 -->
    <h4>主要财产评估报告</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="property_report-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.property_report.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="property_report-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.property_report.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="property_report-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.property_report.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="property_report-handling" label="处理方式">
          <a-input
            v-model="FormData.model.property_report.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="property_report-overdue_reason"
          label="逾期原因分析"
        >
          <a-textarea
            v-model="FormData.model.property_report.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 意向客户锁定 -->
    <h4>意向客户锁定</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="customer_lock-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.customer_lock.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="customer_lock-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.customer_lock.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="customer_lock-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.customer_lock.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="customer_lock-handling" label="处理方式">
          <a-input
            v-model="FormData.model.customer_lock.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="customer_lock-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.customer_lock.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 发布拍卖公告 -->
    <h4>发布拍卖公告</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="auction_notice-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.auction_notice.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="auction_notice-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.auction_notice.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="auction_notice-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.auction_notice.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="auction_notice-handling" label="处理方式">
          <a-input
            v-model="FormData.model.auction_notice.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="auction_notice-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.auction_notice.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 拍卖成交 -->
    <h4>拍卖成交</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="auction_success-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.auction_success.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="auction_success-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.auction_success.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="auction_success-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.auction_success.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="auction_success-handling" label="处理方式">
          <a-input
            v-model="FormData.model.auction_success.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item
          field="auction_success-overdue_reason"
          label="逾期原因分析"
        >
          <a-textarea
            v-model="FormData.model.auction_success.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 取得成交裁定/抵债裁定 -->
    <h4>取得成交裁定/抵债裁定</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="ruling_related-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.ruling_related.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="ruling_related-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.ruling_related.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="ruling_related-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.ruling_related.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="ruling_related-handling" label="处理方式">
          <a-input
            v-model="FormData.model.ruling_related.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="ruling_related-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.ruling_related.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 拍卖款发还 -->
    <h4>拍卖款发还</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="auction_return-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.auction_return.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="auction_return-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.auction_return.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="auction_return-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.auction_return.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="auction_return-handling" label="处理方式">
          <a-input
            v-model="FormData.model.auction_return.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="auction_return-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.auction_return.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 回本日期 -->
    <h4>回本日期</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="back_data-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.back_data.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="back_data-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.back_data.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="back_data-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.back_data.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="back_data-handling" label="处理方式">
          <a-input
            v-model="FormData.model.back_data.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="back_data-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.back_data.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
    <!-- 盈利日期 -->
    <h4>盈利日期</h4>
    <a-row :gutter="12">
      <a-col :span="12">
        <a-form-item
          field="profit_date-expect_complete_date"
          label="预设完成日期"
        >
          <a-date-picker
            v-model="FormData.model.profit_date.expect_complete_date"
            placeholder="请选择预设完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item
          field="profit_date-actual_complete_date"
          label="实际完成日期"
        >
          <a-date-picker
            v-model="FormData.model.profit_date.actual_complete_date"
            placeholder="请选择实际完成日期"
            style="width: 100%"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="profit_date-risk_control_tips" label="风控提示">
          <a-input
            v-model="FormData.model.profit_date.risk_control_tips"
            placeholder="请输入风控提示"
          />
        </a-form-item>
      </a-col>
      <a-col :span="12">
        <a-form-item field="profit_date-handling" label="处理方式">
          <a-input
            v-model="FormData.model.profit_date.handling"
            placeholder="请输入处理方式"
          />
        </a-form-item>
      </a-col>
      <a-col :span="24">
        <a-form-item field="profit_date-overdue_reason" label="逾期原因分析">
          <a-textarea
            v-model="FormData.model.profit_date.overdue_reason"
            placeholder="请输入逾期原因分析"
            :auto-size="{
              minRows: 2,
              maxRows: 5,
            }"
          />
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import lodash from 'lodash'
import { AppStore, DebtStore } from '@/store'

import type { PropType } from 'vue'
import type { Debt } from '@/api/interface'

const props = defineProps({
  model: {
    type: Object as PropType<Debt.ResReadNodeData>,
  },
})

const Emits = defineEmits(['submitSuccess'])

const appStore = AppStore()
const debtStore = DebtStore()

const formRef = ref()

const FormData = reactive({
  model: lodash.cloneDeep(props.model as Debt.ResReadNodeData),
  handleSubmit: () => {
    formRef.value.validate(async (errors: any) => {
      try {
        if (!errors) {
          const { id, asset_debt_id, ...row } = FormData.model
          await debtStore.apiDebtNodeUpdate({
            id,
            asset_debt_id,
            data_connect: JSON.stringify(FormData.model.data_connect),
            transfers_notice: JSON.stringify(FormData.model.transfers_notice),
            executor_change: JSON.stringify(FormData.model.executor_change),
            enforce_resume: JSON.stringify(FormData.model.enforce_resume),
            disposal_transfer: JSON.stringify(FormData.model.disposal_transfer),
            execute_opposition: JSON.stringify(
              FormData.model.execute_opposition
            ),
            outsider_opposition: JSON.stringify(
              FormData.model.outsider_opposition
            ),
            property_report: JSON.stringify(FormData.model.property_report),
            customer_lock: JSON.stringify(FormData.model.customer_lock),
            auction_notice: JSON.stringify(FormData.model.auction_notice),
            auction_success: JSON.stringify(FormData.model.auction_success),
            ruling_related: JSON.stringify(FormData.model.ruling_related),
            auction_return: JSON.stringify(FormData.model.auction_return),
            back_data: JSON.stringify(FormData.model.back_data),
            profit_date: JSON.stringify(FormData.model.profit_date),
          })
          FormData.handleReset()
          Emits('submitSuccess')
        }
      } catch (error) {
        appStore.setMessage({ content: error as string, type: 'danger' })
      }
    })
  },
  handleReset: () => {
    formRef.value.resetFields()
  },
})

defineExpose({
  handleSubmit: FormData.handleSubmit,
  handleReset: FormData.handleReset,
})
</script>

<style lang="less" scoped></style>
