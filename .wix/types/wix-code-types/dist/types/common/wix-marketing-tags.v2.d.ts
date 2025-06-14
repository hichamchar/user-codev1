declare module "wix-marketing-tags.v2" {
    interface MarketingTag extends MarketingTagParamsOneOf {
        /**
         * A [Google Ads Conversion tag](https://support.google.com/tagmanager/answer/6105160?hl=en&ref_topic=6334091)
         * lets site owners analyze what a visitor does after clicking on a Google ad.
         */
        googleAds?: GoogleAds;
        /**
         * A [Google Analytics tag](https://support.google.com/tagmanager/topic/6333310?hl=en&ref_topic=3002579)
         * lets site owners track page views, where visitors are coming from, how long they stay, and
         * what keywords they used to find the site. Both [Google Universal Analytics Tags](https://support.google.com/tagmanager/answer/6107124?hl=en&ref_topic=6333310)
         * and [Google Analytics 4 tags](https://support.google.com/tagmanager/answer/9442095?hl=en&ref_topic=6333310)
         * are supported.
         */
        googleAnalytics?: GoogleAnalytics;
        /**
         * A [Yandex Metrica tag](https://yandex.com/support/metrica/index.html) lets site
         * owners build visual reports of visitor activity that helps them evaluate the
         * performance of their marketing campaigns.
         */
        yandexMetrica?: YandexMetrica;
        /**
         * A [Facebook Pixel tag](https://developers.facebook.com/docs/facebook-pixel/)
         * allows site owners to track Facebook ad-driven visitor activity on their site.
         */
        facebookPixel?: FacebookPixel;
        /**
         * A [Google tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
         * lets site owners implement a quick and easy tag management system that keeps
         * 3rd party code snippets organized.
         */
        googleTagManager?: GoogleTagManager;
        /**
         * A [TikTok Pixel](https://ads.tiktok.com/help/article?aid=9663)
         * allows site owners to share visitor events to TikTok on their site.
         */
        tikTokPixel?: TikTokPixel;
        /**
         * This consent mode tag uses [Google Tag Manager](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530),
         * which allows site owners to implement a quick and easy tag management system that keeps
         * 3rd party code snippets organized.
         */
        googleTagManagerConsentMode?: GoogleTagManagerConsentMode;
        /**
         * This consent mode tag uses the [Google Tag API](https://developers.google.com/tag-platform/gtagjs/reference), which allows site owners to track:
         * - Page views
         * - Where visitors are coming from
         * - How long visitors stay on the site
         * - What keywords visitors used to find the site
         */
        googleAnalyticsConsentMode?: GoogleAnalyticsConsentMode;
        /**
         * Marketing tag ID.
         * @readonly
         */
        _id?: string;
        /**
         * Marketing tag type.
         * @readonly
         */
        type?: Type;
        /**
         * Whether this tag is enabled.
         * Defaults to `true`.
         */
        enabled?: boolean | null;
    }
    /** @oneof */
    interface MarketingTagParamsOneOf {
        /**
         * A [Google Ads Conversion tag](https://support.google.com/tagmanager/answer/6105160?hl=en&ref_topic=6334091)
         * lets site owners analyze what a visitor does after clicking on a Google ad.
         */
        googleAds?: GoogleAds;
        /**
         * A [Google Analytics tag](https://support.google.com/tagmanager/topic/6333310?hl=en&ref_topic=3002579)
         * lets site owners track page views, where visitors are coming from, how long they stay, and
         * what keywords they used to find the site. Both [Google Universal Analytics Tags](https://support.google.com/tagmanager/answer/6107124?hl=en&ref_topic=6333310)
         * and [Google Analytics 4 tags](https://support.google.com/tagmanager/answer/9442095?hl=en&ref_topic=6333310)
         * are supported.
         */
        googleAnalytics?: GoogleAnalytics;
        /**
         * A [Yandex Metrica tag](https://yandex.com/support/metrica/index.html) lets site
         * owners build visual reports of visitor activity that helps them evaluate the
         * performance of their marketing campaigns.
         */
        yandexMetrica?: YandexMetrica;
        /**
         * A [Facebook Pixel tag](https://developers.facebook.com/docs/facebook-pixel/)
         * allows site owners to track Facebook ad-driven visitor activity on their site.
         */
        facebookPixel?: FacebookPixel;
        /**
         * A [Google tag](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530)
         * lets site owners implement a quick and easy tag management system that keeps
         * 3rd party code snippets organized.
         */
        googleTagManager?: GoogleTagManager;
        /**
         * A [TikTok Pixel](https://ads.tiktok.com/help/article?aid=9663)
         * allows site owners to share visitor events to TikTok on their site.
         */
        tikTokPixel?: TikTokPixel;
        /**
         * This consent mode tag uses [Google Tag Manager](https://support.google.com/tagmanager/answer/6102821?hl=en&ref_topic=3441530),
         * which allows site owners to implement a quick and easy tag management system that keeps
         * 3rd party code snippets organized.
         */
        googleTagManagerConsentMode?: GoogleTagManagerConsentMode;
        /**
         * This consent mode tag uses the [Google Tag API](https://developers.google.com/tag-platform/gtagjs/reference), which allows site owners to track:
         * - Page views
         * - Where visitors are coming from
         * - How long visitors stay on the site
         * - What keywords visitors used to find the site
         */
        googleAnalyticsConsentMode?: GoogleAnalyticsConsentMode;
    }
    /** Enum value `UNKNOWN`: Illegal default value, exception will be thrown if used. */
    enum Type {
        UNKNOWN = "UNKNOWN",
        GOOGLE_ADS = "GOOGLE_ADS",
        GOOGLE_ANALYTICS = "GOOGLE_ANALYTICS",
        YANDEX_METRICA = "YANDEX_METRICA",
        FACEBOOK_PIXEL = "FACEBOOK_PIXEL",
        GOOGLE_TAG_MANAGER = "GOOGLE_TAG_MANAGER",
        TIKTOK_PIXEL = "TIKTOK_PIXEL",
        GOOGLE_TAG_MANAGER_CONSENT_MODE = "GOOGLE_TAG_MANAGER_CONSENT_MODE",
        GOOGLE_ANALYTICS_CONSENT_MODE = "GOOGLE_ANALYTICS_CONSENT_MODE"
    }
    interface GoogleAds {
        /** Domain associated with the Google Ads Conversion tag. */
        domain?: string;
        /**
         * Conversion ID in AW-123456789 format.
         * Specifies which Google property is associated with the site owner.
         */
        trackingId?: string;
    }
    interface GoogleAnalytics {
        /** Domain associated with the Google Analytics tag. */
        domain?: string;
        /**
         * Measurement ID for Google Analytics 4 tags in G-12345 format,
         * or Analytics ID for Google Universal Analytics tags in UA-12345-1 format.
         * Specifies which Google property is associated with the site owner.
         */
        trackingId?: string;
        /** Whether IP addresses of site visitors are hidden from Google. */
        ipAnonymization?: boolean | null;
    }
    interface YandexMetrica {
        /** Domain associated with the Yandex Metrica tag. */
        domain?: string;
        /**
         * Yandex Tag Number in 123456789 format.
         * Specifies which Yandex tag is associated with the site owner.
         */
        trackingId?: string;
    }
    interface FacebookPixel {
        /** Domain associated with the Facebook Pixel tag. */
        domain?: string;
        /**
         * Pixel ID in 123456789 format.
         * Specifies which Facebook Pixel is associated with the site owner.
         */
        trackingId?: string;
    }
    interface GoogleTagManager {
        /** Domain associated with the Google tag. */
        domain?: string;
        /**
         * Tag Manager Container ID in GTM-12345 format.
         * Specifies which Google Tag Manager Container is associated with the site owner.
         */
        trackingId?: string;
    }
    interface TikTokPixel {
        /** Domain associated with the TikTok Pixel. */
        domain?: string;
        /** Specifies which TikTok Pixel is associated with the site owner. */
        trackingId?: string;
    }
    interface GoogleTagManagerConsentMode {
        /** Domain associated with the Google tag. */
        domain?: string;
        /**
         * Tag Manager Container ID.
         * Specifies which Google Tag Manager Container is associated with the site owner.
         */
        trackingId?: string;
    }
    interface GoogleAnalyticsConsentMode {
        /** Domain associated with the Google Analytics tag. */
        domain?: string;
        /**
         * Specifies which Google property is associated with the site owner.
         * It is either Measurement ID for [Google Analytics 4](https://developers.google.com/analytics/devguides/collection/ga4) tags in the `G-12345` format,
         * or Analytics ID for Google Universal Analytics tags in the `UA-12345-1` format.
         */
        trackingId?: string;
        /** Whether the IP addresses of site visitors are hidden from Google. */
        ipAnonymization?: boolean | null;
    }
    interface HtmlEmbedUpdateMessage {
        /** Site's id */
        siteId?: string;
    }
    interface UpsertMarketingTagRequest {
        /** Marketing tag to create or update. */
        tag: MarketingTag;
    }
    interface UpsertMarketingTagResponse {
        /** Created or updated marketing tag. */
        tag?: MarketingTag;
    }
    interface ListMarketingTagsRequest {
        /** Information about which tags to retrieve. */
        filter?: Filter;
    }
    /** Information about which marketing tags to retrieve. */
    interface Filter {
        /** Filter by tag type. */
        byType?: Type;
    }
    interface ListMarketingTagsResponse {
        /** List of marketing tags. */
        tags?: MarketingTag[];
    }
    interface DeleteMarketingTagRequest {
        /** Marketing tag to delete. */
        type?: Type;
    }
    interface DeleteMarketingTagResponse {
    }
    interface DeleteMarketingTagV2Request {
        /** Marketing tag to delete. */
        tagType?: Type;
    }
    interface DeleteMarketingTagV2Response {
    }
    interface DomainEvent extends DomainEventBodyOneOf {
        createdEvent?: EntityCreatedEvent;
        updatedEvent?: EntityUpdatedEvent;
        deletedEvent?: EntityDeletedEvent;
        actionEvent?: ActionEvent;
        /**
         * Unique event ID.
         * Allows clients to ignore duplicate webhooks.
         */
        _id?: string;
        /**
         * Assumes actions are also always typed to an entity_type
         * Example: wix.stores.catalog.product, wix.bookings.session, wix.payments.transaction
         */
        entityFqdn?: string;
        /**
         * This is top level to ease client code dispatching of messages (switch on entity_fqdn+slug)
         * This is although the created/updated/deleted notion is duplication of the oneof types
         * Example: created/updated/deleted/started/completed/email_opened
         */
        slug?: string;
        /** ID of the entity associated with the event. */
        entityId?: string;
        /** Event timestamp in [ISO-8601](https://en.wikipedia.org/wiki/ISO_8601) format and UTC time. For example: 2020-04-26T13:57:50.699Z */
        eventTime?: Date | null;
        /**
         * Whether the event was triggered as a result of a privacy regulation application
         * (for example, GDPR).
         */
        triggeredByAnonymizeRequest?: boolean | null;
        /** If present, indicates the action that triggered the event. */
        originatedFrom?: string | null;
        /**
         * A sequence number defining the order of updates to the underlying entity.
         * For example, given that some entity was updated at 16:00 and than again at 16:01,
         * it is guaranteed that the sequence number of the second update is strictly higher than the first.
         * As the consumer, you can use this value to ensure that you handle messages in the correct order.
         * To do so, you will need to persist this number on your end, and compare the sequence number from the
         * message against the one you have stored. Given that the stored number is higher, you should ignore the message.
         */
        entityEventSequence?: string | null;
    }
    /** @oneof */
    interface DomainEventBodyOneOf {
        createdEvent?: EntityCreatedEvent;
        updatedEvent?: EntityUpdatedEvent;
        deletedEvent?: EntityDeletedEvent;
        actionEvent?: ActionEvent;
    }
    interface EntityCreatedEvent {
        entityAsJson?: string;
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo;
    }
    interface RestoreInfo {
        deletedDate?: Date | null;
    }
    interface EntityUpdatedEvent {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent {
        bodyAsJson?: string;
    }
    interface MessageEnvelope {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData;
        /** Stringify payload. */
        data?: string;
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
        identityType?: WebhookIdentityType;
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
    enum WebhookIdentityType {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Creates or updates a marketing tag.
     * <!--
     * > __Note__: This function is restricted and only runs if you elevate permissions using the [wix-auth.elevate()](https://www.wix.com/velo/reference/wix-auth/elevate) function.
     * -->
     * @param tag - Marketing tag to create or update.
     * @public
     * @documentationMaturity preview
     * @requiredField tag
     * @permissionId MARKETING_TAGS.MANAGE
     * @permissionScope Manage Marketing Tags
     * @permissionScopeId SCOPE.DC-MARKETING.MANAGE-TAGS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.marketing.tags.api.v1.MarketingTagsService.UpsertMarketingTag
     */
    function upsertMarketingTag(tag: MarketingTag): Promise<UpsertMarketingTagResponse>;
    /**
     * Retrieves marketing tags given the provided filter.
     * <!--
     * > __Note__: This function is restricted and only runs if you elevate permissions using the [wix-auth.elevate()](https://www.wix.com/velo/reference/wix-auth/elevate) function.
     * -->
     * @public
     * @documentationMaturity preview
     * @param options - Information about the marketing tags to retrieve.
     * @permissionId MARKETING_TAGS.READ
     * @permissionScope Manage Marketing Tags
     * @permissionScopeId SCOPE.DC-MARKETING.MANAGE-TAGS
     * @permissionScope Read Marketing Tags
     * @permissionScopeId SCOPE.DC-MARKETING.READ-TAGS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.marketing.tags.api.v1.MarketingTagsService.ListMarketingTags
     */
    function listMarketingTags(options?: ListMarketingTagsOptions): Promise<ListMarketingTagsResponse>;
    interface ListMarketingTagsOptions {
        /** Information about which tags to retrieve. */
        filter?: Filter;
    }
    /**
     * Deletes a marketing tag.
     * <!-- Commented this out.
     * > __Note__: This function is restricted and only runs if you elevate permissions using the [wix-auth.elevate()](https://www.wix.com/velo/reference/wix-auth/elevate) function.
     * -->
     * @public
     * @documentationMaturity preview
     * @param options - Options to use when deleting a marketing tag.
     * @permissionId MARKETING_TAGS.MANAGE
     * @permissionScope Manage Marketing Tags
     * @permissionScopeId SCOPE.DC-MARKETING.MANAGE-TAGS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.marketing.tags.api.v1.MarketingTagsService.DeleteMarketingTag
     * @deprecated method is deprecated due to a problem occurred when using it via REST.
     * @replacedBy com.wixpress.marketing.tags.api.v1.DeleteMarketingTagV2
     * @targetRemovalDate 2022-10-01
     */
    function deleteMarketingTag(options?: DeleteMarketingTagOptions): Promise<void>;
    interface DeleteMarketingTagOptions {
        /** Information about the marketing tag to delete. */
        type?: Type;
    }
    interface DeleteMarketingTagV2Options {
        /** Marketing tag to delete. */
        tagType?: Type;
    }
    type marketingV1TagMarketingTags_universal_d_MarketingTag = MarketingTag;
    type marketingV1TagMarketingTags_universal_d_MarketingTagParamsOneOf = MarketingTagParamsOneOf;
    type marketingV1TagMarketingTags_universal_d_Type = Type;
    const marketingV1TagMarketingTags_universal_d_Type: typeof Type;
    type marketingV1TagMarketingTags_universal_d_GoogleAds = GoogleAds;
    type marketingV1TagMarketingTags_universal_d_GoogleAnalytics = GoogleAnalytics;
    type marketingV1TagMarketingTags_universal_d_YandexMetrica = YandexMetrica;
    type marketingV1TagMarketingTags_universal_d_FacebookPixel = FacebookPixel;
    type marketingV1TagMarketingTags_universal_d_GoogleTagManager = GoogleTagManager;
    type marketingV1TagMarketingTags_universal_d_TikTokPixel = TikTokPixel;
    type marketingV1TagMarketingTags_universal_d_GoogleTagManagerConsentMode = GoogleTagManagerConsentMode;
    type marketingV1TagMarketingTags_universal_d_GoogleAnalyticsConsentMode = GoogleAnalyticsConsentMode;
    type marketingV1TagMarketingTags_universal_d_HtmlEmbedUpdateMessage = HtmlEmbedUpdateMessage;
    type marketingV1TagMarketingTags_universal_d_UpsertMarketingTagRequest = UpsertMarketingTagRequest;
    type marketingV1TagMarketingTags_universal_d_UpsertMarketingTagResponse = UpsertMarketingTagResponse;
    type marketingV1TagMarketingTags_universal_d_ListMarketingTagsRequest = ListMarketingTagsRequest;
    type marketingV1TagMarketingTags_universal_d_Filter = Filter;
    type marketingV1TagMarketingTags_universal_d_ListMarketingTagsResponse = ListMarketingTagsResponse;
    type marketingV1TagMarketingTags_universal_d_DeleteMarketingTagRequest = DeleteMarketingTagRequest;
    type marketingV1TagMarketingTags_universal_d_DeleteMarketingTagResponse = DeleteMarketingTagResponse;
    type marketingV1TagMarketingTags_universal_d_DeleteMarketingTagV2Request = DeleteMarketingTagV2Request;
    type marketingV1TagMarketingTags_universal_d_DeleteMarketingTagV2Response = DeleteMarketingTagV2Response;
    type marketingV1TagMarketingTags_universal_d_DomainEvent = DomainEvent;
    type marketingV1TagMarketingTags_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type marketingV1TagMarketingTags_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type marketingV1TagMarketingTags_universal_d_RestoreInfo = RestoreInfo;
    type marketingV1TagMarketingTags_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type marketingV1TagMarketingTags_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type marketingV1TagMarketingTags_universal_d_ActionEvent = ActionEvent;
    type marketingV1TagMarketingTags_universal_d_MessageEnvelope = MessageEnvelope;
    type marketingV1TagMarketingTags_universal_d_IdentificationData = IdentificationData;
    type marketingV1TagMarketingTags_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type marketingV1TagMarketingTags_universal_d_WebhookIdentityType = WebhookIdentityType;
    const marketingV1TagMarketingTags_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    const marketingV1TagMarketingTags_universal_d_upsertMarketingTag: typeof upsertMarketingTag;
    const marketingV1TagMarketingTags_universal_d_listMarketingTags: typeof listMarketingTags;
    type marketingV1TagMarketingTags_universal_d_ListMarketingTagsOptions = ListMarketingTagsOptions;
    const marketingV1TagMarketingTags_universal_d_deleteMarketingTag: typeof deleteMarketingTag;
    type marketingV1TagMarketingTags_universal_d_DeleteMarketingTagOptions = DeleteMarketingTagOptions;
    type marketingV1TagMarketingTags_universal_d_DeleteMarketingTagV2Options = DeleteMarketingTagV2Options;
    namespace marketingV1TagMarketingTags_universal_d {
        export { marketingV1TagMarketingTags_universal_d_MarketingTag as MarketingTag, marketingV1TagMarketingTags_universal_d_MarketingTagParamsOneOf as MarketingTagParamsOneOf, marketingV1TagMarketingTags_universal_d_Type as Type, marketingV1TagMarketingTags_universal_d_GoogleAds as GoogleAds, marketingV1TagMarketingTags_universal_d_GoogleAnalytics as GoogleAnalytics, marketingV1TagMarketingTags_universal_d_YandexMetrica as YandexMetrica, marketingV1TagMarketingTags_universal_d_FacebookPixel as FacebookPixel, marketingV1TagMarketingTags_universal_d_GoogleTagManager as GoogleTagManager, marketingV1TagMarketingTags_universal_d_TikTokPixel as TikTokPixel, marketingV1TagMarketingTags_universal_d_GoogleTagManagerConsentMode as GoogleTagManagerConsentMode, marketingV1TagMarketingTags_universal_d_GoogleAnalyticsConsentMode as GoogleAnalyticsConsentMode, marketingV1TagMarketingTags_universal_d_HtmlEmbedUpdateMessage as HtmlEmbedUpdateMessage, marketingV1TagMarketingTags_universal_d_UpsertMarketingTagRequest as UpsertMarketingTagRequest, marketingV1TagMarketingTags_universal_d_UpsertMarketingTagResponse as UpsertMarketingTagResponse, marketingV1TagMarketingTags_universal_d_ListMarketingTagsRequest as ListMarketingTagsRequest, marketingV1TagMarketingTags_universal_d_Filter as Filter, marketingV1TagMarketingTags_universal_d_ListMarketingTagsResponse as ListMarketingTagsResponse, marketingV1TagMarketingTags_universal_d_DeleteMarketingTagRequest as DeleteMarketingTagRequest, marketingV1TagMarketingTags_universal_d_DeleteMarketingTagResponse as DeleteMarketingTagResponse, marketingV1TagMarketingTags_universal_d_DeleteMarketingTagV2Request as DeleteMarketingTagV2Request, marketingV1TagMarketingTags_universal_d_DeleteMarketingTagV2Response as DeleteMarketingTagV2Response, marketingV1TagMarketingTags_universal_d_DomainEvent as DomainEvent, marketingV1TagMarketingTags_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, marketingV1TagMarketingTags_universal_d_EntityCreatedEvent as EntityCreatedEvent, marketingV1TagMarketingTags_universal_d_RestoreInfo as RestoreInfo, marketingV1TagMarketingTags_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, marketingV1TagMarketingTags_universal_d_EntityDeletedEvent as EntityDeletedEvent, marketingV1TagMarketingTags_universal_d_ActionEvent as ActionEvent, marketingV1TagMarketingTags_universal_d_MessageEnvelope as MessageEnvelope, marketingV1TagMarketingTags_universal_d_IdentificationData as IdentificationData, marketingV1TagMarketingTags_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, marketingV1TagMarketingTags_universal_d_WebhookIdentityType as WebhookIdentityType, marketingV1TagMarketingTags_universal_d_upsertMarketingTag as upsertMarketingTag, marketingV1TagMarketingTags_universal_d_listMarketingTags as listMarketingTags, marketingV1TagMarketingTags_universal_d_ListMarketingTagsOptions as ListMarketingTagsOptions, marketingV1TagMarketingTags_universal_d_deleteMarketingTag as deleteMarketingTag, marketingV1TagMarketingTags_universal_d_DeleteMarketingTagOptions as DeleteMarketingTagOptions, marketingV1TagMarketingTags_universal_d_DeleteMarketingTagV2Options as DeleteMarketingTagV2Options, };
    }
    export { marketingV1TagMarketingTags_universal_d as marketingTags };
}
