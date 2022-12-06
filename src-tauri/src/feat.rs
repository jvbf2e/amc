use crate::config::*;
use crate::core::*;
use anyhow::{Result};

// 查看全部快捷键
pub fn all_hotkey() {}

// 进入或退出全屏
pub fn maximize() {}

// 设置
pub fn setting() {}

// 显示/隐藏 AMC
pub fn amc_show_hide() {}

pub async fn patch_amc(patch: IAmc) -> Result<()> {
  Config::amc().draft().patch_config(patch.clone());

  let auto_launch = patch.enable_auto_launch;
  let language = patch.language;

  match {
    if auto_launch.is_some() {
      sysopt::Sysopt::global().update_launch()?;
    }

    if let Some(hotkeys) = patch.hotkeys {
      hotkey::Hotkey::global().update(hotkeys)?;
    }

    if language.is_some() {
      handle::Handle::update_systray()?;
    }

    <Result<()>>::Ok(())
  } {
    Ok(()) => {
      Config::amc().apply();
      Config::amc().data().save_file()?;
      Ok(())
    }
    Err(err) => {
      Config::amc().discard();
      Err(err)
    }
  }
}

pub async fn patch_qucent(patch: IQucent) -> Result<()> {
  Config::qucent().draft().patch_config(patch.clone());

  let auto_launch = patch.enable_auto_launch;
  // let language = patch.language;

  match {
    if auto_launch.is_some() {
      sysopt::Sysopt::global().update_launch()?;
    }

    // if language.is_some() {
    //   handle::Handle::update_systray()?;
    // }

    <Result<()>>::Ok(())
  } {
    Ok(()) => {
      Config::qucent().apply();
      Config::qucent().data().save_file()?;
      Ok(())
    }
    Err(err) => {
      Config::qucent().discard();
      Err(err)
    }
  }
}
