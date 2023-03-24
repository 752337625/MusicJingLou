<template>
  <div class="search">
    <el-select
      v-model="keyVal"
      class="keyVal"
      filterable
      remote
      :placeholder="placeholder"
      :remote-method="remoteMethod"
      :fit-input-width="true"
      :loading="loading"
      loading-text="搜索中..."
      size="small"
      @focus="handleFocus">
      <div v-if="!keyVal" class="hot-search">
        <h5>热门搜索</h5>
        <el-option
          v-for="(item, index) in serachHot"
          :key="index"
          :label="item.first"
          :value="item.first"
          @click="jumpSearch(item)">
          <span :class="[index < 3 ? 'top-' + index : '']">{{ index + 1 + '.' }}</span>
          {{ item.first }}
        </el-option>
      </div>
      <template v-else>
        <el-option-group v-for="list in suggestInfo" :key="listType[list.label]" :label="listType[list.label]" class="aaa">
          <el-option
            v-for="(item, index) in list.info"
            :key="list.label + index"
            :label="item.name"
            :value="list.label + item.name"
            class="item"
            @click="jumpPage(item, list.label)">
            {{ item.name }}
            <template v-if="list.label === 'songs'">
              -
              <span v-for="(a, i) in item.artists" :key="i" class="artists">{{ (i !== 0 ? ' / ' : '') + a.name }}</span>
            </template>
            <template v-else-if="list.label === 'albums'">
              - <span class="artists">{{ item.artist.name }}</span>
            </template>
          </el-option>
        </el-option-group>
      </template>
    </el-select>
  </div>
</template>
<script>
  import { defineComponent, onMounted, reactive, toRefs } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getSearchDefault, getSearchSuggest as searchSuggest, getSearchHot } from '/@/api/search';
  export default defineComponent({
    setup() {
      const route = useRoute();
      const router = useRouter();
      const info = reactive({
        keyVal: '',
        placeholder: '',
        serachHot: [],
        suggestInfo: [],
        loading: false,
        listType: {
          songs: '单曲',
          artists: '歌手',
          albums: '专辑',
          playlists: '歌单',
        },
      });
      // 搜索结果
      const getSerachSuggest = async () => {
        const { code, message, result } = await searchSuggest({ keywords: info.keyVal });
        info['loading'] = false;
        if (code !== 200) return ElMessage.error(message);
        if (!result.order || !result.order.length) return;
        info['suggestInfo'] = result.order.map(item => {
          return {
            label: item,
            info: result[item],
          };
        });
      };
      const _getSearchHot = () => {
        getSearchHot().then(res => {
          let { code, message, result } = res;
          if (code !== 200) return ElMessage.error(message);
          info.serachHot = result.hots;
        });
      };

      const remoteMethod = query => {
        info['keyVal'] = query;
        if (info['keyVal']) {
          info['loading'] = true;
          info['suggestInfo'] = [];
          getSerachSuggest();
        }
      };

      //搜索框，获取焦点时，请求热门搜索列表接口
      const handleFocus = () => {
        if (info['keyVal']) {
          info['loading'] = true;
          info['suggestInfo'] = [];
          getSerachSuggest();
        }
      };

      // 热门搜索
      const _getSearchDefault = async () => {
        getSearchDefault().then(res => {
          let { code, message, data } = res;
          if (code !== 200) return ElMessage.error(message);
          info.placeholder = data.showKeyword;
          //
        });
      };

      // 默认热门搜索列表，点击后台跳转到搜索结果页面
      const jumpSearch = item => {
        info.keyVal = item.first;
        if (item.first === route.query.key) {
          return;
        }
        router.push({ path: '/music/search', query: { key: item.first } });
      };

      // 搜索建议列表，点击后跳转到相对应的落地页
      const jumpPage = (item, type) => {
        switch (type) {
          case 'songs':
            router.push({ path: '/music/song', query: { id: item.id } });
            break;
          case 'artists':
            router.push({ path: '/music/singer', query: { id: item.id } });
            break;
          case 'albums':
            router.push({ path: '/music/album', query: { id: item.id } });
            break;
          case 'playlists':
            router.push({ path: '/music/detail', query: { id: item.id } });
            break;
        }
      };

      onMounted(() => _getSearchDefault(), _getSearchHot());
      return {
        ...toRefs(info),
        remoteMethod,
        handleFocus,
        getSerachSuggest,
        jumpSearch,
        jumpPage,
      };
    },
  });
</script>
<style>
  .el-select-dropdown__wrap {
    max-height: 400px;
  }
</style>
<style lang="less" scoped>
  .search {
    position: relative;
    display: flex;
    text-align: right;
    align-items: center;
    :deep(.el-input),
    :deep(.el-input__inner) {
      color: #fff;
      padding: 0 10px;
    }
    .el-select {
      :deep(.el-input__wrapper) {
        background-color: #d93c3c;
        box-shadow: none !important;
        border-radius: 27px;
      }
    }
  }

  .hot-search {
    h5 {
      padding: 5px 0 5px 20px;
      font-size: 18px;
    }

    .top-0 {
      font-weight: bold;
      color: rgba(255, 0, 0, 1);
    }

    .top-1 {
      font-weight: bold;
      color: rgba(255, 0, 0, 0.6);
    }

    .top-2 {
      font-weight: bold;
      color: rgba(255, 0, 0, 0.4);
    }
  }

  .item {
    padding-right: 20px;

    .artists {
      font-size: 12px;
      color: @--color-text;
    }

    &.selected {
      color: @--color-text-height;

      .artists {
        color: @--color-text-height;
      }
    }
  }
</style>
