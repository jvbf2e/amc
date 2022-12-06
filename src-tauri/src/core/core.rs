
#[derive(Debug)]
pub struct CoreManager {
    sidecar: Arc<Mutex<Option<CommandChild>>>,

    #[allow(unused)]
    use_service_mode: Arc<Mutex<bool>>,
}

impl CoreManager {
  pub fn global() -> &'static CoreManager {
    static CORE_MANAGER: OnceCell<CoreManager> = OnceCell::new();

    CORE_MANAGER.get_or_init(|| CoreManager {
      sidecar: Arc::new(Mutex::new(None)),
      use_service_mode: Arc::new(Mutex::new(false)),
    })
  }

  pub fn init(&self) -> Result<()> {
    // kill old clash process
    let _ = dirs::clash_pid_path()
      .and_then(|path| fs::read(path).map(|p| p.to_vec()).context(""))
      .and_then(|pid| String::from_utf8_lossy(&pid).parse().context(""))
      .map(|pid| {
        let mut system = System::new();
        system.refresh_all();
        system.process(Pid::from_u32(pid)).map(|proc| {
          if proc.name().contains("clash") {
            log::debug!(target: "app", "kill old clash process");
            proc.kill();
          }
        });
      });

    tauri::async_runtime::spawn(async {
      // 启动clash
      log_err!(Self::global().run_core().await);
    });

    Ok(())
  }
}
