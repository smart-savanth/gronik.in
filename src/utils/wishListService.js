import api from './api';

const DEFAULT_WISHLIST_PAGE_SIZE = 100;

const normalizeProductDetails = (source) => {
  if (!source) return [];

  const candidates = [
    source.product_details,
    source.productDetails,
    source.products,
    source.items,
    source.wishList,
    source.wishlist,
    source.data?.product_details,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return Array.isArray(source) ? source : [];
};

const pickUserWishlistRecord = (payload, userId) => {
  if (!payload) return null;

  const normalizedUserId = userId != null ? String(userId) : null;

  if (Array.isArray(payload)) {
    const looksLikeUserRecords = payload.some(
      entry => entry?.product_details || entry?.productDetails || entry?.user_id || entry?.userId
    );

    if (!looksLikeUserRecords) {
      return payload;
    }

    const matchingRecord = payload.find(entry =>
      [entry?.user_id, entry?.userId, entry?.user?.guid, entry?.guid]
        .filter(value => value !== undefined && value !== null)
        .some(value => String(value) === normalizedUserId)
    );

    return matchingRecord || payload[0];
  }

  return payload;
};

/**
 * Fetch wishlist product ids for a user.
 * Falls back to the paginated getAll endpoint when /getListByUserId returns 404.
 */
export const fetchWishlistProductIds = async (
  userId,
  { page = 1, pageSize = DEFAULT_WISHLIST_PAGE_SIZE } = {}
) => {
  if (!userId) return [];

  try {
    const response = await api.get(`/wishlist/getListByUserId/${userId}`);
    const record = pickUserWishlistRecord(response?.data?.data, userId);
    return normalizeProductDetails(record);
  } catch (error) {
    if (error?.response?.status === 404) {
      const fallback = await api.post('/wishlist/getAllWishList', { page, pageSize });
      const record = pickUserWishlistRecord(fallback?.data?.data, userId);
      return normalizeProductDetails(record);
    }
    throw error;
  }
};

/**
 * Add or remove products from the wishlist.
 * action: 'save' | 'remove'
 */
export const updateWishlistItems = async ({ userId, productIds, action = 'save' }) => {
  if (!userId || !Array.isArray(productIds) || productIds.length === 0) {
    throw new Error('Invalid wishlist payload');
  }

  const payload = {
    user_id: userId,
    product_details: productIds,
    wishList_type: action === 'remove' ? 'remove' : 'save',
  };

  const response = await api.post('/wishlist/savewishList', payload);
  return response.data;
};

/**
 * Move wishlist entries into the cart (server-side).
 */
export const moveWishlistItemsToCart = async ({ userId, productIds }) => {
  if (!userId || !Array.isArray(productIds) || productIds.length === 0) {
    throw new Error('Invalid wishlist payload');
  }

  const response = await api.post('/wishlist/moveToCart', {
    user_id: userId,
    wishList_type: 'save',
    product_details: productIds,
  });

  return response.data;
};