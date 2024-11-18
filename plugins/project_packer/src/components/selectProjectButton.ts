// @ts-ignore - idk why but I need this for the Action even though we used the blockbench-types

export class SelectProjectButton {
  // @ts-ignore
  private action: Action;

  constructor() {
    // @ts-ignore
    this.action = new Action('PP_select_pack_button', {
      name: 'Select Resource Pack',
      icon: 'folder_open',
      click: this.onClick.bind(this)
    });
  }

  private onClick() {
    // Open the project view dialog when the button is clicked
    this.openProjectViewDialog();
  }

  private openProjectViewDialog() {
    // @ts-ignore
    new Dialog({
      id: 'project_packer_project_view_dialog',
      title: 'ProjectPacker - Project View',
      width: 600,
      lines: [
        `<div id="project_view_content" style="display: flex; flex-direction: column; height: 100%;">
          <div id="project_folder_list" style="flex: 1; overflow-y: auto;">
            <!-- Folder contents will be dynamically loaded here -->
          </div>
          <div class="dialog_bar">
            <button id="load_project_button">Load Project</button>
          </div>
        </div>`
      ],
      onConfirm: function() {
        console.log('[PP] Confirm button clicked');
        // Handle project loading logic here
      }
    }).show();
  }

  public register() {
    // Register the action with Blockbench
    this.action.register();
  }
}