<template>
  <div v-if="curSongInfo" :class="['play-bar', lockName]" @mouseenter="enterBar($event)" @mouseleave="leaveBar($event)">
    <!-- 固定播放条按钮 -->
    <!-- 
      <div class="fold">
        <div class="fold-btn" @click="lockBar">
          <i class="iconfont icon-lock" :class="[locked ? 'active' : '']"></i>
        </div>
      </div> 
    -->
    <!-- 播放进度条 -->
    <ProgressLine class="audioProgress" :progressWidth="audioProgressWidth" @set-progress-line="setAudioProgress" />
    <div class="wrapper">
      <div class="play-bar-inside">
        <div class="bar-l">
          <!-- <router-link :to="{ path: '/music/song', query: { id: curSongInfo.id } }"> -->
          <el-image :src="curSongInfo.album.picUrl" class="bar-cover-img">
            <template #placeholder>
              <div class="image-slot"> <i class="iconfont icon-placeholder"></i></div>
            </template>
          </el-image>
          <!-- </router-link> -->
          <div class="bar-name">
            <a class="song_name"> {{ curSongInfo.name }}</a>
            <!-- <router-link :to="{ path: '/music/song', query: { id: curSongInfo.id } }" ></router-link> -->
            <p>
              <a v-for="(author, k) in curSongInfo.singer" :key="author.name" class="song_author">
                {{ k !== 0 ? ' / ' + author.name : author.name }}
              </a>
              <!-- <router-link :to="{ path: '/music/singer', query: { id: author.id } }" class="song_author"> </router-link> -->
            </p>
          </div>
          <div class="bar-time">
            <span>{{ $utils.formatSongTime(currentTime * 1000) }}</span> / {{ curSongInfo.duration }}
          </div>
        </div>
        <div class="bar-m">
          <div class="bar-control">
            <i class="iconfont icon-audio-prev" title="上一首" @click.stop="audioHandler('prev')"></i>
            <i :class="['iconfont', playIcon]" @click.stop="audioHandler('play')"></i>
            <i class="iconfont icon-audio-next" title="下一首" @click.stop="audioHandler('next')"></i>
          </div>
        </div>
        <div class="bar-r">
          <div class="bar-oper">
            <div class="volume-main">
              <i :class="['iconfont', mutedIcon]" title="音量" @click.stop="volumeHandler"></i>
              <ProgressLine class="volumeLine" :progressWidth="volumeProgressWidth" @set-progress-line="setvolumeProgress" />
            </div>
            <!-- 播放模式 -->
            <i class="iconfont" :class="modeIcon.className" :title="modeIcon.title" @click.stop="changePlayMode"></i>
            <div class="popver">
              <div class="lyric">
                <span :class="['lyric-btn', isDesktop ? 'lyric-btn-active' : null]" title="歌词" @click="openDeskTop">词</span>
              </div>
              <el-popover placement="top" :width="0" trigger="click">
                <template #reference>
                  <div class="lyric" style="margin: 0">
                    <span class="lyric-btn" title="歌词"></span>
                  </div>
                </template>
                <!-- <div class="lyrics-container">
                  <h3 class="lyrics-header">
                    <span>歌词</span>
                    <i class="iconfont icon-closed" @click="popverClose"></i>
                  </h3> -->
                <Lyrics :sId="curSongInfo.id" :currentTime="currentTime" />
                <!-- </div> -->
              </el-popover>
              <el-popover placement="top" :width="550" trigger="click" @hide="popverClose">
                <template #reference>
                  <div class="playlist" @click="popverHandle">
                    <span v-if="isShowPlayListTips" class="tips">已添加到播放列表</span>
                    <i class="iconfont icon-playsong" title="播放列表"></i>
                    <div class="playlist-num">{{ 99 > playList.length ? playList.length : '99+' }}</div>
                  </div>
                </template>
                <div class="playlist-container">
                  <h3 class="playlist-header">
                    <span
                      >播放列表<em>(共{{ playList.length }}首)</em></span
                    >
                    <div class="delSonglist" @click="clearSonglist"
                      ><i class="iconfont icon-del" title="清空列表"></i>清空列表</div
                    >
                  </h3>
                  <SongList :songList="playList" :isScroll="true" :height="400" :typeSize="'mini'" :isShowTips="false" />
                </div>
              </el-popover>

              <i class="iconfont icon-pip" :class="[isPip ? 'active' : '']" @click="picInpic"></i>
              <i class="iconfont icon-m" @click="changeMini"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProgressLine from '/@/components/ProgressLine.vue';
  import Lyrics from '/@/components/Lyrics.vue';
  import SongList from '/@/components/SongList.vue';
  import { computed, getCurrentInstance, inject, onBeforeUnmount, onMounted, reactive, toRefs } from 'vue';
  import useSongStore from '/@/store/modules/song';
  export default {
    name: 'Bar',
    components: {
      ProgressLine,
      Lyrics,
      SongList,
    },
    setup(props, { emit }) {
      const songStore = useSongStore();
      const {
        appContext: { config },
      } = getCurrentInstance();
      const info = reactive({
        // 歌词弹窗时，固定播放条
        isLock: false,
        locked: false,
        lockName: 'active',
        manual: true,
        currentTime: inject('currentTime'), // 音频当前时长
        isMuted: false, // 是否禁音
        playMode: 0, // 播放模式  0循环播放、1单曲循环、2随机播放
        volumeNum: 1, // 音量值(0~1)
        oldVolume: 0, // 取消禁音的时候，设置保留的上一次的音量值
        isPip: false,
        timer: null,
        tipsTimer: null,
      });

      // 获取播放列表
      const isDesktop = computed(() => songStore.getIsDesktop);
      const playIndex = computed(() => songStore.getPlayIndex);
      const playList = computed(() => songStore.getPlayList);
      const isPlayed = computed(() => songStore.getIsPlayed);
      // 获取当前播放歌曲信息
      const curSongInfo = computed(() => playList.value[playIndex.value]);
      // 播放模式
      const modeIcon = computed(() => {
        const params = [
          {
            className: 'icon-loop',
            title: '循环模式',
          },
          {
            className: 'icon-single-cycle',
            title: '单曲循环',
          },
          {
            className: 'icon-shuffle',
            title: '随机播放',
          },
        ];
        return params[info.playMode];
      });
      // 添加歌曲到播放列表后，弹窗tips提示
      const isShowPlayListTips = computed(() => songStore.getIsShowPlayListTips);
      // 音频播放进度条 音频进度条长度
      const audioProgressWidth = computed(
        () => (info['currentTime'] / config.globalProperties.$utils.formatSongSecond(curSongInfo.value.duration)) * 100 + '%',
      );
      // 设置音频音量进度条
      const volumeProgressWidth = computed(() => (info['volumeNum'] / 1) * 100 + '%');
      watch(
        () => songStore.getIsShowPlayListTips,
        n => {
          if (n) {
            clearTimeout(info.tipsTimer);
            info.tipsTimer = setTimeout(() => {
              songStore.setIsShowPlayListTips(false);
            }, 3000);
          }
        },
      );
      // 切换播放模式
      const changePlayMode = () => {
        info['playMode'] = info['playMode'] >= 2 ? 0 : info['playMode'] + 1;
        emit('playAudioMode', info['playMode']);
      };
      // 音量禁音及取消操作
      const volumeHandler = () => {
        info['isMuted'] = info['isMuted'] ? 0 : 1;
        info['isMuted'] && (info['oldVolume'] = info['volumeNum']);
        info['volumeNum'] = info['isMuted'] ? 0 : info['oldVolume'];
        emit('setVolumeHandler', info['isMuted']);
      };
      // 点击拖拽音量条，设置当前音量
      const setvolumeProgress = params => {
        info['volumeNum'] = params.val;
        info['oldVolume'] = params.val;
        info['isMuted'] = params.val ? 0 : 1;
        emit('setvolumeProgress', params.val);
      };
      // 播放暂停按钮
      const playIcon = computed(() => {
        return !isPlayed.value ? 'icon-audio-play' : 'icon-audio-pause';
      });
      // 是否静音
      const mutedIcon = computed(() => {
        return info['isMuted'] ? 'icon-volume-active' : 'icon-volume';
      });
      // 画中画
      const canvas = document.createElement('canvas');
      canvas.width = 250;
      canvas.height = 250;
      const video = document.createElement('video');
      video.srcObject = canvas.captureStream();
      video.muted = true;
      const showPictureInPictureWindow = async () => {
        const image = new Image();
        image.crossOrigin = true;
        image.src = [...navigator.mediaSession.metadata.artwork].pop().src;
        await image.decode();
        canvas.getContext('2d').drawImage(image, 0, 0, 250, 250);
        await video.play();
        await video.requestPictureInPicture();
      };
      // 切换画中画里音频相关信息
      const changePipSong = () => {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: curSongInfo.value.name,
          artist: curSongInfo.value.singer[0].name,
          album: curSongInfo.value.album.name,
          artwork: [{ src: curSongInfo.value.album.picUrl }],
        });

        if (info['isPip']) {
          showPictureInPictureWindow();
        } else {
          document.exitPictureInPicture();
        }
      };
      // 音频播放/暂停/上一首/下一首事件
      const audioHandler = type => {
        emit('audioHandler', type);
        if (info['isPip']) changePipSong();
      };

      // 点击拖拽进度条，设置当前时间
      const setAudioProgress = params => {
        info['initAudioReady'] = false;
        info['currentTime'] = params.val * config.globalProperties.$utils.formatSongSecond(curSongInfo.value.duration);

        // 拖拽的时候，不实时更改音频的时间
        if (params.flag) {
          emit('setAudioProgress', info['currentTime']);
        }
      };
      const changeMini = () => emit('changeMini', 'MiniBar');
      const leaveBar = () => {
        // 点击锁住按钮，会触发mouseleave 事件 此时的e的值是 undefined  而正常通过鼠标移出的时候 e是个对象
        // if (!e) return
        if (!info['isLock'] && !info['locked']) {
          clearTimeout(info.timer);
          info.timer = setTimeout(() => {
            info.lockName = info.isLock ? 'active' : '';
          }, 3000);
        }
      };
      const openDeskTop = () => {
        songStore.setIsDesktop(!isDesktop.value);
        window.ElectronAPI.setDesktopLyricDialog(isDesktop.value);
      };
      const popverHandle = () => (info['isLock'] = true);
      const popverClose = () => {
        info['isLock'] = false;
        leaveBar();
      };

      const enterBar = () => {
        clearTimeout(info.timer);
        info.lockName = 'active';
      };

      const lockBar = () => {
        info.locked = !info.locked;
        info.isLock = info.locked;
        leaveBar();
      };

      // 清空播放列表
      const clearSonglist = () => {
        songStore.setPalyList([]);
        songStore.setPlayStatus(false);
        songStore.setPalyIndex(0);
        songStore.setIsDesktop(false);
        window.ElectronAPI.setDesktopLyricDialog(false);
      };

      const picInpic = () => {
        info['isPip'] = !info['isPip'];
        changePipSong();
      };

      const actionHandlers = [
        ['play', 'play'],
        ['pause', 'play'],
        ['previoustrack', 'prev'],
        ['nexttrack', 'next'],
      ];

      for (const [action, type] of actionHandlers) {
        navigator.mediaSession.setActionHandler(action, () => {
          audioHandler(type);
          changePipSong();
          if (action === 'play') {
            navigator.mediaSession.playbackState = 'playing';
          } else if (action === 'pause') {
            navigator.mediaSession.playbackState = 'paused';
          }
        });
      }

      // 退出画中画
      video.addEventListener(
        'leavepictureinpicture',
        () => {
          info['isPip'] = false;
        },
        false,
      );
      onBeforeUnmount(() => {
        clearTimeout(info.timer);
        clearTimeout(info.tipsTimer);
      });
      onMounted(() => {
        leaveBar();
        songStore.setPalyList(playList.value);
      });
      return {
        leaveBar,
        enterBar,
        lockBar,
        ...toRefs(info),
        openDeskTop,
        isDesktop,
        playList,
        isShowPlayListTips,
        curSongInfo,
        modeIcon,
        playIcon,
        mutedIcon,
        audioHandler,
        volumeHandler,
        audioProgressWidth,
        changePlayMode,
        popverClose,
        popverHandle,
        clearSonglist,
        setAudioProgress,
        volumeProgressWidth,
        setvolumeProgress,
        picInpic,
        changeMini,
      };
    },
  };
</script>
<style scoped lang="less">
  .play-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 70px;
    background: #fff;
    box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
    transition: all 0.4s ease-out;
    // transform: translateY(100%);

    // &.active {
    //   transform: translateY(0);
    // }
  }
  .fold {
    position: absolute;
    top: -30px;
    left: 0;
    z-index: 3;
    width: 100%;
    height: 30px;

    .fold-btn {
      position: absolute;
      right: 200px;
      display: inline-block;
      width: 60px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50px 50px 0px 0px;
      background: #fff;
      box-shadow: 0 5px 40px -1px rgba(2, 10, 18, 0.1);
      cursor: pointer;

      .active {
        color: @--color-text-height;
      }
    }
  }
  .audioProgress {
    position: absolute;
    top: -6px;
    z-index: 9;
  }
  .wrapper {
    max-width: 1300px;
    margin: 0 auto;
  }
  .play-bar-inside {
    display: flex;
    font-size: 0;
    line-height: 0;
    justify-content: space-between;
    align-items: center;

    .bar-l {
      display: flex;
      // width: 600px;
      align-items: center;
      justify-content: center;
    }

    .bar-cover-img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
      box-shadow: 0 0 15px 5px rgba(@--color-text-height, 0.15);
    }

    .bar-name {
      flex: 1;
      font-size: 0;
      padding: 0 10px 6px 30px;
      overflow: hidden;

      .song_name {
        display: block;
        padding-bottom: 20px;
        line-height: 12px;
        font-size: 12px;
        font-weight: bold;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }

      p {
        line-height: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .song_author {
        line-height: 12px;
        font-size: 12px;
        color: #999;
      }
    }

    .icon-collect,
    .icon-collect-active {
      font-size: 24px;
      line-height: 24px;
      margin: 0 15px;
      cursor: pointer;
    }

    .bar-time {
      width: 115px;
      line-height: 50px;
      font-size: 14px;
      color: #606266;
      text-align: center;
    }

    .bar-control {
      display: flex;
      padding: 10px 0;
      line-height: 1;
      align-items: center;
      justify-content: center;

      .iconfont {
        margin: 0 20px;
        font-size: 30px;
        cursor: pointer;
        color: #666;
      }

      .icon-audio-play,
      .icon-audio-pause {
        font-size: 50px;
        font-weight: bold;
        color: @--color-text-height;
      }
    }

    .volumeLine {
      width: 150px;
      margin: 0 10px;
    }

    .bar-oper {
      position: relative;
      display: flex;
      font-size: 0;
      line-height: 50px;
      padding-left: 30px;
      align-items: center;
      justify-content: center;

      .iconfont {
        margin-left: 20px;
        font-size: 20px;
        cursor: pointer;
      }
    }

    .popver {
      position: relative;
    }

    .lyric {
      display: inline-block;
      padding: 26px 0;
      margin-left: 15px;
      font-size: 18px;
      line-height: 18px;
      vertical-align: top;
      color: #999;
      cursor: pointer;
      .lyric-btn-active {
        color: #ff641e;
      }
    }

    .playlist {
      position: relative;
      display: inline-block;
      margin-left: 15px;
      line-height: 70px;
      height: 70px;
      color: #999;
      cursor: pointer;

      .iconfont {
        margin-left: 0;
      }

      .playlist-num {
        position: absolute;
        top: 25%;
        left: 90%;
        font-size: 12px;
        line-height: 12px;
        color: #999;
      }

      .tips {
        position: absolute;
        top: -50px;
        left: -60px;
        background: rgba(0, 0, 0, 0.8);
        display: inline-block;
        width: 120px;
        color: #fff;
        font-size: 12px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        padding: 5px 0;
        border-radius: 4px;

        &::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 47%;
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 6px 8px 0 8px;
          border-color: rgba(0, 0, 0, 0.8) transparent transparent transparent;
        }
      }
    }
    .volume-main {
      flex: 1;
      padding: 10px 0;
      display: flex;
      align-items: center;
    }
  }

  .playlist-header {
    display: flex;
    line-height: 40px;

    span {
      display: inline-block;
      flex: 1;
    }

    em {
      display: inline-block;
      padding-left: 10px;
      font-size: 12px;
      line-height: 14px;
      font-style: normal;
      font-weight: normal;
      color: #666;
      vertical-align: baseline;
    }

    .delSonglist {
      font-size: 14px;
      font-weight: normal;
      cursor: pointer;
    }

    .icon-del {
      margin-right: 5px;
      font-size: 16px;
      color: #333;
    }
  }
  .lyrics-container {
    height: 430px;
    background: #fff;

    .lyrics-header {
      display: flex;
      padding: 0 0 24px;
      line-height: 16px;
      font-weight: 500;
      font-size: 16px;

      span {
        display: block;
        flex: 1;
      }

      .icon-closed {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .playlist-container {
    // position: absolute;
    // left: -250px;
    // bottom: 75px;
    // width: 500px;
    // padding: 20px;
    // border: 1px solid #EBEEF5;
    // border-radius: 4px 4px 0 0;
    font-size: 14px;
    // box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    background: #fff;
  }

  .icon-pip {
    &.active {
      color: @--color-text-height;
    }
  }
</style>
