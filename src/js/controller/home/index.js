let model;
class Index extends Basic {
  constructor(){
    super()
    model = this
    this.init()
  }
  init(){
  }
}
Core.expose('home', 'index', Index)
