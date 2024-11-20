import {getPack, openFolderDialog} from "../api/management";
import ProjectLoader from "./ProjectLoader";

export let SELECT_PACK_ACTION = new Action('pp_select_pack', {
  name: 'Select Pack',
  icon: 'folder_open',
  click: () => {
    openFolderDialog().then((path) => {
      if (path) {
        ProjectLoader.project = getPack(path);
        // @ts-ignore
        Interface.Panels.pp_project_panel.inside_vue.updatePack();
      }
      console.log('[ProjectPacker] [Actions.ts] Project loaded:', ProjectLoader.project);
    });
  }
});

export let EXPORT_PACK_ACTION = new Action('pp_export_pack', {
  name: 'Export Pack',
  icon: 'folder_zip',
  click: () => {
    console.log('[ProjectPacker] [Actions.ts] Exported pack:', ProjectLoader.project);
    // Add your custom action logic here
  }
});

export function deleteActions() {
  const actions = [SELECT_PACK_ACTION, EXPORT_PACK_ACTION];
  actions.forEach(action => action.delete());
}
