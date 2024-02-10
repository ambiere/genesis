const prompts = require("prompts")
const kolorist = require("kolorist")
const generate = require("../../genes")
const questions = require("./prompt-questions")
const pkg = require("../../package.json")
const Spinner = require("./prompt-spinner")
const logProjectInfo = require("../prompt/prompt-logger")

async function genesCliPrompts() {
  const spinner = new Spinner()
  spinner.start(`starting genes CLI v${pkg.version}...`)
  setTimeout(async () => {
    spinner.stop(true)
    console.log(kolorist.bold(`genes CLI v${pkg.version}`))
    console.log(kolorist.gray(`command line interface to generate`))
    console.log(kolorist.gray(`Node.js web framework template projects!\n`))
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
              spinner.start(`generating ${response["--name"]} at ${response["directory"]}`)
              setTimeout(async () => {
                spinner.stop(true)
                if (spinner.isStopped) {
                  console.log()
                  await generate.genesCli(
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

module.exports = genesCliPrompts
