'use strict'

const logUtil = require('../utils/cli-log')

function editOpts (opts, pkg) {
  opts.name = pkg.name
  const pkgAuthor = pkg.author
  const isPkgAuthorEmpty = pkgAuthor === ''
  const isCopyrightNameEmpty = opts.copyrightName === ''
  const isEmailOptEmpty = opts.email === ''
  const isUsernameOptEmpty = opts.username === ''

  const optsUtil = {
    editUsernameAndEmail: (arg) => {
      let email
      let username
      if (arg === 'string') {
        const emailMatch = pkgAuthor.match(/<(.*)>/gim)
        const nameMatch = pkgAuthor.trim().match(/^\w+|\s{1}\w+(?!<.*>)/gm)
        username = nameMatch ? nameMatch.join('') : optsUtil.warn('username', [1, 0])
        email = emailMatch ? emailMatch[0].replace(/<(.*)>/gim, '$1') : optsUtil.warn('email', [0, 1])
      }
      if (arg === 'object') {
        username = pkgAuthor.name
        email = pkgAuthor.email
      }
      optsUtil.updateUsername(isUsernameOptEmpty, username)
      optsUtil.updateProjectTeamEmail(isEmailOptEmpty, email)
    },
    updateUsername: (condition, value) => condition && (opts.username = value),
    updateProjectTeamEmail: (condition, value) => condition && (opts.email = value),
    log: (choice) => {
      choice[0] === 1 && logUtil.warn('username')
      choice[1] === 1 && logUtil.warn('email')
    },
    warn: (arg, choice) => {
      opts[arg] === '' && optsUtil.log(choice)
      return `<${arg}>`
    }
  }

  if (typeof pkgAuthor === 'string') {
    if (!isPkgAuthorEmpty) optsUtil.editUsernameAndEmail('string')
    else {
      opts.email = isEmailOptEmpty ? '<email>' : opts.email
      opts.username = isUsernameOptEmpty ? '<username>' : opts.username
      optsUtil.log([isUsernameOptEmpty && 1, isEmailOptEmpty && 1])
    }
  } else optsUtil.editUsernameAndEmail('object')

  isCopyrightNameEmpty && (opts.copyrightName = opts.username)
}

module.exports = editOpts
