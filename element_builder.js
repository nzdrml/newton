(function(namespace){

  var self = namespace.ElementBuilder = function(){};


  self.prototype = {
    build: function(objectType, attributes, ...children){

      if (objectType instanceof Newton.Component.constructor) {
        var component = new objectType(attributes);
        var element = component.render();

        element.attributes['data-newtonid'] = component.getUID();
        element.setMainComponent(component);
      }
      else {
        var element = new Newton.Element(objectType, attributes);
        element.setChildren(children);
      }

      return element;
    },

    builder: function(){
      return this.build.bind(this);
    }
  }

})(window.Newton);

$ = new Newton.ElementBuilder().builder();
