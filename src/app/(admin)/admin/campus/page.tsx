'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  MapPin, 
  Plus, 
  ExternalLink, 
  Building2, 
  Users, 
  Clock, 
  Navigation, 
  CheckCircle2,
  Eye,
  SlidersHorizontal
} from 'lucide-react';

interface CampusFacility {
  id: string;
  name: string;
  category: 'Auditorium' | 'Academic' | 'Accommodation' | 'Wellness' | 'Technology';
  capacity: string;
  locationDetails: string;
  coordinates: string;
  status: 'Operational' | 'Reserved' | 'Maintenance';
}

const INITIAL_FACILITIES: CampusFacility[] = [
  {
    id: 'fac-01',
    name: 'Nelson Mandela Great Hall',
    category: 'Auditorium',
    capacity: '1,200 Delegates',
    locationDetails: 'Central Quad, Executive Building Block A',
    coordinates: '9.1824° N, 38.7512° E',
    status: 'Operational',
  },
  {
    id: 'fac-02',
    name: 'Pan-African Digital Library & Knowledge Vault',
    category: 'Academic',
    capacity: '400 Scholars',
    locationDetails: 'East Academic Wing, 2nd Floor',
    coordinates: '9.1831° N, 38.7525° E',
    status: 'Operational',
  },
  {
    id: 'fac-03',
    name: 'Executive Presidential Suites & Diplomatic Lodges',
    category: 'Accommodation',
    capacity: '160 VIP Suites',
    locationDetails: 'North Campus Hillside Forest Resort',
    coordinates: '9.1845° N, 38.7490° E',
    status: 'Operational',
  },
  {
    id: 'fac-04',
    name: 'Sululta High-Altitude Sports & Wellness Center',
    category: 'Wellness',
    capacity: '300 Participants',
    locationDetails: 'South Campus Green Belt',
    coordinates: '9.1810° N, 38.7538° E',
    status: 'Operational',
  },
  {
    id: 'fac-05',
    name: 'Smart Campus Datacenter & AI Command Node',
    category: 'Technology',
    capacity: 'Mission Critical 24/7',
    locationDetails: 'Sub-level ICT Complex',
    coordinates: '9.1828° N, 38.7505° E',
    status: 'Operational',
  },
];

export default function AdminCampusPage() {
  const [facilities, setFacilities] = useState<CampusFacility[]>(INITIAL_FACILITIES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<CampusFacility['category']>('Academic');
  const [capacity, setCapacity] = useState('');
  const [locationDetails, setLocationDetails] = useState('');

  const handleAddFacility = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newFac: CampusFacility = {
      id: `fac-0${facilities.length + 1}`,
      name: name.trim(),
      category,
      capacity: capacity.trim() || 'Executive Capacity',
      locationDetails: locationDetails.trim() || 'Sululta Campus, Oromia, Ethiopia',
      coordinates: '9.1830° N, 38.7515° E',
      status: 'Operational',
    };

    setFacilities([...facilities, newFac]);
    setName('');
    setCapacity('');
    setLocationDetails('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-[#C9A84C]">
            <MapPin className="w-3.5 h-3.5 text-[#024696]" /> Smart Campus Infrastructure
          </div>
          <h1 className="text-2xl font-serif font-bold text-white tracking-tight mt-1">
            Sululta Campus Facilities & GIS Points
          </h1>
          <p className="text-xs text-white/60 mt-1">
            Coordinate smart auditoriums, executive residences, wellness hubs, and GPS coordinates on the interactive campus locator.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/en/campus-locator"
            target="_blank"
            className="inline-flex items-center gap-2 bg-[#02142d] hover:bg-white/10 text-white/80 font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all border border-white/10"
          >
            <Eye className="w-4 h-4 text-[#C9A84C]" />
            <span>Public Locator</span>
          </Link>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#b5953f] text-[#021024] font-mono font-semibold px-4 py-2.5 rounded-[2px] text-xs uppercase tracking-widest transition-all cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add Facility</span>
          </button>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((fac) => (
          <div
            key={fac.id}
            className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 flex flex-col justify-between hover:border-[#C9A84C]/40 transition-all shadow-xl group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-semibold text-[#C9A84C] bg-[#024696]/20 px-2 py-0.5 rounded-[2px] border border-[#C9A84C]/30 uppercase tracking-widest">
                  {fac.category}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-[2px] bg-[#024696]/20 text-[#C9A84C] border border-[#C9A84C]/40">
                  {fac.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-serif font-bold text-white group-hover:text-[#C9A84C] transition-colors">
                  {fac.name}
                </h3>
                <p className="text-xs text-white/60 mt-1.5 flex items-start gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-[#C9A84C] shrink-0 mt-0.5" />
                  <span>{fac.locationDetails}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 space-y-2 text-xs text-white/70">
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-mono text-[11px] uppercase tracking-wider">Capacity:</span>
                  <span className="font-semibold text-white font-mono text-[11px]">{fac.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/40 font-mono text-[11px] uppercase tracking-wider">GPS:</span>
                  <span className="font-mono text-[11px] text-[#C9A84C]">{fac.coordinates}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">/{fac.id}</span>
              <button
                type="button"
                onClick={() => {
                  const updated = facilities.map(f => f.id === fac.id ? { ...f, status: f.status === 'Operational' ? 'Reserved' : 'Operational' } as CampusFacility : f);
                  setFacilities(updated);
                }}
                className="text-[11px] font-mono uppercase tracking-wider text-[#C9A84C] hover:underline cursor-pointer"
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Facility Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#021024]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#02142d] border border-white/10 rounded-[2px] p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <div className="text-[10px] font-mono tracking-widest uppercase text-[#C9A84C]">Smart Campus Infrastructure</div>
                <h3 className="font-serif text-lg font-bold text-white mt-0.5">Add Campus Facility</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white text-xs font-mono"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddFacility} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Facility Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. African Renaissance Amphitheater"
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none focus:border-[#C9A84C]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CampusFacility['category'])}
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                  >
                    <option value="Auditorium">Auditorium</option>
                    <option value="Academic">Academic</option>
                    <option value="Accommodation">Accommodation</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Capacity</label>
                  <input
                    type="text"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="e.g. 500 Scholars"
                    className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-[11px] uppercase tracking-widest text-white/70">Campus Location Details</label>
                <input
                  type="text"
                  value={locationDetails}
                  onChange={(e) => setLocationDetails(e.target.value)}
                  placeholder="e.g. West Campus Eco-Park, Sululta"
                  className="w-full bg-[#010c1c] border border-white/10 rounded-[2px] px-3 py-2 text-white outline-none"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-white/5 border border-white/10 text-white/70 rounded-[2px] font-mono text-xs uppercase tracking-wider hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C9A84C] text-[#021024] font-mono text-xs uppercase tracking-widest font-bold rounded-[2px] hover:bg-[#b5953f]"
                >
                  Register Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

