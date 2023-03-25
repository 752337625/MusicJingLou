<script lang="ts" setup>
  import { getLyric } from '/@/api/main';
  import { computed, onMounted, watch, withDefaults } from 'vue';
  import useLyricsStore from '/@/store/modules/lyrics';
  const props = withDefaults(
    defineProps<{
      sId: number | string;
      currentTime: number;
      maxH?: number | string;
    }>(),
    {
      sId: 0,
      currentTime: 0,
      maxH: 390,
    },
  );
  const lyricsStore = useLyricsStore();
  const lyric = computed(() => lyricsStore.getlyric);
  const lyricObj = computed(() => lyricsStore.getLyricObj);
  const curIndex = computed(() => lyricsStore.getCurIndex);
  const isCurLyric = computed(() => {
    return index => {
      return index === curIndex.value && props['currentTime'] ? 'active' : '';
    };
  });
  // 歌词实时滚动
  const transform = computed(() => {
    if (curIndex.value > 6) {
      return `transform: translateY(-${30 * (curIndex.value - 6)}px)`;
    } else {
      return 'transform: translateY(0)';
    }
  });
  const formartLyric = lrc => {
    const lrcReg = /^\[(\d{2}):(\d{2}.\d{2,})\]\s*(.+)$/;
    if (!lrc.lyric) return lyricsStore.setLyric(true);
    const lyricLis = lrc.lyric.split('\n');
    lyricsStore.setLyric(lrc.lyric);
    let a = lyricLis
      .map(item => {
        const arr = lrcReg.exec(item) as any;
        if (!arr) return;
        return { t: arr[1] * 60 * 1 + arr[2] * 1, txt: arr[3] };
      })
      .filter(i => i)
      .sort((a, b) => a.t - b.t);
    lyricsStore.setLyricObj(a);
  };
  const getLyrics = async id => {
    const { code, lrc } = await getLyric({ id: id });
    if (code !== 200) return ElMessage.error('数据请求失败');
    formartLyric(lrc);
  };

  const findCurIndex = t => {
    for (let i = 0; i < lyricObj.value.length; i++) {
      if (t <= lyricObj.value[i].t) return i;
    }
    return lyricObj.value.length;
  };
  // 页面歌词可以展开查看更多
  onMounted(() => getLyrics(props.sId));
  watch(
    () => props.sId,
    newVal => {
      lyricsStore.setLyric(null);
      lyricsStore.setLyricObj([]);
      lyricsStore.setCurIndex(0);
      getLyrics(newVal);
    },
  );

  watch(
    () => props.currentTime,
    newVal => {
      // 无歌词的时候 不做动画滚动
      if (!lyricObj.value.length) return;
      lyricsStore.setCurIndex(findCurIndex(newVal) - 1);
    },
  );
</script>
<template>
  <div>
    <div class="lyrics-main" :style="{ maxHeight: maxH + 'px' }">
      <div v-if="lyricObj.length" ref="lyrics" class="lyrics" :style="transform">
        <p v-for="(item, index) in lyricObj" :key="index" :class="[isCurLyric(index)]">{{ item.txt }}</p>
      </div>
      <div v-else class="lyric-empty">
        <p v-if="lyric">纯音乐，无歌词</p>
        <p v-else>歌词加载中......</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="less">
  .lyrics-main {
    height: 100%;
    overflow-y: auto;
    transition: all 1.5s ease-in-out;
  }

  .lyrics {
    font-size: 0;
    transform: translateY(0);
    transition: transform 1.5s ease-in-out;

    :deep(p) {
      margin: 0;
      line-height: 30px;
      font-size: 14px;
      font-weight: 300;

      &.active {
        color: @--color-text-height;
      }
    }
  }
  .lyric-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 100px;
    font-size: 14px;
    color: @--color-text-height;

    ~ .more-lyric {
      display: none;
    }
  }
  .page-lyrics {
    color: #666;
    overflow: hidden;

    .lyric-empty {
      justify-content: left;
    }

    &.fullLyrics {
      max-height: none;
    }
  }

  .lyric-more span {
    display: inline-block;
    line-height: 30px;
    cursor: pointer;
    color: @--color-text-height;
  }
</style>
