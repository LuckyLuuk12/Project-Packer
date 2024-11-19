export let SELECT_PACK_ACTION = new Action('pp_select_pack', {
  name: 'Select Pack',
  icon: 'folder_open',
  click: () => {
    console.log('Select pack button pressed');
    // Add your custom action logic here
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