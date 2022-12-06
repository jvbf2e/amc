use anyhow::{bail, Context, Result};
use serde::{de::DeserializeOwned, Serialize};
use std::{fs, path::PathBuf};

/// 数据保存到文件
/// 设置 `prefix` 添加注释
pub fn save_yaml<T: Serialize>(path: &PathBuf, data: &T, prefix: Option<&str>) -> Result<()> {
  let data_str = serde_yaml::to_string(data)?;

  let yaml_str = match prefix {
    Some(prefix) => format!("{prefix}\n\n{data_str}"),
    None => data_str,
  };

  let path_str = path.as_os_str().to_string_lossy().to_string();
  fs::write(path, yaml_str.as_bytes()).context(format!("无法保存文件 \"{path_str}\""))
}

/// yaml 中读取数据
pub fn read_yaml<T: DeserializeOwned>(path: &PathBuf) -> Result<T> {
  if !path.exists() {
    bail!("找不到文件 \"{}\"", path.display());
  }

  let yaml_str = fs::read_to_string(&path)
    .context(format!("无法读取文件 \"{}\"", path.display()))?;

  serde_yaml::from_str::<T>(&yaml_str).context(format!(
    "无法读取 yaml 格式的文件 \"{}\"",
    path.display()
  ))
}

#[macro_export]
macro_rules! error {
  ($result: expr) => {
    log::error!(target: "app", "{}", $result);
  };
}

#[macro_export]
macro_rules! log_err {
  ($result: expr) => {
    if let Err(err) = $result {
      log::error!(target: "app", "{err}");
    }
  };

  ($result: expr, $err_str: expr) => {
    if let Err(_) = $result {
      log::error!(target: "app", "{}", $err_str);
    }
  };
}

/// wrap the anyhow error
/// transform the error to String
#[macro_export]
macro_rules! wrap_err {
  ($stat: expr) => {
    match $stat {
      Ok(a) => Ok(a),
      Err(err) => {
        log::error!(target: "app", "{}", err.to_string());
        Err(format!("{}", err.to_string()))
      }
    }
  };
}

/// return the string literal error
#[macro_export]
macro_rules! ret_err {
  ($str: expr) => {
    return Err($str.into())
  };
}
