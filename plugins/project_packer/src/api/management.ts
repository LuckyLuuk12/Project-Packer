export function selectFolder(): void {
  // Opens a dialog to select a folder
  console.log('Opening folder selection dialog');
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