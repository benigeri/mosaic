var col_width = 200;
var spacing = 20;
var n_current_columns; 
var column_cursors = new Array();

var array;
$(function() {
  main();
  placeTiles();
  window.onresize = windowResized;


});

var windowResized = function () {
  console.log("happend");
  if (getNumColumns() !== n_current_columns) {
    placeTiles();
  }
}



function main() {
  $('.tile').each(function(index) {
    $(this).height(Math.floor(Math.random()*4) * 60 + 60);
  });
}

function setBacklogSize() {
  $('.backlog').width(n_current_columns * col_width + (n_current_columns-1) * spacing);
}
function placeTiles() {

  n_current_columns = getNumColumns();
  resetColumnCursors();
  setBacklogSize();

  $('.tile').each(function(index) {
    var self = $(this);
    var col_index = getMinIndex(column_cursors);
    var el_height = self.height();

    var top = column_cursors[col_index] + spacing + 'px';
    var left = col_index * (col_width + spacing) + 'px';

    self.css({
      top: top,
      left: left
    });

    column_cursors[col_index] += (el_height + spacing);

  });
}

function getNumColumns() {
  return ~~($('.container').width() / (col_width + spacing));
}

function resetColumnCursors() {
  var i;
  column_cursors = new Array();
  for (i = 0; i < n_current_columns; i++) {
    column_cursors[i] = 0;
  }
}

function getMinIndex(arr) {
  var i;
  var current = arr[0];
  var index = 0;
  for (i = 0; i < n_current_columns; i++ ) {
    if (arr[i] < current) {
      current = arr[i];
      index = i;
    }
  }
  return index;
}