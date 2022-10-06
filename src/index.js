const CronJob = require("cron").CronJob;

const monitors = require("./monitors");
const runMonitor = require("./runMonitor");

const schedule = monitors.map((monitor) => {
  return {
    monitor: monitor.description,
    schedule: monitor.schedule,
  };
});

for (let m in monitors) {
  const monitor = monitors[m];
  if (monitor.schedule) {
    new CronJob(
      monitor.schedule,
      async () => {
        try {
          await runMonitor(monitor);
        } catch (e) {
          console.error(`${monitor.description} failed`);
          console.error(e);
        }
      },
      null,
      true
    );
  }
}

console.log("Monitors active");
console.log(schedule);
