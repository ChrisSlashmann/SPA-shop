import { el, setChildren } from 'redom';
import Navigo from 'navigo';
import logo from ".//assets/img/Pompeo.png";
import './styles/header.scss';

const router = new Navigo('/');

function createNavigation() {
  const menuItems = ['Shop', 'About us', 'Contacts'];

  const navEl = el('nav.header__nav');
  const menuEl = el('ul.nav__menu');

  setChildren(menuEl, menuItems.map((item) => el(
    'li.nav__menu-item',
    el('a.nav__menu-link', {
      href: `#`,
      onclick(e) {
        e.preventDefault();
        router.navigate(e.target.getAttribute('href'));
      },
    }, item),
  )));

  menuEl.firstChild.firstChild.classList.add('active');

  setChildren(navEl, menuEl);

 return navEl;
}

const containerEl = el('div.container.header__container');

setChildren(containerEl, [
  el('img.header__logo', { src: logo }),
  createNavigation(),
])

// setChildren(containerEl, [
//   el('a', {
//     href: `/`,
//     onclick(e) {
//       e.preventDefault();
//       router.navigate(e.target.getAttribute('href'));
//     },
//   }, ' '),
//   createNavigation(),
// ])

export default el('header.header', [
  containerEl
]);

// router.on('/', () => {
//   setChildren(main, catalogueList());
// });

// router.on('/product/:id', ({ data: { id } }) => {
//   setChildren(main, catalogueDetails(id));
// });

// router.resolve();


    

    