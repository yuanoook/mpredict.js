const {
  _calcDistanceBetween
} = require('./distance');

/**
 * Add a point to current trace
 *
 * @api private
 * @method _addPoint
 */
function _addPoint(newPoint, trace, _options) {
  // reset trace if it's needed
  if (trace.length > 0) {
      var newPointTimeStamp = newPoint[2]
      var lastPointTimeStamp = trace[trace.length-1][2]
      var isNotNew = newPointTimeStamp < lastPointTimeStamp
      var isTooNew = newPointTimeStamp > lastPointTimeStamp + _options.pauseThreshold
      if (isNotNew || isTooNew) {
          trace = [];
      }
  }

  if (trace.length > 0) {
      var traceFirstPoint = trace[0]
      var traceLastPoint = trace[trace.length-1]
      var distanceBetweenLastAndFirst = _calcDistanceBetween(traceFirstPoint, traceLastPoint);
      var distanceBetweenNewAndFirst = _calcDistanceBetween(traceFirstPoint, newPoint);
      var keepLastPointAndStartANewTrace = distanceBetweenNewAndFirst < distanceBetweenLastAndFirst;

      if (keepLastPointAndStartANewTrace) {
          trace = [traceLastPoint];
      }
  }

  if (trace.length === 0 || _options.sampleInterval === 0) {
      trace.push(newPoint);
  }
  else {
      var l = trace.length;
      var timeDiff = newPoint[2] - trace[l-1][2], rate = _options.sampleInterval / timeDiff;
      var x = trace[l-1][0], y = trace[l-1][1];
      while (timeDiff >= _options.sampleInterval) {
          trace.push([
              trace[l-1][0] + rate * (newPoint[0] - x),
              trace[l-1][1] + rate * (newPoint[1] - y),
              trace[l-1][2] + _options.sampleInterval
          ]);
          timeDiff -= _options.sampleInterval;
          l++;
      }
  }

  return trace;
}

module.exports = _addPoint
