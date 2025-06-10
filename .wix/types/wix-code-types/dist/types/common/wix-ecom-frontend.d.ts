/**
 * The `wix-ecom-frontend` module contains functionality for working with eCommerce elements from client-side code.
 * 	[Read more](https://www.wix.com/corvid/reference/wix-ecom-frontend.html#)
 */
declare module 'wix-ecom-frontend' {
    /**
     * Directs the browser to navigate to the site visitor's Cart Page.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-ecom-frontend.html#navigateToCartPage)
     */
    function navigateToCartPage(): Promise<void>;
    /**
     * Directs the browser to navigate to the site visitor's Checkout Page.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-ecom-frontend.html#navigateToCheckoutPage)
     */
    function navigateToCheckoutPage(checkoutId: string, options?: CheckoutPageOptions): Promise<void>;
    /**
     * Adds an event handler that runs when the cart changes.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-ecom-frontend.html#onCartChange)
     */
    function onCartChange(handler: onCartChangeHandler): void;
    /**
     * Opens the Side Cart panel.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-ecom-frontend.html#openSideCart)
     */
    function openSideCart(): void;
    /**
     * Updates cart UI elements, like the [Cart Icon](https://support.wix.com/en/article/customizing-the-cart-icon) and Side Cart with the most recent cart data.
     * 	[Read more](https://www.wix.com/corvid/reference/wix-ecom-frontend.html#refreshCart)
     */
    function refreshCart(): Promise<void>;
    type CheckoutPageOptions = {
        /**
         * Whether to skip the delivery details step in checkout. For example, if the product is for pick-up only.
         *
         * Default: `false`
         */
        skipDeliveryStep: boolean;
        /**
         * Whether to hide the ["Continue Browsing"](https://support.wix.com/en/article/customizing-links-on-your-cart-page#customizing-the-continue-browsing-links) button from top-right-hand corner of the Checkout Page.
         *
         * Default: `false`
         */
        hideContinueBrowsingButton: boolean;
        /**
         * URL to replace the default "Continue Browsing" URL. For example, if you'd like to redirect the customer to your own custom page.
         */
        overrideContinueBrowsingUrl: string;
        /**
         * URL to replace the default [Thank You Page](https://support.wix.com/en/article/customizing-the-thank-you-page) URL.
         *
         * Pass `{orderId}` (not the order ID itself) as a parameter to the URL to dynamically insert the order ID. See the example on the right for more information.
         */
        overrideThankYouPageUrl: string;
    };
    /**
     * Function that runs when a cart changes.
     */
    type onCartChangeHandler = () => void;
}
