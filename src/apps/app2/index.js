const events = ['app.record.create.show', 'app.record.edit.show'];
kintone.events.on(events, event => {
  // Hello Worldを表示する
  const el = kintone.app.record.getHeaderMenuSpaceElement();
  const hello = 'hello';
  const world = 'world!';
  const message = {
    hello,
    world
  };
  const copied = Object.assign({}, message);
  el.innerHTML = `<div>${copied.hello} ${copied.world}!</div>`;
});