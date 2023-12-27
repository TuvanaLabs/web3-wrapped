import './assets/css/App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import {} from 'react-router-dom';
import AdminLayout from './layouts/admin';
import {
  ChakraProvider,
  // extendTheme
} from '@chakra-ui/react';
import initialTheme from './theme/theme'; //  { themeGreen }
import { useState } from 'react';
// Chakra imports

import ReactGA from "react-ga4";

export default function Main() {

    const gaMeasurementID = process.env.REACT_APP_GA_MEASUREMENT_ID;
    // console.log(gaMeasurementID)
    ReactGA.initialize(gaMeasurementID);


    // eslint-disable-next-line
  const [currentTheme, setCurrentTheme] = useState(initialTheme);
  return (
    <ChakraProvider theme={currentTheme}>
        <Routes>
            <Route
              path="*"
              element={
                <AdminLayout theme={currentTheme} setTheme={setCurrentTheme} />
              }
            />
            <Route path="" element={<Navigate to="/home" replace />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
    </ChakraProvider>
  );
}
