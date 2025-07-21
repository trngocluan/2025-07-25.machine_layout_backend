# 🏭 Machine Layout - Backend API（NestJS）

## 📌 概要 | Tổng quan

本システムは、工場内の設備の稼働状態、位置、パフォーマンスなどを可視化するWebアプリケーションのバックエンドAPIです。NestJS + TypeORM + SQL Server をベースに構築されています。

Hệ thống này là phần backend API cho ứng dụng web dùng để trực quan hóa tình trạng, vị trí và hiệu suất của thiết bị trong nhà máy. Được xây dựng bằng NestJS + TypeORM + SQL Server.

## 🏭 Mục tiêu hệ thống | システムの目的
API trả về danh sách máy của nhà máy theo sơ đồ layout, bao gồm:  
工場内のレイアウトに基づいて機器一覧を返すAPIです。以下の情報を含みます：

- Thông tin: số máy, vị trí (x, y), trạng thái vận hành  
  機器番号、座標（x, y）、運転状態（停止・稼働・異常）

- Nếu là máy có counter (loại 40): thêm ct, sản lượng counter, hiệu suất performance (%)  
  タイプ40の機器（カウンター付き）の場合：CT、生産数、稼働率（%）も含む

- Hỗ trợ hiển thị real-time trên TV hoặc dashboard giám sát  
  TVやダッシュボードでのリアルタイム表示に対応

## 🔗 API endpoint

```bash
GET /machine?factory=2
```

- `factory=2` tương ứng với nhà máy Mercury  
- `factory=2` は Mercury 工場を示す

⚠ Các máy có `machine_type ≠ 40` vẫn được trả về nhưng không có hiệu suất  
⚠ タイプ40以外の機器も返されますが、稼働率は含まれません

## 🔁 Ví dụ phản hồi | レスポンス例

```json
[
  {
    "machine_no": 2501,
    "x": 270,
    "y": 855,
    "status": 1,
    "ct": 13,
    "machine_type": 40,
    "hour": 6,
    "counter": 779,
    "performance": 0.401
  }
]
```

## 🗂 Cấu trúc database (SQL Server) | データベース構成

### 🔹 Bảng A – Trạng thái máy: `DE_TBL_運転状態履歴`

| Cột Nhật | Giải thích | 説明 |
|----------|------------|------|
| 工場区分 | Mã nhà máy | 工場コード |
| 機器番号 | Số máy | 機器番号 |
| 運転状態 | Trạng thái (0-dừng, 1-chạy, 2-lỗi) | 稼働状態（0=停止, 1=稼働, 2=異常） |
| X位置 / Y位置 | Tọa độ trong layout | レイアウト上の座標 |

### 🔹 Bảng B – Master thiết bị: `DE_MST_機器マスタ`

| Cột Nhật | Giải thích | 説明 |
|----------|------------|------|
| 機器番号 | Mã thiết bị | 機器番号 |
| 工場区分 | Nhà máy | 工場区分 |
| 機器区分 | Loại thiết bị (40 là có counter) | タイプ（40 = カウンター付き） |
| CT | Chu kỳ chuẩn (giây/sp) | サイクルタイム（秒/個） |

### 🔹 Bảng C – Tiến độ sản xuất: `DE_TBL_生産進捗`

| Cột Nhật | Giải thích | 説明 |
|----------|------------|------|
| 機器番号 | Mã thiết bị | 機器番号 |
| 日付 | Ngày sản xuất (yyyy-MM-dd) | 生産日（yyyy-MM-dd） |
| 時間 | Khung giờ (VD: 8 = 08:00–08:59) | 時間スロット（例：8=08:00〜08:59） |
| 生産数 | Tổng sản lượng đến cuối khung giờ | 累積生産数（その時間帯まで） |

## 🧠 Cách tính hiệu suất | 稼働率の計算方法

```ts
performance = counter / (seconds / ct)
```

Trong đó:  
- `counter`: sản lượng tích lũy đến thời điểm đó（累積生産数）  
- `ct`: thời gian 1 chu kỳ máy（1サイクルにかかる秒数）  
- `seconds`: số giây thực tế đã chạy từ 08:00 đến giờ hiện tại（08:00以降の経過秒数）

⏱ Quy tắc thời gian | 時間のルール:

- `hour_for_query` = số giờ đã qua từ 08:00 - 1  
  `hour_for_query` = 08:00から経過した時間 - 1

- Nếu < 8 → tính từ 08:00 hôm qua  
  8未満なら前日の08:00から換算

---

## ⚙️ 使用技術 | Công nghệ sử dụng

- ✅ [NestJS](https://nestjs.com/) - Node.js向けのフレームワーク（バックエンドAPI構築）
- ✅ TypeORM - ORMライブラリ（DB接続・操作）
- ✅ Microsoft SQL Server - データベース
- ✅ TypeScript

---

## 🗂️ ディレクトリ構成 | Cấu trúc thư mục

```
src/
├── app.module.ts                 // アプリケーションモジュール
├── app.controller.ts            // ルートAPIコントローラー
├── machine/                     // 設備データ関連API
│   ├── machine.controller.ts
│   ├── machine.service.ts
│   └── machine.module.ts
├── entities/                    // DBエンティティ定義
│   ├── machine-master.entity.ts
│   ├── machine-status-history.entity.ts
│   └── production-progress.entity.ts
```

---

## 🚀 起動方法 | Cách khởi động

### 1. 環境変数ファイルの作成 | Tạo file cấu hình `.env`

プロジェクトルートに `.env` ファイルを作成し、以下の内容を記述してください：

Tạo file `.env` tại thư mục gốc và điền thông tin kết nối như sau:

```env
DB_HOST=localhost
DB_PORT=1433
DB_USERNAME=sa
DB_PASSWORD=yourStrong(!)Password
DB_DATABASE=IoT_DB
PORT=3000
```

### 2. 依存パッケージのインストール | Cài đặt thư viện

```bash
npm install
```

### 3. サーバーの起動 | Chạy server

```bash
npm run start
```

- デフォルトポート: http://localhost:3000
- CORSが有効なので、Angularなどのフロントエンドと連携可能です。
- CORS được bật sẵn để frontend (Angular) gọi API.

---

## 📘 主なAPI | Các API chính

### `GET /machine?factory=2`

- 指定した工場の設備リストを取得（状態・座標・パフォーマンスなど）
- Trả về danh sách thiết bị theo nhà máy (gồm trạng thái, vị trí, hiệu suất...)

---

## 🔒 注意事項 | Lưu ý

- `synchronize: false` に設定されているため、DBスキーマは自動生成されません。
- DBは事前に用意してください。
- Vì `synchronize = false`, hệ thống sẽ không tự tạo bảng. Cần chuẩn bị DB sẵn.

---

## 👨‍💻 保守・引き継ぎ用コメント | Chú thích bàn giao

すべてのコードには **ベトナム語＋日本語のコメント** を記述しています。
Toàn bộ mã nguồn đã được chú thích **song ngữ Việt – Nhật** để dễ bảo trì và bàn giao.

---

## 🧩 補足 | Bổ sung

- 設備の種類＝40 の場合のみ稼働率（パフォーマンス）を計算します。
- Hiệu suất chỉ tính cho thiết bị có `machine_type = 40`.

---

## 🧑‍🏫 作成者 | Tác giả

- 🇻🇳 Luan Kun – Senior DX Manager (Maruei Vietnam Precision)

---


//////////////////////////////////// Original From NestJS /////////////////////////////////////
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
