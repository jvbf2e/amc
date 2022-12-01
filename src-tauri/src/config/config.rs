use super::{Draft, IQucentTemp, IRuntime, IAmc};
use crate::{
    // enhance,
    utils::{dirs, help},
};
use anyhow::{anyhow, Result};
use once_cell::sync::OnceCell;
use std::{env::temp_dir, path::PathBuf};

pub const RUNTIME_CONFIG: &str = "qucent-amc.yaml";
pub const CHECK_CONFIG: &str = "qucent-amc-check.yaml";

pub struct Config {
    qucent_config: Draft<IQucentTemp>,
    amc_config: Draft<IAmc>,
    runtime_config: Draft<IRuntime>,
}

impl Config {
  pub fn global() -> &'static Config {
    static CONFIG: OnceCell<Config> = OnceCell::new();

    CONFIG.get_or_init(|| Config {
      qucent_config: Draft::from(IQucentTemp::new()),
      amc_config: Draft::from(IAmc::new()),
      runtime_config: Draft::from(IRuntime::new()),
    })
  }

  pub fn qucent() -> Draft<IQucentTemp> {
    Self::global().qucent_config.clone()
  }

  pub fn amc() -> Draft<IAmc> {
    Self::global().amc_config.clone()
  }

  pub fn runtime() -> Draft<IRuntime> {
    Self::global().runtime_config.clone()
  }

  /// 初始化配置
  pub fn init_config() -> Result<()> {
    crate::log_err!(Self::generate());
    if let Err(err) = Self::generate_file(ConfigType::Run) {
      log::error!(target: "app", "{err}");

      let runtime_path = dirs::app_home_dir()?.join(RUNTIME_CONFIG);
      // 如果不存在就将默认的qucent文件拿过来
      if !runtime_path.exists() {
        help::save_yaml(
          &runtime_path,
          &Config::qucent().latest().0,
          Some("# Qucent Amc Runtime"),
        )?;
      }
    }
    Ok(())
  }

  /// 将配置丢到对应的文件中
  pub fn generate_file(typ: ConfigType) -> Result<PathBuf> {
    let path = match typ {
      ConfigType::Run => dirs::app_home_dir()?.join(RUNTIME_CONFIG),
      ConfigType::Check => temp_dir().join(CHECK_CONFIG),
    };

    let runtime = Config::runtime();
    let runtime = runtime.latest();
    let config = runtime
      .config
      .as_ref()
      .ok_or(anyhow!("failed to get runtime config"))?;

    help::save_yaml(&path, &config, Some("# Generated by Qucent Amc"))?;
    Ok(path)
  }

  /// 生成配置存好
  pub fn generate() -> Result<()> {
    // let (config, exists_keys, logs) = enhance::enhance();

    // *Config::runtime().draft() = IRuntime {
    //   config: Some(config),
    //   exists_keys,
    //   chain_logs: logs,
    // };

    Ok(())
  }
}

#[derive(Debug)]
pub enum ConfigType {
  Run,
  Check,
}
