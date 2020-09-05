const global_frametime = 1000 / 60;
var global_vibrate_factor = 1;

function vibrate_once(element) {
  // add to up and right
  setTimeout(function() {
    element.style.marginTop = String(parseInt(element.style.marginTop) + global_vibrate_factor) + "px";
    element.style.marginRight = String(parseInt(element.style.marginRight) + global_vibrate_factor) + "px";
    element.style.marginBottom = String(parseInt(element.style.marginBottom) - global_vibrate_factor) + "px";
    element.style.marginLeft = String(parseInt(element.style.marginLeft) - global_vibrate_factor) + "px";
  }, 0);
  // add to down and right
  setTimeout(function() {
    element.style.marginTop = String(parseInt(element.style.marginTop) - global_vibrate_factor) + "px";
    element.style.marginRight = String(parseInt(element.style.marginRight) + global_vibrate_factor) + "px";
    element.style.marginBottom = String(parseInt(element.style.marginBottom) + global_vibrate_factor) + "px";
    element.style.marginLeft = String(parseInt(element.style.marginLeft) - global_vibrate_factor) + "px";
  }, global_frametime);
  // add to down and left
  setTimeout(function() {
    element.style.marginTop = String(parseInt(element.style.marginTop) - global_vibrate_factor) + "px";
    element.style.marginRight = String(parseInt(element.style.marginRight) - global_vibrate_factor) + "px";
    element.style.marginBottom = String(parseInt(element.style.marginBottom) + global_vibrate_factor) + "px";
    element.style.marginLeft = String(parseInt(element.style.marginLeft) + global_vibrate_factor) + "px";
  }, global_frametime * 2);
  // add to up and left
  setTimeout(function() {
    element.style.marginTop = String(parseInt(element.style.marginTop) + global_vibrate_factor) + "px";
    element.style.marginRight = String(parseInt(element.style.marginRight) - global_vibrate_factor) + "px";
    element.style.marginBottom = String(parseInt(element.style.marginBottom) - global_vibrate_factor) + "px";
    element.style.marginLeft = String(parseInt(element.style.marginLeft) + global_vibrate_factor) + "px";
  }, global_frametime * 3);
}
function modulate_speed(the_truth) {
  if (the_truth)
    ++global_vibrate_factor;
  else
    --global_vibrate_factor;
  document.getElementById("cool_factor").innerHTML = String(global_vibrate_factor);
}
