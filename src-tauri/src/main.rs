#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

pub mod config;
pub mod core;
pub mod utils;
pub mod command;
pub mod feat;

use crate::utils::{init, resolve};
use crate::core::{tray};
use tauri_plugin_websocket::TauriWebsocket;

#[macro_use]
extern crate lazy_static;

lazy_static! {
  static ref IS_MAIN: bool = true;
}

/// Register the command:
fn main() {
  // 初始化配置
  crate::log_err!(init::init_config());

  let context = tauri::generate_context!();

  #[allow(unused_mut)]
  let mut _builder = tauri::Builder::default()
    .system_tray(tray::menu())
    .setup(|app| Ok(resolve::resolve_setup(app)))
    .on_system_tray_event(tray::handler)
    .plugin(TauriWebsocket::default())
    .invoke_handler(tauri::generate_handler![
      command::download_video,
      // amc
      command::get_amc_config,
      command::patch_amc_config,
      // qucent
      command::get_qucent_config,
      command::patch_qucent_config,
    ])
    .run(context)
    .expect("failed to run app");
}
