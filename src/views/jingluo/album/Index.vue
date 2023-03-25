<template>
  <div v-if="details" class="album">
    <div class="detail-container">
      <div class="detail-main">
        <div class="album-cover">
          <div class="album-img">
            <el-image :src="details.picUrl" :lazy="true">
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-placeholder"></i>
                </div>
              </template>
            </el-image>
          </div>
          <div class="album-info">
            <div class="album-title">
              {{ details.name }}
              <span>{{ '#' + details.type }}</span>
            </div>
            <div class="album-singer"
              >歌手：<router-link
                v-for="(author, k) in details.artists"
                :key="author.name"
                :to="{ path: '/layouts/music/singer', query: { id: author.id } }"
                class="song_name"
                >{{ k !== 0 ? ' / ' + author.name : author.name }}</router-link
              ></div
            >
            <div class="album-time">发行时间：{{ $utils.formartDate(details.publishTime, 'yyyy-MM-dd') }}</div>
            <div class="album-company">发行公司：{{ details.company }}</div>
            <div v-if="details.description" class="album-desc">
              <h5
                >歌单简介<em v-if="isShowDesc" class="desc-close" @click="isShowDesc = false"
                  ><i class="iconfont icon-closed"></i></em
              ></h5>
              <p @click="showAllDesc">{{ details.description }}</p>
              <pre v-if="isShowDesc" class="album-desc-all">
                  {{ details.description }}
              </pre>
            </div>
          </div>
        </div>
        <div class="song-main">
          <div class="song-header">
            <h4>
              包含歌曲列表 <em>{{ details.size + '首歌' }}</em>
            </h4>
            <span class="play-all" @click="playAllSongs"><i class="iconfont icon-audio-play"></i> 播放全部</span>
            <span :class="['collect', dynamic.isSub ? 'active' : '']" @click="subAlbum">
              <i :class="['iconfont', 'icon-collect' + (dynamic.isSub ? '-active' : '')]"></i>
              {{ dynamic.isSub ? '已收藏' : '收藏' }}
            </span>
          </div>
          <SongList :songList="songList" :stripe="true" />
        </div>
        <div ref="comment" class="album-comments">
          <CommentList :type="type" :sId="albumId" />
        </div>
      </div>
      <div class="aside-box">
        <div class="album-aside album-other">
          <h3 class="aside-title">
            {{ name }}的其他专辑
            <router-link :to="{ path: '/layouts/music/singer', query: { id: artistsId, type: 'album' } }" class="album-more">
              全部
            </router-link>
          </h3>
          <div class="aside-main aside-album-main">
            <router-link
              v-for="item in hotAlbums"
              :key="item.id"
              class="aside-album-item"
              :to="{ path: '/layouts/music/album', query: { id: item.id } }">
              <el-image :src="item.picUrl" :lazy="true">
                <template #placeholder>
                  <div class="image-slot">
                    <i class="iconfont icon-placeholder"></i>
                  </div>
                </template>
              </el-image>
              <div class="aside-album-info">
                <div class="aside-album-name">{{ item.name }}</div>
                <div class="aside-album-time">
                  {{ $utils.formartDate(details.publishTime, 'yyyy-MM-dd') }}
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useAlbum from '/@/hook/album/useAlbum';
  let CommentList = createAsyncComponent(() => import('/@/components/Comments.vue'));
  let SongList = createAsyncComponent(() => import('/@/components/SongList.vue'));
  const {
    artistsId,
    name,
    albumId,
    details,
    songList,
    dynamic,
    hotAlbums,
    type,
    isShowDesc,
    showAllDesc,
    playAllSongs,
    subAlbum,
  } = useAlbum();
</script>
<style scoped lang="less">
  .detail-container {
    display: flex;
    padding: 20px 0 0 0;
  }
  .detail-main {
    flex: 1;
    padding-bottom: 45px;
  }
  .aside-box {
    .aside-title {
      position: relative;
      font-size: 16px;
      line-height: 24px;

      .album-more {
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        font-weight: normal;
        font-size: 12px;
        color: #666;
      }

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
  }
  .album-cover {
    display: flex;
  }
  .album-img {
    position: relative;
    width: 260px;
    height: 260px;

    .el-image {
      z-index: 2;
      border-radius: 4px;
    }

    &::after {
      display: inline-block;
      content: '';
      position: absolute;
      top: 0;
      right: -40px;
      width: 100%;
      height: 100%;
      background: url('/@/assets/img/disc.png') no-repeat;
      background-size: contain;
      transition: all 0.4s linear;
    }
  }
  .album-info {
    flex: 1;
    padding: 20px;
    margin-left: 70px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

    .album-title {
      padding-bottom: 20px;
      font-size: 24px;
      font-weight: bold;

      span {
        display: inline-block;
        font-size: 14px;
        font-weight: normal;
        color: @--color-text-height;
      }
    }
    .album-singer,
    .album-time,
    .album-company {
      line-height: 22px;
      font-size: 14px;
      color: #999;
    }

    .album-desc {
      position: relative;

      h5 {
        padding: 30px 0 5px;
        line-height: 20px;
        font-size: 14px;
        color: #333;
      }

      .desc-close {
        position: absolute;
        top: 30px;
        right: 0;
        cursor: pointer;
      }

      p {
        display: -webkit-box;
        line-height: 22px;
        font-size: 14px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-line;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        word-break: break-all;
        cursor: pointer;
      }

      .album-desc-all {
        position: absolute;
        top: 70px;
        left: 10px;
        z-index: 1;
        width: calc(~'100% - 20px');
        padding: 10px;
        margin: -10px;
        max-height: 250px;
        line-height: 22px;
        font-size: 14px;
        white-space: pre-line;
        font-family: inherit;
        color: #999;
        background: #fff;
        overflow-y: scroll;
        box-shadow: 0 2px 10px 0 rgba(52, 52, 52, 0.1);
      }
    }
  }
  .song-main {
    position: relative;
    padding: 20px;
    margin-top: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
  .song-header {
    display: flex;
    padding: 0 0 10px;

    h4 {
      flex: 1;
      font-size: 20px;
      line-height: 40px;

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
    }

    span {
      display: flex;
      line-height: 16px;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      padding: 7px 20px;
      cursor: pointer;
      margin: 5px 0 5px 15px;
      transition: all 0.4s;
      background: #f0f0f0;
      color: #333;

      i {
        margin-right: 3px;
      }
    }

    .play-all {
      color: #fff;
      background: @--color-text-height;

      i {
        color: #fff;
      }
    }

    .collect.active,
    .collect.active i {
      color: @--color-text-height;
    }
  }
  .aside-album-item {
    display: flex;
    padding: 10px 0;

    .el-image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      overflow: hidden;
    }

    .aside-album-info {
      flex: 1;
      padding-left: 10px;
    }

    .aside-album-name {
      width: 100%;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
      cursor: pointer;
    }

    .aside-album-time {
      height: 20px;
      line-height: 20px;
      margin-top: 20px;
      font-size: 12px;
      color: #999;
    }
  }

  .album-aside {
    padding: 20px;
    margin-bottom: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
</style>
