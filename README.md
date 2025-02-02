> **此專案已被棄用，請改用 `discord-bot-dashboard-next`** <br>
> [Github 倉庫](https://github.com/SonMooSans/discord-bot-dashboard-next)

![banner](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/document/4B9E09C4-48F7-47B4-9622-93A43912BE63.png)

# 現代化 Discord 機器人

使用 typescript、vite 3、react 18 和 chakra ui 2.0

- 支援淺色/深色主題
- 多語言支援 (i18n)
- Typescript 支援
- 優秀的 UI 和 UX + 快速效能
- 靈活且可自訂
- 詳細文檔

**線上演示:** https://demo-bot.vercel.app/

- 僅支援「歡迎訊息」功能
- API 可能會偶爾停機（使用 Koyeb 的免費方案）

## 預覽（可能不是最新版本）

|                  淺色                   |                  深色                  |
| :--------------------------------------: | :------------------------------------: |
| ![light-mode](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/document/home-light.png) | ![dark-mode](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/document/home-dark.png) |

## 開始使用

作為一個模板，你需要自訂一些內容才能讓它正常運作

### 事前準備

- 安裝 Node.js 和一個套件管理器（例如：npm 或 pnpm）

### 所需技能

- React.js 基礎知識
- 能夠閱讀 javascript/typescript

### 設置

1. **複製專案**
   <br>
   `git clone https://github.com/SonMooSans/discord-bot-dashboard-2.git`
2. **安裝依賴**

   |      NPM      |      PNPM      |      Yarn      |
   | :-----------: | :------------: | :------------: |
   | `npm install` | `pnpm install` | `yarn install` |

3. **自訂以下檔案**
   - [src/views/dashboard](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/views/dashboard/DashboardView.tsx) **使用者儀表板** - 關於使用者的一些狀態
   - [src/views/home](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/views/home/HomeView.tsx) **首頁** - 介紹你的機器人
   - [src/views/guild](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/views/guild/GuildView.tsx) **伺服器儀表板** - 自訂伺服器的地方（例如：功能、動作）
4. **定義功能**
   <br>
   儀表板內建支援配置功能
   <br>
   使用者可以啟用/停用功能，並在啟用後配置功能

   **在 [src/config/types/custom-types.ts](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/config/types/custom-types.ts) 中自訂所有類型**
   <br>
   `CustomFeatures` 用於定義功能和選項，查看範例以了解更多詳情

   **打開 [src/config/features](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/config/features.tsx)**
   <br>
   你可以看到功能是如何配置的

   ```tsx
   'feature-id': {
        name: '功能名稱',
        description: '關於此功能的描述',
        icon: <Icon as={BsMusicNoteBeamed} />, //給它一個酷炫的圖示
        useRender: (data) => {
            //渲染表單
        },
    }
   ```

   `useRender` 屬性用於渲染功能配置面板
   查看 [example/MusicFeature.tsx](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/config/example/MusicFeature.tsx) 以了解更多

5. **配置一般資訊**
   <br>
   修改 [src/config/common.tsx](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/config/common.tsx)
   - 機器人名稱和圖示
   - 邀請連結 _(例如：https://discord.com/oauth2/authorize?client_id=1234&scope=bot)_
   - 伺服器設定
6. **配置你的 API 端點 URL**
   <br>
   你可以通過以下方式定義 API 端點
   - 設置 `VITE_API_ENDPOINT` 環境變數
   - 在 [src/api/bot.ts](https://github.com/fuma-nama/discord-bot-dashboard-2/blob/master/src/api/bot.ts) 中修改預設 url _(預設：http://localhost:8080)_
7. **完成！**
   <br>
   通過 `npm run dev` 啟動應用程式 _(取決於你的套件管理器)_
   <br>
   然後你應該可以看到應用程式在埠口 `3000` 啟動

## 本地化

我們為你提供了一個內建的本地化工具，它輕量且類型安全

建立提供者

> provider.ts
