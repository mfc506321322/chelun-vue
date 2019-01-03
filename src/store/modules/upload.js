const state = {
  list: [{
    src: 'http://localhost:8080/src/assets/IdCard/id-a.png',
    pic:'http://localhost:8080/src/assets/IdCard/add.png',
    desc: '身份证正面',
    type: true
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/id-b.png',
    pic:'http://localhost:8080/src/assets/IdCard/add.png',
    desc: '身份证反面',
    type: true
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/licence-a.png',
    pic:'http://localhost:8080/src/assets/IdCard/add.png',
    desc: '驾驶证正页',
    type: false
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/licence-b.png',
    pic:'http://localhost:8080/src/assets/IdCard/add.png',
    desc: '驾驶证副页',
    type: false
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/photo.png',
    pic:'http://localhost:8080/src/assets/IdCard/add.png',
    desc: '白底半身照',
    type: true
  }]
}

const mutations = {
  updataList(state, payload){
    state.list[payload.index].src = payload.src
    state.list[payload.index].pic = payload.src
  }
}

export default {
  namespaced: true,
  state,
  mutations
}