# Regimen

Regimen is a Life Operating System, A Second Brain that helps you manage your life, work, and everything in between. It is a personal knowledge management system that allows you to capture, organize, and retrieve information quickly and easily.

`Currently the Project is focused on a Mobile Application, but the vision is to create a full-fledged ecosystem that includes a web app, a desktop app, and a Quickshell for Linux`

# Contribution Standards

## Git Standards

### Commit Standards

```
Title : Summary of the Commit
Add : Things/Files you have added
Fix : Code fixes and Modifications
Docs : If you have worked on the Documentation
```

# Project Structure

Packages/ is not created right now, current just focusing on the mobile application.

```
regimen/
│
├── apps/
│   ├── web/                 # React web app
│   └── mobile/              # React Native app
├── backend/                 # Not working with Pacakages yet, just a standalone backend
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── core/                # Shared business logic
│   ├── database/            # DB schemas/models
│   ├── api/                 # API client/server logic
│   ├── types/               # Shared TypeScript types
│   ├── config/              # ESLint, TSConfig, Prettier
│   └── utils/               # Utility functions
│
├── docs/
│   ├── architecture/
│   ├── branding/
│   ├── roadmap/
│   └── philosophy/
│
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   └── pull_request_template.md
│
├── README.md
├── LICENSE
├── turbo.json
├── package.json
├── pnpm-workspace.yaml
└── tsconfig.json
```
