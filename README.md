# flowdesk

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

## OTA Updates

FlowDesk uses `electron-updater` with Electron Builder's GitHub provider. Builds are published to GitHub releases at `1999soumallya/flowdesk-application`.

For Windows, add `GH_TOKEN` to a local `.env` file with repo release permission, bump `version` in `package.json`, then run:

```env
GH_TOKEN=your_github_token
```

```bash
$ npm run publish:win
```

Electron Builder uploads the installer, `latest.yml`, and blockmap files to the GitHub release. The packaged app checks that release feed and downloads updates from there.

The installed app does not use `GH_TOKEN`. Keep the repository or release feed public for GitHub-based auto updates. If the repository is private, GitHub returns 404 for `releases.atom`; use a public GitHub release or switch to a private generic update server instead.
