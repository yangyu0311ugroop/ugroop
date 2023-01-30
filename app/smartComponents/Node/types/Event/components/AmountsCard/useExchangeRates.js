import useSWR from 'swr';

const CONVERT_API = (base, symbols = []) =>
  `https://data.fixer.io/api/latest?access_key=${process.env.FIXER_API_KEY ||
    'd0d8b21ad8b24de6fadc97f0f45bdbd9'}&base=${base}&symbols=${symbols.join(
    ',',
  )}`;
const fetcher = query => fetch(query).then(res => res.json());

const useExchangeRates = (call, base, symbols) =>
  useSWR(
    call && base && symbols.length > 0
      ? [CONVERT_API(base, symbols), base, symbols]
      : null,
    fetcher,
  );

export default useExchangeRates;
