import {getPack, openFolderDialog} from "../api/management";
import ProjectLoader from "./ProjectLoader";

export let SELECT_PACK_ACTION = new Action('pp_select_pack', {
  name: 'Select Pack',
  icon: 'folder_open',
  click: () => {
    openFolderDialog().then((pack) => {
      console.log('[ProjectPacker] [Actions.ts] Selected pack:', pack);
      if (pack) {
        ProjectLoader.project = { //getPack(path);
          name: pack.name,
          root: pack,
          settings: {}
        }
        // @ts- ignore
        Interface.Panels.pp_project_panel.inside_vue.$emit('updateProject', ProjectLoader.project);
        Interface.Panels.pp_project_panel.inside_vue.$forceUpdate();
        console.log('[ProjectPacker] [Actions.ts] Updated pack:', pack);
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
    // Perform optimization and fixing of issues in the pack

    // Then export the pack with fs to either a location specified in the pack settings or make a dialog to select a location
  }
});

export function deleteActions() {
  const actions = [SELECT_PACK_ACTION, EXPORT_PACK_ACTION];
  actions.forEach(action => action.delete());
}
