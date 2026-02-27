
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Share, Heart, Star, ChevronDown, CheckCircle2, 
  Wifi, Waves, Tv, Wind, Car, Shield, Flame, Coffee, 
  Utensils, Droplets, Calendar, Flag, Award, Sparkles, MessageSquare, Repeat,
  Phone, Mail, MessageCircle, Info, Clock, User,
  Maximize, Bed, Bath, Send, Loader2, CreditCard, ShieldCheck
} from 'lucide-react';
import { Property, Currency, formatPrice, UGX_RATE } from '../App';

interface SinglePropertyPageProps {
  property: Property;
  isComparing?: boolean;
  onToggleCompare?: () => void;
  currency: Currency;
}

export const SinglePropertyPage: React.FC<SinglePropertyPageProps> = ({ property, isComparing = false, onToggleCompare, currency }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [purchaseStatus, setPurchaseStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    // Mock user for sandbox mode
    setCurrentUser({ id: '1', name: 'Demo User' });
    
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/properties/${property.id}/reviews`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };
    fetchReviews();
  }, [property.id]);

  const handlePurchase = async () => {
    if (!currentUser) return alert("IDENTITY REQUIRED: Please login to initialize purchase protocol.");
    setPurchaseStatus('processing');
    setTimeout(() => {
      setPurchaseStatus('success');
    }, 1500);
  };

  const handleBooking = async () => {
    if (!currentUser) return alert("IDENTITY REQUIRED: Please login to schedule a tour.");
    setBookingStatus('processing');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return alert("Please login to submit a review.");
    if (!newReview.comment.trim()) return;

    setIsSubmittingReview(true);
    try {
      const res = await fetch(`/api/properties/${property.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: currentUser.name,
          rating: newReview.rating,
          comment: newReview.comment
        })
      });

      if (res.ok) {
        const addedReview = await res.json();
        setReviews([addedReview, ...reviews]);
        setNewReview({ rating: 5, comment: '' });
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const formatCost = (usd: number) => formatPrice(usd, currency);

  const locationText = property.address ? `${property.address.street}, ${property.address.city}` : property.location;
  const interiorFeatures = property.features?.interior || [];

  return (
    <div className="pt-36 md:pt-52 pb-24 bg-white dark:bg-[#06080f] min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-3">
              <span>Properties</span> <ChevronDown size={12} className="-rotate-90" /> <span>{locationText}</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-black text-gray-900 dark:text-white uppercase leading-none tracking-tighter">{property.title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSaved(!isSaved)} className={`p-4 rounded-[1.5rem] border transition-all shadow-sm ${isSaved ? 'bg-red-50 dark:bg-red-500/10 border-red-100 text-red-500' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 text-gray-400'}`}><Heart size={24} fill={isSaved ? "currentColor" : "none"} /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-12">
            <div className="aspect-[16/9] rounded-[3rem] overflow-hidden shadow-2xl relative border border-gray-100 dark:border-white/5">
               <img src={property.images && property.images.length > 0 ? property.images[0] : 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'} className="w-full h-full object-cover" alt={property.title} />
               <div className="absolute top-8 left-8 bg-[#8DC63F] text-black px-8 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">{property.status}</div>
            </div>

            {/* ... Content details continue ... */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3"><Info size={24} className="text-[#8DC63F]" /> Infrastructure Intelligence</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-lg font-medium">{property.description || 'Verified architectural node with premium specifications.'}</p>
            </div>

            {/* Reviews Section */}
            <div className="space-y-8 pt-12 border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
                  <Star size={24} className="text-[#8DC63F]" /> Property Reviews
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-gray-900 dark:text-white">{property.rating || 0}</span>
                  <div className="flex text-[#8DC63F]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.round(property.rating || 0) ? "currentColor" : "none"} />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
                </div>
              </div>

              {/* Review Form */}
              <div className="bg-gray-50 dark:bg-[#111421] p-6 rounded-3xl border border-gray-100 dark:border-white/5">
                <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-4">Leave a Review</h4>
                <form onSubmit={submitReview} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="text-[#8DC63F] hover:scale-110 transition-transform"
                        >
                          <Star size={24} fill={star <= newReview.rating ? "currentColor" : "none"} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-2">Comment</label>
                    <textarea
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      className="w-full bg-white dark:bg-[#161925] border border-gray-200 dark:border-white/10 rounded-xl p-4 text-gray-900 dark:text-white outline-none focus:border-[#8DC63F] transition-colors min-h-[100px]"
                      placeholder="Share your experience with this property..."
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmittingReview || !newReview.comment.trim()}
                    className="bg-[#8DC63F] text-black px-8 py-3 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-[#7ab033] transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSubmittingReview ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    Submit Review
                  </button>
                </form>
              </div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">No reviews yet. Be the first to review this property!</p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-white dark:bg-[#111421] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-900 dark:text-white font-bold">
                            {review.userName.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white">{review.userName}</p>
                            <p className="text-xs text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex text-[#8DC63F]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* ... Remaining components ... */}
          </div>

          <div className="lg:col-span-4 sticky top-32 space-y-6">
            <div className="bg-white dark:bg-[#161925] rounded-[2.5rem] border border-gray-100 dark:border-white/10 shadow-2xl p-10 space-y-10">
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Technical Valuation</p>
                <h4 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tighter">{formatPrice(property.price, currency)}</h4>
              </div>
              {/* ... Buttons and pricing nodes ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
