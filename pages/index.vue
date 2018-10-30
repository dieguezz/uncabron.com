<template>
  <div>
    <h1>Un título</h1>
    <div class="flex player" v-for="item in lyrics" :key="item.id">
      <div class="content">
        <h2 class="title" >{{item.title}}</h2>
        <div class="lyrics flex-1">
          {{item.text}}
        </div>
        <audio :src="item.src" controls>
          Tu navegador no soporta el elemento <code>audio</code>.
        </audio>
      </div>
      <Speech :lyric="item.text" :id="item.id"/>
    </div>
  </div>
</template>

<script>
  import lyrics from '~/assets/lyrics'
  import Speech from '@/components/Speech'

export default {
  data() {
    return {
      speeching: false,
      lyrics
    }
  },
  components: {
    Speech
  },
}
</script>

<style lang="scss">

  body {
    background-color: #1d1d1d;
  }
  ::-webkit-scrollbar {
      width: 1em;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    background-color: #2f2f2f;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #8c2b2a;
    outline: 1px solid white;
  }

  .title {
    color: white;
  }
  audio {
    width: 100%;
    margin-top: 20px;
  }
  .flex {
    display: flex;
  }
  .flex-1 {
    flex: 1;
  }

  .player {
    display: flex;
    padding: 20px;
  }

  .song {
    background-image: url('/kase1.jpg');
    width: 100vw;
    height: 100vh;
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  video {
    display: flex;
    width: 320px;
    height: 55px;
  }

  .content {
    background-color: #2f2f2f;
    padding: 20px;
  }

  .lyrics {
    max-height: 135px;
    white-space: pre-line;
    overflow-y: scroll;
    overflow-x: hidden;
    color: #ae8d8d;
    margin-top: 20px;
  }
</style>
