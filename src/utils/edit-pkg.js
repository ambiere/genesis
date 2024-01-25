'use strict'

function editPkg (pkg, template, opts) {
  pkg.main = template.main
  pkg.type = template.type
  pkg.directories = template.directories
  pkg.name = opts.name ? opts.name : pkg.name
  pkg.author = opts.author ? opts.author : pkg.author
  pkg.description = opts.description ? opts.description : pkg.description
  pkg.scripts = Object.assign(pkg.scripts || {}, template.scripts)
  pkg.dependencies = Object.assign(pkg.dependencies || {}, template.dependencies)
  pkg.devDependencies = Object.assign(pkg.devDependencies || {}, template.devDependencies)
  pkg.license = opts.license ? opts.license : template.license

  if (opts.mongo) {
    const templateCopy = { ...template }
    templateCopy.mongoScripts['mongo:start'] += ` --name=${pkg.name}-mongo mongo:4`
    templateCopy.mongoScripts['mongo:stop'] += ` ${pkg.name}-mongo`
    pkg.scripts = Object.assign(pkg.scripts || {}, templateCopy.mongoScripts)
    pkg.devDependencies = Object.assign(pkg.devDependencies || {}, template.devDependenciesOpts)
  }
}

module.exports = editPkg
