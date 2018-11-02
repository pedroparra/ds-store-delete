'use babel'

import shell from 'shell'
import searchFiles from './searchFiles'

export const deleteFiles = (pathsToRemove = []) => {
  // shell electon method
  pathsToRemove.map(path => shell.moveItemToTrash(path))
}

export default () => {
  const files = searchFiles()
  deleteFiles(files)
}
