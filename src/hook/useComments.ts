import { computed, onMounted, watch, shallowReactive, toRefs, withDefaults } from 'vue';
import useSongStore from '/@/store/modules/song';
import { ElMessageBox } from 'element-plus';
import {
  getCommentMusic,
  getCommentMv,
  getCommentAlbum,
  getCommentVideo,
  getCommentLike,
  getComment as comment,
} from '/@/api/main';

interface HotComments {
  isHot: boolean;
}
interface BeReplied {
  beRepliedCommentId: string;
  user: {
    userId: string;
    nickname: string;
  };
  content: string;
}
interface CommentId {
  commentId: string;
  user: {
    avatarUrl: string;
    userId: string;
    nickname: string;
  };
  time: string;
  content: string;
  liked: boolean | string;
  likedCount: number;
  beReplied: Array<BeReplied>;
  isHot?: boolean;
}
interface Info {
  msg: string;
  maxLen: number;
  curId: string | number;
  limit: number;
  offset: number;
  before: number;
  hotComments: Array<HotComments>;
  comments: Array<CommentId>;
  total: number;
  currentPage: number;
  isEmpty: boolean;
  replyCommentId: number;
  replyIndex: number;
}
export default function useComments() {
  const props = withDefaults(
    defineProps<{
      sId: string | number;
      type: number;
    }>(),
    {
      sId: 0,
      type: 0,
    },
  );
  const useSong = useSongStore();
  const info: Info = shallowReactive({
    msg: '',
    maxLen: 140,
    curId: props.sId,
    limit: 20,
    offset: 0,
    before: 0,
    hotComments: [],
    comments: [],
    total: 0,
    currentPage: 0,
    isEmpty: false,
    replyCommentId: 0,
    replyIndex: -1,
  });

  const userInfo = computed(() => useSong.getUserInfo);
  const isLogin = computed(() => useSong.getIsLogin);
  const isShowReply = computed(() => {
    return function (item, index) {
      return item.commentId === info.replyCommentId && info.replyIndex === index;
    };
  });

  const msgHandler = ({ total, hotComments, comments }) => {
    info.total = total;
    info.hotComments = hotComments || [];
    info.hotComments.map(item => {
      item.isHot = true;
      return item;
    });
    info.comments = [...info.hotComments, ...comments];
    // 当前评论是否为空
    info.isEmpty = info.before === 0 && !info.comments.length;
  };

  const getCommentList = async (apiFn, fn: Function) => {
    const { code, total, hotComments, comments } = await apiFn({
      id: info.curId,
      limit: info.limit,
      offset: info.offset,
      before: info.before,
      timestamp: new Date().valueOf(),
    });
    if (code !== 200) return ElMessage.error('数据请求失败');
    fn({ total, hotComments, comments });
  };
  // 获取页面评论
  const getComment = () => {
    // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
    switch (props.type) {
      case 0:
        getCommentList(getCommentMusic, res => msgHandler(res));
        break;
      case 1:
        getCommentList(getCommentMv, res => msgHandler(res));
        break;
      case 3:
        getCommentList(getCommentAlbum, res => msgHandler(res));
        break;
      case 5:
        getCommentList(getCommentVideo, res => msgHandler(res));
        break;
    }
  };

  // 发布/删除/回复评论
  const commentHandler = async (t, content, commentId?) => {
    const params = {
      t: t, // 0删除 1发送 2回复
      type: props.type, // 0: 歌曲 1: mv 2: 歌单 3: 专辑  4: 电台 5: 视频 6: 动态
      id: info.curId, // 对应资源id
      content: content, // 发送的内容/对应内容的id
      commentId: commentId, // 回复的评论id
    };
    const { code } = await comment(params);
    if (code !== 200) return ElMessage.error('数据请求失败');
    info.msg = '';
    getComment();

    if (t === 0) {
      ElMessage.success('删除评论成功！');
    } else if (t === 1) {
      ElMessage.success('评论成功！');
    } else if (t === 2) {
      ElMessage.success('回复评论成功！');
      info.replyCommentId = 0;
      info.replyIndex = -1;
    }
  };

  // 发布评论
  const subComment = async () => {
    if (!isLogin.value) {
      useSong.setLoginDialogVisible(true);
      return;
    }
    commentHandler(1, info.msg);
  };

  // 删除评论
  const delComment = item => {
    ElMessageBox.confirm('确定删除评论？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      center: true,
    }).then(() => {
      commentHandler(0, '', item.commentId);
    });
  };

  // 回复评论
  const replyComment = (item, index) => {
    if (!isLogin.value) {
      useSong.setLoginDialogVisible(true);
      return;
    }
    info.replyCommentId = info.replyCommentId === item.commentId && info.replyIndex === index ? 0 : item.commentId;
    info.replyIndex = index;
  };
  const replyMsg = msg => {
    if (!isLogin.value) {
      useSong.setLoginDialogVisible(true);
      return;
    }
    commentHandler(2, msg, info.replyCommentId);
  };
  // 给评论点赞
  const likeComment = async item => {
    if (!isLogin.value) return useSong.setLoginDialogVisible(true);
    const { code } = await getCommentLike({
      id: info.curId,
      cid: item.commentId,
      t: Number(!item.liked),
      type: props.type,
    });
    if (code !== 200) return ElMessage.error('数据请求失败');
    getComment();
  };
  // 留言分页
  const currentChange = page => {
    info.offset = (page - 1) * info.limit;
  };
  watch(
    () => props.sId,
    newVal => {
      info['curId'] = newVal;
      info['offset'] = 0;
      getComment();
    },
  );
  watch(
    () => info.msg,
    () => {
      info.msg = info.maxLen >= info.msg.length ? info.msg : info.msg.substring(0, info.maxLen);
    },
  );
  onMounted(() => getComment());
  return {
    ...toRefs(props),
    ...toRefs(info),
    userInfo,
    isLogin,
    subComment,
    delComment,
    replyMsg,
    replyComment,
    likeComment,
    isShowReply,
    currentChange,
  };
}
