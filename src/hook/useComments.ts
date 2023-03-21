export interface HotComments {
  isHot: boolean;
}
export interface BeReplied {
  beRepliedCommentId: string;
  user: {
    userId: string;
    nickname: string;
  };
  content: string;
}
export interface CommentId {
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
export interface Info {
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
