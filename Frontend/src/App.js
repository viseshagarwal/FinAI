// import { useState, useEffect, useMemo } from "react";

// // react-router components
// import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";

// // @mui material components
// import { ThemeProvider } from "@mui/material/styles";
// import CssBaseline from "@mui/material/CssBaseline";
// import Icon from "@mui/material/Icon";

// // Soft UI Dashboard React components
// import SoftBox from "components/SoftBox";

// // Soft UI Dashboard React examples
// import Sidenav from "examples/Sidenav";
// import Configurator from "examples/Configurator";

// // Soft UI Dashboard React themes
// import theme from "assets/theme";
// import themeRTL from "assets/theme/theme-rtl";

// // RTL plugins
// import rtlPlugin from "stylis-plugin-rtl";
// import { CacheProvider } from "@emotion/react";
// import createCache from "@emotion/cache";

// // Soft UI Dashboard React routes
// import routes from "routes";

// // Soft UI Dashboard React contexts
// import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// // Images
// import brand from "assets/images/logo2.png";

// import Cookies from "js-cookie";

// export default function App() {
//   const [controller, dispatch] = useSoftUIController();
//   const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
//   const [onMouseEnter, setOnMouseEnter] = useState(false);
//   const [rtlCache, setRtlCache] = useState(null);
//   const { pathname } = useLocation();
//   const navigate = useNavigate();

//   // Check for the presence of 'id' cookie and redirect if missing or if value is 0
//   useEffect(() => {
//     const idCookie = Cookies.get("id");
//     if (!idCookie || idCookie === "0") {
//       navigate("/authentication/sign-in");
//     }
//   }, []);

//   // Cache for the rtl
//   useMemo(() => {
//     const cacheRtl = createCache({
//       key: "rtl",
//       stylisPlugins: [rtlPlugin],
//     });

//     setRtlCache(cacheRtl);
//   }, []);

//   // Open sidenav when mouse enter on mini sidenav
//   const handleOnMouseEnter = () => {
//     if (miniSidenav && !onMouseEnter) {
//       setMiniSidenav(dispatch, false);
//       setOnMouseEnter(true);
//     }
//   };

//   // Close sidenav when mouse leave mini sidenav
//   const handleOnMouseLeave = () => {
//     if (onMouseEnter) {
//       setMiniSidenav(dispatch, true);
//       setOnMouseEnter(false);
//     }
//   };

//   // Change the openConfigurator state
//   const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

//   // Setting the dir attribute for the body element
//   useEffect(() => {
//     document.body.setAttribute("dir", direction);
//   }, [direction]);

//   // Setting page scroll to 0 when changing the route
//   useEffect(() => {
//     document.documentElement.scrollTop = 0;
//     document.scrollingElement.scrollTop = 0;
//   }, [pathname]);

//   const getRoutes = (allRoutes) =>
//     allRoutes.map((route) => {
//       if (route.collapse) {
//         return getRoutes(route.collapse);
//       }

//       if (route.route) {
//         return <Route exact path={route.route} element={route.component} key={route.key} />;
//       }

//       return null;
//     });

//   // const configsButton = (
//   //   <SoftBox
//   //     display="flex"
//   //     justifyContent="center"
//   //     alignItems="center"
//   //     width="3.5rem"
//   //     height="3.5rem"
//   //     bgColor="white"
//   //     shadow="sm"
//   //     borderRadius="50%"
//   //     position="fixed"
//   //     right="2rem"
//   //     bottom="2rem"
//   //     zIndex={99}
//   //     color="dark"
//   //     sx={{ cursor: "pointer" }}
//   //     onClick={handleConfiguratorOpen}
//   //   >
//   //     <Icon fontSize="default" color="inherit">
//   //       settings
//   //     </Icon>
//   //   </SoftBox>
//   // );
//   const configsButton = null;

//   return direction === "rtl" ? (
//     <CacheProvider value={rtlCache}>
//       <ThemeProvider theme={themeRTL}>
//         <CssBaseline />
//         {layout === "dashboard" && (
//           <>
//             <Sidenav
//               color={sidenavColor}
//               brand={brand}
//               brandName=""
//               routes={routes}
//               onMouseEnter={handleOnMouseEnter}
//               onMouseLeave={handleOnMouseLeave}
//             />
//             <Configurator />
//             {configsButton}
//           </>
//         )}
//         {layout === "vr" && <Configurator />}
//         <Routes>
//           {getRoutes(routes)}
//           <Route path="*" element={<Navigate to="/dashboard" />} />
//         </Routes>
//       </ThemeProvider>
//     </CacheProvider>
//   ) : (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {layout === "dashboard" && (
//         <>
//           <Sidenav
//             color={sidenavColor}
//             brand={brand}
//             brandName=""
//             routes={routes}
//             onMouseEnter={handleOnMouseEnter}
//             onMouseLeave={handleOnMouseLeave}
//           />
//           <Configurator />
//           {configsButton}
//         </>
//       )}
//       {layout === "vr" && <Configurator />}
//       <Routes>
//         {getRoutes(routes)}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </ThemeProvider>
//   );
// }
import { useState, useEffect, useMemo } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import Cookies from "js-cookie";
import brand from "assets/images/logo2.png";

// Place the brand variable declaration after importing other necessary components
// Replace "Your Brand Name" with the actual name of your brand

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //const brand = "Your Brand Name";
  // Check for the presence of 'id' cookie and redirect if missing or if value is 0
  useEffect(() => {
    const idCookie = Cookies.get("id");
    if (!idCookie || idCookie === "0") {
      navigate("/authentication/sign-in");
    }
  }, []);

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = null;

  const filteredRoutes = routes.filter((route) => {
    if (route.name === "Sign In" || route.name === "Sign Up") {
      return !Cookies.get("id"); // Hide "Sign In" and "Sign Up" routes if 'id' cookie is present
    }
    return true;
  });

  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && (
          <>
            <Sidenav
              color={sidenavColor}
              brand={brand}
              brandName=""
              routes={filteredRoutes} // Render filtered routes in the Sidenav
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
            <Configurator />
            {configsButton}
          </>
        )}
        {layout === "vr" && <Configurator />}
        <Routes>
          {getRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName=""
            routes={filteredRoutes} // Render filtered routes in the Sidenav
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}
