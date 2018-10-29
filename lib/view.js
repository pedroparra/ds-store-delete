/** @babel */

import { CompositeDisposable } from 'atom'

const CONTAINER_ID = 'ds-store-delete-status-bar-container'
const BUTTON_ID = 'ds-store-delete-status-bar-button'

const getButton = () => document.getElementById(BUTTON_ID)
const buttonExists = () => getButton() !== null
const getContainer = () => document.getElementById(CONTAINER_ID)
const containerExists = () => getContainer() !== null

const deleteButton = () => {
  if (buttonExists()) {
    getButton().parentNode.removeChild(getButton())
  }
}

const updateButton = (files) => {

  const title = files.length > 1 ? `Delete ${files.length} files`: 'Delete file';

  const button = getButton() || createButton()
  button.textContent = title

  button.addEventListener('click', () => {
		atom.commands.dispatch(atom.views.getView(atom.workspace), 'ds-store-delete:delete');
	});

  if (containerExists()) {
    if(button.parentNode === null) getContainer().appendChild(button)
  }

}

const createButton = () => {
  const button = document.createElement('span')
  button.id = BUTTON_ID
  return button
}

const createContainer = () => {
  const div = document.createElement('div')
  div.id = CONTAINER_ID
  div.className = 'inline-block'
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
