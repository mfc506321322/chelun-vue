const state = {
  list: [{
    src: 'http://localhost:8080/src/assets/IdCard/id-a.png',
    desc: '身份证正面'
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/id-b.png',
    desc: '身份证反面'
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/licence-a.png',
    desc: '驾驶证正页'
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/licence-b.png',
    desc: '驾驶证副页'
  }, {
    src: 'http://localhost:8080/src/assets/IdCard/photo.png',
    desc: '白底半身照'
  }]
}

const muatations = {
  updataList(state, payload){
    console.log('state...',state)
    console.log('payload...',payload)
    state.list[payload.index].src = payload.src
  }
}

export default {
  state,
  muatations
}