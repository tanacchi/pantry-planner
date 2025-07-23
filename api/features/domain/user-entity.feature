Feature: ユーザーエンティティ
  ドメインモデルとして
  ユーザーの基本的な属性と振る舞いを定義したい
  LINE連携によるユーザー管理を行うために

  Scenario: 有効なパラメータでユーザーエンティティを作成する
    When 以下のパラメータでユーザーエンティティを作成する:
      | id          | 1                |
      | lineUid     | line-uid-12345   |
      | createdAt   | 2024-01-01       |
      | updatedAt   | 2024-01-01       |
      | lastLoginAt | 2024-01-01       |
    Then ユーザーエンティティが正常に作成される
    And ユーザーのIDは 1 である
    And ユーザーのLINE UIDは "line-uid-12345" である

  Scenario: LINE UIDによるユーザー識別を検証する
    Given LINE UID "unique-line-uid" が存在する
    When LINE UID "unique-line-uid" でユーザーエンティティを作成する
    Then ユーザーエンティティが正常に作成される
    And ユーザーのLINE UIDは "unique-line-uid" である
    And ユーザーはLINE UIDで一意に識別される

  Scenario: ユーザーの最終ログイン時刻を検証する
    When 最終ログイン時刻 "2024-12-31" でユーザーエンティティを作成する
    Then ユーザーエンティティが正常に作成される
    And ユーザーの最終ログイン時刻は "2024-12-31" である

  Scenario: ユーザーエンティティの不変性を検証する
    Given ユーザーエンティティが作成されている
    When ユーザーのプロパティにアクセスする
    Then 全てのプロパティは読み取り専用である
    And プロパティの値は変更できない

  Scenario: ユーザーの時刻情報を検証する
    When 現在時刻でユーザーエンティティを作成する
    Then ユーザーエンティティが正常に作成される
    And 作成日時が設定されている
    And 更新日時が設定されている
    And 最終ログイン時刻が設定されている