import { EXPORT_PACK_ACTION, SELECT_PACK_ACTION } from "./Actions";
import ProjectLoader from "./ProjectLoader";

export class ProjectPanel {
  private panel: Panel;
  private selectPack: Action;
  private exportPack: Action;

  constructor() {
    this.selectPack = SELECT_PACK_ACTION;
    this.exportPack = EXPORT_PACK_ACTION;

    this.panel = new Panel({
      id: 'pp_project_panel',
      name: 'Project Panel',
      icon: 'view_list',
      menu: {
        actions: [
          'pp_select_pack',
          'pp_export_pack'
        ]
      },
      expand_button: true,
      resizable: true,
      default_side: 'left',
      component: {
        template: this.getTemplate(),
        methods: {
          selectPack: () => {
            this.selectPack.click();
          },
          exportPack: () => {
            this.exportPack.click();
          }
        },
        mounted() {
          this.$nextTick(() => {
            document.getElementById('pp_select_pack').addEventListener('click', this.selectPack);
            document.getElementById('pp_export_pack').addEventListener('click', this.exportPack);
          });
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

  private getTemplate() {
    return `
      <div id="custom_panel_content" style="display: flex; flex-direction: column; padding: 10px; height: 100%">
        <button id="pp_select_pack" class="pp-button pp-select">Select Pack</button>
        <div class="pp-project-tree" style="height: 100%;">` + ProjectLoader.project +
        
        
        `</div>
        <button id="pp_export_pack" class="pp-button pp-export">Export Pack</button>
      </div>`;
  }
}