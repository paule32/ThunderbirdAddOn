// ----------------------------------------------
// used global scoped variables ...
// ----------------------------------------------
var math_count = 1;

// ----------------------------------------------
// this configuration enables TeX-Math input:
// ----------------------------------------------
MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  }
};

// ----------------------------------------------
// this exception class is used, to mark the end
// of execution (e.g. when the parser reach EOF.
// ----------------------------------------------
class NoErrorException extends Error {
  constructor(message) {
    super(message);
    this.message = message;
    this.name = "NoErrorException";
  }
}

// ----------------------------------------------
// parse the input of <textarea> ...
// ----------------------------------------------
function exec_parser() {
  $("#content").empty();
  try {
    y.parse(document.getElementById("source").value);
  }
  catch (error) {
    // ----------------------------------------------
    // if EOF reach, then stop the JavaScript exec...
    // ----------------------------------------------
    if (error.name == "NoErrorException") {
       console.log("ok, all done.");
       document.getElementById("lines").innerHTML = "psarsed lines: " + error.message;
       return;
    // ----------------------------------------------
    // inform the user, of all other exceptions ...
    // ----------------------------------------------
    }  else {
       alert("Exception: " + error);
    }
  }
}

let promise = Promise.resolve();
function typeset(code) {
  promise = promise.then(() => MathJax.typesetPromise(code()))
  .catch((err) => console.log('Typeset failed: ' + err.message));
  return promise;
}

$(document).ready(function() {
    $("#btn_preview").click(function() {
        alert(this.id);
    });
    $("#btn_send").click(function() {
        alert("hallo");
    });
});
