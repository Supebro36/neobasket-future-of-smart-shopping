
// Centralized exports for all services
export { UserService } from './userService';
export { ProductService } from './productService';
export { OrderService } from './orderService';
export { WatchlistService } from './watchlistService';
export { SearchService } from './searchService';
export { PriceHistoryService } from './priceHistoryService';

// Import all services for the legacy DatabaseService
import { UserService } from './userService';
import { ProductService } from './productService';
import { OrderService } from './orderService';
import { WatchlistService } from './watchlistService';
import { SearchService } from './searchService';
import { PriceHistoryService } from './priceHistoryService';

// Legacy DatabaseService class that delegates to the new services
// This maintains backward compatibility while we transition
export class DatabaseService {
  // User operations
  static getCurrentUser = UserService.getCurrentUser;
  static createUserProfile = UserService.createUserProfile;
  static updateUserProfile = UserService.updateUserProfile;

  // Product operations
  static getProducts = ProductService.getProducts;
  static getProductById = ProductService.getProductById;

  // Order operations
  static createOrder = OrderService.createOrder;
  static getUserOrders = OrderService.getUserOrders;

  // Watchlist operations
  static addToWatchlist = WatchlistService.addToWatchlist;
  static removeFromWatchlist = WatchlistService.removeFromWatchlist;
  static getUserWatchlist = WatchlistService.getUserWatchlist;

  // Search operations
  static searchProducts = SearchService.searchProducts;

  // Price history operations
  static getProductPriceHistory = PriceHistoryService.getProductPriceHistory;
}
