use crate::{
  config::*,
  feat,
};
use crate::{wrap_err};
use futures_util::StreamExt;
use std::fs::File;
use std::io::Write;
use std::path::Path;
use anyhow::Result;

type CmdResult<T = ()> = Result<T, String>;

#[derive(Clone, serde::Serialize)]
pub struct DownloadProgress {
  current: u64,
  total: u64,
  id: String,
}

// 下载
#[tauri::command]
pub async fn download_video(
  url: &str,
  write_path: &str,
  file_name: &str,
  id: &str,
  window: tauri::Window,
) -> Result<String, String> {
  let file_path = Path::new(write_path).join(file_name.replace(
    |item: char| ['\\', '/', ':', '?', '*', '"', '<', '>', '|'].contains(&item),
    "_",
  ));
  let res = reqwest::Client::new()
    .get(url)
    .header("user-agent","Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
    .send()
    .await
    .map_err(|_| "网络错误")?;
  let res_len = res.content_length().unwrap_or(0);

  if res_len == 0 {
    return Err("视频长度为 0".into());
  }

  let mut downloaded_len = 0_u64;
  let mut stream = res.bytes_stream();
  let mut file = File::create(&file_path).map_err(|_| "文件创建失败")?;

  while let Some(chunk) = stream.next().await {
    let chunk = chunk.map_err(|_| "网络错误")?;

    file.write_all(&chunk).map_err(|_| "文件写入失败")?;
    downloaded_len += chunk.len() as u64;

    window
      .emit(
        "e_download_progress",
        DownloadProgress {
          current: downloaded_len,
          total: res_len,
          id: id.into(),
        },
      )
      .unwrap();
  }

  Ok(file_path.to_str().unwrap().into())
}

#[tauri::command]
pub fn get_amc_config() -> CmdResult<IAmc> {
  Ok(Config::amc().data().clone())
}

#[tauri::command]
pub async fn patch_amc_config(payload: IAmc) -> CmdResult {
  wrap_err!(feat::patch_amc(payload).await)
}

#[tauri::command]
pub fn get_qucent_config() -> CmdResult<IQucent> {
  Ok(Config::qucent().data().clone())
}

#[tauri::command]
pub async fn patch_qucent_config(payload: IQucent) -> CmdResult {
  wrap_err!(feat::patch_qucent(payload).await)
}
