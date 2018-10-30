<template>
  <div class="speech">
    <h2>{{calcText}}</h2>
    <div v-show="this.playing" class="btn-back"></div>
      <button v-show="!this.playing" @click="onClickStart"><img src="~/assets/icons/icon-mic.png" alt=""></button>
      <button v-show="this.playing" @click="onClickStop">{{similarity}}%</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import stringSimilarity from 'string-similarity'

export default {
  name: 'speech',
  props: {
    lyric: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: 'foo'
    }
  },

  data() {
    return {
      recognition: '',
      stop: false,
      playing: false,
      lang: 'es-ES'
    }
  },
  computed: {
    transcription() {
      return this.$store.getters.transcriptions[this.id].text
    },
    calcText() {
      return !this.playing ? 'Prueba tu dicción' : 'Calculando nivel...'
    },
    similarity() {
      return Math.floor(stringSimilarity.compareTwoStrings(this.transcription, this.lyric) * 100);
    }
  },
  methods: {
    ...mapMutations({
      addTranscription: 'addTranscription'
    }),
    abort() {
      this.playing = false
      this.recognition.abort()
      this.stop = true
      this.recognition.stop()
      this.addTranscription({ transcription: '', id: this.id, similarity: 0 })
    },
    start() {
      this.stop = false
      this.playing = true
      window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (!SpeechRecognition) {
        return
      }
      this.recognition = new SpeechRecognition()
      this.recognition.lang = this.lang
      this.recognition.continuous = true
      this.recognition.interimResults = true
      this.recognition.addEventListener('result', event => {
        this.addTranscription({ transcription: Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join(''), id: this.id, similarity: this.similarity })
      })
      this.recognition.addEventListener('end', () => {
        if (this.stop) return
        this.recognition.start()
      })
      this.recognition.start()
    },
    onClickStart() {
      if (this.recognition) return
      this.start()
    },
    onClickStop() {
      if (!this.recognition) return
      this.abort()
    },
  },
}
</script>
<style scoped lang="scss">
  .btn-back {
    width: 110px;
    height: 110px;
    border-radius: 50%;
    background-color: white;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: loopScale 700ms infinite;
    position: absolute;
    margin-top: 27px;
  }
  button {
    background-color: transparent;
    position: relative;
    border: none;
    outline: 0;
    cursor: pointer;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: #c32c2c;
    box-shadow: 0px 1px 25px 0px rgba(0,0,0,0.55);
    font-size: 25px;
    font-weight: bold;
    z-index: 1;
    color: white;
  }
  h2 {
    margin-bottom: 25px;
    color: #c32c2c;
    text-shadow: 0px 1px #000000;;
  }
  .speech {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 300px;
    background-color: #2f2f2f;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  @keyframes loopScale {
    0% { transform: scale(1) }
    50% { transform: scale(1.05) }
    100% { transform: scale(1) }
  }
</style>
