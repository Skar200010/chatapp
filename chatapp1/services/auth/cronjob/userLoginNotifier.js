
const cron = require('node-cron');
let scheduledTask;



const notifyUserLogin = (username, minutes) => {
  console.log(`User ${username} has been logged in for ${minutes} minutes.`);
};


const scheduleUserLoginNotification = (username , loginTime) => {

  if (scheduledTask) {
    scheduledTask.stop();
  }

  scheduledTask = cron.schedule('0 10,22 * * *', () => {
    const currenTime = new Date();

    const elapsedMinutes = Math.floor((currenTime - loginTime) / (1000 * 60)) + 1
    notifyUserLogin(username , elapsedMinutes);
  });
};

const cancelScheduledTask = () => {
  if (scheduledTask) {
    scheduledTask.stop();
  }
};

module.exports = {
  scheduleUserLoginNotification,
  cancelScheduledTask, 
};
