> Dashboard 的下一代版本已經發布！ <br>
> https://github.com/SonMooSans/discord-bot-dashboard-2

![示範](https://github.com/fuma-nama/discord-bot-dashboard/blob/master/document/img.png)

# D-Dash: Discord 機器人儀表板

一個功能完整的 Discord 機器人儀表板模板
<br>
你可以修改 `config/config.js` 來編輯設定，無需更動程式碼
<br>
歡迎為此專案做出貢獻

**在 [YouTube](https://youtu.be/Z90Ax-v4uH4) 觀看示範**

## 功能特色
* 使用 Chakra UI 的現代化設計
* 多語言支援（英文和中文）
* 可自訂使用者介面（`config.js`）
* 內建**功能**和**動作**系統
* 現成的後端實作

## 開始使用
**首先，複製此模板**
```
git clone https://github.com/SonMooSans/discord-bot-dashboard.git
```

D-Dash 不僅是一個模板，它支援在設定中新增**功能**和**動作**
<br>
因此，它需要完整的後端實作。
<br>
關於 Kotlin 的實作，請參考[範例](https://github.com/SonMooSans/discord-bot-dashboard-backend)

你可以透過實作 README 中提到的路由，用其他程式語言實作你自己的後端 API

## 設定
前往 [config.js](https://github.com/fuma-nama/discord-bot-dashboard/blob/master/src/config/config.js)
<br>
此設定檔允許你自訂使用者介面，`config.d.ts` 中有型別註解

### 基本設定
你需要指定 API 網址和你的機器人邀請連結
<br>
你也可以在設定中新增頁尾項目
```javascript
const config = {
    name: "機器人名稱",
    footer: [
        {
            name: "Hello World",
            url: "https://github.com"
        }
    ],
    //API 網址
    serverUrl: "http://localhost:8080",
    //你的機器人邀請連結
    inviteUrl: "https://discord.com/api/oauth2/authorize?client_id=1004280473956139038&permissions=8&scope=bot",
}
```

### 顯示資料或統計
你可以自訂要在儀表板上顯示的資料。
<br>
#### items 函式
它讀取 `detail` 和 `state`，然後回傳決定要顯示什麼的 `DataItem` 陣列

#### 儀表板資料
這是一個儀表板資料列的陣列，你可以自訂每列的選項來從 `state` 取得額外資料

每個資料列都包含一個 items 函式
<br>
你可以將 `advanced` 設為 true，這樣儀表板會擷取 `/guild/:guild/detail/advanced` 並將結果透過 `state.advanced` 傳給函式
它會顯示在**統計**分頁中

#### 動作和功能資料
這兩者都是 **Items 函式**

它們會顯示在**動作**和**功能**分頁中
<br>
你可以顯示像是**等級**、**反應身分組**之類的統計資料

```javascript
const config = {
    data: {
        dashboard: [
            {
                advanced: true,
                count: 3, //預留位置的數量
                //如果 row.advanced 為 false，advanced 將為 null
                items: (detail, {advanced}) => [
                    DataItem
                ]
            }
        ],
        actions: detail => [
            DataItem
        ],
        features: detail => [
            DataItem
        ]
    }
}
```

### 功能和動作
你必須在設定中定義機器人功能和動作
<br>
同時，功能和動作系統必須在你的 API 中實作

#### 功能
**功能**是可以啟用或停用的東西，啟用功能後
<br>
使用者可以編輯其選項並自訂機器人的行為

#### 動作
**動作**包含多個**任務**，使用者可以發布或刪除任務
<br>
使用者必須在發布任務前定義一些選項

動作可以用於`反應身分組`，因為你可能想要反應身分組可以在多個訊息上啟用

#### 選項
每個功能和動作都需要一個選項陣列來自訂設定
<br>
當使用者更新選項時，伺服器會收到一個 ID 和其值的對應表

**選項函式**會收到從伺服器擷取的功能/動作的 `values`
<br>
對於**動作**，在使用者發布任務前 values 會是 null

```javascript
const config = {
    features: {
        "feature_id": {
            name: "歡迎訊息",
            description: "當成員剛加入伺服器時發送訊息歡迎他們",
            options: (values) => [
                //範例選項
                {
                    id: "message",
                    name: "訊息",
                    description: "要發送的訊息",
                    type: OptionTypes.Message_Create, //訊息/嵌入訊息建立器
                    value: values? values.message : "",
                }
            ]
        }
    },
    actions: {
        "action_id": {
            name: "反應身分組",
            description: "當使用者對訊息做出反應時給予身分組",
            //在使用者發布任務前 values 會是 null
            options: (values) => [
                //範例選項
                {
                    id: "message",
                    name: "訊息",
                    description: "要發送的訊息",
                    type: OptionTypes.Message_Create, //訊息/嵌入訊息建立器
                    value: values? values.message : "",
                },
            ]
        }
    }
}
```

### 多語言
某些欄位支援多語言
<br>
你可以查看它們的型別註解來了解相關資訊

對於這些欄位，你可以使用：
```javascript
text = {
    zh: "中文",
    en: "英文"
}
```

目前，我們只支援**英文 (en)** 或**中文 (zh)**。
<br>
你可以在某些支援 `JSXElement` 的欄位上使用 `<Locale zh="中文" en="英文" />`

## 模板中的模板
此儀表板基於 [Horizon UI ⚡️](https://horizon-ui.com/horizon-ui-chakra)
