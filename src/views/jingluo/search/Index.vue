<script lang="ts" setup>
  import { createAsyncComponent } from '/@/utils/createAsyncComponent';
  import useSearch from '/@/hook/search/useSearch';
  let SearchArtist = createAsyncComponent(() => import('/@/components/SearchArtist.vue'));
  let Empty = createAsyncComponent(() => import('/@/components/Empty.vue'));
  let MvList = createAsyncComponent(() => import('/@/components/MvList.vue'));
  let PlayList = createAsyncComponent(() => import('/@/components/PlayList.vue'));
  let AlbumList = createAsyncComponent(() => import('/@/components/AlbumList.vue'));
  let SongList = createAsyncComponent(() => import('/@/components/SongList.vue'));
  let {
    keyVal,
    type,
    typeList,
    index,
    total,
    offset,
    limit,
    list,
    currentpage,
    loading,
    listType,
    suggestInfo,
    selectType,
    currentChange,
    remoteMethod,
    handleFocus,
    jumpPage,
    clearVal,
    enterHandler,
  } = useSearch();
</script>
<template>
  <div class="search-detail">
    <div class="search-container">
      <div class="search-hd">
        <el-select
          v-model="keyVal"
          class="search-box"
          size="large"
          clearable
          filterable
          remote
          placeholder="请输入歌名、歌词、歌手或专辑"
          :remote-method="remoteMethod"
          :fit-input-width="true"
          :loading="loading"
          loading-text="搜索中..."
          @focus="handleFocus"
          @clear="clearVal"
          @keyup.enter="enterHandler">
          <el-option-group v-for="info in suggestInfo" :key="listType[info.label]" :label="listType[info.label]">
            <el-option
              v-for="(item, key) in info.info"
              :key="info.label + key"
              :label="item.name"
              :value="info.label + item.name"
              class="item"
              @click="jumpPage(item, info.label)">
              {{ item.name }}
              <template v-if="info.label === 'songs'">
                -
                <span v-for="(a, i) in item.artists" :key="i" class="artists">{{ (i !== 0 ? ' / ' : '') + a.name }}</span>
              </template>
              <template v-else-if="info.label === 'albums'">
                - <span class="artists">{{ item.artist.name }}</span>
              </template>
            </el-option>
          </el-option-group>
        </el-select>
      </div>
      <div class="search-main">
        <h5>
          搜索结果<em v-show="total">({{ total + '' + typeList[index]['t'] }})</em>
        </h5>
        <div class="search-tab">
          <div
            v-for="item in typeList"
            :key="item.k"
            class="tab-item"
            :class="{ active: type == item.k }"
            @click="selectType(item)">
            {{ item.v }}
          </div>
        </div>
        <div v-if="total || loading" class="search-list">
          <template v-if="type == '1'">
            <SongList :songList="list" :stripe="true" :offset="offset" :pageSize="limit" />
          </template>
          <template v-else-if="type == '10'">
            <AlbumList :albumList="list" :loading="loading" :num="limit" class="albums" />
          </template>
          <template v-else-if="type == '100'">
            <SearchArtist :list="list" :loading="loading" />
          </template>
          <template v-else-if="type === '1000'">
            <PlayList :playList="list" :loading="loading" :num="limit" class="play" />
          </template>
          <template v-else-if="type === '1004'">
            <MvList :mvList="list" :loading="loading" :num="limit" />
          </template>
        </div>
        <template v-else>
          <empty />
        </template>
        <div v-show="total > limit" class="pagination">
          <el-pagination
            :current-page="currentpage"
            :page-size="limit"
            layout="prev, pager, next"
            :total="total"
            @current-change="currentChange" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  .search-detail {
    display: flex;
    padding: 40px 0;
    margin-left: -150px;

    .search-container {
      width: 70%;
      margin: 0 auto;
    }
  }

  .search-hd {
    padding: 20px;
    background: #fff;
    border-radius: 12px 12px 0 0;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
  .search-box {
    display: block;
    position: relative;
    width: 50%;
    padding: 30px 0;
    margin: 0 auto;

    // :deep(input) {
    //   height: 50px;
    //   border: 1px solid rgb(217, 217, 217);
    //   border-radius: 4px;
    // }
  }

  .search-main {
    position: relative;
    padding: 20px;
    margin-top: 3px;
    background: #fff;
    border-radius: 0 0 12px 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);

    h5 {
      font-size: 24px;
      line-height: 30px;

      em {
        display: inline-block;
        width: 150px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        padding: 0 10px;
        vertical-align: top;
      }
    }
  }

  .search-tab {
    position: absolute;
    right: -80px;

    .tab-item {
      width: 80px;
      line-height: 14px;
      padding: 15px 0;
      margin-bottom: 15px;
      text-align: center;
      background: #fff;
      border-radius: 0 12px 12px 0;
      box-shadow: 10px 0px 10px rgb(0 0 0 / 5%);
      cursor: pointer;

      &:hover {
        background: #fafafa;
      }

      &.active {
        color: #fff;
        background: @--color-text-height;
      }
    }
  }
  .search-list {
    min-height: 550px;
  }

  // .el-skeleton.albums {
  //   :deep(.ske-img) {
  //     width: 97px;
  //     height: 97px;
  //     line-height: 120px;
  //   }
  // }
  // .el-skeleton.play {
  //   :deep(.ske-img) {
  //     height: calc(@mainWidth / 6 * 0.7 - 40px);
  //     line-height: calc(@mainWidth / 6 * 0.7 - 40px);
  //   }
  // }

  .pagination {
    padding: 30px 0;
    text-align: center;
  }
</style>
