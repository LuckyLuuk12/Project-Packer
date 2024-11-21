export let STYLES = Blockbench.addCSS(/*css*/`
:root {
    --folder-color: #2b2f3a;
    --even-color: #3c4452;
    --odd-color: #4a5263;
}
.pp-project-panel {
    display: flex;
    flex-direction: column;
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
    overflow: hidden;
}

.pp-folder {
    display: flex;
    flex-direction: column;
    margin: 5px 0 5px 10px;
    border-left: 1px solid #333;
    overflow: hidden;
}
.pp-folder-name, .pp-folder-name:hover {
    background: var(--folder-color);
    color: var(--color-text) !important;
    border: none;
    padding: 0;
    margin: 0;
    width: unset;
    text-align: left;
    overflow: hidden;
}
.pp-file:nth-of-type(odd) {
    background: var(--odd-color);
}
.pp-file:nth-of-type(even) {
    background: var(--even-color);
}
.pp-file {
    color: var(--color-text);
    overflow: hidden;
}
 
    
`);
