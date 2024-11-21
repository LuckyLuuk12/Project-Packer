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
          packHtml: ProjectPanel.generatePackHtml(ProjectLoader.project),
          collapsedFolders: reactive({})
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
          toggleFolder(folderPath: string) {
            // @ts-ignore
            this.collapsedFolders[folderPath] = !(this.collapsedFolders[folderPath] ?? false);
            // @ts-ignore
            this.packHtml = ProjectPanel.generatePackHtml(ProjectLoader.project);
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

    const generateHtml = (item: PPFile, collapsedFolders: any): string => {
      if (item.type === 'folder') {
        const isCollapsed = collapsedFolders[item.path] ?? false;
        return `<div class="pp-folder">
                  <button class="pp-folder-name" @click="toggleFolder('${item.path}')">${item.name}</button>
                  <div class="pp-folder-contents" style="display: ${isCollapsed ? 'none' : 'block'};">
                    ${item.items.map(child => generateHtml(child, collapsedFolders)).join('')}
                  </div>
                </div>`;
      } else {
        return `<div class="pp-file">${item.name}</div>`;
      }
    };

    return generateHtml(pack.root, {});
  }
}
