// pages/search/search.js
import api from '../../api/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveValue: false,
    limit: 30,
    hotsearch: [],
    searchValue: "",
    songArr: [],   //歌曲
    musicListArr: [],   //歌单
    albumArr: [],   //专辑
    videoArr: [], //视频
    showHotsearch: true,
    searchType: 1,
    navLinePosition: '53rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.gethotsearch()
  },
  // 热词搜索
  hotwordsearch(opt) {
    this.setData({
      searchValue: opt.currentTarget.dataset.value,
      haveValue: true
    });
    api.searchStart({
      data: {
        keywords: opt.currentTarget.dataset.value,
        limit: this.data.limit,
        type: 1
      },
      success: resp => {
        console.log(resp.data.result)
        this.setData({
          songArr: resp.data.result.songs,
          showHotsearch: false
        })
      }
    })
  },
  // 开始搜索
  startSearch(opt) {
    api.searchStart({
      data: {
        keywords: opt.detail.value,
        limit: this.data.limit,
        type: this.data.searchType
      },
      success: resp => {
        console.log(resp.data.result)
        this.setData({
          songArr: resp.data.result.songs,
          showHotsearch: false
        })
      }
    })
  },
  // 热门搜索
  gethotsearch() {
    api.getHotSearch({
      success: resp => {
        console.log(resp)
        this.setData({
          hotsearch: resp.data.result
        })
      }
    })
  },
  // 输入中
  inputC(opt) {
    if (opt.detail.value.length) {
      this.setData({
        haveValue: true
      })
    } else {
      this.setData({
        haveValue: false,
        showHotsearch: true
      })
    }
  },
  // 清除vlaue
  clearValue() {
    this.setData({
      haveValue: false,
      showHotsearch: true
    })
  },
  // nav点击
  changeNav(opt){
    switch (opt.currentTarget.dataset.type) {
      case '1':
        this.setData({
          navLinePosition: '53rpx',
          searchType: opt.currentTarget.dataset.type
        })
        break;
      case '10':
        this.setData({
          navLinePosition: '240rpx',
          searchType: opt.currentTarget.dataset.type
        })
        break;
      case '1002':
        this.setData({
          navLinePosition: '428rpx',
          searchType: opt.currentTarget.dataset.type
        })
        break;
      case '1004':
        this.setData({
          navLinePosition: '616rpx',
          searchType: opt.currentTarget.dataset.type
        })
        break;
    }
  },
  // 返回上一页
  back() {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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