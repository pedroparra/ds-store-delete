'use babel'
import { CompositeDisposable } from 'atom'
import shell from 'shell'

const plugin = {}
let subscriptionMain = null
let pathsToRemove = []

// Configs
export const config = plugin.config = {
  pattern: {
    title: 'Pattern',
    type: 'string',
    default: '^\.?#\|\.DS_Store',
    description: 'Pattern used to find Ds Store files.',
    order: 1
  }
}

const validatePath = path => new RegExp(atom.config.get('ds-store-delete.pattern')).test(path)

const searchFiles = dirs => dirs.map(dir => {
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

const deleteFiles = () => {
  // shell electon method
  pathsToRemove.map(path => shell.moveItemToTrash(path))
  pathsToRemove = []
}

const findAndRemove = () => {
  searchFiles(atom.project.getDirectories())
  deleteFiles()
}

export const activate = plugin.activate = () => {
  subscriptionMain = new CompositeDisposable()
  subscriptionMain.add(
    atom.commands.add('atom-workspace', 'ds-store-delete:delete', findAndRemove)
  )
}

export const deactivate = plugin.deactivate = () => {
  subscriptionMain.dispose()
}

export default plugin
