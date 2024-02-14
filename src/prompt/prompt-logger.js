const { gray, bold } = require("kolorist")

function logProjectInfo(response) {
  const lenPJN = response["--name"].length - 12
  const lenDir = response["directory"].length - 9
  const lenAuth = response["--author"].length - 6
  const pjnSpace = " ".repeat(lenPJN > 0 ? lenPJN : 0)
  const dirSpace = " ".repeat(lenDir > 0 ? lenDir : 0)
  const dividerOffset = response["--author"].length / 2
  const authSpace = " ".repeat(lenAuth > 0 ? lenAuth : 0)
  const pjnSpace2 = " ".repeat(lenPJN < 0 ? 12 - response["--name"].length : 0)
  const dirSpace2 = " ".repeat(lenDir < 0 ? 9 - response["directory"].length : 0)
  const lenDivider = `${response[`--name`]} with provided information below will be generated at ${response["directory"]}`.length + dividerOffset

  // This is definitely a table and trust me dawg, it is responsive
  // You touch anything, you'll probably spend some time on it. Good luck tho:)
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TABLE
  console.log(`                                             
  ${bold(response["--name"])} with provided information below will be generated at ${bold(response["directory"])}\n
  ${gray(`-`.repeat(lenDivider))}
  ${gray(`project_name`)}${pjnSpace}  |  ${gray(`framework`)}   |  ${gray(`directory`)}${dirSpace}  |  ${gray(`author`)}${authSpace}  |  ${gray(`mongodb`)}
  ${gray(`-`.repeat(lenDivider))}
  ${response[`--name`]}${pjnSpace2}  |  ${response[`--template`]}     |  ${response[`directory`]}${dirSpace2}  |  ${response[`--author`]}  |  ${response[`--mongo`]}
  ${gray(`-`.repeat(lenDivider))}`)
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>TABLE
  console.log()
  console.log(`  ${gray("Description")}: ${response["--description"]}`)
  console.log(`  ${gray("License")}: ${response["--license"]}`)
  console.log(`  ${gray("Copyright")}: (c) ${response["--copyright"].copyrightYear + " " + response["--copyright"].copyrightName + " " + response["--email"]}`)
  console.log("\n")
}

module.exports = logProjectInfo
