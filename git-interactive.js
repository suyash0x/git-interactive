#!/usr/bin/env node

const readline = require("readline");
const { exec } = require("child_process");

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Simple Git Command REPL");
console.log(
  'Perform a Git opeartion (e.g., commit -m "First commit"). Type "exit" to end the program. Type "clear" to clear the console',
);

function processInput() {
  reader.question("git >>> ", (input) => {
    if (input.toLowerCase() === "exit") {
      reader.close();
      return;
    }

    if (input.toLowerCase() === "clear") {
      process.stdout.write("\x1Bc");
      processInput();
      return;
    }

    const gitCommand = `git ${input}`;

    exec(gitCommand, (error, stdout) => {
      if (error) {
        console.error("Error:", error.message);
      } else {
        console.log(stdout);
      }

      processInput();
    });
  });
}

processInput();
