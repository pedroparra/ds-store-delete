/** @babel */

import { CompositeDisposable } from 'atom'

import View from './view'

import searchFiles from '../commands/searchFiles'
import deleteFiles from '../commands/deleteFiles'

let subscriptionMain = null

const config = {
  pattern: {
    title: 'Pattern',
    type: 'string',
    default: '^\.?#\|\.DS_Store',
    description: 'Pattern used to find and delete files.',
    order: 1
  }
}

const activate = () => {
  subscriptionMain = new CompositeDisposable()
  subscriptionMain.add(atom.project.onDidChangeFiles(events => {
    events.map(({ action, path }) => {
      if (action === 'created' || action === 'deleted') {
        const files = searchFiles()
        View.update(files)
      };
    })
  }))
  subscriptionMain.add(
    atom.commands.add('atom-workspace', 'ds-store-delete:delete', deleteFiles)
  )
}

const deactivate = () => {
  View.destroy()
  subscriptionMain.dispose()
  subscriptionMain.clear()
  subscriptionMain = null
}

const consumeStatusBar = statusBar => {
  View.create(statusBar)
  const files = searchFiles()
  View.update(files)
}

export default { activate, deactivate, config, consumeStatusBar }
