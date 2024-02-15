# [v0.8.1.latest](https://github.com/ambiere/genesis/compare/v0.8.1...0.8.0) (2024-02-15)

### Patch Changes

- **genesis**: display help text when genesis run without command

# [v0.8.0](https://github.com/ambiere/genesis/compare/v0.8.0...0.7.1) (2024-02-15)

### Minor Changes

- **prompt-questions**: added prompt for gh repo creation ([1df6b20](https://github.com/ambiere/genesis/commit/1df6b20e04cb43d18a66f4ebe3e285f135fb91b7)).
- **prompt-logger**: made prompt-logger UI pretty ([a66da87](https://github.com/ambiere/genesis/commit/a66da87d931616e791ae6df1864fed762cb20629))<br>
  Displays a structured and responsive table containing
  project information provided interactively by the user in the terminal.
- **prompt**: prompt user to create gh repo ([4e67efe](https://github.com/ambiere/genesis/commit/4e67efe56b38a5426e73824e9ff5f464c89c9a28))<br>
  Create public github repository if user agree
- **create-repo**: creates public github repository ([73d2353](https://github.com/ambiere/genesis/commit/73d2353db566d54d59aca28a8a36da395eb49f9d)).<br>
  Initialize git repository and create a public github repository from
  the project source/cwd. The util assume that, the project was generated
  in the repository where .git file does not exist.

<br>

# [v0.7.1](https://github.com/ambiere/genesis/compare/v0.6.0...0.7.0) (2024-02-10)

For simplicity, genesis can generate projects interactively in your terminal in **v0.7.0**.<br>
To generate projects interactively run `genesis generate` in your terminal and genesis CLI
will walk you through.

### Features

- **prompt**:
  A genesis terminal prompt module for interactively projects generation ([d4ad0a5](https://github.com/ambiere/genesis/commit/d4ad0a5eba274047ac0e9d6b96ee242d74c8993d)).
  Added important questions into genesis CLI to help generation of projects seamly ([465a7da](https://github.com/ambiere/genesis/commit/465a7da4b984827a302141d3fece27b75c67978c)).
  Log project info provided interactively in the terminal ([40f1f0b](https://github.com/ambiere/genesis/commit/40f1f0ba325846ec073aac44df0b5822c2652307)).
  Show activity indicator, when genesis CLI is processing project info ([c070ee6](https://github.com/ambiere/genesis/commit/c070ee6c506420fb422acb572ec962e7136b1410)).
- **package**: updated package info method to log updated project info ([e556ed6](https://github.com/ambiere/genesis/commit/e556ed6602c51d363c0be86e2d2f88b6d6cb0727))
- **genesis**: support generation of projects interactively ([870bef2](https://github.com/ambiere/genesis/commit/870bef286ba0c0264c5a247ea76284064e21a507))
- **plus**: util fn that generates plus sign for terminal log ([f57cbde](https://github.com/ambiere/genesis/commit/f57cbdefca1d150787ca8e23b3e6246b108cb469))
- **genesis**: updated genesis terminal logs ([a9700c3](https://github.com/ambiere/genesis/commit/a9700c3801209c32a8f3fdad01cd78f8a9fa6170))

### Patch Changes

- **genesis**: fixed issue #26

# [v0.6.0](https://github.com/ambiere/genesis/compare/0.5.0...0.6.0) (2024-01-27)

### Features

- **continue-deployment**: ([b7e0222](https://github.com/ambiere/genesis/commit/b7e0222d02debe5618197419ffa5144d35715f8d)) [by [@ambiere](github.com/ambiere)]</br>
  Run deployment workflow only after test and release workflow successfully completed.
- **continue-integration**: ([6860eee](https://github.com/ambiere/genesis/commit/6860eee07152a42da154a916264eeb3231c4e18c)) [by [@ambiere](github.com/ambiere)]</br>
  Added automerge job for dependabot PRs.
- **create-release**: ([0fa9a03](https://github.com/ambiere/genesis/commit/0fa9a03d70675c2eb8a4c2eb560e92673d7792c9)) [by [@ambiere](github.com/ambiere)]</br>
  Template create-releae github action workflow.
- **dependabot:** ([89c8279](https://github.com/ambiere/genesis/commit/89c8279bb01de40a37d295cc17ec792cd94d7002)) [by [@ambiere](github.com/ambiere)]</br>
  Added dependabot github action template.

# [v0.5.0](https://github.com/ambiere/genesis/compare/0.4.0...0.5.0) (2024-01-26)

### Features

- **bin/genesis**: ([d523649](https://github.com/ambiere/genesis/commit/d52364971e042542bfa662ed32590f75a7c82dc8)) [by [@ambiere](github.com/ambiere)]</br>
  Print out help text when running `genesis` without
  specifying any command. </br>
  To avoid empty respone on your terminal when running
  `genesis` cli without specifying commands (`generate`,`--version`, `help`), the cli will print help text instead.

# [v0.4.0](https://github.com/ambiere/genesis/compare/0.3.0...0.4.0) (2024-01-25)

### Features

- **express-package:** ([4ce700e](https://github.com/ambiere/genesis/commit/4ce700e01554ea402eee157f1679a1a8347fe611)) [by [@ambiere](github.com/ambiere)] </br>
  Updated husky prepare script
- **fastify-package:** ([a8209ec](https://github.com/ambiere/genesis/commit/a8209ecd4d310ca77165db3a9b353f4f08166153)) [by [@ambiere](github.com/ambiere)] </br>
  Updated husky prepare script
- **install:** ([4614427](https://github.com/ambiere/genesis/commit/4614427695db66d3c45f633434992383670b4db7)) [by [@ambiere](github.com/ambiere)] </br>
  Run husky install
