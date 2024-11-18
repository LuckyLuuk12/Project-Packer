import { selectFolder } from "./api/management";

let SELECT_PACK_ACTION = null;

// @ts-ignore - allow the .register method to be called without error
BBPlugin.register('project_packer', {
  title: "Project Packer",
  author: "Luuk Kablan & Zegevlier",
  icon: "icon.png",
  description: "Manage your Minecraft resource pack / project and optimize it!",
  has_changelog: false,
  min_version: "4.11.0",
  max_version: "5.0.0",
  variant: "both",
  website: "https://github.com/LuckyLuuk12/Project-Packer",
  repository: "https://github.com/JannisX11/blockbench-plugins/tree/master/plugins/project_packer",
  bug_tracker: "https://github.com/LuckyLuuk12/Project-Packer/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen",
  onload() { // Here we can create everything we need like actions, dialogs, etc. we probs should import those though
    // @ts-ignore - idk why but I need this for the Action even though we used the blockbench-types
    SELECT_PACK_ACTION = new Action('project_packer_select_pack_button', {
      name: 'PP - Select Resource Pack',
      icon: 'folder_open',
      click: () => {
        // Open the project view dialog when the button is clicked
        console.log('Opening project view dialog');
        selectFolder();
      }
    });
  },
  onunload() { // Here we must delete and unload everything, otherwise you will have duplicate warnings on reload
    SELECT_PACK_ACTION.delete();
  }
});