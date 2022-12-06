use crate::utils::{dirs, help};
use anyhow::Result;
use serde::{Deserialize, Serialize};

/// ### `qucent.yaml` schema
#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct IQucent {
  /// 开机自启动
  pub enable_auto_launch: Option<bool>,

  /// 自动安装更新
  pub enable_auto_update: Option<bool>,

  /// 国际化
  pub language: Option<String>,

  /// 主题模式：`light` or `dark` or 'system'
  pub theme_mode: Option<String>,

  /// 下载保存路径
  pub file_save_location: Option<String>,

  /// 下载前询问保存路径
  pub ask_before_download: Option<bool>
}

impl IQucent {
  pub fn new() -> Self {
    match dirs::qucent_path().and_then(|path| help::read_yaml::<IQucent>(&path)) {
      Ok(config) => config,
      Err(err) => {
        log::error!(target: "app", "{err}");
        Self::template()
      }
    }
  }

  pub fn template() -> Self {
    Self {
      enable_auto_launch: Some(false),
      enable_auto_update: Some(false),
      language: match cfg!(feature = "default-meta") {
        false => Some("en".into()),
        true => Some("zh".into()),
      },
      theme_mode: Some("system".into()),
      ask_before_download: Some(false),
      ..Self::default()
    }
  }

  /// Save IQucent App Config
  pub fn save_file(&self) -> Result<()> {
    help::save_yaml(&dirs::qucent_path()?, &self, Some("# Qucent Amc Config"))
  }

  /// patch amc config
  /// only save to file
  pub fn patch_config(&mut self, patch: IQucent) {
    macro_rules! patch {
      ($key: tt) => {
        if patch.$key.is_some() {
          self.$key = patch.$key;
        }
      };
    }

    patch!(language);
    patch!(theme_mode);

    patch!(enable_auto_launch);
  }
}
