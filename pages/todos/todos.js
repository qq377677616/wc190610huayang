const app = getApp();
const wxb = require('/utils/wxb.js')
Page({
  data: {},

  onLoad() {
  var timestamp = Date.parse(new Date());
  let uid = wxb.getStorages("token").data;
  if(!uid){
          uid=""
   }
   var _qs = "t=activity&userId="+uid+"&snowbeer"
    wxb.Post("/saveRecord",{sign:_qs,t:"activity",userId:uid},(res)=>{
      console.log(res)
    })
  },

  onShow() {
    this.setData({ todos: app.todos });
  },

  onTodoChanged(e) {
    const checkedTodos = e.detail.value;
    app.todos = app.todos.map(todo => ({
      ...todo,
      completed: checkedTodos.indexOf(todo.text) > -1,
    }));
    this.setData({ todos: app.todos });
  },

  addTodo() {
    my.navigateTo({ url: '../add-todo/add-todo' });
  },
});
