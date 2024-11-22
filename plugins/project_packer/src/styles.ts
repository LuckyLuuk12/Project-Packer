export let STYLES = Blockbench.addCSS(/*css*/`
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
    overflow-y: scroll;
    overflow-x: hidden;
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
}
.pp-file-extension {
    color: var(--extension-color);
}

.pp-folder-contents {
    display: none;
}

.pp-folder-toggle:checked ~ .pp-folder-contents {
    display: block;
}

.pp-folder-toggle {
    display: none;
}
    
`);
