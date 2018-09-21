'use babel';
import { CompositeDisposable } from 'atom';
import shell from 'shell';

export default {

  subscriptions: null,
  patterns: [],
  paths: [],

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ds-store-delete:delete': () => this.delete()
    }));

  },

  deactivate() {
    this.subscriptions.dispose();
  },

  validatePath(path) {
    if( new RegExp('^\.?#\|\.DS_Store').test(path) ){
      return true;
    }
    return false;
  },

  searchPaths(directories) {
    let paths = [];
    directories.map( dir => {
      if (dir.isFile()) {
        const path = dir.getPath().replace(/\\/g, "/");
        if(this.validatePath(path)){
          paths.push(path)
        }
      }
      if (dir.isDirectory()) {
        this.searchPaths(dir.getEntriesSync());
      }
    })
    return this.paths.push(...paths)
  },

  deletePaths(paths) {
    // shell electon method
    paths.map( path => shell.moveItemToTrash(path) )
    this.paths = [];
  },

  delete() {
    const directories = atom.project.getDirectories();
    this.searchPaths(directories);
    this.deletePaths(this.paths);
  }

}
