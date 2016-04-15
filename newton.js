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

  self.DOM = {
    render: function(element, htmlElement){
      var components = element.components();

      this.triggerCallbacks(components, 'willRender');

      htmlElement.appendChild(element.render());

      this.triggerCallbacks(components, 'didRender');
    },

    update: function(component){
      var UID = component.getUID();
      var element = this.getElement(UID);
      var updatedElement = component.render();

      updatedElement.setMainComponent(component);
      updatedElement.attributes['data-newtonid'] = UID;
      element.parentNode.replaceChild(updatedElement.render(), element);
    },

    getElement: function(UID){
      return document.querySelector("[data-newtonid='" + UID + "']");
    },

    triggerCallbacks: function(components, callback){
      for(var i in components){
        components[i][callback]();
      }
    }
  };

})(window.Newton);
