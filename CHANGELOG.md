## 0.5.0 (2024-01-26)

### Feat

- **genes**: print out help text when running `genes` without command

## 0.4.0 (2024-01-25)

### Feat

- **install**: run husky install
- **fastify-package**: updated husky prepare script
- **express-package**: updated husky prepare script

## 0.3.0 (2024-01-25)

### Feat

- silent husky in production/ci environment

### Fix

- check CI env if true
- husky is not a function
- wrapped husky importation in async fn

## 0.2.0 (2024-01-25)

### Feat

- disabled test check-coverage

## 0.1.0 (2024-01-25)

### Feat

- **package**: updated changelog script
- **genes**: main genes module
- **package**: updated package.json
- **package**: updated package.json
- **generate**: genes generate command usage help text
- **help**: genes cli help txt
- **genes**: genec cli entry point
- **fastify**: fastify project template
- **express**: express project template
- **edit-opts**: edit genes cli args
- **edit-pkg**: util fn to edit package.json file
- **cli-log**: genes cli log util
- **log**: custom log function
- **code-of-conduct**: code-of-conduct.md template file
- **Dockerfile**: Dockerfile template file
- **husky**: husky template config files
- **prettier**: prettier formatter config template file
- **lint-staged**: lint-staged config template file
- **env**: env configs sample template file
- **env**: env template file
- **dockerignore**: dockerignore template file
- **docker-compose**: docker-compose template file
- **commitizen**: cz configs template
- **run-before**: template util function, start mongo image before test
- **run-after**: template util function, stop mongo image after test
- **docker-helper**: template util functions to manipulate mongo image
- **fly**: continue deployment workflow template
- **ci**: continue integration workflow template
- **fastify-package**: fastify package.json template
- **express-package**: express package.json template
- **contibuting**: contributing.md file template
- **license**: license file template
- **readme**: readme.md file template
- configured husky & added lint-staged pre-commit hook
- configured lint-staged
- added .gitignore
- do not generate changelogs on bump
- added post:version script
- added version script
- configured default formatter
- **pkg**: Initialized npm project
