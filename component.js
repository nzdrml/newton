(function(namespace){

  var self = namespace.Component = function(props){
    var uid = Newton.assignUID();

    this.props = props || {};
    this.state = this.getInitialState();

    this.getUID = function(){
      return uid;
    };
  };

  self.prototype.render = function(){
    return null;
  }

  self.prototype.willRender = function(){
    return null;
  }

  self.prototype.didRender = function(){
    return null;
  }

  self.prototype.getInitialState = function(){
    return {};
  }

  self.prototype.setState = function(state){
    for (var property in state){
      this.state[property] = state[property];
    }

    Newton.DOM.update(this);
  }

})(window.Newton);
