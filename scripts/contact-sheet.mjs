import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const dir = path.resolve('public/images');
const slugs = ['nuit-store', 'auto-prestige', 'oymari', 'gunay', 'elgun-samina', 'ramik-mariam'];
const files = (await readdir(dir)).filter((file) => slugs.some((slug) => file.startsWith(slug))).sort();
const width = 320;
const height = 180;
const composites = [];

for (let index = 0; index < files.length; index += 1) {
  const thumbnail = await sharp(path.join(dir, files[index])).resize(width, height).png().toBuffer();
  composites.push({ input: thumbnail, left: (index % 3) * width, top: Math.floor(index / 3) * height });
}

await sharp({ create: { width: width * 3, height: Math.ceil(files.length / 3) * height, channels: 4, background: '#080b11' } })
  .composite(composites)
  .png()
  .toFile('/tmp/portfolio-contact-sheet.png');
