#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod config;
mod core;
mod utils;
mod commands;
mod feat;

use crate::utils::{init, resolve, server};
use tauri::{api, SystemTray};
use tauri_plugin_websocket::TauriWebsocket;

// Register the command:
fn main() -> std::io::Result<()> {
  // 单例检测
  if server::check_singleton().is_err() {
    println!("app 存在");
    return Ok(());
  }

  crate::log_err!(init::init_config());

  #[allow(unused_mut)]
  let mut builder = tauri::Builder::default()
    .system_tray(SystemTray::new())
    .setup(|app| Ok(resolve::resolve_setup(app)))
    .on_system_tray_event(core::tray::Tray::on_system_tray_event)
    .plugin(TauriWebsocket::default())
    .invoke_handler(tauri::generate_handler![
        // common
        commands::download_video
    ]);

  let context = tauri::generate_context!();
  let app = builder.build(context).expect("error while running tauri application");

  app.run(|app_handle, e| match e {
    tauri::RunEvent::ExitRequested { api, .. } => {
      api.prevent_exit();
    }
    tauri::RunEvent::Exit => {
      api::process::kill_children();
      app_handle.exit(0);
    }
    #[cfg(target_os = "macos")]
    tauri::RunEvent::WindowEvent { label, event, .. } => {
      use tauri::Manager;

      if label == "main" {
        match event {
          tauri::WindowEvent::CloseRequested { api, .. } => {
            api.prevent_close();
            app_handle.get_window("main").map(|win| {
              let _ = win.hide();
            });
          }
          _ => {}
        }
      }
    }
    _ => {}
  });

  Ok(())
}
