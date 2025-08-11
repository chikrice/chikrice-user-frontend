import { Helmet } from 'react-helmet-async';

import BMIView from 'src/sections/BMI/view';
// ----------------------------------------------------------------------

export default function BMI() {
  return (
    <>
      <Helmet>
        <title> Chikrice : BMI</title>
      </Helmet>

      <BMIView />
    </>
  );
}
