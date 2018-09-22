'use babel'

import { CompositeDisposable } from 'atom'
import findAndRemove from '../commands/findAndRemove'

let subscriptionMain = null

// Configs
const config = {
  pattern: {
    title: 'Pattern',
    type: 'string',
    default: '^\.?#\|\.DS_Store',
    description: 'Pattern used to find Ds Store files.',
    order: 1
  }
}

const activate = () => {
  subscriptionMain = new CompositeDisposable()
  subscriptionMain.add(
    atom.commands.add('atom-workspace', 'ds-store-delete:delete', findAndRemove)
  )
}

const deactivate = () => {
  subscriptionMain.dispose()
}

export default { activate, deactivate, config }
