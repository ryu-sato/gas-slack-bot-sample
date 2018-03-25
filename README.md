# gas-slack-bot-sample

GAS による Slack bot サンプルプログラム。

Google SpreadSheet で管理しているメンバーリストからランダムで掃除担当を決定して Slack で発言する。
日時をトリガとすれば定期実行することが出来る。

# 使い方

1. app.gs を Google App Script として作成する。
1. トリガーの設定から定期実行する間隔を設定する。
1. スクリプトプロパティとして下記を設定する。
    - SLACK_ACCESS_TOKEN
        - GAS から Slack API を操作するためのトークンを設定する
    - SLACK_BOT_NAME
        - Slack で発言する際の Bot 名を設定する
    - SLACK_CHANNEL_ID
        - Slack で発言する先の Channel 名を設定する
    - SPREADSHEET_URL_OF_MEMBER_LIST
        - メンバーリストを記録した Google SpreadSheet の URL を設定する (メンバーリストは１列で記述する。先頭行はヘッダ行)
    - SPREADSHEET_NAME_OF_MEMBER_LIST
        - メンバーリストを記録した Google SpreadSheet の sheet 名を設定する

# TODO

- [ ] 担当者へメンションを飛ばす
- [ ] 担当リストから一時的に除外する方法を用意する
