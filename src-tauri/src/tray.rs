use tauri::AppHandle;
use tauri::Manager;
use tauri::{SystemTray, SystemTrayMenu, CustomMenuItem, SystemTrayEvent};

// 托盘菜单
pub fn menu() -> SystemTray {
  let tray_menu = SystemTrayMenu::new()
    .add_item(CustomMenuItem::new("show".to_string(), "打开AMC"))
    .add_item(CustomMenuItem::new("hide".to_string(), "隐藏AMC"))
    .add_item(CustomMenuItem::new("quit".to_string(), "退出AMC"));

  // 设置在右键单击系统托盘时显示菜单
  SystemTray::new().with_menu(tray_menu)
}

// 菜单事件
pub fn handler(app: &AppHandle, event: SystemTrayEvent) {
  // 匹配点击事件
  match event {
    // 根据菜单 id 进行事件匹配
    SystemTrayEvent::MenuItemClick { id, .. } => {
      match id.as_str() {
        "quit" => {
          std::process::exit(0);
        }
        "show" => {
          let window = app.get_window("main").unwrap();
          if window.is_visible().unwrap() {
            window.unminimize().unwrap();
            window.set_focus().unwrap();
          } else {
            window.show().unwrap();
          }
        }
        _ => {}
      }
    }
    _ => {}
  }
}
