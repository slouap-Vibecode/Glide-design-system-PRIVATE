const arg = process.argv[2];

if (arg.startsWith("'") && arg.endsWith("'")) {
  console.log(arg.substring(1, arg.length - 2));
} else {
  console.log(arg);
}
