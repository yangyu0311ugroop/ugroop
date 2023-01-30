import get from 'lodash/get';
import { useEffect, useState } from 'react';

const useSymbols = (base, data) => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    if (data) {
      const costs = get(data, 'costs.edges', []);

      setSymbols(
        costs.reduce((accu, cost) => {
          const nodeCurrency = get(cost, ['node', 'currency']);

          if (!nodeCurrency || nodeCurrency === base) return accu;

          if (accu.indexOf(nodeCurrency) !== -1) return accu;

          return accu.concat(nodeCurrency);
        }, []),
      );
    }
  }, [base, data]);

  return symbols;
};

export default useSymbols;
