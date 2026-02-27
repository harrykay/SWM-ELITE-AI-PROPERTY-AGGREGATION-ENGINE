
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Layers, ClipboardCheck, Loader2, AlertTriangle, 
  CheckCircle2, ChevronDown, ClipboardList, ImageIcon, MapPin, 
  Info, Check, ArrowRight, ArrowLeft, Video, Home, Zap, 
  Cpu, ThermometerSun, Upload, X, Trash2, Bold, Italic, Underline,
  List, ListOrdered, Link as LinkIcon
} from 'lucide-react';
import { UserRole, Property, Currency, formatPrice } from '../App';

interface AddListingPageProps {
  userRole: UserRole;
  onAddProperty?: (property: Property) => void;
  currency: Currency;
}

type Step = 1 | 2 | 3 | 4 | 5;

const STEPS = [
  { id: 1, label: 'Description' },
  { id: 2, label: 'Media' },
  { id: 3, label: 'Location' },
  { id: 4, label: 'Details' },
  { id: 5, label: 'Amenities' },
];

export const AddListingPage: React.FC<AddListingPageProps> = ({ userRole, onAddProperty, currency }) => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    // Step 1: Description
    title: '',
    description: '',
    price: '',
    afterPriceLabel: '',
    beforePriceLabel: '',
    secondPrice: '',
    afterSecondPriceLabel: '',
    beforeSecondPriceLabel: '',
    yearlyTaxRate: '',
    associationFee: '',
    category: 'None',
    listedIn: 'None',
    propertyStatus: 'No status',

    // Step 2: Media
    images: [] as string[],
    videoFrom: 'Vimeo',
    videoId: '',
    virtualTour: '',

    // Step 3: Location
    address: '',
    county: '',
    city: '',
    neighborhood: '',
    zip: '',
    country: 'United States',
    latitude: '',
    longitude: '',
    googleStreetViewAngle: '',
    enableStreetView: false,
    hideMapMarker: false,

    // Step 4: Details
    size: '',
    lotSize: '',
    rooms: '',
    bedrooms: '',
    bathrooms: '',
    customId: '',
    garages: '',
    yearBuilt: '',
    garageSize: '',
    availableFrom: '',
    basement: '',
    extraDetails: '',
    roofing: '',
    exteriorMaterial: '',
    structureType: 'Not Available',
    floorsNo: 'Not Available',
    ownerNotes: '',
    energyClass: 'Select Energy Class (EU regulation)',
    energyIndex: '',

    // Step 5: Amenities
    amenities: {
      equippedKitchen: false, gym: false, laundry: false, mediaRoom: false,
      backYard: false, basketballCourt: false, frontYard: false, garageAttached: false, hotBath: false, pool: false,
      centralAir: false, electricity: false, heating: false, naturalGas: false, ventilation: false, water: false,
      chairAccessible: false, elevator: false, fireplace: false, smokeDetectors: false, washerDryer: false, wifi: false
    }
  });

  const validateStep = () => {
    if (currentStep === 1) {
      if (!formData.title) return "MANDATORY FIELD: Title is required";
    }
    if (currentStep === 2) {
      if (formData.images.length === 0) return "MANDATORY FIELD: Property Media is required";
    }
    if (currentStep === 3) {
      if (!formData.address) return "MANDATORY FIELD: Property Address is required";
    }
    return null;
  };

  const handleNext = () => {
    const err = validateStep();
    if (err) return setError(err);
    setError(null);
    setCurrentStep((prev) => (prev + 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    setCurrentStep((prev) => (prev - 1) as Step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    setFormData(prev => {
      const newImages = [...prev.images];
      const draggedImage = newImages[draggedIndex];
      newImages.splice(draggedIndex, 1);
      newImages.splice(index, 0, draggedImage);
      return { ...prev, images: newImages };
    });
    setDraggedIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    (Array.from(files) as File[]).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newImages.push(reader.result as string);
        if (newImages.length === files.length) {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages].slice(0, 5) // Limit to 5 images as per screenshot
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFinalize = async () => {
    setIsVerifying(true);
    setError(null);
    try {
      const selectedAmenities = Object.entries(formData.amenities)
        .filter(([_, checked]) => checked)
        .map(([key]) => key);

      // Final validation before submit
      if (!formData.title) throw new Error("MANDATORY FIELD: Title is required");
      if (formData.images.length === 0) throw new Error("MANDATORY FIELD: Property Media is required");
      if (!formData.address) throw new Error("MANDATORY FIELD: Property Address is required");

      const payload = {
        title: formData.title,
        location: formData.address || formData.city || 'Location',
        price: parseFloat(formData.price) || 0,
        type: formData.category !== 'None' ? formData.category : 'Property',
        description: formData.description,
        beds: parseInt(formData.bedrooms) || 0, 
        baths: parseInt(formData.bathrooms) || 0, 
        size: parseInt(formData.size) || 0,
        images: formData.images.length > 0 ? formData.images : ['https://picsum.photos/1200/800'],
        host: { name: 'SMW Admin', avatar: 'https://i.pravatar.cc/150?u=admin', status: 'Verified', yearsHosting: 1 },
        address: { 
          street: formData.address, city: formData.city, state: formData.county, 
          zip: formData.zip, area: formData.neighborhood, country: formData.country 
        },
        features: { 
          interior: selectedAmenities.filter(a => ['equippedKitchen', 'gym', 'laundry', 'mediaRoom'].includes(a)), 
          outdoor: selectedAmenities.filter(a => ['backYard', 'basketballCourt', 'frontYard', 'garageAttached', 'hotBath', 'pool'].includes(a)), 
          utilities: selectedAmenities.filter(a => ['centralAir', 'electricity', 'heating', 'naturalGas', 'ventilation', 'water'].includes(a)), 
          other: selectedAmenities.filter(a => ['chairAccessible', 'elevator', 'fireplace', 'smokeDetectors', 'washerDryer', 'wifi'].includes(a)) 
        },
        is_featured: false,
        rating: 5.0,
        reviews_count: 0,
        status: formData.propertyStatus.toLowerCase()
      };

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const contentType = response.headers.get("content-type");
      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.slice(0, 100)}...`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit property');
      }

      const newProperty = data;

      if (onAddProperty) onAddProperty(newProperty);
      
      alert(`Property submitted successfully!`);
      setCurrentStep(1);
      setFormData({
        title: '', description: '', price: '', afterPriceLabel: '', beforePriceLabel: '',
        secondPrice: '', afterSecondPriceLabel: '', beforeSecondPriceLabel: '',
        yearlyTaxRate: '', associationFee: '', category: 'None', listedIn: 'None', propertyStatus: 'No status',
        images: [], videoFrom: 'Vimeo', videoId: '', virtualTour: '',
        address: '', county: '', city: '', neighborhood: '', zip: '', country: 'United States',
        latitude: '', longitude: '', googleStreetViewAngle: '', enableStreetView: false, hideMapMarker: false,
        size: '', lotSize: '', rooms: '', bedrooms: '', bathrooms: '', customId: '',
        garages: '', yearBuilt: '', garageSize: '', availableFrom: '', basement: '',
        extraDetails: '', roofing: '', exteriorMaterial: '', structureType: 'Not Available',
        floorsNo: 'Not Available', ownerNotes: '', energyClass: 'Select Energy Class (EU regulation)', energyIndex: '',
        amenities: {
          equippedKitchen: false, gym: false, laundry: false, mediaRoom: false,
          backYard: false, basketballCourt: false, frontYard: false, garageAttached: false, hotBath: false, pool: false,
          centralAir: false, electricity: false, heating: false, naturalGas: false, ventilation: false, water: false,
          chairAccessible: false, elevator: false, fireplace: false, smokeDetectors: false, washerDryer: false, wifi: false
        }
      });
    } catch (err: any) {
      setError(`Submission failed: ${err.message}`);
    } finally {
      setIsVerifying(false);
    }
  };

  const Input = ({ label, value, field, placeholder = '', type = 'text' }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={e => setFormData({...formData, [field]: e.target.value})} 
        className="w-full bg-gray-100 dark:bg-[#111421] border border-gray-200 dark:border-white/10 rounded-md p-3 text-gray-800 dark:text-white outline-none focus:border-blue-500 dark:focus:border-[#8DC63F] transition-all text-sm placeholder-gray-400 dark:placeholder-gray-600" 
        placeholder={placeholder} 
      />
    </div>
  );

  const Select = ({ label, value, field, options }: any) => (
    <div className="space-y-2">
      <label className="text-xs font-bold text-gray-700 dark:text-gray-300">{label}</label>
      <div className="relative">
        <select 
          value={value} 
          onChange={e => setFormData({...formData, [field]: e.target.value})} 
          className="w-full bg-gray-100 dark:bg-[#111421] border border-gray-200 dark:border-white/10 rounded-md p-3 text-gray-800 dark:text-white outline-none focus:border-blue-500 dark:focus:border-[#8DC63F] transition-all text-sm appearance-none cursor-pointer"
        >
          {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 pointer-events-none" size={16} />
      </div>
    </div>
  );

  const Checkbox = ({ label, field }: { label: string, field: keyof typeof formData.amenities }) => (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input 
        type="checkbox"
        checked={formData.amenities[field]}
        onChange={() => setFormData({...formData, amenities: {...formData.amenities, [field]: !formData.amenities[field]}})}
        className="w-4 h-4 rounded border-gray-300 dark:border-white/20 text-blue-600 dark:text-[#8DC63F] focus:ring-blue-500 dark:focus:ring-[#8DC63F] bg-white dark:bg-[#111421]"
      />
      <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{label}</span>
    </label>
  );

  return (
    <div className="pt-24 pb-24 bg-gray-50 dark:bg-[#06080f] min-h-screen font-sans transition-colors duration-500">
      <div className="max-w-5xl mx-auto px-4">
        
        {/* Step Navigation */}
        <div className="flex bg-gray-100 dark:bg-[#111421] rounded-t-lg overflow-hidden border-b border-gray-200 dark:border-white/10">
          {STEPS.map((s) => (
            <div 
              key={s.id}
              className={`flex-1 flex items-center justify-center py-4 px-2 transition-all relative ${
                currentStep === s.id ? 'bg-white dark:bg-[#1a1d2d] text-blue-600 dark:text-[#8DC63F]' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <span className="text-xs font-bold">{s.id}. {s.label}</span>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-[#111421] p-8 border-x border-b border-gray-200 dark:border-white/10 shadow-sm space-y-8">
          
          {/* Mandatory Banner */}
          <div className="bg-[#FF7043] dark:bg-[#FF7043]/80 p-4 rounded-md flex items-center gap-4">
             <p className="text-xs font-bold text-white">These fields are mandatory: Title, Property Media, Property Address</p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-md flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-bold">
              <AlertTriangle size={16} /> {error}
            </div>
          )}

          {/* STEP 1: DESCRIPTION */}
          {currentStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Property Description</h3>
                <Input label="*Title (mandatory)" field="title" value={formData.title} />
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Description</label>
                  <div className="border border-gray-200 rounded-md overflow-hidden">
                    <div className="bg-gray-50 p-2 border-b border-gray-200 flex gap-2">
                      <button className="p-1 hover:bg-gray-200 rounded"><Bold size={14} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><Italic size={14} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><Underline size={14} /></button>
                      <div className="w-px h-4 bg-gray-300 mx-1" />
                      <button className="p-1 hover:bg-gray-200 rounded"><List size={14} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><ListOrdered size={14} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded"><LinkIcon size={14} /></button>
                    </div>
                    <textarea 
                      value={formData.description} 
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-gray-100 p-4 text-gray-800 outline-none text-sm min-h-[200px]" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Property Price</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Price in $ (only numbers)" field="price" value={formData.price} />
                  <Input label="After Price Label (ex: '/month')" field="afterPriceLabel" value={formData.afterPriceLabel} />
                  <Input label="Before Price Label (ex: 'from ')" field="beforePriceLabel" value={formData.beforePriceLabel} />
                  <Input label="Second Price in $ (only numbers)" field="secondPrice" value={formData.secondPrice} />
                  <Input label="After Second Price Label (ex: '/month')" field="afterSecondPriceLabel" value={formData.afterSecondPriceLabel} />
                  <Input label="Before Second Price Label (ex: 'from ')" field="beforeSecondPriceLabel" value={formData.beforeSecondPriceLabel} />
                  <Input label="Yearly Tax Rate" field="yearlyTaxRate" value={formData.yearlyTaxRate} />
                  <Input label="Homeowners Association Fee (monthly)" field="associationFee" value={formData.associationFee} />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Select Categories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select label="Category" field="category" value={formData.category} options={['None', 'Apartment', 'House', 'Villa', 'Office', 'Retail']} />
                  <Select label="Listed In" field="listedIn" value={formData.listedIn} options={['None', 'Rent', 'Sale']} />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Select Property Status</h3>
                <Select label="Property Status" field="propertyStatus" value={formData.propertyStatus} options={['No status', 'Hot Offer', 'Open House', 'Sold']} />
              </div>
            </div>
          )}

          {/* STEP 2: MEDIA */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Listing Media</h3>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-all"
                >
                  <Upload className="text-blue-500 mb-4" size={48} />
                  <p className="text-sm font-bold text-gray-600">Drag and Drop images or</p>
                  <button className="mt-4 bg-[#26A69A] text-white px-6 py-2 rounded font-bold text-sm">Select Media</button>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*" className="hidden" />
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  * At least 1 image is required for a valid submission. Minimum size is 500/500px.<br />
                  You can upload maximum 5 images.<br />
                  ** Double click on the image to select featured.<br />
                  *** Change images order with Drag & Drop.<br />
                  **** PDF files upload supported as well.<br />
                  ***** Images might take longer to be processed.
                </p>
                {formData.images.length > 0 && (
                  <div className="grid grid-cols-5 gap-4">
                    {formData.images.map((img, i) => (
                      <div 
                        key={i} 
                        draggable
                        onDragStart={(e) => handleDragStart(e, i)}
                        onDragOver={(e) => handleDragOver(e, i)}
                        onDrop={(e) => handleDrop(e, i)}
                        onDragEnd={handleDragEnd}
                        onDoubleClick={() => {
                          setFormData(prev => {
                            const newImages = [...prev.images];
                            const featuredImage = newImages[i];
                            newImages.splice(i, 1);
                            newImages.unshift(featuredImage);
                            return { ...prev, images: newImages };
                          });
                        }}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 cursor-move transition-all ${draggedIndex === i ? 'opacity-50 border-blue-500' : 'border-gray-200 hover:border-blue-300'}`}
                      >
                        <img src={img} className="w-full h-full object-cover pointer-events-none" />
                        {i === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 text-white text-[10px] font-bold text-center py-1">
                            FEATURED
                          </div>
                        )}
                        <button 
                          onClick={() => setFormData(prev => ({...prev, images: prev.images.filter((_, idx) => idx !== i)}))}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors z-10"
                        >
                          <X size={10} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Video Option</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select label="Video from" field="videoFrom" value={formData.videoFrom} options={['Vimeo', 'YouTube', 'TikTok']} />
                  <Input label="Embed Video ID" field="videoId" value={formData.videoId} />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Virtual Tour</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Virtual Tour / Meta Reels</label>
                  <textarea 
                    value={formData.virtualTour} 
                    onChange={e => setFormData({...formData, virtualTour: e.target.value})}
                    className="w-full bg-gray-100 border border-gray-200 rounded-md p-4 text-gray-800 outline-none text-sm min-h-[100px]" 
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: LOCATION */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Listing Location</h3>
                <Input label="*Address" field="address" value={formData.address} placeholder="Enter address" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="County / State" field="county" value={formData.county} />
                  <Input label="City" field="city" value={formData.city} placeholder="Enter city" />
                  <Input label="Neighborhood" field="neighborhood" value={formData.neighborhood} />
                  <Input label="Zip" field="zip" value={formData.zip} />
                </div>
                <Select label="Country" field="country" value={formData.country} options={['United States', 'Uganda', 'United Kingdom', 'Canada']} />
              </div>

              <div className="space-y-4">
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative">
                  <img src="https://picsum.photos/seed/map/1200/600" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-lg flex flex-col items-center">
                      <MapPin className="text-red-500 mb-2" size={24} />
                      <p className="text-[10px] font-bold text-gray-600">Latitude: 40.7077431</p>
                      <p className="text-[10px] font-bold text-gray-600">Longitude: -74.0139144</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Latitude (for Maps Coordinates)" field="latitude" value={formData.latitude} />
                  <Input label="Longitude (for Maps Coordinates)" field="longitude" value={formData.longitude} />
                  <Input label="Google Street View - Camera Angle (value from 0 to 360)" field="googleStreetViewAngle" value={formData.googleStreetViewAngle} />
                </div>
                <div className="flex gap-12">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.enableStreetView} onChange={() => setFormData({...formData, enableStreetView: !formData.enableStreetView})} className="rounded text-blue-600" />
                    <span className="text-xs text-gray-600">Enable Google Street View</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={formData.hideMapMarker} onChange={() => setFormData({...formData, hideMapMarker: !formData.hideMapMarker})} className="rounded text-blue-600" />
                    <span className="text-xs text-gray-600">Hide Map Marker</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: DETAILS */}
          {currentStep === 4 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Listing Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input label="Size in ft2 (*only numbers)" field="size" value={formData.size} />
                  <Input label="Lot Size in ac (*only numbers)" field="lotSize" value={formData.lotSize} />
                  <Input label="Rooms (*only numbers)" field="rooms" value={formData.rooms} />
                  <Input label="Bedrooms (*only numbers)" field="bedrooms" value={formData.bedrooms} />
                  <Input label="Bathrooms (*only numbers)" field="bathrooms" value={formData.bathrooms} />
                  <Input label="Custom ID (text)" field="customId" value={formData.customId} />
                  <Input label="Garages (text)" field="garages" value={formData.garages} />
                  <Input label="Year Built (numeric)" field="yearBuilt" value={formData.yearBuilt} />
                  <Input label="Garage Size (text)" field="garageSize" value={formData.garageSize} />
                  <Input label="Available from (*date)" field="availableFrom" value={formData.availableFrom} type="date" />
                  <Input label="Basement (text)" field="basement" value={formData.basement} />
                  <Input label="Extra Details (text)" field="extraDetails" value={formData.extraDetails} />
                  <Input label="Roofing (text)" field="roofing" value={formData.roofing} />
                  <Input label="Exterior Material (text)" field="exteriorMaterial" value={formData.exteriorMaterial} />
                  <Select label="Structure Type" field="structureType" value={formData.structureType} options={['Not Available', 'Wood', 'Steel', 'Concrete']} />
                  <Select label="Floors No" field="floorsNo" value={formData.floorsNo} options={['Not Available', '1', '2', '3', '4+']} />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700">Owner/Agent notes (*not visible on front end)</label>
                  <textarea 
                    value={formData.ownerNotes} 
                    onChange={e => setFormData({...formData, ownerNotes: e.target.value})}
                    className="w-full bg-gray-100 border border-gray-200 rounded-md p-4 text-gray-800 outline-none text-sm min-h-[100px]" 
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Select Energy Class</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Select label="Energy Class" field="energyClass" value={formData.energyClass} options={['Select Energy Class (EU regulation)', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G']} />
                  <Input label="Energy Index in kWh/m2a" field="energyIndex" value={formData.energyIndex} />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: AMENITIES */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-gray-800">Amenities and Features</h3>
                
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">Interior Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Checkbox label="Equipped Kitchen" field="equippedKitchen" />
                    <Checkbox label="Gym" field="gym" />
                    <Checkbox label="Laundry" field="laundry" />
                    <Checkbox label="Media Room" field="mediaRoom" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">Outdoor Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Checkbox label="Back yard" field="backYard" />
                    <Checkbox label="Basketball court" field="basketballCourt" />
                    <Checkbox label="Front yard" field="frontYard" />
                    <Checkbox label="Garage Attached" field="garageAttached" />
                    <Checkbox label="Hot Bath" field="hotBath" />
                    <Checkbox label="Pool" field="pool" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">Utilities</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Checkbox label="Central Air" field="centralAir" />
                    <Checkbox label="Electricity" field="electricity" />
                    <Checkbox label="Heating" field="heating" />
                    <Checkbox label="Natural Gas" field="naturalGas" />
                    <Checkbox label="Ventilation" field="ventilation" />
                    <Checkbox label="Water" field="water" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-gray-700">Other Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Checkbox label="Chair Accessible" field="chairAccessible" />
                    <Checkbox label="Elevator" field="elevator" />
                    <Checkbox label="Fireplace" field="fireplace" />
                    <Checkbox label="Smoke detectors" field="smokeDetectors" />
                    <Checkbox label="Washer and dryer" field="washerDryer" />
                    <Checkbox label="WiFi" field="wifi" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-8 flex justify-between gap-4">
            <div className="flex gap-4">
              {currentStep > 1 && (
                <button 
                  onClick={handlePrev}
                  className="px-8 py-3 bg-[#0073e1] text-white rounded font-bold text-sm hover:bg-blue-700 transition-all"
                >
                  Prev Step
                </button>
              )}
            </div>
            
            <div className="flex gap-4">
              {currentStep < 5 ? (
                <button 
                  onClick={handleNext}
                  className="bg-[#0073e1] text-white px-8 py-3 rounded font-bold text-sm hover:bg-blue-700 transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button 
                  onClick={handleFinalize}
                  disabled={isVerifying}
                  className="bg-[#0073e1] text-white px-8 py-3 rounded font-bold text-sm hover:bg-blue-700 transition-all disabled:opacity-50"
                >
                  {isVerifying ? <Loader2 className="animate-spin" /> : 'Submit Property'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
