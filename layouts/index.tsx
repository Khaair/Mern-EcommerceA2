import React from "react";
import Header from "./header/index";
import Footer from "./footer/index";

const Layout = ({ children }: any) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};
export default Layout;
