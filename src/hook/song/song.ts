import type { LocationQueryValue } from 'vue-router';

export interface PlaylistsType {
  name: string;
  id: string;
  coverImgUrl: string;
  creator: {
    userId: string;
    nickname: string;
  };
}
interface Singer {
  name: string;
  id: string;
}
export interface SimiSongType {
  name: string;
  id: string;
  singer: Array<Singer>;
  vip?: string;
}

export interface SongInfoType {
  id: string | number;
  license: string | boolean;
  alia: Array<string>;
  name: string;
  singer: Array<Singer>;
  publishTime: string;
  album: {
    picUrl: string;
    id: string;
    name: string;
  };
  vip?: string | boolean;
  mvId?: string;
}
export interface Info {
  songInfo: SongInfoType;
  sId: LocationQueryValue | LocationQueryValue[];
  simiSong: Array<SimiSongType>;
  playlists: Array<PlaylistsType>;
  mlogMv: Array<any>;
  commentType: number;
  coverDesc?: string;
}
