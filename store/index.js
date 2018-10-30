import Vuex from 'vuex'

const initialState = {
  transcriptions: {
    leve: {
      similarity: 0,
      text: ''
    }
  }
}

const createStore = () => {
  return new Vuex.Store({
    state: () => (initialState),
    mutations: {
      addTranscription(state, { transcription, id, similarity}) {
        state.transcriptions[id].text = transcription
        state.transcriptions[id].similarity = similarity
      }
    },
    getters: {
      transcriptions: (state) =>
        state.transcriptions
    }
  })
}

export default createStore
