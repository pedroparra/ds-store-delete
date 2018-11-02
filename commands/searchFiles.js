'use babel'

const searchFiles = (dirs, rule, paths) => {
  dirs.map(dir => {
    if (dir.isFile()) {
      const path = dir.getPath().replace(/\\/g, '/')
      if (new RegExp(rule).test(path)) {
        paths.push(path)
      }
    }

    if (dir.isDirectory()) {
      searchFiles(dir.getEntriesSync(), rule, paths)
    }
  })
  return paths
}

export default () => {
  let path = []
  const DIRS = atom.project.getDirectories()
  const RULE = atom.config.get('ds-store-delete.pattern')
  searchFiles(DIRS, RULE, path)
  return path
}
