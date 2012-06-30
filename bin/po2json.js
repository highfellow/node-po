util=require('util');

// Get command line args and find path to library.
var argv = process.argv;
var libPath = argv[1].replace(/\/bin\/po2json.js$/, '') + "/lib/po.js";
po=require(libPath);

// parse args.
//console.log(argv);
argv.shift(); argv.shift(); // remove first two items.
var poFile = null, pretty = false, argc=0;
argv.forEach(function(arg) {
  if (arg == '-p') {
    pretty = true;
  }
  else {
    if (argc == 0) {
      poFile = arg;
    }
    argc++;
  }
});

// Load file and print output as JSON.
var cb = function(po) {
  process.stdout.write(util.format('%j',po));
}
po.load(poFile,cb);
