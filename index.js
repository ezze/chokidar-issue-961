const path = require('path');
const fs = require('fs-extra');
const execa = require('execa');
const { watch } = require('chokidar');

const directoryPath = path.resolve(__dirname, 'dir');
const dataDirectoryPath = path.resolve(__dirname, 'data');
const file1Path = path.resolve(dataDirectoryPath, 'file1');
const file2Path = path.resolve(dataDirectoryPath, 'file2');
const fileSize = 1024 * 1024 * 1000;

(async() => {
  try {
    await fs.emptyDir(directoryPath);
    await fs.emptyDir(dataDirectoryPath);
    await createFile(file1Path);
    await createFile(file2Path);

    const chokidarOptions = { ignoreInitial: false, usePolling: true, depth: 2 };
    const watcher = watch(directoryPath, chokidarOptions);
    watcher.on('all', (eventName, itemPath) => {
      console.log(`${eventName}: ${itemPath}`);
    });

    await execa('rsync', ['-a', dataDirectoryPath, `${directoryPath}/`]);
  }
  catch (e) {
    console.error(e);
  }
})();

async function createFile(filePath, size = fileSize) {
  const directoryPath = path.dirname(filePath);
  await fs.ensureDir(directoryPath);
  const fd = await fs.open(filePath, 'w');
  if (size > 0) {
    await fs.write(fd, Buffer.alloc(1, 0), 0, 1, size - 1);
  }
  return fs.close(fd);
}
