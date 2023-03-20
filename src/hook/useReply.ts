import { shallowReactive, toRefs, watch, withDefaults } from 'vue';

interface Info {
  msg: string;
  maxLen: number;
}
export default function useReply() {
  const props = withDefaults(
    defineProps<{
      params: {
        user: { nickname: string };
      };
    }>(),
    {
      params: () => {
        return {
          user: {
            nickname: '',
          },
        };
      },
    },
  );
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
