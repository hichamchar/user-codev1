declare module "wix-loyalty.v2" {
    /**
     * A loyalty reward is an object a customer can redeem with loyalty points.
     * Redeeming a reward then creates a loyalty coupon that the customer can use.
     */
    interface Reward extends RewardTypeDetailsOneOf {
        /** Discount details. */
        discountAmount?: DiscountAmount;
        /** Coupon details. */
        couponReward?: CouponReward;
        /**
         * Reward ID.
         * @readonly
         */
        _id?: string | null;
        /** Reward name. */
        name?: string;
        /** Whether the reward is active. Default: `FALSE` */
        active?: boolean;
        /**
         * Reward type.
         *
         * + `DISCOUNT_AMOUNT`: Discount reward. Special flexible reward type used in checkout.
         * + `COUPON_REWARD`: Coupon reward. [Learn more about coupons.](https://support.wix.com/en/article/using-coupons-as-loyalty-rewards)
         * + `SPI_DISCOUNT_AMOUNT`: Same as discount reward, provided by an SPI implementation - i.e. Functions, Velo, etc.
         */
        type?: RewardType;
        /**
         * Revision number, which increments by 1 each time the loyalty reward is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty reward.
         * @readonly
         */
        revision?: string | null;
        /**
         * Date and time the reward was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the reward was last updated.
         * @readonly
         */
        _updatedDate?: Date;
    }
    /** @oneof */
    interface RewardTypeDetailsOneOf {
        /** Discount details. */
        discountAmount?: DiscountAmount;
        /** Coupon details. */
        couponReward?: CouponReward;
    }
    /** Available reward types. */
    enum RewardType {
        UNDEFINED = "UNDEFINED",
        DISCOUNT_AMOUNT = "DISCOUNT_AMOUNT",
        COUPON_REWARD = "COUPON_REWARD",
        SPI_DISCOUNT_AMOUNT = "SPI_DISCOUNT_AMOUNT"
    }
    interface DiscountAmount {
        /** Discount details for each tier. */
        configsByTier?: DiscountAmountConfig[];
    }
    interface DiscountAmountConfig {
        /** Discount amount. Must be a positive value. */
        amount?: string;
        /** Tier ID, or empty if config applies to the base tier. */
        tierId?: string | null;
        /** Amount of points required to redeem the reward. */
        costInPoints?: number;
    }
    interface CouponReward extends CouponRewardDiscountTypeOneOf, CouponRewardScopeOrMinSubtotalOneOf {
        /** Discount as a fixed amount. */
        fixedAmount?: FixedAmountDiscount;
        /** Discount as a percentage. */
        percentage?: PercentageDiscount;
        /** Free shipping. */
        freeShipping?: FreeShippingDiscount;
        /** Limit the coupon to carts with a subtotal greater than this number. */
        minimumSubtotal?: number;
        /**
         * Specifies the type of line items this coupon will apply to.
         *
         * For more information, see the Coupons API.
         */
        scope?: CouponScope;
        /** Whether the coupon is limited to one item. */
        limitedToOneItem?: boolean | null;
        /**
         * Whether the coupon applies to subscription products.
         *
         * If set to `true`, the discount will apply to all billing cycles.
         */
        appliesToSubscriptions?: boolean | null;
        /** Reserved for internal use. */
        discountedCycleCount?: number | null;
    }
    /** @oneof */
    interface CouponRewardDiscountTypeOneOf {
        /** Discount as a fixed amount. */
        fixedAmount?: FixedAmountDiscount;
        /** Discount as a percentage. */
        percentage?: PercentageDiscount;
        /** Free shipping. */
        freeShipping?: FreeShippingDiscount;
    }
    /** @oneof */
    interface CouponRewardScopeOrMinSubtotalOneOf {
        /** Limit the coupon to carts with a subtotal greater than this number. */
        minimumSubtotal?: number;
        /**
         * Specifies the type of line items this coupon will apply to.
         *
         * For more information, see the Coupons API.
         */
        scope?: CouponScope;
    }
    interface FixedAmountDiscount {
        /** Discount details for each tier. */
        configsByTier?: FixedAmountDiscountConfig[];
    }
    interface FixedAmountDiscountConfig {
        /** Tier ID, or empty if config applies to the base tier. */
        tierId?: string | null;
        /** Amount of points required to redeem the reward. */
        costInPoints?: number;
        /** Discount amount. */
        amount?: number;
    }
    interface PercentageDiscount {
        /** Discount details for each tier. */
        configsByTier?: PercentageDiscountConfig[];
    }
    interface PercentageDiscountConfig {
        /** Tier ID, or empty if config applies to the base tier. */
        tierId?: string | null;
        /** Amount of points required to redeem the reward. */
        costInPoints?: number;
        /** Percentage discount. */
        percentage?: number;
    }
    interface FreeShippingDiscount {
        /** Discount details for each tier. */
        configsByTier?: FreeShippingDiscountConfig[];
    }
    interface FreeShippingDiscountConfig {
        /** Tier ID, or empty if config applies to the base tier. */
        tierId?: string | null;
        /** Amount of points required to redeem the reward. */
        costInPoints?: number;
    }
    interface CouponScope {
        /**
         * Scope namespace.
         *
         * See the Coupons API for valid namespaces.
         */
        namespace?: string;
        /**
         * Coupon scope's applied group.
         *
         * See the Coupons API for valid groups.
         */
        group?: Group;
    }
    interface Group {
        /**
         * Name of coupon scope's group.
         *
         * See the Coupons API for valid groups.
         */
        name?: string;
        /** Entity ID, if the coupon scope is limited to just one item. */
        entityId?: string | null;
    }
    interface SpiDiscountAmount {
        /** Discount details for each tier. */
        configsByTier?: DiscountAmountConfig[];
        /** Description of the SPI discount amount reward. Taken from user input in the SPI config. */
        description?: string;
    }
    interface RewardDisabled {
    }
    interface CreateRewardRequest {
        /** Reward to create. */
        reward: Reward;
    }
    interface CreateRewardResponse {
        /** Created reward. */
        reward?: Reward;
    }
    interface BulkCreateRewardsRequest {
        /** Rewards to create. */
        rewards: Reward[];
    }
    interface BulkCreateRewardsResponse {
        /** Created rewards. */
        results?: BulkRewardResult[];
        /** Total successes and failures of the bulk create rewards action. */
        bulkActionMetadata?: BulkActionMetadata$3;
    }
    interface BulkRewardResult {
        /** Item metadata. */
        itemMetadata?: ItemMetadata$3;
        /** Created reward. */
        item?: Reward;
    }
    interface ItemMetadata$3 {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$3;
    }
    interface ApplicationError$3 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata$3 {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface GetRewardRequest {
        /** ID of the reward to retrieve. */
        _id: string;
    }
    interface GetRewardResponse {
        /** Retrieved reward. */
        reward?: Reward;
    }
    interface BulkGetRewardsRequest {
    }
    interface BulkGetRewardsResponse {
        /** Found rewards per site. */
        rewardsInSite?: RewardsInSite[];
    }
    interface RewardsInSite {
        /** Metasite id. */
        metaSiteId?: string;
        /** Rewards. */
        rewards?: Reward[];
    }
    interface QueryRewardsRequest {
        /** Query parameters. */
        query: CursorQuery$2;
    }
    interface CursorQuery$2 extends CursorQueryPagingMethodOneOf$2 {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging$3;
        /**
         * Filter object.
         *
         * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
         */
        filter?: Record<string, any> | null;
        /**
         * Sort object.
         *
         * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
         */
        sort?: Sorting$3[];
    }
    /** @oneof */
    interface CursorQueryPagingMethodOneOf$2 {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging$3;
    }
    interface Sorting$3 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$3;
    }
    enum SortOrder$3 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface CursorPaging$3 {
        /** Maximum number of items to return in the results. */
        limit?: number | null;
        /**
         * Pointer to the next or previous page in the list of results.
         *
         * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
         * Not relevant for the first request.
         */
        cursor?: string | null;
    }
    interface QueryRewardsResponse {
        /** Retrieved loyalty rewards. */
        rewards?: Reward[];
        /** Details on the paged set of results returned. */
        pagingMetadata?: CursorPagingMetadata$2;
    }
    interface CursorPagingMetadata$2 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Cursor strings that point to the next page, previous page, or both. */
        cursors?: Cursors$3;
        /**
         * Whether there are more pages to retrieve following the current page.
         *
         * + `true`: Another page of results can be retrieved.
         * + `false`: This is the last page.
         */
        hasNext?: boolean | null;
    }
    interface Cursors$3 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface UpdateRewardRequest {
        /** Reward information to update. */
        reward: Reward;
    }
    interface UpdateRewardResponse {
        /** Updated reward. */
        reward?: Reward;
    }
    interface DeleteRewardRequest {
        /** ID of the reward to delete. */
        _id: string;
        /**
         * Revision number, which increments by 1 each time the reward is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when deleting the reward.
         */
        revision?: string;
    }
    interface DeleteRewardResponse {
    }
    interface ListRewardsRequest {
        /** Pagination options. */
        cursorPaging?: CursorPaging$3;
    }
    interface ListRewardsResponse {
        /** Retrieved loyalty rewards. */
        rewards?: Reward[];
        /** Details on the paged set of results returned. */
        pagingMetadata?: PagingMetadataV2$2;
    }
    interface PagingMetadataV2$2 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
        /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
        cursors?: Cursors$3;
    }
    interface ListRewardsInTierRequest {
        /**
         * Tier id.
         * @readonly
         */
        tierId?: string | null;
        /** Pagination options. */
        cursorPaging?: CursorPaging$3;
    }
    interface ListRewardsInTierResponse {
        /** Retrieved loyalty rewards. */
        rewards?: Reward[];
        /** Details on the paged set of results returned. */
        pagingMetadata?: PagingMetadataV2$2;
    }
    interface DomainEvent$5 extends DomainEventBodyOneOf$5 {
        createdEvent?: EntityCreatedEvent$5;
        updatedEvent?: EntityUpdatedEvent$5;
        deletedEvent?: EntityDeletedEvent$5;
        actionEvent?: ActionEvent$5;
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
        eventTime?: Date;
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
    interface DomainEventBodyOneOf$5 {
        createdEvent?: EntityCreatedEvent$5;
        updatedEvent?: EntityUpdatedEvent$5;
        deletedEvent?: EntityDeletedEvent$5;
        actionEvent?: ActionEvent$5;
    }
    interface EntityCreatedEvent$5 {
        entityAsJson?: string;
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$5;
    }
    interface RestoreInfo$5 {
        deletedDate?: Date;
    }
    interface EntityUpdatedEvent$5 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$5 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$5 {
        bodyAsJson?: string;
    }
    interface Empty$5 {
    }
    interface MessageEnvelope$5 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$5;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$5 extends IdentificationDataIdOneOf$5 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$5;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$5 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$5 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Creates a reward that can be redeemed with loyalty points.
     *
     * When a customer redeems a reward, a loyalty coupon is created
     * based on the specifications detailed in either the `discountAmount` or `couponReward` fields. This coupon can
     * then be used by the customer to receive the discount. Note that while the Rewards API uses coupon scopes and specifications,
     * no coupon is actually created until a reward is redeemed with points.
     * See the Coupons API for more information about coupons.
     *
     * A reward's `active` status defaults to `false`. To make the reward available to customers,
     * either set the `active` field to `true` during creation or call [`updateReward()`](#updatereward)
     * to change the status.
     *
     * To customize a reward for each loyalty tier, use the `configsByTier` parameter.
     * This allows you to specify the amount of the earned discount, the cost in loyalty points
     * to redeem the reward, and the tier to which this configuration applies. Each tier requires its own
     * `configsByTier` configuration. To create a reward that is available to loyalty accounts in the base tier,
     * leave the `tierId` field empty. See the Loyalty Tiers API for more information on tiers.
     * @param reward - Reward to create.
     * @public
     * @requiredField reward
     * @requiredField reward.name
     * @permissionId LOYALTY.MANAGE_REWARDS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Created reward.
     */
    function createReward(reward: Reward): Promise<Reward>;
    /**
     * Creates multiple rewards.
     * @param rewards - Rewards to create.
     * @public
     * @requiredField rewards
     * @requiredField rewards.name
     * @permissionId LOYALTY.MANAGE_REWARDS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkCreateRewards(rewards: Reward[]): Promise<BulkCreateRewardsResponse>;
    /**
     * Retrieves a reward.
     * @param _id - ID of the reward to retrieve.
     * @public
     * @requiredField _id
     * @permissionId LOYALTY.READ_REWARDS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Retrieved reward.
     */
    function getReward(_id: string): Promise<Reward>;
    /**
     * Retrieves rewards from all metasites that the caller is the member of.
     *
     * Must be called with user identity.
     * @public
     * @documentationMaturity preview
     * @permissionId LOYALTY.REWARD_BULK_READ
     * @adminMethod
     */
    function bulkGetRewards(): Promise<BulkGetRewardsResponse>;
    /**
     * Retrieves a list of rewards, given the provided paging, filtering, and sorting.
     *
     * Query Rewards runs with these defaults, which you can override: `cursorPaging.limit` is `50`.
     *
     * To learn about working with _Query_ endpoints, see [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language),[Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination),and [Field Projection](https://dev.wix.com/api/rest/getting-started/field-projection).
     * @param query - Query parameters.
     * @public
     * @requiredField query
     * @permissionId LOYALTY.READ_REWARDS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function queryRewards(query: CursorQuery$2): Promise<QueryRewardsResponse>;
    /**
     * Updates a loyalty reward.
     *
     * Use this endpoint to update details of a reward, such as the name, whether or not a reward is active,
     * or the amount of points it costs to redeem. Also use this endpoint to add new tiers that are eligible to redeem a reward.
     *
     * You may not change the `type` of a reward. That is set upon creation and cannot be updated.
     * @param _id - Reward ID.
     * @public
     * @requiredField _id
     * @requiredField reward
     * @requiredField reward.name
     * @requiredField reward.revision
     * @param reward - Reward info to update.
     * @permissionId LOYALTY.MANAGE_REWARDS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function updateReward(_id: string | null, reward: UpdateReward): Promise<UpdateRewardResponse>;
    interface UpdateReward {
        /** Discount details. */
        discountAmount?: DiscountAmount;
        /** Coupon details. */
        couponReward?: CouponReward;
        /**
         * Reward ID.
         * @readonly
         */
        _id?: string | null;
        /** Reward name. */
        name?: string;
        /** Whether the reward is active. Default: `FALSE` */
        active?: boolean;
        /**
         * Reward type.
         *
         * + `DISCOUNT_AMOUNT`: Discount reward. Special flexible reward type used in checkout.
         * + `COUPON_REWARD`: Coupon reward. [Learn more about coupons.](https://support.wix.com/en/article/using-coupons-as-loyalty-rewards)
         * + `SPI_DISCOUNT_AMOUNT`: Same as discount reward, provided by an SPI implementation - i.e. Functions, Velo, etc.
         */
        type?: RewardType;
        /**
         * Revision number, which increments by 1 each time the loyalty reward is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty reward.
         * @readonly
         */
        revision?: string | null;
        /**
         * Date and time the reward was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the reward was last updated.
         * @readonly
         */
        _updatedDate?: Date;
    }
    /**
     * Deletes a reward.
     * @param _id - ID of the reward to delete.
     * @param revision - Revision number, which increments by 1 each time the reward is updated.
     *
     * To prevent conflicting changes, the current `revision` must be passed when deleting the reward.
     * @public
     * @requiredField _id
     * @requiredField revision
     * @permissionId LOYALTY.MANAGE_REWARDS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteReward(_id: string, revision: string): Promise<void>;
    /**
     * Retrieves a list of rewards.
     *
     * The list includes rewards that are currently nonredeemable due to insufficient points held by any customers.
     * @public
     * @param options - List options.
     * @permissionId LOYALTY.READ_REWARDS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function listRewards(options?: ListRewardsOptions): Promise<ListRewardsResponse>;
    interface ListRewardsOptions {
        /** Pagination options. */
        cursorPaging?: CursorPaging$3;
    }
    interface ListRewardsInTierOptions {
        /**
         * Tier id.
         * @readonly
         */
        tierId?: string | null;
        /** Pagination options. */
        cursorPaging?: CursorPaging$3;
    }
    type loyaltyV1RewardRewards_universal_d_Reward = Reward;
    type loyaltyV1RewardRewards_universal_d_RewardTypeDetailsOneOf = RewardTypeDetailsOneOf;
    type loyaltyV1RewardRewards_universal_d_RewardType = RewardType;
    const loyaltyV1RewardRewards_universal_d_RewardType: typeof RewardType;
    type loyaltyV1RewardRewards_universal_d_DiscountAmount = DiscountAmount;
    type loyaltyV1RewardRewards_universal_d_DiscountAmountConfig = DiscountAmountConfig;
    type loyaltyV1RewardRewards_universal_d_CouponReward = CouponReward;
    type loyaltyV1RewardRewards_universal_d_CouponRewardDiscountTypeOneOf = CouponRewardDiscountTypeOneOf;
    type loyaltyV1RewardRewards_universal_d_CouponRewardScopeOrMinSubtotalOneOf = CouponRewardScopeOrMinSubtotalOneOf;
    type loyaltyV1RewardRewards_universal_d_FixedAmountDiscount = FixedAmountDiscount;
    type loyaltyV1RewardRewards_universal_d_FixedAmountDiscountConfig = FixedAmountDiscountConfig;
    type loyaltyV1RewardRewards_universal_d_PercentageDiscount = PercentageDiscount;
    type loyaltyV1RewardRewards_universal_d_PercentageDiscountConfig = PercentageDiscountConfig;
    type loyaltyV1RewardRewards_universal_d_FreeShippingDiscount = FreeShippingDiscount;
    type loyaltyV1RewardRewards_universal_d_FreeShippingDiscountConfig = FreeShippingDiscountConfig;
    type loyaltyV1RewardRewards_universal_d_CouponScope = CouponScope;
    type loyaltyV1RewardRewards_universal_d_Group = Group;
    type loyaltyV1RewardRewards_universal_d_SpiDiscountAmount = SpiDiscountAmount;
    type loyaltyV1RewardRewards_universal_d_RewardDisabled = RewardDisabled;
    type loyaltyV1RewardRewards_universal_d_CreateRewardRequest = CreateRewardRequest;
    type loyaltyV1RewardRewards_universal_d_CreateRewardResponse = CreateRewardResponse;
    type loyaltyV1RewardRewards_universal_d_BulkCreateRewardsRequest = BulkCreateRewardsRequest;
    type loyaltyV1RewardRewards_universal_d_BulkCreateRewardsResponse = BulkCreateRewardsResponse;
    type loyaltyV1RewardRewards_universal_d_BulkRewardResult = BulkRewardResult;
    type loyaltyV1RewardRewards_universal_d_GetRewardRequest = GetRewardRequest;
    type loyaltyV1RewardRewards_universal_d_GetRewardResponse = GetRewardResponse;
    type loyaltyV1RewardRewards_universal_d_BulkGetRewardsRequest = BulkGetRewardsRequest;
    type loyaltyV1RewardRewards_universal_d_BulkGetRewardsResponse = BulkGetRewardsResponse;
    type loyaltyV1RewardRewards_universal_d_RewardsInSite = RewardsInSite;
    type loyaltyV1RewardRewards_universal_d_QueryRewardsRequest = QueryRewardsRequest;
    type loyaltyV1RewardRewards_universal_d_QueryRewardsResponse = QueryRewardsResponse;
    type loyaltyV1RewardRewards_universal_d_UpdateRewardRequest = UpdateRewardRequest;
    type loyaltyV1RewardRewards_universal_d_UpdateRewardResponse = UpdateRewardResponse;
    type loyaltyV1RewardRewards_universal_d_DeleteRewardRequest = DeleteRewardRequest;
    type loyaltyV1RewardRewards_universal_d_DeleteRewardResponse = DeleteRewardResponse;
    type loyaltyV1RewardRewards_universal_d_ListRewardsRequest = ListRewardsRequest;
    type loyaltyV1RewardRewards_universal_d_ListRewardsResponse = ListRewardsResponse;
    type loyaltyV1RewardRewards_universal_d_ListRewardsInTierRequest = ListRewardsInTierRequest;
    type loyaltyV1RewardRewards_universal_d_ListRewardsInTierResponse = ListRewardsInTierResponse;
    const loyaltyV1RewardRewards_universal_d_createReward: typeof createReward;
    const loyaltyV1RewardRewards_universal_d_bulkCreateRewards: typeof bulkCreateRewards;
    const loyaltyV1RewardRewards_universal_d_getReward: typeof getReward;
    const loyaltyV1RewardRewards_universal_d_bulkGetRewards: typeof bulkGetRewards;
    const loyaltyV1RewardRewards_universal_d_queryRewards: typeof queryRewards;
    const loyaltyV1RewardRewards_universal_d_updateReward: typeof updateReward;
    type loyaltyV1RewardRewards_universal_d_UpdateReward = UpdateReward;
    const loyaltyV1RewardRewards_universal_d_deleteReward: typeof deleteReward;
    const loyaltyV1RewardRewards_universal_d_listRewards: typeof listRewards;
    type loyaltyV1RewardRewards_universal_d_ListRewardsOptions = ListRewardsOptions;
    type loyaltyV1RewardRewards_universal_d_ListRewardsInTierOptions = ListRewardsInTierOptions;
    namespace loyaltyV1RewardRewards_universal_d {
        export { loyaltyV1RewardRewards_universal_d_Reward as Reward, loyaltyV1RewardRewards_universal_d_RewardTypeDetailsOneOf as RewardTypeDetailsOneOf, loyaltyV1RewardRewards_universal_d_RewardType as RewardType, loyaltyV1RewardRewards_universal_d_DiscountAmount as DiscountAmount, loyaltyV1RewardRewards_universal_d_DiscountAmountConfig as DiscountAmountConfig, loyaltyV1RewardRewards_universal_d_CouponReward as CouponReward, loyaltyV1RewardRewards_universal_d_CouponRewardDiscountTypeOneOf as CouponRewardDiscountTypeOneOf, loyaltyV1RewardRewards_universal_d_CouponRewardScopeOrMinSubtotalOneOf as CouponRewardScopeOrMinSubtotalOneOf, loyaltyV1RewardRewards_universal_d_FixedAmountDiscount as FixedAmountDiscount, loyaltyV1RewardRewards_universal_d_FixedAmountDiscountConfig as FixedAmountDiscountConfig, loyaltyV1RewardRewards_universal_d_PercentageDiscount as PercentageDiscount, loyaltyV1RewardRewards_universal_d_PercentageDiscountConfig as PercentageDiscountConfig, loyaltyV1RewardRewards_universal_d_FreeShippingDiscount as FreeShippingDiscount, loyaltyV1RewardRewards_universal_d_FreeShippingDiscountConfig as FreeShippingDiscountConfig, loyaltyV1RewardRewards_universal_d_CouponScope as CouponScope, loyaltyV1RewardRewards_universal_d_Group as Group, loyaltyV1RewardRewards_universal_d_SpiDiscountAmount as SpiDiscountAmount, loyaltyV1RewardRewards_universal_d_RewardDisabled as RewardDisabled, loyaltyV1RewardRewards_universal_d_CreateRewardRequest as CreateRewardRequest, loyaltyV1RewardRewards_universal_d_CreateRewardResponse as CreateRewardResponse, loyaltyV1RewardRewards_universal_d_BulkCreateRewardsRequest as BulkCreateRewardsRequest, loyaltyV1RewardRewards_universal_d_BulkCreateRewardsResponse as BulkCreateRewardsResponse, loyaltyV1RewardRewards_universal_d_BulkRewardResult as BulkRewardResult, ItemMetadata$3 as ItemMetadata, ApplicationError$3 as ApplicationError, BulkActionMetadata$3 as BulkActionMetadata, loyaltyV1RewardRewards_universal_d_GetRewardRequest as GetRewardRequest, loyaltyV1RewardRewards_universal_d_GetRewardResponse as GetRewardResponse, loyaltyV1RewardRewards_universal_d_BulkGetRewardsRequest as BulkGetRewardsRequest, loyaltyV1RewardRewards_universal_d_BulkGetRewardsResponse as BulkGetRewardsResponse, loyaltyV1RewardRewards_universal_d_RewardsInSite as RewardsInSite, loyaltyV1RewardRewards_universal_d_QueryRewardsRequest as QueryRewardsRequest, CursorQuery$2 as CursorQuery, CursorQueryPagingMethodOneOf$2 as CursorQueryPagingMethodOneOf, Sorting$3 as Sorting, SortOrder$3 as SortOrder, CursorPaging$3 as CursorPaging, loyaltyV1RewardRewards_universal_d_QueryRewardsResponse as QueryRewardsResponse, CursorPagingMetadata$2 as CursorPagingMetadata, Cursors$3 as Cursors, loyaltyV1RewardRewards_universal_d_UpdateRewardRequest as UpdateRewardRequest, loyaltyV1RewardRewards_universal_d_UpdateRewardResponse as UpdateRewardResponse, loyaltyV1RewardRewards_universal_d_DeleteRewardRequest as DeleteRewardRequest, loyaltyV1RewardRewards_universal_d_DeleteRewardResponse as DeleteRewardResponse, loyaltyV1RewardRewards_universal_d_ListRewardsRequest as ListRewardsRequest, loyaltyV1RewardRewards_universal_d_ListRewardsResponse as ListRewardsResponse, PagingMetadataV2$2 as PagingMetadataV2, loyaltyV1RewardRewards_universal_d_ListRewardsInTierRequest as ListRewardsInTierRequest, loyaltyV1RewardRewards_universal_d_ListRewardsInTierResponse as ListRewardsInTierResponse, DomainEvent$5 as DomainEvent, DomainEventBodyOneOf$5 as DomainEventBodyOneOf, EntityCreatedEvent$5 as EntityCreatedEvent, RestoreInfo$5 as RestoreInfo, EntityUpdatedEvent$5 as EntityUpdatedEvent, EntityDeletedEvent$5 as EntityDeletedEvent, ActionEvent$5 as ActionEvent, Empty$5 as Empty, MessageEnvelope$5 as MessageEnvelope, IdentificationData$5 as IdentificationData, IdentificationDataIdOneOf$5 as IdentificationDataIdOneOf, WebhookIdentityType$5 as WebhookIdentityType, loyaltyV1RewardRewards_universal_d_createReward as createReward, loyaltyV1RewardRewards_universal_d_bulkCreateRewards as bulkCreateRewards, loyaltyV1RewardRewards_universal_d_getReward as getReward, loyaltyV1RewardRewards_universal_d_bulkGetRewards as bulkGetRewards, loyaltyV1RewardRewards_universal_d_queryRewards as queryRewards, loyaltyV1RewardRewards_universal_d_updateReward as updateReward, loyaltyV1RewardRewards_universal_d_UpdateReward as UpdateReward, loyaltyV1RewardRewards_universal_d_deleteReward as deleteReward, loyaltyV1RewardRewards_universal_d_listRewards as listRewards, loyaltyV1RewardRewards_universal_d_ListRewardsOptions as ListRewardsOptions, loyaltyV1RewardRewards_universal_d_ListRewardsInTierOptions as ListRewardsInTierOptions, };
    }
    /**
     * A loyalty program allows sites to maintain customer reward accounts. Site owners can create a
     * loyalty program to increase customer retention. Read more about the loyalty program in
     * [this overview](https://support.wix.com/en/article/wix-loyalty-program-an-overview).
     */
    interface LoyaltyProgram {
        /** Program name. */
        name?: string | null;
        /** Information about the program's collectible entity. */
        pointDefinition?: PointDefinition;
        /**
         * Program status. Customers can only earn or redeem points while the program is `ACTIVE`.
         *
         * Default: `"DRAFT"`
         * @readonly
         */
        status?: ProgramStatus;
        /**
         * Date and time the program was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the program was updated.
         * @readonly
         */
        _updatedDate?: Date;
        /** Points expiration configuration */
        pointsExpiration?: PointsExpiration$1;
        /**
         * Information about available premium features
         * @readonly
         */
        premiumFeatures?: PremiumFeatures;
    }
    interface PointDefinition {
        /**
         * Display name for the program's collectible unit.
         *
         * It's recommended to use a plural, for example `Stars`.
         *
         * In contrast to a custom name, the default `"Points"` name is translated and adjusted to singular based on circumstances.
         *
         * Default: `Points`.
         *
         * Max: `20` characters.
         */
        customName?: string | null;
        /** Image URL. See [Image]($w/image/introduction) for more information on URL formats for images. */
        icon?: string;
    }
    enum ProgramStatus {
        UNKNOWN = "UNKNOWN",
        /** initial program status (program was created but was not enabled yet) */
        DRAFT = "DRAFT",
        /** program is active */
        ACTIVE = "ACTIVE",
        /** program was manually disabled by the user (this action can be reverted, meaning user can set it to be active again) */
        PAUSED = "PAUSED"
    }
    interface PointsExpiration$1 {
        /**
         * Status of points expiration feature
         * @readonly
         */
        status?: Status$3;
        /** Expire points after set months of inactivity */
        monthsOfInactivity?: number;
        /** Percentage of points expiring */
        expiringPointsPercentage?: number;
    }
    enum Status$3 {
        UNKNOWN_STATUS = "UNKNOWN_STATUS",
        /** Points expiration feature is disabled */
        DISABLED = "DISABLED",
        /** Points expiration feature is enabled */
        ENABLED = "ENABLED"
    }
    interface PremiumFeatures {
        /**
         * Set to true if user has loyalty program premium feature
         * @readonly
         */
        loyaltyProgram?: boolean;
        /**
         * Set to true if user has tiers premium feature
         * @readonly
         */
        tiers?: boolean;
        /**
         * Set to true if user has points expiration premium feature
         * @readonly
         */
        pointsExpiration?: boolean;
    }
    interface EarningRuleDisabled {
    }
    interface GetLoyaltyProgramRequest {
    }
    interface GetLoyaltyProgramResponse {
        /** Retrieved loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface BulkGetLoyaltyProgramRequest {
    }
    interface BulkGetLoyaltyProgramResponse {
        /** Retrieved loyalty programs. */
        programInSites?: ProgramInSite[];
    }
    interface ProgramInSite {
        /** Metasite ID. */
        metaSiteId?: string;
        /** Loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface UpdateLoyaltyProgramRequest {
        /** Loyalty program fields to update. */
        loyaltyProgram: LoyaltyProgram;
    }
    interface UpdateLoyaltyProgramResponse {
        /** Updated loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface PointsExpirationConfigurationChanged {
        /** Loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
        /** Points expiration configuration changes */
        pointsExpirationChanges?: PointsExpirationChanges;
    }
    interface PointsExpirationChanges {
        monthsOfInactivity?: number | null;
        expiringPointsPercentage?: number | null;
    }
    interface ActivateLoyaltyProgramRequest {
    }
    interface ActivateLoyaltyProgramResponse {
        /** Activated loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface LoyaltyProgramActivated {
        /** Activated loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface PauseLoyaltyProgramRequest {
    }
    interface PauseLoyaltyProgramResponse {
        /** Paused loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface GetLoyaltyProgramDescriptionRequest {
        /** List of description fields to retrieve. Supported values: `description`, `updatedDate`. */
        fields?: string[];
    }
    interface GetLoyaltyProgramDescriptionResponse {
        /** Retrieved loyalty program description. */
        description?: string | null;
        /** Date and time of the latest description update. */
        _updatedDate?: Date;
    }
    interface UpdateLoyaltyProgramDescriptionRequest {
        /** Loyalty program description to update. */
        description?: string;
    }
    interface UpdateLoyaltyProgramDescriptionResponse {
    }
    interface LoyaltyProgramDescriptionUpdated {
    }
    interface GetLoyaltyProgramPremiumFeaturesRequest {
    }
    interface GetLoyaltyProgramPremiumFeaturesResponse {
        /**
         * Set to true if user has loyalty program premium feature
         * @readonly
         */
        loyaltyProgram?: boolean;
        /**
         * Set to true if user has tiers premium feature
         * @readonly
         */
        tiers?: boolean;
        /**
         * Set to true if user has points expiration premium feature
         * @readonly
         */
        pointsExpiration?: boolean;
    }
    interface EnablePointsExpirationRequest {
    }
    interface EnablePointsExpirationResponse {
        /** Loyalty program with enabled points expiration feature. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface PointsExpirationEnabled {
        /** Loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface DisablePointsExpirationRequest {
    }
    interface DisablePointsExpirationResponse {
        /** Loyalty program with disabled points expiration feature. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface PointsExpirationDisabled {
        /** Loyalty program. */
        loyaltyProgram?: LoyaltyProgram;
    }
    interface MetaSiteSpecialEvent$1 extends MetaSiteSpecialEventPayloadOneOf$1 {
        /** Emitted on a meta site creation. */
        siteCreated?: SiteCreated$1;
        /** Emitted on a meta site transfer completion. */
        siteTransferred?: SiteTransferred$1;
        /** Emitted on a meta site deletion. */
        siteDeleted?: SiteDeleted$1;
        /** Emitted on a meta site restoration. */
        siteUndeleted?: SiteUndeleted$1;
        /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
        sitePublished?: SitePublished$1;
        /** Emitted on a meta site unpublish. */
        siteUnpublished?: SiteUnpublished$1;
        /** Emitted when meta site is marked as template. */
        siteMarkedAsTemplate?: SiteMarkedAsTemplate$1;
        /** Emitted when meta site is marked as a WixSite. */
        siteMarkedAsWixSite?: SiteMarkedAsWixSite$1;
        /** Emitted when an application is provisioned (installed). */
        serviceProvisioned?: ServiceProvisioned$1;
        /** Emitted when an application is removed (uninstalled). */
        serviceRemoved?: ServiceRemoved$1;
        /** Emitted when meta site name (URL slug) is changed. */
        siteRenamedPayload?: SiteRenamed$1;
        /** Emitted when meta site was permanently deleted. */
        hardDeleted?: SiteHardDeleted$1;
        /** Emitted on a namespace change. */
        namespaceChanged?: NamespaceChanged$1;
        /** Emitted when Studio is attached. */
        studioAssigned?: StudioAssigned$1;
        /** Emitted when Studio is detached. */
        studioUnassigned?: StudioUnassigned$1;
        /** A meta site id. */
        metaSiteId?: string;
        /** A meta site version. Monotonically increasing. */
        version?: string;
        /** A timestamp of the event. */
        timestamp?: string;
        /** A list of "assets" (applications). The same as MetaSiteContext. */
        assets?: Asset$1[];
    }
    /** @oneof */
    interface MetaSiteSpecialEventPayloadOneOf$1 {
        /** Emitted on a meta site creation. */
        siteCreated?: SiteCreated$1;
        /** Emitted on a meta site transfer completion. */
        siteTransferred?: SiteTransferred$1;
        /** Emitted on a meta site deletion. */
        siteDeleted?: SiteDeleted$1;
        /** Emitted on a meta site restoration. */
        siteUndeleted?: SiteUndeleted$1;
        /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
        sitePublished?: SitePublished$1;
        /** Emitted on a meta site unpublish. */
        siteUnpublished?: SiteUnpublished$1;
        /** Emitted when meta site is marked as template. */
        siteMarkedAsTemplate?: SiteMarkedAsTemplate$1;
        /** Emitted when meta site is marked as a WixSite. */
        siteMarkedAsWixSite?: SiteMarkedAsWixSite$1;
        /** Emitted when an application is provisioned (installed). */
        serviceProvisioned?: ServiceProvisioned$1;
        /** Emitted when an application is removed (uninstalled). */
        serviceRemoved?: ServiceRemoved$1;
        /** Emitted when meta site name (URL slug) is changed. */
        siteRenamedPayload?: SiteRenamed$1;
        /** Emitted when meta site was permanently deleted. */
        hardDeleted?: SiteHardDeleted$1;
        /** Emitted on a namespace change. */
        namespaceChanged?: NamespaceChanged$1;
        /** Emitted when Studio is attached. */
        studioAssigned?: StudioAssigned$1;
        /** Emitted when Studio is detached. */
        studioUnassigned?: StudioUnassigned$1;
    }
    interface Asset$1 {
        /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
        appDefId?: string;
        /** An instance id. For legacy reasons may be UUID or a string. */
        instanceId?: string;
        /** An application state. */
        state?: State$1;
    }
    enum State$1 {
        UNKNOWN = "UNKNOWN",
        ENABLED = "ENABLED",
        DISABLED = "DISABLED",
        PENDING = "PENDING",
        DEMO = "DEMO"
    }
    interface SiteCreated$1 {
        /** A template identifier (empty if not created from a template). */
        originTemplateId?: string;
        /** An account id of the owner. */
        ownerId?: string;
        /** A context in which meta site was created. */
        context?: SiteCreatedContext$1;
        /**
         * A meta site id from which this site was created.
         *
         * In case of a creation from a template it's a template id.
         * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
         */
        originMetaSiteId?: string | null;
        /** A meta site name (URL slug). */
        siteName?: string;
        /** A namespace. */
        namespace?: Namespace$1;
    }
    enum SiteCreatedContext$1 {
        /** A valid option, we don't expose all reasons why site might be created. */
        OTHER = "OTHER",
        /** A meta site was created from template. */
        FROM_TEMPLATE = "FROM_TEMPLATE",
        /** A meta site was created by copying of the transfferred meta site. */
        DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
        /** A copy of existing meta site. */
        DUPLICATE = "DUPLICATE",
        /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
        OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
        /** deprecated A meta site was created for Flash editor. */
        FLASH = "FLASH"
    }
    enum Namespace$1 {
        UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
        /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
        WIX = "WIX",
        /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
        SHOUT_OUT = "SHOUT_OUT",
        /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        ALBUMS = "ALBUMS",
        /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
        /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
        HOTELS = "HOTELS",
        /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        CLUBS = "CLUBS",
        /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
        /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
        DEV_SITE = "DEV_SITE",
        /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        LOGOS = "LOGOS",
        /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        VIDEO_MAKER = "VIDEO_MAKER",
        /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
        PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
        /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
        DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
        /**
         * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
         *
         * Meta site with this namespace will *not* be shown in a user's site list by default.
         */
        HTML_DRAFT = "HTML_DRAFT",
        /**
         * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
         * Will be accessible from Site List and will not have a website app.
         * Once the user attaches a site, the site will become a regular wixsite.
         */
        SITELESS_BUSINESS = "SITELESS_BUSINESS",
        /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
        CREATOR_ECONOMY = "CREATOR_ECONOMY",
        /** It is to be used in the Business First efforts. */
        DASHBOARD_FIRST = "DASHBOARD_FIRST",
        /** Bookings business flow with no site. */
        ANYWHERE = "ANYWHERE",
        /** Namespace for Headless Backoffice with no editor */
        HEADLESS = "HEADLESS",
        /**
         * Namespace for master site that will exist in parent account that will be referenced by subaccounts
         * The site will be used for account level CSM feature for enterprise
         */
        ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
        /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
        RISE = "RISE",
        /**
         * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
         * There's a blank site behind the scene but it's blank).
         * The Mobile company will be the owner of this namespace.
         */
        BRANDED_FIRST = "BRANDED_FIRST",
        /** Nownia.com Siteless account management for Ai Scheduling Assistant. */
        NOWNIA = "NOWNIA"
    }
    /** Site transferred to another user. */
    interface SiteTransferred$1 {
        /** A previous owner id (user that transfers meta site). */
        oldOwnerId?: string;
        /** A new owner id (user that accepts meta site). */
        newOwnerId?: string;
    }
    /** Soft deletion of the meta site. Could be restored. */
    interface SiteDeleted$1 {
        /** A deletion context. */
        deleteContext?: DeleteContext$1;
    }
    interface DeleteContext$1 {
        /** When the meta site was deleted. */
        dateDeleted?: Date;
        /** A status. */
        deleteStatus?: DeleteStatus$1;
        /** A reason (flow). */
        deleteOrigin?: string;
        /** A service that deleted it. */
        initiatorId?: string | null;
    }
    enum DeleteStatus$1 {
        UNKNOWN = "UNKNOWN",
        TRASH = "TRASH",
        DELETED = "DELETED",
        PENDING_PURGE = "PENDING_PURGE"
    }
    /** Restoration of the meta site. */
    interface SiteUndeleted$1 {
    }
    /** First publish of a meta site. Or subsequent publish after unpublish. */
    interface SitePublished$1 {
    }
    interface SiteUnpublished$1 {
        /** A list of URLs previously associated with the meta site. */
        urls?: string[];
    }
    interface SiteMarkedAsTemplate$1 {
    }
    interface SiteMarkedAsWixSite$1 {
    }
    interface ServiceProvisioned$1 {
        /** Either UUID or EmbeddedServiceType. */
        appDefId?: string;
        /** Not only UUID. Something here could be something weird. */
        instanceId?: string;
        /** An instance id from which this instance is originated. */
        originInstanceId?: string;
        /** A version. */
        version?: string | null;
    }
    interface ServiceRemoved$1 {
        /** Either UUID or EmbeddedServiceType. */
        appDefId?: string;
        /** Not only UUID. Something here could be something weird. */
        instanceId?: string;
        /** A version. */
        version?: string | null;
    }
    /** Rename of the site. Meaning, free public url has been changed as well. */
    interface SiteRenamed$1 {
        /** A new meta site name (URL slug). */
        newSiteName?: string;
        /** A previous meta site name (URL slug). */
        oldSiteName?: string;
    }
    /**
     * Hard deletion of the meta site.
     *
     * Could not be restored. Therefore it's desirable to cleanup data.
     */
    interface SiteHardDeleted$1 {
        /** A deletion context. */
        deleteContext?: DeleteContext$1;
    }
    interface NamespaceChanged$1 {
        /** A previous namespace. */
        oldNamespace?: Namespace$1;
        /** A new namespace. */
        newNamespace?: Namespace$1;
    }
    /** Assigned Studio editor */
    interface StudioAssigned$1 {
    }
    /** Unassigned Studio editor */
    interface StudioUnassigned$1 {
    }
    interface Empty$4 {
    }
    interface FeatureEvent extends FeatureEventEventOneOf {
        /**
         * Information about an event that makes a feature eligible to the user.
         * Triggered for example, for new features or when a feature is reassigned
         * to an account or a site.
         */
        enabled?: FeatureEnabled;
        /**
         * Information about an event that disables a feature for the user.
         * Triggered for example, when a feature is unassigned from a site,
         * reassigned to a different site, or the user switched to a different contract.
         */
        disabled?: FeatureDisabled;
        /**
         * Information about an event that updates a feature. An `updated` event
         * is triggered for example by the
         * [Report Quota Usage](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/report-quota-usage)
         * and [Reset Usage Counter](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/reset-usage-counter)
         * endpoints.
         */
        updated?: FeatureUpdated;
        /**
         * Information about an event that cancels a feature for the user.
         * Triggered for example, when a feature is canceled, transferred to
         * another account, or the user switched to a different contract.
         */
        cancelled?: FeatureCancelled;
        /**
         * Timestamp of the event in
         * [UTC time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time).
         */
        timestamp?: Date;
    }
    /** @oneof */
    interface FeatureEventEventOneOf {
        /**
         * Information about an event that makes a feature eligible to the user.
         * Triggered for example, for new features or when a feature is reassigned
         * to an account or a site.
         */
        enabled?: FeatureEnabled;
        /**
         * Information about an event that disables a feature for the user.
         * Triggered for example, when a feature is unassigned from a site,
         * reassigned to a different site, or the user switched to a different contract.
         */
        disabled?: FeatureDisabled;
        /**
         * Information about an event that updates a feature. An `updated` event
         * is triggered for example by the
         * [Report Quota Usage](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/report-quota-usage)
         * and [Reset Usage Counter](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/reset-usage-counter)
         * endpoints.
         */
        updated?: FeatureUpdated;
        /**
         * Information about an event that cancels a feature for the user.
         * Triggered for example, when a feature is canceled, transferred to
         * another account, or the user switched to a different contract.
         */
        cancelled?: FeatureCancelled;
    }
    /** Feature created or enabled after disabled state */
    interface FeatureEnabled extends FeatureEnabledReasonOneOf {
        /** Information about a transfer from another account. */
        transferredFromAnotherAccount?: TransferredFromAnotherAccountReason;
        /** Information about a transfer from another site. */
        reassignedFromSite?: ReassignedFromSiteReason;
        /** Information about a feature that hadn't been assigned to site. */
        assignedFromFloating?: AssignedFromFloatingReason;
        /** Information about the new feature. */
        newFeature?: NewFeatureReason;
        /** Information about the contract switch. */
        contractSwitched?: ContractSwitchedReason;
        /** Information about the manually created features. */
        manualFeatureCreation?: ManualFeatureCreationReason;
        /** Information about a feature that was migrated from legacy. */
        migratedFromLegacy?: MigratedFromLegacyReason;
        /** Enabled feature. */
        feature?: Feature;
        /**
         * Information about a transfer from another account.
         * __Deprecated__. Use `reason.transferred_from_another_account` instead.
         */
        transferredFromAccount?: string | null;
        /**
         * Information about a transfer from another site.
         * __Deprecated__. Use `reason.reassigned_from_site` instead.
         */
        reassignedFromMetasite?: string | null;
    }
    /** @oneof */
    interface FeatureEnabledReasonOneOf {
        /** Information about a transfer from another account. */
        transferredFromAnotherAccount?: TransferredFromAnotherAccountReason;
        /** Information about a transfer from another site. */
        reassignedFromSite?: ReassignedFromSiteReason;
        /** Information about a feature that hadn't been assigned to site. */
        assignedFromFloating?: AssignedFromFloatingReason;
        /** Information about the new feature. */
        newFeature?: NewFeatureReason;
        /** Information about the contract switch. */
        contractSwitched?: ContractSwitchedReason;
        /** Information about the manually created features. */
        manualFeatureCreation?: ManualFeatureCreationReason;
        /** Information about a feature that was migrated from legacy. */
        migratedFromLegacy?: MigratedFromLegacyReason;
    }
    interface Feature extends FeatureQuantityInfoOneOf {
        /**
         * Deprecated. Use `enabled` instead.
         * @deprecated
         */
        booleanFeature?: BooleanFeature;
        /**
         * Deprecated. Use `quotaInfo` instead.
         * @deprecated
         */
        quotaFeature?: QuotaFeature;
        /**
         * ID of the feature. __Note:__ Isn't unique. For example, all features that
         * are available to free Wix accounts or site in some capacity have
         * `{"id": "DEFAULT"}`. Use `uniqueName` as unique identifier for a feature.
         * @readonly
         */
        _id?: string;
        /**
         * Unique name of the feature. Only lower case letters, numbers, and dashes
         * `-` are supported. Used in the endpoints of the
         * [Features Manager API](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/introduction)
         * to specify the feature. Not visible to customers. We recommend to start
         * the unique name with a prefix describing your organization or Wix company.
         * For example, `bookings` or `crm`.
         *
         * Min: 2 characters
         * Max: 50 characters
         */
        uniqueName?: string;
        /**
         * Information about whether the feature belongs to a Wix account or site.
         * Account features have `context.userId`. Site features have `context.metaSiteId` in case
         * they're assigned to a specific site. Site features that aren't assigned to
         * a specific site have neither ID.
         */
        context?: FeatureContext;
        /**
         * Deprecated.
         * @readonly
         * @deprecated
         */
        createdAt?: Date;
        /**
         * Deprecated.
         * @readonly
         * @deprecated
         */
        updatedAt?: Date;
        /**
         * Information about how often customers can use the feature during a specific
         * period. Available only for quota features.
         */
        quotaInfo?: QuotaInfo;
        /**
         * Whether the customer is currently allowed to use the feature.
         * `true` means that the customer can use the feature. This means a boolean
         * feature is active or a quota feature has remaining usage.
         * `false` means that the customer can't use the feature.
         * This means a boolean feature isn't active or a quota feature doesn't
         * have remaining usage.
         */
        enabled?: boolean;
        /**
         * ID of the [subscription](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/subscription-object)
         * to which the feature instance belongs.
         */
        subscriptionId?: string | null;
        /**
         * Metadata of the feature. Wix Premium uses the metadata object to indicate
         * that customers who purchase a product with the feature also get
         * access to an additional product. For these bundled products `metadata`
         * looks like this: `{"tpa": "{"appDefId": "sample-app-def-id-1234567890", "vendorProductId": "sample-productId"}}"`.
         * But you can use the `metadata` property for other purposes, too.
         */
        metadata?: Record<string, string>;
    }
    /** @oneof */
    interface FeatureQuantityInfoOneOf {
        /**
         * Deprecated. Use `enabled` instead.
         * @deprecated
         */
        booleanFeature?: BooleanFeature;
        /**
         * Deprecated. Use `quotaInfo` instead.
         * @deprecated
         */
        quotaFeature?: QuotaFeature;
    }
    /**
     * Context this feature is currently connected to.
     * Note: Do not confuse with feature scope which is configured in the product catalog
     * and defines in which context the product can be used
     */
    interface FeatureContext {
        /**
         * ID of the Wix account that the feature instance belongs to.
         * Available for both site and account level feature instances.
         */
        userId?: string;
        /**
         * ID of the meta site that the feature instance is assigned to.
         * Only available for site level feature instances that are assigned to a Wix
         * site. Not available for account level and unassigned site level feature
         * instances.
         */
        metaSiteId?: string | null;
    }
    /**
     * A feature that can be either "enabled" or "disabled". The default/freemium setting is always OFF, and the premium setting is always ON (meaning, unlimited usage without tracking).
     * A boolean feature is similar to a quantitive feature with a default limit of 0 and UNLIMITED premium limit (although a bit simplified).
     */
    interface BooleanFeature {
    }
    /** A feature with a periodic usage limitation. The default limit is defined in the Feature Spec, the Premium limits are defined in the respective ProductFeature. */
    interface QuotaFeature {
        /** Default (or Freemium) quota limitation. if left undefined the free feature has unlimited amount. */
        limit?: string | null;
        /** Periodic time-frame to reset the usage counter. You may use NO_PERIOD if counter shouldn't be reset. */
        period?: FeaturePeriod;
        /** Usage measurement units (seconds? MBs? unitless?). Usage reported will be counted in multiples of this basic unit. */
        units?: string | null;
    }
    /** Determines the reset cycle of the feature usage. */
    enum FeaturePeriod {
        NO_PERIOD = "NO_PERIOD",
        MILLISECOND = "MILLISECOND",
        SECOND = "SECOND",
        MINUTE = "MINUTE",
        HOUR = "HOUR",
        DAY = "DAY",
        WEEK = "WEEK",
        MONTH = "MONTH",
        YEAR = "YEAR"
    }
    interface QuotaInfo {
        /**
         * How often the customer is allowed to use the feature during the specified
         * period. `null` means that the customer has unlimited access to the feature.
         */
        limit?: string | null;
        /**
         * Time frame for the usage limitation. `NO_PERIOD` means that `remainingUsage`
         * isn't automatically reset to the feature's `limit` after a specific period.
         * You may still manually call
         * [Reset Usage Counter](https://bo.wix.com/wix-docs/rest/premium/premium-features-manager/reset-usage-counter).
         */
        period?: FeaturePeriod;
        /**
         * How often the customer has used the feature during the current
         * period.
         */
        currentUsage?: string;
        /**
         * How often the customer can still use the feature during the current
         * period. `null` means that the customer has unlimited access to the feature.
         */
        remainingUsage?: string | null;
    }
    /** Subscription transferred from another account, features on the current account were enabled. */
    interface TransferredFromAnotherAccountReason {
        /** Information about a transfer from another account. */
        transferredFromAccount?: string;
    }
    /** Subscription moved from one site to another in the same account, features enabled on the target site */
    interface ReassignedFromSiteReason {
        /** Information about a transfer from another site. */
        reassignedFromMetasite?: string;
    }
    /** Subscription was floating and assigned to site, features enabled on the target site */
    interface AssignedFromFloatingReason {
    }
    /** New subscription created and features created as enabled */
    interface NewFeatureReason {
    }
    /** Subscription was upgraded or downgraded, as a result new features enabled, missing features disabled , quantities are updated */
    interface ContractSwitchedReason {
    }
    /** a call to CreateFeature in features-writer, creates feature that is not attached to subscription */
    interface ManualFeatureCreationReason {
    }
    /** Subscription created due to migration from old premium model */
    interface MigratedFromLegacyReason {
    }
    /** Feature disabled and can be enabled in the future */
    interface FeatureDisabled extends FeatureDisabledReasonOneOf {
        /** Information about a feature that's no longer assigned to a site. */
        unassingedToFloating?: UnAssingedToFloatingReason;
        /**
         * Information about a feature that's been replaced by a feature from a
         * different subscription.
         */
        replacedByAnotherSubscription?: ReplacedByAnotherSubscriptionReason;
        /**
         * Information about a feature that's been reassigned to a different
         * site.
         */
        reassignedToAnotherSite?: ReassignedToAnotherSiteReason;
        /**
         * Disabled feature. Includes information about the feature's new state,
         * possibly its new context.
         */
        feature?: Feature;
        /** ID of the meta site for which the feature has been disabled. */
        metaSiteId?: string | null;
    }
    /** @oneof */
    interface FeatureDisabledReasonOneOf {
        /** Information about a feature that's no longer assigned to a site. */
        unassingedToFloating?: UnAssingedToFloatingReason;
        /**
         * Information about a feature that's been replaced by a feature from a
         * different subscription.
         */
        replacedByAnotherSubscription?: ReplacedByAnotherSubscriptionReason;
        /**
         * Information about a feature that's been reassigned to a different
         * site.
         */
        reassignedToAnotherSite?: ReassignedToAnotherSiteReason;
    }
    /** Subscription was unassigned from the site and moved into floating state */
    interface UnAssingedToFloatingReason {
    }
    /** Another subscription was assigned to the site, causing existing features on this site to be disabled */
    interface ReplacedByAnotherSubscriptionReason {
    }
    /** Subscription was assigned to another site, causing  features on the origin  site to be disabled. */
    interface ReassignedToAnotherSiteReason {
        /** Information about a transfer to the site. */
        reassignedToMetasite?: string;
    }
    /** Feature updated, for example Quota was increased due to upgrade */
    interface FeatureUpdated extends FeatureUpdatedPreviousQuantityInfoOneOf, FeatureUpdatedReasonOneOf {
        /** Information about a feature that doesn't have a usage quota. */
        booleanFeature?: BooleanFeature;
        /** Information about a feature that has a usage quota. */
        quotaFeature?: QuotaFeature;
        /** Information about the contract switch. */
        contractSwitched?: ContractSwitchedReason;
        /**
         * Updated feature. Includes information about the feature's new state and
         * possibly its new context.
         */
        feature?: Feature;
    }
    /** @oneof */
    interface FeatureUpdatedPreviousQuantityInfoOneOf {
        /** Information about a feature that doesn't have a usage quota. */
        booleanFeature?: BooleanFeature;
        /** Information about a feature that has a usage quota. */
        quotaFeature?: QuotaFeature;
    }
    /** @oneof */
    interface FeatureUpdatedReasonOneOf {
        /** Information about the contract switch. */
        contractSwitched?: ContractSwitchedReason;
    }
    /** Feature was permanently cancelled */
    interface FeatureCancelled extends FeatureCancelledReasonOneOf {
        /** Information about a transfer to the account. */
        transferredToAnotherAccount?: TransferredToAnotherAccountReason;
        /** Information about the contract switch. */
        contractSwitched?: ContractSwitchedReason;
        /** Information about the feature cancellation. */
        cancelRequest?: CancelRequestedReason;
        /** Canceled feature. */
        feature?: Feature;
        /**
         * Information about a transfer to the account.
         * __Deprecated__. Use `reason.transferred_to_account` instead.
         */
        transferredToAccount?: string | null;
    }
    /** @oneof */
    interface FeatureCancelledReasonOneOf {
        /** Information about a transfer to the account. */
        transferredToAnotherAccount?: TransferredToAnotherAccountReason;
        /** Information about the contract switch. */
        contractSwitched?: ContractSwitchedReason;
        /** Information about the feature cancellation. */
        cancelRequest?: CancelRequestedReason;
    }
    /** Subscription was transferred to another account, features in the origin account were cancelled */
    interface TransferredToAnotherAccountReason {
        /** Information about a transfer to the account. */
        transferredToAccount?: string;
    }
    /** Cancellation was requested from the subscription manager api, might be a result of billing event, or direct call */
    interface CancelRequestedReason {
    }
    interface DomainEvent$4 extends DomainEventBodyOneOf$4 {
        createdEvent?: EntityCreatedEvent$4;
        updatedEvent?: EntityUpdatedEvent$4;
        deletedEvent?: EntityDeletedEvent$4;
        actionEvent?: ActionEvent$4;
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
        eventTime?: Date;
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
    interface DomainEventBodyOneOf$4 {
        createdEvent?: EntityCreatedEvent$4;
        updatedEvent?: EntityUpdatedEvent$4;
        deletedEvent?: EntityDeletedEvent$4;
        actionEvent?: ActionEvent$4;
    }
    interface EntityCreatedEvent$4 {
        entityAsJson?: string;
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$4;
    }
    interface RestoreInfo$4 {
        deletedDate?: Date;
    }
    interface EntityUpdatedEvent$4 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$4 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$4 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$4 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$4;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$4 extends IdentificationDataIdOneOf$4 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$4;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$4 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$4 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Retrieves the site's loyalty program.
     *
     * The `getLoyaltyProgram()` function returns a Promise that resolves to the site's loyalty program.
     * @public
     * @permissionId LOYALTY.READ_PROGRAM
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function getLoyaltyProgram(): Promise<GetLoyaltyProgramResponse>;
    /**
     * Retrieves loyalty programs for all metasites that the caller is a member of.
     *
     * Must be called with user identity.
     * @public
     * @documentationMaturity preview
     * @permissionId LOYALTY.PROGRAM_BULK_READ
     * @adminMethod
     */
    function bulkGetLoyaltyProgram(): Promise<BulkGetLoyaltyProgramResponse>;
    /**
     * Updates the site's loyalty program.
     *
     * The `updateLoyaltyProgram()` function returns a Promise that resolves when the loyalty program is updated.
     *
     * With the `updateLoyaltyProgram()` function you can update the name of the loyalty program and the details of the collectible points unit. To activate the loyalty program use the [`activateLoyaltyProgram()`](wix-loyalty-v2/programs/activateloyaltyprogram) function.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can update a loyalty program. You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.
     * @param loyaltyProgram - Loyalty program fields to update.
     * @public
     * @requiredField loyaltyProgram
     * @permissionId LOYALTY.MANAGE_PROGRAM
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function updateLoyaltyProgram(loyaltyProgram: LoyaltyProgram): Promise<UpdateLoyaltyProgramResponse>;
    /**
     * Activates a loyalty program.
     *
     * The `activateLoyaltyProgram()` function returns a Promise that resolves when the status of the loyalty program is successfully changed to `"ACTIVE"`.
     *
     * Before you begin, a Wix Loyalty Program must first be installed through your [dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Floyalty-accounts/wizard/) or through the [Wix App Market](https://www.wix.com/app-market/loyalty). Initially when a loyalty program is installed, the status is set to `"DRAFT"`. You can change the program's status to `"ACTIVE"` with this function or through your [dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Floyalty-accounts/wizard/). A site's customers can only earn or redeem points while the program status is `"ACTIVE"`.
     *
     * This function updates only the status of a loyalty program, to make other updates to the program, use the [`updateLoyaltyProgram()`](wix-loyalty-v2/programs/updateloyaltyprogram) function.
     *
     * To temporarily pause your loyalty program you must follow three steps:
     * 1. Remove all [`earnPoints()`](wix-loyalty-v2/accounts/earnpoints) functions and switch off all the "Earn Points" and "Rewards" toggles in the [Loyalty Program dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Open%20Loyalty%20Program&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https://www.wix.com/dashboard/{{metaSiteId}}/loyalty-accounts/).
     * 1. Hide the loyalty page from your site.
     * 1. Delete the My Rewards page from the Member pages.
     * See [Pausing Your Loyalty Program](https://support.wix.com/en/article/wix-loyalty-program-pausing-your-loyalty-program) for more information.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can activate a loyalty program. You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.
     * @public
     * @permissionId LOYALTY.MANAGE_PROGRAM
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function activateLoyaltyProgram(): Promise<ActivateLoyaltyProgramResponse>;
    /**
     * Changes the program status to `PAUSED`.
     * @public
     * @permissionId LOYALTY.MANAGE_PROGRAM
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function pauseLoyaltyProgram(): Promise<PauseLoyaltyProgramResponse>;
    interface GetLoyaltyProgramDescriptionOptions {
        /** List of description fields to retrieve. Supported values: `description`, `updatedDate`. */
        fields?: string[];
    }
    interface UpdateLoyaltyProgramDescriptionOptions {
        /** Loyalty program description to update. */
        description?: string;
    }
    /**
     * Get information about available premium features
     * @public
     * @documentationMaturity preview
     * @permissionId LOYALTY.READ_PROGRAM
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     */
    function getLoyaltyProgramPremiumFeatures(): Promise<GetLoyaltyProgramPremiumFeaturesResponse>;
    /**
     * Updates the `pointsExpiration` status to `ENABLED`.
     * @public
     * @permissionId LOYALTY.MANAGE_PROGRAM
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function enablePointsExpiration(): Promise<EnablePointsExpirationResponse>;
    /**
     * Updates the `pointsExpiration` status to `DISABLED`.
     * @public
     * @permissionId LOYALTY.MANAGE_PROGRAM
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function disablePointsExpiration(): Promise<DisablePointsExpirationResponse>;
    type loyaltyV1ProgramPrograms_universal_d_LoyaltyProgram = LoyaltyProgram;
    type loyaltyV1ProgramPrograms_universal_d_PointDefinition = PointDefinition;
    type loyaltyV1ProgramPrograms_universal_d_ProgramStatus = ProgramStatus;
    const loyaltyV1ProgramPrograms_universal_d_ProgramStatus: typeof ProgramStatus;
    type loyaltyV1ProgramPrograms_universal_d_PremiumFeatures = PremiumFeatures;
    type loyaltyV1ProgramPrograms_universal_d_EarningRuleDisabled = EarningRuleDisabled;
    type loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramRequest = GetLoyaltyProgramRequest;
    type loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramResponse = GetLoyaltyProgramResponse;
    type loyaltyV1ProgramPrograms_universal_d_BulkGetLoyaltyProgramRequest = BulkGetLoyaltyProgramRequest;
    type loyaltyV1ProgramPrograms_universal_d_BulkGetLoyaltyProgramResponse = BulkGetLoyaltyProgramResponse;
    type loyaltyV1ProgramPrograms_universal_d_ProgramInSite = ProgramInSite;
    type loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramRequest = UpdateLoyaltyProgramRequest;
    type loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramResponse = UpdateLoyaltyProgramResponse;
    type loyaltyV1ProgramPrograms_universal_d_PointsExpirationConfigurationChanged = PointsExpirationConfigurationChanged;
    type loyaltyV1ProgramPrograms_universal_d_PointsExpirationChanges = PointsExpirationChanges;
    type loyaltyV1ProgramPrograms_universal_d_ActivateLoyaltyProgramRequest = ActivateLoyaltyProgramRequest;
    type loyaltyV1ProgramPrograms_universal_d_ActivateLoyaltyProgramResponse = ActivateLoyaltyProgramResponse;
    type loyaltyV1ProgramPrograms_universal_d_LoyaltyProgramActivated = LoyaltyProgramActivated;
    type loyaltyV1ProgramPrograms_universal_d_PauseLoyaltyProgramRequest = PauseLoyaltyProgramRequest;
    type loyaltyV1ProgramPrograms_universal_d_PauseLoyaltyProgramResponse = PauseLoyaltyProgramResponse;
    type loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramDescriptionRequest = GetLoyaltyProgramDescriptionRequest;
    type loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramDescriptionResponse = GetLoyaltyProgramDescriptionResponse;
    type loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramDescriptionRequest = UpdateLoyaltyProgramDescriptionRequest;
    type loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramDescriptionResponse = UpdateLoyaltyProgramDescriptionResponse;
    type loyaltyV1ProgramPrograms_universal_d_LoyaltyProgramDescriptionUpdated = LoyaltyProgramDescriptionUpdated;
    type loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramPremiumFeaturesRequest = GetLoyaltyProgramPremiumFeaturesRequest;
    type loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramPremiumFeaturesResponse = GetLoyaltyProgramPremiumFeaturesResponse;
    type loyaltyV1ProgramPrograms_universal_d_EnablePointsExpirationRequest = EnablePointsExpirationRequest;
    type loyaltyV1ProgramPrograms_universal_d_EnablePointsExpirationResponse = EnablePointsExpirationResponse;
    type loyaltyV1ProgramPrograms_universal_d_PointsExpirationEnabled = PointsExpirationEnabled;
    type loyaltyV1ProgramPrograms_universal_d_DisablePointsExpirationRequest = DisablePointsExpirationRequest;
    type loyaltyV1ProgramPrograms_universal_d_DisablePointsExpirationResponse = DisablePointsExpirationResponse;
    type loyaltyV1ProgramPrograms_universal_d_PointsExpirationDisabled = PointsExpirationDisabled;
    type loyaltyV1ProgramPrograms_universal_d_FeatureEvent = FeatureEvent;
    type loyaltyV1ProgramPrograms_universal_d_FeatureEventEventOneOf = FeatureEventEventOneOf;
    type loyaltyV1ProgramPrograms_universal_d_FeatureEnabled = FeatureEnabled;
    type loyaltyV1ProgramPrograms_universal_d_FeatureEnabledReasonOneOf = FeatureEnabledReasonOneOf;
    type loyaltyV1ProgramPrograms_universal_d_Feature = Feature;
    type loyaltyV1ProgramPrograms_universal_d_FeatureQuantityInfoOneOf = FeatureQuantityInfoOneOf;
    type loyaltyV1ProgramPrograms_universal_d_FeatureContext = FeatureContext;
    type loyaltyV1ProgramPrograms_universal_d_BooleanFeature = BooleanFeature;
    type loyaltyV1ProgramPrograms_universal_d_QuotaFeature = QuotaFeature;
    type loyaltyV1ProgramPrograms_universal_d_FeaturePeriod = FeaturePeriod;
    const loyaltyV1ProgramPrograms_universal_d_FeaturePeriod: typeof FeaturePeriod;
    type loyaltyV1ProgramPrograms_universal_d_QuotaInfo = QuotaInfo;
    type loyaltyV1ProgramPrograms_universal_d_TransferredFromAnotherAccountReason = TransferredFromAnotherAccountReason;
    type loyaltyV1ProgramPrograms_universal_d_ReassignedFromSiteReason = ReassignedFromSiteReason;
    type loyaltyV1ProgramPrograms_universal_d_AssignedFromFloatingReason = AssignedFromFloatingReason;
    type loyaltyV1ProgramPrograms_universal_d_NewFeatureReason = NewFeatureReason;
    type loyaltyV1ProgramPrograms_universal_d_ContractSwitchedReason = ContractSwitchedReason;
    type loyaltyV1ProgramPrograms_universal_d_ManualFeatureCreationReason = ManualFeatureCreationReason;
    type loyaltyV1ProgramPrograms_universal_d_MigratedFromLegacyReason = MigratedFromLegacyReason;
    type loyaltyV1ProgramPrograms_universal_d_FeatureDisabled = FeatureDisabled;
    type loyaltyV1ProgramPrograms_universal_d_FeatureDisabledReasonOneOf = FeatureDisabledReasonOneOf;
    type loyaltyV1ProgramPrograms_universal_d_UnAssingedToFloatingReason = UnAssingedToFloatingReason;
    type loyaltyV1ProgramPrograms_universal_d_ReplacedByAnotherSubscriptionReason = ReplacedByAnotherSubscriptionReason;
    type loyaltyV1ProgramPrograms_universal_d_ReassignedToAnotherSiteReason = ReassignedToAnotherSiteReason;
    type loyaltyV1ProgramPrograms_universal_d_FeatureUpdated = FeatureUpdated;
    type loyaltyV1ProgramPrograms_universal_d_FeatureUpdatedPreviousQuantityInfoOneOf = FeatureUpdatedPreviousQuantityInfoOneOf;
    type loyaltyV1ProgramPrograms_universal_d_FeatureUpdatedReasonOneOf = FeatureUpdatedReasonOneOf;
    type loyaltyV1ProgramPrograms_universal_d_FeatureCancelled = FeatureCancelled;
    type loyaltyV1ProgramPrograms_universal_d_FeatureCancelledReasonOneOf = FeatureCancelledReasonOneOf;
    type loyaltyV1ProgramPrograms_universal_d_TransferredToAnotherAccountReason = TransferredToAnotherAccountReason;
    type loyaltyV1ProgramPrograms_universal_d_CancelRequestedReason = CancelRequestedReason;
    const loyaltyV1ProgramPrograms_universal_d_getLoyaltyProgram: typeof getLoyaltyProgram;
    const loyaltyV1ProgramPrograms_universal_d_bulkGetLoyaltyProgram: typeof bulkGetLoyaltyProgram;
    const loyaltyV1ProgramPrograms_universal_d_updateLoyaltyProgram: typeof updateLoyaltyProgram;
    const loyaltyV1ProgramPrograms_universal_d_activateLoyaltyProgram: typeof activateLoyaltyProgram;
    const loyaltyV1ProgramPrograms_universal_d_pauseLoyaltyProgram: typeof pauseLoyaltyProgram;
    type loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramDescriptionOptions = GetLoyaltyProgramDescriptionOptions;
    type loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramDescriptionOptions = UpdateLoyaltyProgramDescriptionOptions;
    const loyaltyV1ProgramPrograms_universal_d_getLoyaltyProgramPremiumFeatures: typeof getLoyaltyProgramPremiumFeatures;
    const loyaltyV1ProgramPrograms_universal_d_enablePointsExpiration: typeof enablePointsExpiration;
    const loyaltyV1ProgramPrograms_universal_d_disablePointsExpiration: typeof disablePointsExpiration;
    namespace loyaltyV1ProgramPrograms_universal_d {
        export { loyaltyV1ProgramPrograms_universal_d_LoyaltyProgram as LoyaltyProgram, loyaltyV1ProgramPrograms_universal_d_PointDefinition as PointDefinition, loyaltyV1ProgramPrograms_universal_d_ProgramStatus as ProgramStatus, PointsExpiration$1 as PointsExpiration, Status$3 as Status, loyaltyV1ProgramPrograms_universal_d_PremiumFeatures as PremiumFeatures, loyaltyV1ProgramPrograms_universal_d_EarningRuleDisabled as EarningRuleDisabled, loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramRequest as GetLoyaltyProgramRequest, loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramResponse as GetLoyaltyProgramResponse, loyaltyV1ProgramPrograms_universal_d_BulkGetLoyaltyProgramRequest as BulkGetLoyaltyProgramRequest, loyaltyV1ProgramPrograms_universal_d_BulkGetLoyaltyProgramResponse as BulkGetLoyaltyProgramResponse, loyaltyV1ProgramPrograms_universal_d_ProgramInSite as ProgramInSite, loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramRequest as UpdateLoyaltyProgramRequest, loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramResponse as UpdateLoyaltyProgramResponse, loyaltyV1ProgramPrograms_universal_d_PointsExpirationConfigurationChanged as PointsExpirationConfigurationChanged, loyaltyV1ProgramPrograms_universal_d_PointsExpirationChanges as PointsExpirationChanges, loyaltyV1ProgramPrograms_universal_d_ActivateLoyaltyProgramRequest as ActivateLoyaltyProgramRequest, loyaltyV1ProgramPrograms_universal_d_ActivateLoyaltyProgramResponse as ActivateLoyaltyProgramResponse, loyaltyV1ProgramPrograms_universal_d_LoyaltyProgramActivated as LoyaltyProgramActivated, loyaltyV1ProgramPrograms_universal_d_PauseLoyaltyProgramRequest as PauseLoyaltyProgramRequest, loyaltyV1ProgramPrograms_universal_d_PauseLoyaltyProgramResponse as PauseLoyaltyProgramResponse, loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramDescriptionRequest as GetLoyaltyProgramDescriptionRequest, loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramDescriptionResponse as GetLoyaltyProgramDescriptionResponse, loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramDescriptionRequest as UpdateLoyaltyProgramDescriptionRequest, loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramDescriptionResponse as UpdateLoyaltyProgramDescriptionResponse, loyaltyV1ProgramPrograms_universal_d_LoyaltyProgramDescriptionUpdated as LoyaltyProgramDescriptionUpdated, loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramPremiumFeaturesRequest as GetLoyaltyProgramPremiumFeaturesRequest, loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramPremiumFeaturesResponse as GetLoyaltyProgramPremiumFeaturesResponse, loyaltyV1ProgramPrograms_universal_d_EnablePointsExpirationRequest as EnablePointsExpirationRequest, loyaltyV1ProgramPrograms_universal_d_EnablePointsExpirationResponse as EnablePointsExpirationResponse, loyaltyV1ProgramPrograms_universal_d_PointsExpirationEnabled as PointsExpirationEnabled, loyaltyV1ProgramPrograms_universal_d_DisablePointsExpirationRequest as DisablePointsExpirationRequest, loyaltyV1ProgramPrograms_universal_d_DisablePointsExpirationResponse as DisablePointsExpirationResponse, loyaltyV1ProgramPrograms_universal_d_PointsExpirationDisabled as PointsExpirationDisabled, MetaSiteSpecialEvent$1 as MetaSiteSpecialEvent, MetaSiteSpecialEventPayloadOneOf$1 as MetaSiteSpecialEventPayloadOneOf, Asset$1 as Asset, State$1 as State, SiteCreated$1 as SiteCreated, SiteCreatedContext$1 as SiteCreatedContext, Namespace$1 as Namespace, SiteTransferred$1 as SiteTransferred, SiteDeleted$1 as SiteDeleted, DeleteContext$1 as DeleteContext, DeleteStatus$1 as DeleteStatus, SiteUndeleted$1 as SiteUndeleted, SitePublished$1 as SitePublished, SiteUnpublished$1 as SiteUnpublished, SiteMarkedAsTemplate$1 as SiteMarkedAsTemplate, SiteMarkedAsWixSite$1 as SiteMarkedAsWixSite, ServiceProvisioned$1 as ServiceProvisioned, ServiceRemoved$1 as ServiceRemoved, SiteRenamed$1 as SiteRenamed, SiteHardDeleted$1 as SiteHardDeleted, NamespaceChanged$1 as NamespaceChanged, StudioAssigned$1 as StudioAssigned, StudioUnassigned$1 as StudioUnassigned, Empty$4 as Empty, loyaltyV1ProgramPrograms_universal_d_FeatureEvent as FeatureEvent, loyaltyV1ProgramPrograms_universal_d_FeatureEventEventOneOf as FeatureEventEventOneOf, loyaltyV1ProgramPrograms_universal_d_FeatureEnabled as FeatureEnabled, loyaltyV1ProgramPrograms_universal_d_FeatureEnabledReasonOneOf as FeatureEnabledReasonOneOf, loyaltyV1ProgramPrograms_universal_d_Feature as Feature, loyaltyV1ProgramPrograms_universal_d_FeatureQuantityInfoOneOf as FeatureQuantityInfoOneOf, loyaltyV1ProgramPrograms_universal_d_FeatureContext as FeatureContext, loyaltyV1ProgramPrograms_universal_d_BooleanFeature as BooleanFeature, loyaltyV1ProgramPrograms_universal_d_QuotaFeature as QuotaFeature, loyaltyV1ProgramPrograms_universal_d_FeaturePeriod as FeaturePeriod, loyaltyV1ProgramPrograms_universal_d_QuotaInfo as QuotaInfo, loyaltyV1ProgramPrograms_universal_d_TransferredFromAnotherAccountReason as TransferredFromAnotherAccountReason, loyaltyV1ProgramPrograms_universal_d_ReassignedFromSiteReason as ReassignedFromSiteReason, loyaltyV1ProgramPrograms_universal_d_AssignedFromFloatingReason as AssignedFromFloatingReason, loyaltyV1ProgramPrograms_universal_d_NewFeatureReason as NewFeatureReason, loyaltyV1ProgramPrograms_universal_d_ContractSwitchedReason as ContractSwitchedReason, loyaltyV1ProgramPrograms_universal_d_ManualFeatureCreationReason as ManualFeatureCreationReason, loyaltyV1ProgramPrograms_universal_d_MigratedFromLegacyReason as MigratedFromLegacyReason, loyaltyV1ProgramPrograms_universal_d_FeatureDisabled as FeatureDisabled, loyaltyV1ProgramPrograms_universal_d_FeatureDisabledReasonOneOf as FeatureDisabledReasonOneOf, loyaltyV1ProgramPrograms_universal_d_UnAssingedToFloatingReason as UnAssingedToFloatingReason, loyaltyV1ProgramPrograms_universal_d_ReplacedByAnotherSubscriptionReason as ReplacedByAnotherSubscriptionReason, loyaltyV1ProgramPrograms_universal_d_ReassignedToAnotherSiteReason as ReassignedToAnotherSiteReason, loyaltyV1ProgramPrograms_universal_d_FeatureUpdated as FeatureUpdated, loyaltyV1ProgramPrograms_universal_d_FeatureUpdatedPreviousQuantityInfoOneOf as FeatureUpdatedPreviousQuantityInfoOneOf, loyaltyV1ProgramPrograms_universal_d_FeatureUpdatedReasonOneOf as FeatureUpdatedReasonOneOf, loyaltyV1ProgramPrograms_universal_d_FeatureCancelled as FeatureCancelled, loyaltyV1ProgramPrograms_universal_d_FeatureCancelledReasonOneOf as FeatureCancelledReasonOneOf, loyaltyV1ProgramPrograms_universal_d_TransferredToAnotherAccountReason as TransferredToAnotherAccountReason, loyaltyV1ProgramPrograms_universal_d_CancelRequestedReason as CancelRequestedReason, DomainEvent$4 as DomainEvent, DomainEventBodyOneOf$4 as DomainEventBodyOneOf, EntityCreatedEvent$4 as EntityCreatedEvent, RestoreInfo$4 as RestoreInfo, EntityUpdatedEvent$4 as EntityUpdatedEvent, EntityDeletedEvent$4 as EntityDeletedEvent, ActionEvent$4 as ActionEvent, MessageEnvelope$4 as MessageEnvelope, IdentificationData$4 as IdentificationData, IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf, WebhookIdentityType$4 as WebhookIdentityType, loyaltyV1ProgramPrograms_universal_d_getLoyaltyProgram as getLoyaltyProgram, loyaltyV1ProgramPrograms_universal_d_bulkGetLoyaltyProgram as bulkGetLoyaltyProgram, loyaltyV1ProgramPrograms_universal_d_updateLoyaltyProgram as updateLoyaltyProgram, loyaltyV1ProgramPrograms_universal_d_activateLoyaltyProgram as activateLoyaltyProgram, loyaltyV1ProgramPrograms_universal_d_pauseLoyaltyProgram as pauseLoyaltyProgram, loyaltyV1ProgramPrograms_universal_d_GetLoyaltyProgramDescriptionOptions as GetLoyaltyProgramDescriptionOptions, loyaltyV1ProgramPrograms_universal_d_UpdateLoyaltyProgramDescriptionOptions as UpdateLoyaltyProgramDescriptionOptions, loyaltyV1ProgramPrograms_universal_d_getLoyaltyProgramPremiumFeatures as getLoyaltyProgramPremiumFeatures, loyaltyV1ProgramPrograms_universal_d_enablePointsExpiration as enablePointsExpiration, loyaltyV1ProgramPrograms_universal_d_disablePointsExpiration as disablePointsExpiration, };
    }
    /**
     * A tier is a loyalty level that customers are assigned to based on the amount of points they earn.
     * Read more about loyalty tiers [here](https://support.wix.com/en/article/about-tiers).
     */
    interface Tier$1 {
        /**
         * Tier ID.
         * @readonly
         */
        _id?: string | null;
        /** Information about the tier. */
        tierDefinition?: TierDefinition$1;
        /** The amount of points required to be in this tier. */
        requiredPoints?: number;
        /**
         * Revision number, which increments by 1 each time the loyalty tier is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tier.
         * @readonly
         */
        revision?: string | null;
        /**
         * Date and time the tier was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the tier was last updated.
         * @readonly
         */
        _updatedDate?: Date | null;
    }
    /** Information about the tier. */
    interface TierDefinition$1 {
        /** Details about the tier icon. */
        icon?: string;
        /** Tier name. */
        name?: string | null;
        /** Tier description. */
        description?: string | null;
    }
    interface FocalPoint$1 {
        /** X-coordinate of the focal point. */
        x?: number;
        /** Y-coordinate of the focal point. */
        y?: number;
        /** crop by height */
        height?: number | null;
        /** crop by width */
        width?: number | null;
    }
    interface TiersProgramSettingsChanged$1 {
        /** Settings for the tiers program. */
        programSettings?: TiersProgramSettings$1;
    }
    /** There can be single TiersSettings per site and it's global (i.e. applies to all program's tiers) */
    interface TiersProgramSettings$1 extends TiersProgramSettingsPeriodOneOf$1 {
        /**
         * *Required.**
         * Period of time used to calculate loyalty points for tier assignment.
         *
         * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
         */
        rollingWindow?: RollingWindow$1;
        /** Tiers program status. */
        status?: Status$2;
        /**
         * Revision number, which increments by 1 each time the loyalty tiers settings are updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tiers settings.
         */
        revision?: string | null;
        /**
         * Date and time the loyalty tiers program was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the loyalty tiers program was last updated.
         * @readonly
         */
        _updatedDate?: Date | null;
        /**
         * Information about the base loyalty tier.
         *
         * The base tier is the default tier for any account that is unassigned for not meeting
         * the required points threshold of any other tier.
         */
        baseTierDefinition?: TierDefinition$1;
    }
    /** @oneof */
    interface TiersProgramSettingsPeriodOneOf$1 {
        /**
         * *Required.**
         * Period of time used to calculate loyalty points for tier assignment.
         *
         * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
         */
        rollingWindow?: RollingWindow$1;
    }
    enum Status$2 {
        /** Unknown status. */
        UNKNOWN = "UNKNOWN",
        /** Tiers are disabled. */
        DISABLED = "DISABLED",
        /** Tiers are enabled but not yet active. */
        DRAFT = "DRAFT",
        /** Tiers are active. */
        ACTIVE = "ACTIVE",
        /** Tiers are paused. */
        PAUSED = "PAUSED"
    }
    /**
     * *Required.** Period of time used to calculate loyalty points for tier assignment.
     *
     * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
     */
    interface RollingWindow$1 {
        /**
         * Number of months to use for the rolling window period.
         *
         * Min: `12`
         *
         * Max: `36`
         */
        durationInMonths?: number;
    }
    interface TiersRollingUpdate$1 {
    }
    interface CreateTierRequest {
        /** Tier to create. */
        tier: Tier$1;
    }
    interface CreateTierResponse {
        /** Created loyalty tier. */
        tier?: Tier$1;
    }
    interface BulkCreateTiersRequest {
        /** Tiers to create. */
        tiers?: Tier$1[];
    }
    interface BulkCreateTiersResponse {
        /** Created tiers. */
        results?: BulkTierResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$2;
    }
    /** Retrieved tiers. */
    interface BulkTierResult {
        /** Individual tier metadata. */
        itemMetadata?: ItemMetadata$2;
        /** Individual tier information. */
        item?: Tier$1;
    }
    interface ItemMetadata$2 {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$2;
    }
    interface ApplicationError$2 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata$2 {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface GetTierRequest {
        /** ID of the tier to retrieve. */
        tierId: string;
    }
    interface GetTierResponse {
        /** Retrieved loyalty tier. */
        tier?: Tier$1;
    }
    interface UpdateTierRequest {
        /** Tier details to update. */
        tier: Tier$1;
    }
    interface UpdateTierResponse {
        /** Updated loyalty tier. */
        tier?: Tier$1;
    }
    interface TierRequiredPointsChanged {
        /** Tier. */
        tier?: Tier$1;
    }
    interface DeleteTierRequest {
        /** ID of the tier to delete. */
        tierId: string;
        /** Current `revision` of the tier to delete. */
        revision?: string;
    }
    interface DeleteTierResponse {
    }
    interface ListTiersRequest {
    }
    interface ListTiersResponse {
        /** Retrieved loyalty tiers. */
        tiers?: Tier$1[];
    }
    interface CreateTiersProgramSettingsRequest {
        /** Tiers program settings. */
        programSettings: TiersProgramSettings$1;
    }
    interface CreateTiersProgramSettingsResponse {
        /** Created tiers program settings. */
        programSettings?: TiersProgramSettings$1;
    }
    interface GetTiersProgramRequest {
    }
    interface GetTiersProgramResponse {
        /** Tiers. */
        tiers?: Tier$1[];
        /** Tiers program settings. */
        programSettings?: TiersProgramSettings$1;
    }
    interface GetTiersProgramSettingsRequest {
    }
    interface GetTiersProgramSettingsResponse {
        /** Tiers program settings. */
        programSettings?: TiersProgramSettings$1;
    }
    interface UpdateTiersProgramSettingsRequest {
        /** Settings for the tiers program. */
        programSettings: TiersProgramSettings$1;
    }
    interface UpdateTiersProgramSettingsResponse {
        /** Updated program settings. */
        programSettings?: TiersProgramSettings$1;
    }
    interface RecalculateAllTiersRequest {
    }
    interface RecalculateAllTiersResponse {
    }
    interface MetaSiteSpecialEvent extends MetaSiteSpecialEventPayloadOneOf {
        /** Emitted on a meta site creation. */
        siteCreated?: SiteCreated;
        /** Emitted on a meta site transfer completion. */
        siteTransferred?: SiteTransferred;
        /** Emitted on a meta site deletion. */
        siteDeleted?: SiteDeleted;
        /** Emitted on a meta site restoration. */
        siteUndeleted?: SiteUndeleted;
        /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
        sitePublished?: SitePublished;
        /** Emitted on a meta site unpublish. */
        siteUnpublished?: SiteUnpublished;
        /** Emitted when meta site is marked as template. */
        siteMarkedAsTemplate?: SiteMarkedAsTemplate;
        /** Emitted when meta site is marked as a WixSite. */
        siteMarkedAsWixSite?: SiteMarkedAsWixSite;
        /** Emitted when an application is provisioned (installed). */
        serviceProvisioned?: ServiceProvisioned;
        /** Emitted when an application is removed (uninstalled). */
        serviceRemoved?: ServiceRemoved;
        /** Emitted when meta site name (URL slug) is changed. */
        siteRenamedPayload?: SiteRenamed;
        /** Emitted when meta site was permanently deleted. */
        hardDeleted?: SiteHardDeleted;
        /** Emitted on a namespace change. */
        namespaceChanged?: NamespaceChanged;
        /** Emitted when Studio is attached. */
        studioAssigned?: StudioAssigned;
        /** Emitted when Studio is detached. */
        studioUnassigned?: StudioUnassigned;
        /** A meta site id. */
        metaSiteId?: string;
        /** A meta site version. Monotonically increasing. */
        version?: string;
        /** A timestamp of the event. */
        timestamp?: string;
        /**
         * TODO(meta-site): Change validation once validations are disabled for consumers
         * More context: https://wix.slack.com/archives/C0UHEBPFT/p1720957844413149 and https://wix.slack.com/archives/CFWKX325T/p1728892152855659
         */
        assets?: Asset[];
    }
    /** @oneof */
    interface MetaSiteSpecialEventPayloadOneOf {
        /** Emitted on a meta site creation. */
        siteCreated?: SiteCreated;
        /** Emitted on a meta site transfer completion. */
        siteTransferred?: SiteTransferred;
        /** Emitted on a meta site deletion. */
        siteDeleted?: SiteDeleted;
        /** Emitted on a meta site restoration. */
        siteUndeleted?: SiteUndeleted;
        /** Emitted on the first* publish of the meta site (* switching from unpublished to published state). */
        sitePublished?: SitePublished;
        /** Emitted on a meta site unpublish. */
        siteUnpublished?: SiteUnpublished;
        /** Emitted when meta site is marked as template. */
        siteMarkedAsTemplate?: SiteMarkedAsTemplate;
        /** Emitted when meta site is marked as a WixSite. */
        siteMarkedAsWixSite?: SiteMarkedAsWixSite;
        /** Emitted when an application is provisioned (installed). */
        serviceProvisioned?: ServiceProvisioned;
        /** Emitted when an application is removed (uninstalled). */
        serviceRemoved?: ServiceRemoved;
        /** Emitted when meta site name (URL slug) is changed. */
        siteRenamedPayload?: SiteRenamed;
        /** Emitted when meta site was permanently deleted. */
        hardDeleted?: SiteHardDeleted;
        /** Emitted on a namespace change. */
        namespaceChanged?: NamespaceChanged;
        /** Emitted when Studio is attached. */
        studioAssigned?: StudioAssigned;
        /** Emitted when Studio is detached. */
        studioUnassigned?: StudioUnassigned;
    }
    interface Asset {
        /** An application definition id (app_id in dev-center). For legacy reasons may be UUID or a string (from Java Enum). */
        appDefId?: string;
        /** An instance id. For legacy reasons may be UUID or a string. */
        instanceId?: string;
        /** An application state. */
        state?: State;
    }
    enum State {
        UNKNOWN = "UNKNOWN",
        ENABLED = "ENABLED",
        DISABLED = "DISABLED",
        PENDING = "PENDING",
        DEMO = "DEMO"
    }
    interface SiteCreated {
        /** A template identifier (empty if not created from a template). */
        originTemplateId?: string;
        /** An account id of the owner. */
        ownerId?: string;
        /** A context in which meta site was created. */
        context?: SiteCreatedContext;
        /**
         * A meta site id from which this site was created.
         *
         * In case of a creation from a template it's a template id.
         * In case of a site duplication ("Save As" in dashboard or duplicate in UM) it's an id of a source site.
         */
        originMetaSiteId?: string | null;
        /** A meta site name (URL slug). */
        siteName?: string;
        /** A namespace. */
        namespace?: Namespace;
    }
    enum SiteCreatedContext {
        /** A valid option, we don't expose all reasons why site might be created. */
        OTHER = "OTHER",
        /** A meta site was created from template. */
        FROM_TEMPLATE = "FROM_TEMPLATE",
        /** A meta site was created by copying of the transfferred meta site. */
        DUPLICATE_BY_SITE_TRANSFER = "DUPLICATE_BY_SITE_TRANSFER",
        /** A copy of existing meta site. */
        DUPLICATE = "DUPLICATE",
        /** A meta site was created as a transfferred site (copy of the original), old flow, should die soon. */
        OLD_SITE_TRANSFER = "OLD_SITE_TRANSFER",
        /** deprecated A meta site was created for Flash editor. */
        FLASH = "FLASH"
    }
    enum Namespace {
        UNKNOWN_NAMESPACE = "UNKNOWN_NAMESPACE",
        /** Default namespace for UGC sites. MetaSites with this namespace will be shown in a user's site list by default. */
        WIX = "WIX",
        /** ShoutOut stand alone product. These are siteless (no actual Wix site, no HtmlWeb). MetaSites with this namespace will *not* be shown in a user's site list by default. */
        SHOUT_OUT = "SHOUT_OUT",
        /** MetaSites created by the Albums product, they appear as part of the Albums app. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        ALBUMS = "ALBUMS",
        /** Part of the WixStores migration flow, a user tries to migrate and gets this site to view and if the user likes it then stores removes this namespace and deletes the old site with the old stores. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        WIX_STORES_TEST_DRIVE = "WIX_STORES_TEST_DRIVE",
        /** Hotels standalone (siteless). MetaSites with this namespace will *not* be shown in a user's site list by default. */
        HOTELS = "HOTELS",
        /** Clubs siteless MetaSites, a club without a wix website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        CLUBS = "CLUBS",
        /** A partially created ADI website. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        ONBOARDING_DRAFT = "ONBOARDING_DRAFT",
        /** AppBuilder for AppStudio / shmite (c). MetaSites with this namespace will *not* be shown in a user's site list by default. */
        DEV_SITE = "DEV_SITE",
        /** LogoMaker websites offered to the user after logo purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        LOGOS = "LOGOS",
        /** VideoMaker websites offered to the user after video purchase. MetaSites with this namespace will *not* be shown in a user's site list by default. */
        VIDEO_MAKER = "VIDEO_MAKER",
        /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
        PARTNER_DASHBOARD = "PARTNER_DASHBOARD",
        /** MetaSites with this namespace will *not* be shown in a user's site list by default. */
        DEV_CENTER_COMPANY = "DEV_CENTER_COMPANY",
        /**
         * A draft created by HTML editor on open. Upon "first save" it will be moved to be of WIX domain.
         *
         * Meta site with this namespace will *not* be shown in a user's site list by default.
         */
        HTML_DRAFT = "HTML_DRAFT",
        /**
         * the user-journey for Fitness users who want to start from managing their business instead of designing their website.
         * Will be accessible from Site List and will not have a website app.
         * Once the user attaches a site, the site will become a regular wixsite.
         */
        SITELESS_BUSINESS = "SITELESS_BUSINESS",
        /** Belongs to "strategic products" company. Supports new product in the creator's economy space. */
        CREATOR_ECONOMY = "CREATOR_ECONOMY",
        /** It is to be used in the Business First efforts. */
        DASHBOARD_FIRST = "DASHBOARD_FIRST",
        /** Bookings business flow with no site. */
        ANYWHERE = "ANYWHERE",
        /** Namespace for Headless Backoffice with no editor */
        HEADLESS = "HEADLESS",
        /**
         * Namespace for master site that will exist in parent account that will be referenced by subaccounts
         * The site will be used for account level CSM feature for enterprise
         */
        ACCOUNT_MASTER_CMS = "ACCOUNT_MASTER_CMS",
        /** Rise.ai Siteless account management for Gift Cards and Store Credit. */
        RISE = "RISE",
        /**
         * As part of the branded app new funnel, users now can create a meta site that will be branded app first.
         * There's a blank site behind the scene but it's blank).
         * The Mobile company will be the owner of this namespace.
         */
        BRANDED_FIRST = "BRANDED_FIRST",
        /** Nownia.com Siteless account management for Ai Scheduling Assistant. */
        NOWNIA = "NOWNIA",
        /**
         * UGC Templates are templates that are created by users for personal use and to sale to other users.
         * The Partners company owns this namespace.
         */
        UGC_TEMPLATE = "UGC_TEMPLATE",
        /** Codux Headless Sites */
        CODUX = "CODUX",
        /** Bobb - AI Design Creator. */
        MEDIA_DESIGN_CREATOR = "MEDIA_DESIGN_CREATOR",
        /**
         * Shared Blog Site is a unique single site across Enterprise account,
         * This site will hold all Blog posts related to the Marketing product.
         */
        SHARED_BLOG_ENTERPRISE = "SHARED_BLOG_ENTERPRISE"
    }
    /** Site transferred to another user. */
    interface SiteTransferred {
        /** A previous owner id (user that transfers meta site). */
        oldOwnerId?: string;
        /** A new owner id (user that accepts meta site). */
        newOwnerId?: string;
    }
    /** Soft deletion of the meta site. Could be restored. */
    interface SiteDeleted {
        /** A deletion context. */
        deleteContext?: DeleteContext;
    }
    interface DeleteContext {
        /** When the meta site was deleted. */
        dateDeleted?: Date | null;
        /** A status. */
        deleteStatus?: DeleteStatus;
        /** A reason (flow). */
        deleteOrigin?: string;
        /** A service that deleted it. */
        initiatorId?: string | null;
    }
    enum DeleteStatus {
        UNKNOWN = "UNKNOWN",
        TRASH = "TRASH",
        DELETED = "DELETED",
        PENDING_PURGE = "PENDING_PURGE"
    }
    /** Restoration of the meta site. */
    interface SiteUndeleted {
    }
    /** First publish of a meta site. Or subsequent publish after unpublish. */
    interface SitePublished {
    }
    interface SiteUnpublished {
        /** A list of URLs previously associated with the meta site. */
        urls?: string[];
    }
    interface SiteMarkedAsTemplate {
    }
    interface SiteMarkedAsWixSite {
    }
    /**
     * Represents a service provisioned a site.
     *
     * Note on `origin_instance_id`:
     * There is no guarantee that you will be able to find a meta site using `origin_instance_id`.
     * This is because of the following scenario:
     *
     * Imagine you have a template where a third-party application (TPA) includes some stub data,
     * such as a product catalog. When you create a site from this template, you inherit this
     * default product catalog. However, if the template's product catalog is modified,
     * your site will retain the catalog as it was at the time of site creation. This ensures that
     * your site remains consistent with what you initially received and does not include any
     * changes made to the original template afterward.
     * To ensure this, the TPA on the template gets a new instance_id.
     */
    interface ServiceProvisioned {
        /** Either UUID or EmbeddedServiceType. */
        appDefId?: string;
        /** Not only UUID. Something here could be something weird. */
        instanceId?: string;
        /** An instance id from which this instance is originated. */
        originInstanceId?: string;
        /** A version. */
        version?: string | null;
        /** The origin meta site id */
        originMetaSiteId?: string | null;
    }
    interface ServiceRemoved {
        /** Either UUID or EmbeddedServiceType. */
        appDefId?: string;
        /** Not only UUID. Something here could be something weird. */
        instanceId?: string;
        /** A version. */
        version?: string | null;
    }
    /** Rename of the site. Meaning, free public url has been changed as well. */
    interface SiteRenamed {
        /** A new meta site name (URL slug). */
        newSiteName?: string;
        /** A previous meta site name (URL slug). */
        oldSiteName?: string;
    }
    /**
     * Hard deletion of the meta site.
     *
     * Could not be restored. Therefore it's desirable to cleanup data.
     */
    interface SiteHardDeleted {
        /** A deletion context. */
        deleteContext?: DeleteContext;
    }
    interface NamespaceChanged {
        /** A previous namespace. */
        oldNamespace?: Namespace;
        /** A new namespace. */
        newNamespace?: Namespace;
    }
    /** Assigned Studio editor */
    interface StudioAssigned {
    }
    /** Unassigned Studio editor */
    interface StudioUnassigned {
    }
    interface Empty$3 {
    }
    interface DomainEvent$3 extends DomainEventBodyOneOf$3 {
        createdEvent?: EntityCreatedEvent$3;
        updatedEvent?: EntityUpdatedEvent$3;
        deletedEvent?: EntityDeletedEvent$3;
        actionEvent?: ActionEvent$3;
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
    interface DomainEventBodyOneOf$3 {
        createdEvent?: EntityCreatedEvent$3;
        updatedEvent?: EntityUpdatedEvent$3;
        deletedEvent?: EntityDeletedEvent$3;
        actionEvent?: ActionEvent$3;
    }
    interface EntityCreatedEvent$3 {
        entityAsJson?: string;
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$3;
    }
    interface RestoreInfo$3 {
        deletedDate?: Date | null;
    }
    interface EntityUpdatedEvent$3 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$3 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$3 {
        bodyAsJson?: string;
    }
    interface MessageEnvelope$3 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$3;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$3 extends IdentificationDataIdOneOf$3 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$3;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$3 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$3 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Creates a tier.
     *
     * The name for a tier and the amount of required points to qualify for a tier can only exist for a single tier.
     * Attempts to create a tier with a `tierDefinition.name` or `requiredPoints` that already exists will return an error.
     *
     * To create up to 20 tiers at once, use [`bulkCreateTiers()`](#bulkcreatetiers).
     *
     * >**Note:** You must have a [Business VIP Premium plan](https://support.wix.com/en/article/business-vip-premium-plan-overview) or a [Scale Premium plan](https://support.wix.com/en/article/editor-x-scale-premium-plan-overview) to add tiers.
     * @param tier - Tier to create.
     * @public
     * @requiredField tier
     * @permissionId LOYALTY.MANAGE_TIERS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Created loyalty tier.
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.CreateTier
     */
    function createTier(tier: Tier$1): Promise<Tier$1>;
    /**
     * Creates up to 20 tiers.
     *
     * The name for a tier and the amount of required points to qualify for a tier can only exist for a single tier.
     * Attempts to create a tier with a `tierDefinition.name` or `requiredPoints` that already exists will return an error.
     *
     * To create a single tier, use [`createTier()`](#createtier).
     *
     * >**Note:** You must have a [Business VIP Premium plan](https://support.wix.com/en/article/business-vip-premium-plan-overview) or a [Scale Premium plan](https://support.wix.com/en/article/editor-x-scale-premium-plan-overview) to add tiers.
     * @param tiers - Tiers to create.
     * @public
     * @requiredField tiers
     * @permissionId LOYALTY.MANAGE_TIERS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.BulkCreateTiers
     */
    function bulkCreateTiers(tiers: Tier$1[]): Promise<BulkCreateTiersResponse>;
    /**
     * Retrieves a loyalty tier.
     *
     * To retrieve a list of all of a site's tiers, use [`listTiers()`](#listtiers).
     * @param tierId - ID of the tier to retrieve.
     * @public
     * @requiredField tierId
     * @permissionId LOYALTY.READ_TIERS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Retrieved loyalty tier.
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.GetTier
     */
    function getTier(tierId: string): Promise<Tier$1>;
    /**
     * Updates a loyalty tier.
     *
     * Use this endpoint to update tier-specific settings, such as the name and the required points
     * threshold of an individual loyalty tier. To update global settings that apply to all of a site's loyalty tiers,
     * use [`updateTiersProgramSettings()`](#updatetiersprogramsettings).
     * @param _id - Tier ID.
     * @public
     * @requiredField _id
     * @requiredField tier
     * @requiredField tier.revision
     * @param tier - Tier info to update.
     * @permissionId LOYALTY.MANAGE_TIERS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Updated loyalty tier.
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.UpdateTier
     */
    function updateTier(_id: string | null, tier: UpdateTier): Promise<Tier$1>;
    interface UpdateTier {
        /**
         * Tier ID.
         * @readonly
         */
        _id?: string | null;
        /** Information about the tier. */
        tierDefinition?: TierDefinition$1;
        /** The amount of points required to be in this tier. */
        requiredPoints?: number;
        /**
         * Revision number, which increments by 1 each time the loyalty tier is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tier.
         * @readonly
         */
        revision?: string | null;
        /**
         * Date and time the tier was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the tier was last updated.
         * @readonly
         */
        _updatedDate?: Date | null;
    }
    /**
     * Deletes a loyalty tier.
     * @param tierId - ID of the tier to delete.
     * @param revision - Current `revision` of the tier to delete.
     * @public
     * @requiredField revision
     * @requiredField tierId
     * @permissionId LOYALTY.MANAGE_TIERS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.DeleteTier
     */
    function deleteTier(tierId: string, revision: string): Promise<void>;
    /**
     * Retrieves a list of a site's tiers.
     *
     * To retrieve a specific tier, use [`getTier()`](#gettier).
     * @public
     * @permissionId LOYALTY.READ_TIERS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.ListTiers
     */
    function listTiers(): Promise<ListTiersResponse>;
    /**
     * Create tiers program settings.
     *
     * Tiers program settings apply globally to all tiers in the program.
     * @param programSettings - Tiers program settings.
     * @public
     * @requiredField programSettings
     * @permissionId LOYALTY.MANAGE_TIERS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.CreateTiersProgramSettings
     */
    function createTiersProgramSettings(programSettings: TiersProgramSettings$1): Promise<CreateTiersProgramSettingsResponse>;
    /**
     * Returns `Tiers` and `ProgramSettings` in a single response.
     *
     * If `TiersProgramSettings` doesn't exist, default `TiersProgramSettings` are created.
     * @public
     * @permissionId LOYALTY.READ_TIERS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.GetTiersProgram
     */
    function getTiersProgram(): Promise<GetTiersProgramResponse>;
    /**
     * Retrieves the settings for the tiers program.
     *
     * Tiers program settings apply globally to all tiers in the program.
     * @public
     * @permissionId LOYALTY.READ_TIERS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.GetTiersProgramSettings
     */
    function getTiersProgramSettings(): Promise<GetTiersProgramSettingsResponse>;
    /**
     * Updates the global settings of a loyalty tier program.
     *
     * Use this endpoint to update settings that apply to all of a site's loyalty tiers.
     * To update tier-specific settings for an individual tier, use
     * [`updateTier()`](#updatetier).
     *
     * By default, the `status` of a tiers program is set to `"DISABLED"` and must be manually updated to `"ACTIVE"` using
     * this endpoint or through a site owner's [dashboard](https://manage.wix.com/account/site-selector/?actionUrl=https%3A%2F%2Fwww.wix.com%2Fdashboard%2F%7BmetaSiteId%7D%2Floyalty-accounts%2Fmanage%3Ftab%3Dpoints-and-rewards&title=Select+a+Site&primaryButtonText=Select+Site).
     *
     * >**Note:** The `status`, `revision`, and `rollingWindow` parameters must be passed to update the tiers program settings. The `baseTierDefinition` fields are not required, however, if you don't pass them they will reset to their default values of empty fields.
     * @param programSettings - Settings for the tiers program.
     * @public
     * @requiredField programSettings
     * @requiredField programSettings.revision
     * @requiredField programSettings.status
     * @permissionId LOYALTY.MANAGE_TIERS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.loyalty.tier.LoyaltyTiers.UpdateTiersProgramSettings
     */
    function updateTiersProgramSettings(programSettings: TiersProgramSettings$1): Promise<UpdateTiersProgramSettingsResponse>;
    type loyaltyV1TierTiers_universal_d_CreateTierRequest = CreateTierRequest;
    type loyaltyV1TierTiers_universal_d_CreateTierResponse = CreateTierResponse;
    type loyaltyV1TierTiers_universal_d_BulkCreateTiersRequest = BulkCreateTiersRequest;
    type loyaltyV1TierTiers_universal_d_BulkCreateTiersResponse = BulkCreateTiersResponse;
    type loyaltyV1TierTiers_universal_d_BulkTierResult = BulkTierResult;
    type loyaltyV1TierTiers_universal_d_GetTierRequest = GetTierRequest;
    type loyaltyV1TierTiers_universal_d_GetTierResponse = GetTierResponse;
    type loyaltyV1TierTiers_universal_d_UpdateTierRequest = UpdateTierRequest;
    type loyaltyV1TierTiers_universal_d_UpdateTierResponse = UpdateTierResponse;
    type loyaltyV1TierTiers_universal_d_TierRequiredPointsChanged = TierRequiredPointsChanged;
    type loyaltyV1TierTiers_universal_d_DeleteTierRequest = DeleteTierRequest;
    type loyaltyV1TierTiers_universal_d_DeleteTierResponse = DeleteTierResponse;
    type loyaltyV1TierTiers_universal_d_ListTiersRequest = ListTiersRequest;
    type loyaltyV1TierTiers_universal_d_ListTiersResponse = ListTiersResponse;
    type loyaltyV1TierTiers_universal_d_CreateTiersProgramSettingsRequest = CreateTiersProgramSettingsRequest;
    type loyaltyV1TierTiers_universal_d_CreateTiersProgramSettingsResponse = CreateTiersProgramSettingsResponse;
    type loyaltyV1TierTiers_universal_d_GetTiersProgramRequest = GetTiersProgramRequest;
    type loyaltyV1TierTiers_universal_d_GetTiersProgramResponse = GetTiersProgramResponse;
    type loyaltyV1TierTiers_universal_d_GetTiersProgramSettingsRequest = GetTiersProgramSettingsRequest;
    type loyaltyV1TierTiers_universal_d_GetTiersProgramSettingsResponse = GetTiersProgramSettingsResponse;
    type loyaltyV1TierTiers_universal_d_UpdateTiersProgramSettingsRequest = UpdateTiersProgramSettingsRequest;
    type loyaltyV1TierTiers_universal_d_UpdateTiersProgramSettingsResponse = UpdateTiersProgramSettingsResponse;
    type loyaltyV1TierTiers_universal_d_RecalculateAllTiersRequest = RecalculateAllTiersRequest;
    type loyaltyV1TierTiers_universal_d_RecalculateAllTiersResponse = RecalculateAllTiersResponse;
    type loyaltyV1TierTiers_universal_d_MetaSiteSpecialEvent = MetaSiteSpecialEvent;
    type loyaltyV1TierTiers_universal_d_MetaSiteSpecialEventPayloadOneOf = MetaSiteSpecialEventPayloadOneOf;
    type loyaltyV1TierTiers_universal_d_Asset = Asset;
    type loyaltyV1TierTiers_universal_d_State = State;
    const loyaltyV1TierTiers_universal_d_State: typeof State;
    type loyaltyV1TierTiers_universal_d_SiteCreated = SiteCreated;
    type loyaltyV1TierTiers_universal_d_SiteCreatedContext = SiteCreatedContext;
    const loyaltyV1TierTiers_universal_d_SiteCreatedContext: typeof SiteCreatedContext;
    type loyaltyV1TierTiers_universal_d_Namespace = Namespace;
    const loyaltyV1TierTiers_universal_d_Namespace: typeof Namespace;
    type loyaltyV1TierTiers_universal_d_SiteTransferred = SiteTransferred;
    type loyaltyV1TierTiers_universal_d_SiteDeleted = SiteDeleted;
    type loyaltyV1TierTiers_universal_d_DeleteContext = DeleteContext;
    type loyaltyV1TierTiers_universal_d_DeleteStatus = DeleteStatus;
    const loyaltyV1TierTiers_universal_d_DeleteStatus: typeof DeleteStatus;
    type loyaltyV1TierTiers_universal_d_SiteUndeleted = SiteUndeleted;
    type loyaltyV1TierTiers_universal_d_SitePublished = SitePublished;
    type loyaltyV1TierTiers_universal_d_SiteUnpublished = SiteUnpublished;
    type loyaltyV1TierTiers_universal_d_SiteMarkedAsTemplate = SiteMarkedAsTemplate;
    type loyaltyV1TierTiers_universal_d_SiteMarkedAsWixSite = SiteMarkedAsWixSite;
    type loyaltyV1TierTiers_universal_d_ServiceProvisioned = ServiceProvisioned;
    type loyaltyV1TierTiers_universal_d_ServiceRemoved = ServiceRemoved;
    type loyaltyV1TierTiers_universal_d_SiteRenamed = SiteRenamed;
    type loyaltyV1TierTiers_universal_d_SiteHardDeleted = SiteHardDeleted;
    type loyaltyV1TierTiers_universal_d_NamespaceChanged = NamespaceChanged;
    type loyaltyV1TierTiers_universal_d_StudioAssigned = StudioAssigned;
    type loyaltyV1TierTiers_universal_d_StudioUnassigned = StudioUnassigned;
    const loyaltyV1TierTiers_universal_d_createTier: typeof createTier;
    const loyaltyV1TierTiers_universal_d_bulkCreateTiers: typeof bulkCreateTiers;
    const loyaltyV1TierTiers_universal_d_getTier: typeof getTier;
    const loyaltyV1TierTiers_universal_d_updateTier: typeof updateTier;
    type loyaltyV1TierTiers_universal_d_UpdateTier = UpdateTier;
    const loyaltyV1TierTiers_universal_d_deleteTier: typeof deleteTier;
    const loyaltyV1TierTiers_universal_d_listTiers: typeof listTiers;
    const loyaltyV1TierTiers_universal_d_createTiersProgramSettings: typeof createTiersProgramSettings;
    const loyaltyV1TierTiers_universal_d_getTiersProgram: typeof getTiersProgram;
    const loyaltyV1TierTiers_universal_d_getTiersProgramSettings: typeof getTiersProgramSettings;
    const loyaltyV1TierTiers_universal_d_updateTiersProgramSettings: typeof updateTiersProgramSettings;
    namespace loyaltyV1TierTiers_universal_d {
        export { Tier$1 as Tier, TierDefinition$1 as TierDefinition, FocalPoint$1 as FocalPoint, TiersProgramSettingsChanged$1 as TiersProgramSettingsChanged, TiersProgramSettings$1 as TiersProgramSettings, TiersProgramSettingsPeriodOneOf$1 as TiersProgramSettingsPeriodOneOf, Status$2 as Status, RollingWindow$1 as RollingWindow, TiersRollingUpdate$1 as TiersRollingUpdate, loyaltyV1TierTiers_universal_d_CreateTierRequest as CreateTierRequest, loyaltyV1TierTiers_universal_d_CreateTierResponse as CreateTierResponse, loyaltyV1TierTiers_universal_d_BulkCreateTiersRequest as BulkCreateTiersRequest, loyaltyV1TierTiers_universal_d_BulkCreateTiersResponse as BulkCreateTiersResponse, loyaltyV1TierTiers_universal_d_BulkTierResult as BulkTierResult, ItemMetadata$2 as ItemMetadata, ApplicationError$2 as ApplicationError, BulkActionMetadata$2 as BulkActionMetadata, loyaltyV1TierTiers_universal_d_GetTierRequest as GetTierRequest, loyaltyV1TierTiers_universal_d_GetTierResponse as GetTierResponse, loyaltyV1TierTiers_universal_d_UpdateTierRequest as UpdateTierRequest, loyaltyV1TierTiers_universal_d_UpdateTierResponse as UpdateTierResponse, loyaltyV1TierTiers_universal_d_TierRequiredPointsChanged as TierRequiredPointsChanged, loyaltyV1TierTiers_universal_d_DeleteTierRequest as DeleteTierRequest, loyaltyV1TierTiers_universal_d_DeleteTierResponse as DeleteTierResponse, loyaltyV1TierTiers_universal_d_ListTiersRequest as ListTiersRequest, loyaltyV1TierTiers_universal_d_ListTiersResponse as ListTiersResponse, loyaltyV1TierTiers_universal_d_CreateTiersProgramSettingsRequest as CreateTiersProgramSettingsRequest, loyaltyV1TierTiers_universal_d_CreateTiersProgramSettingsResponse as CreateTiersProgramSettingsResponse, loyaltyV1TierTiers_universal_d_GetTiersProgramRequest as GetTiersProgramRequest, loyaltyV1TierTiers_universal_d_GetTiersProgramResponse as GetTiersProgramResponse, loyaltyV1TierTiers_universal_d_GetTiersProgramSettingsRequest as GetTiersProgramSettingsRequest, loyaltyV1TierTiers_universal_d_GetTiersProgramSettingsResponse as GetTiersProgramSettingsResponse, loyaltyV1TierTiers_universal_d_UpdateTiersProgramSettingsRequest as UpdateTiersProgramSettingsRequest, loyaltyV1TierTiers_universal_d_UpdateTiersProgramSettingsResponse as UpdateTiersProgramSettingsResponse, loyaltyV1TierTiers_universal_d_RecalculateAllTiersRequest as RecalculateAllTiersRequest, loyaltyV1TierTiers_universal_d_RecalculateAllTiersResponse as RecalculateAllTiersResponse, loyaltyV1TierTiers_universal_d_MetaSiteSpecialEvent as MetaSiteSpecialEvent, loyaltyV1TierTiers_universal_d_MetaSiteSpecialEventPayloadOneOf as MetaSiteSpecialEventPayloadOneOf, loyaltyV1TierTiers_universal_d_Asset as Asset, loyaltyV1TierTiers_universal_d_State as State, loyaltyV1TierTiers_universal_d_SiteCreated as SiteCreated, loyaltyV1TierTiers_universal_d_SiteCreatedContext as SiteCreatedContext, loyaltyV1TierTiers_universal_d_Namespace as Namespace, loyaltyV1TierTiers_universal_d_SiteTransferred as SiteTransferred, loyaltyV1TierTiers_universal_d_SiteDeleted as SiteDeleted, loyaltyV1TierTiers_universal_d_DeleteContext as DeleteContext, loyaltyV1TierTiers_universal_d_DeleteStatus as DeleteStatus, loyaltyV1TierTiers_universal_d_SiteUndeleted as SiteUndeleted, loyaltyV1TierTiers_universal_d_SitePublished as SitePublished, loyaltyV1TierTiers_universal_d_SiteUnpublished as SiteUnpublished, loyaltyV1TierTiers_universal_d_SiteMarkedAsTemplate as SiteMarkedAsTemplate, loyaltyV1TierTiers_universal_d_SiteMarkedAsWixSite as SiteMarkedAsWixSite, loyaltyV1TierTiers_universal_d_ServiceProvisioned as ServiceProvisioned, loyaltyV1TierTiers_universal_d_ServiceRemoved as ServiceRemoved, loyaltyV1TierTiers_universal_d_SiteRenamed as SiteRenamed, loyaltyV1TierTiers_universal_d_SiteHardDeleted as SiteHardDeleted, loyaltyV1TierTiers_universal_d_NamespaceChanged as NamespaceChanged, loyaltyV1TierTiers_universal_d_StudioAssigned as StudioAssigned, loyaltyV1TierTiers_universal_d_StudioUnassigned as StudioUnassigned, Empty$3 as Empty, DomainEvent$3 as DomainEvent, DomainEventBodyOneOf$3 as DomainEventBodyOneOf, EntityCreatedEvent$3 as EntityCreatedEvent, RestoreInfo$3 as RestoreInfo, EntityUpdatedEvent$3 as EntityUpdatedEvent, EntityDeletedEvent$3 as EntityDeletedEvent, ActionEvent$3 as ActionEvent, MessageEnvelope$3 as MessageEnvelope, IdentificationData$3 as IdentificationData, IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf, WebhookIdentityType$3 as WebhookIdentityType, loyaltyV1TierTiers_universal_d_createTier as createTier, loyaltyV1TierTiers_universal_d_bulkCreateTiers as bulkCreateTiers, loyaltyV1TierTiers_universal_d_getTier as getTier, loyaltyV1TierTiers_universal_d_updateTier as updateTier, loyaltyV1TierTiers_universal_d_UpdateTier as UpdateTier, loyaltyV1TierTiers_universal_d_deleteTier as deleteTier, loyaltyV1TierTiers_universal_d_listTiers as listTiers, loyaltyV1TierTiers_universal_d_createTiersProgramSettings as createTiersProgramSettings, loyaltyV1TierTiers_universal_d_getTiersProgram as getTiersProgram, loyaltyV1TierTiers_universal_d_getTiersProgramSettings as getTiersProgramSettings, loyaltyV1TierTiers_universal_d_updateTiersProgramSettings as updateTiersProgramSettings, };
    }
    /**
     * A loyalty coupon is created when a customer redeems their loyalty points for a reward. Creating a loyalty coupon
     * also creates a corresponding "reference" coupon with the [Coupons API](https://dev.wix.com/api/rest/coupons/about-wix-coupons).
     */
    interface LoyaltyCoupon {
        /**
         * Loyalty coupon ID.
         * @readonly
         */
        _id?: string;
        /**
         * [Loyalty account ID](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/account-object) of the customer that redeemed points for a coupon.
         * @readonly
         */
        accountId?: string;
        /**
         * [Member ID](https://dev.wix.com/api/rest/members/members/member-object) of the customer that redeemed points for a coupon.
         * @readonly
         * @deprecated [Member ID](https://dev.wix.com/api/rest/members/members/member-object) of the customer that redeemed points for a coupon.
         * @replacedBy member_id
         * @targetRemovalDate 2024-06-01
         */
        memberIdDeprecated?: string;
        /**
         * [Member ID](https://dev.wix.com/docs/rest/crm/members-contacts/members/members/member-object) of the customer that redeemed points for a coupon.
         * @readonly
         */
        memberId?: string | null;
        /**
         * Transaction ID for the transaction that created a coupon.
         * @readonly
         */
        transactionId?: string | null;
        /**
         * Reference coupon information for the corresponding [coupon](https://dev.wix.com/api/rest/coupons/about-wix-coupons)
         * that is created along with the loyalty coupon.
         * @readonly
         */
        couponReference?: CouponReference;
        /**
         * Loyalty coupon status.
         *
         * This status relates to the corresponding coupon that is created
         * at the same time as the loyalty coupon and is included in `couponReference`.
         *
         * + `ACTIVE`: The reference coupon is active and available to the customer.
         * + `APPLIED`: The reference coupon was applied and is no longer available for use.
         * + `ARCHIVED`: The reference coupon was deleted.
         * + `FAILED`: The reference coupon was created but something went wrong when redeeming points from the loyalty account.
         * + `PENDING`: The refence coupon was created but the loyalty points have not been redeemed yet.
         * @readonly
         */
        status?: Status$1;
        /**
         * Name of reward that was redeemed to create this coupon.
         * @readonly
         */
        rewardName?: string;
        /**
         * Revision number, which increments by 1 each time the loyalty coupon is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty coupon.
         */
        revision?: string | null;
        /**
         * Date and time the loyalty coupon was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * Date and time the loyalty coupon was last updated.
         * @readonly
         */
        _updatedDate?: Date;
    }
    interface CouponReference {
        /**
         * Coupon ID.
         * @readonly
         */
        couponId?: string;
        /**
         * Coupon code.
         *
         * Unique code entered by a customer to apply the coupon.
         * @readonly
         */
        code?: string;
        /**
         * Name of coupon.
         * @readonly
         */
        name?: string | null;
        /**
         * The information to use when creating the coupon.
         * @readonly
         */
        specification?: Specification;
        /**
         * Whether the referenced coupon was deleted.
         * @readonly
         */
        deleted?: boolean | null;
    }
    interface Specification extends SpecificationTypeDetailsOneOf, SpecificationScopeOrMinSubtotalOneOf {
        /** Fixed price discount. */
        moneyOffAmount?: number;
        /** Discount as a percentage. */
        percentOffRate?: number;
        /** Free shipping. If true, the coupon applies to all items in all `namespaces` in the site. */
        freeShipping?: boolean;
        /** Specific sale price. Currently only supported for coupons with a `stores` `namespace`. */
        fixedPriceAmount?: number;
        /**
         * Free products when making a purchase. `buyXGetY` is an object that specifies `x` and `y` in the
         * following scenario: if a visitor purchases x number of products, they receive y number of products for free. C
         * urrently only supported for coupons with a `stores` `namespace`.
         */
        buyXGetY?: BuyXGetY;
        /**
         * Scope of the coupon. When no scope is defined, the coupon applies to all
         * items in all `namespaces` in the site.
         */
        scope?: Scope;
        /** The coupon is only applicable when the order subtotal is over this amount. */
        minimumSubtotal?: number | null;
        /** Name of coupon. */
        name?: string | null;
        type?: Type;
        /**
         * Whether the coupon is limited to 1 discount per order. If true and a customer pays for multiple items
         * that the coupon applies to, only the lowest priced item is discounted.
         * Coupons with a `bookings` `namespace` are always limited to 1 item.
         */
        limitedToOneItem?: boolean | null;
        /** Whether the coupon also applies to subscriptions. */
        appliesToSubscriptions?: boolean | null;
        /**
         * Specifies the amount of cycles to apply the discount to for a subscription item.
         *
         * Can only be set when `appliesToSubscriptions` is `TRUE` and `specification.scope.namespace` is `pricingPlans`.
         * If `discountedCycleCount` is empty, the coupon applies to all available cycles.
         *
         * Min: `1`
         *
         * Max: `999`
         */
        discountedCycleCount?: number | null;
    }
    /** @oneof */
    interface SpecificationTypeDetailsOneOf {
        /** Fixed price discount. */
        moneyOffAmount?: number;
        /** Discount as a percentage. */
        percentOffRate?: number;
        /** Free shipping. If true, the coupon applies to all items in all `namespaces` in the site. */
        freeShipping?: boolean;
        /** Specific sale price. Currently only supported for coupons with a `stores` `namespace`. */
        fixedPriceAmount?: number;
        /**
         * Free products when making a purchase. `buyXGetY` is an object that specifies `x` and `y` in the
         * following scenario: if a visitor purchases x number of products, they receive y number of products for free. C
         * urrently only supported for coupons with a `stores` `namespace`.
         */
        buyXGetY?: BuyXGetY;
    }
    /** @oneof */
    interface SpecificationScopeOrMinSubtotalOneOf {
        /**
         * Scope of the coupon. When no scope is defined, the coupon applies to all
         * items in all `namespaces` in the site.
         */
        scope?: Scope;
        /** The coupon is only applicable when the order subtotal is over this amount. */
        minimumSubtotal?: number | null;
    }
    enum Type {
        UNKNOWN = "UNKNOWN",
        MONEY_OFF_AMOUNT = "MONEY_OFF_AMOUNT",
        PERCENT_OFF_RATE = "PERCENT_OFF_RATE",
        FREE_SHIPPING = "FREE_SHIPPING",
        FIXED_PRICE_AMOUNT = "FIXED_PRICE_AMOUNT",
        BUY_X_GET_Y = "BUY_X_GET_Y"
    }
    interface BuyXGetY {
        /** Number of purchased items required to receive free items. */
        x?: number;
        /** Number of items received for free if required number of items were purchased. */
        y?: number;
    }
    interface Scope {
        /**
         * Group within a `namespace` for which the coupon is applicable.
         *
         * If no group is specified, the coupon applies to all items in the namespace.
         * `group` is required in some namespaces. See [Scope Values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values)
         * for a list of currently supported groups for each namespace.
         */
        name?: string | null;
        /**
         * ID of the specific entity in the group for which the coupon is applicable.
         *
         * If no `entityId` is specified, the coupon applies to all entities in the group. In some cases when a group is specified,
         * an `entityId` is required. See [Scope Values](https://dev.wix.com/api/rest/coupons/coupons/valid-scope-values)
         * for a list of currently supported entities for each namespace and group.
         */
        entityId?: string | null;
        /**
         * Wix application for which the coupon is applicable.
         *
         * One of the following:
         * + `"stores"`
         * + `"bookings"`
         * + `"events"`
         * + `"pricingPlans"`
         */
        namespace?: string;
    }
    enum Status$1 {
        UNKNOWN = "UNKNOWN",
        /** coupon created but points haven't been redeemed yet (ideally coupons should stay in this state for a very short time (seconds/minutes)) */
        PENDING = "PENDING",
        /** coupon is active and can be applied */
        ACTIVE = "ACTIVE",
        /** coupon was already applied and can not be used anymore */
        APPLIED = "APPLIED",
        /** coupon was created but something went wrong when redeeming points from the account */
        FAILED = "FAILED",
        /** reference coupon was deleted */
        ARCHIVED = "ARCHIVED"
    }
    interface RedeemPointsForCouponRequest {
        /** ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem. */
        rewardId: string;
        /** ID of the [loyalty account](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/account-object) of the customer redeeming points. */
        loyaltyAccountId: string;
    }
    interface RedeemPointsForCouponResponse {
        /** Created loyalty coupon. */
        coupon?: LoyaltyCoupon;
    }
    interface RedeemCurrentMemberPointsForCouponRequest {
        /** ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem. */
        rewardId: string;
    }
    interface RedeemCurrentMemberPointsForCouponResponse {
        /** Created loyalty coupon. */
        coupon?: LoyaltyCoupon;
    }
    interface RedeemMemberPointsForDiscountAmountCouponRequest {
        /** ID of the [loyalty reward](https://dev.wix.com/api/rest/wix-loyalty-program/rewards) to redeem. */
        rewardId: string;
        /** Loyalty account id. */
        loyaltyAccountId: string;
        /** Number of points to redeem. */
        pointsToRedeem: number;
        /** Coupon specification. */
        specification: Specification;
    }
    interface RedeemMemberPointsForDiscountAmountCouponResponse {
        /** Created loyalty coupon. */
        coupon?: LoyaltyCoupon;
        /** Transaction id of the coupon redemption */
        transactionId?: string;
    }
    interface GetLoyaltyCouponRequest {
        /** ID of the loyalty coupon to retrieve. */
        loyaltyCouponId: string;
    }
    interface GetLoyaltyCouponResponse {
        /** Retrieved loyalty coupon. */
        loyaltyCoupon?: LoyaltyCoupon;
    }
    interface GetCurrentMemberCouponsRequest {
    }
    interface GetCurrentMemberCouponsResponse {
        /** Retrieved loyalty coupons. */
        loyaltyCoupons?: LoyaltyCoupon[];
    }
    interface QueryLoyaltyCouponRequest {
        /** Query options. */
        query: QueryV2$1;
    }
    interface QueryV2$1 extends QueryV2PagingMethodOneOf$1 {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$1;
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging$2;
        /**
         * Filter object in the following format:
         * `"filter" : {
         * "fieldName1": "value1",
         * "fieldName2":{"$operator":"value2"}
         * }`
         * Example of operators: `$eq`, `$ne`, `$lt`, `$lte`, `$gt`, `$gte`, `$in`, `$hasSome`, `$hasAll`, `$startsWith`, `$contains`
         */
        filter?: Record<string, any> | null;
        /**
         * Sort object in the following format:
         * `[{"fieldName":"sortField1","order":"ASC"},{"fieldName":"sortField2","order":"DESC"}]`
         */
        sort?: Sorting$2[];
        /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
        fields?: string[];
        /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
        fieldsets?: string[];
    }
    /** @oneof */
    interface QueryV2PagingMethodOneOf$1 {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging$1;
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging$2;
    }
    interface Sorting$2 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$2;
    }
    enum SortOrder$2 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface Paging$1 {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface CursorPaging$2 {
        /** Maximum number of items to return in the results. */
        limit?: number | null;
        /**
         * Pointer to the next or previous page in the list of results.
         *
         * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
         * Not relevant for the first request.
         */
        cursor?: string | null;
    }
    interface QueryLoyaltyCouponResponse {
        /** Retrieved loyalty coupons. */
        loyaltyCoupons?: LoyaltyCoupon[];
        /** Metadata. */
        metadata?: PagingMetadataV2$1;
    }
    interface PagingMetadataV2$1 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
        /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
        cursors?: Cursors$2;
    }
    interface Cursors$2 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface QueryCouponTemplateRequest {
        /** Query options. */
        query: Query;
    }
    interface Query {
        /** Optional pagination parameters */
        paging?: V2Paging;
        /** Filter string (e.g., when {"expired":"true"}, expired coupons will be returned). */
        filter?: string | null;
        /** Sort string. */
        sort?: string | null;
    }
    interface V2Paging {
        /** Number of items to load. */
        limit?: number | null;
        /** Offset since the beginning of the collection. */
        offset?: number | null;
    }
    interface QueryCouponTemplateResponse {
        /** The retrieved CouponReferences */
        couponReferences?: CouponReference[];
        totalResults?: number | null;
    }
    interface DeleteLoyaltyCouponRequest {
        /** ID of the loyalty coupon to delete. */
        _id: string;
        /**
         * Revision number, which increments by 1 each time the loyalty coupon is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty coupon.
         */
        revision?: string;
    }
    interface DeleteLoyaltyCouponResponse {
    }
    interface DomainEvent$2 extends DomainEventBodyOneOf$2 {
        createdEvent?: EntityCreatedEvent$2;
        updatedEvent?: EntityUpdatedEvent$2;
        deletedEvent?: EntityDeletedEvent$2;
        actionEvent?: ActionEvent$2;
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
        /** Event timestamp. */
        eventTime?: Date;
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
    interface DomainEventBodyOneOf$2 {
        createdEvent?: EntityCreatedEvent$2;
        updatedEvent?: EntityUpdatedEvent$2;
        deletedEvent?: EntityDeletedEvent$2;
        actionEvent?: ActionEvent$2;
    }
    interface EntityCreatedEvent$2 {
        entityAsJson?: string;
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$2;
    }
    interface RestoreInfo$2 {
        deletedDate?: Date;
    }
    interface EntityUpdatedEvent$2 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$2 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$2 {
        bodyAsJson?: string;
    }
    interface Empty$2 {
    }
    interface MessageEnvelope$2 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$2;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$2 extends IdentificationDataIdOneOf$2 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$2;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$2 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$2 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    /**
     * Redeems a customer's loyalty points for a loyalty reward and creates a loyalty coupon.
     *
     * Creating a loyalty coupon also creates a corresponding "reference" coupon with the [Coupons API](https://dev.wix.com/api/rest/coupons/about-wix-coupons).
     * The customer receives the reference coupon, which they can apply to their order. The loyalty coupon and its corresponding reference coupon
     * are linked and the loyalty coupon's `status` reflects the current state of the reference coupon.
     *
     * Check which loyalty rewards a site has available with [List Rewards](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/list-rewards).
     * @param rewardId - ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem.
     * @public
     * @requiredField options
     * @requiredField options.loyaltyAccountId
     * @requiredField rewardId
     * @adminMethod
     */
    function redeemPointsForCoupon(rewardId: string, options: RedeemPointsForCouponOptions): Promise<RedeemPointsForCouponResponse>;
    interface RedeemPointsForCouponOptions {
        /** ID of the [loyalty account](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/account-object) of the customer redeeming points. */
        loyaltyAccountId: string;
    }
    /**
     * Redeems a current customer's loyalty points for a loyalty reward and creates a loyalty coupon.
     *
     * Creating a loyalty coupon also creates a corresponding "reference" coupon with the [Coupons API](https://dev.wix.com/api/rest/coupons/about-wix-coupons).
     * The customer receives the reference coupon, which they can apply to their order. The loyalty coupon and its corresponding reference coupon
     * are linked and the loyalty coupon's `status` reflects the current state of the reference coupon.
     *
     * Check which loyalty rewards a site has available with [List Rewards](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/list-rewards).
     * @param rewardId - ID of the [loyalty reward](https://dev.wix.com/docs/rest/crm/loyalty-program/rewards/reward-object) to redeem.
     * @public
     * @requiredField rewardId
     * @applicableIdentity MEMBER
     */
    function redeemCurrentMemberPointsForCoupon(rewardId: string): Promise<RedeemCurrentMemberPointsForCouponResponse>;
    interface RedeemMemberPointsForDiscountAmountCouponOptions {
        /** Loyalty account id. */
        loyaltyAccountId: string;
        /** Number of points to redeem. */
        pointsToRedeem: number;
        /** Coupon specification. */
        specification: Specification;
    }
    /**
     * Retrieves a loyalty coupon.
     * @param loyaltyCouponId - ID of the loyalty coupon to retrieve.
     * @public
     * @requiredField loyaltyCouponId
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Retrieved loyalty coupon.
     */
    function getLoyaltyCoupon(loyaltyCouponId: string): Promise<LoyaltyCoupon>;
    /**
     * Retrieves the loyalty coupons for the currently logged-in member.
     * @public
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     */
    function getCurrentMemberCoupons(): Promise<GetCurrentMemberCouponsResponse>;
    /**
     * Retrieves a list of loyalty coupons, given the provided paging, filtering, and sorting.
     * @public
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function queryLoyaltyCoupons(): LoyaltyCouponsQueryBuilder;
    interface QueryCursorResult$2 {
        cursors: Cursors$2;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface LoyaltyCouponsQueryResult extends QueryCursorResult$2 {
        items: LoyaltyCoupon[];
        query: LoyaltyCouponsQueryBuilder;
        next: () => Promise<LoyaltyCouponsQueryResult>;
        prev: () => Promise<LoyaltyCouponsQueryResult>;
    }
    interface LoyaltyCouponsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "accountId" | "memberId" | "transactionId" | "couponReference" | "status" | "rewardName" | "_createdDate" | "_updatedDate", value: any) => LoyaltyCouponsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "accountId" | "memberId" | "transactionId" | "couponReference" | "status" | "rewardName" | "_createdDate" | "_updatedDate", value: any) => LoyaltyCouponsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ge: (propertyName: "_createdDate" | "_updatedDate", value: any) => LoyaltyCouponsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        gt: (propertyName: "_createdDate" | "_updatedDate", value: any) => LoyaltyCouponsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        le: (propertyName: "_createdDate" | "_updatedDate", value: any) => LoyaltyCouponsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        lt: (propertyName: "_createdDate" | "_updatedDate", value: any) => LoyaltyCouponsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         */
        startsWith: (propertyName: "accountId" | "memberId" | "transactionId" | "rewardName", value: string) => LoyaltyCouponsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         */
        hasSome: (propertyName: "accountId" | "memberId" | "transactionId" | "couponReference" | "status" | "rewardName" | "_createdDate" | "_updatedDate", value: any[]) => LoyaltyCouponsQueryBuilder;
        in: (propertyName: "accountId" | "memberId" | "transactionId" | "couponReference" | "status" | "rewardName" | "_createdDate" | "_updatedDate", value: any) => LoyaltyCouponsQueryBuilder;
        exists: (propertyName: "accountId" | "memberId" | "transactionId" | "couponReference" | "status" | "rewardName" | "_createdDate" | "_updatedDate", value: boolean) => LoyaltyCouponsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"accountId" | "memberId" | "transactionId" | "couponReference" | "status" | "rewardName" | "_createdDate" | "_updatedDate">) => LoyaltyCouponsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"accountId" | "memberId" | "transactionId" | "couponReference" | "status" | "rewardName" | "_createdDate" | "_updatedDate">) => LoyaltyCouponsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => LoyaltyCouponsQueryBuilder;
        /** @param cursor - A pointer to specific record */
        skipTo: (cursor: string) => LoyaltyCouponsQueryBuilder;
        find: () => Promise<LoyaltyCouponsQueryResult>;
    }
    /**
     * Deletes a loyalty coupon.
     *
     * The deletion of a loyalty coupon does not impact the functionality of the corresponding coupon itself.
     * @param _id - ID of the loyalty coupon to delete.
     * @param revision - Revision number, which increments by 1 each time the loyalty coupon is updated.
     *
     * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty coupon.
     * @public
     * @requiredField _id
     * @requiredField revision
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function deleteLoyaltyCoupon(_id: string, revision: string): Promise<void>;
    type loyaltyV1CouponCoupons_universal_d_LoyaltyCoupon = LoyaltyCoupon;
    type loyaltyV1CouponCoupons_universal_d_CouponReference = CouponReference;
    type loyaltyV1CouponCoupons_universal_d_Specification = Specification;
    type loyaltyV1CouponCoupons_universal_d_SpecificationTypeDetailsOneOf = SpecificationTypeDetailsOneOf;
    type loyaltyV1CouponCoupons_universal_d_SpecificationScopeOrMinSubtotalOneOf = SpecificationScopeOrMinSubtotalOneOf;
    type loyaltyV1CouponCoupons_universal_d_Type = Type;
    const loyaltyV1CouponCoupons_universal_d_Type: typeof Type;
    type loyaltyV1CouponCoupons_universal_d_BuyXGetY = BuyXGetY;
    type loyaltyV1CouponCoupons_universal_d_Scope = Scope;
    type loyaltyV1CouponCoupons_universal_d_RedeemPointsForCouponRequest = RedeemPointsForCouponRequest;
    type loyaltyV1CouponCoupons_universal_d_RedeemPointsForCouponResponse = RedeemPointsForCouponResponse;
    type loyaltyV1CouponCoupons_universal_d_RedeemCurrentMemberPointsForCouponRequest = RedeemCurrentMemberPointsForCouponRequest;
    type loyaltyV1CouponCoupons_universal_d_RedeemCurrentMemberPointsForCouponResponse = RedeemCurrentMemberPointsForCouponResponse;
    type loyaltyV1CouponCoupons_universal_d_RedeemMemberPointsForDiscountAmountCouponRequest = RedeemMemberPointsForDiscountAmountCouponRequest;
    type loyaltyV1CouponCoupons_universal_d_RedeemMemberPointsForDiscountAmountCouponResponse = RedeemMemberPointsForDiscountAmountCouponResponse;
    type loyaltyV1CouponCoupons_universal_d_GetLoyaltyCouponRequest = GetLoyaltyCouponRequest;
    type loyaltyV1CouponCoupons_universal_d_GetLoyaltyCouponResponse = GetLoyaltyCouponResponse;
    type loyaltyV1CouponCoupons_universal_d_GetCurrentMemberCouponsRequest = GetCurrentMemberCouponsRequest;
    type loyaltyV1CouponCoupons_universal_d_GetCurrentMemberCouponsResponse = GetCurrentMemberCouponsResponse;
    type loyaltyV1CouponCoupons_universal_d_QueryLoyaltyCouponRequest = QueryLoyaltyCouponRequest;
    type loyaltyV1CouponCoupons_universal_d_QueryLoyaltyCouponResponse = QueryLoyaltyCouponResponse;
    type loyaltyV1CouponCoupons_universal_d_QueryCouponTemplateRequest = QueryCouponTemplateRequest;
    type loyaltyV1CouponCoupons_universal_d_Query = Query;
    type loyaltyV1CouponCoupons_universal_d_V2Paging = V2Paging;
    type loyaltyV1CouponCoupons_universal_d_QueryCouponTemplateResponse = QueryCouponTemplateResponse;
    type loyaltyV1CouponCoupons_universal_d_DeleteLoyaltyCouponRequest = DeleteLoyaltyCouponRequest;
    type loyaltyV1CouponCoupons_universal_d_DeleteLoyaltyCouponResponse = DeleteLoyaltyCouponResponse;
    const loyaltyV1CouponCoupons_universal_d_redeemPointsForCoupon: typeof redeemPointsForCoupon;
    type loyaltyV1CouponCoupons_universal_d_RedeemPointsForCouponOptions = RedeemPointsForCouponOptions;
    const loyaltyV1CouponCoupons_universal_d_redeemCurrentMemberPointsForCoupon: typeof redeemCurrentMemberPointsForCoupon;
    type loyaltyV1CouponCoupons_universal_d_RedeemMemberPointsForDiscountAmountCouponOptions = RedeemMemberPointsForDiscountAmountCouponOptions;
    const loyaltyV1CouponCoupons_universal_d_getLoyaltyCoupon: typeof getLoyaltyCoupon;
    const loyaltyV1CouponCoupons_universal_d_getCurrentMemberCoupons: typeof getCurrentMemberCoupons;
    const loyaltyV1CouponCoupons_universal_d_queryLoyaltyCoupons: typeof queryLoyaltyCoupons;
    type loyaltyV1CouponCoupons_universal_d_LoyaltyCouponsQueryResult = LoyaltyCouponsQueryResult;
    type loyaltyV1CouponCoupons_universal_d_LoyaltyCouponsQueryBuilder = LoyaltyCouponsQueryBuilder;
    const loyaltyV1CouponCoupons_universal_d_deleteLoyaltyCoupon: typeof deleteLoyaltyCoupon;
    namespace loyaltyV1CouponCoupons_universal_d {
        export { loyaltyV1CouponCoupons_universal_d_LoyaltyCoupon as LoyaltyCoupon, loyaltyV1CouponCoupons_universal_d_CouponReference as CouponReference, loyaltyV1CouponCoupons_universal_d_Specification as Specification, loyaltyV1CouponCoupons_universal_d_SpecificationTypeDetailsOneOf as SpecificationTypeDetailsOneOf, loyaltyV1CouponCoupons_universal_d_SpecificationScopeOrMinSubtotalOneOf as SpecificationScopeOrMinSubtotalOneOf, loyaltyV1CouponCoupons_universal_d_Type as Type, loyaltyV1CouponCoupons_universal_d_BuyXGetY as BuyXGetY, loyaltyV1CouponCoupons_universal_d_Scope as Scope, Status$1 as Status, loyaltyV1CouponCoupons_universal_d_RedeemPointsForCouponRequest as RedeemPointsForCouponRequest, loyaltyV1CouponCoupons_universal_d_RedeemPointsForCouponResponse as RedeemPointsForCouponResponse, loyaltyV1CouponCoupons_universal_d_RedeemCurrentMemberPointsForCouponRequest as RedeemCurrentMemberPointsForCouponRequest, loyaltyV1CouponCoupons_universal_d_RedeemCurrentMemberPointsForCouponResponse as RedeemCurrentMemberPointsForCouponResponse, loyaltyV1CouponCoupons_universal_d_RedeemMemberPointsForDiscountAmountCouponRequest as RedeemMemberPointsForDiscountAmountCouponRequest, loyaltyV1CouponCoupons_universal_d_RedeemMemberPointsForDiscountAmountCouponResponse as RedeemMemberPointsForDiscountAmountCouponResponse, loyaltyV1CouponCoupons_universal_d_GetLoyaltyCouponRequest as GetLoyaltyCouponRequest, loyaltyV1CouponCoupons_universal_d_GetLoyaltyCouponResponse as GetLoyaltyCouponResponse, loyaltyV1CouponCoupons_universal_d_GetCurrentMemberCouponsRequest as GetCurrentMemberCouponsRequest, loyaltyV1CouponCoupons_universal_d_GetCurrentMemberCouponsResponse as GetCurrentMemberCouponsResponse, loyaltyV1CouponCoupons_universal_d_QueryLoyaltyCouponRequest as QueryLoyaltyCouponRequest, QueryV2$1 as QueryV2, QueryV2PagingMethodOneOf$1 as QueryV2PagingMethodOneOf, Sorting$2 as Sorting, SortOrder$2 as SortOrder, Paging$1 as Paging, CursorPaging$2 as CursorPaging, loyaltyV1CouponCoupons_universal_d_QueryLoyaltyCouponResponse as QueryLoyaltyCouponResponse, PagingMetadataV2$1 as PagingMetadataV2, Cursors$2 as Cursors, loyaltyV1CouponCoupons_universal_d_QueryCouponTemplateRequest as QueryCouponTemplateRequest, loyaltyV1CouponCoupons_universal_d_Query as Query, loyaltyV1CouponCoupons_universal_d_V2Paging as V2Paging, loyaltyV1CouponCoupons_universal_d_QueryCouponTemplateResponse as QueryCouponTemplateResponse, loyaltyV1CouponCoupons_universal_d_DeleteLoyaltyCouponRequest as DeleteLoyaltyCouponRequest, loyaltyV1CouponCoupons_universal_d_DeleteLoyaltyCouponResponse as DeleteLoyaltyCouponResponse, DomainEvent$2 as DomainEvent, DomainEventBodyOneOf$2 as DomainEventBodyOneOf, EntityCreatedEvent$2 as EntityCreatedEvent, RestoreInfo$2 as RestoreInfo, EntityUpdatedEvent$2 as EntityUpdatedEvent, EntityDeletedEvent$2 as EntityDeletedEvent, ActionEvent$2 as ActionEvent, Empty$2 as Empty, MessageEnvelope$2 as MessageEnvelope, IdentificationData$2 as IdentificationData, IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf, WebhookIdentityType$2 as WebhookIdentityType, loyaltyV1CouponCoupons_universal_d_redeemPointsForCoupon as redeemPointsForCoupon, loyaltyV1CouponCoupons_universal_d_RedeemPointsForCouponOptions as RedeemPointsForCouponOptions, loyaltyV1CouponCoupons_universal_d_redeemCurrentMemberPointsForCoupon as redeemCurrentMemberPointsForCoupon, loyaltyV1CouponCoupons_universal_d_RedeemMemberPointsForDiscountAmountCouponOptions as RedeemMemberPointsForDiscountAmountCouponOptions, loyaltyV1CouponCoupons_universal_d_getLoyaltyCoupon as getLoyaltyCoupon, loyaltyV1CouponCoupons_universal_d_getCurrentMemberCoupons as getCurrentMemberCoupons, loyaltyV1CouponCoupons_universal_d_queryLoyaltyCoupons as queryLoyaltyCoupons, loyaltyV1CouponCoupons_universal_d_LoyaltyCouponsQueryResult as LoyaltyCouponsQueryResult, loyaltyV1CouponCoupons_universal_d_LoyaltyCouponsQueryBuilder as LoyaltyCouponsQueryBuilder, loyaltyV1CouponCoupons_universal_d_deleteLoyaltyCoupon as deleteLoyaltyCoupon, };
    }
    /** Loyalty transaction. */
    interface LoyaltyTransaction extends LoyaltyTransactionTransactionTypeInfoOneOf {
        /** Information on points earned. */
        earnInfo?: EarnInfo;
        /** Information on points redeemed. */
        redeemInfo?: RedeemInfo;
        /** Information on points adjusted. */
        adjustInfo?: AdjustInfo;
        /** Information on points refunded. */
        refundInfo?: RefundInfo;
        /** Information on points expired. */
        expireInfo?: ExpireInfo;
        /** Transaction ID. */
        _id?: string | null;
        /** Account ID. */
        accountId?: string;
        /**
         * Date and time the transaction was created.
         * @readonly
         */
        _createdDate?: Date;
        /**
         * The number of points earned, adjusted, redeemed, or expired in the transaction.
         *
         * + `EARN`: Number of points earned by the customer taking an action. Example: `20`
         * + `REDEEM`: The number of points redeemed by the customer for a reward. Example: `-50`
         * + `ADJUST`: The number of points refunded for a previously redeemed reward. Examples: `20`, `-30`
         * + `REFUND`: The number of points refunded for a previously redeemed reward. Example: `60`
         * + `EXPIRE`: The number of points that expired due to customer inactivity for a configured period. Example: `-70`
         */
        amount?: number;
        /**
         * Transaction types.
         *
         * + `EARN`: Number of points earned by the customer taking an action. See [Earn points](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/earn-points) for more information.
         * + `REDEEM`: The number of points redeemed by the customer for a reward.
         * + `ADJUST`: The number of points refunded for a previously redeemed reward. See [Adjust Points](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/adjust-points) for more information.
         * + `REFUND`: The number of points refunded for a previously redeemed reward.
         * + `EXPIRE`: The number of points that expired due to customer inactivity for a configured period.
         */
        transactionType?: TransactionType;
        /** Transaction description. */
        description?: string;
        /** Unique identifier, generated by the client. Used to recognize repeated attempts of the same request. Only present when manually adding points using the [Earn Points](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/earn-points) endpoint. */
        idempotencyKey?: string;
    }
    /** @oneof */
    interface LoyaltyTransactionTransactionTypeInfoOneOf {
        /** Information on points earned. */
        earnInfo?: EarnInfo;
        /** Information on points redeemed. */
        redeemInfo?: RedeemInfo;
        /** Information on points adjusted. */
        adjustInfo?: AdjustInfo;
        /** Information on points refunded. */
        refundInfo?: RefundInfo;
        /** Information on points expired. */
        expireInfo?: ExpireInfo;
    }
    enum TransactionType {
        UNKNOWN = "UNKNOWN",
        EARN = "EARN",
        REDEEM = "REDEEM",
        ADJUST = "ADJUST",
        REFUND = "REFUND",
        EXPIRE = "EXPIRE"
    }
    interface EarnInfo {
        /**
         * ID of the the app responsible for providing the earning points data.
         * @readonly
         */
        appId?: string;
        /** Activity type. */
        activityType?: string;
        /** Order ID. */
        orderId?: string | null;
    }
    interface RedeemInfo {
        /**
         * ID of the reward that was redeemed.
         * @readonly
         */
        rewardId?: string;
        /**
         * Type of reward that was redeemed.
         * @readonly
         */
        rewardType?: string | null;
        /**
         * ID of the specific item that was redeemed in this transaction.
         *
         * Each reward that is redeemed has a unique `referenceEntityId`.
         * @readonly
         */
        referenceEntityId?: string | null;
    }
    interface AdjustInfo {
        /**
         * App ID of application that initiated this points adjust.
         * @readonly
         */
        appId?: string;
        /** Amount before adjust. */
        amountBefore?: number;
        /** Amount after adjust. */
        amountAfter?: number;
    }
    interface RefundInfo {
        /**
         * ID of the app responsible for providing the refund points data.
         * @readonly
         */
        appId?: string;
        /**
         * ID of the transaction that was refunded.
         * @readonly
         */
        refundedTransactionId?: string | null;
    }
    interface ExpireInfo {
        /** Amount before expiration. */
        amountBefore?: number;
        /** Amount after expiration. */
        amountAfter?: number;
    }
    interface CreateLoyaltyTransactionRequest {
        /** LoyaltyTransaction to be created. */
        loyaltyTransaction: LoyaltyTransaction;
    }
    interface CreateLoyaltyTransactionResponse {
        /** The created LoyaltyTransaction. */
        loyaltyTransaction?: LoyaltyTransaction;
    }
    interface BulkCreateLoyaltyTransactionsRequest {
        /** Transactions to create. */
        loyaltyTransactions?: LoyaltyTransaction[];
        /** Determines if entities must be returned in response. */
        returnEntity?: boolean;
    }
    interface BulkCreateLoyaltyTransactionsResponse {
        /** Results of bulk creation. */
        results?: BulkLoyaltyTransactionResult[];
        /** Bulk action metadata. */
        bulkActionMetadata?: BulkActionMetadata$1;
    }
    interface ItemMetadata$1 {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError$1;
    }
    interface ApplicationError$1 {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkLoyaltyTransactionResult {
        /** Individual loyalty transaction metadata. */
        itemMetadata?: ItemMetadata$1;
        /** Only exists if `returnEntity` was set to true in the request. */
        item?: LoyaltyTransaction;
    }
    interface BulkActionMetadata$1 {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface GetLoyaltyTransactionRequest {
        /** ID of the loyalty transaction to be retrieved. */
        loyaltyTransactionId: string;
    }
    interface GetLoyaltyTransactionResponse {
        /** Requested `Loyalty Transaction` object. */
        loyaltyTransaction?: LoyaltyTransaction;
    }
    interface QueryLoyaltyTransactionsRequest {
        /** Loyalty transaction query parameters. */
        query?: CursorQuery$1;
    }
    interface CursorQuery$1 extends CursorQueryPagingMethodOneOf$1 {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging$1;
        /**
         * Filter object.
         *
         * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
         */
        filter?: Record<string, any> | null;
        /**
         * Sort object.
         *
         * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
         */
        sort?: Sorting$1[];
    }
    /** @oneof */
    interface CursorQueryPagingMethodOneOf$1 {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging$1;
    }
    interface Sorting$1 {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder$1;
    }
    enum SortOrder$1 {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface CursorPaging$1 {
        /** Maximum number of items to return in the results. */
        limit?: number | null;
        /**
         * Pointer to the next or previous page in the list of results.
         *
         * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
         * Not relevant for the first request.
         */
        cursor?: string | null;
    }
    interface QueryLoyaltyTransactionsResponse {
        /** List of loyalty transactions. */
        loyaltyTransactions?: LoyaltyTransaction[];
        /** Paging metadata. */
        pagingMetadata?: CursorPagingMetadata$1;
    }
    interface CursorPagingMetadata$1 {
        /** Number of items returned in current page. */
        count?: number | null;
        /** Cursor strings that point to the next page, previous page, or both. */
        cursors?: Cursors$1;
        /**
         * Whether there are more pages to retrieve following the current page.
         *
         * + `true`: Another page of results can be retrieved.
         * + `false`: This is the last page.
         */
        hasNext?: boolean | null;
    }
    interface Cursors$1 {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface DomainEvent$1 extends DomainEventBodyOneOf$1 {
        createdEvent?: EntityCreatedEvent$1;
        updatedEvent?: EntityUpdatedEvent$1;
        deletedEvent?: EntityDeletedEvent$1;
        actionEvent?: ActionEvent$1;
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
        eventTime?: Date;
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
    interface DomainEventBodyOneOf$1 {
        createdEvent?: EntityCreatedEvent$1;
        updatedEvent?: EntityUpdatedEvent$1;
        deletedEvent?: EntityDeletedEvent$1;
        actionEvent?: ActionEvent$1;
    }
    interface EntityCreatedEvent$1 {
        entityAsJson?: string;
        /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
        restoreInfo?: RestoreInfo$1;
    }
    interface RestoreInfo$1 {
        deletedDate?: Date;
    }
    interface EntityUpdatedEvent$1 {
        /**
         * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
         * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
         * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
         */
        currentEntityAsJson?: string;
    }
    interface EntityDeletedEvent$1 {
        /** Entity that was deleted */
        deletedEntityAsJson?: string | null;
    }
    interface ActionEvent$1 {
        bodyAsJson?: string;
    }
    interface Empty$1 {
    }
    interface MessageEnvelope$1 {
        /** App instance ID. */
        instanceId?: string | null;
        /** Event type. */
        eventType?: string;
        /** The identification type and identity data. */
        identity?: IdentificationData$1;
        /** Stringify payload. */
        data?: string;
    }
    interface IdentificationData$1 extends IdentificationDataIdOneOf$1 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
        /** @readonly */
        identityType?: WebhookIdentityType$1;
    }
    /** @oneof */
    interface IdentificationDataIdOneOf$1 {
        /** ID of a site visitor that has not logged in to the site. */
        anonymousVisitorId?: string;
        /** ID of a site visitor that has logged in to the site. */
        memberId?: string;
        /** ID of a Wix user (site owner, contributor, etc.). */
        wixUserId?: string;
        /** ID of an app. */
        appId?: string;
    }
    enum WebhookIdentityType$1 {
        UNKNOWN = "UNKNOWN",
        ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
        MEMBER = "MEMBER",
        WIX_USER = "WIX_USER",
        APP = "APP"
    }
    interface BulkCreateLoyaltyTransactionsOptions {
        /** Transactions to create. */
        loyaltyTransactions?: LoyaltyTransaction[];
        /** Determines if entities must be returned in response. */
        returnEntity?: boolean;
    }
    /**
     * Retrieves a transaction.
     * @param loyaltyTransactionId - ID of the loyalty transaction to be retrieved.
     * @public
     * @documentationMaturity preview
     * @requiredField loyaltyTransactionId
     * @permissionId LOYALTY.READ_TRANSACTIONS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Requested `Loyalty Transaction` object.
     */
    function getLoyaltyTransaction(loyaltyTransactionId: string): Promise<LoyaltyTransaction>;
    /**
     * Retrieves a list of loyalty transactions, given the provided [paging, filtering, and sorting][1].
     *
     * Supported fields for filtering and sorting:
     * `id`, `accountId`, `idempotencyKey`, `transactionType`, `amount`, `description`
     *
     * To learn how to query Loyalty Transactions, see [API Query Language][2].
     *
     * [1]: https://dev.wix.com/api/rest/getting-started/sorting-and-paging
     * [2]: https://dev.wix.com/api/rest/getting-started/api-query-language
     * @public
     * @documentationMaturity preview
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionId LOYALTY.READ_TRANSACTIONS
     * @applicableIdentity APP
     * @adminMethod
     */
    function queryLoyaltyTransactions(): LoyaltyTransactionsQueryBuilder;
    interface QueryCursorResult$1 {
        cursors: Cursors$1;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface LoyaltyTransactionsQueryResult extends QueryCursorResult$1 {
        items: LoyaltyTransaction[];
        query: LoyaltyTransactionsQueryBuilder;
        next: () => Promise<LoyaltyTransactionsQueryResult>;
        prev: () => Promise<LoyaltyTransactionsQueryResult>;
    }
    interface LoyaltyTransactionsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        eq: (propertyName: "_id" | "accountId" | "amount" | "transactionType" | "description" | "idempotencyKey", value: any) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ne: (propertyName: "_id" | "accountId" | "amount" | "transactionType" | "description" | "idempotencyKey", value: any) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ge: (propertyName: "amount", value: any) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        gt: (propertyName: "amount", value: any) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        le: (propertyName: "amount", value: any) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        lt: (propertyName: "amount", value: any) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         * @documentationMaturity preview
         */
        startsWith: (propertyName: "_id" | "accountId" | "description" | "idempotencyKey", value: string) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         * @documentationMaturity preview
         */
        hasSome: (propertyName: "_id" | "accountId" | "amount" | "transactionType" | "description" | "idempotencyKey", value: any[]) => LoyaltyTransactionsQueryBuilder;
        /** @documentationMaturity preview */
        in: (propertyName: "_id" | "accountId" | "amount" | "transactionType" | "description" | "idempotencyKey", value: any) => LoyaltyTransactionsQueryBuilder;
        /** @documentationMaturity preview */
        exists: (propertyName: "_id" | "accountId" | "amount" | "transactionType" | "description" | "idempotencyKey", value: boolean) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        ascending: (...propertyNames: Array<"_id" | "accountId" | "amount" | "transactionType" | "description" | "idempotencyKey">) => LoyaltyTransactionsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        descending: (...propertyNames: Array<"_id" | "accountId" | "amount" | "transactionType" | "description" | "idempotencyKey">) => LoyaltyTransactionsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
         * @documentationMaturity preview
         */
        limit: (limit: number) => LoyaltyTransactionsQueryBuilder;
        /** @param cursor - A pointer to specific record
         * @documentationMaturity preview
         */
        skipTo: (cursor: string) => LoyaltyTransactionsQueryBuilder;
        /** @documentationMaturity preview */
        find: () => Promise<LoyaltyTransactionsQueryResult>;
    }
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransaction = LoyaltyTransaction;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransactionTransactionTypeInfoOneOf = LoyaltyTransactionTransactionTypeInfoOneOf;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_TransactionType = TransactionType;
    const loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_TransactionType: typeof TransactionType;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_EarnInfo = EarnInfo;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_RedeemInfo = RedeemInfo;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_AdjustInfo = AdjustInfo;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_RefundInfo = RefundInfo;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_ExpireInfo = ExpireInfo;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_CreateLoyaltyTransactionRequest = CreateLoyaltyTransactionRequest;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_CreateLoyaltyTransactionResponse = CreateLoyaltyTransactionResponse;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkCreateLoyaltyTransactionsRequest = BulkCreateLoyaltyTransactionsRequest;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkCreateLoyaltyTransactionsResponse = BulkCreateLoyaltyTransactionsResponse;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkLoyaltyTransactionResult = BulkLoyaltyTransactionResult;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_GetLoyaltyTransactionRequest = GetLoyaltyTransactionRequest;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_GetLoyaltyTransactionResponse = GetLoyaltyTransactionResponse;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_QueryLoyaltyTransactionsRequest = QueryLoyaltyTransactionsRequest;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_QueryLoyaltyTransactionsResponse = QueryLoyaltyTransactionsResponse;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkCreateLoyaltyTransactionsOptions = BulkCreateLoyaltyTransactionsOptions;
    const loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_getLoyaltyTransaction: typeof getLoyaltyTransaction;
    const loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_queryLoyaltyTransactions: typeof queryLoyaltyTransactions;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransactionsQueryResult = LoyaltyTransactionsQueryResult;
    type loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransactionsQueryBuilder = LoyaltyTransactionsQueryBuilder;
    namespace loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d {
        export { loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransaction as LoyaltyTransaction, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransactionTransactionTypeInfoOneOf as LoyaltyTransactionTransactionTypeInfoOneOf, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_TransactionType as TransactionType, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_EarnInfo as EarnInfo, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_RedeemInfo as RedeemInfo, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_AdjustInfo as AdjustInfo, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_RefundInfo as RefundInfo, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_ExpireInfo as ExpireInfo, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_CreateLoyaltyTransactionRequest as CreateLoyaltyTransactionRequest, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_CreateLoyaltyTransactionResponse as CreateLoyaltyTransactionResponse, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkCreateLoyaltyTransactionsRequest as BulkCreateLoyaltyTransactionsRequest, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkCreateLoyaltyTransactionsResponse as BulkCreateLoyaltyTransactionsResponse, ItemMetadata$1 as ItemMetadata, ApplicationError$1 as ApplicationError, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkLoyaltyTransactionResult as BulkLoyaltyTransactionResult, BulkActionMetadata$1 as BulkActionMetadata, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_GetLoyaltyTransactionRequest as GetLoyaltyTransactionRequest, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_GetLoyaltyTransactionResponse as GetLoyaltyTransactionResponse, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_QueryLoyaltyTransactionsRequest as QueryLoyaltyTransactionsRequest, CursorQuery$1 as CursorQuery, CursorQueryPagingMethodOneOf$1 as CursorQueryPagingMethodOneOf, Sorting$1 as Sorting, SortOrder$1 as SortOrder, CursorPaging$1 as CursorPaging, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_QueryLoyaltyTransactionsResponse as QueryLoyaltyTransactionsResponse, CursorPagingMetadata$1 as CursorPagingMetadata, Cursors$1 as Cursors, DomainEvent$1 as DomainEvent, DomainEventBodyOneOf$1 as DomainEventBodyOneOf, EntityCreatedEvent$1 as EntityCreatedEvent, RestoreInfo$1 as RestoreInfo, EntityUpdatedEvent$1 as EntityUpdatedEvent, EntityDeletedEvent$1 as EntityDeletedEvent, ActionEvent$1 as ActionEvent, Empty$1 as Empty, MessageEnvelope$1 as MessageEnvelope, IdentificationData$1 as IdentificationData, IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf, WebhookIdentityType$1 as WebhookIdentityType, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_BulkCreateLoyaltyTransactionsOptions as BulkCreateLoyaltyTransactionsOptions, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_getLoyaltyTransaction as getLoyaltyTransaction, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_queryLoyaltyTransactions as queryLoyaltyTransactions, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransactionsQueryResult as LoyaltyTransactionsQueryResult, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d_LoyaltyTransactionsQueryBuilder as LoyaltyTransactionsQueryBuilder, };
    }
    /**
     * A loyalty account stores a customer's loyalty points balance. A site's customers can earn points to their account
     * and redeem those points for rewards.
     */
    interface LoyaltyAccount {
        /**
         * Account ID.
         * @readonly
         */
        _id?: string;
        /**
         * Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more.
         * @readonly
         */
        contactId?: string;
        /**
         * Account owner's member ID. See the [Members API](wix-members-backend/introduction) to learn more.
         * @readonly
         */
        memberId?: string | null;
        /**
         * Information about the account totals.
         * @readonly
         */
        points?: Points;
        /**
         * Whether the account has a reward available. `true` if the amount of points in `points.balance` are enough to redeem for a reward.
         * @readonly
         */
        rewardAvailable?: boolean;
        /**
         * Date and time the account was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the account was last updated.
         * @readonly
         */
        _updatedDate?: Date | null;
        /**
         * Account's last activity date and time.
         * @readonly
         */
        lastActivityDate?: Date | null;
        /**
         * Revision number, which increments by 1 each time the loyalty account is updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty account.
         *
         * Ignored when creating an account.
         */
        revision?: string;
        /**
         * Tier information.
         * @readonly
         */
        tier?: Tier;
        /**
         * Contact information.
         * @readonly
         */
        contact?: Contact;
        /**
         * Points expiration information
         * @readonly
         */
        pointsExpiration?: PointsExpiration;
    }
    interface Points {
        /**
         * Current point balance.
         *
         * Equal to the sum of `earned` and `adjusted` points, minus `redeemed` points.
         * @readonly
         */
        balance?: number;
        /**
         * Total earned points.
         * @readonly
         */
        earned?: number;
        /**
         * Total adjusted points.
         * @readonly
         */
        adjusted?: number;
        /**
         * Total redeemed points.
         * @readonly
         */
        redeemed?: number;
        /**
         * Total expired points.
         * @readonly
         */
        expired?: number;
    }
    /**
     * Tier information.
     *
     * The Tiers API is currently unavailable, but the program may be activated and managed from a site's
     * [loyalty dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Floyalty-accounts/wizard/).
     */
    interface Tier {
        /**
         * Tier ID.
         *
         * This field will not be returned if the account belongs to the base tier.
         * @readonly
         */
        _id?: string | null;
        /**
         * Date and time the tier information was last recalculated.
         * @readonly
         */
        _updatedDate?: Date | null;
        /**
         * Points earned and adjusted over the tier's current rolling window.
         * @readonly
         */
        points?: number;
    }
    /** Loyalty account's contact information */
    interface Contact {
        /**
         * Contact ID.
         * @readonly
         */
        _id?: string | null;
        /**
         * Contact's first and last name.
         * @readonly
         */
        name?: string | null;
        /**
         * Contact's profile picture.
         * @readonly
         */
        picture?: Image;
        /**
         * Contact's email addresses.
         * @readonly
         */
        email?: string | null;
        /**
         * Contact's first and last name. If no name is provided, uses contact's email.
         * @readonly
         */
        displayName?: string | null;
    }
    interface Image {
        /** WixMedia image ID. */
        _id?: string;
        /** Image URL. */
        url?: string;
        /**
         * Original image height.
         * @readonly
         */
        height?: number;
        /**
         * Original image width.
         * @readonly
         */
        width?: number;
    }
    interface PointsExpiration {
        /**
         * Date at which points are expiring.
         * @readonly
         */
        expirationDate?: Date | null;
        /**
         * Amount of points that are going to expire at that date.
         * @readonly
         */
        expiringPointsAmount?: number;
    }
    interface RewardAvailabilityUpdated {
        /** True if rewards is available. */
        rewardAvailable?: boolean;
        /** Source of this change. */
        updateTrigger?: UpdateTrigger;
    }
    enum UpdateTrigger {
        /** Undefined trigger. */
        UNDEFINED = "UNDEFINED",
        /** Reward was updated. */
        REWARD_UPDATED = "REWARD_UPDATED",
        /** Balance was updated. */
        BALANCE_UPDATED = "BALANCE_UPDATED",
        /** Tiers were recalculated. */
        TIERS_RECALCULATED = "TIERS_RECALCULATED"
    }
    interface CreateAccountRequest {
        /**
         * Contact ID for a Wix site contact. See the [Contacts API](wix-crm-backend/contacts) to learn more.
         *
         */
        contactId: string;
    }
    interface CreateAccountResponse {
        /** Created loyalty account. */
        account?: LoyaltyAccount;
    }
    interface EarnPointsRequest extends EarnPointsRequestActivityDetailsOneOf {
        /** Followed social media details. */
        followedSocialMedia?: FollowedSocialMedia;
        /** Loyalty account ID. */
        accountId: string;
        /**
         * Amount of points to earn. Must be a positive, whole number.
         *
         * Min: `1`
         *
         * Max: `9999999`
         */
        amount?: number;
        /**
         * Description of how the points were earned.
         *
         * Max: 100 characters
         */
        description?: string;
        /**
         * ID of the app that initiated the transaction.
         *
         * If points were earned manually, then the `appId` is the Loyalty app's
         * `wixAppId` of `553c79f3-5625-4f38-b14b-ef7c0d1e87df`. If points were earned in an automatic event,
         * then the `appId` is from that automation's `sourceAppId`.
         */
        appId: string;
        /**
         * Unique string identifier generated by the app. Wix uses this identifier to recognize subsequent retries of the same request.
         *
         * Please use `GUID` format.
         */
        idempotencyKey: string;
        /**
         * Activity type.
         *
         * If points were earned through automation it should be set to trigger key.
         */
        activityType?: string | null;
        /** Order id which was source of this transaction. */
        orderId?: string | null;
    }
    /** @oneof */
    interface EarnPointsRequestActivityDetailsOneOf {
        /** Followed social media details. */
        followedSocialMedia?: FollowedSocialMedia;
    }
    interface FollowedSocialMedia {
        /**
         * Social media channel.
         * Example: `FACEBOOK`, `INSTAGRAM`.
         */
        channel?: string;
    }
    interface EarnPointsResponse {
        /** Updated loyalty account. */
        account?: LoyaltyAccount;
        /**
         * Transaction ID associated with the points earned.
         * @readonly
         */
        transactionId?: string;
    }
    interface PointsUpdated {
        /** Updated account. */
        account?: LoyaltyAccount;
    }
    interface FirstTransaction {
        /** Updated account. */
        account?: LoyaltyAccount;
    }
    interface AdjustPointsRequest extends AdjustPointsRequestTypeOneOf {
        /**
         * Sets the account's point balance to this amount. Must be a positive, whole number or zero.
         *
         * The net difference between this new balance and the previous balance will be reflected in the `adjusted` field of the customer's account.
         *
         * Min: `0`
         *
         * Max: `999999999`
         */
        balance?: number;
        /**
         * Adjusts the account's point balance by this amount. Must be a whole number with a maximum of 7 digits.
         * The amount can be negative, but cannot be `0`.
         *
         * Min: `-9999999`
         *
         * Max: `9999999`
         */
        amount?: number;
        /** Loyalty account ID. */
        accountId: string;
        /** Description to explain the reason for the points adjustment. */
        description?: string | null;
        /**
         * Each time the loyalty account is updated, `revision` increments by 1.
         *
         * The current `revision` must be passed when adjusting points in the loyalty account. This
         * ensures you're working with the latest version of the loyalty account and prevents unintended overwrites.
         */
        revision?: string;
    }
    /** @oneof */
    interface AdjustPointsRequestTypeOneOf {
        /**
         * Sets the account's point balance to this amount. Must be a positive, whole number or zero.
         *
         * The net difference between this new balance and the previous balance will be reflected in the `adjusted` field of the customer's account.
         *
         * Min: `0`
         *
         * Max: `999999999`
         */
        balance?: number;
        /**
         * Adjusts the account's point balance by this amount. Must be a whole number with a maximum of 7 digits.
         * The amount can be negative, but cannot be `0`.
         *
         * Min: `-9999999`
         *
         * Max: `9999999`
         */
        amount?: number;
    }
    interface AdjustPointsResponse {
        /** Adjusted loyalty account. */
        account?: LoyaltyAccount;
        /**
         * Transaction ID associated with the points adjustment.
         * @readonly
         */
        transactionId?: string;
    }
    interface RedeemPointsRequest {
        /** Loyalty account ID. */
        accountId: string;
        /** Reward ID. See [Rewards API](https://dev.wix.com/api/rest/loyalty/rewards/rewards-object) for more details. */
        rewardId: string;
        /** Number of times the given reward will be redeemed. Must be a positive whole number. */
        count?: number;
        /**
         * Revision number, which increments by 1 each time points are redeemed.
         * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
         */
        revision?: string;
        /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
        referenceEntityId?: string | null;
    }
    interface RedeemPointsResponse {
        /** Loyalty account. */
        account?: LoyaltyAccount;
        /**
         * Transaction ID associated with the redemption.
         * @readonly
         */
        transactionId?: string;
    }
    interface RedeemDeterminedAmountOfPointsRequest {
        /** Loyalty account ID. */
        accountId: string;
        /** Reward ID. See [Rewards API](https://dev.wix.com/api/rest/loyalty/rewards/rewards-object) for more details. */
        rewardId: string;
        /** Number of points to be redeemed off the account. */
        points?: number;
        /**
         * Revision number, which increments by 1 each time points are redeemed.
         * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
         */
        revision?: string;
        /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
        referenceEntityId?: string | null;
    }
    interface RedeemDeterminedAmountOfPointsResponse {
        /** Loyalty account. */
        account?: LoyaltyAccount;
        /**
         * Transaction ID associated with the redemption.
         * @readonly
         */
        transactionId?: string;
    }
    interface RefundTransactionRequest {
        /**
         * Transaction ID associated with the refund.
         * @readonly
         */
        transactionId: string;
    }
    interface RefundTransactionResponse {
    }
    interface GetAccountRequest {
        /** ID of the account to retrieve. */
        _id: string;
    }
    interface GetAccountResponse {
        /** Retrieved loyalty account. */
        account?: LoyaltyAccount;
    }
    interface QueryLoyaltyAccountsRequest {
        /**
         * Filter object.
         * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language) for more information.
         */
        query: CursorQuery;
    }
    interface CursorQuery extends CursorQueryPagingMethodOneOf {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging;
        /**
         * Filter object.
         *
         * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
         */
        filter?: Record<string, any> | null;
        /**
         * Sort object.
         *
         * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
         */
        sort?: Sorting[];
    }
    /** @oneof */
    interface CursorQueryPagingMethodOneOf {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging;
    }
    interface Sorting {
        /** Name of the field to sort by. */
        fieldName?: string;
        /** Sort order. */
        order?: SortOrder;
    }
    enum SortOrder {
        ASC = "ASC",
        DESC = "DESC"
    }
    interface CursorPaging {
        /** Maximum number of items to return in the results. */
        limit?: number | null;
        /**
         * Pointer to the next or previous page in the list of results.
         *
         * Pass the relevant cursor token from the `pagingMetadata` object in the previous call's response.
         * Not relevant for the first request.
         */
        cursor?: string | null;
    }
    interface QueryLoyaltyAccountsResponse {
        /** Loyalty accounts. */
        loyaltyAccounts?: LoyaltyAccount[];
        /** Paging metadata */
        pagingMetadata?: CursorPagingMetadata;
    }
    interface CursorPagingMetadata {
        /** Number of items returned in current page. */
        count?: number | null;
        /** Cursor strings that point to the next page, previous page, or both. */
        cursors?: Cursors;
        /**
         * Whether there are more pages to retrieve following the current page.
         *
         * + `true`: Another page of results can be retrieved.
         * + `false`: This is the last page.
         */
        hasNext?: boolean | null;
    }
    interface Cursors {
        /** Cursor string pointing to the next page in the list of results. */
        next?: string | null;
        /** Cursor pointing to the previous page in the list of results. */
        prev?: string | null;
    }
    interface ListUserAccountsRequest {
        /** Number of items to load. Minimum `1`, maximum `50`. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface ListUserAccountsResponse {
        /** Loyalty accounts. */
        accounts?: LoyaltyAccountForMetaSite[];
    }
    interface LoyaltyAccountForMetaSite {
        /** Loyalty account. */
        account?: LoyaltyAccount;
        /** Metasite ID. */
        metaSiteId?: string;
    }
    interface GetProgramTotalsRequest {
    }
    interface GetProgramTotalsResponse {
        /** Point totals for the entire program. */
        points?: Points;
        /** Tier total for the entire program. */
        tierTotals?: TierTotal[];
    }
    interface TierTotal {
        /**
         * Tier ID. If no Tier ID provided, the ID is null. See [Base tier](https://dev.wix.com/docs/rest/crm/loyalty-program/tiers/introduction)for more information.
         * @readonly
         */
        _id?: string | null;
        /** Total number of loyalty account that belong to a particular Tier. */
        numberOfAccounts?: number;
    }
    interface GetCurrentMemberAccountRequest {
    }
    interface GetCurrentMemberAccountResponse {
        /** Loyalty account. */
        account?: LoyaltyAccount;
    }
    interface GetMyAccountRequest {
    }
    interface GetMyAccountResponse {
        /** Loyalty account. */
        account?: LoyaltyAccount;
    }
    interface GetAccountBySecondaryIdRequest extends GetAccountBySecondaryIdRequestIdOneOf {
        /** Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
        contactId?: string;
        /** Account owner's member ID. See the [Members API](wix-members-backend/introduction) to learn more. */
        memberId?: string;
    }
    /** @oneof */
    interface GetAccountBySecondaryIdRequestIdOneOf {
        /** Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
        contactId?: string;
        /** Account owner's member ID/ See the [Members API](wix-members-backend/introduction) to learn more. */
        memberId?: string;
    }
    interface GetAccountBySecondaryIdResponse {
        /** Retrieved loyalty account. */
        account?: LoyaltyAccount;
    }
    /** Options to use when retrieving a list of loyalty accounts. */
    interface ListAccountsRequest {
        /** List of contact IDs. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
        contactIds?: string[];
        /** Pagination options. */
        cursorPaging?: CursorPaging;
    }
    interface ListAccountsResponse {
        /** Retrieved loyalty accounts. */
        accounts?: LoyaltyAccount[];
        /** Details on the paged set of results returned. */
        pagingMetadata?: PagingMetadataV2;
    }
    interface PagingMetadataV2 {
        /** Number of items returned in the response. */
        count?: number | null;
        /** Offset that was requested. */
        offset?: number | null;
        /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
        total?: number | null;
        /** Flag that indicates the server failed to calculate the `total` field. */
        tooManyToCount?: boolean | null;
        /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
        cursors?: Cursors;
    }
    /** Options to use when search for loyalty accounts. */
    interface SearchAccountsRequest {
        /** Search options. */
        search?: CursorSearch;
    }
    interface CursorSearch extends CursorSearchPagingMethodOneOf {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging;
        /**
         * Filter object.
         *
         * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
         */
        filter?: Record<string, any> | null;
        /**
         * List of sort objects.
         *
         * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
         */
        sort?: Sorting[];
        /** Aggregations are a way to explore large amounts of data by displaying summaries about various partitions of the data and later allowing to narrow the navigation to a specific partition. */
        aggregations?: Aggregation[];
        /** Free text to match in searchable fields. */
        search?: SearchDetails;
        /**
         * UTC offset or IANA time zone. Valid values are
         * ISO 8601 UTC offsets, such as +02:00 or -06:00,
         * and IANA time zone IDs, such as Europe/Rome.
         *
         * Affects all filters and aggregations returned values.
         * You may override this behavior in a specific filter by providing
         * timestamps including time zone. For example, `"2023-12-20T10:52:34.795Z"`.
         */
        timeZone?: string | null;
    }
    /** @oneof */
    interface CursorSearchPagingMethodOneOf {
        /**
         * Cursor paging options.
         *
         * Learn more about [cursor paging](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#cursor-paging).
         */
        cursorPaging?: CursorPaging;
    }
    interface Aggregation extends AggregationKindOneOf {
        /** Value aggregation. */
        value?: ValueAggregation;
        /** Range aggregation. */
        range?: RangeAggregation;
        /** Scalar aggregation. */
        scalar?: ScalarAggregation;
        /** Date histogram aggregation. */
        dateHistogram?: DateHistogramAggregation;
        /** Nested aggregation. */
        nested?: NestedAggregation;
        /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
        name?: string | null;
        /** Type of aggregation, client must provide matching aggregation field below. */
        type?: AggregationType;
        /** Field to aggregate by, use dot notation to specify json path. */
        fieldPath?: string;
        /**
         * Deprecated. Use `nested` instead.
         * @deprecated Deprecated. Use `nested` instead.
         * @replacedBy kind.nested
         * @targetRemovalDate 2024-03-30
         */
        groupBy?: GroupByAggregation;
    }
    /** @oneof */
    interface AggregationKindOneOf {
        /** Value aggregation. */
        value?: ValueAggregation;
        /** Range aggregation. */
        range?: RangeAggregation;
        /** Scalar aggregation. */
        scalar?: ScalarAggregation;
        /** Date histogram aggregation. */
        dateHistogram?: DateHistogramAggregation;
        /** Nested aggregation. */
        nested?: NestedAggregation;
    }
    interface RangeBucket {
        /** Inclusive lower bound of the range. Required if `to` is not provided. */
        from?: number | null;
        /** Exclusive upper bound of the range. Required if `from` is not provided. */
        to?: number | null;
    }
    enum SortType {
        /** Sort by number of matches. */
        COUNT = "COUNT",
        /** Sort by value of the field alphabetically. */
        VALUE = "VALUE"
    }
    enum SortDirection {
        /** Sort in descending order. */
        DESC = "DESC",
        /** Sort in ascending order. */
        ASC = "ASC"
    }
    enum MissingValues {
        /** Exclude missing values from the aggregation results. */
        EXCLUDE = "EXCLUDE",
        /** Include missing values in the aggregation results. */
        INCLUDE = "INCLUDE"
    }
    interface IncludeMissingValuesOptions {
        /** Specify custom bucket name. Defaults are [string -> "N/A"], [int -> "0"], [bool -> "false"] ... */
        addToBucket?: string;
    }
    enum ScalarType {
        UNKNOWN_SCALAR_TYPE = "UNKNOWN_SCALAR_TYPE",
        /** Count of distinct values. */
        COUNT_DISTINCT = "COUNT_DISTINCT",
        /** Minimum value. */
        MIN = "MIN",
        /** Maximum value. */
        MAX = "MAX",
        /** Sum of values. */
        SUM = "SUM",
        /** Average of values. */
        AVG = "AVG"
    }
    interface ValueAggregation extends ValueAggregationOptionsOneOf {
        /** Options for including missing values. */
        includeOptions?: IncludeMissingValuesOptions;
        /** Whether to sort by number of matches or value of the field. */
        sortType?: SortType;
        /** Whether to sort in ascending or descending order. */
        sortDirection?: SortDirection;
        /** How many aggregations to return. Can be between 1 and 250. 10 is the default. */
        limit?: number | null;
        /** Whether to include or exclude missing values from the aggregation results. Default: `EXCLUDE`. */
        missingValues?: MissingValues;
    }
    /** @oneof */
    interface ValueAggregationOptionsOneOf {
        /** Options for including missing values. */
        includeOptions?: IncludeMissingValuesOptions;
    }
    enum NestedAggregationType {
        UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
        /** An aggregation where result buckets are dynamically built - one per unique value. */
        VALUE = "VALUE",
        /** An aggregation, where user can define set of ranges - each representing a bucket. */
        RANGE = "RANGE",
        /** A single-value metric aggregation. For example, min, max, sum, avg. */
        SCALAR = "SCALAR",
        /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.). */
        DATE_HISTOGRAM = "DATE_HISTOGRAM"
    }
    interface RangeAggregation {
        /** List of range buckets, where during aggregation each entity will be placed in the first bucket its value falls into, based on the provided range bounds. */
        buckets?: RangeBucket[];
    }
    interface ScalarAggregation {
        /** Define the operator for the scalar aggregation. */
        type?: ScalarType;
    }
    interface DateHistogramAggregation {
        /** Interval for date histogram aggregation. */
        interval?: DateHistogramAggregationInterval;
    }
    enum DateHistogramAggregationInterval {
        UNKNOWN_INTERVAL = "UNKNOWN_INTERVAL",
        /** Yearly interval */
        YEAR = "YEAR",
        /** Monthly interval */
        MONTH = "MONTH",
        /** Weekly interval */
        WEEK = "WEEK",
        /** Daily interval */
        DAY = "DAY",
        /** Hourly interval */
        HOUR = "HOUR",
        /** Minute interval */
        MINUTE = "MINUTE",
        /** Second interval */
        SECOND = "SECOND"
    }
    interface NestedAggregationItem extends NestedAggregationItemKindOneOf {
        /** Value aggregation. */
        value?: ValueAggregation;
        /** Range aggregation. */
        range?: RangeAggregation;
        /** Scalar aggregation. */
        scalar?: ScalarAggregation;
        /** Date histogram aggregation. */
        dateHistogram?: DateHistogramAggregation;
        /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
        name?: string | null;
        /** Type of aggregation, client must provide matching aggregation field below. */
        type?: NestedAggregationType;
        /** Field to aggregate by, use dot notation to specify json path. */
        fieldPath?: string;
    }
    /** @oneof */
    interface NestedAggregationItemKindOneOf {
        /** Value aggregation. */
        value?: ValueAggregation;
        /** Range aggregation. */
        range?: RangeAggregation;
        /** Scalar aggregation. */
        scalar?: ScalarAggregation;
        /** Date histogram aggregation. */
        dateHistogram?: DateHistogramAggregation;
    }
    enum AggregationType {
        UNKNOWN_AGGREGATION_TYPE = "UNKNOWN_AGGREGATION_TYPE",
        /** An aggregation where result buckets are dynamically built - one per unique value. */
        VALUE = "VALUE",
        /** An aggregation, where user can define set of ranges - each representing a bucket. */
        RANGE = "RANGE",
        /** A single-value metric aggregation. For example, min, max, sum, avg. */
        SCALAR = "SCALAR",
        /** An aggregation, where result buckets are dynamically built - one per time interval (hour, day, week, etc.) */
        DATE_HISTOGRAM = "DATE_HISTOGRAM",
        /** Multi-level aggregation, where each next aggregation is nested within previous one. */
        NESTED = "NESTED"
    }
    /** Nested aggregation expressed through a list of aggregation where each next aggregation is nested within previous one. */
    interface NestedAggregation {
        /** Flattened list of aggregations, where each next aggregation is nested within previous one. */
        nestedAggregations?: NestedAggregationItem[];
    }
    interface GroupByAggregation extends GroupByAggregationKindOneOf {
        /** Value aggregation configuration. */
        value?: ValueAggregation;
        /** User-defined name of aggregation, should be unique, will appear in aggregation results. */
        name?: string | null;
        /** Field to aggregate by. */
        fieldPath?: string;
    }
    /** @oneof */
    interface GroupByAggregationKindOneOf {
        /** Value aggregation configuration. */
        value?: ValueAggregation;
    }
    interface SearchDetails {
        /** Defines how separate search terms in `expression` are combined. */
        mode?: Mode;
        /** Search term or expression. */
        expression?: string | null;
        /** Fields to search in. If empty - will search in all searchable fields. Use dot notation to specify json path. */
        fields?: string[];
        /** Whether to use auto fuzzy search (allowing typos by a managed proximity algorithm). */
        fuzzy?: boolean;
    }
    enum Mode {
        /** Any of the search terms must be present. */
        OR = "OR",
        /** All search terms must be present. */
        AND = "AND"
    }
    /** Accounts found through provided search capabilities, along with paging and aggregation data of the results. */
    interface SearchAccountsResponse {
        /** Found accounts. */
        accounts?: LoyaltyAccount[];
        /** Paging metadata. */
        pagingMetadata?: CursorPagingMetadata;
        /** Aggregation data */
        aggregationData?: AggregationData;
    }
    interface AggregationData {
        /** key = aggregation name (as derived from search request). */
        results?: AggregationResults[];
    }
    interface ValueAggregationResult {
        /** Value of the field. */
        value?: string;
        /** Count of entities with this value. */
        count?: number;
    }
    interface RangeAggregationResult {
        /** Inclusive lower bound of the range. */
        from?: number | null;
        /** Exclusive upper bound of the range. */
        to?: number | null;
        /** Count of entities in this range. */
        count?: number;
    }
    interface NestedAggregationResults extends NestedAggregationResultsResultOneOf {
        /** Value aggregation results. */
        values?: ValueResults;
        /** Range aggregation results. */
        ranges?: RangeResults;
        /** Scalar aggregation results. */
        scalar?: AggregationResultsScalarResult;
        /** User-defined name of aggregation, matches the one provided in request. */
        name?: string;
        /** Type of aggregation that matches result. */
        type?: AggregationType;
        /** Field to aggregate by, matches the one provided in request. */
        fieldPath?: string;
    }
    /** @oneof */
    interface NestedAggregationResultsResultOneOf {
        /** Value aggregation results. */
        values?: ValueResults;
        /** Range aggregation results. */
        ranges?: RangeResults;
        /** Scalar aggregation results. */
        scalar?: AggregationResultsScalarResult;
    }
    interface ValueResults {
        /** List of value aggregations. */
        results?: ValueAggregationResult[];
    }
    interface RangeResults {
        /** List of ranges returned in same order as requested. */
        results?: RangeAggregationResult[];
    }
    interface AggregationResultsScalarResult {
        /** Type of scalar aggregation. */
        type?: ScalarType;
        /** Value of the scalar aggregation. */
        value?: number;
    }
    interface NestedValueAggregationResult {
        /** Value of the field. */
        value?: string;
        /** Nested aggregations. */
        nestedResults?: NestedAggregationResults;
    }
    interface ValueResult {
        /** Value of the field. */
        value?: string;
        /** Count of entities with this value. */
        count?: number | null;
    }
    interface RangeResult {
        /** Inclusive lower bound of the range. */
        from?: number | null;
        /** Exclusive upper bound of the range. */
        to?: number | null;
        /** Count of entities in this range. */
        count?: number | null;
    }
    interface ScalarResult {
        /** Value of the scalar aggregation. */
        value?: number;
    }
    interface NestedResultValue extends NestedResultValueResultOneOf {
        /** Value aggregation result. */
        value?: ValueResult;
        /** Range aggregation result. */
        range?: RangeResult;
        /** Scalar aggregation result. */
        scalar?: ScalarResult;
        /** Date histogram aggregation result. */
        dateHistogram?: ValueResult;
    }
    /** @oneof */
    interface NestedResultValueResultOneOf {
        /** Value aggregation result. */
        value?: ValueResult;
        /** Range aggregation result. */
        range?: RangeResult;
        /** Scalar aggregation result. */
        scalar?: ScalarResult;
        /** Date histogram aggregation result. */
        dateHistogram?: ValueResult;
    }
    interface Results {
        /** List of nested aggregations. */
        results?: Record<string, NestedResultValue>;
    }
    interface DateHistogramResult {
        /** Date in ISO 8601 format. */
        value?: string;
        /** Count of documents in the bucket. */
        count?: number;
    }
    interface GroupByValueResults {
        /** List of value aggregations. */
        results?: NestedValueAggregationResult[];
    }
    interface DateHistogramResults {
        /** List of date histogram aggregations. */
        results?: DateHistogramResult[];
    }
    /**
     * Results of `NESTED` aggregation type in a flattened form.
     * Aggregations in resulting array are keyed by requested aggregation `name`.
     */
    interface NestedResults {
        /** List of nested aggregations. */
        results?: Results[];
    }
    interface AggregationResults extends AggregationResultsResultOneOf {
        /** Value aggregation results. */
        values?: ValueResults;
        /** Range aggregation results. */
        ranges?: RangeResults;
        /** Scalar aggregation results. */
        scalar?: AggregationResultsScalarResult;
        /** Group by value aggregation results. */
        groupedByValue?: GroupByValueResults;
        /** Date histogram aggregation results. */
        dateHistogram?: DateHistogramResults;
        /** Nested aggregation results. */
        nested?: NestedResults;
        /** User-defined name of aggregation as derived from search request. */
        name?: string;
        /** Type of aggregation that must match provided kind as derived from search request. */
        type?: AggregationType;
        /** Field to aggregate by as derived from search request. */
        fieldPath?: string;
    }
    /** @oneof */
    interface AggregationResultsResultOneOf {
        /** Value aggregation results. */
        values?: ValueResults;
        /** Range aggregation results. */
        ranges?: RangeResults;
        /** Scalar aggregation results. */
        scalar?: AggregationResultsScalarResult;
        /** Group by value aggregation results. */
        groupedByValue?: GroupByValueResults;
        /** Date histogram aggregation results. */
        dateHistogram?: DateHistogramResults;
        /** Nested aggregation results. */
        nested?: NestedResults;
    }
    interface ExportAccountsRequest {
        query?: QueryV2;
    }
    interface QueryV2 extends QueryV2PagingMethodOneOf {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging;
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging;
        /**
         * Filter object.
         *
         * Learn more about the [filter section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-filter-section).
         */
        filter?: Record<string, any> | null;
        /**
         * Sort object.
         *
         * Learn more about the [sort section](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#the-sort-section).
         */
        sort?: Sorting[];
        /** Array of projected fields. A list of specific field names to return. If `fieldsets` are also specified, the union of `fieldsets` and `fields` is returned. */
        fields?: string[];
        /** Array of named, predefined sets of projected fields. A array of predefined named sets of fields to be returned. Specifying multiple `fieldsets` will return the union of fields from all sets. If `fields` are also specified, the union of `fieldsets` and `fields` is returned. */
        fieldsets?: string[];
    }
    /** @oneof */
    interface QueryV2PagingMethodOneOf {
        /** Paging options to limit and skip the number of items. */
        paging?: Paging;
        /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
        cursorPaging?: CursorPaging;
    }
    interface Paging {
        /** Number of items to load. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    interface ExportAccountsResponse {
        accounts?: LoyaltyAccount[];
        pagingMetadata?: CursorPagingMetadata;
    }
    /** Options to use when looking up count of loyalty accounts. */
    interface CountAccountsRequest {
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Free text to match in searchable fields. */
        search?: SearchDetails;
    }
    /** Count of accounts found for given search query */
    interface CountAccountsResponse {
        count?: number;
    }
    interface BulkAdjustPointsRequest extends BulkAdjustPointsRequestTypeOneOf {
        balance?: number;
        amount?: number;
        search?: CursorSearch;
    }
    /** @oneof */
    interface BulkAdjustPointsRequestTypeOneOf {
        balance?: number;
        amount?: number;
    }
    interface BulkAdjustPointsResponse {
        /** @readonly */
        asyncJobId?: string | null;
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
    interface Empty {
    }
    interface TiersRollingUpdate {
    }
    interface TiersProgramSettingsChanged {
        /** Settings for the tiers program. */
        programSettings?: TiersProgramSettings;
    }
    /** There can be single TiersSettings per site and it's global (i.e. applies to all program's tiers) */
    interface TiersProgramSettings extends TiersProgramSettingsPeriodOneOf {
        /**
         * *Required.**
         * Period of time used to calculate loyalty points for tier assignment.
         *
         * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
         */
        rollingWindow?: RollingWindow;
        /** Tiers program status. */
        status?: Status;
        /**
         * Revision number, which increments by 1 each time the loyalty tiers settings are updated.
         *
         * To prevent conflicting changes, the current `revision` must be passed when updating the loyalty tiers settings.
         */
        revision?: string | null;
        /**
         * Date and time the loyalty tiers program was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the loyalty tiers program was last updated.
         * @readonly
         */
        _updatedDate?: Date | null;
        /**
         * Information about the base loyalty tier.
         *
         * The base tier is the default tier for any account that is unassigned for not meeting
         * the required points threshold of any other tier.
         */
        baseTierDefinition?: TierDefinition;
    }
    /** @oneof */
    interface TiersProgramSettingsPeriodOneOf {
        /**
         * *Required.**
         * Period of time used to calculate loyalty points for tier assignment.
         *
         * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
         */
        rollingWindow?: RollingWindow;
    }
    enum Status {
        /** Unknown status. */
        UNKNOWN = "UNKNOWN",
        /** Tiers are disabled. */
        DISABLED = "DISABLED",
        /** Tiers are enabled but not yet active. */
        DRAFT = "DRAFT",
        /** Tiers are active. */
        ACTIVE = "ACTIVE",
        /** Tiers are paused. */
        PAUSED = "PAUSED"
    }
    /** Information about the tier. */
    interface TierDefinition {
        /** Details about the tier icon. */
        icon?: string;
        /** Tier name. */
        name?: string | null;
        /** Tier description. */
        description?: string | null;
    }
    interface FocalPoint {
        /** X-coordinate of the focal point. */
        x?: number;
        /** Y-coordinate of the focal point. */
        y?: number;
        /** crop by height */
        height?: number | null;
        /** crop by width */
        width?: number | null;
    }
    /**
     * *Required.** Period of time used to calculate loyalty points for tier assignment.
     *
     * The loyalty points accumulated during this period determine if the account meets a tier's required point threshold.
     */
    interface RollingWindow {
        /**
         * Number of months to use for the rolling window period.
         *
         * Min: `12`
         *
         * Max: `36`
         */
        durationInMonths?: number;
    }
    interface SubscriptionEvent extends SubscriptionEventEventOneOf {
        /** Triggered when a subscription is created. */
        created?: SubscriptionCreated;
        /**
         * Triggered when a subscription is assigned to a Wix site, including the initial
         * assignment of a floating subscription or a re-assignement from a different site.
         */
        assigned?: SubscriptionAssigned;
        /** Triggered when a subscription is canceled. */
        cancelled?: SubscriptionCancelled;
        /** Triggered when the subscription's auto renew is turned on. */
        autoRenewTurnedOn?: SubscriptionAutoRenewTurnedOn;
        /** Triggered when the subscription's auto renew is turned off. */
        autoRenewTurnedOff?: SubscriptionAutoRenewTurnedOff;
        /**
         * Triggered when a subscription is unassigned from a Wix site and becomes
         * floating.
         */
        unassigned?: SubscriptionUnassigned;
        /**
         * Triggered when a subscription is transferred from one Wix account to another.
         * A transfer includes cancelling the original subscription and creating a new
         * subscription for the target account. The event returns both the original
         * and the new subscription.
         */
        transferred?: SubscriptionTransferred;
        /** Triggered when a recurring charge succeeds for a subscription. */
        recurringChargeSucceeded?: RecurringChargeSucceeded;
        /**
         * Triggered when a subscription was updated including when its product has been
         * up- or downgraded or the billing cycle is changed.
         */
        contractSwitched?: ContractSwitched;
        /**
         * Triggered when a subscription gets close to the end of its billing cycle.
         * The exact number of days is defined in the billing system.
         */
        nearEndOfPeriod?: SubscriptionNearEndOfPeriod;
        /**
         * Triggered when a subscription is updated and the change doesn't happen
         * immediately but at the end of the current billing cycle.
         */
        pendingChange?: SubscriptionPendingChange;
        /** ID of the subscription's event. */
        eventId?: string | null;
        /**
         * Date and time of the event in
         * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
         * `YYYY-MM-DDThh:mm:ss.sssZ` format.
         */
        eventDate?: Date | null;
    }
    /** @oneof */
    interface SubscriptionEventEventOneOf {
        /** Triggered when a subscription is created. */
        created?: SubscriptionCreated;
        /**
         * Triggered when a subscription is assigned to a Wix site, including the initial
         * assignment of a floating subscription or a re-assignement from a different site.
         */
        assigned?: SubscriptionAssigned;
        /** Triggered when a subscription is canceled. */
        cancelled?: SubscriptionCancelled;
        /** Triggered when the subscription's auto renew is turned on. */
        autoRenewTurnedOn?: SubscriptionAutoRenewTurnedOn;
        /** Triggered when the subscription's auto renew is turned off. */
        autoRenewTurnedOff?: SubscriptionAutoRenewTurnedOff;
        /**
         * Triggered when a subscription is unassigned from a Wix site and becomes
         * floating.
         */
        unassigned?: SubscriptionUnassigned;
        /**
         * Triggered when a subscription is transferred from one Wix account to another.
         * A transfer includes cancelling the original subscription and creating a new
         * subscription for the target account. The event returns both the original
         * and the new subscription.
         */
        transferred?: SubscriptionTransferred;
        /** Triggered when a recurring charge succeeds for a subscription. */
        recurringChargeSucceeded?: RecurringChargeSucceeded;
        /**
         * Triggered when a subscription was updated including when its product has been
         * up- or downgraded or the billing cycle is changed.
         */
        contractSwitched?: ContractSwitched;
        /**
         * Triggered when a subscription gets close to the end of its billing cycle.
         * The exact number of days is defined in the billing system.
         */
        nearEndOfPeriod?: SubscriptionNearEndOfPeriod;
        /**
         * Triggered when a subscription is updated and the change doesn't happen
         * immediately but at the end of the current billing cycle.
         */
        pendingChange?: SubscriptionPendingChange;
    }
    /** Triggered when a subscription is created. */
    interface SubscriptionCreated {
        /** Created subscription. */
        subscription?: Subscription;
        /** Metadata for the `created` event. */
        metadata?: Record<string, string>;
        /**
         * Subscription reactivation data.
         * A subscription can be reactivated for example if it was incorrectly canceled because of fraud and then reactivated
         * by the billing system
         */
        reactivationData?: ReactivationData;
    }
    /**
     * A subscription holds information about a Premium product that a Wix account
     * owner has purchased including details about the billing.
     */
    interface Subscription {
        /** ID of the subscription. */
        _id?: string;
        /** ID of the Wix account that purchased the subscription. */
        userId?: string;
        /**
         * ID of the [product](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/products/product-object)
         * for which the subscription was purchased.
         */
        productId?: string;
        /**
         * Date and time the subscription was created in
         * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
         * `YYYY-MM-DDThh:mm:ss.sssZ` format.
         */
        createdAt?: Date | null;
        /**
         * Date and time the subscription was last updated in
         * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
         * `YYYY-MM-DDThh:mm:ss.sssZ` format.
         */
        updatedAt?: Date | null;
        /**
         * ID of the metasite that the subscription is assigned to.
         * Available only when the subscription is assigned to a Wix site.
         * Subscriptions for account level products can't be assigned to a Wix site.
         */
        metaSiteId?: string | null;
        /** Information about the system that manages the subscription's billing. */
        billingReference?: BillingReference;
        /** Information about the billing cycle of the subscription. */
        cycle?: Cycle;
        /**
         * Subscription status.
         *
         * + `UNKNOWN`: Default status.
         * + `AUTO_RENEW_ON`: Subscription is active and automatically renews at the end of the current billing cycle.
         * + `AUTO_RENEW_OFF`: Subscription is active but expires at the end of the current billing cycle.
         * + `MANUAL_RECURRING`: Subscription is active and renews at the end of the current billing cycle, in case the customer takes an action related to the payment.
         * + `CANCELLED`: Subscription isn't active because it has been canceled.
         * + `TRANSFERRED`: Subscription isn't active because it has been transferred to a different account. A different active subscription was created for the target account.
         */
        status?: SubscriptionStatus;
        /**
         * Date and time the subscription was last transferred from one Wix account to
         * another in
         * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
         * `YYYY-MM-DDThh:mm:ss.sssZ` format.
         */
        transferredAt?: Date | null;
        /**
         * ID of the [product type](https://bo.wix.com/wix-docs/rest/premium/premium-product-catalog-v2/product-types/product-type-object)
         * that the product, for which the subscription was purchased, belongs to.
         */
        productTypeId?: string;
        /** Version number, which increments by 1 each time the subscription is updated. */
        version?: number;
        /**
         * Whether the subscription is active. Includes the statuses
         * `"AUTO_RENEW_ON"`, `"AUTO_RENEW_OFF"`, and `"MANUAL_RECURRING"`.
         */
        active?: boolean;
        /**
         * Date and time the subscription was originally created in
         * [UTC datetime](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
         * `YYYY-MM-DDThh:mm:ss.sssZ` format.
         * Differs from `createdAt` in case the subscription was originally created for a different Wix account and has been transferred.
         */
        originalCreationDate?: Date | null;
        /** Custom metadata about the subscription. */
        metadata?: Record<string, string>;
        /**
         * 2-letter country code in
         * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements)
         * format.
         */
        countryCode?: string | null;
    }
    interface BillingReference {
        /**
         * Name of the billing system that manages the subscription.
         *
         * + `"UNKNOWN"`: Default value.
         * + `"SBS"`: [Wix Billing](https://github.com/wix-p/premium-billing/tree/master/sbs).
         * + `"LICENSER"`:
         * + `"BASS"`: [Billing and Subscriptions System](https://dev.wix.com/docs/rest/internal-only/premium/subscriptions-by-billing-by-wix/introduction).
         * + `"RESELLER"`: [External Reseller](https://dev.wix.com/api/rest/account-level-apis/resellers/introduction).
         */
        providerName?: ProviderName;
        /** Current provider reference ID. */
        providerReferenceId?: string | null;
        /** Previous provider reference IDs. Used for when a subscription is extended, specifically for domains. */
        previousProviderReferenceIds?: string[];
    }
    enum ProviderName {
        UNKNOWN = "UNKNOWN",
        SBS = "SBS",
        LICENSER = "LICENSER",
        BASS = "BASS",
        RESELLER = "RESELLER",
        RECURRING_INVOICES = "RECURRING_INVOICES"
    }
    interface Cycle extends CycleCycleSelectorOneOf {
        /** repetitive interval */
        interval?: Interval;
        /** one time */
        oneTime?: OneTime;
    }
    /** @oneof */
    interface CycleCycleSelectorOneOf {
        /** repetitive interval */
        interval?: Interval;
        /** one time */
        oneTime?: OneTime;
    }
    interface Interval {
        /** interval unit of measure */
        unit?: IntervalUnit;
        /** number of interval */
        count?: number;
    }
    enum IntervalUnit {
        /** unknown interval unit */
        UNKNOWN = "UNKNOWN",
        /** day */
        DAY = "DAY",
        /** week */
        WEEK = "WEEK",
        /** month */
        MONTH = "MONTH",
        /** year */
        YEAR = "YEAR"
    }
    interface OneTime {
    }
    enum SubscriptionStatus {
        UNKNOWN = "UNKNOWN",
        AUTO_RENEW_ON = "AUTO_RENEW_ON",
        AUTO_RENEW_OFF = "AUTO_RENEW_OFF",
        MANUAL_RECURRING = "MANUAL_RECURRING",
        CANCELLED = "CANCELLED",
        TRANSFERRED = "TRANSFERRED"
    }
    /** Triggered when a subscription is reactivated. */
    interface ReactivationData {
        reactivationReason?: ReactivationReasonEnum;
        /**
         * In the event of reactivation after chargeback dispute, the subscription may be extended according to the
         * number of days it was inactive during the time of resolving the dispute
         */
        newEndOfPeriod?: Date | null;
        /** The original end date, before the inactive period. */
        oldEndOfPeriod?: Date | null;
        /** The difference in days between the new new_end_of_period and old_end_of_period */
        differenceInDays?: number | null;
    }
    /** Reason for subscription reactivation */
    enum ReactivationReasonEnum {
        UNKNOWN = "UNKNOWN",
        /**
         * Subscription was reactivated due to billing status change from CANCELED to ACTIVE, for example if it was incorrectly
         * canceled because of suspicion of fraud
         */
        BILLING_STATUS_CHANGE = "BILLING_STATUS_CHANGE",
        /** Subscription was reactivated after a chargeback dispute */
        REACTIVATED_AFTER_CHARGEBACK = "REACTIVATED_AFTER_CHARGEBACK"
    }
    /**
     * Triggered when a subscription is assigned to a Wix site, including the initial
     * assignment of a floating subscription or a re-assignement from a different site.
     */
    interface SubscriptionAssigned {
        /** Assigned subscription. */
        subscription?: Subscription;
        /** ID of the metasite that the subscription has been assigned to before the update. */
        previousMetaSiteId?: string | null;
    }
    /** Triggered when a subscription is canceled. */
    interface SubscriptionCancelled {
        /** Canceled subscription. */
        subscription?: Subscription;
        /** Details about the cancellation including who canceled the subscription and why. */
        cancellationDetails?: CancellationDetails;
        /**
         * Whether the subscription is canceled immediately or expires at the end of the current billing cycle.
         *
         * Default: `false`
         */
        immediateCancel?: boolean;
        /** Whether the subscription was canceled during the free trial period. */
        canceledInFreeTrial?: boolean;
    }
    /** Information about the cancellation flow including who canceled the subscription and why it was canceled. */
    interface CancellationDetails {
        /**
         * Cancellation code.
         *
         * Values supported for cancellations on behalf of the billing system: `-1`, `-2`, `-3`, `-4`, `-5`, `-6`, `-7`, `-8`.
         * For cancellations on behalf of the site owner or the service provider `cancellationCode`
         * is taken from the request of
         * [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
         *
         * + `-1`: The subscription has been cancelled by the billing system but none of the listed cancellation reasons applies.
         * + `-2`: There were payment problems.
         * + `-3`: There was a chargeback.
         * + `-4`: Customer support has canceled the subscription and issued a refund.
         * + `-5`: The site owner has changed their existing subscription.
         * + `-6`: The subscription has been transferred to a different Wix account.
         * + `-7`: The subscription has been canceled because the site owner hasn't manually authenticated the recurring payment during the subscription's grace period. For example, site owners must manually confirm recurring payments within 40 days when paying with boleto.
         * + `-8`: The Wix account that the subscription belonged to has been deleted.
         */
        cancellationCode?: number | null;
        /**
         * Cancellation reason. For cancellations on behalf of the site owner or the service provider `cancellationReason`
         * is taken from the request of
         * [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
         * For cancellations on behalf of the billing system `cancellationReason` is `null` or an empty string.
         */
        cancellationReason?: string | null;
        /**
         * Initiator of the cancellation. For `"USER_REQUESTED"` and `"APP_MANAGED"`,
         * `cancellationCode` and `cancellationReason` are taken from the request of
         * [Cancel Immediately](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately)
         * or [Cancel Immediately Offline](https://bo.wix.com/wix-docs/rest/premium/premium-subscriptions-manager/cancel-immediately-offline).
         * For `"PASSIVE"`, cancellations `cancellationCode` is automatically calculated and `cancellationReason`
         * is `null` or an empty string.
         *
         * + `"UNKNOWN`: Default value.
         * + `"USER_REQUESTED"`:  The Wix account owner has canceled the subscription.
         * + `"APP_MANAGED"`: The service provider has canceled the subscription.
         * + `"PASSIVE"`: The billing system has canceled the subscription. For example, in case of payment failure or fraud.
         */
        initiator?: Initiator;
    }
    enum Initiator {
        UNKNOWN = "UNKNOWN",
        USER_REQUESTED = "USER_REQUESTED",
        APP_MANAGED = "APP_MANAGED",
        PASSIVE = "PASSIVE"
    }
    /** Triggered when the subscription's auto renew is turned on. */
    interface SubscriptionAutoRenewTurnedOn {
        /** Subscription for which auto renew is turned on. */
        subscription?: Subscription;
        /**
         * Supported values: `USER`, `APP`.
         *
         * Information about who turned auto renew on.
         * + `"USER"`: The site owner who purchased the subscription has turned auto renew on.
         * + `"APP"`: The service provider has turned auto renew on.
         */
        initiator?: string | null;
    }
    /** Triggered when the subscription's auto renew is turned off. */
    interface SubscriptionAutoRenewTurnedOff {
        /** Subscription for which auto renew is turned off. */
        subscription?: Subscription;
        /** Details about the cancellation including who canceled the subscription and why. */
        cancellationDetails?: CancellationDetails;
        /**
         * Whether the subscription is immediately canceled or expires at the end of the current billing cycle.
         *
         * Default: `false`
         */
        immediateCancel?: boolean;
    }
    /**
     * Triggered when a subscription is unassigned from a Wix site and becomes
     * floating.
     */
    interface SubscriptionUnassigned {
        /** Unassigned subscription. */
        subscription?: Subscription;
        /** ID of the metasite that the subscription has been assigned to before the event. */
        previousMetaSiteId?: string;
        /**
         * Reason why the subscription is unassigned.
         *
         * + `"UNKNOWN"`: Default value.
         * + `"USER_REQUESTED"`: The Wix account owner has unassigned the subscription.
         * + `"REPLACED_BY_ANOTHER_SUBSCRIPTION"`: A different subscription that replaces this subscription is assigned to the site.
         */
        unassignReason?: UnassignReason;
    }
    enum UnassignReason {
        UNKNOWN = "UNKNOWN",
        USER_REQUESTED = "USER_REQUESTED",
        REPLACED_BY_ANOTHER_SUBSCRIPTION = "REPLACED_BY_ANOTHER_SUBSCRIPTION"
    }
    /**
     * Triggered when a subscription is transferred from one Wix account to another.
     * A transfer includes cancelling the original subscription and creating a new
     * subscription for the target account. The event returns both the original
     * and the new subscription.
     */
    interface SubscriptionTransferred {
        /** Original subscription that was canceled for the transfer. */
        originSubscription?: Subscription;
        /** Newly created subscription for the target account. */
        targetSubscription?: Subscription;
    }
    /** Triggered when a recurring charge succeeds for a subscription. */
    interface RecurringChargeSucceeded {
        /** Subscription for which the recurring charge has succeeded. */
        subscription?: Subscription;
        /** Indication that there was a successful charge at the end of the free trial period */
        freeTrialPeriodEnd?: boolean;
    }
    /**
     * Triggered when a subscription was updated including when its product has been
     * up- or downgraded or the billing cycle is changed.
     */
    interface ContractSwitched {
        /** Updated subscription. */
        subscription?: Subscription;
        /** Billing cycle before the update. */
        previousCycle?: Cycle;
        /** ID of the product belonging to the subscription before the update. */
        previousProductId?: string;
        /** ID of the product type that the subscription's original product belonged to before the update. */
        previousProductTypeId?: string;
        /**
         * Update type. __Note__: Doesn't include information about a product adjustment.
         * For that purpose, see `productAdjustment`.
         *
         * + `"NOT_APPLICABLE"`: Default value.
         * + `"ADDITIONAL_QUANTITY"`: An increased usage quota is added to the subscription. For example, a second mailbox is added to a subscription that previously included a single mailbox.
         * + `"CREDIT_UNUSED_PERIOD"`: The subscription is upgraded and the new price is less than the regular price. The new price applies to every billing cycle, not just the first cycle.
         * + `"REFUND_PRICE_DIFF"`: Not implemented.
         * + `"ADJUST_PERIOD_END"`: Not implemented.
         * + `"DOWNGRADE_GRACE_PERIOD"`: For downgrades during the grace period. In this situation, the site owner hasn’t paid yet and must immediately pay for the downgraded subscription.
         * + `"FULL_AMOUNT_PERIOD"`: For upgrades in which the site owner retains unused benefits. For example, site owners upgrading a Facebook Ads subscription retain their unused FB Ads credit. The unused credit is added to the new credit.
         * + `"END_OF_PERIOD"`: The subscription's billing current cycle is extended because of a downgrade.
         * + `"PENDING_CHANGES"`: The subscription's billing is updated, but the change doesn't apply immediately. Instead, the update becomes effective at the end of current billing cycle.
         * + `"DOWNGRADE_RENEWAL"`: The subscription is downgraded because of a declined payment. This prevents subscriptions from churning.
         */
        contractSwitchType?: ContractSwitchType;
        /**
         * ID of the metasite the subscription has been assigned to previously.
         * Available only in case the subscription is assigned to a different site.
         */
        previousMetaSiteId?: string | null;
        /**
         * Update reason.
         *
         * + `"PRICE_INCREASE"`: The subscription's price has been increased.
         * + `"EXTERNAL_PROVIDER_TRIGGER"`: Any reason other than a price increase.
         */
        contractSwitchReason?: ContractSwitchReason;
        /** Information about the price update. Available only for updates with a price increase. */
        productPriceIncreaseData?: ProductPriceIncreaseData;
        /**
         * Information about a product adjustment. For example, a downgrade.
         * __Note__: This isn't the same as `contractSwitchType`.
         *
         * + `NOT_APPLICABLE`: There is no information about whether the product has been up- or downgraded.
         * + `DOWNGRADE`: The product has been downgraded.
         */
        productAdjustment?: ProductAdjustment;
    }
    /** Copied from SBS */
    enum ContractSwitchType {
        NOT_APPLICABLE = "NOT_APPLICABLE",
        ADDITIONAL_QUANTITY = "ADDITIONAL_QUANTITY",
        CREDIT_UNUSED_PERIOD = "CREDIT_UNUSED_PERIOD",
        REFUND_PRICE_DIFF = "REFUND_PRICE_DIFF",
        ADJUST_PERIOD_END = "ADJUST_PERIOD_END",
        DOWNGRADE_GRACE_PERIOD = "DOWNGRADE_GRACE_PERIOD",
        FULL_AMOUNT_PERIOD = "FULL_AMOUNT_PERIOD",
        END_OF_PERIOD = "END_OF_PERIOD",
        PENDING_CHANGES = "PENDING_CHANGES",
        DOWNGRADE_RENEWAL = "DOWNGRADE_RENEWAL"
    }
    enum ContractSwitchReason {
        EXTERNAL_PROVIDER_TRIGGER = "EXTERNAL_PROVIDER_TRIGGER",
        PRICE_INCREASE = "PRICE_INCREASE"
    }
    /** Triggered when a subscription's price is increased. */
    interface ProductPriceIncreaseData {
        /** Price of the subscription before the update. */
        previousPrice?: string | null;
        /** A value that is used in order to select the correct email template to send the user regarding the price increase. */
        emailTemplateSelector?: string | null;
        /** Used to differentiate between migration segments. Does not have to be unique per segment. */
        segmentName?: string | null;
        /** Used to determine how the price increase was triggered. */
        priceIncreaseTrigger?: PriceIncreaseTrigger;
    }
    /** Reason for Price Increase Trigger */
    enum PriceIncreaseTrigger {
        NEAR_RENEWAL = "NEAR_RENEWAL",
        RECURRING_SUCCESS = "RECURRING_SUCCESS",
        MANUAL = "MANUAL"
    }
    /** Triggered when a subscription's product is adusted. */
    enum ProductAdjustment {
        /** flag to show that the ContractSwitchedEvent is not applicable / needed */
        NOT_APPLICABLE = "NOT_APPLICABLE",
        /** flag to show that the ContractSwitchedEvent is a Downgrade */
        DOWNGRADE = "DOWNGRADE"
    }
    /**
     * Triggered when a subscription gets close to the end of its billing cycle.
     * The exact number of days is defined in the billing system.
     */
    interface SubscriptionNearEndOfPeriod {
        /** Subscription that got close to the end of its billing cycle. */
        subscription?: Subscription;
        /** Whether the subscription is within the free trial period. */
        inFreeTrial?: boolean;
    }
    /**
     * Triggered when a subscription is updated and the change doesn't happen
     * immediately but at the end of the current billing cycle.
     */
    interface SubscriptionPendingChange {
        /** Subscription for which a pending update is triggered. */
        subscription?: Subscription;
    }
    interface ContactSyncRequest {
        contactIds?: string[];
        contactId?: string | null;
    }
    interface BulkUpsertAccountsRequest {
        /** List of contactIds + points to either insert as new loyalty accounts, or update if contacts already exist as loyalty accounts */
        accounts: AccountToUpsert[];
        /**
         * If true, the upserted accounts are returned in response
         * @deprecated If true, the upserted accounts are returned in response
         * @targetRemovalDate 2024-02-01
         */
        returnAccounts?: boolean;
        /** Description of the action */
        description?: string | null;
    }
    interface AccountToUpsert {
        contactId?: string;
        pointsBalance?: number;
    }
    interface BulkUpsertAccountsResponse {
        /** Loyalty accounts that were created or updated */
        result?: BulkAccountResult[];
        /** Numbers of successes and failures */
        metadata?: BulkActionMetadata;
    }
    interface BulkAccountResult {
        /** The created/updated account is returned if specified so in request message. */
        account?: LoyaltyAccount;
        /** LoyaltyAccount metadata. */
        metadata?: ItemMetadata;
    }
    interface ItemMetadata {
        /** Item ID. Should always be available, unless it's impossible (for example, when failing to create an item). */
        _id?: string | null;
        /** Index of the item within the request array. Allows for correlation between request and response items. */
        originalIndex?: number;
        /** Whether the requested action was successful for this item. When `false`, the `error` field is populated. */
        success?: boolean;
        /** Details about the error in case of failure. */
        error?: ApplicationError;
    }
    interface ApplicationError {
        /** Error code. */
        code?: string;
        /** Description of the error. */
        description?: string;
        /** Data related to the error. */
        data?: Record<string, any> | null;
    }
    interface BulkActionMetadata {
        /** Number of items that were successfully processed. */
        totalSuccesses?: number;
        /** Number of items that couldn't be processed. */
        totalFailures?: number;
        /** Number of failures without details because detailed failure threshold was exceeded. */
        undetailedFailures?: number;
    }
    interface SetMissingMemberIdRequest {
        /** ID of the account to retrieve. */
        accountId: string;
    }
    interface SetMissingMemberIdResponse {
        /** Loyalty account. */
        account?: LoyaltyAccount;
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
     * Creates a loyalty account for one of a site's contacts.
     *
     * The `createAccount()` function returns a Promise that resolves to the new loyalty account when it is created.
     *
     * To create a new loyalty account, the customer must first be a site contact with a contact ID. The site must also have an active loyalty program before loyalty accounts can be created.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can create a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
     * @public
     * @requiredField contactId
     * @param contactId - Contact ID for a Wix site contact. See the [Contacts API](wix-crm-backend/contacts) to learn more.
     * @permissionId LOYALTY.MANAGE_ACCOUNTS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function createAccount(contactId: string): Promise<CreateAccountResponse>;
    /**
     * Adds points to a loyalty account.
     *
     * The `earnPoints()` function returns a Promise that resolves to the updated loyalty account.
     *
     * Only a positive amount can be added using the `earnPoints()` function, to manually adjust an account's balance for a negative amount, use [`adjustPoints()`](wix-loyalty-v2/accounts/adjustpoints).
     *
     * The `earnPoints()` function allows customers to manually earn points to their loyalty accounts. To use this function you must include an `appId` and an `idempotencyKey`. Any string can be set as the `appId` or `idempotencyKey`. In contrast to when an account earns points through an action taken on your site, the `appId` automatically sets to the source app that generates the points. The transaction `type` is `"EARN"` for points earned this way.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can earn loyalty points. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
     * @param accountId - Loyalty account ID.
     * @public
     * @requiredField accountId
     * @requiredField options.appId
     * @requiredField options.idempotencyKey
     * @param options - Earn points info.
     * @permissionId LOYALTY.MANAGE_ACCOUNTS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function earnPoints(accountId: string, options?: EarnPointsOptions): Promise<EarnPointsResponse>;
    interface EarnPointsOptions extends EarnPointsRequestActivityDetailsOneOf {
        /**
         * Amount of points to earn. Must be a positive, whole number.
         *
         * Min: `1`
         *
         * Max: `9999999`
         */
        amount?: number;
        /**
         * Description of how the points were earned.
         *
         * Max: 100 characters
         */
        description?: string;
        /**
         * ID of the app that initiated the transaction.
         *
         * If points were earned manually, then the `appId` is the Loyalty app's
         * `wixAppId` of `553c79f3-5625-4f38-b14b-ef7c0d1e87df`. If points were earned in an automatic event,
         * then the `appId` is from that automation's `sourceAppId`.
         */
        appId: string;
        /**
         * Unique string identifier generated by the app. Wix uses this identifier to recognize subsequent retries of the same request.
         *
         * Please use `GUID` format.
         */
        idempotencyKey: string;
        /**
         * Activity type.
         *
         * If points were earned through automation it should be set to trigger key.
         */
        activityType?: string | null;
        /** Order id which was source of this transaction. */
        orderId?: string | null;
        /** Followed social media details. */
        followedSocialMedia?: FollowedSocialMedia;
    }
    /**
     * Adjusts the point balance of a loyalty account.
     *
     * The `adjustPoints()` function returns a Promise that resolves to the updated loyalty account.
     *
     * To adjust the points balance of an account you must include an `accountId`, a `revision` number, and the adjustment to make. You can also leave a description to explain the reason for the points adjustment.
     *
     * There are two ways to adjust the points of a loyalty account:
     * - `balance` allows you to set the total points balance to this new amount. The transaction `type` will return as `"ADJUST"`.
     * - `amount` allows you to alter the points balance by this amount. This amount can be a positive number to increase the points balance or a negative number to decrease the balance. The transaction type will return as `"GIVE"`.
     *
     * An account may not be adjusted to a negative balance. If you pass values in both the `balance` and the `amount` parameters then the `balance` adjustment takes effect and the `amount` adjustment is ignored.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can manually adjust points in a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
     * @param accountId - Loyalty account ID.
     * @public
     * @requiredField accountId
     * @param options - Options to use when adjusting points.
     * @permissionId LOYALTY.MANAGE_ACCOUNTS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function adjustPoints(accountId: string, options?: AdjustPointsOptions): Promise<AdjustPointsResponse>;
    interface AdjustPointsOptions extends AdjustPointsRequestTypeOneOf {
        /** Description to explain the reason for the points adjustment. */
        description?: string | null;
        /**
         * Sets the account's point balance to this amount. Must be a positive, whole number or zero.
         *
         * The net difference between this new balance and the previous balance will be reflected in the `adjusted` field of the customer's account.
         *
         * Min: `0`
         *
         * Max: `999999999`
         */
        balance?: number;
        /**
         * Adjusts the account's point balance by this amount. Must be a whole number with a maximum of 7 digits.
         * The amount can be negative, but cannot be `0`.
         *
         * Min: `-9999999`
         *
         * Max: `9999999`
         */
        amount?: number;
        /**
         * Each time the loyalty account is updated, `revision` increments by 1.
         *
         * The current `revision` must be passed when adjusting points in the loyalty account. This
         * ensures you're working with the latest version of the loyalty account and prevents unintended overwrites.
         */
        revision?: string;
    }
    interface RedeemPointsOptions {
        /** Number of times the given reward will be redeemed. Must be a positive whole number. */
        count?: number;
        /**
         * Revision number, which increments by 1 each time points are redeemed.
         * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
         */
        revision?: string;
        /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
        referenceEntityId?: string | null;
    }
    interface RedeemDeterminedAmountOfPointsOptions {
        /** Number of points to be redeemed off the account. */
        points?: number;
        /**
         * Revision number, which increments by 1 each time points are redeemed.
         * To prevent conflicting changes, the existing `revision` must be used when redeeming points.
         */
        revision?: string;
        /** Id of the entity that is being redeemed (e.g. orderId for order discount, couponId for coupon reward). */
        referenceEntityId?: string | null;
    }
    /**
     * Retrieves an account using the loyalty account ID.
     *
     * The `getAccount()` function returns a Promise that resolves to the specified loyalty account when it is retrieved.
     *
     * You can also get an account using a secondary ID, such as a contact ID or a member ID with the [`getAccountBySecondaryId()`](wix-loyalty-v2/accounts/getaccountbysecondaryid) function.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
     * @param _id - ID of the account to retrieve.
     * @public
     * @requiredField _id
     * @permissionId LOYALTY.READ_ACCOUNTS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Retrieved loyalty account.
     */
    function getAccount(_id: string): Promise<LoyaltyAccount>;
    /**
     * Creates a query to retrieve a list of accounts.
     *
     * The `queryLoyaltyAccounts()` function builds a query to retrieve a list of events and returns a `LoyaltyAccountsQueryBuilder` object.
     *
     * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
     *
     * You can refine the query by chaining `LoyaltyAccountsQueryBuilder` functions onto the query. `LoyaltyAccountsQueryBuilder` functions enable you to sort, filter, and control the results `queryLoyaltyAccounts()` returns.
     *
     * `queryLoyaltyAccounts()` runs with these `LoyaltyAccountsQueryBuilder` defaults, which you can override:
     *
     * - skip(0)
     * - limit(50)
     * - descending("_createdDate")
     *
     * The functions that are chained to `queryLoyaltyAccounts()` are applied in the order they're called. For example, if you apply ascending('points.balance') and then descending('points.earned'), the results are sorted first by the balance, and then, if there are multiple results with the same balance, the items are sorted by earned points.
     * @public
     * @documentationMaturity preview
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @permissionId LOYALTY.READ_ACCOUNTS
     * @applicableIdentity APP
     * @adminMethod
     */
    function queryLoyaltyAccounts(): LoyaltyAccountsQueryBuilder;
    interface QueryCursorResult {
        cursors: Cursors;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface LoyaltyAccountsQueryResult extends QueryCursorResult {
        items: LoyaltyAccount[];
        query: LoyaltyAccountsQueryBuilder;
        next: () => Promise<LoyaltyAccountsQueryResult>;
        prev: () => Promise<LoyaltyAccountsQueryResult>;
    }
    interface LoyaltyAccountsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        eq: (propertyName: "_id" | "contactId" | "memberId" | "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "tier.id" | "contact.id" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any) => LoyaltyAccountsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ne: (propertyName: "_id" | "contactId" | "memberId" | "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "tier.id" | "contact.id" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any) => LoyaltyAccountsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        ge: (propertyName: "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any) => LoyaltyAccountsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        gt: (propertyName: "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any) => LoyaltyAccountsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        le: (propertyName: "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any) => LoyaltyAccountsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         * @documentationMaturity preview
         */
        lt: (propertyName: "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any) => LoyaltyAccountsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `string`.
         * @param string - String to compare against. Case-insensitive.
         * @documentationMaturity preview
         */
        startsWith: (propertyName: "_id" | "contactId" | "memberId" | "tier.id" | "contact.id", value: string) => LoyaltyAccountsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `values`.
         * @param values - List of values to compare against.
         * @documentationMaturity preview
         */
        hasSome: (propertyName: "_id" | "contactId" | "memberId" | "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "tier.id" | "contact.id" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any[]) => LoyaltyAccountsQueryBuilder;
        /** @documentationMaturity preview */
        in: (propertyName: "_id" | "contactId" | "memberId" | "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "tier.id" | "contact.id" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: any) => LoyaltyAccountsQueryBuilder;
        /** @documentationMaturity preview */
        exists: (propertyName: "_id" | "contactId" | "memberId" | "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "tier.id" | "contact.id" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount", value: boolean) => LoyaltyAccountsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        ascending: (...propertyNames: Array<"_id" | "contactId" | "memberId" | "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "tier.id" | "contact.id" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount">) => LoyaltyAccountsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
         * @documentationMaturity preview
         */
        descending: (...propertyNames: Array<"_id" | "contactId" | "memberId" | "points.balance" | "points.earned" | "points.adjusted" | "points.redeemed" | "points.expired" | "_createdDate" | "lastActivityDate" | "tier.id" | "contact.id" | "pointsExpiration.expirationDate" | "pointsExpiration.expiringPointsAmount">) => LoyaltyAccountsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
         * @documentationMaturity preview
         */
        limit: (limit: number) => LoyaltyAccountsQueryBuilder;
        /** @param cursor - A pointer to specific record
         * @documentationMaturity preview
         */
        skipTo: (cursor: string) => LoyaltyAccountsQueryBuilder;
        /** @documentationMaturity preview */
        find: () => Promise<LoyaltyAccountsQueryResult>;
    }
    interface ListUserAccountsOptions {
        /** Number of items to load. Minimum `1`, maximum `50`. */
        limit?: number | null;
        /** Number of items to skip in the current sort order. */
        offset?: number | null;
    }
    /**
     * Retrieves the total amount of points earned, redeemed, and adjusted for the entire loyalty program.
     *
     * The `getProgramTotals()` function returns a Promise that resolves to the combined total points for all loyalty accounts in the program.
     *
     * The `balance` is the current total of points outstanding, while the `earned`, `adjusted`, and `redeemed` amounts are the all-time accumulated amounts. The totals include the amounts for all loyalty accounts.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve the loyalty program totals. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
     * @public
     * @permissionId LOYALTY.READ_ACCOUNTS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function getProgramTotals(): Promise<GetProgramTotalsResponse>;
    /**
     * Retrieves the currently logged-in member's account.
     * @public
     * @permissionId LOYALTY.READ_OWN_ACCOUNT
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @applicableIdentity MEMBER
     */
    function getCurrentMemberAccount(): Promise<GetCurrentMemberAccountResponse>;
    /**
     * Retrieves the loyalty account of the specified site contact or member.
     *
     * The `getAccountBySecondaryId()` function returns a Promise that resolves to the specified loyalty account when it is retrieved.
     *
     * This function gets a loyalty account using either a customer's contact ID or member ID. You can also get an account using the loyalty account ID with the [`getAccount()`](wix-loyalty-v2/accounts/getaccount) function.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve a loyalty account. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
     * @public
     * @param options - ID of the customer to retrieve loyalty account for.
     * @permissionId LOYALTY.READ_ACCOUNTS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function getAccountBySecondaryId(options?: GetAccountBySecondaryIdOptions): Promise<GetAccountBySecondaryIdResponse>;
    interface GetAccountBySecondaryIdOptions extends GetAccountBySecondaryIdRequestIdOneOf {
        /** Account owner's contact ID. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
        contactId?: string;
        /** Account owner's member ID. See the [Members API](wix-members-backend/introduction) to learn more. */
        memberId?: string;
    }
    /**
     * > **Deprecation Notice**
     * >
     * > **This method has been replaced with [Query Loyalty Accounts](https://dev.wix.com/docs/sdk/backend-modules/loyalty/accounts/query-loyalty-accounts) and will be removed on June 30, 2025. If your app uses this method, we recommend updating your code as soon as possible.**
     *
     * Retrieves a list of loyalty accounts, given the provided filters.
     *
     * The `listAccounts()` function returns a Promise that resolves to a list of loyalty accounts.
     *
     * You can retrieve selected loyalty accounts with an array of `contactIds` or retrieve a list of all of a site's loyalty accounts
     *     with an empty request parameter. Use the `cursorPaging` parameters to limit how many items load at a time.
     *
     * >**Note:** Only visitors with **Manage Loyalty** [permissions](https://support.wix.com/en/article/roles-permissions-accessing-roles-permissions) can retrieve loyalty accounts. <!--You can override the permissions with the `wix-auth` [`elevate()`](wix-auth/elevate) function.-->
     * @public
     * @param options - Options to use when retrieving a list of loyalty accounts.
     * @permissionId LOYALTY.READ_ACCOUNTS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @deprecated
     * @replacedBy QueryLoyaltyAccounts
     * @targetRemovalDate 2025-06-01
     */
    function listAccounts(options?: ListAccountsOptions): Promise<ListAccountsResponse>;
    interface ListAccountsOptions {
        /** List of contact IDs. See the [Contacts API](wix-crm-backend/contacts) to learn more. */
        contactIds?: string[];
        /** Pagination options. */
        cursorPaging?: CursorPaging;
    }
    /**
     * Retrieves a list of accounts, given the provided filters and search capabilities.
     * Search is executed on the account's name and email values.
     * @public
     * @permissionId LOYALTY.READ_ACCOUNTS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Accounts found through provided search capabilities, along with paging and aggregation data of the results.
     */
    function searchAccounts(options?: SearchAccountsOptions): Promise<SearchAccountsResponse>;
    interface SearchAccountsOptions {
        /** Search options. */
        search?: CursorSearch;
    }
    interface ExportAccountsOptions {
        query?: QueryV2;
    }
    /**
     * Retrieves the count of found accounts, given the provided filters and search capabilities.
     *
     * This endpoint can help find the total count of accounts when used alongside [Search Accounts](https://dev.wix.com/docs/rest/crm/loyalty-program/accounts/search-accounts).
     * @public
     * @permissionId LOYALTY.READ_ACCOUNTS
     * @permissionScope Read Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.READ-LOYALTY
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     * @returns Count of accounts found for given search query
     */
    function countAccounts(options?: CountAccountsOptions): Promise<CountAccountsResponse>;
    interface CountAccountsOptions {
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Free text to match in searchable fields. */
        search?: SearchDetails;
    }
    /**
     * Updates points balance of multiple accounts.
     * Depending on the BulkAdjustPointsRequest.type:
     * amount - provided amount of points is appended to the accounts balance
     * balance - accounts balance is set to the provided amount
     *
     * Returns id of the asyncInfra job that takes care of the points adjustment.
     * @public
     * @documentationMaturity preview
     * @permissionId LOYALTY.MANAGE_ACCOUNTS
     * @permissionScope Manage Loyalty
     * @permissionScopeId SCOPE.DC-LOYALTY.MANAGE-LOYALTY
     * @applicableIdentity APP
     * @adminMethod
     */
    function bulkAdjustPoints(options?: BulkAdjustPointsOptions): Promise<BulkAdjustPointsResponse>;
    interface BulkAdjustPointsOptions extends BulkAdjustPointsRequestTypeOneOf {
        search?: CursorSearch;
        balance?: number;
        amount?: number;
    }
    interface BulkUpsertAccountsOptions {
        /**
         * If true, the upserted accounts are returned in response
         * @deprecated If true, the upserted accounts are returned in response
         * @targetRemovalDate 2024-02-01
         */
        returnAccounts?: boolean;
        /** Description of the action */
        description?: string | null;
    }
    type loyaltyV1AccountAccounts_universal_d_LoyaltyAccount = LoyaltyAccount;
    type loyaltyV1AccountAccounts_universal_d_Points = Points;
    type loyaltyV1AccountAccounts_universal_d_Tier = Tier;
    type loyaltyV1AccountAccounts_universal_d_Contact = Contact;
    type loyaltyV1AccountAccounts_universal_d_Image = Image;
    type loyaltyV1AccountAccounts_universal_d_PointsExpiration = PointsExpiration;
    type loyaltyV1AccountAccounts_universal_d_RewardAvailabilityUpdated = RewardAvailabilityUpdated;
    type loyaltyV1AccountAccounts_universal_d_UpdateTrigger = UpdateTrigger;
    const loyaltyV1AccountAccounts_universal_d_UpdateTrigger: typeof UpdateTrigger;
    type loyaltyV1AccountAccounts_universal_d_CreateAccountRequest = CreateAccountRequest;
    type loyaltyV1AccountAccounts_universal_d_CreateAccountResponse = CreateAccountResponse;
    type loyaltyV1AccountAccounts_universal_d_EarnPointsRequest = EarnPointsRequest;
    type loyaltyV1AccountAccounts_universal_d_EarnPointsRequestActivityDetailsOneOf = EarnPointsRequestActivityDetailsOneOf;
    type loyaltyV1AccountAccounts_universal_d_FollowedSocialMedia = FollowedSocialMedia;
    type loyaltyV1AccountAccounts_universal_d_EarnPointsResponse = EarnPointsResponse;
    type loyaltyV1AccountAccounts_universal_d_PointsUpdated = PointsUpdated;
    type loyaltyV1AccountAccounts_universal_d_FirstTransaction = FirstTransaction;
    type loyaltyV1AccountAccounts_universal_d_AdjustPointsRequest = AdjustPointsRequest;
    type loyaltyV1AccountAccounts_universal_d_AdjustPointsRequestTypeOneOf = AdjustPointsRequestTypeOneOf;
    type loyaltyV1AccountAccounts_universal_d_AdjustPointsResponse = AdjustPointsResponse;
    type loyaltyV1AccountAccounts_universal_d_RedeemPointsRequest = RedeemPointsRequest;
    type loyaltyV1AccountAccounts_universal_d_RedeemPointsResponse = RedeemPointsResponse;
    type loyaltyV1AccountAccounts_universal_d_RedeemDeterminedAmountOfPointsRequest = RedeemDeterminedAmountOfPointsRequest;
    type loyaltyV1AccountAccounts_universal_d_RedeemDeterminedAmountOfPointsResponse = RedeemDeterminedAmountOfPointsResponse;
    type loyaltyV1AccountAccounts_universal_d_RefundTransactionRequest = RefundTransactionRequest;
    type loyaltyV1AccountAccounts_universal_d_RefundTransactionResponse = RefundTransactionResponse;
    type loyaltyV1AccountAccounts_universal_d_GetAccountRequest = GetAccountRequest;
    type loyaltyV1AccountAccounts_universal_d_GetAccountResponse = GetAccountResponse;
    type loyaltyV1AccountAccounts_universal_d_QueryLoyaltyAccountsRequest = QueryLoyaltyAccountsRequest;
    type loyaltyV1AccountAccounts_universal_d_CursorQuery = CursorQuery;
    type loyaltyV1AccountAccounts_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
    type loyaltyV1AccountAccounts_universal_d_Sorting = Sorting;
    type loyaltyV1AccountAccounts_universal_d_SortOrder = SortOrder;
    const loyaltyV1AccountAccounts_universal_d_SortOrder: typeof SortOrder;
    type loyaltyV1AccountAccounts_universal_d_CursorPaging = CursorPaging;
    type loyaltyV1AccountAccounts_universal_d_QueryLoyaltyAccountsResponse = QueryLoyaltyAccountsResponse;
    type loyaltyV1AccountAccounts_universal_d_CursorPagingMetadata = CursorPagingMetadata;
    type loyaltyV1AccountAccounts_universal_d_Cursors = Cursors;
    type loyaltyV1AccountAccounts_universal_d_ListUserAccountsRequest = ListUserAccountsRequest;
    type loyaltyV1AccountAccounts_universal_d_ListUserAccountsResponse = ListUserAccountsResponse;
    type loyaltyV1AccountAccounts_universal_d_LoyaltyAccountForMetaSite = LoyaltyAccountForMetaSite;
    type loyaltyV1AccountAccounts_universal_d_GetProgramTotalsRequest = GetProgramTotalsRequest;
    type loyaltyV1AccountAccounts_universal_d_GetProgramTotalsResponse = GetProgramTotalsResponse;
    type loyaltyV1AccountAccounts_universal_d_TierTotal = TierTotal;
    type loyaltyV1AccountAccounts_universal_d_GetCurrentMemberAccountRequest = GetCurrentMemberAccountRequest;
    type loyaltyV1AccountAccounts_universal_d_GetCurrentMemberAccountResponse = GetCurrentMemberAccountResponse;
    type loyaltyV1AccountAccounts_universal_d_GetMyAccountRequest = GetMyAccountRequest;
    type loyaltyV1AccountAccounts_universal_d_GetMyAccountResponse = GetMyAccountResponse;
    type loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdRequest = GetAccountBySecondaryIdRequest;
    type loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdRequestIdOneOf = GetAccountBySecondaryIdRequestIdOneOf;
    type loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdResponse = GetAccountBySecondaryIdResponse;
    type loyaltyV1AccountAccounts_universal_d_ListAccountsRequest = ListAccountsRequest;
    type loyaltyV1AccountAccounts_universal_d_ListAccountsResponse = ListAccountsResponse;
    type loyaltyV1AccountAccounts_universal_d_PagingMetadataV2 = PagingMetadataV2;
    type loyaltyV1AccountAccounts_universal_d_SearchAccountsRequest = SearchAccountsRequest;
    type loyaltyV1AccountAccounts_universal_d_CursorSearch = CursorSearch;
    type loyaltyV1AccountAccounts_universal_d_CursorSearchPagingMethodOneOf = CursorSearchPagingMethodOneOf;
    type loyaltyV1AccountAccounts_universal_d_Aggregation = Aggregation;
    type loyaltyV1AccountAccounts_universal_d_AggregationKindOneOf = AggregationKindOneOf;
    type loyaltyV1AccountAccounts_universal_d_RangeBucket = RangeBucket;
    type loyaltyV1AccountAccounts_universal_d_SortType = SortType;
    const loyaltyV1AccountAccounts_universal_d_SortType: typeof SortType;
    type loyaltyV1AccountAccounts_universal_d_SortDirection = SortDirection;
    const loyaltyV1AccountAccounts_universal_d_SortDirection: typeof SortDirection;
    type loyaltyV1AccountAccounts_universal_d_MissingValues = MissingValues;
    const loyaltyV1AccountAccounts_universal_d_MissingValues: typeof MissingValues;
    type loyaltyV1AccountAccounts_universal_d_IncludeMissingValuesOptions = IncludeMissingValuesOptions;
    type loyaltyV1AccountAccounts_universal_d_ScalarType = ScalarType;
    const loyaltyV1AccountAccounts_universal_d_ScalarType: typeof ScalarType;
    type loyaltyV1AccountAccounts_universal_d_ValueAggregation = ValueAggregation;
    type loyaltyV1AccountAccounts_universal_d_ValueAggregationOptionsOneOf = ValueAggregationOptionsOneOf;
    type loyaltyV1AccountAccounts_universal_d_NestedAggregationType = NestedAggregationType;
    const loyaltyV1AccountAccounts_universal_d_NestedAggregationType: typeof NestedAggregationType;
    type loyaltyV1AccountAccounts_universal_d_RangeAggregation = RangeAggregation;
    type loyaltyV1AccountAccounts_universal_d_ScalarAggregation = ScalarAggregation;
    type loyaltyV1AccountAccounts_universal_d_DateHistogramAggregation = DateHistogramAggregation;
    type loyaltyV1AccountAccounts_universal_d_DateHistogramAggregationInterval = DateHistogramAggregationInterval;
    const loyaltyV1AccountAccounts_universal_d_DateHistogramAggregationInterval: typeof DateHistogramAggregationInterval;
    type loyaltyV1AccountAccounts_universal_d_NestedAggregationItem = NestedAggregationItem;
    type loyaltyV1AccountAccounts_universal_d_NestedAggregationItemKindOneOf = NestedAggregationItemKindOneOf;
    type loyaltyV1AccountAccounts_universal_d_AggregationType = AggregationType;
    const loyaltyV1AccountAccounts_universal_d_AggregationType: typeof AggregationType;
    type loyaltyV1AccountAccounts_universal_d_NestedAggregation = NestedAggregation;
    type loyaltyV1AccountAccounts_universal_d_GroupByAggregation = GroupByAggregation;
    type loyaltyV1AccountAccounts_universal_d_GroupByAggregationKindOneOf = GroupByAggregationKindOneOf;
    type loyaltyV1AccountAccounts_universal_d_SearchDetails = SearchDetails;
    type loyaltyV1AccountAccounts_universal_d_Mode = Mode;
    const loyaltyV1AccountAccounts_universal_d_Mode: typeof Mode;
    type loyaltyV1AccountAccounts_universal_d_SearchAccountsResponse = SearchAccountsResponse;
    type loyaltyV1AccountAccounts_universal_d_AggregationData = AggregationData;
    type loyaltyV1AccountAccounts_universal_d_ValueAggregationResult = ValueAggregationResult;
    type loyaltyV1AccountAccounts_universal_d_RangeAggregationResult = RangeAggregationResult;
    type loyaltyV1AccountAccounts_universal_d_NestedAggregationResults = NestedAggregationResults;
    type loyaltyV1AccountAccounts_universal_d_NestedAggregationResultsResultOneOf = NestedAggregationResultsResultOneOf;
    type loyaltyV1AccountAccounts_universal_d_ValueResults = ValueResults;
    type loyaltyV1AccountAccounts_universal_d_RangeResults = RangeResults;
    type loyaltyV1AccountAccounts_universal_d_AggregationResultsScalarResult = AggregationResultsScalarResult;
    type loyaltyV1AccountAccounts_universal_d_NestedValueAggregationResult = NestedValueAggregationResult;
    type loyaltyV1AccountAccounts_universal_d_ValueResult = ValueResult;
    type loyaltyV1AccountAccounts_universal_d_RangeResult = RangeResult;
    type loyaltyV1AccountAccounts_universal_d_ScalarResult = ScalarResult;
    type loyaltyV1AccountAccounts_universal_d_NestedResultValue = NestedResultValue;
    type loyaltyV1AccountAccounts_universal_d_NestedResultValueResultOneOf = NestedResultValueResultOneOf;
    type loyaltyV1AccountAccounts_universal_d_Results = Results;
    type loyaltyV1AccountAccounts_universal_d_DateHistogramResult = DateHistogramResult;
    type loyaltyV1AccountAccounts_universal_d_GroupByValueResults = GroupByValueResults;
    type loyaltyV1AccountAccounts_universal_d_DateHistogramResults = DateHistogramResults;
    type loyaltyV1AccountAccounts_universal_d_NestedResults = NestedResults;
    type loyaltyV1AccountAccounts_universal_d_AggregationResults = AggregationResults;
    type loyaltyV1AccountAccounts_universal_d_AggregationResultsResultOneOf = AggregationResultsResultOneOf;
    type loyaltyV1AccountAccounts_universal_d_ExportAccountsRequest = ExportAccountsRequest;
    type loyaltyV1AccountAccounts_universal_d_QueryV2 = QueryV2;
    type loyaltyV1AccountAccounts_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
    type loyaltyV1AccountAccounts_universal_d_Paging = Paging;
    type loyaltyV1AccountAccounts_universal_d_ExportAccountsResponse = ExportAccountsResponse;
    type loyaltyV1AccountAccounts_universal_d_CountAccountsRequest = CountAccountsRequest;
    type loyaltyV1AccountAccounts_universal_d_CountAccountsResponse = CountAccountsResponse;
    type loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsRequest = BulkAdjustPointsRequest;
    type loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsRequestTypeOneOf = BulkAdjustPointsRequestTypeOneOf;
    type loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsResponse = BulkAdjustPointsResponse;
    type loyaltyV1AccountAccounts_universal_d_DomainEvent = DomainEvent;
    type loyaltyV1AccountAccounts_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type loyaltyV1AccountAccounts_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type loyaltyV1AccountAccounts_universal_d_RestoreInfo = RestoreInfo;
    type loyaltyV1AccountAccounts_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type loyaltyV1AccountAccounts_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type loyaltyV1AccountAccounts_universal_d_ActionEvent = ActionEvent;
    type loyaltyV1AccountAccounts_universal_d_Empty = Empty;
    type loyaltyV1AccountAccounts_universal_d_TiersRollingUpdate = TiersRollingUpdate;
    type loyaltyV1AccountAccounts_universal_d_TiersProgramSettingsChanged = TiersProgramSettingsChanged;
    type loyaltyV1AccountAccounts_universal_d_TiersProgramSettings = TiersProgramSettings;
    type loyaltyV1AccountAccounts_universal_d_TiersProgramSettingsPeriodOneOf = TiersProgramSettingsPeriodOneOf;
    type loyaltyV1AccountAccounts_universal_d_Status = Status;
    const loyaltyV1AccountAccounts_universal_d_Status: typeof Status;
    type loyaltyV1AccountAccounts_universal_d_TierDefinition = TierDefinition;
    type loyaltyV1AccountAccounts_universal_d_FocalPoint = FocalPoint;
    type loyaltyV1AccountAccounts_universal_d_RollingWindow = RollingWindow;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionEvent = SubscriptionEvent;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionEventEventOneOf = SubscriptionEventEventOneOf;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionCreated = SubscriptionCreated;
    type loyaltyV1AccountAccounts_universal_d_Subscription = Subscription;
    type loyaltyV1AccountAccounts_universal_d_BillingReference = BillingReference;
    type loyaltyV1AccountAccounts_universal_d_ProviderName = ProviderName;
    const loyaltyV1AccountAccounts_universal_d_ProviderName: typeof ProviderName;
    type loyaltyV1AccountAccounts_universal_d_Cycle = Cycle;
    type loyaltyV1AccountAccounts_universal_d_CycleCycleSelectorOneOf = CycleCycleSelectorOneOf;
    type loyaltyV1AccountAccounts_universal_d_Interval = Interval;
    type loyaltyV1AccountAccounts_universal_d_IntervalUnit = IntervalUnit;
    const loyaltyV1AccountAccounts_universal_d_IntervalUnit: typeof IntervalUnit;
    type loyaltyV1AccountAccounts_universal_d_OneTime = OneTime;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionStatus = SubscriptionStatus;
    const loyaltyV1AccountAccounts_universal_d_SubscriptionStatus: typeof SubscriptionStatus;
    type loyaltyV1AccountAccounts_universal_d_ReactivationData = ReactivationData;
    type loyaltyV1AccountAccounts_universal_d_ReactivationReasonEnum = ReactivationReasonEnum;
    const loyaltyV1AccountAccounts_universal_d_ReactivationReasonEnum: typeof ReactivationReasonEnum;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionAssigned = SubscriptionAssigned;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionCancelled = SubscriptionCancelled;
    type loyaltyV1AccountAccounts_universal_d_CancellationDetails = CancellationDetails;
    type loyaltyV1AccountAccounts_universal_d_Initiator = Initiator;
    const loyaltyV1AccountAccounts_universal_d_Initiator: typeof Initiator;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionAutoRenewTurnedOn = SubscriptionAutoRenewTurnedOn;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionAutoRenewTurnedOff = SubscriptionAutoRenewTurnedOff;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionUnassigned = SubscriptionUnassigned;
    type loyaltyV1AccountAccounts_universal_d_UnassignReason = UnassignReason;
    const loyaltyV1AccountAccounts_universal_d_UnassignReason: typeof UnassignReason;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionTransferred = SubscriptionTransferred;
    type loyaltyV1AccountAccounts_universal_d_RecurringChargeSucceeded = RecurringChargeSucceeded;
    type loyaltyV1AccountAccounts_universal_d_ContractSwitched = ContractSwitched;
    type loyaltyV1AccountAccounts_universal_d_ContractSwitchType = ContractSwitchType;
    const loyaltyV1AccountAccounts_universal_d_ContractSwitchType: typeof ContractSwitchType;
    type loyaltyV1AccountAccounts_universal_d_ContractSwitchReason = ContractSwitchReason;
    const loyaltyV1AccountAccounts_universal_d_ContractSwitchReason: typeof ContractSwitchReason;
    type loyaltyV1AccountAccounts_universal_d_ProductPriceIncreaseData = ProductPriceIncreaseData;
    type loyaltyV1AccountAccounts_universal_d_PriceIncreaseTrigger = PriceIncreaseTrigger;
    const loyaltyV1AccountAccounts_universal_d_PriceIncreaseTrigger: typeof PriceIncreaseTrigger;
    type loyaltyV1AccountAccounts_universal_d_ProductAdjustment = ProductAdjustment;
    const loyaltyV1AccountAccounts_universal_d_ProductAdjustment: typeof ProductAdjustment;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionNearEndOfPeriod = SubscriptionNearEndOfPeriod;
    type loyaltyV1AccountAccounts_universal_d_SubscriptionPendingChange = SubscriptionPendingChange;
    type loyaltyV1AccountAccounts_universal_d_ContactSyncRequest = ContactSyncRequest;
    type loyaltyV1AccountAccounts_universal_d_BulkUpsertAccountsRequest = BulkUpsertAccountsRequest;
    type loyaltyV1AccountAccounts_universal_d_AccountToUpsert = AccountToUpsert;
    type loyaltyV1AccountAccounts_universal_d_BulkUpsertAccountsResponse = BulkUpsertAccountsResponse;
    type loyaltyV1AccountAccounts_universal_d_BulkAccountResult = BulkAccountResult;
    type loyaltyV1AccountAccounts_universal_d_ItemMetadata = ItemMetadata;
    type loyaltyV1AccountAccounts_universal_d_ApplicationError = ApplicationError;
    type loyaltyV1AccountAccounts_universal_d_BulkActionMetadata = BulkActionMetadata;
    type loyaltyV1AccountAccounts_universal_d_SetMissingMemberIdRequest = SetMissingMemberIdRequest;
    type loyaltyV1AccountAccounts_universal_d_SetMissingMemberIdResponse = SetMissingMemberIdResponse;
    type loyaltyV1AccountAccounts_universal_d_MessageEnvelope = MessageEnvelope;
    type loyaltyV1AccountAccounts_universal_d_IdentificationData = IdentificationData;
    type loyaltyV1AccountAccounts_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type loyaltyV1AccountAccounts_universal_d_WebhookIdentityType = WebhookIdentityType;
    const loyaltyV1AccountAccounts_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    const loyaltyV1AccountAccounts_universal_d_createAccount: typeof createAccount;
    const loyaltyV1AccountAccounts_universal_d_earnPoints: typeof earnPoints;
    type loyaltyV1AccountAccounts_universal_d_EarnPointsOptions = EarnPointsOptions;
    const loyaltyV1AccountAccounts_universal_d_adjustPoints: typeof adjustPoints;
    type loyaltyV1AccountAccounts_universal_d_AdjustPointsOptions = AdjustPointsOptions;
    type loyaltyV1AccountAccounts_universal_d_RedeemPointsOptions = RedeemPointsOptions;
    type loyaltyV1AccountAccounts_universal_d_RedeemDeterminedAmountOfPointsOptions = RedeemDeterminedAmountOfPointsOptions;
    const loyaltyV1AccountAccounts_universal_d_getAccount: typeof getAccount;
    const loyaltyV1AccountAccounts_universal_d_queryLoyaltyAccounts: typeof queryLoyaltyAccounts;
    type loyaltyV1AccountAccounts_universal_d_LoyaltyAccountsQueryResult = LoyaltyAccountsQueryResult;
    type loyaltyV1AccountAccounts_universal_d_LoyaltyAccountsQueryBuilder = LoyaltyAccountsQueryBuilder;
    type loyaltyV1AccountAccounts_universal_d_ListUserAccountsOptions = ListUserAccountsOptions;
    const loyaltyV1AccountAccounts_universal_d_getProgramTotals: typeof getProgramTotals;
    const loyaltyV1AccountAccounts_universal_d_getCurrentMemberAccount: typeof getCurrentMemberAccount;
    const loyaltyV1AccountAccounts_universal_d_getAccountBySecondaryId: typeof getAccountBySecondaryId;
    type loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdOptions = GetAccountBySecondaryIdOptions;
    const loyaltyV1AccountAccounts_universal_d_listAccounts: typeof listAccounts;
    type loyaltyV1AccountAccounts_universal_d_ListAccountsOptions = ListAccountsOptions;
    const loyaltyV1AccountAccounts_universal_d_searchAccounts: typeof searchAccounts;
    type loyaltyV1AccountAccounts_universal_d_SearchAccountsOptions = SearchAccountsOptions;
    type loyaltyV1AccountAccounts_universal_d_ExportAccountsOptions = ExportAccountsOptions;
    const loyaltyV1AccountAccounts_universal_d_countAccounts: typeof countAccounts;
    type loyaltyV1AccountAccounts_universal_d_CountAccountsOptions = CountAccountsOptions;
    const loyaltyV1AccountAccounts_universal_d_bulkAdjustPoints: typeof bulkAdjustPoints;
    type loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsOptions = BulkAdjustPointsOptions;
    type loyaltyV1AccountAccounts_universal_d_BulkUpsertAccountsOptions = BulkUpsertAccountsOptions;
    namespace loyaltyV1AccountAccounts_universal_d {
        export { loyaltyV1AccountAccounts_universal_d_LoyaltyAccount as LoyaltyAccount, loyaltyV1AccountAccounts_universal_d_Points as Points, loyaltyV1AccountAccounts_universal_d_Tier as Tier, loyaltyV1AccountAccounts_universal_d_Contact as Contact, loyaltyV1AccountAccounts_universal_d_Image as Image, loyaltyV1AccountAccounts_universal_d_PointsExpiration as PointsExpiration, loyaltyV1AccountAccounts_universal_d_RewardAvailabilityUpdated as RewardAvailabilityUpdated, loyaltyV1AccountAccounts_universal_d_UpdateTrigger as UpdateTrigger, loyaltyV1AccountAccounts_universal_d_CreateAccountRequest as CreateAccountRequest, loyaltyV1AccountAccounts_universal_d_CreateAccountResponse as CreateAccountResponse, loyaltyV1AccountAccounts_universal_d_EarnPointsRequest as EarnPointsRequest, loyaltyV1AccountAccounts_universal_d_EarnPointsRequestActivityDetailsOneOf as EarnPointsRequestActivityDetailsOneOf, loyaltyV1AccountAccounts_universal_d_FollowedSocialMedia as FollowedSocialMedia, loyaltyV1AccountAccounts_universal_d_EarnPointsResponse as EarnPointsResponse, loyaltyV1AccountAccounts_universal_d_PointsUpdated as PointsUpdated, loyaltyV1AccountAccounts_universal_d_FirstTransaction as FirstTransaction, loyaltyV1AccountAccounts_universal_d_AdjustPointsRequest as AdjustPointsRequest, loyaltyV1AccountAccounts_universal_d_AdjustPointsRequestTypeOneOf as AdjustPointsRequestTypeOneOf, loyaltyV1AccountAccounts_universal_d_AdjustPointsResponse as AdjustPointsResponse, loyaltyV1AccountAccounts_universal_d_RedeemPointsRequest as RedeemPointsRequest, loyaltyV1AccountAccounts_universal_d_RedeemPointsResponse as RedeemPointsResponse, loyaltyV1AccountAccounts_universal_d_RedeemDeterminedAmountOfPointsRequest as RedeemDeterminedAmountOfPointsRequest, loyaltyV1AccountAccounts_universal_d_RedeemDeterminedAmountOfPointsResponse as RedeemDeterminedAmountOfPointsResponse, loyaltyV1AccountAccounts_universal_d_RefundTransactionRequest as RefundTransactionRequest, loyaltyV1AccountAccounts_universal_d_RefundTransactionResponse as RefundTransactionResponse, loyaltyV1AccountAccounts_universal_d_GetAccountRequest as GetAccountRequest, loyaltyV1AccountAccounts_universal_d_GetAccountResponse as GetAccountResponse, loyaltyV1AccountAccounts_universal_d_QueryLoyaltyAccountsRequest as QueryLoyaltyAccountsRequest, loyaltyV1AccountAccounts_universal_d_CursorQuery as CursorQuery, loyaltyV1AccountAccounts_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf, loyaltyV1AccountAccounts_universal_d_Sorting as Sorting, loyaltyV1AccountAccounts_universal_d_SortOrder as SortOrder, loyaltyV1AccountAccounts_universal_d_CursorPaging as CursorPaging, loyaltyV1AccountAccounts_universal_d_QueryLoyaltyAccountsResponse as QueryLoyaltyAccountsResponse, loyaltyV1AccountAccounts_universal_d_CursorPagingMetadata as CursorPagingMetadata, loyaltyV1AccountAccounts_universal_d_Cursors as Cursors, loyaltyV1AccountAccounts_universal_d_ListUserAccountsRequest as ListUserAccountsRequest, loyaltyV1AccountAccounts_universal_d_ListUserAccountsResponse as ListUserAccountsResponse, loyaltyV1AccountAccounts_universal_d_LoyaltyAccountForMetaSite as LoyaltyAccountForMetaSite, loyaltyV1AccountAccounts_universal_d_GetProgramTotalsRequest as GetProgramTotalsRequest, loyaltyV1AccountAccounts_universal_d_GetProgramTotalsResponse as GetProgramTotalsResponse, loyaltyV1AccountAccounts_universal_d_TierTotal as TierTotal, loyaltyV1AccountAccounts_universal_d_GetCurrentMemberAccountRequest as GetCurrentMemberAccountRequest, loyaltyV1AccountAccounts_universal_d_GetCurrentMemberAccountResponse as GetCurrentMemberAccountResponse, loyaltyV1AccountAccounts_universal_d_GetMyAccountRequest as GetMyAccountRequest, loyaltyV1AccountAccounts_universal_d_GetMyAccountResponse as GetMyAccountResponse, loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdRequest as GetAccountBySecondaryIdRequest, loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdRequestIdOneOf as GetAccountBySecondaryIdRequestIdOneOf, loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdResponse as GetAccountBySecondaryIdResponse, loyaltyV1AccountAccounts_universal_d_ListAccountsRequest as ListAccountsRequest, loyaltyV1AccountAccounts_universal_d_ListAccountsResponse as ListAccountsResponse, loyaltyV1AccountAccounts_universal_d_PagingMetadataV2 as PagingMetadataV2, loyaltyV1AccountAccounts_universal_d_SearchAccountsRequest as SearchAccountsRequest, loyaltyV1AccountAccounts_universal_d_CursorSearch as CursorSearch, loyaltyV1AccountAccounts_universal_d_CursorSearchPagingMethodOneOf as CursorSearchPagingMethodOneOf, loyaltyV1AccountAccounts_universal_d_Aggregation as Aggregation, loyaltyV1AccountAccounts_universal_d_AggregationKindOneOf as AggregationKindOneOf, loyaltyV1AccountAccounts_universal_d_RangeBucket as RangeBucket, loyaltyV1AccountAccounts_universal_d_SortType as SortType, loyaltyV1AccountAccounts_universal_d_SortDirection as SortDirection, loyaltyV1AccountAccounts_universal_d_MissingValues as MissingValues, loyaltyV1AccountAccounts_universal_d_IncludeMissingValuesOptions as IncludeMissingValuesOptions, loyaltyV1AccountAccounts_universal_d_ScalarType as ScalarType, loyaltyV1AccountAccounts_universal_d_ValueAggregation as ValueAggregation, loyaltyV1AccountAccounts_universal_d_ValueAggregationOptionsOneOf as ValueAggregationOptionsOneOf, loyaltyV1AccountAccounts_universal_d_NestedAggregationType as NestedAggregationType, loyaltyV1AccountAccounts_universal_d_RangeAggregation as RangeAggregation, loyaltyV1AccountAccounts_universal_d_ScalarAggregation as ScalarAggregation, loyaltyV1AccountAccounts_universal_d_DateHistogramAggregation as DateHistogramAggregation, loyaltyV1AccountAccounts_universal_d_DateHistogramAggregationInterval as DateHistogramAggregationInterval, loyaltyV1AccountAccounts_universal_d_NestedAggregationItem as NestedAggregationItem, loyaltyV1AccountAccounts_universal_d_NestedAggregationItemKindOneOf as NestedAggregationItemKindOneOf, loyaltyV1AccountAccounts_universal_d_AggregationType as AggregationType, loyaltyV1AccountAccounts_universal_d_NestedAggregation as NestedAggregation, loyaltyV1AccountAccounts_universal_d_GroupByAggregation as GroupByAggregation, loyaltyV1AccountAccounts_universal_d_GroupByAggregationKindOneOf as GroupByAggregationKindOneOf, loyaltyV1AccountAccounts_universal_d_SearchDetails as SearchDetails, loyaltyV1AccountAccounts_universal_d_Mode as Mode, loyaltyV1AccountAccounts_universal_d_SearchAccountsResponse as SearchAccountsResponse, loyaltyV1AccountAccounts_universal_d_AggregationData as AggregationData, loyaltyV1AccountAccounts_universal_d_ValueAggregationResult as ValueAggregationResult, loyaltyV1AccountAccounts_universal_d_RangeAggregationResult as RangeAggregationResult, loyaltyV1AccountAccounts_universal_d_NestedAggregationResults as NestedAggregationResults, loyaltyV1AccountAccounts_universal_d_NestedAggregationResultsResultOneOf as NestedAggregationResultsResultOneOf, loyaltyV1AccountAccounts_universal_d_ValueResults as ValueResults, loyaltyV1AccountAccounts_universal_d_RangeResults as RangeResults, loyaltyV1AccountAccounts_universal_d_AggregationResultsScalarResult as AggregationResultsScalarResult, loyaltyV1AccountAccounts_universal_d_NestedValueAggregationResult as NestedValueAggregationResult, loyaltyV1AccountAccounts_universal_d_ValueResult as ValueResult, loyaltyV1AccountAccounts_universal_d_RangeResult as RangeResult, loyaltyV1AccountAccounts_universal_d_ScalarResult as ScalarResult, loyaltyV1AccountAccounts_universal_d_NestedResultValue as NestedResultValue, loyaltyV1AccountAccounts_universal_d_NestedResultValueResultOneOf as NestedResultValueResultOneOf, loyaltyV1AccountAccounts_universal_d_Results as Results, loyaltyV1AccountAccounts_universal_d_DateHistogramResult as DateHistogramResult, loyaltyV1AccountAccounts_universal_d_GroupByValueResults as GroupByValueResults, loyaltyV1AccountAccounts_universal_d_DateHistogramResults as DateHistogramResults, loyaltyV1AccountAccounts_universal_d_NestedResults as NestedResults, loyaltyV1AccountAccounts_universal_d_AggregationResults as AggregationResults, loyaltyV1AccountAccounts_universal_d_AggregationResultsResultOneOf as AggregationResultsResultOneOf, loyaltyV1AccountAccounts_universal_d_ExportAccountsRequest as ExportAccountsRequest, loyaltyV1AccountAccounts_universal_d_QueryV2 as QueryV2, loyaltyV1AccountAccounts_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf, loyaltyV1AccountAccounts_universal_d_Paging as Paging, loyaltyV1AccountAccounts_universal_d_ExportAccountsResponse as ExportAccountsResponse, loyaltyV1AccountAccounts_universal_d_CountAccountsRequest as CountAccountsRequest, loyaltyV1AccountAccounts_universal_d_CountAccountsResponse as CountAccountsResponse, loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsRequest as BulkAdjustPointsRequest, loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsRequestTypeOneOf as BulkAdjustPointsRequestTypeOneOf, loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsResponse as BulkAdjustPointsResponse, loyaltyV1AccountAccounts_universal_d_DomainEvent as DomainEvent, loyaltyV1AccountAccounts_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, loyaltyV1AccountAccounts_universal_d_EntityCreatedEvent as EntityCreatedEvent, loyaltyV1AccountAccounts_universal_d_RestoreInfo as RestoreInfo, loyaltyV1AccountAccounts_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, loyaltyV1AccountAccounts_universal_d_EntityDeletedEvent as EntityDeletedEvent, loyaltyV1AccountAccounts_universal_d_ActionEvent as ActionEvent, loyaltyV1AccountAccounts_universal_d_Empty as Empty, loyaltyV1AccountAccounts_universal_d_TiersRollingUpdate as TiersRollingUpdate, loyaltyV1AccountAccounts_universal_d_TiersProgramSettingsChanged as TiersProgramSettingsChanged, loyaltyV1AccountAccounts_universal_d_TiersProgramSettings as TiersProgramSettings, loyaltyV1AccountAccounts_universal_d_TiersProgramSettingsPeriodOneOf as TiersProgramSettingsPeriodOneOf, loyaltyV1AccountAccounts_universal_d_Status as Status, loyaltyV1AccountAccounts_universal_d_TierDefinition as TierDefinition, loyaltyV1AccountAccounts_universal_d_FocalPoint as FocalPoint, loyaltyV1AccountAccounts_universal_d_RollingWindow as RollingWindow, loyaltyV1AccountAccounts_universal_d_SubscriptionEvent as SubscriptionEvent, loyaltyV1AccountAccounts_universal_d_SubscriptionEventEventOneOf as SubscriptionEventEventOneOf, loyaltyV1AccountAccounts_universal_d_SubscriptionCreated as SubscriptionCreated, loyaltyV1AccountAccounts_universal_d_Subscription as Subscription, loyaltyV1AccountAccounts_universal_d_BillingReference as BillingReference, loyaltyV1AccountAccounts_universal_d_ProviderName as ProviderName, loyaltyV1AccountAccounts_universal_d_Cycle as Cycle, loyaltyV1AccountAccounts_universal_d_CycleCycleSelectorOneOf as CycleCycleSelectorOneOf, loyaltyV1AccountAccounts_universal_d_Interval as Interval, loyaltyV1AccountAccounts_universal_d_IntervalUnit as IntervalUnit, loyaltyV1AccountAccounts_universal_d_OneTime as OneTime, loyaltyV1AccountAccounts_universal_d_SubscriptionStatus as SubscriptionStatus, loyaltyV1AccountAccounts_universal_d_ReactivationData as ReactivationData, loyaltyV1AccountAccounts_universal_d_ReactivationReasonEnum as ReactivationReasonEnum, loyaltyV1AccountAccounts_universal_d_SubscriptionAssigned as SubscriptionAssigned, loyaltyV1AccountAccounts_universal_d_SubscriptionCancelled as SubscriptionCancelled, loyaltyV1AccountAccounts_universal_d_CancellationDetails as CancellationDetails, loyaltyV1AccountAccounts_universal_d_Initiator as Initiator, loyaltyV1AccountAccounts_universal_d_SubscriptionAutoRenewTurnedOn as SubscriptionAutoRenewTurnedOn, loyaltyV1AccountAccounts_universal_d_SubscriptionAutoRenewTurnedOff as SubscriptionAutoRenewTurnedOff, loyaltyV1AccountAccounts_universal_d_SubscriptionUnassigned as SubscriptionUnassigned, loyaltyV1AccountAccounts_universal_d_UnassignReason as UnassignReason, loyaltyV1AccountAccounts_universal_d_SubscriptionTransferred as SubscriptionTransferred, loyaltyV1AccountAccounts_universal_d_RecurringChargeSucceeded as RecurringChargeSucceeded, loyaltyV1AccountAccounts_universal_d_ContractSwitched as ContractSwitched, loyaltyV1AccountAccounts_universal_d_ContractSwitchType as ContractSwitchType, loyaltyV1AccountAccounts_universal_d_ContractSwitchReason as ContractSwitchReason, loyaltyV1AccountAccounts_universal_d_ProductPriceIncreaseData as ProductPriceIncreaseData, loyaltyV1AccountAccounts_universal_d_PriceIncreaseTrigger as PriceIncreaseTrigger, loyaltyV1AccountAccounts_universal_d_ProductAdjustment as ProductAdjustment, loyaltyV1AccountAccounts_universal_d_SubscriptionNearEndOfPeriod as SubscriptionNearEndOfPeriod, loyaltyV1AccountAccounts_universal_d_SubscriptionPendingChange as SubscriptionPendingChange, loyaltyV1AccountAccounts_universal_d_ContactSyncRequest as ContactSyncRequest, loyaltyV1AccountAccounts_universal_d_BulkUpsertAccountsRequest as BulkUpsertAccountsRequest, loyaltyV1AccountAccounts_universal_d_AccountToUpsert as AccountToUpsert, loyaltyV1AccountAccounts_universal_d_BulkUpsertAccountsResponse as BulkUpsertAccountsResponse, loyaltyV1AccountAccounts_universal_d_BulkAccountResult as BulkAccountResult, loyaltyV1AccountAccounts_universal_d_ItemMetadata as ItemMetadata, loyaltyV1AccountAccounts_universal_d_ApplicationError as ApplicationError, loyaltyV1AccountAccounts_universal_d_BulkActionMetadata as BulkActionMetadata, loyaltyV1AccountAccounts_universal_d_SetMissingMemberIdRequest as SetMissingMemberIdRequest, loyaltyV1AccountAccounts_universal_d_SetMissingMemberIdResponse as SetMissingMemberIdResponse, loyaltyV1AccountAccounts_universal_d_MessageEnvelope as MessageEnvelope, loyaltyV1AccountAccounts_universal_d_IdentificationData as IdentificationData, loyaltyV1AccountAccounts_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, loyaltyV1AccountAccounts_universal_d_WebhookIdentityType as WebhookIdentityType, loyaltyV1AccountAccounts_universal_d_createAccount as createAccount, loyaltyV1AccountAccounts_universal_d_earnPoints as earnPoints, loyaltyV1AccountAccounts_universal_d_EarnPointsOptions as EarnPointsOptions, loyaltyV1AccountAccounts_universal_d_adjustPoints as adjustPoints, loyaltyV1AccountAccounts_universal_d_AdjustPointsOptions as AdjustPointsOptions, loyaltyV1AccountAccounts_universal_d_RedeemPointsOptions as RedeemPointsOptions, loyaltyV1AccountAccounts_universal_d_RedeemDeterminedAmountOfPointsOptions as RedeemDeterminedAmountOfPointsOptions, loyaltyV1AccountAccounts_universal_d_getAccount as getAccount, loyaltyV1AccountAccounts_universal_d_queryLoyaltyAccounts as queryLoyaltyAccounts, loyaltyV1AccountAccounts_universal_d_LoyaltyAccountsQueryResult as LoyaltyAccountsQueryResult, loyaltyV1AccountAccounts_universal_d_LoyaltyAccountsQueryBuilder as LoyaltyAccountsQueryBuilder, loyaltyV1AccountAccounts_universal_d_ListUserAccountsOptions as ListUserAccountsOptions, loyaltyV1AccountAccounts_universal_d_getProgramTotals as getProgramTotals, loyaltyV1AccountAccounts_universal_d_getCurrentMemberAccount as getCurrentMemberAccount, loyaltyV1AccountAccounts_universal_d_getAccountBySecondaryId as getAccountBySecondaryId, loyaltyV1AccountAccounts_universal_d_GetAccountBySecondaryIdOptions as GetAccountBySecondaryIdOptions, loyaltyV1AccountAccounts_universal_d_listAccounts as listAccounts, loyaltyV1AccountAccounts_universal_d_ListAccountsOptions as ListAccountsOptions, loyaltyV1AccountAccounts_universal_d_searchAccounts as searchAccounts, loyaltyV1AccountAccounts_universal_d_SearchAccountsOptions as SearchAccountsOptions, loyaltyV1AccountAccounts_universal_d_ExportAccountsOptions as ExportAccountsOptions, loyaltyV1AccountAccounts_universal_d_countAccounts as countAccounts, loyaltyV1AccountAccounts_universal_d_CountAccountsOptions as CountAccountsOptions, loyaltyV1AccountAccounts_universal_d_bulkAdjustPoints as bulkAdjustPoints, loyaltyV1AccountAccounts_universal_d_BulkAdjustPointsOptions as BulkAdjustPointsOptions, loyaltyV1AccountAccounts_universal_d_BulkUpsertAccountsOptions as BulkUpsertAccountsOptions, };
    }
    export { loyaltyV1AccountAccounts_universal_d as accounts, loyaltyV1CouponCoupons_universal_d as coupons, loyaltyV1ProgramPrograms_universal_d as programs, loyaltyV1RewardRewards_universal_d as rewards, loyaltyV1TierTiers_universal_d as tiers, loyaltyTransactionV1LoyaltyTransactionTransactions_universal_d as transactions };
}
