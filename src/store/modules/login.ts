interface UserInfo {
  avatarUrl: String | null | undefined; // 头像
  nickname: String | null | undefined; // 名称
}
interface LoginSate {
  isLogin: Boolean;
  userInfo: UserInfo;
}

const useLoginStore = defineStore({
  id: 'app-login',
  state: (): LoginSate => {
    return {
      isLogin: false,
      userInfo: {
        avatarUrl: null,
        nickname: null,
      },
    };
  },
  getters: {
    getAvatarUrl: (state): String => {
      return state.userInfo.avatarUrl ?? '暂无数据';
    },
    getNickname: (state): String => {
      return state.userInfo.nickname ?? '暂无数据';
    },
    // getUserInfo: (state): UserInfo => {
    // 	return state?.userInfo ?? null;
    // },
    getIsLogin: (state): Boolean => {
      return state.isLogin;
    },
  },
  actions: {
    //设置当前系统设置国际化
    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },
    setAvatarUrl(avatarUrl: String) {
      this.userInfo.avatarUrl = avatarUrl;
    },
    setNickname(nickname: String) {
      this.userInfo.nickname = nickname;
    },
  },
});
export default useLoginStore;
export { useLoginStore };
