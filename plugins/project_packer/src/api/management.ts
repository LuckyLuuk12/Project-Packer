import { Pack, PPFile } from "../types";
// import { dialog } from "electron"; // Import remote from electron
import * as fs from 'fs';
import * as path from 'path';

export function openImage(file: File | string): void { // NO CLUE WHETHER THIS WORKS
  const filePath = typeof file === 'string' ? file : file.path;
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('[ProjectPacker] [management.ts] Failed to read file:', err);
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


export function getPack(packPath: string): Pack {
  console.log('[ProjectPacker] [management.ts] Loading pack from path:', packPath);
  const packName = path.basename(packPath);
  const root = getFolder(packPath);
  const settings = {};

  return {
    name: packName,
    root,
    settings
  };
}
function getFolder(folderPath: string): PPFile {
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
function getFile(filePath: string): PPFile {
  const fileName = path.basename(filePath);

  return {
    name: fileName,
    type: 'file',
    path: filePath
  }
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
export async function openFolderDialog(): Promise<PPFile | null> {
  return new Promise((resolve, reject) => {
    const input =
      document.getElementById('pp_open_folder_dialog') as HTMLInputElement
      ?? document.createElement('input');
    input.type = 'file';
    input.accept = '.mcmeta';
    input.style.display = 'none'; // Hide the input element
    input.webkitdirectory = true; // Allow selecting a directory
    input.id = 'pp_open_folder_dialog';
    document.body.appendChild(input); // Append the input to the body

    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        console.log('[ProjectPacker] [management.ts] File dialog opened:', target.files);

        // Use the files to construct a folder structure
        const folderStructure = getFolderFromFiles(target.files);
        console.log('[ProjectPacker] [management.ts] Folder structure:', folderStructure);

        resolve(folderStructure);
      } else {
        console.log('[ProjectPacker] [management.ts] File dialog was canceled.');
        resolve(null);
      }
      document.body.removeChild(input); // Remove the input element from the DOM
    };
    input.oncancel = reject;
    input.click();
  });
}
export function getPackFromFiles(filePath: string, files: FileList): Pack {
  const packName = path.basename(filePath);
  const root = getFolderFromFiles(files);
  const settings = {};
  return {
    name: packName,
    root,
    settings
  };
}
function getFolderFromFiles(files: FileList): PPFile {
  const items: PPFile[] = Array.from(files).map(file => {
    // TODO: implement recursive folder reading
    return getFileFromFiles(file);
  });
  return {
    name: files[0].webkitRelativePath.split('/')[0],
    type: 'folder',
    path: files[0].webkitRelativePath.split('/')[0],
    items: items
  }
}
function getFileFromFiles(file: File): PPFile {
  return {
    name: file.name,
    type: 'file',
    path: file.webkitRelativePath
  }
}
