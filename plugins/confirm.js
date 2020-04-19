$.confirm = function (options) {
  return new Promise((resolse, reject) => {
    const modal = $.modal({
      title: options.title,
      width: '400px',
      content: options.content,
      onClose() {
        modal.destroy()
      },
      footerButtons: [
        {
          text: 'Cancel', type: 'secondary', handler() {
            modal.close();
            reject()
          }
        },
        {
          text: 'Delete', type: 'danger', handler() {
            modal.close();
            resolse()
          }
        }
      ]
    });
    setTimeout(() => modal.open(), 100)
  })
};
