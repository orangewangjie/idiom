// pages/words.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    loadProgress:0,
    show_description:true,
    idiomList:{},
    floorstatus:false,
    lastKey:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRandList();
  //   this.setData({
  //     search: this.search.bind(this)
  // })
  },
  showDdetail:function(e){
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../detail/detail?id='+id
    })
  },
  showChange:function(e){
    console.log(e.detail);
    this.setData({
      show_description : e.detail.value
   });
  },
  getRandList:function(){
    var that = this;
    wx.request({
      // url: 'http://love.local/index.php/Idiom/getRandIdiomList', //仅为示例，并非真实的接口地址
      url: 'https://love.xjcyue.top/index.php/Idiom/getRandIdiomList', //仅为示例，并非真实的接口地址
      data: {
                    
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        console.log(res);

        var list = res.data.data;
      // var result = res.data;
      // if(result){
        
      //   var title_= result.data.chengyu;
      //   var story_ = replace.replaceSpecialChar(result.data.story);
      //   var meaning_ = result.data.jieshi;
      //   var origin_ = result.data.chuchu;
      //   var example_ = result.data.liju;

        that.setData({
           idiomList:list
        });
  }
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
    // 获取滚动条当前位置
    onPageScroll: function (e) {
      // console.log(e)
      if (e.scrollTop > 70) {
        this.setData({
          floorstatus: true
        });
      } else {
        this.setData({
          floorstatus: false
        });
      }
    },
  
    //回到顶部
    goTop: function (e) {  // 一键回到顶部
      if (wx.pageScrollTo) {
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    },

loadProgress(){
  console.log('loadProgress');
  this.setData({
    loadProgress: this.data.loadProgress+10
  })
  if (this.data.loadProgress<100){
    setTimeout(() => {
      this.loadProgress();
    }, 300)
  }else{
    this.setData({
      loadProgress: 0
    })
  }
},
searchByKey:function(e){
  // console.log('to search', e.detail);
  var keyword = e.detail.value;
  if(keyword == ''){
    return;
  }

  if(keyword == this.data.lastKey){
    console.log('same');
    return;
  }

  this.loadProgress();
  var that = this;  
  wx.request({
    // url: 'http://love.local/index.php/Idiom/searchIdiomByKeyword', //仅为示例，并非真实的接口地址
    url: 'https://love.xjcyue.top/index.php/Idiom/searchIdiomByKeyword', //仅为示例，并非真实的接口地址
    data: {
         key:keyword         
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res);
      that.setData({
        loadProgress: 100
      })
      if(res.data.code == 400){
        console.log('return');
        wx.showToast({
          title: '没有匹配的成语',
          icon: 'none',
          duration: 2000
        });
        
        return;
      }
      var list = res.data.data;
      that.setData({
          idiomList:list,
          lastKey:keyword
      });
      
     
   
}


});
}
})