use super::{Draft, IAmc, IQucent};
use crate::{
  utils::{dirs},
};
use crate::log_err;
use anyhow::{Result};
use once_cell::sync::OnceCell;
use std::{env::temp_dir, path::PathBuf};

pub const RUNTIME_CONFIG: &str = "qucent-amc.yaml";
pub const CHECK_CONFIG: &str = "qucent-amc-check.yaml";

#[derive(Debug)]
pub enum ConfigType {
  Run,
  Check,
}

pub struct Config {
  qucent_config: Draft<IQucent>,
  amc_config: Draft<IAmc>,
}

impl Config {
  pub fn global() -> &'static Config {
    static CONFIG: OnceCell<Config> = OnceCell::new();

    CONFIG.get_or_init(|| Config {
      qucent_config: Draft::from(IQucent::new()),
      amc_config: Draft::from(IAmc::new()),
    })
  }

  pub fn qucent() -> Draft<IQucent> {
    Self::global().qucent_config.clone()
  }

  pub fn amc() -> Draft<IAmc> {
    Self::global().amc_config.clone()
  }

  /// 初始化配置
  pub fn init_config() -> Result<()> {
    log_err!(Self::generate());

    if let Err(err) = Self::generate_file(ConfigType::Run) {
      log::error!(target: "app", "{err}");
    }

    Ok(())
  }

  /// 将配置放入文件夹
  pub fn generate_file(typ: ConfigType) -> Result<PathBuf> {
    let path = match typ {
      ConfigType::Run => dirs::app_home_dir()?.join(RUNTIME_CONFIG),
      ConfigType::Check => temp_dir().join(CHECK_CONFIG),
    };

    Ok(path)
  }

  /// 生成配置
  pub fn generate() -> Result<()> {
    Ok(())
  }
}
