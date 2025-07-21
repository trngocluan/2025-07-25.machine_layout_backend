# 🏭 Machine Layout - Backend API（NestJS）

## 📌 概要 | Tổng quan

本システムは、工場内の設備の稼働状態、位置、パフォーマンスなどを可視化するWebアプリケーションのバックエンドAPIです。NestJS + TypeORM + SQL Server をベースに構築されています。

Hệ thống này là phần backend API cho ứng dụng web dùng để trực quan hóa tình trạng, vị trí và hiệu suất của thiết bị trong nhà máy. Được xây dựng bằng NestJS + TypeORM + SQL Server.

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
- 📧 Email: luan@marueivn.com

---


//////////////////////////// Original From NestJS ///////////////////////////////
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
