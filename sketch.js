var font;
var kropki = [];
var inp;

function preload() {
  font = loadFont("LiberationSans-Regular.ttf");
}

function setup() {
  frameRate(60);
  createCanvas(1000, 500);
  inp = createInput("");

  var s = "Pomarańcza";
  textFont(font);
  textSize(150);

  var bounds = font.textBounds(s, 0, 0);
  var points = font.textToPoints(s, (width - bounds.w) / 2, (height + bounds.h) / 2);
  for(pt of points) {
    kropki.push(new Kropka(pt.x, pt.y));
  }
}

function draw() {
  background(60);

  for(var i = 0; i < kropki.length; i++) {
    var kropka = kropki[i];
    kropka.update();

    if(kropka.destroy) {
      if(dist(kropka.pos.x, kropka.pos.y, kropka.target.x, kropka.target.y) < 5) {
        kropki.splice(i, 1);
      }
    }
  }
}

function keyPressed() {
  if(keyCode === ENTER) {
    noweKropki();
  }
}

function noweKropki() {
  var slowo = inp.value();
  inp.value("");

  var bounds = font.textBounds(slowo, 0, 0);
  var points = font.textToPoints(slowo, (width - bounds.w) / 2, (height + bounds.h) / 2);

  var excess = kropki.length - points.length;
  var kropki_to_destroy = [];
  for(var i = 0; i < excess; i++) {
    var to_destroy = kropki.splice(random(kropki.length), 1)[0];
    var target = points[floor(random(points.length))];
    to_destroy.target = createVector(target.x, target.y);
    to_destroy.destroy = true;
    kropki_to_destroy.push(to_destroy);
  }

  for(kropka of kropki) {
    var target = points.splice(random(points.length), 1)[0];
    kropka.target = createVector(target.x, target.y);
  }

  kropki = kropki.concat(kropki_to_destroy);

  while(points.length !== 0) {
    var target = points.splice(random(points.length), 1)[0];
    kropki.push(random(kropki).spawn(target.x, target.y));
  }
}
