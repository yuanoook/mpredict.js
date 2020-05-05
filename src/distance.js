function _calcDistance(x1, y1, x2, y2) {
  return Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
}

function _calcDistanceBetween(point1, point2) {
  return _calcDistance(point1[0], point1[1], point2[0], point2[1]);
}

module.exports = {
  _calcDistance,
  _calcDistanceBetween
}
