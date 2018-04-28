// pages/musicList/musicList.js
import api from '../../api/api.js'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songListArr: [],      //歌曲数组
    playCount: "",        //播放量
    listName: "",         //歌单名字
    coverImgUrl: "",       //封面图片
    creatorName: "",       //歌单创建者名字
    usericon: "",           //创建者头像
    flag: false,
    cerrentMusic:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMusicList(options.musicListID)
  },

  // 根据接收到的歌单id，请求数据
  loadMusicList(id) {
    api.getMusicList({
      data: {
        id: id
      },
      success: resp => {
        console.log(resp)
        this.setData({
          songListArr: resp.data.result.tracks,
          playCount: resp.data.result.playCount,
          listName: resp.data.result.name,
          coverImgUrl: resp.data.result.coverImgUrl,
          creatorName: resp.data.result.creator.nickname,
          usericon: resp.data.result.creator.avatarUrl,
          flag: true
        });
        app.globalData.musicListArr = resp.data.result.tracks;
      }
    })
  },

  // 开始播放音乐
  playMusic(e) {
    app.globalData.musicData = e.currentTarget.dataset.musicdata;
    this.setData({
      cerrentMusic: app.globalData.musicData.id
    })
    wx.navigateTo({
      url: "../audioPage/audioPage"
    });

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({
      cerrentMusic: app.globalData.musicData.id || 0
    })
    // this.setData({
    //   cerrentMusic:app.globalData.musicData.id
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})