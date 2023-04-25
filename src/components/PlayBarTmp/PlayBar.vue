<template>
  <div class="play-bar-main">
    <transition name="fade-bar">
      <bar
        v-if="barType == 'Bar'"
        @change-mini="changeMini"
        @audio-handler="playSongStates"
        @play-audio-mode="playAudioMode"
        @set-volume-progress="setvolumeProgress"
        @set-audio-progress="setAudioProgress"
        @set-volume-handler="setVolumeHandler" />
    </transition>
    <transition name="fade-mini">
      <mini-bar
        v-if="barType == 'MiniBar'"
        @change-mini="changeMini"
        @audio-handler="playSongStates"
        @play-audio-mode="playAudioMode"
        @set-audio-progress="setAudioProgress" />
    </transition>
    <audio-box ref="audioRef" @set-current-time="setCurrentTime" />
  </div>
</template>
<script>
  import AudioBox from '/@/components/PlayBarTmp/AudioBox.vue';
  import MiniBar from '/@/components/PlayBarTmp/MiniBar.vue';
  import Bar from '/@/components/PlayBarTmp/Bar.vue';
  import { provide, ref, computed } from 'vue';
  import useSongStore from '/@/store/modules/song';
  export default {
    name: 'PlayBar',
    components: {
      AudioBox,
      MiniBar,
      Bar,
    },
    setup() {
      const audioRef = ref(null);
      const currentTime = ref(0);
      const barType = ref('Bar');
      const songStore = useSongStore();
      const isPlayed = computed(() => songStore.getIsPlayed);
      window.ElectronAPI.setThumbarButton(isPlayed.value);
      // 歌曲播放操作； 播放、暂停、上一首、下一首
      const playSongStates = state => {
        audioRef.value.playAudioType(state);
      };
      window.ElectronAPI.setPlaySongStates((event, value) => {
        playSongStates(value);
        event.sender.send('set-thumbar-button', isPlayed.value);
      });
      // 外部传来的音频地址
      window.ElectronAPI.getUserOpenFile((event, filePath) => {
        songStore.setPlayAll({ list: [{ url: filePath }] });
      });
      // 歌曲播放类型：循环、单曲、随机
      const playAudioMode = mode => {
        audioRef.value.playAudioMode(mode);
      };
      // 拖拽音量进度条
      const setvolumeProgress = progress => {
        audioRef.value.setvolumeProgress(progress);
      };
      // 设置音量
      const setVolumeHandler = state => {
        audioRef.value.setVolumeHandler(state);
      };
      // 拖拽音频进度条
      const setAudioProgress = t => {
        audioRef.value.setAudioProgress(t);
      };
      // 当前音频的播放时长
      const setCurrentTime = t => {
        currentTime.value = t;
      };
      const changeMini = type => {
        barType.value = type;
      };
      // 下发当前音频时间戳
      provide('currentTime', currentTime);
      return {
        barType,
        audioRef,
        changeMini,
        setCurrentTime,
        playSongStates,
        playAudioMode,
        setVolumeHandler,
        setAudioProgress,
        setvolumeProgress,
      };
    },
  };
</script>
<style scoped lang="less">
  .fade-bar-enter-active,
  .fade-bar-leave-active,
  .fade-mini-enter-active,
  .fade-mini-leave-active {
    transition: all 0.3s ease;
  }

  .fade-bar-enter-from,
  .fade-bar-leave-to,
  .fade-mini-enter-from,
  .fade-mini-leave-to {
    opacity: 0;
  }
</style>
