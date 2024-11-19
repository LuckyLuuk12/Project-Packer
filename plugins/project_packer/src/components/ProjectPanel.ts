import { Action, Panel } from 'blockbench-types';

export class ProjectPanel {
  private panel: Panel;
  private action1: Action;
  private action2: Action;

  constructor() {
    this.action1 = new Action('pp_select_pack', {
      name: 'Select Pack',
      icon: 'icon1',
      click: () => {
        console.log('Select pack button pressed');
        // Add your custom action logic here
      }
    });

    this.action2 = new Action('pp_export_pack', {
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
      component: {
        template: `
          <div id="custom_panel_content" style="display: flex; flex-direction: column; padding: 10px;">
            <button id="custom_button_1" class="custom-panel-button">Custom Button 1</button>
            <button id="custom_button_2" class="custom-panel-button">Custom Button 2</button>
          </div>
        `,
        methods: {
          customAction1() {
            this.action1.click();
          },
          customAction2() {
            this.action2.click();
          }
        },
        mounted() {
          document.getElementById('custom_button_1').addEventListener('click', this.customAction1);
          document.getElementById('custom_button_2').addEventListener('click', this.customAction2);
        }
      }
    });
  }

  public register() {
    // Register the actions and the panel with Blockbench
    this.action1.register();
    this.action2.register();
    this.panel.register();
  }

  public unregister() {
    // Unregister the actions and the panel
    this.action1.delete();
    this.action2.delete();
    this.panel.delete();
  }
}