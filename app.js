// 1.載入express模組
const express = require('express')

// 2.建立Express應用
const app = express()

// 3.載入中間件模組
const morgan = require('morgan')//用途:http-request日誌
const bodyParser = require('body-parser')//用途:解析http-request
const cors = require('cors')//用途:瀏覽器中處理跨域請求機制
require('dotenv').config()

// 4.使用中間件模組
app.use(cors())
app.use(morgan('dev')) //說明:使用morgan的'dev'模式
app.use(bodyParser.json())

// 5.設計路由與回應內容(可跳過)
app.get('/', (req, res) => {
  res.send('<h1>首頁</h1>')
})

// 6.監聽指定端口，讓Express應用程式開始接收來自客戶端的 HTTP請求
const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`伺服器正在運行端口: ${port}`)
})
// 7.執行``$ node server.js`將運行伺服器 