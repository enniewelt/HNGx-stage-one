const express = require('express');
require('dotenv').config();

const app = express();

app.get('/api', (req, res) => {
  const slackName = req.query.slack_name;
  const track = req.query.track;

  const daysofweek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const currentDate = new Date();

  const presentDay = daysofweek[currentDate.getDay()];

  const presentUtcTime = getValidUtcTime();

  const githuRepoUrl = 'https://github.com/enniewelt/HNGx-stage-one';
  const githubFileUrl =
    'https://github.com/enniewelt/HNGx-stage-one/blob/master/app.js';

  const resData = {
    slack_name: slackName,
    current_day: presentDay,
    utc_time: presentUtcTime,
    track: track,
    github_file_url: githubFileUrl,
    github_repo_url: githuRepoUrl,
    status_code: 200,
  };
  res.json(resData);
});

const getValidUtcTime = () => {
  const currentUtcTime = new Date();
  const year = currentUtcTime.getFullYear();
  const month = String(currentUtcTime.getMonth() + 1).padStart(2, '0');
  const day = String(currentUtcTime.getDate()).padStart(2, '0');
  const hours = String(currentUtcTime.getHours()).padStart(2, '0');
  const minutes = String(currentUtcTime.getMinutes()).padStart(2, '0');
  const seconds = String(currentUtcTime.getSeconds()).padStart(2, '0');

  const formattedUtcTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;

  return formattedUtcTime;
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
