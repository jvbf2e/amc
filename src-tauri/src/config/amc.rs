use crate::utils::{dirs, help};
use anyhow::Result;
use serde::{Deserialize, Serialize};

/// ### `amc.yaml` schema
#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct IAmc {
  /// 主题色：`darkblue` or `blue` or `gray`
  pub theme_color: Option<String>,

  // 国际化
  pub language: Option<String>,

  /// 主题：`light` or `dark` or `system`
  pub theme_mode: Option<String>,

  /// 自动启动
  pub enable_auto_launch: Option<bool>,

  /// 快捷键
  /// format: {func},{key}
  pub hotkeys: Option<Vec<String>>,
}

impl IAmc {
  pub fn new() -> Self {
    match dirs::amc_path().and_then(|path| help::read_yaml::<IAmc>(&path)) {
      Ok(config) => config,
      Err(err) => {
        log::error!(target: "app", "{err}");
        Self::template()
      }
    }
  }

  pub fn template() -> Self {
    Self {
      language: match cfg!(feature = "default-meta") {
        false => Some("en".into()),
        true => Some("zh".into()),
      },
      theme_mode: Some("system".into()),
      enable_auto_launch: Some(false),
      ..Self::default()
    }
  }

  /// Save IAmc App Config
  pub fn save_file(&self) -> Result<()> {
    help::save_yaml(&dirs::amc_path()?, &self, Some("# Qucent Amc Config"))
  }

  /// patch amc config
  /// only save to file
  pub fn patch_config(&mut self, patch: IAmc) {
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

    patch!(hotkeys);
  }
}
