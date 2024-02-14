const prompts = require("prompts")
const { gray, bold } = require("kolorist")
const generate = require("../../genesis")
const questions = require("./prompt-questions")
const pkg = require("../../package.json")
const Spinner = require("./prompt-spinner")
const logProjectInfo = require("../prompt/prompt-logger")
const createRepo = require("../utils/create-repo")

async function genesisCliPrompts() {
  const spinner = new Spinner()
  showSpinner(spinner, `starting genesis v${pkg.version}...`)
  setTimeout(async () => {
    spinner.stop(true)
    logCliInfo(pkg)
    if (spinner.isStopped) {
      const response = await prompts(questions.projectInfoQuestions)
      const answeredAllQuestions = Object.keys(response).length === 11
      if (answeredAllQuestions) {
        showSpinner(spinner, `processing ${response["--name"]} data...`)
        setTimeout(async () => {
          spinner.stop(true)
          if (spinner.isStopped) {
            logProjectInfo(response)
            const confirmProjectGenerate = await prompts(questions.confirmationQuestion(response))
            if (confirmProjectGenerate.confirmed) {
              const projectInfo = processProjectInfo(response)
              showSpinner(spinner, `generating ${response["--name"]} at ${response["directory"]}`)
              setTimeout(async () => {
                spinner.stop(true)
                if (spinner.isStopped) {
                  console.log()
                  await generate.genesisCli(
                    Object.entries(projectInfo)
                      .flat()
                      .filter((value) => value != "directory")
                  )
                  if (response.confirmed) {
                    await createRepo(response)
                  }
                }
              }, 2000)
            }
          }
        }, 1500)
      }
    }
  }, 1500)
}

const processProjectInfo = (response) => {
  const projectInfo = {
    ...response,
    "--email": response["--email"] === "team@domain.com" ? "" : response["--email"],
    "--copyrightName": response["--copyright"].copyrightName,
    "--copyrightYear": response["--copyright"].copyrightYear,
  }
  delete projectInfo["--copyright"]
  return projectInfo
}

const showSpinner = (spinner, message) => {
  console.log()
  spinner.start(message)
}

const logCliInfo = (pkg) => {
  console.log(gray(`genesis v${pkg.version}`))
  console.log(gray(`\nServer projects template generator for nodejs frameworks.`))
  console.log(gray(`Copyright (c) ${pkg.author}\n`))
}

module.exports = genesisCliPrompts
