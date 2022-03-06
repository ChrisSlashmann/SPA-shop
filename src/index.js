import { el, setChildren } from 'redom';
import Navigo from 'navigo';
import header from './header.js';
import footer from './footer.js';
import star from './assets/img/star-grey.svg';
import goldenStar from './assets/img/star-gold.svg';
import './styles/main.scss';

const router = new Navigo('/');

function catalogueList() {
  const body = el('div.loader', 'Loading...');

  fetch('https://fakestoreapi.com/products').then(async (res) => {
    const data = await res.json();

    const ul = el('ul.store__products');

    setChildren(ul, data.map((product) => el(
      'li.store__products-item', [
        el('div.store__products-wrapper-img', [
          el('img.store__products-img', { src: product.image }),
        ]),
        el('div.store__products-wrapper-text', [
          el('p.price.store__products-price', `${product.price} $`),
          el('a.store__products-link', {
            href: `/product/${product.id}`,
            onclick(e) {
              e.preventDefault();
              router.navigate(e.target.getAttribute('href'));
            },
          }, product.title),
        ]),
        
      ]
    )));

    // setChildren(ul, data.map((product) => el(
    //   'li.store__products-item', [
    //     el('a.store__products-link', {
    //       href: `/product/${product.id}`,
    //       onclick(e) {
    //         e.preventDefault();
    //         router.navigate(e.target.getAttribute('href'));
    //       },
    //     }, [
    //       el('div.store__products-wrapper-img', [
    //         el('img.store__products-img', { src: product.image }),
    //       ]),
    //       el('p.store__products-text', product.title),
    //       ]),
    //     ], product.title
    // )));

    body.innerHTML = '';
    body.classList.remove('loader');
    body.classList.add('store');

    setChildren(body, ul);
  });

  return el('div.container', [
    el('h1.title', 'Our online store'),
    body,
  ]);
}



function rate(rating, list) {
  let fullRate;
  let decimal = Number('0.' + String(rating).slice(2));
  
  if ( decimal >= 0.5) { 
    fullRate = Math.ceil(rating)
  } else fullRate = Math.floor(rating);
  
  for (let i = 0; i < fullRate; i++) {
    list.childNodes[i].setAttribute('src', goldenStar);
  }
}

function createRating(rating) {
  const ratingEl = el('div.product__info-rating', [
    el('img', { src: star }),
    el('img', { src: star }),
    el('img', { src: star }),
    el('img', { src: star }),
    el('img', { src: star })
  ])
  
  rate(rating, ratingEl);

  return ratingEl;
}

function catalogueDetails(id) {
  const body = el('div', 'Loading...');

  fetch(`https://fakestoreapi.com/products/${id}`).then(async (res) => {
    const data = await res.json();

    body.innerHTML = '';

    const backBtnEl = el('a.product__back', {
      href: '/',
      onclick(e) {
        e.preventDefault();
        router.navigate(e.target.getAttribute('href'));
      },
    }, 'Back to List');

    const productTitleEl = el('h1.product__title', data.title);

    const categoryEl = el('a.product__category', `Category: ${data.category}`);

    const productInfoWrapperEl = el('div.product__info', [
      el('img.product__info-img', {
        src: data.image,
        alt: data.title,
      }),
      el('div.product__info-wrapper', [
        el('p.price.product__info-price', `${data.price} $`),
        createRating(data.rating.rate),
        el('p.product__category', `Количество отзывов: ${data.rating.count}`)
      ])
    ]);
    
    const descriptionEl = el('p.product__info-desc', data.description);

    setChildren(body, [backBtnEl, productTitleEl, categoryEl, productInfoWrapperEl, descriptionEl]);
  });

  return el('div.container.product', [
    body,
  ]);
}

const main = el('main');
setChildren(window.document.body, [
  header, 
  main,
  footer
]);

router.on('/', () => {
  setChildren(main, catalogueList());
});

router.on('/product/:id', ({ data: { id } }) => {
  setChildren(main, catalogueDetails(id));
});

router.resolve();
