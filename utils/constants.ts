const noNavbarPaths = ["/login", "/signup"];
const protectedPaths = ["/settings"];
const adminPaths = ["/settings"];

const navbarHeight = 72;
const footerHeight = 40;
const fixerHeight = 30;

const MENU_LIST = [
  { text: "Registro de inventario", href: "/" },
  { text: "Lista de Registro", href: "/record-list" },
  { text: "Log", href: "/log" },
  { text: "Configuración", href: "/settings" },
];

export {
  noNavbarPaths,
  protectedPaths,
  adminPaths,
  navbarHeight,
  footerHeight,
  fixerHeight,
  MENU_LIST,
};
