import fs from 'fs';
import path from 'path';

function toKebabCase(str) {
  return str
    .normalize('NFD') // Decompose accents
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '-') // Replace non-alphanumeric (except dot) with hyphen
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

function renameFilesInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      renameFilesInDir(fullPath);
      const newDirName = toKebabCase(file);
      if (newDirName !== file) {
        fs.renameSync(fullPath, path.join(dir, newDirName));
      }
    } else {
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const newName = toKebabCase(name) + ext.toLowerCase();
      if (newName !== file) {
        fs.renameSync(fullPath, path.join(dir, newName));
      }
    }
  }
}

renameFilesInDir('./public');
console.log('Done');
