util=require('util');

// Get command line args and load library.
var argv = process.argv;
var libPath = argv[1].replace(/\/bin\/po2json.js$/, '') + "/lib/po.js";
po=require(libPath);

// parse args.
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

// Get gettext domain.
var m=poFile.match(/^.*\/(.*?).po/);
var domain=m[1];

// Load file and print output as JSON.
var cb = function(json) {
  jout={ };
  jout[domain]=json;
  process.stdout.write(util.format('%j',jout));
}
po.load(poFile,cb);
