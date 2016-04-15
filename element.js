(function(namespace){


  var self = namespace.Element = function(elementName, attributes){
    this.elementName = elementName;
    this.attributes = attributes;
    this.componentList = [];
  };

  self.prototype.render = function(){
    this.element = document.createElement(this.elementName);

    this._setAttributes();
    this._appendChildren();

    return this.element;
  };

  self.prototype.components = function(){
    this._buildComponents();

    return this.componentList;
  }

  self.prototype.setMainComponent = function(component){
    this.componentList[0] = component;
  }

  self.prototype._buildComponents = function(){
    this._updateComponents(this._getSubcomponents());
  }

  self.prototype._updateComponents = function(components){
      this.componentList.push(...components);
  };

  self.prototype._getSubcomponents = function(){
    var subcomponents = []

    for (var child in this.children){
      child = this.children[child];
      if (child instanceof Newton.Element){
        subcomponents.push(...(child.components()));
      }
    }

    return subcomponents;
  },

  self.prototype._setAttributes = function(){
    for (var property in this.attributes){
      if (this.attributes.hasOwnProperty(property)){
        (property === 'data-newtonid') ?
          this.element.setAttribute(property, this.attributes[property]) :
          this.element[property] = this.attributes[property];
      }
    }
  };

  self.prototype.setChildren = function(children){
    this.children = children;
  };

  self.prototype._appendChildren = function(){
    for (var i in this.children){
      var child = this.children[i];

      if (typeof child === 'string'){
        var node = document.createTextNode(child);
      }
      else {
        var node = child.render();
      }

      this.element.appendChild(node);
    }
  };

})(window.Newton);
