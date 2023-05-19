## Restaurant List
這是一個餐廳網站，記錄各家餐廳的詳細資訊與評分，並附有以店家名稱與類別作為關鍵字的搜尋功能。

---
### 功能列表（Features）
- 首頁可看到各家餐廳的簡單資料，包括照片、名稱、類別與評分
- 點進特定餐廳頁面後，可看到更多詳細資料，包括地址、電話、描述等
- 可透過搜尋餐廳的名稱或類別來找到特定餐廳
- 可新增、修改、刪除店家資訊

---
### 安裝（Installation）
1. 請先確認有安裝 node.js 與 npm

2. 打開終端機，clone 此專案至本地
```
git clone https://github.com/yanyanyaa/restaurant_list.git
```

3. 在終端機上安裝 express
```
npm install express@4.16.4
```

4. 在終端機上安裝 express-handlebars
```
npm i express-handlebars@3.0.0
```

5. 在終端機上安裝 mongoose 5.9.7 與 dotenv 16.0.3
```
npm i npm i mongoose@5.9.7
npm i dotenv -D
```

6. 在終端機上啟動伺服器
```
npm run dev
```

7. 當終端機出現以下字樣，表示伺服器已成功啟動
```
Express is listening on localhost:3000
```

---
### 開發工具

- Node.js 14.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- mongoose 5.9.7
- dotenv 16.0.3
- Bootstrap 5.1.3
- Font-awesome 6