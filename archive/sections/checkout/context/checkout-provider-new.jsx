import PropTypes from 'prop-types';
import { useCallback, useMemo } from 'react';
import { addDays, formatISO } from 'date-fns';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { useLocalStorage } from 'src/hooks/use-local-storage';

import { CheckoutContext } from './checkout-context';

const STORAGE_KEY = 'checkout';
const DELIVERY_PRICE_PER_DAY = 10;
const PRODUCT_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

export const initialPlan = {
  type: '',
  title: '',
  subtitle: '',
  description: '',
  price: 0,
  mealsInDay: 0,
  snacksInDay: 0,
  imgSrc: '',
  discount: 0,

  //-------------
  daysCount: 0,
  mealsCount: 0,
  snacksCount: 0,
};

const initialState = {
  activeStep: 0,
  //-------------
  details: initialPlan,
  //-------------
  subTotal: 0,
  totalPrice: 0,
  totalDiscount: 0,
  totalDiscountedPrice: 0,
  billing: null,
  status: 'pending',
  //-------------
  deliveryPrice: {
    total: 0,
    perDay: 0,
  },
  deliveryDate: {
    from: null,
    to: null,
  },
};

export function CheckoutProvider({ children }) {
  const router = useRouter();

  const { state, update, reset } = useLocalStorage(STORAGE_KEY, initialState);

  // UPDATE DELIVERY DATE
  const onUpdateDeliveryDate = useCallback(
    (daysCount, from) => {
      const startDate = from ? from : formatISO(addDays(new Date(), 1));
      const to = formatISO(addDays(new Date(startDate), daysCount));
      update('deliveryDate', { from: startDate, to });
    },
    [update]
  );

  // ADD TO CART
  const onAddToCart = useCallback(
    (newItem) => {
      const { daysCount, price, discount } = newItem;

      // Plan Details
      update('details', newItem);

      // Total Discount
      update('totalDiscount', discount);

      // apply discount
      //! this is pending

      // Subtotal
      update('subTotal', price);

      // Delivery Price
      const totalDeliveryPrice = daysCount * DELIVERY_PRICE_PER_DAY;
      const deliveryPrice = { total: totalDeliveryPrice, perDay: DELIVERY_PRICE_PER_DAY };
      update('deliveryPrice', deliveryPrice);

      // Total Price
      update('totalPrice', price + deliveryPrice.total);

      onUpdateDeliveryDate(daysCount);

      router.push(paths.checkout.root);
    },
    [update, router, onUpdateDeliveryDate]
  );

  // APPLY DISCOUNT
  const onApplyDiscount = useCallback(
    (discount) => {
      update('totalDiscount', discount);
    },
    [update]
  );

  // STEPS NAVIGATION
  const onBackStep = useCallback(() => {
    update('activeStep', state.activeStep - 1);
  }, [update, state.activeStep]);

  const onNextStep = useCallback(() => {
    update('activeStep', state.activeStep + 1);
  }, [update, state.activeStep]);

  const onGotoStep = useCallback(
    (step) => {
      update('activeStep', step);
    },
    [update]
  );

  // SELECT ADDRESS
  const onCreateBilling = useCallback(
    (address) => {
      update('billing', address);

      onNextStep();
    },
    [onNextStep, update]
  );

  const completed = state.activeStep === PRODUCT_CHECKOUT_STEPS.length;

  // COMPLETE ORDER
  const onCompleteOrder = useCallback(() => {
    update('activeStep', 3);
  }, [update]);

  // RESET STEPS
  const onReset = useCallback(() => {
    reset();
    router.replace(paths.dashboard);
  }, [router, reset]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      completed,
      //
      onAddToCart,
      //
      onApplyDiscount,
      onCreateBilling,
      onUpdateDeliveryDate,
      //
      onBackStep,
      onNextStep,
      onGotoStep,
      //
      onCompleteOrder,
      onReset,
    }),
    [
      completed,
      onAddToCart,
      onApplyDiscount,
      onCreateBilling,
      onUpdateDeliveryDate,
      onBackStep,
      onNextStep,
      onGotoStep,
      onCompleteOrder,
      onReset,
      state,
    ]
  );

  return <CheckoutContext.Provider value={memoizedValue}>{children}</CheckoutContext.Provider>;
}

CheckoutProvider.propTypes = {
  children: PropTypes.node,
};
