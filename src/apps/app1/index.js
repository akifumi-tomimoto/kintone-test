
(() => {
  'use strict';
  kintone.events.on('app.record.index.show', (event) => {
    // ログインユーザーのコードを取得
    const loginUser = kintone.getLoginUser().code;
    const app1ID = import.meta.env.VITE_APP1;

    // ログインユーザーに応じた処理をここに記述
    kintone.app.getHeaderSpaceElement().textContent = `こんにちは！${loginUser}はログインしました!app1IDは${app1ID}です!`;
    return event;
  });
})();