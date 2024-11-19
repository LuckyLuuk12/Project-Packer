export class ProjectPanel {
  private panel: Panel;
  private selectPack: Action;
  private exportPack: Action;

  constructor() {
    this.selectPack = new Action('pp_select_pack', {
      name: 'Select Pack',
      icon: 'icon1',
      click: () => {
        console.log('Select pack button pressed');
        // Add your custom action logic here
      }
    });

    this.exportPack = new Action('pp_export_pack', {
      name: 'Export Pack',
      icon: 'icon2',
      click: () => {
        console.log('Export pack button pressed');
        // Add your custom action logic here
      }
    });

    this.panel = new Panel({
      id: 'pp_project_panel',
      name: 'Project Panel',
      icon: 'icon.png',
      menu: {
        actions: [
          'pp_select_pack',
          'pp_export_pack'
        ]
      },
      expand_button: true,
      default_side: 'left',
      component: {
        template: `
          <div id="custom_panel_content" style="display: flex; flex-direction: column; padding: 10px; height: 100%">
            <button id="pp_select_pack" class="pp-button pp-select">Select Pack</button>
            <div class="pp-project-tree" style="height: 100%;"></div>
            <button id="pp_select_pack" class="pp-button pp-export">Export Pack</button>
          </div>
        `,
        methods: {
          customAction1: () => {
            this.selectPack.click();
          },
          customAction2: () => {
            this.exportPack.click();
          }
        },
        mounted() {
          document.getElementById('custom_button_1').addEventListener('click', this.methods.customAction1);
          document.getElementById('custom_button_2').addEventListener('click', this.methods.customAction2);
        }
      }
    });
  }

  public unregister() {
    // Unregister the actions and the panel
    this.selectPack.delete();
    this.exportPack.delete();
    this.panel.delete();
  }
}