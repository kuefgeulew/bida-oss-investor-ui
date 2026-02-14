import { useState, useEffect } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import {
  getDivisions,
  getDistrictsByDivision,
  getUpazilasByDistrict,
  getUnionsByUpazila,
  Division,
  District,
  Upazila,
  Union
} from '@/app/api/bangladeshGeoAPI';
import { Label } from '@/app/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';

interface BangladeshLocationSelectorProps {
  onLocationChange?: (location: {
    division?: Division;
    district?: District;
    upazila?: Upazila;
    union?: Union;
  }) => void;
  showUnion?: boolean;
  required?: boolean;
  label?: string;
  className?: string;
}

export function BangladeshLocationSelector({
  onLocationChange,
  showUnion = false,
  required = false,
  label = 'Business Location',
  className = ''
}: BangladeshLocationSelectorProps) {
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [upazilas, setUpazilas] = useState<Upazila[]>([]);
  const [unions, setUnions] = useState<Union[]>([]);

  const [selectedDivision, setSelectedDivision] = useState<Division | undefined>();
  const [selectedDistrict, setSelectedDistrict] = useState<District | undefined>();
  const [selectedUpazila, setSelectedUpazila] = useState<Upazila | undefined>();
  const [selectedUnion, setSelectedUnion] = useState<Union | undefined>();

  const [loading, setLoading] = useState({
    divisions: false,
    districts: false,
    upazilas: false,
    unions: false
  });

  // Load divisions on mount
  useEffect(() => {
    loadDivisions();
  }, []);

  // Notify parent of location changes
  useEffect(() => {
    if (onLocationChange) {
      onLocationChange({
        division: selectedDivision,
        district: selectedDistrict,
        upazila: selectedUpazila,
        union: selectedUnion
      });
    }
  }, [selectedDivision, selectedDistrict, selectedUpazila, selectedUnion, onLocationChange]);

  async function loadDivisions() {
    setLoading(prev => ({ ...prev, divisions: true }));
    try {
      const data = await getDivisions();
      setDivisions(data);
    } catch (error) {
      console.error('Failed to load divisions:', error);
    } finally {
      setLoading(prev => ({ ...prev, divisions: false }));
    }
  }

  async function handleDivisionChange(divisionId: string) {
    const division = divisions.find(d => d.id === divisionId);
    setSelectedDivision(division);
    setSelectedDistrict(undefined);
    setSelectedUpazila(undefined);
    setSelectedUnion(undefined);
    setDistricts([]);
    setUpazilas([]);
    setUnions([]);

    if (division) {
      setLoading(prev => ({ ...prev, districts: true }));
      try {
        const data = await getDistrictsByDivision(division.id);
        setDistricts(data);
      } catch (error) {
        console.error('Failed to load districts:', error);
      } finally {
        setLoading(prev => ({ ...prev, districts: false }));
      }
    }
  }

  async function handleDistrictChange(districtId: string) {
    const district = districts.find(d => d.id === districtId);
    setSelectedDistrict(district);
    setSelectedUpazila(undefined);
    setSelectedUnion(undefined);
    setUpazilas([]);
    setUnions([]);

    if (district) {
      setLoading(prev => ({ ...prev, upazilas: true }));
      try {
        const data = await getUpazilasByDistrict(district.id);
        setUpazilas(data);
      } catch (error) {
        console.error('Failed to load upazilas:', error);
      } finally {
        setLoading(prev => ({ ...prev, upazilas: false }));
      }
    }
  }

  async function handleUpazilaChange(upazilaId: string) {
    const upazila = upazilas.find(u => u.id === upazilaId);
    setSelectedUpazila(upazila);
    setSelectedUnion(undefined);
    setUnions([]);

    if (upazila && showUnion) {
      setLoading(prev => ({ ...prev, unions: true }));
      try {
        const data = await getUnionsByUpazila(upazila.id);
        setUnions(data);
      } catch (error) {
        console.error('Failed to load unions:', error);
      } finally {
        setLoading(prev => ({ ...prev, unions: false }));
      }
    }
  }

  function handleUnionChange(unionId: string) {
    const union = unions.find(u => u.id === unionId);
    setSelectedUnion(union);
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold">{label}</h3>
        {required && <span className="text-red-500">*</span>}
      </div>

      {/* Division Selector */}
      <div className="space-y-2">
        <Label>Division (বিভাগ)</Label>
        <Select
          value={selectedDivision?.id}
          onValueChange={handleDivisionChange}
          disabled={loading.divisions}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={loading.divisions ? 'Loading divisions...' : 'Select Division'} />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((division) => (
              <SelectItem key={division.id} value={division.id}>
                {division.division} ({division.divisionbn})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* District Selector */}
      {selectedDivision && (
        <div className="space-y-2">
          <Label>District (জেলা)</Label>
          <Select
            value={selectedDistrict?.id}
            onValueChange={handleDistrictChange}
            disabled={loading.districts || districts.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue 
                placeholder={
                  loading.districts 
                    ? 'Loading districts...' 
                    : districts.length === 0 
                    ? 'No districts available' 
                    : 'Select District'
                } 
              />
            </SelectTrigger>
            <SelectContent>
              {districts.map((district) => (
                <SelectItem key={district.id} value={district.id}>
                  {district.district} ({district.districtbn})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Upazila Selector */}
      {selectedDistrict && (
        <div className="space-y-2">
          <Label>Upazila (উপজেলা)</Label>
          <Select
            value={selectedUpazila?.id}
            onValueChange={handleUpazilaChange}
            disabled={loading.upazilas || upazilas.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue 
                placeholder={
                  loading.upazilas 
                    ? 'Loading upazilas...' 
                    : upazilas.length === 0 
                    ? 'No upazilas available' 
                    : 'Select Upazila'
                } 
              />
            </SelectTrigger>
            <SelectContent>
              {upazilas.map((upazila) => (
                <SelectItem key={upazila.id} value={upazila.id}>
                  {upazila.upazila} ({upazila.upazilabn})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Union Selector (Optional) */}
      {showUnion && selectedUpazila && (
        <div className="space-y-2">
          <Label>Union (ইউনিয়ন)</Label>
          <Select
            value={selectedUnion?.id}
            onValueChange={handleUnionChange}
            disabled={loading.unions || unions.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue 
                placeholder={
                  loading.unions 
                    ? 'Loading unions...' 
                    : unions.length === 0 
                    ? 'No unions available' 
                    : 'Select Union'
                } 
              />
            </SelectTrigger>
            <SelectContent>
              {unions.map((union) => (
                <SelectItem key={union.id} value={union.id}>
                  {union.union} ({union.unionbn})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Selected Location Summary */}
      {selectedDivision && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-semibold text-sm text-blue-900 mb-2">Selected Location:</h4>
          <div className="text-sm text-gray-700 space-y-1">
            <p>📍 Division: <span className="font-medium">{selectedDivision.division}</span></p>
            {selectedDistrict && (
              <p>📍 District: <span className="font-medium">{selectedDistrict.district}</span></p>
            )}
            {selectedUpazila && (
              <p>📍 Upazila: <span className="font-medium">{selectedUpazila.upazila}</span></p>
            )}
            {selectedUnion && (
              <p>📍 Union: <span className="font-medium">{selectedUnion.union}</span></p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
