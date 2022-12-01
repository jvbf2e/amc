//！
//! feat mod 里的函数主要用于
//! - hotkey 快捷键
//! - timer 定时器
//! - cmds 页面调用
//!
use crate::config::*;
// use crate::core::*;
use crate::log_err;
use anyhow::{bail, Result};
use serde_yaml::{Mapping, Value};

/// 修改amc的配置
/// 一般都是一个个的修改
pub async fn patch_amc(patch: IAmc) -> Result<()> {
  // Config::amc().draft().patch_config(patch.clone());

  let language = patch.language;
  let auto_launch = patch.enable_auto_launch;

  // match {
  //   if auto_launch.is_some() {
  //     sysopt::Sysopt::global().update_launch()?;
  //   }

  //   // if let Some(hotkeys) = patch.hotkeys {
  //   //   hotkey::Hotkey::global().update(hotkeys)?;
  //   // }

  //   if language.is_some() {
  //     handle::Handle::update_systray()?;
  //   } else if system_proxy.or(tun_mode).is_some() {
  //     handle::Handle::update_systray_part()?;
  //   }

  //   <Result<()>>::Ok(())
  // } {
  //   Ok(()) => {
  //     Config::amc().apply();
  //     // Config::amc().data().save_file()?;
  //     Ok(())
  //   }
  //   Err(err) => {
  //     Config::amc().discard();
  //     Err(err)
  //   }
  // }

  match {
    <Result<()>>::Ok(())
  } {
    Ok(()) => {
      // Config::amc().apply();
      // Config::amc().data().save_file()?;
      Ok(())
    }
    Err(err) => {
      Config::amc().discard();
      Err(err)
    }
  }
}
