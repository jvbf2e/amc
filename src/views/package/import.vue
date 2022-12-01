<template>
  <div class="package">
    <div class="package-card no_drag">
      <div class="package-card-title">
        <span>导入</span>
      </div>
      <div class="package-card-body">
        <div class="main">
          <p class="title">1. 请按照数据模块的格式准备需要导入的数据</p>
          <div class="content">
            <el-button class="no_drag" type="primary">下载模块</el-button>
            <ul>
              <ol>* 请在下载的Excel模块内补充数据，再上传下载的模块文件，本系统支持导入Csv或Xlsx格式数据</ol>
              <ol>* 保存模版时请使用GBK编码，否则可能无法导入</ol>
              <ol>* 若数据为竖排型排列，勾选数据转置</ol>
              <ol>* 数据第一行为项目属性名称，系统可以识别以下属性</ol>
            </ul>
          </div>
        </div>
        <div class="main">
          <p class="title">2. 请按照数据模块的格式请上传按照模块创建Excel需要导入的数据</p>
          <div class="content">
            <el-button class="no_drag" type="primary">上传文件</el-button>
            <el-button class="no_drag" type="primary">上传文件</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="package-card no_drag">
      <div class="package-card-title">
        <span>导入步骤</span>
      </div>
      <div class="package-card-body">
        <div>
          <p class="title">1. 下载表格模板</p>
          <p class="title">2. 将数据复制到模板</p>
          <p class="title">3. 调整数据格式：日期格式如 2022-01-01，百分比请保留百分号，金额保留单位在数字之后将数据复制到模板</p>
          <p class="title">4. 上传文件</p>
          <p class="title">5. 提交</p>
          <p class="title">6. 完成导入</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.package {
  padding: 24px;

  &-card {
    background-color: #fff;

    & + & {
      margin-top: 24px;
    }

    &-title {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 16px 24px;
      color: #333;
      font-size: 14px;
      font-weight: bold;
    }

    &-body {
      position: relative;
      padding: 0 24px 24px;

      .title {
        position: relative;
        font-size: 14px;
        line-height: 2em;
      }

      .main + .main {
        margin-top: 12px;
      }

      .content {
        position: relative;
        margin-top: 12px;
        margin-left: 24px;
        line-height: 2em;

        & > ul {
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
