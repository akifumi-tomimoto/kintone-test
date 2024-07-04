import userEnv from 'userEnv';

(() => {
  'use strict';
  kintone.events.on('app.record.index.show', (event) => {
    // ログインユーザーのコードを取得
    const loginUser = kintone.getLoginUser().code;
    const app1ID = userEnv.appIds.app1

    // ログインユーザーに応じた処理をここに記述
    kintone.app.getHeaderSpaceElement().textContent = `こんにちは！${loginUser}はログインしました!app1IDは${app1ID}です!`;
    return event;
  });
})();