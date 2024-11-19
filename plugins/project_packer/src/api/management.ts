import { Pack, File } from "../types";

import * as fs from 'fs';
import * as path from 'path';

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
