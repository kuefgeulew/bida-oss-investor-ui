import axios from 'axios';

// ============================================
// REST COUNTRIES API
// ============================================

export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string; // 2-letter code
  cca3: string; // 3-letter code
  currencies: {
    [code: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones: string[];
  flag: string;
  flags: {
    png: string;
    svg: string;
  };
  capital: string[];
  region: string;
  subregion: string;
  languages: {
    [code: string]: string;
  };
  population: number;
  latlng: [number, number];
}

export const countriesAPI = {
  async getAllCountries(): Promise<Country[]> {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all');
      return response.data;
    } catch (error) {
      console.error('Failed to fetch countries:', error);
      return [];
    }
  },

  async getCountryByCode(code: string): Promise<Country | null> {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      return response.data[0];
    } catch (error) {
      console.error('Failed to fetch country:', error);
      return null;
    }
  },

  async searchCountries(name: string): Promise<Country[]> {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
      return response.data;
    } catch (error) {
      console.error('Failed to search countries:', error);
      return [];
    }
  },

  getCurrencySymbol(country: Country): string {
    const currencies = Object.values(country.currencies || {});
    return currencies[0]?.symbol || '$';
  },

  getPrimaryCurrency(country: Country): string {
    const currencies = Object.keys(country.currencies || {});
    return currencies[0] || 'USD';
  },

  getTimezone(country: Country): string {
    return country.timezones[0] || 'UTC';
  }
};

// ============================================
// EXCHANGE RATES API
// ============================================

export interface ExchangeRates {
  base: string;
  date: string;
  rates: {
    [currency: string]: number;
  };
}

export const exchangeRatesAPI = {
  async getLatestRates(base: string = 'USD'): Promise<ExchangeRates | null> {
    try {
      const response = await axios.get(`https://api.exchangerate.host/latest?base=${base}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      return null;
    }
  },

  async convert(amount: number, from: string, to: string): Promise<number | null> {
    try {
      const response = await axios.get(
        `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
      );
      return response.data.result;
    } catch (error) {
      console.error('Failed to convert currency:', error);
      return null;
    }
  },

  async getHistoricalRates(date: string, base: string = 'USD'): Promise<ExchangeRates | null> {
    try {
      const response = await axios.get(`https://api.exchangerate.host/${date}?base=${base}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch historical rates:', error);
      return null;
    }
  }
};

// ============================================
// HS CODE API (UK Trade Tariff)
// ============================================

export interface HSCode {
  id: string;
  description: string;
  goods_nomenclature_item_id: string;
  formatted_description: string;
}

export const hsCodeAPI = {
  async searchHSCode(query: string): Promise<HSCode[]> {
    try {
      const response = await axios.get(
        `https://www.trade-tariff.service.gov.uk/api/v2/commodities/search?q=${encodeURIComponent(query)}`
      );
      return response.data.data || [];
    } catch (error) {
      console.error('Failed to search HS codes:', error);
      return [];
    }
  },

  async getHSCodeDetails(code: string): Promise<any> {
    try {
      const response = await axios.get(
        `https://www.trade-tariff.service.gov.uk/api/v2/commodities/${code}`
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch HS code details:', error);
      return null;
    }
  }
};

// ============================================
// REVERSE GEOCODING (OpenStreetMap)
// ============================================

export interface GeocodingResult {
  place_id: number;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    road?: string;
    suburb?: string;
    city?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  boundingbox: string[];
}

export const geocodingAPI = {
  async reverseGeocode(lat: number, lon: number): Promise<GeocodingResult | null> {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
        {
          headers: {
            'User-Agent': 'BIDA-OSS-Platform'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to reverse geocode:', error);
      return null;
    }
  },

  async searchLocation(query: string): Promise<GeocodingResult[]> {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json`,
        {
          headers: {
            'User-Agent': 'BIDA-OSS-Platform'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to search location:', error);
      return [];
    }
  }
};

// ============================================
// WORLD BANK API
// ============================================

export interface WorldBankIndicator {
  indicator: {
    id: string;
    value: string;
  };
  country: {
    id: string;
    value: string;
  };
  countryiso3code: string;
  date: string;
  value: number;
  unit: string;
  decimal: number;
}

export const worldBankAPI = {
  // FDI Net Inflows
  async getFDIData(countryCode: string = 'BGD', years: number = 10): Promise<WorldBankIndicator[]> {
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/BX.KLT.DINV.CD.WD?format=json&per_page=${years}`
      );
      return response.data[1] || [];
    } catch (error) {
      console.error('Failed to fetch FDI data:', error);
      return [];
    }
  },

  // GDP Growth
  async getGDPGrowth(countryCode: string = 'BGD', years: number = 10): Promise<WorldBankIndicator[]> {
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json&per_page=${years}`
      );
      return response.data[1] || [];
    } catch (error) {
      console.error('Failed to fetch GDP growth:', error);
      return [];
    }
  },

  // Ease of Doing Business
  async getDoingBusinessRank(countryCode: string = 'BGD'): Promise<WorldBankIndicator[]> {
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/IC.BUS.EASE.XQ?format=json&per_page=5`
      );
      return response.data[1] || [];
    } catch (error) {
      console.error('Failed to fetch doing business data:', error);
      return [];
    }
  },

  // Population
  async getPopulation(countryCode: string = 'BGD'): Promise<WorldBankIndicator[]> {
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/SP.POP.TOTL?format=json&per_page=5`
      );
      return response.data[1] || [];
    } catch (error) {
      console.error('Failed to fetch population data:', error);
      return [];
    }
  },

  // Inflation Rate
  async getInflationRate(countryCode: string = 'BGD', years: number = 10): Promise<WorldBankIndicator[]> {
    try {
      const response = await axios.get(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/FP.CPI.TOTL.ZG?format=json&per_page=${years}`
      );
      return response.data[1] || [];
    } catch (error) {
      console.error('Failed to fetch inflation data:', error);
      return [];
    }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const currencyUtils = {
  async convertToLocal(amountUSD: number, targetCurrency: string): Promise<number> {
    const result = await exchangeRatesAPI.convert(amountUSD, 'USD', targetCurrency);
    return result || amountUSD;
  },

  async convertToBDT(amountUSD: number): Promise<number> {
    return await this.convertToLocal(amountUSD, 'BDT');
  },

  formatCurrency(amount: number, currency: string, locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }
};

export const locationUtils = {
  async getAddressFromCoordinates(lat: number, lon: number): Promise<string> {
    const result = await geocodingAPI.reverseGeocode(lat, lon);
    return result?.display_name || `${lat}, ${lon}`;
  },

  async getBangladeshLocation(query: string): Promise<GeocodingResult | null> {
    const results = await geocodingAPI.searchLocation(`${query}, Bangladesh`);
    return results[0] || null;
  }
};
