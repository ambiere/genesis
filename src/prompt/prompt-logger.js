const kolorist = require("kolorist")

function logProjectInfo(response) {
  console.log(
    `
${kolorist.gray("                                  ...\n")}
  ${kolorist.bold(response["--name"])} with provided information below will be generated at ${kolorist.bold(response["directory"])}
  
                             ${kolorist.gray("name")}: ${kolorist.bold(response["--name"])}
                         ${kolorist.gray("username")}: ${kolorist.bold(response["--username"])}
                           ${kolorist.gray("author")}: ${kolorist.bold(response["--author"])}
                        ${kolorist.gray("framework")}: ${kolorist.bold(response["--template"])}
                        ${kolorist.gray("directory")}: ${kolorist.bold(response["directory"])}
                      ${kolorist.gray("description")}: ${kolorist.bold(response["--description"])}
                          ${kolorist.gray("mongodb")}: ${kolorist.bold(response["--mongo"])}
                            ${kolorist.gray("email")}: ${kolorist.bold(response["--email"])}
                        ${kolorist.gray("copyright")}: ${kolorist.bold("(c) " + response["--copyright"].copyrightYear + " " + response["--copyright"].copyrightName)}
                          ${kolorist.gray("license")}: ${kolorist.bold(response["--license"])}
${kolorist.gray("\n                                ...\n")}
`
  )
}

module.exports = logProjectInfo
