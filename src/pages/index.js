import { lazy } from "react";

export const ActiveUsers = lazy(() => import("./activeUsers/activeUsers"));
export const ActiveAdmins = lazy(() => import("./activeUsers/activeAdmins"));
export const ActiveSubAdmins = lazy(() =>
  import("./activeUsers/activeSubAdmins")
);
export const NonActiveUsers = lazy(() =>
  import("./nonActiveUsers/nonActiveUsers")
);
export const NonActiveAdmins = lazy(() =>
  import("./nonActiveUsers/nonActiveAdmins")
);
export const NonActiveSubAdmins = lazy(() =>
  import("./nonActiveUsers/nonActiveSubAdmin")
);
// export const ActiveProducts = lazy(() => import("./pruducts/activeProduct"));
// export const DisActiveProducts = lazy(() =>
//   import("./pruducts/DisActiveProducts")
// );

export const MarketBaner = lazy(() => import("./market-carusel/m-baner"));
export const MarketCarousel = lazy(() => import("./market-carusel/m-carusel"));
export const MarketCardCarousel = lazy(() =>
  import("./market-carusel/m-card-carusel")
);

export const CategoriesOfMarkets = lazy(() =>
  import("./market/categoryOfMarkets")
);
export const Markets = lazy(() => import("./market/markets"));

export const Category = lazy(() => import("./category/category"));
export const SubCategory = lazy(() => import("./category/subcategory"));
export const Brands = lazy(() => import("./category/brand"));
export const NotFound = lazy(() => import("./404/404"));
export const Login = lazy(() => import("./login/login"));

export const Product = lazy(() => import("./products/product"));
