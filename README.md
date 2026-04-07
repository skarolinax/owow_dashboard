# OWOW dashboard project

A web-based dashboard platform designed to improve transparency and communication between OWOW and its clients. Built with React.

## 📌 Project Purpose

Currently, project updates between OWOW and clients rely heavily on manual communication (emails, meetings).
This platform centralizes project information in one place and provides:

- Real-time project status overview Deliverables & file tracking
- Latest updates & milestones Team contact information
- Quick overview of the budget and project status data
- Employee vs client login in order to display different content

The goal is to improve communication efficiency and create a more transparent client experience.

## Deployment

To deploy this project, first run:

```bash
  npm install
```

And then:

```bash
  npm run dev
```

In order to use it as a PWA, first run:

```bash
  npm run build
```

And then:

```bash
  npm run preview
```

You can also download the PWA from the deployed version on Vercel. Please note that it currently does not work on iOS.

## Features

- Light/dark mode toggle
- Mobile responsive
- Slack connection
- Login roles per client and employee
- Progressive Web App allowing you to download the app on your device

## Environment Variables

Create a `.env` file in the root:

SLACK_BOT_TOKEN=your_token_here
SLACK_CHANNEL_IDS=your_token_here

Contact the repository owners in order to receive the tokens.

## Demo

See https://owow-dashboard.vercel.app/ - for now the Slack connection works only on localHost.
