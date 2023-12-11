import fs from "node:fs/promises";
import path from "path";
import readline from "node:readline";
import log from "./common/logger";
import db from "./db";

interface Example {
  name: string;
}

const readFileAndInsertToDb = async function (
  directory: string,
  filename: string,
) {
  const filehandle = await fs.open(path.join(directory, filename));
  const readStream = filehandle.createReadStream();
  const rl = readline.createInterface(readStream);

  const examples: Example[] = [];
  rl.on("line", (jsonLine: string) => {
    examples.push(JSON.parse(jsonLine));
  }).on("close", () => {
    db("Example")
      .insert(examples)
      .then(console.log)
      .finally(() => db.destroy());
  });
};

// IIFE
(async () => {
  try {
    const dataDir = path.join(process.cwd(), "data");
    const files = await fs.readdir(dataDir);

    await readFileAndInsertToDb(dataDir, files[0]);
  } catch (error) {
    log.error(error);
  }
})();
