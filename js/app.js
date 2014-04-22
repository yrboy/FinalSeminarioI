App = Ember.Application.create({});

var posts = [{
  id: '1',
  title: "Lorem Ipsum",
  date: new Date('04-17-2014'),
  excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet ante non enim blandit tempor non vel dolor. Mauris id lacus purus. Quisque ut posuere dolor. In eu euismod lacus, eu egestas erat. Mauris nec pellentesque magna. Nulla facilisi. Morbi convallis est et erat gravida malesuada.",
  body: " Maecenas non mollis eros. Nunc lobortis at libero a bibendum. Duis a tincidunt eros. Proin egestas lacus sit amet purus pellentesque, ac vestibulum purus ullamcorper. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla diam quam, condimentum id purus at, hendrerit convallis felis. Aenean tempus egestas sollicitudin. Ut a sapien a turpis varius lacinia. Pellentesque in dignissim sem. Fusce sagittis lorem sed nunc pharetra, eu lacinia nulla posuere. Duis fringilla faucibus nibh, eget fermentum magna volutpat nec. Vivamus sagittis gravida ullamcorper. Proin facilisis adipiscing dolor eget pellentesque. Pellentesque nulla sapien, vehicula vel augue at, elementum porttitor tortor. Pellentesque placerat augue non magna mollis, vitae volutpat nulla posuere. Maecenas tincidunt, enim vel tincidunt scelerisque, elit orci bibendum urna, nec egestas est purus vel ante. Sed est ante, suscipit et hendrerit ac, ullamcorper ac turpis. Vivamus eget nunc a nisl euismod varius eget in felis. Nunc ornare tortor urna. Vestibulum in pretium sem."
}, {
  id: '2',
  title: "Neque porro quisquam",
  date: new Date('04-21-2014'),
  excerpt: "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
  body: "Duis fringilla faucibus nibh, eget fermentum magna volutpat nec. Vivamus sagittis gravida ullamcorper. Proin facilisis adipiscing dolor eget pellentesque. Pellentesque nulla sapien, vehicula vel augue at, elementum porttitor tortor. Pellentesque placerat augue non magna mollis, vitae volutpat nulla posuere. Maecenas tincidunt, enim vel tincidunt scelerisque, elit orci bibendum urna, nec egestas est purus vel ante. Sed est ante, suscipit et hendrerit ac, ullamcorper ac turpis. Vivamus eget nunc a nisl euismod varius eget in felis. Nunc ornare tortor urna. Vestibulum in pretium sem. "  
}];

App.Router.map(function() {
  this.resource('about');
  this.resource('posts', function() {
    this.resource('post', { path: ':post_id' });
  });
});

App.PostsRoute = Ember.Route.extend({
  model: function() {
    return posts;
  }
});

App.PostRoute = Ember.Route.extend({
  model: function(params) {
    return posts.findBy('id', params.post_id);
  }
});

App.PostController = Ember.ObjectController.extend({
  isEditing: false,

  edit: function() {
    this.set('isEditing', true);
  },

  doneEditing: function() {
    this.set('isEditing', false);
	Ember.Handlebars.helper('format-date', function(datenow) {
    return moment(datenow).fromNow();
});
    this.get('store').commit();
  }
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
  return new Handlebars.SafeString(showdown.makeHtml(input));
});

Ember.Handlebars.helper('format-date', function(date) {
  return moment(date).fromNow();
});
