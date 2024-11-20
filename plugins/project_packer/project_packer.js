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
/* harmony export */   getPack: () => (/* binding */ getPack),
/* harmony export */   openFolderDialog: () => (/* binding */ openFolderDialog),
/* harmony export */   openImage: () => (/* binding */ openImage)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);


function openImage(file) {
    const filePath = typeof file === 'string' ? file : file.path;
    fs__WEBPACK_IMPORTED_MODULE_0__.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            return;
        }
        const base64Data = data.toString('base64');
        const dataUrl = `data:image/${path__WEBPACK_IMPORTED_MODULE_1__.extname(filePath).slice(1)};base64,${base64Data}`;
        Blockbench.import({
            type: 'texture',
            resource_id: 'texture',
            extensions: ['png', 'jpg', 'jpeg', 'gif'],
            readtype: 'image'
        }, files => {
            if (files.length) {
                console.log('Image file opened in Blockbench:', files[0]);
            }
        });
    });
}
async function openFolderDialog() {
    return window.showDirectoryPicker({ id: 'pp_open_folder_dialog', mode: 'readwrite', startIn: 'desktop' })
        .then((dirHandle) => {
        console.log('[ProjectPacker] Folder dialog opened:', dirHandle);
        try {
            return dirHandle;
        }
        catch (err) {
            console.error('[ProjectPacker] Failed to open folder dialog:', err);
            return null;
        }
    });
}
function getPack(packPath) {
    const packName = path__WEBPACK_IMPORTED_MODULE_1__.basename(packPath);
    const root = getFolder(packPath);
    const settings = {};
    return {
        name: packName,
        root,
        settings
    };
}
function getFolder(folderPath) {
    const folderName = path__WEBPACK_IMPORTED_MODULE_1__.basename(folderPath);
    const items = fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync(folderPath).map(itemName => {
        const itemPath = path__WEBPACK_IMPORTED_MODULE_1__.join(folderPath, itemName);
        const stats = fs__WEBPACK_IMPORTED_MODULE_0__.statSync(itemPath);
        if (stats.isDirectory()) {
            return getFolder(itemPath);
        }
        else {
            return getFile(itemPath);
        }
    });
    return {
        name: folderName,
        type: 'folder',
        path: folderPath,
        items: items
    };
}
function getFile(filePath) {
    const fileName = path__WEBPACK_IMPORTED_MODULE_1__.basename(filePath);
    return {
        name: fileName,
        type: 'file',
        path: filePath
    };
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
/* harmony export */   SELECT_PACK_ACTION: () => (/* binding */ SELECT_PACK_ACTION),
/* harmony export */   deleteActions: () => (/* binding */ deleteActions)
/* harmony export */ });
/* harmony import */ var _api_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/management */ "./api/management.ts");

let SELECT_PACK_ACTION = new Action('pp_select_pack', {
    name: 'Select Pack',
    icon: 'folder_open',
    click: () => {
        console.log('Select pack button pressed');
        (0,_api_management__WEBPACK_IMPORTED_MODULE_0__.openFolderDialog)().then((path) => {
            if (path) {
                console.log('Selected folder:', path);
                // Add your custom action logic here
            }
        });
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
function deleteActions() {
    const actions = [SELECT_PACK_ACTION, EXPORT_PACK_ACTION];
    actions.forEach(action => action.delete());
}


/***/ }),

/***/ "./components/ProjectLoader.ts":
/*!*************************************!*\
  !*** ./components/ProjectLoader.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ProjectLoader)
/* harmony export */ });
/* harmony import */ var _api_management__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/management */ "./api/management.ts");


class ProjectLoader {
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
    async openLoader() {
        const path = await (0,_api_management__WEBPACK_IMPORTED_MODULE_0__.openFolderDialog)();
        if (path) {
            console.log('Selected folder:', path);
            this.project = (0,_api_management__WEBPACK_IMPORTED_MODULE_0__.getPack)(path);
        }
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
/* harmony import */ var _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectLoader */ "./components/ProjectLoader.ts");


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
    unregister() {
        // Unregister the actions and the panel
        this.selectPack.delete();
        this.exportPack.delete();
        this.panel.delete();
    }
    getTemplate() {
        return `
      <div id="custom_panel_content" style="display: flex; flex-direction: column; padding: 10px; height: 100%">
        <button id="pp_select_pack" class="pp-button pp-select">Select Pack</button>
        <div class="pp-project-tree" style="height: 100%;">` + _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project +
            `</div>
        <button id="pp_export_pack" class="pp-button pp-export">Export Pack</button>
      </div>`;
    }
}


/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/* harmony import */ var _components_ProjectPanel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/ProjectPanel */ "./components/ProjectPanel.ts");
/* harmony import */ var _components_ProjectLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ProjectLoader */ "./components/ProjectLoader.ts");
/* harmony import */ var _components_Actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Actions */ "./components/Actions.ts");



let PROJECT_LOADER = null;
let PROJECT_PANEL = null;
// @ts-ignore - allow the .register method to be called without error
BBPlugin.register('project_packer', {
    title: "Project Packer",
    author: "Luuk Kablan & Zegevlier",
    icon: "icon.png",
    description: "Manage your Minecraft resource pack / project and optimize it!",
    has_changelog: false,
    min_version: "4.11.0",
    max_version: "5.0.0",
    variant: "desktop",
    website: "https://github.com/LuckyLuuk12/Project-Packer",
    repository: "https://github.com/JannisX11/blockbench-plugins/tree/master/plugins/project_packer",
    bug_tracker: "https://github.com/LuckyLuuk12/Project-Packer/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen",
    onload() {
        PROJECT_LOADER = new _components_ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        PROJECT_PANEL = new _components_ProjectPanel__WEBPACK_IMPORTED_MODULE_0__.ProjectPanel();
    },
    onunload() {
        PROJECT_PANEL.unregister();
        (0,_components_Actions__WEBPACK_IMPORTED_MODULE_2__.deleteActions)();
    }
});

})();

/******/ })()
;