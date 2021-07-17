// pages/story/story.js
const app = getApp();
var replace = require("../../utils/replace");
console.log(replace);
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ColorList: app.globalData.ColorList,
    title:'',
    origin:'',
    story:'',
    meaning:'',
    example:'',

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRand();
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

  },
  getRand:function(){
    var that = this;
    wx.request({
      // url: 'http://xjcyue.local/index.php/Idiom/getStoryRand', //仅为示例，并非真实的接口地址
      url: 'https://love.xjcyue.top/index.php/Idiom/getStoryRand', //仅为示例，并非真实的接口地址
      data: {
                    
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);

        var result = res.data;
        if(result){
          
          // var title_= result.data.chengyu;
          // var story_ = replace.replaceSpecialChar(result.data.story);
          // var meaning_ = result.data.jieshi;
          // var origin_ = result.data.chuchu;
          // var example_ = result.data.liju;
          var title_ = result.data.name;
          var spell_ = result.data.spell;
          var meaning_ = result.data.content;
          var origin_ = result.data.derivation;
          var example_ = result.data.samples;
          var story_ = result.data.story? replace.replaceSpecialChar(result.data.story):null;

          that.setData({
              title: title_,
              story: story_,
              spell:spell_,
              meaning:meaning_,
              origin:origin_,
              example:example_
          });
          let history_names = wx.getStorageSync("history_names") || [];
          let history_ids = wx.getStorageSync("history_ids") || [];
          // var lastKey = history_search?  history_search.slice(-1)[0] : '';
          let index = history_names.indexOf(title_);
          if(index != -1){
            history_names.splice(index,1); 
            history_ids.splice(index,1); 
          }
          history_names.push(title_);
          wx.setStorageSync("history_names", history_names);
          history_ids.push(result.data.id);
          wx.setStorageSync("history_ids", history_ids);
         

        }
  }
});
  },
  

  change: function() {
    this.getRand();
  },
  tabChange(e) {
    console.log('tab change', e)
}
})