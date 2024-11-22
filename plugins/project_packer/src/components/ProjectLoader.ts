import { openFolderDialog } from "../api/management";
import { Pack } from "../types";
import { getPack } from "../api/management";

export default class ProjectLoader {
  static project: Pack | null; // TODO: implement the Pack type
  private loader: ModelLoader | null;

  constructor() {
    this.loader = new ModelLoader('pp_project_loader', {
      name: 'Project Loader',
      icon: 'folder_open',
      format_page: {
        component: {
          methods: {
            openLoader: this.openLoader
          },
          template: `
            <div class="pp-format-page" style="display:flex;flex-direction:column;height:100%">
              <p class="format_description">Load a complete Resource Pack for easy access to all files with the Project Panel</p>
              <p class="format_target"><b>Target</b> : <span>Minecraft: Java Edition</span> <span>Resource Pack Management</span></p>
              <h3 class="markdown">How to use:</h3>
              <ol>
                <li>Press <strong>Load Resource Pack</strong> and select a <b>folder</b>.</li>
                <li>Use the Project Panel to select files and modify them.</li>
                <li>Press the export button to open the Export Dialog and complete your pack.</li>
              </ol>
              <div class="button_bar">
                <button id="create_new_model_button" style="margin-top:20px;margin-bottom:24px;" @click="openLoader()">
                  <i class="material-icons" />
                  Load Resource Pack
                </button>
              </div>
            </div>
          `
        }
      }
    });
  }

  public unregister() {
    this.loader.delete();
  }

  private async openLoader(): Promise<void> {
    const path = await openFolderDialog();
    if (path) {
      console.log('[ProjectPacker] [ProjectLoader.ts] Selected folder:', path);
      ProjectLoader.project = getPack(path);
      console.log('[ProjectPacker] [ProjectLoader.ts] Project loaded:', ProjectLoader.project);
    }
  }
}
