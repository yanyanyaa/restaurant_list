![image]([picture or gif url](https://github.com/yanyanyaa/restaurant_list/blob/main/cover.png))

## Restaurant List
這是一個餐廳網站，使用者可透過註冊會員來建立個人的收藏清單
裡頭記錄各家餐廳的詳細資訊與評分，並附有搜尋與排序功能

---
### 功能列表（Features）
- 可註冊帳號密碼，或使用 Facebook 登入
- 首頁可看到各家餐廳的簡單資料，包括照片、名稱、類別與評分
- 點進特定餐廳頁面後，可看到更多詳細資料，包括地址、電話、描述等
- 可透過搜尋餐廳名稱或類別的關鍵字來找到特定餐廳
- 可用加入時間、餐廳類別、評分高低來決定排序
- 可自行新增、修改、刪除店家資訊，打造屬於自己的個人餐廳網站

---
### 安裝（Installation）
1. 請先確認本地已安裝 node.js 與 npm

2. 打開終端機，clone 此專案至本地
```
git clone https://github.com/yanyanyaa/restaurant_list.git
```

3. 進入此專案資料夾，安裝相關開發軟體
```
npm install
```

4. 安裝 nodemon
```
npm install -g nodemon
```

5. 參考 .env.example 設定環境變數

6. 在終端機輸入指令來執行本專案
```
npm run seed
npm run dev
```

7. 當終端機出現以下字樣，表示伺服器已成功啟動
```
Express is listening on localhost:3000
```

8. 可透過預設帳號登入網站
| Name  |       Email       | Password |
|-------|-------------------|----------|
| user1 | user1@example.com | 12345678 |
| user2 | user2@example.com | 12345678 |

---
### 開發工具

- Node.js 14.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- mongoose 5.9.7
- dotenv 16.0.3
- Bootstrap 5.1.3
- Font-awesome 6
- bcryptjs": 2.4.3,
- body-parser": 1.20.2,
- connect-flash": 0.1.1,
- express-session: 1.17.1
- method-override: 3.0.0
- passport: 0.4.1
- passport-facebook": 3.0.0
- passport-local": 1.0.0
