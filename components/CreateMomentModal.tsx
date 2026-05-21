import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Image as ImageIcon, Camera, Link, HelpCircle } from 'lucide-react';
import { Moment, Category } from '../types';

interface CreateMomentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (moment: Omit<Moment, 'comments'>) => void;
}

// Beautiful preset retro photographs for outstanding UX
const IMAGE_PRESETS = [
  {
    name: 'Vintage Seaside',
    url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800',
    description: 'An old light flooded beach setting during midsummer.'
  },
  {
    name: 'Cozy Living Room',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    description: 'A cozy house corner filled with plants and warm books from 1990.'
  },
  {
    name: 'Bustling Street Alley',
    url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=800',
    description: 'A vivid neon lit street corner mirroring warm nostalgic memories.'
  },
  {
    name: 'Sunset Highlands',
    url: 'https://images.unsplash.com/photo-1472214222541-d510753a8707?auto=format&fit=crop&q=80&w=800',
    description: 'Nostalgic golden field with misty hills in the sunset.'
  }
];

export default function CreateMomentModal({ isOpen, onClose, onSave }: CreateMomentModalProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('Daily Life');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSelectPreset = (url: string) => {
    setImageUrl(url);
    setErrorMsg('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date.trim() || !description.trim() || !imageUrl.trim()) {
      setErrorMsg('Please write complete fields: Title, Date, Subtitle, and image location are required.');
      return;
    }

    // Ensure it looks like a real valid URL
    if (!imageUrl.startsWith('http://') && !imageUrl.startsWith('https://')) {
      setErrorMsg('Please supply a valid image hotlink starting with http:// or https://, or select a preset.');
      return;
    }

    const uniqueId = `moment-${Date.now()}`;
    const newMoment: Omit<Moment, 'comments'> = {
      id: uniqueId,
      category,
      title: title.trim(),
      description: description.trim(),
      date: date.trim(),
      imageUrl: imageUrl.trim(),
      location: location.trim() || undefined,
      details: details.trim() || undefined
    };

    onSave(newMoment);
    onClose();

    // Reset fields
    setTitle('');
    setCategory('Daily Life');
    setDate('');
    setLocation('');
    setDescription('');
    setDetails('');
    setImageUrl('');
    setErrorMsg('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="create-moment-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="create-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-md"
          />

          {/* Form Card */}
          <motion.div
            id="create-form-card"
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-3xl overflow-y-auto max-h-[90vh] bg-brand-beige border border-brand-orange/15 shadow-2xl rounded p-6 md:p-10"
          >
            {/* Close Button */}
            <button
              id="create-close-button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-brand-charcoal hover:text-brand-orange transition-colors"
              aria-label="Close form"
            >
              <X size={20} />
            </button>

            {/* Title */}
            <div id="create-header" className="mb-8">
              <p className="font-sans text-[10px] tracking-widest font-bold text-brand-orange uppercase mb-1">
                contribute to archives
              </p>
              <h2 className="font-serif text-2xl md:text-3.5xl text-brand-green font-medium tracking-tight">
                Document a New Moment
              </h2>
              <div className="w-12 h-0.5 bg-brand-orange/40 mt-3" />
            </div>

            {errorMsg && (
              <div id="create-form-error" className="mb-6 p-3 bg-red-50 text-red-700 border border-red-100 rounded text-xs font-sans font-medium">
                {errorMsg}
              </div>
            )}

            {/* Form */}
            <form id="new-moment-form" onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Columns: Inputs */}
                <div id="form-inputs-left" className="space-y-4">
                  {/* Moment Title */}
                  <div className="flex flex-col">
                    <label htmlFor="moment-title-field" className="font-sans text-[10px] font-bold text-brand-orange tracking-wider uppercase mb-1">
                      Moment Title *
                    </label>
                    <input
                      id="moment-title-field"
                      type="text"
                      placeholder="e.g., Summer Evenings in Antipolo"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full bg-brand-surface-container border border-brand-orange/10 focus:border-brand-green p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green rounded font-sans text-brand-charcoal"
                      required
                    />
                  </div>

                  {/* Category Selection */}
                  <div className="flex flex-col">
                    <label htmlFor="moment-category-field" className="font-sans text-[10px] font-bold text-brand-orange tracking-wider uppercase mb-1">
                      Archive Category *
                    </label>
                    <select
                      id="moment-category-field"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as Category)}
                      className="w-full bg-brand-surface-container border border-brand-orange/10 focus:border-brand-green p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green rounded font-sans text-brand-charcoal"
                    >
                      <option value="Daily Life">Daily Life</option>
                      <option value="Heritage">Heritage</option>
                      <option value="Celebrations">Celebrations</option>
                      <option value="Holidays">Holidays</option>
                      <option value="Travel">Travel</option>
                    </select>
                  </div>

                  {/* Era / Date */}
                  <div className="flex flex-col">
                    <label htmlFor="moment-date-field" className="font-sans text-[10px] font-bold text-brand-orange tracking-wider uppercase mb-1">
                      Era / Year / Month *
                    </label>
                    <input
                      id="moment-date-field"
                      type="text"
                      placeholder="e.g., September 1992, Summer of '85"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-brand-surface-container border border-brand-orange/10 focus:border-brand-green p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green rounded font-sans text-brand-charcoal"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="flex flex-col">
                    <label htmlFor="moment-location-field" className="font-sans text-[10px] font-bold text-brand-orange tracking-wider uppercase mb-1">
                      Geographic Location
                    </label>
                    <input
                      id="moment-location-field"
                      type="text"
                      placeholder="e.g., Manila, Kyoto, Tagaytay"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-brand-surface-container border border-brand-orange/10 focus:border-brand-green p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green rounded font-sans text-brand-charcoal"
                    />
                  </div>
                </div>

                {/* Right Columns: Description & Details */}
                <div id="form-inputs-right" className="space-y-4">
                  {/* Brief Caption */}
                  <div className="flex flex-col">
                    <label htmlFor="moment-caption-field" className="font-sans text-[10px] font-bold text-brand-orange tracking-wider uppercase mb-1">
                      Brief Caption / Excerpt *
                    </label>
                    <input
                      id="moment-caption-field"
                      type="text"
                      placeholder="e.g., A warm photograph detailing slow steps on the boardwalk."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-brand-surface-container border border-brand-orange/10 focus:border-brand-green p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green rounded font-sans text-brand-charcoal"
                      maxLength={140}
                      required
                    />
                  </div>

                  {/* Elaborate Details */}
                  <div className="flex flex-col">
                    <label htmlFor="moment-story-field" className="font-sans text-[10px] font-bold text-brand-orange tracking-wider uppercase mb-1">
                      Elaborated Narrative / Extended Memories
                    </label>
                    <textarea
                      id="moment-story-field"
                      placeholder="Tell the full narrative of what happened behind the camera. Who was present? How did the atmosphere feel like? What values survived..."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full bg-brand-surface-container border border-brand-orange/10 focus:border-brand-green p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green rounded h-28 resize-none font-sans text-brand-charcoal"
                    />
                  </div>
                </div>
              </div>

              {/* Image Input Selection & presets */}
              <div id="form-image-selection" className="border-t border-brand-orange/10 pt-6 space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="moment-image-url-field" className="font-sans text-[10px] font-bold text-brand-orange tracking-wider uppercase mb-2 flex items-center gap-1">
                    <ImageIcon size={12} /> Image Location (Hotlink URL) *
                  </label>
                  <input
                    id="moment-image-url-field"
                    type="url"
                    placeholder="Provide image coordinates, e.g., https://images.unsplash.com/... or choose a preset card below"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-brand-surface-container border border-brand-orange/10 focus:border-brand-green p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-green rounded font-sans text-brand-charcoal mb-4"
                    required
                  />
                </div>

                {/* Image Presets Selector for beautiful UX demo */}
                <div id="image-presets-container" className="space-y-2">
                  <span className="font-sans text-[10px] font-bold text-brand-gray tracking-wider uppercase">
                    Select a curated retro archive photo preset:
                  </span>
                  <div id="image-preset-cards" className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {IMAGE_PRESETS.map((p, idx) => (
                      <button
                        id={`image-preset-card-${idx}`}
                        key={idx}
                        type="button"
                        onClick={() => handleSelectPreset(p.url)}
                        className={`group relative text-left bg-brand-surface-container overflow-hidden rounded border transition-all hover:scale-[1.02] cursor-pointer ${
                          imageUrl === p.url ? 'border-brand-orange ring-1 ring-brand-orange' : 'border-brand-orange/10'
                        }`}
                      >
                        <div className="aspect-[4/3] bg-brand-beige-dim overflow-hidden relative">
                          <img
                            src={p.url}
                            alt={p.name}
                            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                        <div className="p-2">
                          <p className="font-sans text-[10px] font-bold text-brand-green truncate">{p.name}</p>
                          <p className="font-sans text-[8px] text-brand-gray truncate">{p.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div id="form-submit-footer" className="mt-8 pt-6 border-t border-brand-orange/10 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  id="cancel-create-btn"
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 border border-brand-orange/30 hover:border-brand-orange text-brand-charcoal text-xs font-sans uppercase rounded font-bold transition-all text-center"
                >
                  Cancel
                </button>
                <button
                  id="confirm-create-btn"
                  type="submit"
                  className="px-8 py-2 bg-brand-green hover:bg-brand-orange text-white text-xs font-sans uppercase rounded font-bold transition-all shadow cursor-pointer text-center"
                >
                  Document Memory
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
