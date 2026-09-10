import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const imageDir = path.resolve('public/images');
const files = (await readdir(imageDir)).filter((file) => file.endsWith('.png'));

await Promise.all(files.map(async (file) => {
  const input = path.join(imageDir, file);
  const output = path.join(imageDir, file.replace(/\.png$/i, '.webp'));
  await sharp(input)
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 76, effort: 5 })
    .toFile(output);
}));
