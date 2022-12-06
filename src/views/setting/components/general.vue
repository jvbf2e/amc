<template>
  <div class="general-item">
    <div class="general-item__title">主题模式</div>
    <div class="general-item__body">
      <a-checkbox v-model="WebData.isSystem" @change="WebData.handleCheckbox">
        跟随系统
      </a-checkbox>
      <p class="checkbox-msg">勾选后，AMC将跟随设备的系统设置切换主题模式</p>
      <a-radio-group
        v-model="WebData.themeMode"
        :disabled="WebData.isSystem"
        @change="WebData.handleRadio"
      >
        <a-radio value="light">
          <template #radio="{ checked }">
            <div class="custom-radio-card">
              <div class="custom-radio-card__body">
                <div class="custom-radio-card__skeleton">
                  <div class="skeleton-item">
                    <span class="skeleton-item-circle"></span>
                    <span class="skeleton-item-line"></span>
                  </div>
                  <div class="skeleton-item">
                    <span class="skeleton-item-circle"></span>
                    <span class="skeleton-item-line blue"></span>
                  </div>
                </div>
              </div>
              <div
                :class="[
                  'custom-radio-card__footer',
                  {
                    'custom-radio-card__checked': checked,
                    disabled: WebData.isSystem,
                  },
                ]"
              >
                <div class="custom-radio-card__mask">
                  <div className="custom-radio-card__mask-dot" />
                </div>
                <span>浅色</span>
              </div>
            </div>
          </template>
        </a-radio>
        <a-radio value="dark">
          <template #radio="{ checked }">
            <div class="custom-radio-card">
              <div class="custom-radio-card__body">
                <div class="custom-radio-card__skeleton dark">
                  <div class="skeleton-item">
                    <span class="skeleton-item-circle"></span>
                    <span class="skeleton-item-line"></span>
                  </div>
                  <div class="skeleton-item">
                    <span class="skeleton-item-circle"></span>
                    <span class="skeleton-item-line blue"></span>
                  </div>
                </div>
              </div>
              <div
                :class="[
                  'custom-radio-card__footer',
                  {
                    'custom-radio-card__checked': checked,
                    disabled: WebData.isSystem,
                  },
                ]"
              >
                <div class="custom-radio-card__mask">
                  <div className="custom-radio-card__mask-dot" />
                </div>
                <span>深色</span>
              </div>
            </div>
          </template>
        </a-radio>
      </a-radio-group>
    </div>
  </div>
  <div class="general-item">
    <div class="general-item__title">主题色</div>
    <div class="general-item__body">
      <a-radio-group
        v-model="WebData.themeColor"
        @change="WebData.handleChange"
      >
        <a-radio value="darkblue">
          <template #radio="{ checked }">
            <div class="custom-radio-card">
              <div class="custom-radio-card__body">
                <div class="custom-radio-card__layout darkblue">
                  <div class="skeleton"></div>
                </div>
              </div>
              <div
                :class="[
                  'custom-radio-card__footer',
                  { 'custom-radio-card__checked': checked },
                ]"
              >
                <div class="custom-radio-card__mask">
                  <div className="custom-radio-card__mask-dot" />
                </div>
                <span>深邃蓝</span>
              </div>
            </div>
          </template>
        </a-radio>
        <a-radio value="blue">
          <template #radio="{ checked }">
            <div class="custom-radio-card">
              <div class="custom-radio-card__body">
                <div class="custom-radio-card__layout blue">
                  <div class="skeleton"></div>
                </div>
              </div>
              <div
                :class="[
                  'custom-radio-card__footer',
                  { 'custom-radio-card__checked': checked },
                ]"
              >
                <div class="custom-radio-card__mask">
                  <div className="custom-radio-card__mask-dot" />
                </div>
                <span>经典蓝</span>
              </div>
            </div>
          </template>
        </a-radio>
        <a-radio value="gray">
          <template #radio="{ checked }">
            <div class="custom-radio-card">
              <div class="custom-radio-card__body">
                <div class="custom-radio-card__layout gray">
                  <div class="skeleton"></div>
                </div>
              </div>
              <div
                :class="[
                  'custom-radio-card__footer',
                  { 'custom-radio-card__checked': checked },
                ]"
              >
                <div class="custom-radio-card__mask">
                  <div className="custom-radio-card__mask-dot" />
                </div>
                <span>简约灰</span>
              </div>
            </div>
          </template>
        </a-radio>
      </a-radio-group>
    </div>
  </div>
  <div class="general-item">
    <div class="general-item__title">显示语言</div>
    <div class="general-item__body">
      <a-select v-model="WebData.language" :style="{ width: '500px' }">
        <a-option disabled>English</a-option>
        <a-option>简体中文</a-option>
      </a-select>
    </div>
  </div>
  <div class="general-item">
    <div class="general-item__title">文件保存位置</div>
    <div class="general-item__body">
      <a-input v-model="WebData.url" :style="{ width: '500px' }">
        <template #suffix>
          <a-link href="javascript:;">更改</a-link>
        </template>
      </a-input>
    </div>
  </div>
  <div class="general-item">
    <div class="general-item__title">网络诊断</div>
    <div class="general-item__body">
      <p class="general-item__msg">
        当AMC提示网络连接异常时，可通过网络诊断以确定问题并获取解决方案
        <!-- <a-link href="javascript:;" :hoverable="false">开始诊断</a-link> -->
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { GlobalStore } from '@/store'
import { patchQucentConfig } from '@/services/cmd'

const globalStore = GlobalStore()

const WebData = reactive({
  isSystem: globalStore.getThemeSystem,
  themeMode: 'light' as 'light' | 'dark',
  themeColor: 'darkblue' as 'darkblue' | 'blue' | 'gary',
  language: '简体中文',
  url: '',
  setTheme: () => {},
  handleCheckbox: (value: any) => {
    if (value) {
      patchQucentConfig({ theme_mode: 'system' })
    } else {
      const { matches } = window.matchMedia('(prefers-color-scheme: light)')
      patchQucentConfig({ theme_mode: matches ? 'light' : 'dark' })
    }
  },
  handleChange: (value: any) => {
    globalStore.setThemeColor(value)
  },
  handleRadio: (value: any) => {
    patchQucentConfig({ theme_mode: value })
  },
})

const getThemeMode = () => {
  const { matches } = window.matchMedia('(prefers-color-scheme: light)')
  WebData.themeMode = matches ? 'light' : 'dark'
}

const switchThemeMode = () => {
  if (WebData.themeMode === 'light') {
    document.body.removeAttribute('arco-theme')
  } else {
    document.body.setAttribute('arco-theme', 'dark')
  }
}

watchEffect(() => {
  if (WebData.isSystem) {
    getThemeMode()
  } else {
    switchThemeMode()
  }
})
</script>

<style lang="less" scoped>
.general-item {
  position: relative;

  & + & {
    margin-top: 24px;
  }

  &__title {
    color: var(--color-text-1);
    font-size: 14px;
  }

  &__body {
    margin-top: 12px;

    .checkbox {
      position: relative;

      &-msg {
        margin: 6px 0 12px;
        padding-left: 27px;
        color: var(--color-text-3);
        font-size: 12px;
      }
    }
  }

  &__msg {
    margin: 0;
    color: var(--color-text-3);
    font-size: 12px;
  }
}

.skeleton-item {
  display: flex;

  align-items: center;

  & + & {
    margin-top: 6px;
  }

  &-circle {
    display: inline-block;
    margin-right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(var(--gray-2));
  }

  &-line {
    width: 120px;
    height: 20px;
    border-radius: 4px;
    background-color: rgb(var(--gray-2));

    &.blue {
      width: 60px;
      background-color: rgb(var(--blue-1));
    }
  }
}

.custom-radio-card {
  border: 1px solid var(--color-border-2);
  border-radius: 6px;
  overflow: hidden;

  &__body {
    width: 180px;
    min-height: 60px;
  }

  &__footer {
    display: flex;
    align-items: center;
    padding: 6px 6px;
    border-top: 1px solid var(--color-border-2);
    border-radius: 0 0 6px 6px;

    &.disabled {
      .custom-radio-card__mask {
        background-color: rgb(var(--gray-2));
      }
    }
  }

  &__mask {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-right: 6px;
    width: 14px;
    height: 14px;
    border: 1px solid var(--color-border-2);
    border-radius: 100%;
    box-sizing: border-box;

    &-dot {
      width: 4px;
      height: 4px;
      border-radius: 100%;
    }
  }

  &__checked {
    background-color: var(--color-primary-light-1);

    .custom-radio-card__mask {
      background-color: rgb(var(--primary-6));

      &-dot {
        background-color: var(--color-bg-1);
      }
    }

    &.disabled {
      .custom-radio-card__mask {
        background-color: rgb(var(--gray-5));
      }
    }
  }

  &__skeleton {
    padding: 12px;

    &.dark {
      background-color: #000;

      .skeleton-item {
        &-line,
        &-circle {
          background-color: rgba(255, 255, 255, 0.2);
        }

        &-line.blue {
          background-color: rgb(var(--arcoblue-8));
        }
      }
    }
  }

  &__layout {
    position: relative;
    padding: 18px 0 0 18px;
    width: 100%;
    height: 60px;
    background-color: var(--color-bg-1);

    &::after {
      content: '';
      position: absolute;
      top: 5px;
      left: 32%;
      width: 60px;
      height: 8px;
      background-color: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }

    & > .skeleton {
      height: 100%;
      background-color: var(--color-bg-1);
      border-radius: 6px 0 0 0;
      overflow: hidden;
    }

    &.darkblue {
      background: linear-gradient(
        to top left,
        rgb(42, 53, 81) 50%,
        rgba(56, 73, 105, 0.8)
      );
    }

    &.blue {
      background: linear-gradient(
        to top left,
        rgb(74, 118, 223) 50%,
        rgba(64, 122, 226, 0.8)
      );
    }

    &.gray {
      background: linear-gradient(
        to top left,
        rgb(235, 236, 243) 50%,
        rgba(241, 239, 241, 0.8)
      );

      &::after {
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
</style>
