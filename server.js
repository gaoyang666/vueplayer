var express=require('express')
var config=require('./config/index')
var app=express()
var axios = require('axios');
var apiRoutes = express.Router();
	 app.get('/api/getDiscList', function (req, res) {
	        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' 
	      axios.get(url, {
	          headers: {
	            referer: 'https://c.y.qq.com/', 
	            host: 'c.y.qq.com'
	            },
	          params: req.query
	        }).then((response) => {
	          res.json(response.data)
	        }).catch((e) => {
	          console.log(e)
	        })
	      })
	  app.get('/api/getSongList', function(req, res) {
	  //修改后端代码获取歌曲列表信息
	  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
	  axios.get(url, {
	    headers: {
	      referer: 'https://c.y.qq.com/',
	      host:'c.y.qq.com'
	    },
	    params: req.query
	  }).then((response) => {
	    var ret = response.data
	    if (typeof ret === 'string') {
	      var reg = /^\w+\(({[^()]+})\)$/
	      var matches = ret.match(reg)
	      if (matches) {
	        ret = JSON.parse(matches[1])
	        console.log(ret);
	      }
	    }
	    res.json(ret)
	  }).catch((e) => {
	    console.log(e)
	  })
	})
   
   app.use('/api', apiRoutes)
   app.use(express.static('./dist'))

var port=process.env.PORT|| config.build.port
module.exports=app.listen(port,function(err){
	if(err){
		
		console.log(err)
	}
	
	console.log('listening at http://localhost:'+port)
})
