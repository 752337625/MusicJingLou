<template>
  <div v-if="videoOptions.src" class="mv-detail">
    <div class="mv-main">
      <div class="mv-info-hd">
        <div class="info-name"><i class="iconfont icon-mv"></i>{{ mvDetail.name }}</div>
        <router-link
          v-for="(author, k) in mvDetail.artists"
          :key="author.name"
          :to="{ path: '/singer', query: { id: author.id } }"
          class="song-author"
          >{{ k !== 0 ? ' / ' + author.name : author.name }}</router-link
        >
      </div>
      <div class="video-main">
        <videoPlay width="100%" height="100%" :poster="videoOptions.poster" :src="videoOptions.src" />
      </div>
      <div class="mv-comment">
        <CommentList :type="type" :sId="mId" />
      </div>
    </div>
    <div class="aside-box">
      <div class="mv-info">
        <h3 class="aside-title">MV简介</h3>
        <div class="mv-info-count">
          <div class="info-time">发布时间：{{ mvDetail.publishTime }}</div>
          <div class="info-count">播放量：{{ $utils.formartNum(mvDetail.playCount) }}</div>
        </div>
        <div class="mv-desc">
          {{ mvDetail.desc ? mvDetail.desc : '暂无简介' }}
        </div>
      </div>
      <div class="simi-mv">
        <h3 class="aside-title">相似MV</h3>
        <div class="aside-main mv-main">
          <div v-for="(item, index) in simiMv" :key="'' + item.id + index" class="item">
            <router-link :to="{ path: '/music/mv', query: { id: item.id } }" class="faceImg">
              <i class="iconfont icon-play"></i>
              <el-image :src="item.cover || item.imgurl">
                <div slot="placeholder" class="image-slot">
                  <i class="iconfont icon-placeholder"></i>
                </div>
              </el-image>
            </router-link>
            <div class="info">
              <router-link :to="{ path: '/music/mv', query: { id: item.id } }" class="mv-name">{{ item.name }}</router-link>
              <router-link
                v-if="!item.publishTime"
                :to="{ path: '/music/singer', query: { id: item.artistId } }"
                class="mv-author"
                >{{ item.artistName }}</router-link
              >
              <div class="mv-playCount"><i class="iconfont icon-mvlist"></i> {{ $utils.formartNum(item.playCount) }}</div>
              <div v-if="item.publishTime" class="mv-time">发布时间：{{ item.publishTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import 'vue3-video-play/dist/style.css';
  import { videoPlay } from 'vue3-video-play';
  import useMvPlay from '/@/hook/mv/useMvPlay';
  let CommentList = createAsyncComponent(() => import('/@/components/Comments.vue'));
  let {
    mId,
    mvDetail,
    type, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    videoOptions,
    simiMv,
  } = useMvPlay();
</script>
<style scoped lang="less">
  .mv-detail {
    display: flex;
    padding-top: 40px;

    .mv-main {
      flex: 1;
    }
  }

  .mv-info-hd {
    display: flex;
    padding: 0 0 20px 0;

    .info-name {
      padding-right: 20px;
      font-size: 24px;
      line-height: 24px;

      .icon-mv {
        margin-right: 5px;
        vertical-align: top;
        color: @--color-text-height;
      }
    }
    .song-author {
      line-height: 24px;
      color: #666;
    }
  }
  .video-main {
    position: relative;
    height: 500px;
    font-size: 0;
  }

  .mv-info {
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
  .aside-title {
    position: relative;
    font-size: 16px;
    line-height: 24px;

    &::before {
      content: '';
      display: inline-block;
      width: 4px;
      height: 18px;
      margin: 3px 5px 0 0;
      border-radius: 2px;
      background: @--color-text-height;
      vertical-align: top;
    }
  }

  .mv-info-count {
    padding: 10px 0;
    font-size: 12px;
    color: @--color-text;
  }

  .simi-mv {
    .aside-title {
      padding: 20px;
      margin-bottom: 5px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
    }

    .item {
      padding: 20px;
      margin-bottom: 10px;
      background: #fff;
      border-radius: 12px;
      box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

      &:hover {
        .el-image {
          transform: scale(1.1);
        }

        .icon-play {
          opacity: 1;
          transform: scale(1);
        }
      }
    }

    .faceImg {
      display: block;
      position: relative;
      border-radius: 6px;
      overflow: hidden;
    }

    .icon-play {
      position: absolute;
      top: 50%;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 3;
      margin-top: -30px;
      font-size: 60px;
      text-align: center;
      color: #fff;
      opacity: 0;
      transform: scale(0.5);
      transition: all 0.4s linear;
      text-shadow: 2px 2px 10px #000;
    }

    .el-image {
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      z-index: 2;
      transition: all 0.4s linear;

      :deep(img) {
        height: auto;
      }
    }

    .info {
      position: relative;
      padding: 15px 0 0;

      .mv-name {
        display: block;
        font-size: 14px;
      }

      .mv-author,
      .mv-playCount,
      .mv-time {
        display: block;
        line-height: 24px;
        font-size: 14px;
        color: #999;
      }

      .icon-video {
        font-size: 24px;
        color: #999;
        vertical-align: top;
      }
    }
  }
</style>
