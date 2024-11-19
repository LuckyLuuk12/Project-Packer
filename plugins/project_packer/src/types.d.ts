
export interface File {
  name: string;
  type: 'file' | 'folder';
  path: string;
  items?: (File | Folder)[];
}

export interface Pack {
  name: string;
  root: File;
  settings: {
    [key: string]: any;
  };
}