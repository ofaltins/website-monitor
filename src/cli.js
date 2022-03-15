const runMonitor = require("./runMonitor");
const monitors = require('./monitors')

const monitorKeys = monitors.map(el => el.key)

const [, , ...args] = process.argv;

const monitorKey = args[0];

console.log(`Attempting to run single monitor: ${monitorKey}`);

const monitor = monitors.find(m => m.key === monitorKey)

if (monitor) {
  runMonitor(monitor)
    .then(() =>
        console.log(`Completed run of ${monitor.description}`)
    )
    .catch(e => {
        console.error(`${monitor.description} failed`)
        console.error(e)
    })
} else {
  console.log(
    "No monitor key specified, or monitor does not exist. Use syntax: npm run single [monitorKey]"
  );
  console.log("Available monitor keys:");
  console.log(monitorKeys);
}
