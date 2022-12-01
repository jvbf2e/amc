use crate::{
  config::Config,
  feat,
  utils::resolve
};
use anyhow::Result;
use tauri::{
  api, AppHandle, CustomMenuItem, Manager, SystemTrayEvent, SystemTrayMenu, SystemTrayMenuItem,
  SystemTraySubmenu,
};

pub struct Tray {}

impl Tray {
  pub fn tray_menu(app_handle: &AppHandle) -> SystemTrayMenu {
    let zh = { Config::amc().latest().language == Some("zh".into()) };

    let version = app_handle.package_info().version.to_string();

    if zh {
      SystemTrayMenu::new()
        .add_item(
          CustomMenuItem::new("app_version", format!("Version {version}")).disabled(),
        )
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("show", "打开AMC"))
        .add_item(CustomMenuItem::new("quit", "退出").accelerator("CmdOrControl+Q"))
    } else {
      SystemTrayMenu::new()
        .add_item(
          CustomMenuItem::new("app_version", format!("Version {version}")).disabled(),
        )
        .add_native_item(SystemTrayMenuItem::Separator)
        .add_item(CustomMenuItem::new("show", "Dashboard"))
        .add_item(CustomMenuItem::new("quit", "Quit").accelerator("CmdOrControl+Q"))
    }
  }

  pub fn update_systray(app_handle: &AppHandle) -> Result<()> {
    app_handle
      .tray_handle()
      .set_menu(Tray::tray_menu(app_handle))?;
    Ok(())
  }

  pub fn on_system_tray_event(app_handle: &AppHandle, event: SystemTrayEvent) {
    match event {
      SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        "show" => resolve::create_window(app_handle),
        "quit" => {
          resolve::resolve_reset();
          api::process::kill_children();
          app_handle.exit(0);
          std::process::exit(0);
        }
        _ => {}
      }
      _ => {}
    }
  }
}
