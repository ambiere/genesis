"use strict"

const plus = require("./plus")
const util = require("node:util")
const { green, gray, red } = require("kolorist")
const exec = util.promisify(require("child_process").exec)

async function createRepo(response) {
  const name = response["--name"]
  const desc = response["--description"]
  const access = "--public"
  const commands = `git init && \
                    gh repo create ${name} -d \"${desc}\" ${access} --source=. && \
                    git add . && \
                    git commit -s -m "Initial commit" && \ 
                    git push -u origin main`

  try {
    await exec(commands)
    console.log(gray(`1: Initialized empty Git repository in ${process.cwd()}/.git/`))
    console.log(gray("2: Branch 'main' set up to track remote branch 'main' from 'origin'"))
    console.log(green(`+`) + gray(`     ${name}/.git ${plus(`${name}/.git`)}`))
    console.log()
    return 0
  } catch (error) {
    console.log(red("Error: ") + "Failed to create a github repository.")
    console.log(gray(error.message))
    return 1
  }
}

module.exports = createRepo
