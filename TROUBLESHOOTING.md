# Gau Krishna - Troubleshooting Guide

## Common Issues & Solutions

### Issue: Cart Items Not Persisting After Page Refresh
**Cause**: localStorage not initialized properly
**Solution**: 
- Check browser console for errors
- Ensure CartProvider wraps app in layout.tsx
- Try clearing localStorage: Dev Tools > Application > Storage > Clear All
- Check if localStorage is disabled in browser settings

### Issue: Product Page Shows "Product Not Found"
**Cause**: Invalid product ID in URL
**Solution**:
- Verify product ID matches exactly (case-sensitive)
- Valid IDs:
  - a2-gir-cow-ghee-5l
  - a2-desi-cow-ghee-5l
  - bilona-churned-desi-buffalo-ghee
  - wood-pressed-groundnut-oil-5l
  - wood-pressed-mustard-oil-5l
  - wood-pressed-coconut-oil-5l
- Check `/lib/products.ts` for correct IDs

### Issue: Prices Not Calculating Correctly
**Cause**: Wrong tax rate or price formula
**Solution**:
- Verify price * quantity calculation in cart
- Tax should be: subtotal * 0.18 (18% GST)
- Total = subtotal + tax
- Check `/app/cart/page.tsx` line ~110 for tax calculation

### Issue: Cart Badge Not Updating
**Cause**: useCart hook not called or cart context issue
**Solution**:
- Ensure Header.tsx uses useCart() hook
- Check CartProvider is in layout.tsx
- Verify totalItems calculation in cart-context.tsx
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: Checkout Form Not Submitting
**Cause**: Form validation or missing required fields
**Solution**:
- Fill ALL fields: firstName, lastName, email, phone, address, city, state, pincode
- Select a payment method (radio button)
- Check browser console for specific error
- Ensure all inputs have required attribute

### Issue: Order Success Page Not Showing
**Cause**: Router navigation issue or redirect problem
**Solution**:
- Check console for errors
- Verify handleSubmit in `/app/checkout/page.tsx`
- Ensure `useRouter` from 'next/navigation' is imported
- Check if order-success/page.tsx file exists

### Issue: Images Not Loading
**Cause**: Image path incorrect or file missing
**Solution**:
- Images referenced as `/images/image.png`
- Add actual images to `/public/images/` folder
- Or change product image paths in `/lib/products.ts`
- Update img src attribute if using custom images

### Issue: Navigation Not Working
**Cause**: Missing Link imports or wrong routes
**Solution**:
- All links must import: `import Link from 'next/link'`
- Use relative paths: `/products`, `/cart`, `/checkout`
- Check Header.tsx and Footer.tsx for link definitions
- Verify routes match file structure

### Issue: Breadcrumbs Not Showing
**Cause**: Link import missing or breadcrumb code commented
**Solution**:
- Check each page has breadcrumb section
- Breadcrumb format: `Home / Products / [current]`
- Verify Link component is imported
- View source to see if HTML is present

### Issue: Mobile Layout Broken
**Cause**: Tailwind responsive classes not working
**Solution**:
- Check viewport meta tag in layout.tsx
- Verify `md:` and `lg:` breakpoints in tailwind config
- Test with DevTools Device Toolbar
- Check for conflicting inline styles

### Issue: Cart Calculations Wrong
**Cause**: Variant price not selected or quantity wrong
**Solution**:
- Verify selectedVariant is set in product detail page
- Check quantity is integer ≥ 1
- Ensure price is from selected variant
- Review CartItem interface in cart-context.tsx

### Issue: "Buy Now" Button Not Working
**Cause**: onClick handler not attached or router not working
**Solution**:
- Check handleBuyNow function exists in product page
- Verify `useRouter` is imported from 'next/navigation'
- Check button onClick={handleBuyNow}
- Ensure product and selectedVariant exist

---

## Performance Issues

### Slow Page Loads
- Check for large images (optimize to < 100KB)
- Verify no excessive re-renders in React DevTools
- Check Network tab in DevTools for slow requests
- Clear browser cache and try again

### High Memory Usage
- CartProvider storing too much data → limit to 100 items
- Check for memory leaks in useEffect
- Clear localStorage if it exceeds quota

---

## Browser Compatibility

### Issue: Layout Shifted on Mobile
**Solution**: 
- Add viewport meta tag
- Test on actual devices
- Use DevTools device emulation

### Issue: Forms Look Wrong in Safari
**Solution**:
- Use standard HTML inputs
- Add -webkit- prefixes if needed
- Test on Safari on macOS and iOS

### Issue: Colors Look Different
**Solution**:
- Check CSS variables are set in globals.css
- Verify color values are correct hex codes
- Test on different monitor displays

---

## Database/API Integration

### When Adding Database Connection
1. Update `/lib/products.ts` to fetch from API instead of static array
2. Create API routes in `/app/api/products/route.ts`
3. Update component to use `useEffect` for data fetching
4. Add loading states while fetching
5. Add error handling for failed requests

### When Adding Payment Gateway
1. Install payment SDK (Razorpay, Stripe, etc.)
2. Create `/app/api/payment/route.ts`
3. Add payment form to checkout page
4. Handle payment response and error scenarios
5. Update order success page with payment status

### When Adding Email Service
1. Install email SDK (SendGrid, Mailgun, etc.)
2. Create `/app/api/email/route.ts`
3. Send email on order placement
4. Add email templates for order confirmation
5. Send shipping/tracking emails on status updates

---

## Development Tips

### Debugging Cart State
```javascript
// Add to component to see cart state
const { items, totalPrice } = useCart();
console.log('Cart Items:', items);
console.log('Total Price:', totalPrice);
```

### Debugging Product Data
```javascript
// Add to product page to verify data
import { getProductById } from '@/lib/products';
const product = getProductById(params.id);
console.log('Product:', product);
```

### Testing Empty Cart
- Open DevTools > Application > Storage > localStorage
- Delete 'cart' key manually
- Page should show "Cart is empty" message

### Testing Cart Persistence
- Add items to cart
- Refresh page (F5)
- Items should still be there
- Check localStorage in DevTools

### Testing Mobile Responsiveness
- DevTools > Toggle Device Toolbar (Ctrl+Shift+M)
- Test at different breakpoints: 320px, 640px, 768px, 1024px
- Check all pages work properly on each size

---

## Console Errors & Fixes

### Error: "useCart must be used within a CartProvider"
**Fix**: Ensure `<CartProvider>` wraps children in layout.tsx

### Error: "getProductById is not a function"
**Fix**: Ensure products.ts exports the function correctly

### Error: "Cannot read property 'variants' of undefined"
**Fix**: Check product exists before accessing variants
```javascript
if (!product) return null;
const variants = product.variants;
```

### Error: "Router is not defined"
**Fix**: Add import: `import { useRouter } from 'next/navigation'`

### Error: "Suspense boundary not found"
**Fix**: Wrap component using useSearchParams in Suspense

---

## Reset Instructions

### Clear All Data
```bash
# Clear localStorage
- Open DevTools
- Application > Storage > localStorage
- Delete 'cart' key
```

### Reset to Fresh State
```bash
# Stop dev server: Ctrl+C
# Clear node_modules (optional): rm -rf node_modules
# Clear cache: rm -rf .next
# Reinstall: npm install
# Start: npm run dev
```

### Restore Defaults
- All product data in `/lib/products.ts` is default
- All page layouts are in original state
- Just re-add your customizations

---

## Getting Help

If issue persists after troubleshooting:

1. **Check the Console**: 
   - DevTools > Console
   - Look for red error messages
   - Note the exact error text

2. **Check the Network Tab**:
   - DevTools > Network
   - Look for failed requests (red)
   - Check response status codes

3. **Verify File Paths**:
   - Exact spelling of files
   - Case sensitivity matters
   - Check imports vs actual filenames

4. **Review Recent Changes**:
   - If just changed something, review the change
   - Test with original code to verify
   - Make one change at a time

5. **Clear Cache**:
   - Hard refresh: Ctrl+Shift+R
   - Clear browser cache
   - Delete .next folder and rebuild

---

**Most issues are caused by:**
1. Missing imports
2. Typos in file/function names
3. localStorage issues
4. Missing HTML elements
5. CSS not loading properly

**Check these first before deep debugging!**
