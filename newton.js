window.Newton = window.Newton || {};

(function(namespace){

  var self = namespace,
      initialUIDindex = -1;


  self.createClass = function(properties){
    var component = function(props){
      Newton.Component.call(this, props);
    };

    properties.__proto__ = Newton.Component.prototype;
    component.prototype = properties;

    return component;
  };


  self.assignUID = function(){
    initialUIDindex++;
    return initialUIDindex;
  };

})(window.Newton);
