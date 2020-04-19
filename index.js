let fruits = [
  {id: 1, title: 'Apple', price: 10, img: 'img/apple.jpg'},
  {id: 2, title: 'Orange', price: 20, img: 'img/orange.jpg'},
  {id: 3, title: 'Mango', price: 30, img: 'img/mango.jpg'}
];

const toHTML = fruit => `
    <div class="col">
      <div class="card">
        <img src="${fruit.img}" class="card-img-top" style="height: 300px;">
        <div class="card-body">
          <h5 class="card-title">${fruit.title}</h5>
          <a href="#" data-btn="price" data-id="${fruit.id}" class="btn btn-primary">View price</a>
          <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Remove</a>
        </div>
      </div>
    </div>
 `;

function render() {
  const html = fruits.map(toHTML);
  document.getElementById('fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
  title: 'Price',
  closable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Cancel', type: 'secondary', handler() {
        console.log('Danger btn clicked');
        priceModal.close()
      }
    }
  ]
});

document.addEventListener('click', event => {
  event.preventDefault();
  //+ because we getting string from html instead of integer
  const id = +event.target.dataset.id;
  const btnType = event.target.dataset.btn;
  const fruit = fruits.find( f => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(`<p>Price for ${fruit.title} is <strong>${fruit.price}$</strong></p>`);
    priceModal.open()
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Are you sure?',
      content: `<p>You are deleting: <strong>${fruit.title}</strong></p>`,
    }).then(() => {
      fruits = fruits.filter(fruit => fruit.id !== id);
      render();
    }).catch(() => {
      console.log('Cancel')
    })
  }
});
