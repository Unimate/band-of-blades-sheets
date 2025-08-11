import * as fs from 'fs';
import path from 'path';

function prepareDistForDev() {
  const distFolder = './dist';

  if (fs.existsSync(distFolder)) {
    fs.rmSync(distFolder, { recursive: true, force: true });
  }

  fs.mkdirSync(distFolder);

  const publicFolder = './public';

  fs.cpSync(publicFolder, distFolder, { recursive: true });

  const message =     `Hello, Band of Blades Sheets dev 👋.
   This file exists so that foundry is happy and will consider the module eligible to load up. 
   The vite server proxy will do the rest.
   Thanks guys from Tidy 5e, they are the best!
   `;


  fs.writeFileSync(path.join(distFolder, 'band-of-blades-sheets.js'), `/* ${message} */`);

  fs.writeFileSync(path.join(distFolder, 'band-of-blades-sheets.css'), `/* ${message} */`);

  fs.writeFileSync(path.join(distFolder, 'band-of-blades-sheets.lock'), "🔒");
}

prepareDistForDev();
