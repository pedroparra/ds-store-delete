'use babel'

import shell from 'shell'

let pathsToRemove = []

export const validatePath = path => new RegExp(atom.config.get('ds-store-delete.pattern')).test(path)

export const searchFiles = dirs => dirs.map(dir => {
  if (dir.isFile()) {
    const path = dir.getPath().replace(/\\/g, '/')
    if (validatePath(path)) {
      return pathsToRemove.push(path)
    }
  }
  if (dir.isDirectory()) {
    searchFiles(dir.getEntriesSync())
  }
})

export const deleteFiles = () => {
  // shell electon method
  pathsToRemove.map(path => shell.moveItemToTrash(path))
  pathsToRemove = []
}

export default () => {
  searchFiles(atom.project.getDirectories())
  deleteFiles()
}
