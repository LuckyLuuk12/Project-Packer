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
/* harmony export */   getPackFromFiles: () => (/* binding */ getPackFromFiles),
/* harmony export */   openFolderDialog: () => (/* binding */ openFolderDialog),
/* harmony export */   openImage: () => (/* binding */ openImage)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! fs */ "fs");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! path */ "path");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
// import { dialog } from "electron"; // Import remote from electron


function openImage(file) {
    const filePath = typeof file === 'string' ? file : file.path;
    fs__WEBPACK_IMPORTED_MODULE_0__.readFile(filePath, (err, data) => {
        if (err) {
            console.error('[ProjectPacker] [management.ts] Failed to read file:', err);
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
                console.log('[ProjectPacker] [management.ts] Image file opened in BlockBench:', files[0]);
            }
        });
    });
}
// export async function openFolderDialog(): Promise<string | null> {
//   return new Promise((resolve, reject) => {
//     const input =
//         document.getElementById('pp_open_folder_dialog') as HTMLInputElement
//         ?? document.createElement('input');
//     input.type = 'file';
//     input.accept = '.mcmeta';
//     input.style.display = 'none'; // Hide the input element
//     input.webkitdirectory = true; // Allow selecting a directory
//     input.id = 'pp_open_folder_dialog';
//     document.body.appendChild(input); // Append the input to the body
//     input.onchange = (event: Event) => {
//       const target = event.target as HTMLInputElement;
//       if (target.files && target.files.length > 0) {
//         console.log('[ProjectPacker] [management.ts] File dialog opened:', target.files[0], target.files[0].webkitRelativePath);
//         const filePath = target.files[0].webkitRelativePath; // Use the full system path
//         console.log('[ProjectPacker] [management.ts] FilePath containing .mcmeta file:', filePath);
//         const folderPath = filePath.substring(0, filePath.lastIndexOf('/'));
//         console.log('[ProjectPacker] [management.ts] FolderPath containing .mcmeta file:', folderPath);
//         fs
//         resolve(folderPath);
//       } else {
//         console.log('[ProjectPacker] [management.ts] File dialog was canceled.');
//         resolve(null);
//       }
//       document.body.removeChild(input); // Remove the input element from the DOM
//     };
//     input.oncancel = reject;
//     input.click();
//   });
// }
function getPack(packPath) {
    console.log('[ProjectPacker] [management.ts] Loading pack from path:', packPath);
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
// Web attempt:
// export async function openFolderDialogOld(): Promise<any> {
//   let dirHandle = null;
//   try {
//     dirHandle = await (window as any).showDirectoryPicker({ id: 'pp_open_folder_dialog', mode: 'readwrite', startIn: 'desktop' });
//     // TODO: does not seem to work, it opens a dialog tho
//     console.log('[ProjectPacker] [management.ts] Folder dialog opened:', dirHandle);
//     return dirHandle;
//   } catch (err) {
//     console.error('[ProjectPacker] [management.ts] Failed to open folder dialog:', err);
//     return null;
//   }
// }
async function openFolderDialog() {
    return new Promise((resolve, reject) => {
        var _a;
        const input = (_a = document.getElementById('pp_open_folder_dialog')) !== null && _a !== void 0 ? _a : document.createElement('input');
        input.type = 'file';
        input.accept = '.mcmeta';
        input.style.display = 'none'; // Hide the input element
        input.webkitdirectory = true; // Allow selecting a directory
        input.id = 'pp_open_folder_dialog';
        document.body.appendChild(input); // Append the input to the body
        input.onchange = (event) => {
            const target = event.target;
            if (target.files && target.files.length > 0) {
                console.log('[ProjectPacker] [management.ts] File dialog opened:', target.files);
                // Use the files to construct a folder structure
                const folderStructure = getFolderFromFiles(target.files);
                console.log('[ProjectPacker] [management.ts] Folder structure:', folderStructure);
                resolve(folderStructure);
            }
            else {
                console.log('[ProjectPacker] [management.ts] File dialog was canceled.');
                resolve(null);
            }
            document.body.removeChild(input); // Remove the input element from the DOM
        };
        input.oncancel = reject;
        input.click();
    });
}
function getPackFromFiles(filePath, files) {
    const packName = path__WEBPACK_IMPORTED_MODULE_1__.basename(filePath);
    const root = getFolderFromFiles(files);
    const settings = {};
    return {
        name: packName,
        root,
        settings
    };
}
function getFolderFromFiles(files) {
    const items = Array.from(files).map(file => {
        // TODO: implement recursive folder reading
        return getFileFromFiles(file);
    });
    return {
        name: files[0].webkitRelativePath.split('/')[0],
        type: 'folder',
        path: files[0].webkitRelativePath.split('/')[0],
        items: items
    };
}
function getFileFromFiles(file) {
    return {
        name: file.name,
        type: 'file',
        path: file.webkitRelativePath
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
/* harmony import */ var _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ProjectLoader */ "./components/ProjectLoader.ts");


let SELECT_PACK_ACTION = new Action('pp_select_pack', {
    name: 'Select Pack',
    icon: 'folder_open',
    click: () => {
        (0,_api_management__WEBPACK_IMPORTED_MODULE_0__.openFolderDialog)().then((pack) => {
            console.log('[ProjectPacker] [Actions.ts] Selected pack:', pack);
            if (pack) {
                _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project = {
                    name: pack.name,
                    root: pack,
                    settings: {}
                };
                // @ts- ignore
                Interface.Panels.pp_project_panel.inside_vue.$emit('updateProject', _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project);
                Interface.Panels.pp_project_panel.inside_vue.$forceUpdate();
                console.log('[ProjectPacker] [Actions.ts] Updated pack:', pack);
            }
            console.log('[ProjectPacker] [Actions.ts] Project loaded:', _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project);
        });
    }
});
let EXPORT_PACK_ACTION = new Action('pp_export_pack', {
    name: 'Export Pack',
    icon: 'folder_zip',
    click: () => {
        console.log('[ProjectPacker] [Actions.ts] Exported pack:', _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project);
        // Perform optimization and fixing of issues in the pack
        // Then export the pack with fs to either a location specified in the pack settings or make a dialog to select a location
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
    unregister() {
        this.loader.delete();
    }
    async openLoader() {
        const pack = await (0,_api_management__WEBPACK_IMPORTED_MODULE_0__.openFolderDialog)();
        if (pack) {
            console.log('[ProjectPacker] [ProjectLoader.ts] Selected folder:', pack);
            ProjectLoader.project = {
                name: pack.name,
                root: pack,
                settings: {}
            };
            console.log('[ProjectPacker] [ProjectLoader.ts] Project loaded:', ProjectLoader.project);
        }
        else {
            console.log('[ProjectPacker] [ProjectLoader.ts] No folder selected: ', pack);
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
                data: () => {
                    var _a, _b;
                    return ({
                        pack: (_b = (_a = _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'No Pack Selected',
                        packHtml: ProjectPanel.generatePackHtml(_ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project)
                    });
                },
                methods: {
                    selectPack: () => {
                        this.selectPack.click();
                    },
                    exportPack: () => {
                        this.exportPack.click();
                    },
                    updatePack: () => {
                        var _a, _b;
                        // @ts -ignore
                        this.pack = (_b = (_a = _ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : 'No Pack Selected';
                        // @ts- ignore
                        this.packHtml = ProjectPanel.generatePackHtml(_ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"].project);
                    },
                    open(name) {
                        console.log('[ProjectPacker] [ProjectPanel.ts] Opened file:', name);
                        Project.name = name;
                    }
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
        return /*html*/ `
      <div id="custom_panel_content" class="pp-project-panel">
        <button id="pp_select_pack" class="pp-button pp-select" @click="selectPack()">Select Pack</button>
        <div class="pp-project-tree" style="height: 100%;" v-html="packHtml"/>
        <button id="pp_export_pack" class="pp-button pp-export" @click="exportPack()">Export Pack</button>
      </div>`;
    }
    static generatePackHtml(pack) {
        console.log('[ProjectPacker] [ProjectPanel.ts] Generating pack HTML:', pack);
        if (!pack)
            return /*html*/ `<!-- No pack selected -->`;
        const generateHtml = (item) => {
            if (item.type === 'folder') {
                return /*html*/ `<div class="pp-folder">
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
            }
            else { // TODO: make this @click work... parameterized functions do not seem to work even with ${}
                return /*html*/ ` 
        <a class="pp-file" href="${item.path}" target="_blank">
          ${item.name.replace(/(.*)(\.[^.]*)$/, '$1<span class="pp-file-extension">$2</span>')}
        </a>`;
            }
        };
        return generateHtml(pack.root);
    }
}


/***/ }),

/***/ "./styles.ts":
/*!*******************!*\
  !*** ./styles.ts ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   STYLES: () => (/* binding */ STYLES)
/* harmony export */ });
let STYLES = Blockbench.addCSS(/*css*/ `
:root {
    --folder-color: #2b2f3a;
    --even-color: #3c4452;
    --odd-color: #4a5263;
    --extension-color: #7f848e;
}
.pp-project-panel {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    max-height: 90vh;
    overflow: hidden;
    font-size: 14px;
}
.pp-button {
    padding: 5px 10px;
    background: var(--color-button);
}
.pp-button:hover {
    background: var(--color-accent);
    color: var(--color-dark) !important;
}
.pp-project-tree {
    max-height: 90vh;
    overflow-x: hidden;
    overflow-y: scroll;
}

.pp-folder {
    display: flex;
    flex-direction: column;
    margin: 0 0 0 10px;
    border-left: 1px solid #333;
    overflow: hidden;
}
.pp-folder-name, .pp-folder-name:hover {
    display: flex;
    background: unset;
    border-left: 3px solid var(--folder-color);
    color: var(--color-accent) !important;
    border: none;
    padding: 0;
    margin: 0;
    width: unset;
    height: unset;
    text-align: left;
    overflow: hidden;
}
.pp-file:nth-of-type(odd) {
    border-left: 3px solid var(--odd-color);
}
.pp-file:nth-of-type(even) {
    border-left: 3px solid var(--even-color);
}
.pp-file {
    color: var(--color-text);
    padding-left: 10px;
    overflow: hidden;
    margin: 0;
    padding: 0 0 0 5px;
    width: 100%;
    height: unset;
    background: unset;
    text-align: left;
    text-decoration: none !important;
}
.pp-file-extension {
    color: var(--extension-color);
}

.pp-folder-contents {
    display: none;
    flex-direction: column;
}

.pp-folder-toggle:checked ~ .pp-folder-contents {
    display: flex;
}

.pp-folder-toggle {
    display: none;
}
.pp-export {
    margin-top: auto; 
}
`);


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
/* harmony import */ var _styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles */ "./styles.ts");




let PP_STYLES = null;
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
    variant: "desktop", // TODO: we want web as well but need API support for that
    website: "https://github.com/LuckyLuuk12/Project-Packer",
    repository: "https://github.com/JannisX11/blockbench-plugins/tree/master/plugins/project_packer",
    bug_tracker: "https://github.com/LuckyLuuk12/Project-Packer/issues?q=sort%3Aupdated-desc+is%3Aissue+is%3Aopen",
    onload() {
        PP_STYLES = _styles__WEBPACK_IMPORTED_MODULE_3__.STYLES;
        PROJECT_LOADER = new _components_ProjectLoader__WEBPACK_IMPORTED_MODULE_1__["default"]();
        PROJECT_PANEL = new _components_ProjectPanel__WEBPACK_IMPORTED_MODULE_0__.ProjectPanel();
    },
    onunload() {
        PP_STYLES === null || PP_STYLES === void 0 ? void 0 : PP_STYLES.delete();
        PROJECT_LOADER === null || PROJECT_LOADER === void 0 ? void 0 : PROJECT_LOADER.unregister();
        PROJECT_PANEL === null || PROJECT_PANEL === void 0 ? void 0 : PROJECT_PANEL.unregister();
        (0,_components_Actions__WEBPACK_IMPORTED_MODULE_2__.deleteActions)();
    }
});

})();

/******/ })()
;