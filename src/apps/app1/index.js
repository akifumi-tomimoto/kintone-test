(() => {
  'use strict';
  kintone.events.on('app.record.index.show', (event) => {
    // ログインユーザーのコードを取得
    const loginUser = kintone.getLoginUser().code;

    // ログインユーザーに応じた処理をここに記述
    kintone.app.getHeaderSpaceElement().textContent = `こんにちは！${loginUser}はログインしました!githubへのpushで更新確認`;
    return event;
  });
})();