import { EXPORT_PACK_ACTION, SELECT_PACK_ACTION } from "./Actions";
import ProjectLoader from "./ProjectLoader";
import {Pack, PPFile} from "../types";
import {reactive, watch} from "vue";

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
        data: () => ({
          pack: ProjectLoader.project?.name ?? 'No Pack Selected',
          packHtml: ProjectPanel.generatePackHtml(ProjectLoader.project)
        }),
        methods: {
          selectPack: () => {
            this.selectPack.click();
          },
          exportPack: () => {
            this.exportPack.click();
          },
          updatePack() {
            // @ts-ignore
            this.pack = ProjectLoader.project?.name ?? 'No Pack Selected';
            // @ts-ignore
            this.packHtml = ProjectPanel.generatePackHtml(ProjectLoader.project);
          },
          open(name: string) {
            console.log('[ProjectPacker] [ProjectPanel.ts] Opened file:', name);
            // Project.name = name;
          }
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
    return /*html*/`
      <div id="custom_panel_content" class="pp-project-panel">
        <button id="pp_select_pack" class="pp-button pp-select" @click="selectPack()">Select Pack</button>
        <div class="pp-project-tree" style="height: 100%;" v-html="packHtml"/>
        <button id="pp_export_pack" class="pp-button pp-export" @click="exportPack()">Export Pack</button>
      </div>`;
  }
  static generatePackHtml(pack: Pack): string {
    console.log('[ProjectPacker] [ProjectPanel.ts] Generating pack HTML:', pack);
    if (!pack) return '<!-- No pack selected -->';

    const generateHtml = (item: PPFile): string => {
      if (item.type === 'folder') {
        return `<div class="pp-folder">
                  <input type="checkbox" id="${item.path}" class="pp-folder-toggle">
                  <label for="${item.path}" class="pp-folder-name">
                    <i class="material-icons" style="margin-right: 4px;">folder</i>
                    ${item.name}
                  </label>
                  <div class="pp-folder-contents">
                    ${item.items.filter(i => i.type === 'folder')
                    .map(child => generateHtml(child)).join('')}
                    ${item.items.filter(i => i.type === 'file')
                    .map(child => generateHtml(child)).join('')}
                  </div>
                </div>`;
      } else { // TODO: make this @click work... parameterized functions do not seem to work even with ${}
        return ` 
        <a class="pp-file" href="${item.path}" target="_blank">
          ${item.name.replace(/(.*)(\.[^.]*)$/, '$1<span class="pp-file-extension">$2</span>')}
        </a>`;
      }
    };

    return generateHtml(pack.root);
  }
}
