/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api/management.ts":
/*!***************************!*\
  !*** ./api/management.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectFolder: () => (/* binding */ selectFolder)
/* harmony export */ });
function selectFolder() {
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
        onConfirm: function () {
            console.log('[PP] Confirm button clicked');
            // Handle project loading logic here
        }
    }).show();
}


/***/ }),

/***/ "./components/Actions.ts":
/*!*******************************!*\
  !*** ./components/Actions.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EXPORT_PACK_ACTION: () => (/* binding */ EXPORT_PACK_ACTION),
/* harmony export */   SELECT_PACK_ACTION: () => (/* binding */ SELECT_PACK_ACTION)
/* harmony export */ });
let SELECT_PACK_ACTION = new Action('pp_select_pack', {
    name: 'Select Pack',
    icon: 'folder_open',
    click: () => {
        console.log('Select pack button pressed');
        // Add your custom action logic here
    }
});
let EXPORT_PACK_ACTION = new Action('pp_export_pack', {
    name: 'Export Pack',
    icon: 'folder_zip',
    click: () => {
        console.log('Export pack button pressed');
        // Add your custom action logic here
    }
});


/***/ }),

/***/ "./components/ProjectLoader.ts":
/*!*************************************!*\
  !*** ./components/ProjectLoader.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectLoader: () => (/* binding */ ProjectLoader)
/* harmony export */ });
class ProjectLoader {
    constructor() {
        this.loader = new ModelLoader('pp_project_loader', {
            name: 'Project Loader',
            icon: 'folder_open',
            format_page: {
                component: {
                    methods: {
                    // openLoader
                    },
                    template: `
            <div class="ewan-format-page" style="display:flex;flex-direction:column;height:100%">
              <p class="format_description">Load a complete Resource Pack for easy access to all files with the Project Panel</p>
              <p class="format_target"><b>Target</b> : <span>Minecraft: Java Edition</span> <span>Resource Pack Management</span></p>
              <content>
                <h3 class="markdown">How to use:</h3>
                <p class="markdown">
                  <ul>
                    <li><p>Press <strong>Load Resource Pack</strong> and select a <b>folder</b>.</p></li>
                    <li><p>Use the Project Panel to select files and modify them.</p></li>
                    <li><p>Press the export button to open the Export Dialog and complete your pack.</p></li>
                  </ul>
                </p>
              </content>
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
}


/***/ }),

/***/ "./components/ProjectPanel.ts":
/*!************************************!*\
  !*** ./components/ProjectPanel.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProjectPanel: () => (/* binding */ ProjectPanel)
/* harmony export */ });
/* harmony import */ var _Actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Actions */ "./components/Actions.ts");

class ProjectPanel {
    constructor() {
        this.selectPack = _Actions__WEBPACK_IMPORTED_MODULE_0__.SELECT_PACK_ACTION;
        this.exportPack = _Actions__WEBPACK_IMPORTED_MODULE_0__.EXPORT_PACK_ACTION;
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
                template: `
          <div id="custom_panel_content" style="display: flex; flex-direction: column; padding: 10px; height: 100%">
            <button id="pp_select_pack" class="pp-button pp-select">Select Pack</button>
            <div class="pp-project-tree" style="height: 100%;"></div>
            <button id="pp_export_pack" class="pp-button pp-export">Export Pack</button>
          </div>
        `,
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
    unregister() {
        // Unregister the actions and the panel
        this.selectPack.delete();
        this.exportPack.delete();
        this.panel.delete();
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api/management */ "./api/management.ts");
/* harmony import */ var _components_ProjectPanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ProjectPanel */ "./components/ProjectPanel.ts");
/* harmony import */ var _components_ProjectLoader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/ProjectLoader */ "./components/ProjectLoader.ts");



let SELECT_PACK_ACTION = null;
let PROJECT_PANEL = null;
let PROJECT_LOADER = null;
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
    onload() {
        PROJECT_LOADER = new _components_ProjectLoader__WEBPACK_IMPORTED_MODULE_2__.ProjectLoader();
        PROJECT_PANEL = new _components_ProjectPanel__WEBPACK_IMPORTED_MODULE_1__.ProjectPanel();
        // @ts-ignore - idk why but I need this for the Action even though we used the blockbench-types
        SELECT_PACK_ACTION = new Action('project_packer_select_pack_button', {
            name: 'PP - Select Resource Pack',
            icon: 'folder_open',
            click: () => {
                // Open the project view dialog when the button is clicked
                console.log('Opening project view dialog');
                (0,_api_management__WEBPACK_IMPORTED_MODULE_0__.selectFolder)();
            }
        });
    },
    onunload() {
        SELECT_PACK_ACTION.delete();
        PROJECT_PANEL.unregister();
    }
});

})();

/******/ })()
;