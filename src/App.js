import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Navbar from './component/layout/Navbar';
import Notification from './component/layout/Notification';
import HeroSection from './component/home/HeroSection';
import AboutSection from './component/home/AboutSection';
import FeaturedBooks from './component/home/FeaturedBooks';
import ReviewsSection from './component/home/ReviewsSection';
import Footer from './component/layout/Footer';
import WhyEbooksButton from './component/layout/Button';
import ContactSection from './component/pages/ContactSection';
import CartSection from './component/pages/CartSection';
import WishlistPage from './component/pages/WishlsitSection';
import ProductSection from './component/pages/ProductSection';
import ProfileSection from './component/pages/ProfileSection';
import LibraryPage from './component/pages/LibrarySection';
import LoginSection from './component/pages/LoginSection';
import OrderHistorySection from './component/pages/OrderHistorySection';
import MyLibrarySection from './component/pages/MyLibrarySection';
import ScrollToTop from './component/layout/ScrollToTop';
import AdminDashboard from './component/admin/AdminDashboard';
import BooksManagement from './component/admin/BooksManagement';
import UsersManagement from './component/admin/UsersManagement';
import OrdersManagement from './component/admin/OrdersManagement';
import Transactions from './component/admin/Transactions'; // ADD THIS
import SettingsPage from './component/admin/Settings';
import CheckoutSection from './component/pages/CheckoutSection';
import AdminLogin from './component/admin/AdminLogin';
import NotFound from './component/pages/NotFound';
import LoadingSpinner from './component/layout/LoadingSpinner';
import SkeletonLoader from './component/layout/SkeletonLoader';
import AccessDenied from './component/pages/AccessDenied';
import { useSelector } from 'react-redux';
import { useNotification } from './hooks/useNotification';
import { useGetAllBooksQuery } from './utils/booksService';
import { fetchWishlistProductIds, updateWishlistItems } from './utils/wishListService';
import { useAddToCartMutation, useRemoveFromCartMutation, useGetCartByUserIdQuery } from './utils/cartService';
import TermsAndConditions from './component/pages/TermsAndConditions';
import PrivacyPolicy from './component/pages/PrivacyPolicy';

function App() {
  // Initialize cart from localStorage on mount
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [serverWishlistItems, setServerWishlistItems] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(false);
  const notification = useNotification();
  const user = useSelector(state => state.userAuth.user);
  const userId = user?.guid;
  const { data: booksResponse } = useGetAllBooksQuery({ page: 1, pageSize: 1000 });
  
  // Cart API mutations and query
  const [addToCartMutation] = useAddToCartMutation();
  const [removeFromCartMutation] = useRemoveFromCartMutation();

  const { data: cartResponse } = useGetCartByUserIdQuery(userId, { skip: !userId });

  const booksIndex = useMemo(() => {
    const index = new Map();
    if (booksResponse?.data) {
      booksResponse.data.forEach(book => {
        const keys = [
          book?._id,
          book?.id,
          book?.productId,
          book?.product_id,
          book?.guid,
        ];
        keys
          .filter(key => key !== undefined && key !== null)
          .forEach(key => index.set(String(key), book));
      });
    }
    return index;
  }, [booksResponse]);

  const formatBookForWishlist = useCallback((book, fallbackId, fallbackData = null) => {
    const mergedSource = book
      ? { ...(fallbackData || {}), ...book }
      : (fallbackData ? { ...fallbackData } : null);

    const resolvedId =
      mergedSource?._id ||
      mergedSource?.id ||
      mergedSource?.productId ||
      mergedSource?.product_id ||
      fallbackId;

    if (!mergedSource && !resolvedId) return null;

    const parseNumber = (value, defaultValue = 0) => {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : defaultValue;
    };

    const price = parseNumber(
      mergedSource?.final_price ??
        mergedSource?.price ??
        mergedSource?.sellingPrice ??
        mergedSource?.discountedPrice,
      parseNumber(fallbackData?.price, 0)
    );

    const originalPrice = parseNumber(
      mergedSource?.original_price ??
        mergedSource?.originalPrice ??
        mergedSource?.mrp,
      price > 0 ? price : parseNumber(fallbackData?.originalPrice, price)
    );

    return {
      id: resolvedId,
      title:
        mergedSource?.title ||
        mergedSource?.book_name ||
        mergedSource?.productTitle ||
        fallbackData?.title ||
        'Book unavailable',
      image:
        mergedSource?.coverImageUrl ||
        mergedSource?.image ||
        mergedSource?.productImage ||
        fallbackData?.image ||
        '/images/book1.jpg',
      price,
      originalPrice,
      author:
        mergedSource?.author ||
        mergedSource?.author_name ||
        mergedSource?.writer ||
        fallbackData?.author ||
        'Unknown Author',
      rating: parseNumber(
        mergedSource?.rating ?? mergedSource?.avgRating ?? fallbackData?.rating,
        4.5
      ),
      category:
        mergedSource?.category ||
        mergedSource?.genre ||
        fallbackData?.category ||
        'General',
      inStock:
        mergedSource?.inStock ??
        mergedSource?.isActive ??
        mergedSource?.stock_status ??
        fallbackData?.inStock ??
        true,
    };
  }, []);

  const refreshWishlistFromServer = useCallback(async () => {
    if (!userId) return [];
    setIsWishlistLoading(true);
    try {
      const products = await fetchWishlistProductIds(userId);
      setServerWishlistItems(products || []);
      return products;
    } catch (error) {
      console.error('Failed to fetch wishlist from server', error);
      throw error;
    } finally {
      setIsWishlistLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) {
      setIsWishlistLoading(false);
      setServerWishlistItems([]);
      const localWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      setWishlist(localWishlist);
      return;
    }

    let cancelled = false;

    const syncWishlist = async () => {
      try {
        await refreshWishlistFromServer();
      } catch (error) {
        if (!cancelled) {
          console.error('Unable to synchronize wishlist on login', error);
        }
      }
    };

    syncWishlist();

    return () => {
      cancelled = true;
    };
  }, [userId, refreshWishlistFromServer]);

  useEffect(() => {
    if (!userId) return;
    const mapped = serverWishlistItems
      .map(entry => {
        const normalizedId =
          typeof entry === 'object'
            ? entry?.productId || entry?._id || entry?.id || entry?.product_id
            : entry;
        const key = normalizedId !== undefined && normalizedId !== null ? String(normalizedId) : undefined;
        const bookMatch = key ? booksIndex.get(key) : undefined;
        return formatBookForWishlist(bookMatch, key, typeof entry === 'object' ? entry : null);
      })
      .filter(Boolean);
    setWishlist(mapped);
  }, [userId, serverWishlistItems, booksIndex, formatBookForWishlist]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync cart from backend (for logged-in users) or localStorage (for logged-out users)
  useEffect(() => {
    // cartResponse is already an array (transformed by cartService.js transformResponse)
    if (userId && Array.isArray(cartResponse)) {
      // For logged-in users: sync from backend
      // cartResponse is already transformed to array of cart items
      setCart(cartResponse);
      // Also update localStorage for consistency
      localStorage.setItem('cart', JSON.stringify(cartResponse));
    } else if (!userId) {
      // For logged-out users: sync from localStorage
      const syncCartFromStorage = () => {
        try {
          const localCart = JSON.parse(localStorage.getItem('cart')) || [];
          setCart(localCart);
        } catch (error) {
          console.error('Error syncing cart from localStorage:', error);
        }
      };
      syncCartFromStorage();
    }
  }, [userId, cartResponse]);

  // Sync cart from localStorage on cart-updated event (for logged-out users)
  useEffect(() => {
    if (userId) return; // Skip for logged-in users (they use backend)

    const syncCartFromStorage = () => {
      try {
        const localCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(localCart);
      } catch (error) {
        console.error('Error syncing cart from localStorage:', error);
      }
    };

    // Sync on cart-updated event (from same tab)
    window.addEventListener('cart-updated', syncCartFromStorage);
    
    // Sync on storage event (from other tabs)
    window.addEventListener('storage', (e) => {
      if (e.key === 'cart') {
        syncCartFromStorage();
      }
    });

    return () => {
      window.removeEventListener('cart-updated', syncCartFromStorage);
      window.removeEventListener('storage', syncCartFromStorage);
    };
  }, [userId]);

  // ENHANCED HANDLERS WITH NOTIFICATIONS
const handleAddToCart = async (book) => {
  const productId = book._id || book.id || book.productId;
  
  if (!productId) {
    console.error('Cannot add to cart: missing product ID', book);
    notification.custom('Error: Product ID not found', 'error');
    return;
  }

  // For logged-in users: sync with backend
  if (userId) {
    try {
      await addToCartMutation({
        userId,
        productId,
        quantity: 1,
      }).unwrap();
      notification.addToCart(book.title);
      // Cart will auto-refresh via RTK Query invalidation, which will trigger the useEffect above
      // No need to manually update cart state - it will sync from cartResponse
    } catch (error) {
      console.error('Error adding to cart (backend):', error);
      notification.custom('Failed to add item to cart. Please try again.', 'error');
    }
  } else {
    // For logged-out users: use localStorage only
    let local = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = local.some(
      item => item.id === productId
    );

    if (!exists) {
      local.push({
        id: productId,
        title: book.title,
        image: book.image || book.coverImageUrl,
        price: book.price || book.final_price,
        originalPrice: book.originalPrice || book.original_price,
        author: book.author,
        quantity: 1,
      });

      localStorage.setItem("cart", JSON.stringify(local));
      setCart(local);
      window.dispatchEvent(new Event("cart-updated"));
      notification.addToCart(book.title);
    }
  }
};



const handleRemoveFromCart = async (id) => {
  // For logged-in users: sync with backend
  if (userId) {
    try {
      await removeFromCartMutation({
  userId,
  productId: id,
}).unwrap();
      notification.removeFromCart();
      // Cart will auto-refresh via RTK Query invalidation, which will trigger the useEffect above
      // No need to manually update cart state - it will sync from cartResponse
    } catch (error) {
      console.error('Error removing from cart (backend):', error);
      notification.custom('Failed to remove item from cart. Please try again.', 'error');
    }
  } else {
    // For logged-out users: use localStorage only
    const local = JSON.parse(localStorage.getItem("cart")) || [];
    const updated = local.filter(item => item.id !== id);

    localStorage.setItem("cart", JSON.stringify(updated));
    setCart(updated);
    window.dispatchEvent(new Event("cart-updated"));
    notification.removeFromCart();
  }
};


  

const handleAddToWishlist = async (book) => {
  const formatted = formatBookForWishlist(book, book?._id || book?.id);
  if (!formatted?.id) return;

  if (!userId) {
    const local = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (local.some(item => item.id === formatted.id)) {
      notification.custom('This book is already in your wishlist.', 'info');
      return;
    }
    const priceValue = Number(book?.final_price ?? book?.price ?? formatted.price ?? 0) || 0;
    const originalPriceValue = Number(
      book?.original_price ?? book?.final_price ?? book?.price ?? formatted.originalPrice ?? priceValue
    ) || priceValue;
    const updated = [
      ...local,
      {
        ...formatted,
        price: priceValue,
        originalPrice: originalPriceValue,
        category: book?.category || formatted.category || 'General',
        rating: Number(book?.rating ?? formatted.rating ?? 4.5) || 4.5,
        inStock: book?.inStock ?? book?.isActive ?? formatted.inStock ?? true,
      }
    ];
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
    window.dispatchEvent(new Event("wishlist-updated"));
    notification.addToWishlist(formatted.title);
    return;
  }

  try {
    await updateWishlistItems({
      userId,
      productIds: [formatted.id],
      action: 'save',
    });
    await refreshWishlistFromServer();
    window.dispatchEvent(new Event("wishlist-updated"));
    notification.addToWishlist(formatted.title);
  } catch (error) {
    console.error('Unable to add book to wishlist', error);
    notification.serverError();
  }
};


  const handleRemoveFromWishlist = async (id) => {
    const normalizedId = typeof id === 'string' ? id : id?._id || id?.id;
    if (!normalizedId) return;
    const bookToRemove = wishlist.find(item => item.id === normalizedId);

    if (!userId) {
      const updated = wishlist.filter(item => item.id !== normalizedId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setWishlist(updated);
      window.dispatchEvent(new Event("wishlist-updated"));
      notification.removeFromWishlist(bookToRemove?.title);
      return;
    }

    try {
      await updateWishlistItems({
        userId,
        productIds: [normalizedId],
        action: 'remove',
      });
      await refreshWishlistFromServer();
      window.dispatchEvent(new Event("wishlist-updated"));
      notification.removeFromWishlist(bookToRemove?.title);
    } catch (error) {
      console.error('Unable to remove book from wishlist', error);
      notification.serverError();
    }
  };



  // HOME PAGE
  const HomePage = () => (
    <>
      <HeroSection
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        onRemoveFromCart={handleRemoveFromCart}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        cart={cart}
        wishlist={wishlist}
      />
      <FeaturedBooks
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onAddToWishlist={handleAddToWishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        cart={cart}
        wishlist={wishlist}
      />
      <AboutSection />
      <ReviewsSection id="reviews"/>
    </>
  );

  // LIBRARY PAGE
  const LibraryPageWrapper = () => (
    <LibraryPage
      onAddToCart={handleAddToCart}
      onRemoveFromCart={handleRemoveFromCart}
      onAddToWishlist={handleAddToWishlist}
      onRemoveFromWishlist={handleRemoveFromWishlist}
      cart={cart}
      wishlist={wishlist}
    />
  );

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isAdmin = useSelector(state => state.adminAuth.adminRole) === 'admin';

  return (
    <div className="App">
      {!isAdminRoute && <Navbar isAdminRoute={isAdminRoute} cartCount={cart.length} wishlistCount={wishlist.length} />}
      <ScrollToTop />
      
      <Notification />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/library" element={<LibraryPageWrapper />} />
        <Route path="/contact" element={<ContactSection />} />
        <Route path="/wishlist" element={
          <WishlistPage
            wishlist={wishlist}
            removeFromWishlist={handleRemoveFromWishlist}
            addToCart={handleAddToCart}
            cart={cart}
            isLoading={isWishlistLoading}
          />
        } />
        <Route path="/cart" element={
          <CartSection
            cart={cart}
            removeFromCart={handleRemoveFromCart}
           
            addToWishlist={handleAddToWishlist}
            wishlist={wishlist}
          />
        } />
        <Route path="/product/:productId" element={
          <ProductSection
            cart={cart}
            wishlist={wishlist}
            onAddToCart={handleAddToCart}
            onRemoveFromCart={handleRemoveFromCart}
            onAddToWishlist={handleAddToWishlist}
            onRemoveFromWishlist={handleRemoveFromWishlist}
          />
        } />
        <Route path="/profile" element={<ProfileSection />} />
        <Route path="/order-history" element={<OrderHistorySection />} />
        <Route path="/my-library" element={<MyLibrarySection />} />
        <Route path="/login" element={<LoginSection />} />
        <Route path="/checkout" element={<CheckoutSection cart={cart} />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
        
        {/* Admin Login Route */}
        <Route path="/admin-login" element={<AdminLogin />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/books" element={<BooksManagement />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/orders" element={<OrdersManagement />} />
        <Route path="/admin/transactions" element={<Transactions />} /> {/* ADD THIS LINE */}
        <Route path="/admin/settings" element={<SettingsPage />} />
        
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {!isAdminRoute && <Footer />}
      
    </div>
  );
}

export default App;