const projectInfoQuestions = [
  {
    type: "select",
    name: "--template",
    message: `Node.js web framework`,
    choices: [
      { title: "fastify", value: "fastify" },
      { title: "express", value: "express" },
    ],
    initial: 0,
  },

  {
    type: "text",
    name: "directory",
    message: `Directory`,
    initial: "./",
  },
  {
    type: "text",
    name: "--name",
    message: `Project name`,
    initial: "",
  },
  {
    type: "text",
    name: "--description",
    message: `Project description`,
    initial: "<120 words",
    format(input) {
      if (input === "<120 words") return ""
      else return input
    },
  },
  {
    type: "text",
    name: "--license",
    message: `Project license`,
    initial: "MIT",
  },
  {
    type: "text",
    name: "--copyright",
    message: `Copyright`,
    initial: "<year> <name>",
    validate(copyright) {
      const year = copyright.match(/^[0-9]+\s/gim)
      const name = copyright.match(/\s(\w+\s\w+|\w+)$/gim)
      if (year && name) return true
      else return "Invalid copyright. Valid copyright format ['<year> <name>']"
    },
    format(copyright) {
      const year = copyright.match(/^[0-9]+\s/gim)[0].trim()
      const name = copyright.match(/\s(\w+\s\w+|\w+)$/gim)[0].trim()
      return { copyrightName: name, copyrightYear: year }
    },
  },
  {
    type: "confirm",
    name: "--mongo",
    message: `Add mongodb configurations?`,
    initial: false,
  },
  {
    type: "text",
    name: "--author",
    message: `Project author`,
    initial: "author <author@domain.com>",
    validate(author) {
      if (author.trim().match(/<(\w+@.*\.com)>/gim) && author.trim().match(/^\w+|\s{1}\w+(?!<.*>)/gm)) return true
      else return "Invalid author. Valid author format ['author-name <author@domain.com>]"
    },
  },
  {
    type: "text",
    name: "--username",
    message: `Github username`,
  },
  {
    type: "text",
    name: "--email",
    message: `Team email`,
    initial: "team@domain.com",
  },
]

const confirmationQuestion = (response) => {
  return {
    type: "confirm",
    name: "confirmed",
    message: `Generate ${response["--name"]} project?`,
    initial: true,
  }
}

module.exports = { projectInfoQuestions, confirmationQuestion }
