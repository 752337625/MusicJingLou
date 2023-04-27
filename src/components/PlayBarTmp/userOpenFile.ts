import icon from '/@/assets/img/disc.png';
import useSongStore from '/@/store/modules/song';
import dayjs from 'dayjs';
function userOpenFile(obj) {
  const songStore = useSongStore();
  const { tab, filePath } = obj;
  const secondToMin = (seconds: number) => {
    const m = String(parseInt(String(seconds / 60))).padStart(2, '0');
    const s = String(parseInt(String(seconds % 60))).padStart(2, '0');
    return m + ':' + s;
  };
  const audioElement = new Audio(filePath);
  audioElement.addEventListener('loadedmetadata', function (_event) {
    const item = {
      id: '447534097',
      name: tab.tags.title,
      mvId: 0,
      singer: [
        {
          id: 12194880,
          name: tab.tags.artist,
          tns: [],
          alias: [],
        },
      ],
      album: {
        id: 35060294,
        name: tab.tags.album,
        picUrl: icon,
        tns: [],
        pic_str: '109951162828188564',
        pic: 109951162828188560,
      },
      alia: [],
      vip: false,
      license: false,
      duration: secondToMin(audioElement.duration),
      url: filePath,
      publishTime: dayjs().format('YYYY年MM月DD'),
    };
    songStore.setPlayAll({ list: [item] });
    songStore.setIsShowPlayListTips(true);
  });
}

export default userOpenFile;
