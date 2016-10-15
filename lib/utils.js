const Util = {
  inherits (childClass, parentClass) {
    var Surrogate = function() {};
    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  },

  randomVec(length) {
    let theta = Math.random() * 2 * Math.PI;
    x = Math.cos(theta) * length;
    y = Math.sin(theta) * length;
    return [x,y];
  }



}

module.exports = Util;
