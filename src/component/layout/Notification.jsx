import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from '../../slices/notificationSlice';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Notification = () => {
  const notifications = useSelector(state => state.notifications.notifications);
  const dispatch = useDispatch();

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-[#9B7BB8]" />;
    }
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 shadow-green-100';
      case 'error':
        return 'border-red-200 bg-red-50 shadow-red-100';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 shadow-yellow-100';
      case 'info':
      default:
        return 'border-[#9B7BB8]/20 bg-white shadow-[#9B7BB8]/10';
    }
  };

  const handleRemoveNotification = (id) => {
    dispatch(removeNotification(id));
  };

  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-3 max-w-sm w-full pointer-events-none">
      {notifications.map((notification, index) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={handleRemoveNotification}
          getIcon={getNotificationIcon}
          getStyles={getNotificationStyles}
          index={index}
        />
      ))}
    </div>
  );
};

const NotificationItem = ({ notification, onRemove, getIcon, getStyles, index }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Changed from 3000ms to 1500ms (1.5 seconds)
    const timer = setTimeout(() => {
      setIsExiting(true);
      // Small delay for exit animation
      setTimeout(() => {
        onRemove(notification.id);
      }, 300);
    }, 1500);

    return () => clearTimeout(timer);
  }, [notification.id, onRemove]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onRemove(notification.id);
    }, 300);
  };

  return (
    <div
      className={`notification-item pointer-events-auto transform transition-all duration-500 ease-out ${getStyles(notification.type)} border rounded-xl backdrop-blur-sm ${
        isExiting ? 'notification-exit' : ''
      }`}
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="p-4 flex items-start space-x-3">
        {/* Animated Icon */}
        <div className="flex-shrink-0 mt-0.5 notification-icon">
          {getIcon(notification.type)}
        </div>
        
        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[#2D1B3D] leading-relaxed notification-text">
            {notification.message}
          </p>
        </div>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 ml-2 text-[#2D1B3D]/60 hover:text-[#2D1B3D] transition-all duration-200 hover:scale-110 notification-close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <style jsx>{`
        /* Stunning Entry Animation */
        .notification-item {
          animation: slideInBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 0 20px rgba(155, 123, 184, 0.1);
          transform: translateX(100%) scale(0.8);
          opacity: 0;
        }
        
        /* Icon Bounce Animation */
        .notification-icon {
          animation: iconBounce 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          animation-delay: 0.2s;
          transform: scale(0);
        }
        
        /* Text Fade In */
        .notification-text {
          animation: textFadeIn 0.5s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
          transform: translateY(10px);
        }
        
        /* Close Button Animation */
        .notification-close {
          animation: closeFadeIn 0.4s ease-out forwards;
          animation-delay: 0.4s;
          opacity: 0;
          transform: scale(0.8);
        }
        
        /* Exit Animation */
        .notification-exit {
          animation: slideOutScale 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
        
        /* Hover Effects */
        .notification-item:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2), 0 0 25px rgba(155, 123, 184, 0.15);
        }
        
        /* Keyframe Animations */
        @keyframes slideInBounce {
          0% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
          60% {
            transform: translateX(-10px) scale(1.05);
            opacity: 1;
          }
          80% {
            transform: translateX(5px) scale(0.98);
          }
          100% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        
        @keyframes iconBounce {
          0% {
            transform: scale(0) rotate(-180deg);
          }
          50% {
            transform: scale(1.2) rotate(-90deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes textFadeIn {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes closeFadeIn {
          0% {
            opacity: 0;
            transform: scale(0.8) rotate(-90deg);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
        }
        
        @keyframes slideOutScale {
          0% {
            transform: translateX(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateX(100%) scale(0.8);
            opacity: 0;
          }
        }
        
        /* Mobile Responsive */
        @media (max-width: 640px) {
          .notification-item {
            max-width: calc(100vw - 2rem);
            margin: 0 1rem;
            animation: slideInBounceMobile 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          }
          
          @keyframes slideInBounceMobile {
            0% {
              transform: translateY(-100%) scale(0.9);
              opacity: 0;
            }
            60% {
              transform: translateY(10px) scale(1.02);
              opacity: 1;
            }
            100% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
          }
        }
        
        /* Stacking Effect */
        .notification-item:not(:first-child) {
          margin-top: 0.75rem;
          animation-delay: 0.1s;
        }
        
        /* Pulse Effect on Hover */
        .notification-item:hover .notification-icon {
          animation: iconPulse 1s ease-in-out infinite;
        }
        
        @keyframes iconPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Notification;