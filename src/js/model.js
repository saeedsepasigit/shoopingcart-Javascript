const products = [
  {
    id: 0,
    name: 'Iphone 14 Pro Max',
    description:
      'iPhone 13 Pro takes a huge leap forward, bringing incredible speed to everything you do and dramatic new photo and video capabilities.',
    image:
      'https://assets.swappie.com/cdn-cgi/image/width=600,height=600,fit=contain,format=auto/swappie-iphone-13-pro-max-sierra-blue-back.png?v=5',
    price: 699,
    color: 'blue',
    category: 'Smart Phone',
  },
  {
    id: 1,
    name: 'MacBook Air',
    description:
      'MacBook Air with M1 is an incredibly portable laptop — it’s nimble and quick, with a silent, fanless design and a beautiful Retina display.',
    image:
      'https://www.pngkey.com/png/full/46-464516_macbook-air-support-mac-os-mojave-dark-mode.png',
    price: 1199,
    color: 'gray',
    category: 'Laptop',
  },
  {
    id: 2,
    name: 'AirPods 3rd Generation',
    description:
      'Spatial audio with dynamic head tracking places sounds all around you to create a three-dimensional listening experience for music TV shows, movies, and more.',
    image:
      'https://www.pngmart.com/files/13/Airpods-Transparent-Images-PNG.png',
    price: 549,
    color: 'white',
    category: 'Headphone',
  },
  {
    id: 3,
    name: 'Apple Watch Series 7',
    description:
      'The larger display enhances the entire experience making Apple Watch easier to use and read. Series 7 represents our biggest and brightest thinking.',
    image:
      'https://res.cloudinary.com/grover/image/upload/e_trim/f_auto,q_auto/v1600694108/zb3ues5m4bgizsgy6lkx.png',
    price: 279,
    color: 'white',
    category: 'Watch',
  },
];

export const Products = function () {
  return products;
};
