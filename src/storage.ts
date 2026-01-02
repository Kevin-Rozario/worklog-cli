import fs from "fs/promises";
import path from "path";
import os from "os";

const FOLDER_PATH = path.join(os.homedir(), "./.worklog-records");

const getFilePath = (name: string) =>
  path.join(FOLDER_PATH, name.endsWith(".json") ? name : `${name}.json`);

export const checkIfFileExists = async (name: string) => {
  try {
    await fs.access(getFilePath(name));
    return true;
  } catch {
    return false;
  }
};

/**
 * Reads and parses JSON from the records folder
 */
export const readFromJsonFile = async <T>(name: string): Promise<T | null> => {
  if (!(await checkIfFileExists(name))) return null;
  try {
    const data = await fs.readFile(getFilePath(name), "utf8");
    return JSON.parse(data) as T;
  } catch (e) {
    throw new Error(`Parse Error in ${name}: ${e}`);
  }
};

/**
 * Writes data to JSON, creating the directory if it's missing
 */
export const writeToJsonFile = async (name: string, data: object) => {
  try {
    await fs.mkdir(FOLDER_PATH, { recursive: true });
    await fs.writeFile(
      getFilePath(name),
      JSON.stringify(data, null, 2),
      "utf8"
    );
  } catch (e) {
    throw new Error(`Write Error: ${e}`);
  }
};
