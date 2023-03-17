<template>
  <div class="mv">
    <div class="mv-container">
      <div class="mv-main">
        <div
          v-infinite-scroll="loadMv"
          class="wrapper infinite-list"
          infinite-scroll-disabled="isLoadMv"
          infinite-scroll-distance="50">
          <MvList :mvList="list" :loading="mv_loading" :num="mv_count" />
          <template v-if="isLoading">
            <Loading />
          </template>
        </div>
      </div>
      <div class="aside-box">
        <el-affix :offset="140" style="width: 100%; height: 100%">
          <div class="aside-menu">
            <h3 class="aside-title">排序</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in order"
                :key="item"
                :class="index === orderIndex ? 'active' : ''"
                @click="selectType('order', index)"
                >{{ item }}</em
              >
            </div>
            <h3 class="aside-title">区域</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in area"
                :key="item"
                :class="index === areaIndex ? 'active' : ''"
                @click="selectType('area', index)"
                >{{ item }}</em
              >
            </div>
            <h3 class="aside-title">类型</h3>
            <div class="filter-main">
              <em
                v-for="(item, index) in type"
                :key="item"
                :class="index === typeIndex ? 'active' : ''"
                @click="selectType('type', index)"
                >{{ item }}</em
              >
            </div>
          </div>
        </el-affix>
      </div>
    </div>
  </div>
</template>

<script>
  import { getMvList } from '/@/api/main';
  import MvList from '/@/components/MvList.vue';
  import Loading from '/@/components/IconLoading.vue';
  import { onMounted, watchEffect, reactive, toRefs } from 'vue';
  export default {
    name: 'Mvlist',
    components: {
      MvList,
      Loading,
    },
    setup() {
      const info = reactive({
        area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
        type: ['全部', '官方版', '原生', '现场版', '网易出品'],
        order: ['上升最快', '最新'],
        areaIndex: 0,
        typeIndex: 0,
        orderIndex: 0,
        params: {
          area: '',
          type: '',
          order: '',
          limit: 30,
          offset: 0,
        },
        list: [],
        mv_count: 20,
        mv_loading: true,
        isLoading: true,
        isLoadMv: true,
      });

      const getMv = async params => {
        const { code, data, hasMore } = await getMvList(params);
        if (code !== 200) return ElMessage.error('数据请求失败');
        info.list = info.params.offset !== 0 ? [...info.list, ...data] : data;
        info.isLoadMv = !hasMore;
        info.isLoading = hasMore;
        info.mv_loading = false;
      };

      const selectType = (type, index) => {
        info[type + 'Index'] = index;
        info.list = [];
        info.params.offset = 0;
        info.params[type] = info[type][index];
        info.mv_loading = true;
      };

      const loadMv = () => {
        info.isLoadMv = true;
        info.params.offset = info.list.length;
      };

      onMounted(() => {
        info.params.area = info.area[info.areaIndex];
        info.params.type = info.type[info.typeIndex];
        info.params.order = info.order[info.orderIndex];
      });

      watchEffect(() => {
        getMv(info.params);
      });

      return {
        ...toRefs(info),
        selectType,
        loadMv,
      };
    },
  };
</script>
<style lang="less" scoped>
  .mv-container {
    display: flex;
    padding-top: 40px;

    .mv-main {
      flex: 1;
      margin-top: -20px;
    }
  }

  .aside-menu {
    padding: 20px 20px 1px;
    margin-bottom: 25px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
  }
  .filter-main {
    margin: 5px 0 20px;

    em {
      position: relative;
      z-index: 1;
      display: inline-block;
      padding: 5px 0;
      margin-right: 15px;
      font-style: normal;
      cursor: pointer;

      &.active {
        &::after {
          position: absolute;
          content: '';
          left: 0;
          bottom: 5px;
          width: 100%;
          height: 6px;
          background: #ff641e;
          z-index: -1;
        }
      }
    }
  }
</style>
