import { Pack, File } from "../types";

import * as fs from 'fs';
import * as path from 'path';

export function openImage(file: File | string): void { // NO CLUE WHETHER THIS WORKS
  const filePath = typeof file === 'string' ? file : file.path;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Failed to read file:', err);
      return;
    }

    const base64Data = data.toString('base64');
    const dataUrl = `data:image/${path.extname(filePath).slice(1)};base64,${base64Data}`;

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

export async function openFolderDialog(): Promise<string | null> {
  return (window as any).showDirectoryPicker({ id: 'pp_open_folder_dialog', mode: 'readwrite', startIn: 'desktop' })
    .then((dirHandle) => { // TODO: does not seem to work, it opens a dialog tho
      console.log('[ProjectPacker] Folder dialog opened:', dirHandle);
      try {
        return dirHandle;
      } catch (err) {
        console.error('[ProjectPacker] Failed to open folder dialog:', err);
        return null;
      }
    });
}

export function getPack(packPath: string): Pack {
  const packName = path.basename(packPath);
  const root = getFolder(packPath);
  const settings = {};

  return {
    name: packName,
    root,
    settings
  };
}

function getFolder(folderPath: string): File {
  const folderName = path.basename(folderPath);
  const items = fs.readdirSync(folderPath).map(itemName => {
    const itemPath = path.join(folderPath, itemName);
    const stats = fs.statSync(itemPath);

    if (stats.isDirectory()) {
      return getFolder(itemPath);
    } else {
      return getFile(itemPath);
    }
  });

  return {
    name: folderName,
    type: 'folder',
    path: folderPath,
    items: items
  }
}

function getFile(filePath: string): File {
  const fileName = path.basename(filePath);

  return {
    name: fileName,
    type: 'file',
    path: filePath
  }
}
