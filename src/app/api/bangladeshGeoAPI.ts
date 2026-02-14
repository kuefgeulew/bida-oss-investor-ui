/**
 * Bangladesh Geo API Integration
 * 
 * Real API from: https://github.com/rdnasim/bangla-apis
 * Base URL: https://bdapis.com/api/v2.0
 * 
 * Available Endpoints:
 * - GET /geo/v2.0/divisions - Get all divisions
 * - GET /geo/v2.0/districts - Get all districts
 * - GET /geo/v2.0/districts/{division_id} - Get districts by division
 * - GET /geo/v2.0/upazilas - Get all upazilas
 * - GET /geo/v2.0/upazilas/{district_id} - Get upazilas by district
 * - GET /geo/v2.0/unions/{upazila_id} - Get unions by upazila
 */

const BASE_URL = 'https://bdapis.com/api/v2.0';

export interface Division {
  _id: string;
  id: string;
  division: string;
  divisionbn: string;
  coordinates: string;
}

export interface District {
  _id: string;
  id: string;
  district: string;
  districtbn: string;
  division_id: string;
  coordinates: string;
}

export interface Upazila {
  _id: string;
  id: string;
  upazila: string;
  upazilabn: string;
  district_id: string;
  coordinates: string;
}

export interface Union {
  _id: string;
  id: string;
  union: string;
  unionbn: string;
  upazila_id: string;
}

/**
 * Fetch all divisions of Bangladesh
 */
export async function getDivisions(): Promise<Division[]> {
  try {
    const response = await fetch(`${BASE_URL}/geo/v2.0/divisions`);
    if (!response.ok) {
      throw new Error('Failed to fetch divisions');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching divisions:', error);
    // Return mock data as fallback
    return getMockDivisions();
  }
}

/**
 * Fetch all districts of Bangladesh
 */
export async function getDistricts(): Promise<District[]> {
  try {
    const response = await fetch(`${BASE_URL}/geo/v2.0/districts`);
    if (!response.ok) {
      throw new Error('Failed to fetch districts');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching districts:', error);
    return getMockDistricts();
  }
}

/**
 * Fetch districts by division ID
 */
export async function getDistrictsByDivision(divisionId: string): Promise<District[]> {
  try {
    const response = await fetch(`${BASE_URL}/geo/v2.0/districts/${divisionId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch districts for division ${divisionId}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching districts for division ${divisionId}:`, error);
    return getMockDistricts().filter(d => d.division_id === divisionId);
  }
}

/**
 * Fetch all upazilas of Bangladesh
 */
export async function getUpazilas(): Promise<Upazila[]> {
  try {
    const response = await fetch(`${BASE_URL}/geo/v2.0/upazilas`);
    if (!response.ok) {
      throw new Error('Failed to fetch upazilas');
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching upazilas:', error);
    return getMockUpazilas();
  }
}

/**
 * Fetch upazilas by district ID
 */
export async function getUpazilasByDistrict(districtId: string): Promise<Upazila[]> {
  try {
    const response = await fetch(`${BASE_URL}/geo/v2.0/upazilas/${districtId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch upazilas for district ${districtId}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching upazilas for district ${districtId}:`, error);
    return getMockUpazilas().filter(u => u.district_id === districtId);
  }
}

/**
 * Fetch unions by upazila ID
 */
export async function getUnionsByUpazila(upazilaId: string): Promise<Union[]> {
  try {
    const response = await fetch(`${BASE_URL}/geo/v2.0/unions/${upazilaId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch unions for upazila ${upazilaId}`);
    }
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error(`Error fetching unions for upazila ${upazilaId}:`, error);
    return getMockUnions().filter(u => u.upazila_id === upazilaId);
  }
}

// ==================== MOCK DATA FALLBACKS ====================

function getMockDivisions(): Division[] {
  return [
    { _id: '1', id: '1', division: 'Chattagram', divisionbn: 'চট্টগ্রাম', coordinates: '22.3569,91.7832' },
    { _id: '2', id: '2', division: 'Rajshahi', divisionbn: 'রাজশাহী', coordinates: '24.3745,88.6042' },
    { _id: '3', id: '3', division: 'Khulna', divisionbn: 'খুলনা', coordinates: '22.8456,89.5403' },
    { _id: '4', id: '4', division: 'Barisal', divisionbn: 'বরিশাল', coordinates: '22.7010,90.3535' },
    { _id: '5', id: '5', division: 'Sylhet', divisionbn: 'সিলেট', coordinates: '24.8949,91.8687' },
    { _id: '6', id: '6', division: 'Dhaka', divisionbn: 'ঢাকা', coordinates: '23.8103,90.4125' },
    { _id: '7', id: '7', division: 'Rangpur', divisionbn: 'রংপুর', coordinates: '25.7439,89.2752' },
    { _id: '8', id: '8', division: 'Mymensingh', divisionbn: 'ময়মনসিংহ', coordinates: '24.7471,90.4203' }
  ];
}

function getMockDistricts(): District[] {
  return [
    { _id: '1', id: '1', district: 'Dhaka', districtbn: 'ঢাকা', division_id: '6', coordinates: '23.8103,90.4125' },
    { _id: '2', id: '2', district: 'Gazipur', districtbn: 'গাজীপুর', division_id: '6', coordinates: '24.0022,90.4264' },
    { _id: '3', id: '3', district: 'Narayanganj', districtbn: 'নারায়ণগঞ্জ', division_id: '6', coordinates: '23.6238,90.4995' },
    { _id: '4', id: '4', district: 'Chattogram', districtbn: 'চট্টগ্রাম', division_id: '1', coordinates: '22.3569,91.7832' },
    { _id: '5', id: '5', district: 'Cox\'s Bazar', districtbn: 'কক্সবাজার', division_id: '1', coordinates: '21.4272,92.0058' },
    { _id: '6', id: '6', district: 'Khulna', districtbn: 'খুলনা', division_id: '3', coordinates: '22.8456,89.5403' },
    { _id: '7', id: '7', district: 'Rajshahi', districtbn: 'রাজশাহী', division_id: '2', coordinates: '24.3745,88.6042' },
    { _id: '8', id: '8', district: 'Sylhet', districtbn: 'সিলেট', division_id: '5', coordinates: '24.8949,91.8687' },
    { _id: '9', id: '9', district: 'Barisal', districtbn: 'বরিশাল', division_id: '4', coordinates: '22.7010,90.3535' },
    { _id: '10', id: '10', district: 'Rangpur', districtbn: 'রংপুর', division_id: '7', coordinates: '25.7439,89.2752' },
    { _id: '11', id: '11', district: 'Mymensingh', districtbn: 'ময়মনসিংহ', division_id: '8', coordinates: '24.7471,90.4203' }
  ];
}

function getMockUpazilas(): Upazila[] {
  return [
    { _id: '1', id: '1', upazila: 'Gulshan', upazilabn: 'গুলশান', district_id: '1', coordinates: '23.7808,90.4167' },
    { _id: '2', id: '2', upazila: 'Motijheel', upazilabn: 'মতিঝিল', district_id: '1', coordinates: '23.7331,90.4177' },
    { _id: '3', id: '3', upazila: 'Uttara', upazilabn: 'উত্তরা', district_id: '1', coordinates: '23.8759,90.3795' },
    { _id: '4', id: '4', upazila: 'Mirpur', upazilabn: 'মিরপুর', district_id: '1', coordinates: '23.8223,90.3654' },
    { _id: '5', id: '5', upazila: 'Agrabad', upazilabn: 'আগ্রাবাদ', district_id: '4', coordinates: '22.3322,91.8069' },
    { _id: '6', id: '6', upazila: 'Patenga', upazilabn: 'পতেঙ্গা', district_id: '4', coordinates: '22.2359,91.7989' },
    { _id: '7', id: '7', upazila: 'Kalurghat', upazilabn: 'কালুরঘাট', district_id: '4', coordinates: '22.3276,91.8116' }
  ];
}

function getMockUnions(): Union[] {
  return [
    { _id: '1', id: '1', union: 'Banani', unionbn: 'বনানী', upazila_id: '1' },
    { _id: '2', id: '2', union: 'Gulshan-1', unionbn: 'গুলশান-১', upazila_id: '1' },
    { _id: '3', id: '3', union: 'Gulshan-2', unionbn: 'গুলশান-২', upazila_id: '1' },
    { _id: '4', id: '4', union: 'Motijheel Commercial', unionbn: 'মতিঝিল বাণিজ্যিক', upazila_id: '2' },
    { _id: '5', id: '5', union: 'Dilkusha', unionbn: 'দিলকুশা', upazila_id: '2' }
  ];
}

/**
 * Utility function to get full location hierarchy
 */
export async function getFullLocationHierarchy(
  divisionId?: string,
  districtId?: string,
  upazilaId?: string
) {
  const result: {
    divisions: Division[];
    districts: District[];
    upazilas: Upazila[];
    unions: Union[];
  } = {
    divisions: [],
    districts: [],
    upazilas: [],
    unions: []
  };

  // Always fetch divisions
  result.divisions = await getDivisions();

  // Fetch districts if division is selected
  if (divisionId) {
    result.districts = await getDistrictsByDivision(divisionId);
  }

  // Fetch upazilas if district is selected
  if (districtId) {
    result.upazilas = await getUpazilasByDistrict(districtId);
  }

  // Fetch unions if upazila is selected
  if (upazilaId) {
    result.unions = await getUnionsByUpazila(upazilaId);
  }

  return result;
}

/**
 * Cache for API responses
 */
class GeoAPICache {
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private ttl: number = 1000 * 60 * 60; // 1 hour cache

  set(key: string, data: any) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  get(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    if (Date.now() - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

export const geoAPICache = new GeoAPICache();
