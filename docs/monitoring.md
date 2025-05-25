# 監視・アラート運用ガイド

このドキュメントは、pantry-plannerプロジェクトの監視・アラート設計・運用・障害対応連携をまとめたものです。

## 1. 監視方針

- サーバ・API・DBの死活・リソース監視
- レスポンスタイム・エラー率・CPU/メモリ等の主要メトリクス監視
- 監視ツール（Datadog, Sentry, Grafana等）を活用

## 2. アラート設計

- 重大障害・閾値超過時は即時アラート
- 通知先はSlack/Discord・メール等
- アラート内容は簡潔・具体的に

## 3. 運用ルール

- アラート発生時はincident-response.mdに従い初動
- 監視設定・閾値は定期的に見直し
- 監視・アラート内容はdocs/配下に記録

---

詳細はlogging.md, incident-response.md, performance.md等を参照。
