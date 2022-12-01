use crate::utils::{dirs, help};
use anyhow::Result;
use serde::{Deserialize, Serialize};

/// ### `amc.yaml` schema
#[derive(Default, Debug, Clone, Deserialize, Serialize)]
pub struct IAmc {
  /// 应用单例的应用监听端口
  pub app_singleton_port: Option<u16>,

  // i18n
  pub language: Option<String>,

  /// `light` or `dark` or `system`
  pub theme_mode: Option<String>,

  /// can the app auto startup
  pub enable_auto_launch: Option<bool>,

  /// hotkey map
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

  /// 在初始化前尝试拿到单例端口的值
  pub fn get_singleton_port() -> u16 {
    #[cfg(not(feature = "amc-dev"))]
    const SERVER_PORT: u16 = 33331;
    #[cfg(feature = "amc-dev")]
    const SERVER_PORT: u16 = 11233;

    match dirs::amc_path().and_then(|path| help::read_yaml::<IAmc>(&path)) {
      Ok(config) => config.app_singleton_port.unwrap_or(SERVER_PORT),
      Err(_) => SERVER_PORT, // 这里就不log错误了
    }
  }
}
