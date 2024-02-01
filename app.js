const express = require('express'); // 1. 載入express模組    
const connectToMySQL = require('./connection.js'); // 2. 載入資料庫連線模組    
const app = express(); // 3. 建立Express應用

// 4. 設計路由與回應內容
app.get('/', async (req, res) => {
  try {
    const connection = await connectToMySQL();

    // 修改操作帶入外部變數 
    let table_1 = "product";
    let table_2 = "variant";
    let orderBy = "product.id";

    // 執行SQL指令操作資料庫
    let [result_readTable] = await connection.execute(`
    SELECT * FROM ${table_1} LEFT JOIN ${table_2} 
    ON product.id=variant.product_id 
    ORDER BY ${orderBy} ASC
    `);
    // console.log(result_readTable);

    // 建立一個包含所有 name 值的字串
    const rows = result_readTable.map((value) => `
    <tr><td>${value.name}</td><td>${value.size}</td><td>${value.price}</td></tr>
    `).join('');

    // 將字串包裝在 <table> 中
    const htmlResponse = `
    <h1>資料庫連線成功</h1>
    <p>資料表 <strong>${table_1},${table_2}</strong></p>
    <table border="1">
      <tr>
      <th>名稱</th>
      <th>尺寸</th>
      <th>價格</th>
      </tr>
      ${rows}
    </table>
`;

    res.send(htmlResponse);

    // 記得要關閉連線
    connection.end();
  } catch (error) {
    console.error('資料庫連線錯誤:', error);
    res.status(500).send('資料庫連線錯誤');
  }
});

// 5. 監聽指定端口，讓Express應用程式開始接收來自客戶端的HTTP請求
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`伺服器正在運行端口: ${port}`);
});

