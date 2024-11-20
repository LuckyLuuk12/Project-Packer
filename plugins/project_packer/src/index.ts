import { ProjectPanel } from "./components/ProjectPanel";
import ProjectLoader from "./components/ProjectLoader";
import { deleteActions } from "./components/Actions";


let PROJECT_LOADER: ProjectLoader | null = null;
let PROJECT_PANEL: ProjectPanel | null = null;


// @ts-ignore - allow the .register method to be called without error
BBPlugin.register('project_packer', {
  title: "Project Packer",
  author: "Luuk Kablan & Zegevlier",
  icon: "icon.png",
  description: "Manage your Minecraft resource pack / project and optimize it!",
  has_changelog: false,
  min_version: "4.11.0",
  max_version: "5.0.0",
  variant: "desktop", // TODO: we want web as well but need API support for that
  website: "https://github.com/LuckyLuuk12/Project-Packer",
  repository: "https://github.com/JannisX11/blockbench-plugins/tree/master/plugins/project_packer",
  bug_tracker: "https://github.com/LuckyLuuk12/Project-Packer/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen",
  onload() { // Here we can create everything we need like actions, dialogs, etc. we probs should import those though
    PROJECT_LOADER = new ProjectLoader();
    PROJECT_PANEL = new ProjectPanel();
  },
  onunload() { // Here we must delete and unload everything, otherwise you will have duplicate warnings on reload
    PROJECT_PANEL.unregister();
    deleteActions();
  }
});