import { el, setChildren } from 'redom';
import logo from ".//assets/img/Pompeo.png";
import './styles/footer.scss';

function createSocials() {
  const menuEl = el('ul.footer__socials');

  const vk = el('a#vk.footer__socials-link', {
    href: 'https://vk.com/feed',
    target: '_blank',
    rel: 'noopener',
  }, 'Vkontakte');

  const insta = el('a#insta.footer__socials-link', {
    href: 'https://www.instagram.com',
    target: '_blank',
    rel: 'noopener',
  }, 'Instagram');

  const fb = el('a#fb.footer__socials-link', {
    href: 'https://ru-ru.facebook.com',
    target: '_blank',
    rel: 'noopener',
  }, 'Facebook');

  const socialNetworks = [vk, insta, fb];

  setChildren(menuEl, socialNetworks.map((item) => el(
    'li.footer__socials-item',
    item,
  )));

  return menuEl;
}

const containerEl = el('div.container.footer__container');

setChildren(containerEl, [
  el('img.header__logo', { src: logo }),
  createSocials(),
])

export default el('footer.footer', [
  containerEl
]);