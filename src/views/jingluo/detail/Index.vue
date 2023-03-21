<!-- eslint-disable vue/no-v-html -->
<template>
  <div class="detail">
    <div class="detail-container">
      <div class="detail-main">
        <div class="cover">
          <div class="cover-img">
            <el-image :src="details.coverImgUrl">
              <template #placeholder>
                <div class="image-slot">
                  <i class="iconfont icon-placeholder"></i>
                </div>
              </template>
            </el-image>
          </div>
          <div class="cover-info">
            <div class="cover-header">
              <div class="cover-title">
                {{ details.name }}
              </div>
              <div class="cover-collect-author">
                <router-link
                  v-for="item in collects"
                  :key="item.userId"
                  class="collect-author"
                  :to="{ path: '/music/singer', query: { id: item.userId } }">
                  <el-image :src="item.avatarUrl">
                    <template #placeholder>
                      <div class="image-slot">
                        <i class="iconfont icon-placeholder"></i>
                      </div>
                    </template>
                  </el-image>
                </router-link>
              </div>
            </div>
            <div class="cover-author-tags">
              <div v-if="details.creator" class="cover-author">
                <el-image :src="details.creator.avatarUrl" class="cover-avatar">
                  <template #placeholder>
                    <div class="image-slot">
                      <i class="iconfont icon-placeholder"></i>
                    </div>
                  </template>
                </el-image>
                <div class="cover-name">{{ details.creator.nickname }}</div>
                <div class="cover-date">{{ $utils.formartDate(details.createTime, 'yyyy-MM-dd') }}</div>
              </div>
              <div v-if="details.tags" class="cover-tags">
                <router-link
                  v-for="(tag, index) in details.tags"
                  :key="index"
                  :to="{ path: '/music/playlist', query: { cat: tag } }"
                  class="tag"
                  >#{{ tag }}</router-link
                >
              </div>
            </div>
            <div class="cover-digital">
              <span class="cover-playCount"
                ><i class="iconfont icon-playnum"></i> {{ $utils.formartNum(details.playCount) }}次</span
              >
              <span class="cover-collect"
                ><i class="iconfont icon-collect"></i> {{ $utils.formartNum(details.subscribedCount) }}</span
              >
              <span class="cover-comment"
                ><i class="iconfont icon-comment"></i> {{ $utils.formartNum(details.commentCount) }}</span
              >
            </div>
            <div class="cover-desc">
              <h5
                >歌单简介<em v-if="isShowDesc" class="desc-close" @click="isShowDesc = false"
                  ><i class="iconfont icon-closed"></i></em
              ></h5>
              <p @click="showAllDesc" v-html="details.description"></p>
              <pre v-if="isShowDesc" class="cover-desc-all">{{ details.description }}】</pre>
            </div>
          </div>
        </div>
        <div class="song-main">
          <div class="song-header">
            <h4
              >歌曲列表 <em>{{ total + '首歌' }}</em></h4
            >
            <span class="play-all" @click="playAllSongs"><i class="iconfont icon-audio-play"></i> 播放全部</span>
            <span :class="['collect', details.subscribed ? 'active' : '']" @click="subPlayList(details)"
              ><i :class="['iconfont', 'icon-collect' + (details.subscribed ? '-active' : '')]"></i>
              {{ details.subscribed ? '已收藏' : '收藏' }}</span
            >
          </div>
          <template v-if="isLoading">
            <Loading />
          </template>
          <template v-else>
            <SongList :songList="songList" :stripe="true" />
            <div v-if="!isLogin" class="showAllSongsTips">
              <span @click="loginDialog">登录后查看全部歌曲</span>
            </div>
          </template>
        </div>
      </div>
      <div class="aside-box">
        <div v-if="playlists.length" class="playlist-recom">
          <h3 class="aside-title">相关歌单推荐</h3>
          <div class="aside-main recom-main">
            <router-link
              v-for="item in playlists"
              :key="item.id"
              class="recom-item"
              :to="{ path: '/music/detail', query: { id: item.id } }">
              <el-image :src="item.coverImgUrl">
                <template #placeholder>
                  <div class="image-slot">
                    <i class="iconfont icon-placeholder"></i>
                  </div>
                </template>
              </el-image>
              <div class="recom-info">
                <div class="recom-name">{{ item.name }}</div>
                <div class="recom-author">
                  By.
                  <router-link :to="{ path: '/music/user', query: { id: item.creator.userId } }">{{
                    item.creator.nickname
                  }}</router-link>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-if="comments.length" class="playlist-comment">
          <h3 class="aside-title">歌单评论</h3>
          <div class="aside-main comment-main">
            <div v-for="item in comments" :key="item.commentId" class="comment-item">
              <router-link :to="{ path: '/music/user', query: { id: item.commentId } }">
                <el-image :src="item.user.avatarUrl">
                  <template #placeholder>
                    <div class="image-slot">
                      <i class="iconfont icon-placeholder"></i>
                    </div>
                  </template>
                </el-image>
              </router-link>
              <div class="comment-info">
                <div class="comment-userInfo"
                  ><router-link :to="{ path: '/music/user', query: { id: item.commentId } }" class="comment-name">{{
                    item.user.nickname
                  }}</router-link
                  ><span class="comment-date">{{ $utils.formatMsgTime(item.time) }}</span></div
                >
                <div class="comment-desc">{{ item.content }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useDetail from '/@/hook/detail/useDetail';
  let Loading = createAsyncComponent(() => import('/@/components/IconLoading.vue'));
  let SongList = createAsyncComponent(() => import('/@/components/SongList.vue'));
  const {
    details,
    isShowDesc,
    songList,
    collects,
    playlists,
    comments,
    total,
    isLoading,
    playAllSongs,
    subPlayList,
    isLogin,
    loginDialog,
    showAllDesc,
  } = useDetail();
</script>
<style lang="less" scoped>
  .detail-container {
    display: flex;
    padding: 40px 0 0 0;
  }
  .detail-main {
    flex: 1;
    padding-bottom: 45px;
  }
  .aside-box {
    .playlist-recom,
    .playlist-comment {
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
  }

  .cover {
    display: flex;
  }
  .cover-img {
    display: flex;
    align-items: center;
    width: 250px;
    height: 250px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
    flex-shrink: 0;

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      content: '';
      transform: scale(0.95) translateX(5%);
      background: #f0f0f0;
    }
  }

  .cover-info {
    flex: 1;
    padding: 20px;
    margin-left: 20px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

    .cover-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .cover-title {
      flex: 1;
      font-size: 24px;
      font-weight: bold;
      height: 34px;
      line-height: 34px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-all;
    }

    .cover-collect-author {
      width: 200px;
      text-align: right;
    }

    .collect-author {
      position: relative;
      display: inline-block;
      width: 25px;
      height: 25px;
      border-radius: 100%;
      overflow: hidden;
      margin: 3px 0 0 -15px;
      border: 1px solid #fff;
      vertical-align: top;

      &:hover {
        z-index: 1;
        border: 1px solid @--color-text-height;
      }
    }
  }
  .cover-author-tags {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .cover-author {
    padding: 15px 0 10px;

    .cover-avatar {
      display: inline-block;
      width: 32px;
      height: 32px;
      border-radius: 100%;
      vertical-align: top;
    }

    .cover-name,
    .cover-date {
      display: inline-block;
      padding: 0 10px;
      line-height: 32px;
    }

    .cover-date {
      color: @--color-text;
    }
  }
  .cover-tags {
    .tag {
      display: inline-block;
      margin-right: 5px;
      font-size: 12px;
      color: @--color-text-height;
    }
  }
  .cover-playCount,
  .cover-collect,
  .cover-comment {
    display: inline-block;
    padding: 0 20px 5px 0;
    line-height: 16px;
    font-size: 14px;
    color: @--color-text;

    i {
      vertical-align: top;
    }
  }
  .cover-desc {
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
      line-height: 22px;
      font-size: 14px;
      color: @--color-text;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      word-break: break-all;
      cursor: pointer;
    }

    .cover-desc-all {
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
      color: @--color-text;
      background: #fff;
      overflow-y: scroll;
      box-shadow: 0 2px 10px 0 rgba(52, 52, 52, 0.1);
    }
  }

  .song-header {
    display: flex;
    padding: 30px 0 10px;

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
  .showAllSongsTips {
    text-align: center;
    padding: 40px 0;

    span {
      display: inline-block;
      display: flex;
      line-height: 16px;
      align-items: center;
      justify-content: center;
      border-radius: 50px;
      padding: 7px 20px;
      color: #fff;
      background: @--color-text-height;
      cursor: pointer;
    }
  }

  .song-main {
    position: relative;
    padding: 0 20px;
    margin-top: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgba(0, 0, 0, 0.05);
  }
  .recom-main {
    .el-image {
      width: 60px;
      height: 60px;
      border-radius: 4px;
      overflow: hidden;
    }

    .recom-item {
      display: flex;
      padding: 10px 0;
    }

    .recom-info {
      flex: 1;
      padding-left: 10px;
    }

    .recom-name {
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

    .recom-author {
      height: 20px;
      line-height: 20px;
      margin-top: 20px;
      font-size: 12px;
      color: @--color-text;

      a {
        color: #666;
      }
    }
  }

  .comment-main {
    font-size: 0;

    .el-image {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      overflow: hidden;
    }

    .comment-item {
      display: flex;
      padding: 10px 0;
    }

    .comment-info {
      flex: 1;
      padding-left: 10px;
    }

    .comment-userInfo {
      width: 100%;
      font-size: 0;
    }

    .comment-name {
      font-size: 14px;
      line-height: 14px;
      font-weight: bold;
    }

    .comment-desc {
      font-size: 12px;
      color: #666;
      line-height: 1.6;
      padding: 5px 10px;
      background: #f5f5f5;
      margin: 5px 0;
      border-radius: 3px;
    }

    .comment-date {
      display: inline-block;
      padding-left: 5px;
      font-size: 12px;
      color: #666;
    }
  }
</style>
