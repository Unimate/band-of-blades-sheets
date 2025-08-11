# Contributing
Code contributions are accepted. Please feel free to submit issues to the issue tracker or submit pull requests for code changes. Approval for such requests involves code and (if necessary) design review by the Maintainer(s) of this repo. 

Please ensure that there is an open issue about whatever contribution you are submitting. Please also ensure your contribution does not duplicate an existing one.
## Developer Tooling

Band of Blades Sheets builds a rich UI with [svelte](https://svelte.dev/) and leverages [vite](https://vitejs.dev/) to provide a rapid feedback development experience with hot module replacement (HMR). When set up properly, the developer tooling can live-update the browser when component and SCSS changes occur.

### Prerequisites

- [Node.js LTS version](https://nodejs.org/en)
- (Recommended) A code editor, such as the free [VS Code](https://code.visualstudio.com/)

### Getting Started

1. Download the repo
2. Run `npm install`
3. Run `npm run prepare-dev`
4. Copy `foundry-data-path-config_example.json` to `foundry-data-path-config.json`
5. Edit `foundry-data-path-config.json` and change `dataPath` to point to your Foundry VTT data folder (the folder that contains the subfolders `Config`, `Data`, and `Logs`)
6. Run `npm run link-create` to create a symlink from the newly-created `dist` folder to the Foundry `modules` folder as `band-of-blades-sheets`
7. Run `npm run dev`
8. Start Foundry VTT

### `npm install`

Installs all dependencies needed to run developer tooling scripts and to build the module.

### `npm run dev`

Runs Band Of Blades in dev mode with HMR enabled.

> **Important**
> Dev mode runs on `http://localhost:30001`. Dev mode will not run on port `30000`.

### `npm run build`

Builds a production distribution of the module.

### `npm run link-create`

Symlinks the build folder to the Foundry VTT data folder defined in `foundry-data-path-config.json`.

### `npm run link-remove`

Removes the symlink from the build folder to the Foundry VTT data folder.

### Others

There are other scripts that are used for a variety of tasks outside the scope of contributing code. These scripts are subject to change moreso than those listed above.

## Issues

Check that your Issue isn't a duplicate (also check the closed issues, as sometimes work which has not been released closes an issue).

### Bugs

Ensure that the bug is reproducible with no other modules active. If the bug only happens when another module is active, see the section on [Module Compatibility](#module-compatibility).
Provide clear step-by-step reproduction instructions, as well as what you expected to happen during those steps vs what actually happened.

### Translations

PRs are welcome for localization to other languages. Currently, Band of Blades Sheets keeps all translation files within this repository in the `lang` directory.