use anyhow::Result;
use std::path::PathBuf;
use tauri::{
  api::path::{home_dir, resource_dir},
  Env, PackageInfo,
};

#[cfg(not(feature = "amc-dev"))]
static APP_DIR: &str = "qucent-amc";
#[cfg(feature = "amc-dev")]
static APP_DIR: &str = "qucent-amc-dev";

static QUCENT_CONFIG: &str = "config.yaml";
static AMC_CONFIG: &str = "amc.yaml";

static mut RESOURCE_DIR: Option<PathBuf> = None;

pub static mut APP_VERSION: &str = "v1.1.2";

/// 获取amc应用程序主目录
pub fn app_home_dir() -> Result<PathBuf> {
  Ok(home_dir()
    .ok_or(anyhow::anyhow!("无法获取应用程序主目录"))?
    .join(".config")
    .join(APP_DIR))
}

/// 获取资源目录
pub fn app_resources_dir(package_info: &PackageInfo) -> Result<PathBuf> {
  let res_dir = resource_dir(package_info, &Env::default())
    .ok_or(anyhow::anyhow!("无法获取资源目录"))?
    .join("resources");

  unsafe {
    RESOURCE_DIR = Some(res_dir.clone());
    let ver = package_info.version.to_string();
    let ver_str = format!("v{ver}");
    APP_VERSION = Box::leak(Box::new(ver_str));
  }

  Ok(res_dir)
}

/// 获取日志目录
pub fn app_logs_dir() -> Result<PathBuf> {
  Ok(app_home_dir()?.join("logs"))
}

/// 获取Qucent配置文件
pub fn qucent_path() -> Result<PathBuf> {
  Ok(app_home_dir()?.join(QUCENT_CONFIG))
}

/// 获取AMC配置文件
pub fn amc_path() -> Result<PathBuf> {
  Ok(app_home_dir()?.join(AMC_CONFIG))
}
