'use babel'

import shell from 'shell'

export const deleteFiles = (pathsToRemove = []) => {
  console.log('DELETE FILES')
  // shell electon method
  pathsToRemove.map(path => shell.moveItemToTrash(path))
}

export default () => {
  deleteFiles()
}
