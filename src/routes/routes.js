import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  ActiveUsers,
  NonActiveUsers,
  NotFound,
  Category,
  Login,
  ActiveProducts,
  DisActiveProducts,
  MarketBaner,
  MarketCarousel,
  MarketCardCarousel,
  ActiveAdmins,
  ActiveSubAdmins,
  NonActiveSubAdmins,
  NonActiveAdmins,
  CategoriesOfMarkets,
  Markets,
  SubCategory,
  Product,
  Brands,
} from "../pages/index";
import ScrollIntoView from "./ScrollIntoView";
import Loading from "../components/loading";
const PrivateRoute = lazy(() => import("./PrivateRoute"));

const App = () => {
  return (
    <BrowserRouter>
      <ScrollIntoView>
        <Suspense fallback={<Loading />}>
          <Switch>
            <PrivateRoute
              restricted={false}
              component={ActiveUsers}
              path="/orders"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={ActiveUsers}
              path="/ActiveUsers"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={ActiveAdmins}
              path="/ActiveAdmins"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={ActiveSubAdmins}
              path="/ActiveSubAdmins"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={NonActiveUsers}
              path="/DisActiveUsers"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={NonActiveUsers}
              path="/nonActiveUsers"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={NonActiveAdmins}
              path="/DisActiveAdmins"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={NonActiveSubAdmins}
              path="/DisActiveSubAdmins"
              exact
            />
            {/* 
            <PrivateRoute
              restricted={false}
              component={ActiveProducts}
              path="/ActiveProducts"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={DisActiveProducts}
              path="/DisActiveProducts"
              exact
            /> */}

            <PrivateRoute
              restricted={false}
              component={MarketBaner}
              path="/m-baner"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={MarketCarousel}
              path="/m-carusel"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={MarketCardCarousel}
              path="/card-carusel"
              exact
            />

            <PrivateRoute
              restricted={false}
              component={CategoriesOfMarkets}
              path="/CategoriesOfMarkets"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Markets}
              path="/markets"
              exact
            />

            <PrivateRoute
              restricted={false}
              component={Category}
              path="/category"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={Brands}
              path="/brands"
              exact
            />
            <PrivateRoute
              restricted={false}
              component={SubCategory}
              path="/subcategory"
              exact
            />

            <PrivateRoute
              restricted={false}
              component={Product}
              path="/products"
              exact
            />

            <Route component={Login} path="/login" exact />

            <Route path="/" component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Suspense>
      </ScrollIntoView>
    </BrowserRouter>
  );
};

export default App;
