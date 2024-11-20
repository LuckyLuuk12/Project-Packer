import { openFolderDialog } from "../api/management";

export let SELECT_PACK_ACTION = new Action('pp_select_pack', {
  name: 'Select Pack',
  icon: 'folder_open',
  click: () => {
    console.log('Select pack button pressed');
    openFolderDialog().then((path) => {
      if (path) {
        console.log('Selected folder:', path);
        // Add your custom action logic here
      }
    });
  }
});

export let EXPORT_PACK_ACTION = new Action('pp_export_pack', {
  name: 'Export Pack',
  icon: 'folder_zip',
  click: () => {
    console.log('Export pack button pressed');
    // Add your custom action logic here
  }
});

export function deleteActions() {
  const actions = [SELECT_PACK_ACTION, EXPORT_PACK_ACTION];
  actions.forEach(action => action.delete());
}