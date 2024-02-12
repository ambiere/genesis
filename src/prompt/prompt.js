const prompts = require("prompts")
const { bold, gray } = require("kolorist")
const generate = require("../../orign")
const questions = require("./prompt-questions")
const pkg = require("../../package.json")
const Spinner = require("./prompt-spinner")
const logProjectInfo = require("../prompt/prompt-logger")

async function orignCliPrompts() {
  const spinner = new Spinner()
  spinner.start(`starting orign CLI v${pkg.version}...`)
  setTimeout(async () => {
    spinner.stop(true)
    console.log(bold(`orign CLI v${pkg.version}`))
    console.log(gray(`command line interface to generate`))
    console.log(gray(`Node.js web framework template projects!\n`))
    if (spinner.isStopped) {
      const response = await prompts(questions.projectInfoQuestions)
      if (Object.keys(response).length === 10) {
        console.log()
        spinner.start(`processing ${response["--name"]} data...`)
        setTimeout(async () => {
          spinner.stop(true)
          if (spinner.isStopped) {
            logProjectInfo(response)
            const confirm = await prompts(questions.confirmationQuestion(response))
            if (confirm.confirmed) {
              const projectInfo = {
                ...response,
                "--email": response["--email"] === "team@domain.com" ? "" : response["--email"],
                "--copyrightName": response["--copyright"].copyrightName,
                "--copyrightYear": response["--copyright"].copyrightYear,
              }
              delete projectInfo["--copyright"]
              console.log()
              spinner.start(`generating ${response["--name"]} at ${response["directory"]}`)
              setTimeout(async () => {
                spinner.stop(true)
                if (spinner.isStopped) {
                  console.log()
                  await generate.orignCli(
                    Object.entries(projectInfo)
                      .flat()
                      .filter((value) => value != "directory")
                  )
                }
              }, 1500)
            }
          }
        }, 1000)
      }
    }
  }, 1000)
}

module.exports = orignCliPrompts
