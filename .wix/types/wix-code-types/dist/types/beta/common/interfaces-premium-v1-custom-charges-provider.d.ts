declare module "interfaces-premium-v1-custom-charges-provider" {
  type BusinessError<T = unknown> = {
      __tag: 'BusinessError';
      httpCode: string;
      errorDescription: string;
      applicationCode: string;
      messageSchema: string;
      data: T;
  };
  
  interface GetChargeLimitRequest {
      /**
       * ID of the subscription for which Wix retrieves the charge limit. Equals
       * `null` in case Wix hasn't created the subscription when retrieving an
       * initial charge limit. To track usage and billing for apps, we recommend to
       * use `instanceId` instead of the `subscriptionId`.
       */
      subscriptionId?: string | null;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charge limit. Wix may add supported currencies in the future.
       */
      currency?: string;
  }
  interface GetChargeLimitResponse {
      /**
       * Retrieved charge limit for the app instance. You can't update the
       * charge limit after you've set an initial value. Site owners can increase the
       * limit in their site's dashboard, currently they aren't allowed to decrease it.
       */
      chargeLimit?: string | null;
  }
  interface ListChargesRequest {
      /**
       * ID of the subscription for which Wix retrieves your custom charges.
       * To track usage and billing for apps, we recommend to use `instanceId` instead
       * of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of your charges to return. Wix may add supported currencies in the future.
       */
      currency?: string;
      /**
       * Begin of the period Wix retrieves the app instance's charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      periodStart?: Date | null;
      /**
       * End of the period Wix retrieves the app instance's charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      periodEnd?: Date | null;
      /** Information about what Wix intends to do with the retrieved charges. */
      intent?: Intent;
  }
  enum Intent {
      /** Inform the customer about how much your app would charge them at the moment. Wix doesn't create an invoice. */
      DISPLAY_ONLY = "DISPLAY_ONLY",
      /** Create an invoice for the customer. */
      CREATE_INVOICE = "CREATE_INVOICE"
  }
  interface ListChargesResponse {
      /**
       * Retrieved charges.
       *
       * Max: 5 charges
       */
      charges?: ChargeLineItem[];
  }
  interface ChargeLineItem {
      /**
       * ID of the charge. Make sure to save the charge ID on your servers for future
       * reference. Identical to `lineItem.chargeId` in the Invoice Created Event.
       *
       * Max: 64 characters
       */
      _id?: string | null;
      /** Charge description. */
      description?: string;
      /**
       * Charge amount in the currency that's specified in the request. Use a whole number
       * or separate major and minor units with a dot. For example, `10` or `1.99`. If
       * you return an amount with more minor units than supported according to
       * [ISO-4217](https://en.wikipedia.org/wiki/ISO_4217#Active_codes),
       * Wix truncates the additional minor units.
       *
       * Min: `0.50`
       */
      amount?: string;
  }
  interface ChargesRejectedRequest {
      /**
       * ID of the subscription for which Wix hasn't accepted your custom charges.
       * To track usage and billing for apps, we recommend to use `instanceId` instead
       * of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charges. Wix may add supported currencies in the future.
       */
      currency?: string;
      /**
       * IDs of the rejected charges.
       *
       * Max: 5 charges
       */
      chargeIds?: string[] | null;
      /**
       * Maximum amount that your app may charge the customer per billing cycle.
       *
       * Min: `0.50`
       */
      chargeLimit?: string | null;
      /**
       * Information about why Wix has rejected your app's charges.
       *
       * Max: 20 reasons
       */
      reasons?: ChargesRejectedReason[];
  }
  enum ChargesRejectedReason {
      /** There is no information about why Wix has rejected the charges. */
      UNKNOWN = "UNKNOWN",
      /** The sum of the charges is higher than the limit that you may charge the customer per billing cycle. */
      CHARGE_LIMIT_EXCEEDED = "CHARGE_LIMIT_EXCEEDED",
      /** You can't provide more than 5 charges per invoice. */
      TOO_MANY_CHARGES = "TOO_MANY_CHARGES",
      /** You must submit charges as whole numbers or use a dot to separate major and minor units. For example, `10` or `1.50`. Currently, Wix doesn't validate whether the submitted number of decimals for the minor unit is supported for the given currency. */
      INVALID_FORMAT = "INVALID_FORMAT"
  }
  interface ChargesRejectedResponse {
  }
  interface InvoiceCreatedRequest {
      /**
       * ID of the subscription for which Wix has created an invoice that includes
       * your custom charges. To track usage and billing for apps, we recommend to use
       * `instanceId` instead of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charges. Wix may add supported currencies in the future.
       */
      currency?: string;
      /** ID of the created invoice. */
      invoiceId?: string;
      /** Line items included in the invoice. */
      lineItems?: InvoiceLineItem[];
  }
  interface InvoiceLineItem {
      /**
       * ID of the charge as returned in List Charges.
       *
       * Max: 64 characters
       */
      chargeId?: string | null;
      /** Charge amount. */
      amount?: string;
      /** ID of the line item in the invoice that Wix sends to the customer. */
      _id?: string;
  }
  interface InvoiceCreatedResponse {
  }
  interface ChargeLimitUpdatedRequest {
      /**
       * ID of the subscription for which the charge limit has been updated.
       * To track usage and billing for apps, we recommend to use `instanceId` instead
       * of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charges. Wix may add supported currencies in the future.
       */
      currency?: string;
      /** Updated charge limit. */
      chargeLimit?: string | null;
  }
  interface ChargeLimitUpdatedResponse {
  }
  interface CustomChargesConfig {
      /**
       * Base part of your integration's deployment URI for the Custom Charges SPI.
       * For example `"https://provider.example.com"`, if Wix should call your
       * integration at `https://provider.example.com/v1/charge-limit` for the
       * Get Charge Limit method.
       */
      baseUri?: SpiBaseUri;
  }
  interface SpiBaseUri {
      /**
       * Base URI where the methods are called. Wix appends the path to the `baseUri`.
       * For example, to call the Get Shipping Rates method at `https://my-shipping-provider.com/v1/getRates`, the base URI you provide here is `https://my-shipping-provider.com/`.
       */
      baseUri?: string;
      /** Alternate, custom URIs to replace the default URIs for specific service plugin methods. */
      alternativeUris?: AlternativeUri[];
  }
  interface AlternativeUri {
      /**
       * Name of the method to create a custom URI for.
       *
       * For `methodName`, use the name of the method in PascalCase.
       * For example, for Get Shipping Rates use `GetShippingRates`.
       */
      methodName?: string;
      /**
       * Custom URI that Wix uses to call your server for this method. The path-suffix documented in the method will not be appended to this URI.
       * Must be a secured endpoint beginning with `https://`. For example, `https://www.my-shipping-provider.com/my-shipping-rates`.
       */
      absoluteUri?: string;
  }
  /**
   * this message is not directly used by any service,
   * it exists to describe the expected parameters that SHOULD be provided to invoked Velo methods as part of open-platform.
   * e.g. SPIs, event-handlers, etc..
   * NOTE: this context object MUST be provided as the last argument in each Velo method signature.
   *
   * Example:
   * ```typescript
   * export function wixStores_onOrderCanceled({ event, metadata }: OrderCanceledEvent) {
   * ...
   * }
   * ```
   */
  interface Context {
      /** A unique identifier of the request. You may print this ID to your logs to help with future debugging and easier correlation with Wix's logs. */
      requestId?: string | null;
      /** [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) 3-letter currency code. */
      currency?: string | null;
      /** An object that describes the identity that triggered this request. */
      identity?: IdentificationData;
      /** A string representing a language and region in the format of `"xx-XX"`. First 2 letters represent the language code according to ISO 639-1. This is followed by a dash "-", and then a by 2 capital letters representing the region according to ISO 3166-2. For example, `"en-US"`. */
      languages?: string[];
      /** The service provider app's instance ID. */
      instanceId?: string | null;
      /**
       * Extension ID in Dev Center.
       * @internal
       */
      appExtensionId?: string | null;
      /**
       * Extension type in Dev Center.
       * @internal
       */
      appExtensionType?: string | null;
      /**
       * Invoked function.
       * @internal
       */
      functionName?: string | null;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  interface IdentificationData extends IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
      /** @readonly */
      identityType?: IdentityType;
  }
  /** @oneof */
  interface IdentificationDataIdOneOf {
      /** ID of a site visitor that has not logged in to the site. */
      anonymousVisitorId?: string;
      /** ID of a site visitor that has logged in to the site. */
      memberId?: string;
      /** ID of a Wix user (site owner, contributor, etc.). */
      wixUserId?: string;
      /** ID of an app. */
      appId?: string;
  }
  interface GetChargeLimitOptions {
      /**
       * ID of the subscription for which Wix retrieves the charge limit. Equals
       * `null` in case Wix hasn't created the subscription when retrieving an
       * initial charge limit. To track usage and billing for apps, we recommend to
       * use `instanceId` instead of the `subscriptionId`.
       */
      subscriptionId?: string | null;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charge limit. Wix may add supported currencies in the future.
       */
      currency?: string;
  }
  interface ListChargesOptions {
      /**
       * ID of the subscription for which Wix retrieves your custom charges.
       * To track usage and billing for apps, we recommend to use `instanceId` instead
       * of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of your charges to return. Wix may add supported currencies in the future.
       */
      currency?: string;
      /**
       * Begin of the period Wix retrieves the app instance's charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      periodStart?: Date | null;
      /**
       * End of the period Wix retrieves the app instance's charges for in
       * `YYYY-MM-DDThh:mm:ss.sssZ` format.
       */
      periodEnd?: Date | null;
      /** Information about what Wix intends to do with the retrieved charges. */
      intent?: Intent;
  }
  interface ChargesRejectedEventOptions {
      /**
       * ID of the subscription for which Wix hasn't accepted your custom charges.
       * To track usage and billing for apps, we recommend to use `instanceId` instead
       * of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charges. Wix may add supported currencies in the future.
       */
      currency?: string;
      /**
       * IDs of the rejected charges.
       *
       * Max: 5 charges
       */
      chargeIds?: string[] | null;
      /**
       * Maximum amount that your app may charge the customer per billing cycle.
       *
       * Min: `0.50`
       */
      chargeLimit?: string | null;
      /**
       * Information about why Wix has rejected your app's charges.
       *
       * Max: 20 reasons
       */
      reasons?: ChargesRejectedReason[];
  }
  interface InvoiceCreatedEventOptions {
      /**
       * ID of the subscription for which Wix has created an invoice that includes
       * your custom charges. To track usage and billing for apps, we recommend to use
       * `instanceId` instead of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charges. Wix may add supported currencies in the future.
       */
      currency?: string;
      /** ID of the created invoice. */
      invoiceId?: string;
      /** Line items included in the invoice. */
      lineItems?: InvoiceLineItem[];
  }
  interface ChargeLimitUpdatedEventOptions {
      /**
       * ID of the subscription for which the charge limit has been updated.
       * To track usage and billing for apps, we recommend to use `instanceId` instead
       * of the `subscriptionId`.
       */
      subscriptionId?: string;
      /**
       * Supported values: `AUD`, `BRL`, `CAD`, `EUR`, `GBP`, `ILS`, `INR`, `JPY`, `MXN`, `PLN`, `RUB`, `TRY`, `USD`.
       *
       * 3-letter currency code in
       * [ISO-4217 alphabetic](https://en.wikipedia.org/wiki/ISO_4217#Active_codes)
       * format of the charges. Wix may add supported currencies in the future.
       */
      currency?: string;
      /** Updated charge limit. */
      chargeLimit?: string | null;
  }
  
  export { AlternativeUri, BusinessError, ChargeLimitUpdatedEventOptions, ChargeLimitUpdatedRequest, ChargeLimitUpdatedResponse, ChargeLineItem, ChargesRejectedEventOptions, ChargesRejectedReason, ChargesRejectedRequest, ChargesRejectedResponse, Context, CustomChargesConfig, GetChargeLimitOptions, GetChargeLimitRequest, GetChargeLimitResponse, IdentificationData, IdentificationDataIdOneOf, IdentityType, Intent, InvoiceCreatedEventOptions, InvoiceCreatedRequest, InvoiceCreatedResponse, InvoiceLineItem, ListChargesOptions, ListChargesRequest, ListChargesResponse, SpiBaseUri };
}
