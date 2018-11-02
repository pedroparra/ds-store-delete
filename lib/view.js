/** @babel */

import { CompositeDisposable } from 'atom'

const CONTAINER_ID = 'ds-store-delete-status-bar-container'
const BUTTON_ID = 'ds-store-delete-status-bar-button'
const ICON_ID = 'ds-store-delete-status-bar-icon'

const getButton = () => document.getElementById(BUTTON_ID)
const getIcon = () => document.getElementById(ICON_ID)
const buttonExists = () => getButton() !== null
const getContainer = () => document.getElementById(CONTAINER_ID)
const containerExists = () => getContainer() !== null

const deleteButton = () => {
  if (buttonExists()) {
    getButton().parentNode.removeChild(getButton())
    getIcon().parentNode.removeChild(getIcon())
  }
}

const updateButton = (files) => {

  const button = getButton() || createButton()
  const title = files.length > 1 ? `Delete ${files.length} files`: 'Delete file';
  button.textContent = title

  if (containerExists()) {
    if(button.parentNode === null) {
      const icon = createIcon();
      getContainer().appendChild(icon)
      getContainer().appendChild(button)
    }
  }

}

const createIcon = () => {
  const icon = document.createElement('span')
  icon.className = "icon icon-trashcan"
  icon.id = ICON_ID
  return icon
}

const createButton = () => {
  const button = document.createElement('span')
  button.id = BUTTON_ID
  button.addEventListener('click', () => {
    atom.commands.dispatch(atom.views.getView(atom.workspace), 'ds-store-delete:delete');
  });
  return button
}

const createContainer = () => {
  const div = document.createElement('div')
  div.id = CONTAINER_ID
  return div
}

export const update = (files = []) => {
  if (files.length > 0) updateButton(files)
  else deleteButton()
}

export const create = (statusBar) => {
  if (containerExists() === false) {
    statusBar.addLeftTile({
      item: createContainer(),
      priority: 999
    })
  }
}

export const destroy = () => {
  deleteButton()
}

export default { create, destroy, update }
