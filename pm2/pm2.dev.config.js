module.exports = {
  apps: [
    {
      name: "web-client-app",
      script: "./server/app.js",
      watch: true,
      "ignore-watch": ["node_modules"],
      exec_mode: "fork",
      max_memory_restart: "500M",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm Z",
    },
  ],
}
