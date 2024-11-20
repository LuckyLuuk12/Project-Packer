// TODO: File type already exists
export interface PPFile {
  name: string;
  type: 'file' | 'folder';
  path: string;
  items?: PPFile[];
}

export interface Pack {
  name: string;
  root: PPFile;
  settings: {
    [key: string]: any;
  };
}
