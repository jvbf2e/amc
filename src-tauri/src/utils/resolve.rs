use crate::config::Config;
use crate::log_err;
use crate::{core::*, utils::init};
use tauri::{App, Manager};

/// 启动应用程序时处理
pub fn resolve_setup(app: &mut App) {
  #[cfg(target_os = "macos")]
  app.set_activation_policy(tauri::ActivationPolicy::Accessory);

  log_err!(init::init_resources(app.package_info()));

  // 启动核心
  log_err!(Config::init_config());

  // 开启自启动
  log_err!(sysopt::Sysopt::global().init_launch());
  // 设置热键
  log_err!(hotkey::Hotkey::global().init(app.app_handle()));
}
