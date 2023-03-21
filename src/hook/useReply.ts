import { shallowReactive, toRefs, watch } from 'vue';

interface Info {
  msg: string;
  maxLen: number;
}
export default function useReply() {
  const props = defineProps<{
    params: {
      user: { nickname: string };
    };
  }>();
  const emit = defineEmits(['replyMsg', 'delete']);
  const info: Info = shallowReactive({
    msg: '',
    maxLen: 140,
  });
  const subReplyComment = () => emit('replyMsg', info['msg']);
  watch(
    () => info['msg'],
    () => {
      info['msg'] = info['maxLen'] >= info['msg'].length ? info['msg'] : info['msg'].substring(0, info['maxLen']);
    },
  );

  return {
    ...toRefs(props),
    ...toRefs(info),
    subReplyComment,
  };
}
