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

  const githuRepoUrl = 'https://github.com/enniwelt/repo';
  const githubFileUrl = 'https://github/enniwelt/repo/blob/master/README.md';

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

  currentUtcTime.setMinutes(currentUtcTime.getMinutes() - 2);

  const formattedUtcTime = currentUtcTime.toISOString();

  return formattedUtcTime;
};

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
