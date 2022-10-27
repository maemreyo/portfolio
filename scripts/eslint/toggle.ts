import { checkIfContainsAsync, comment, uncomment } from "../utils/file";
import { info, processing } from "../utils/log";

// TODO: check if there's a eslintignore, if not, create it.
(async () => {
  const ESLINT_PATH = ".eslintignore";
  const ESLINT_OFF = "# *";

  processing("Starting changing the ESLint configurations...")
  const customIndex = process.argv.indexOf('--mode');
  let customValue: any;

  if (customIndex > -1) {
    info(`ESLint is set to '${process.argv[customIndex + 1]}'`);
    customValue = process.argv[customIndex + 1];
  }

  const status = (customValue || 'on');
  const isCommented = await checkIfContainsAsync(ESLINT_PATH, ESLINT_OFF);
  const isForcedOn = status === 'on';

  if (isForcedOn) {
    if (!isCommented) {
      comment(ESLINT_PATH, "*");
    }
  } else {
    if (isCommented) {
      uncomment(ESLINT_PATH, "# *");
    }
  }
})();
