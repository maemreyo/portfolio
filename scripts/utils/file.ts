import { error } from "./log";

const { promises: fsPromises } = require('fs');


// ✅ read file ASYNCHRONOUSLY
const checkIfContainsAsync = async (path: string, str: string): Promise<boolean> => {
  try {
    const contents = await fsPromises.readFile(path, 'utf-8');

    const result = contents.includes(str);

    return result;
  } catch (err) {
    error(err);
    return false;
  }
};

const writeFile = async (path: string, content: string) => {
  try {
    await fsPromises.writeFile(path, content);
  } catch (err) {
    error(err);
  }
}

const comment = async (path: string, content: string) => {
  try {
    if (await checkIfContainsAsync(path, content)) {
      const fileContent = await fsPromises.readFile(`${path}`, 'utf-8');
      let fileArray = fileContent.split('\n');

      await writeFile(path, fileArray.map((line: string) => line === content ? `# ${line}` : line).join('\n'));
    }
  } catch (err) {
    error(err);
  }
}

const uncomment = async (path: string, content: string) => {
  try {
    if (await checkIfContainsAsync(path, content)) {
      const fileContent = await fsPromises.readFile(`${path}`, 'utf-8');
      let fileArray = fileContent.split('\n');

      await writeFile(path, fileArray.map((line: string) => line === content ? line.slice(2) : line).join('\n'));
    }
  } catch (err) {
    error(err);
  }
}
export {
  comment,
  uncomment,
  checkIfContainsAsync,
  writeFile
}