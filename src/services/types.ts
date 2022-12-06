export interface IAmcConfig {
  enable_auto_launch?: boolean
  hotkeys?: string[]
  language?: string
  theme_mode?: 'light' | 'dark' | 'system'
}

export interface IQucentConfig {
  enable_auto_launch?: boolean
  enable_auto_update?: boolean
  language?: string
  theme_mode?: 'light' | 'dark' | 'system'
  file_save_location?: string
  ask_before_download?: boolean
}
