import React, { useState } from 'react';
import { X, User } from 'lucide-react';

const UserProfileModal = ({ isOpen, onClose, user }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  if (!isOpen || !user) return null;

  const reviews = user.reviews || [];
  const hasReviews = reviews.length > 0;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-[780px] h-[500px] bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 flex flex-col">
        <button
          onClick={() => {
            setCurrentPage(1);
            onClose();
          }}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={24} />
        </button>

        <div className="p-6 pb-6 overflow-y-auto h-full flex flex-col">
          <div className="flex flex-col sm:flex-row gap-6 mb-8">
            <div className="flex flex-col items-center flex-shrink-0 w-24 ml-6 mt-8">
              <div className="w-24 h-24 rounded-full border border-gray-100 flex items-center justify-center bg-white shadow-sm overflow-hidden mb-3">
                <div className="w-full h-full bg-pink-50 flex items-center justify-center text-pink-300">
                  <User size={40} />
                </div>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{user.name}</h2>
            </div>

            <div className="flex-1 pt-16">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="min-w-[60px] h-[25px] flex items-center justify-center px-2 bg-[#E8F5E9] text-[#4CAF50] text-xs font-bold rounded-full">
                  #{user.role}
                </span>
                {user.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="min-w-[60px] h-[25px] flex items-center justify-center px-2 bg-[#FFF9C4] text-[#FBC02D] text-xs font-bold rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
                {user.bio}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 mb-6 flex-shrink-0"></div>

          <div className="w-full flex-1 flex flex-col">
            {hasReviews ? (
              <>
                <div className="space-y-3">
                  {currentReviews.map((review, idx) => (
                    <div
                      key={idx}
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-600 text-center hover:bg-gray-100 transition-colors cursor-default"
                    >
                      {review}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex justify-center items-center gap-2 text-xs text-gray-400 font-medium tracking-widest select-none">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number, index) => (
                    <React.Fragment key={number}>
                      {index > 0 && <span>|</span>}
                      <span
                        onClick={() => handlePageChange(number)}
                        className={`cursor-pointer transition-colors ${
                          currentPage === number
                            ? 'text-gray-800 font-bold scale-110'
                            : 'hover:text-gray-600'
                        }`}
                      >
                        {number}
                      </span>
                    </React.Fragment>
                  ))}
                </div>
              </>
            ) : (
              <div className="w-full h-40 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                <p className="text-gray-400 text-sm">조회된 동료 리뷰가 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
