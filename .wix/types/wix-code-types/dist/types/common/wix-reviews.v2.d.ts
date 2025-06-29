declare module "wix-reviews.v2" {
    /**
     * A Review object includes all of the details related to the review of an entity. An entity is a specific resource to be reviewed,
     * for example, a store product.
     * You can manage existing reviews, create new reviews, and retrieve reviews.
     * Read more about reviews in this [tutorial](https://support.wix.com/en/article/wix-stores-adding-and-setting-up-wix-reviews).
     */
    interface Review {
        /** Review namespace. Currently integrated with Wix Stores, as `stores`. */
        namespace?: string;
        /** ID of the entity to review. For example, a Wix Stores product ID. */
        entityId?: string;
        /**
         * Review ID.
         * @readonly
         */
        _id?: string;
        /** Review content. */
        content?: ReviewContent;
        /**
         * Date and time the review was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the review was updated.
         * @readonly
         */
        _updatedDate?: Date | null;
        /** Author of the review. */
        author?: Author;
        /**
         * Reply to the review.
         * @readonly
         */
        reply?: Reply;
        /**
         * Number of site visitors who found the review helpful.
         * @readonly
         */
        foundHelpful?: number;
        /**
         * Number of site visitors who found the review unhelpful.
         * @readonly
         */
        foundUnhelpful?: number;
        /**
         * Helpfulness score.
         *
         * Calculated by subtracting `foundUnhelpful` from `foundHelpful`.
         * @readonly
         */
        helpfulness?: number;
        /**
         * Moderation status of the review.
         * @readonly
         */
        moderation?: Moderation;
        /**
         * Revision number, which increments by 1 each time the review is updated.
         * To prevent conflicting changes,
         * the current revision must be passed when updating the review.
         * Ignored when creating a review.
         * @readonly
         */
        revision?: string | null;
        /**
         * Indicates whether the review has been verified through a Verify Product Purchase call to the Review Product catalog SPI.
         * @readonly
         */
        verified?: boolean;
        /**
         * Provides information about the origin of the review.
         * Organic reviews are created by site visitors or members.
         * App reviews are created by apps even though a site visitor or member is the author of the review.
         * Apps can not create or update organic reviews.
         * @readonly
         */
        origin?: Origin;
        /**
         * Date and time when the review was written.
         * This should match `created_date`, except for reviews imported from another system.
         */
        reviewDate?: Date | null;
        /**
         * Platform-calculated score of review's relevance to the item. Used to sort
         * reviews by relevance.
         * @readonly
         */
        relevanceScore?: number | null;
        /**
         * Counts the number of times a review has been published.
         * Reviews require approval before publishing, unless moderation is disabled.
         * When moderation is disabled, reviews are automatically approved and published.
         * @readonly
         */
        publishCount?: number;
    }
    /** The Review object. */
    interface ReviewContent {
        /** Review title. */
        title?: string | null;
        /**
         * Review body.
         *
         * Max: 3,000 characters
         */
        body?: string | null;
        /**
         * List of media items associated with the review.
         *
         * Max: 10 items
         */
        media?: Media[];
        /**
         * Rating of the review.
         *
         * Min: `1`
         *
         * Max: `5`
         */
        rating?: number;
    }
    /** Media item associated with the review. */
    interface Media extends MediaMediaOneOf {
        /** Image media item. */
        image?: string;
        /** Video media item. */
        video?: string;
    }
    /** @oneof */
    interface MediaMediaOneOf {
        /** Image media item. */
        image?: string;
        /** Video media item. */
        video?: string;
    }
    interface VideoResolution {
        /**
         * Video URL.
         * @readonly
         */
        url?: string;
        /**
         * Video height.
         * @readonly
         */
        height?: number;
        /**
         * Video width.
         * @readonly
         */
        width?: number;
        /**
         * Video thumbnail.
         * @readonly
         */
        poster?: string;
        /**
         * Video format for example, mp4, hls.
         * @readonly
         */
        format?: string;
    }
    /** Review author. */
    interface Author {
        /** Contact ID of the author. */
        contactId?: string | null;
        /** Display name of the author. */
        authorName?: string | null;
    }
    /** Supported types of review author. */
    enum AuthorType {
        UNKNOWN = "UNKNOWN",
        MEMBER = "MEMBER",
        VISITOR = "VISITOR"
    }
    /** Reply to the review. */
    interface Reply {
        /** Reply content. */
        message?: string;
        /**
         * Date and time the reply was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the reply was updated.
         * @readonly
         */
        _updatedDate?: Date | null;
    }
    /** Moderation status of the review. */
    interface Moderation {
        moderationStatus?: ModerationModerationStatus;
        /**
         * Indicates whether a moderator manually changed the `moderationStatus` of the review.
         *
         * If the `moderationStatus` changed automatically because the review
         * passed the moderation rules or if moderation is turned off, this field is set to `false`.
         * @readonly
         */
        manuallyChanged?: boolean;
    }
    /** Supported states of the review. */
    enum ModerationModerationStatus {
        /** Unknown moderation status. */
        UNKNOWN = "UNKNOWN",
        /** The review is approved and published. */
        APPROVED = "APPROVED",
        /** The review is pending moderation. Moderation can be applied in the site owner's [Dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Freviews/pending). */
        IN_MODERATION = "IN_MODERATION",
        /** The review is rejected and not visible on the site. */
        REJECTED = "REJECTED",
        /** Initial status of the review before the moderation process. */
        SUBMITTED = "SUBMITTED"
    }
    interface Origin {
        /** The type of the review origin. */
        type?: OriginType;
        /**
         * The app ID of the APP review origin.
         * Set only when the review origin is APP.
         */
        appId?: string | null;
    }
    /** Supported types of review origin. */
    enum OriginType {
        /** Unknown origin type. */
        UNKNOWN = "UNKNOWN",
        /** Review was created organically. */
        ORGANIC = "ORGANIC",
        /** Review was created by an application. */
        APP = "APP"
    }
    interface Source extends SourceSourceTypeOptionsOneOf {
        reviewRequestOptions?: ReviewRequestOptions;
        requestLinkOptions?: RequestLinkOptions;
        /** The type of the review source. */
        type?: SourceType;
    }
    /** @oneof */
    interface SourceSourceTypeOptionsOneOf {
        reviewRequestOptions?: ReviewRequestOptions;
        requestLinkOptions?: RequestLinkOptions;
    }
    enum SourceType {
        /** Unknown source type. */
        UNKNOWN_SOURCE_TYPE = "UNKNOWN_SOURCE_TYPE",
        /** Review was created from a review request. */
        REVIEW_REQUEST = "REVIEW_REQUEST",
        /** Review was created from a request link. */
        REQUEST_LINK = "REQUEST_LINK"
    }
    interface ReviewRequestOptions {
        /** Review request ID. */
        _id?: string | null;
    }
    interface RequestLinkOptions {
        /** Request link ID. */
        _id?: string | null;
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
    interface GetReviewRequest {
        /** Review ID. */
        reviewId: string;
        /**
         * Whether to return private (unpublished) reviews.
         *
         * Default: `false`
         */
        returnPrivateReviews?: boolean;
    }
    interface GetReviewResponse {
        /** Review. */
        review?: Review;
    }
    interface GetDeletedReviewRequest {
        /** Review ID. */
        reviewId: string;
    }
    interface GetDeletedReviewResponse {
        /** Review. */
        review?: Review;
    }
    interface CreateReviewAndContactRequest {
        /** Namespace where the review is created. */
        namespace: string;
        /** ID of the entity to review. */
        entityId: string;
        /** Name of the review author. Displayed as part of the review. Required for 3rd-party apps. */
        name?: string | null;
        /** Email address of the review author.  Required for 3rd-party apps. */
        email?: string | null;
        /** Review content. */
        content: ReviewContent;
    }
    interface CreateReviewResponse {
        /** Created review. */
        review?: Review;
    }
    interface CreateReviewRequest {
        /** Review data. */
        review: Review;
    }
    /** Action describing changed review moderation status */
    interface ReviewPublished {
        /** Review entity */
        review?: Review;
    }
    interface BulkCreateReviewRequest {
        /** Reviews to create. */
        reviews: Review[];
        returnEntity?: boolean;
    }
    interface BulkCreateReviewResponse {
        /**
         * Created reviews, only returned if returnEntity is set to true.
         * Items are returned for successful operations and when returnEntity in the request is set to true.
         */
        results?: BulkReviewResult[];
        bulkActionMetadata?: BulkActionMetadata;
    }
    interface BulkReviewResult {
        /** ItemMetadata */
        itemMetadata?: ItemMetadata;
        /** New Reviews */
        review?: Review;
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
    interface UpdateReviewContentRequest {
        /** Review ID. */
        reviewId: string;
        /** Review content. */
        content?: ReviewContent;
        /**
         * Fieldmask for update.
         * Supported fields: content.title, content.body, content.media, content.rating
         */
        fieldMask?: string[];
    }
    interface UpdateReviewContentResponse {
        /** Updated review data. */
        review?: Review;
    }
    /** Action describing changed review moderation status */
    interface ModerationStatusChanged {
        /** Review entity */
        review?: Review;
        /**
         * The previous moderation status of the review.
         * - `APPROVED`: The review is approved and published.
         * - `IN_MODERATION`: The review is pending moderation. Moderation can be applied in the site owner's [Dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Select%20Site&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https:%2F%2Fwww.wix.com%2Fdashboard%2F%7B%7BmetaSiteId%7D%7D%2Freviews/pending).
         * - `REJECTED`: The review is rejected and not visible in the site.
         * - `SUBMITTED`: Initial status of the review before the moderation process.
         */
        previousModerationStatus?: ModerationModerationStatus;
    }
    interface UpdateReviewRequest {
        /** Review to update. */
        review?: Review;
    }
    interface UpdateReviewResponse {
        /** Updated review data. */
        review?: Review;
    }
    interface DeleteReviewRequest {
        /** Review ID. */
        reviewId: string;
    }
    interface DeleteReviewResponse {
        /** Review entity. */
        review?: Review;
    }
    interface BulkDeleteReviewsRequest {
        /**
         * Filter object.
         *
         */
        filter?: Record<string, any> | null;
    }
    interface BulkDeleteReviewsResponse {
        /** Bulk job ID. */
        jobId?: string;
    }
    interface QueryReviewsRequest {
        /** Review query. */
        query?: QueryV2;
        /**
         * Whether to return private (unpublished) reviews.
         *
         * Default: `false`
         */
        returnPrivateReviews?: boolean;
    }
    interface QueryV2 {
        /** Filter object. */
        filter?: Record<string, any> | null;
        /** Sorting options. */
        sort?: Sorting[];
        /** Cursor paging options. */
        cursorPaging?: CursorPaging;
    }
    /** Sort options. */
    interface Sorting {
        /** Name of the field to sort by. */
        fieldName?: string;
        /**
         * Sort order.
         *
         * Defaults to `ascending`.
         */
        order?: SortOrder;
    }
    enum SortOrder {
        /** Sort by ascending order. */
        ASC = "ASC",
        /** Sort by descending order. */
        DESC = "DESC"
    }
    interface CursorPaging {
        /**
         * The number of items to load.
         * Cursor token returned in the query response. To be used on the next query request, but not the first query request.
         *
         * Max: `100` <br />
         * Default: `50`
         */
        limit?: number | null;
        /** Cursor returned in last query response. Should not be provided on first page request. */
        cursor?: string | null;
    }
    interface QueryReviewsResponse {
        /** Paging metadata. */
        metadata?: PagingMetadataV2;
        /** List of returned reviews. */
        reviews?: Review[];
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
    interface Cursors {
        /** Cursor pointing to next result page. */
        next?: string | null;
        /** Cursor pointing to previous result page. */
        prev?: string | null;
    }
    interface SetReplyRequest {
        /** Review id */
        reviewId: string;
        /** Response to review author */
        message: string;
    }
    interface SetReplyResponse {
        /** Review entity */
        review?: Review;
    }
    interface RemoveReplyRequest {
        /** Review ID */
        reviewId: string;
    }
    interface RemoveReplyResponse {
        /** Review ID */
        review?: Review;
    }
    interface UpdateModerationStatusRequest {
        /** Review id */
        reviewId: string;
        /** Moderation status to set */
        status?: UpdateModerationStatusRequestModerationStatus;
    }
    enum UpdateModerationStatusRequestModerationStatus {
        UNKNOWN_MODERATION_STATUS = "UNKNOWN_MODERATION_STATUS",
        APPROVED = "APPROVED",
        REJECTED = "REJECTED"
    }
    interface UpdateModerationStatusResponse {
        /** Review entity */
        review?: Review;
    }
    interface BulkUpdateModerationStatusRequest {
        /** Reviews to moderate */
        filter?: Record<string, any> | null;
        /** Moderation status to set */
        status?: ModerationStatus;
    }
    enum ModerationStatus {
        UNKNOWN = "UNKNOWN",
        APPROVED = "APPROVED",
        REJECTED = "REJECTED"
    }
    interface BulkUpdateModerationStatusResponse {
        /** Reference to async job */
        jobId?: string;
    }
    interface CountReviewsRequest {
        filter?: Record<string, any> | null;
        /**
         * Whether to include private (unpublished) reviews in count results.
         *
         * Default: `false`
         */
        includePrivateReviews?: boolean;
    }
    interface CountReviewsResponse {
        /** Number of reviews. */
        count?: number;
    }
    /**
     * Retrieves a review.
     *
     *
     * The `getReview()` function returns a Promise that resolves to the retrieved review.
     *
     * By default, an unpublished review is not returned. To retrieve an unpublished review, pass `returnPrivateReviews` as `true`.
     * @param reviewId - Review ID.
     * @public
     * @requiredField reviewId
     * @param options - Information about the reviews to retrieve.
     * @permissionId REVIEWS.READ_REVIEWS
     * @permissionId REVIEWS.READ_PRIVATE_REVIEWS
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.READ-REVIEWS
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @permissionScope Manage Portfolio
     * @permissionScopeId SCOPE.PORTFOLIO.MANAGE-PORTFOLIO
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Review.
     * @fqn com.wixpress.critique.reviews.Reviews.GetReview
     */
    function getReview(reviewId: string, options?: GetReviewOptions): Promise<Review>;
    interface GetReviewOptions {
        /**
         * Whether to return private (unpublished) reviews.
         *
         * Default: `false`
         */
        returnPrivateReviews?: boolean;
    }
    /**
     * Creates a new review and a new contact.
     *
     *
     * When the review author is not a contact, use this endpoint. Include `name` and `email`,
     * as they're required to create the contact. If these parameters are missing, a new contact and
     * review won't be created.
     *
     * When the review author is already a contact, use either this endpoint or [Create Review](https://dev.wix.com/api/rest/reviews/create-review).
     * A new review is created but a new contact is not created. For a 3rd-party app, include `name` and `email`.
     *
     * After a review is created, it may require [moderation](https://dev.wix.com/api/rest/reviews/introduction#reviews_introduction_moderation).
     * @param namespace - Namespace where the review is created.
     * @param entityId - ID of the entity to review.
     * @param content - Review content.
     * @public
     * @documentationMaturity preview
     * @requiredField content
     * @requiredField content.rating
     * @requiredField entityId
     * @requiredField namespace
     * @permissionId REVIEWS.CREATE_REVIEW
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn com.wixpress.critique.reviews.Reviews.CreateReviewAndContact
     * @deprecated
     * @replacedBy com.wixpress.critique.reviews.CreateReview
     * @targetRemovalDate 2024-02-01
     */
    function createReviewAndContact(namespace: string, entityId: string, content: ReviewContent, options?: CreateReviewAndContactOptions): Promise<CreateReviewResponse>;
    interface CreateReviewAndContactOptions {
        /** Name of the review author. Displayed as part of the review. Required for 3rd-party apps. */
        name?: string | null;
        /** Email address of the review author.  Required for 3rd-party apps. */
        email?: string | null;
    }
    /**
     * Creates a review.
     *
     *
     * The `createReview()` function returns a promise that resolves to the created review.
     *
     * This function requires a `contactId`.
     *
     * If the review author does not have a contact ID, use `createReviewAndContact()`.
     *
     * If `authorName` is left empty, the member's name will be used. If the author is not a member, the field is left `null`.
     * @param review - Review data.
     * @public
     * @requiredField review
     * @requiredField review.content
     * @requiredField review.content.rating
     * @requiredField review.entityId
     * @requiredField review.namespace
     * @permissionId REVIEWS.CREATE_REVIEW
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @returns Created review.
     * @fqn com.wixpress.critique.reviews.Reviews.CreateReview
     */
    function createReview(review: Review): Promise<Review>;
    interface BulkCreateReviewOptions {
        returnEntity?: boolean;
    }
    interface UpdateReviewContentOptions {
        /** Review content. */
        content?: ReviewContent;
        /**
         * Fieldmask for update.
         * Supported fields: content.title, content.body, content.media, content.rating
         */
        fieldMask?: string[];
    }
    /**
     * Updates a review.
     *
     *
     * The `updateReview()` function returns a promise that resolves to the updated review.
     *
     * Each time the review is updated, `revision` increments by 1. The existing `revision` must be included
     * when updating the review. This ensures you're working with the latest review information, and it prevents unintended overwrites.
     *
     * This function is not a universal function and runs only on the backend.
     * @param _id - Review ID.
     * @public
     * @requiredField _id
     * @requiredField review
     * @requiredField review.revision
     * @param options - Options to use when updating a review.
     * @param review - Review to update.
     * @permissionId REVIEWS.UPDATE_REVIEW
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @applicableIdentity APP
     * @adminMethod
     * @returns Updated review data.
     * @fqn com.wixpress.critique.reviews.Reviews.UpdateReview
     */
    function updateReview(_id: string, review: UpdateReview, options?: UpdateReviewOptions): Promise<Review>;
    interface UpdateReview {
        /** Review namespace. Currently integrated with Wix Stores, as `stores`. */
        namespace?: string;
        /** ID of the entity to review. For example, a Wix Stores product ID. */
        entityId?: string;
        /**
         * Review ID.
         * @readonly
         */
        _id?: string;
        /** Review content. */
        content?: ReviewContent;
        /**
         * Date and time the review was created.
         * @readonly
         */
        _createdDate?: Date | null;
        /**
         * Date and time the review was updated.
         * @readonly
         */
        _updatedDate?: Date | null;
        /** Author of the review. */
        author?: Author;
        /**
         * Reply to the review.
         * @readonly
         */
        reply?: Reply;
        /**
         * Number of site visitors who found the review helpful.
         * @readonly
         */
        foundHelpful?: number;
        /**
         * Number of site visitors who found the review unhelpful.
         * @readonly
         */
        foundUnhelpful?: number;
        /**
         * Helpfulness score.
         *
         * Calculated by subtracting `foundUnhelpful` from `foundHelpful`.
         * @readonly
         */
        helpfulness?: number;
        /**
         * Moderation status of the review.
         * @readonly
         */
        moderation?: Moderation;
        /**
         * Revision number, which increments by 1 each time the review is updated.
         * To prevent conflicting changes,
         * the current revision must be passed when updating the review.
         * Ignored when creating a review.
         * @readonly
         */
        revision?: string | null;
        /**
         * Indicates whether the review has been verified through a Verify Product Purchase call to the Review Product catalog SPI.
         * @readonly
         */
        verified?: boolean;
        /**
         * Provides information about the origin of the review.
         * Organic reviews are created by site visitors or members.
         * App reviews are created by apps even though a site visitor or member is the author of the review.
         * Apps can not create or update organic reviews.
         * @readonly
         */
        origin?: Origin;
        /**
         * Date and time when the review was written.
         * This should match `created_date`, except for reviews imported from another system.
         */
        reviewDate?: Date | null;
        /**
         * Platform-calculated score of review's relevance to the item. Used to sort
         * reviews by relevance.
         * @readonly
         */
        relevanceScore?: number | null;
        /**
         * Counts the number of times a review has been published.
         * Reviews require approval before publishing, unless moderation is disabled.
         * When moderation is disabled, reviews are automatically approved and published.
         * @readonly
         */
        publishCount?: number;
    }
    interface UpdateReviewOptions {
    }
    /**
     * Deletes a review.
     *
     *
     * The `deleteReview()` function returns a promise that resolves to the deleted review.
     * @param reviewId - Review ID.
     * @public
     * @requiredField reviewId
     * @permissionId REVIEWS.DELETE_REVIEW
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @applicableIdentity APP
     * @adminMethod
     * @fqn com.wixpress.critique.reviews.Reviews.DeleteReview
     */
    function deleteReview(reviewId: string): Promise<DeleteReviewResponse>;
    interface BulkDeleteReviewsOptions {
        /** Filter object. */
        filter?: Record<string, any> | null;
    }
    /**
     * Creates a query to retrieve a list of reviews.
     *
     *
     * The `queryReviews()` function builds a query to retrieve a list of reviews and returns a `ReviewsQueryBuilder` object.
     *
     * The returned object contains the query definition, which is typically used to run the query using the  `find()` function.
     *
     * You can refine the query by chaining `ReviewsQueryBuilder` functions onto the query.
     *
     * `ReviewsQueryBuilder` functions enable you to sort, filter,
     * and control the results that `queryReviews()` returns.
     *
     * The `queryReviews()` function runs with the following defaults, which you can override:
     *
     * - `ascending("_createdDate")`
     * - `limit(100)`
     *
     * The functions that are chained to `queryReviews()` are applied in the order they're called. For example, if you apply `descending("_createdDate")` and then `descending("content.rating")`, the results are sorted first by the `_createdDate`, and then, if there are multiple results with the same `_createdDate`, the items are sorted by `content.rating`.
     * @public
     * @param options - Information about the reviews to retrieve.
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.READ-REVIEWS
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @permissionScope Manage Portfolio
     * @permissionScopeId SCOPE.PORTFOLIO.MANAGE-PORTFOLIO
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @permissionId REVIEWS.READ_REVIEWS
     * @permissionId REVIEWS.READ_PRIVATE_REVIEWS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn com.wixpress.critique.reviews.Reviews.QueryReviews
     */
    function queryReviews(options?: QueryReviewsOptions): ReviewsQueryBuilder;
    interface QueryReviewsOptions {
        /**
         * Whether to return private (unpublished) reviews.
         *
         * Default: `false`
         */
        returnPrivateReviews?: boolean | undefined;
    }
    interface QueryCursorResult {
        cursors: Cursors;
        hasNext: () => boolean;
        hasPrev: () => boolean;
        length: number;
        pageSize: number;
    }
    interface ReviewsQueryResult extends QueryCursorResult {
        items: Review[];
        query: ReviewsQueryBuilder;
        next: () => Promise<ReviewsQueryResult>;
        prev: () => Promise<ReviewsQueryResult>;
    }
    interface ReviewsQueryBuilder {
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        eq: (propertyName: "namespace" | "entityId" | "_id" | "content.rating" | "_createdDate" | "author.contactId" | "helpfulness" | "moderation.moderationStatus" | "verified" | "origin.type" | "relevanceScore", value: any) => ReviewsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ne: (propertyName: "namespace" | "entityId" | "_id" | "content.rating" | "_createdDate" | "author.contactId" | "helpfulness" | "moderation.moderationStatus" | "verified" | "origin.type" | "relevanceScore", value: any) => ReviewsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        ge: (propertyName: "content.rating" | "_createdDate" | "helpfulness" | "relevanceScore", value: any) => ReviewsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        gt: (propertyName: "content.rating" | "_createdDate" | "helpfulness" | "relevanceScore", value: any) => ReviewsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        le: (propertyName: "content.rating" | "_createdDate" | "helpfulness" | "relevanceScore", value: any) => ReviewsQueryBuilder;
        /** @param propertyName - Property whose value is compared with `value`.
         * @param value - Value to compare against.
         */
        lt: (propertyName: "content.rating" | "_createdDate" | "helpfulness" | "relevanceScore", value: any) => ReviewsQueryBuilder;
        in: (propertyName: "namespace" | "entityId" | "_id" | "content.rating" | "_createdDate" | "author.contactId" | "helpfulness" | "moderation.moderationStatus" | "relevanceScore", value: any) => ReviewsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        ascending: (...propertyNames: Array<"content.rating" | "_createdDate" | "helpfulness" | "verified" | "origin.type" | "relevanceScore">) => ReviewsQueryBuilder;
        /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
        descending: (...propertyNames: Array<"content.rating" | "_createdDate" | "helpfulness" | "verified" | "origin.type" | "relevanceScore">) => ReviewsQueryBuilder;
        /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
        limit: (limit: number) => ReviewsQueryBuilder;
        /** @param cursor - A pointer to specific record */
        skipTo: (cursor: string) => ReviewsQueryBuilder;
        find: () => Promise<ReviewsQueryResult>;
    }
    /**
     * Set reply on a review
     * @param reviewId - Review id
     * @param message - Response to review author
     * @public
     * @documentationMaturity preview
     * @requiredField message
     * @requiredField reviewId
     * @permissionId REVIEWS.SET_REPLY
     * @adminMethod
     * @fqn com.wixpress.critique.reviews.Reviews.SetReply
     */
    function setReply(reviewId: string, message: string): Promise<SetReplyResponse>;
    /**
     * Removes reply from review
     * @param reviewId - Review ID
     * @public
     * @documentationMaturity preview
     * @requiredField reviewId
     * @permissionId REVIEWS.REMOVE_REPLY
     * @adminMethod
     * @fqn com.wixpress.critique.reviews.Reviews.RemoveReply
     */
    function removeReply(reviewId: string): Promise<RemoveReplyResponse>;
    interface UpdateModerationStatusOptions {
        /** Moderation status to set */
        status?: UpdateModerationStatusRequestModerationStatus;
    }
    interface BulkUpdateModerationStatusOptions {
        /** Reviews to moderate */
        filter?: Record<string, any> | null;
        /** Moderation status to set */
        status?: ModerationStatus;
    }
    /** @public
     * @documentationMaturity preview
     * @permissionId REVIEWS.READ_REVIEWS
     * @permissionId REVIEWS.READ_PRIVATE_REVIEWS
     * @permissionScope Manage Bookings Services and Settings
     * @permissionScopeId SCOPE.BOOKINGS.CONFIGURATION
     * @permissionScope Read reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.READ-REVIEWS
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @permissionScope Manage Portfolio
     * @permissionScopeId SCOPE.PORTFOLIO.MANAGE-PORTFOLIO
     * @permissionScope Manage Restaurants - all permissions
     * @permissionScopeId SCOPE.RESTAURANTS.MEGA-SCOPES
     * @permissionScope Manage Reviews
     * @permissionScopeId SCOPE.DC-REVIEWS.MANAGE-REVIEWS
     * @applicableIdentity APP
     * @applicableIdentity VISITOR
     * @fqn com.wixpress.critique.reviews.Reviews.CountReviews
     */
    function countReviews(options?: CountReviewsOptions): Promise<CountReviewsResponse>;
    interface CountReviewsOptions {
        filter?: Record<string, any> | null;
        /**
         * Whether to include private (unpublished) reviews in count results.
         *
         * Default: `false`
         */
        includePrivateReviews?: boolean;
    }
    type reviewsV1ReviewReviews_universal_d_Review = Review;
    type reviewsV1ReviewReviews_universal_d_ReviewContent = ReviewContent;
    type reviewsV1ReviewReviews_universal_d_Media = Media;
    type reviewsV1ReviewReviews_universal_d_MediaMediaOneOf = MediaMediaOneOf;
    type reviewsV1ReviewReviews_universal_d_VideoResolution = VideoResolution;
    type reviewsV1ReviewReviews_universal_d_Author = Author;
    type reviewsV1ReviewReviews_universal_d_AuthorType = AuthorType;
    const reviewsV1ReviewReviews_universal_d_AuthorType: typeof AuthorType;
    type reviewsV1ReviewReviews_universal_d_Reply = Reply;
    type reviewsV1ReviewReviews_universal_d_Moderation = Moderation;
    type reviewsV1ReviewReviews_universal_d_ModerationModerationStatus = ModerationModerationStatus;
    const reviewsV1ReviewReviews_universal_d_ModerationModerationStatus: typeof ModerationModerationStatus;
    type reviewsV1ReviewReviews_universal_d_Origin = Origin;
    type reviewsV1ReviewReviews_universal_d_OriginType = OriginType;
    const reviewsV1ReviewReviews_universal_d_OriginType: typeof OriginType;
    type reviewsV1ReviewReviews_universal_d_Source = Source;
    type reviewsV1ReviewReviews_universal_d_SourceSourceTypeOptionsOneOf = SourceSourceTypeOptionsOneOf;
    type reviewsV1ReviewReviews_universal_d_SourceType = SourceType;
    const reviewsV1ReviewReviews_universal_d_SourceType: typeof SourceType;
    type reviewsV1ReviewReviews_universal_d_ReviewRequestOptions = ReviewRequestOptions;
    type reviewsV1ReviewReviews_universal_d_RequestLinkOptions = RequestLinkOptions;
    type reviewsV1ReviewReviews_universal_d_DomainEvent = DomainEvent;
    type reviewsV1ReviewReviews_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
    type reviewsV1ReviewReviews_universal_d_EntityCreatedEvent = EntityCreatedEvent;
    type reviewsV1ReviewReviews_universal_d_RestoreInfo = RestoreInfo;
    type reviewsV1ReviewReviews_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
    type reviewsV1ReviewReviews_universal_d_EntityDeletedEvent = EntityDeletedEvent;
    type reviewsV1ReviewReviews_universal_d_ActionEvent = ActionEvent;
    type reviewsV1ReviewReviews_universal_d_Empty = Empty;
    type reviewsV1ReviewReviews_universal_d_MessageEnvelope = MessageEnvelope;
    type reviewsV1ReviewReviews_universal_d_IdentificationData = IdentificationData;
    type reviewsV1ReviewReviews_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
    type reviewsV1ReviewReviews_universal_d_WebhookIdentityType = WebhookIdentityType;
    const reviewsV1ReviewReviews_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
    type reviewsV1ReviewReviews_universal_d_GetReviewRequest = GetReviewRequest;
    type reviewsV1ReviewReviews_universal_d_GetReviewResponse = GetReviewResponse;
    type reviewsV1ReviewReviews_universal_d_GetDeletedReviewRequest = GetDeletedReviewRequest;
    type reviewsV1ReviewReviews_universal_d_GetDeletedReviewResponse = GetDeletedReviewResponse;
    type reviewsV1ReviewReviews_universal_d_CreateReviewAndContactRequest = CreateReviewAndContactRequest;
    type reviewsV1ReviewReviews_universal_d_CreateReviewResponse = CreateReviewResponse;
    type reviewsV1ReviewReviews_universal_d_CreateReviewRequest = CreateReviewRequest;
    type reviewsV1ReviewReviews_universal_d_ReviewPublished = ReviewPublished;
    type reviewsV1ReviewReviews_universal_d_BulkCreateReviewRequest = BulkCreateReviewRequest;
    type reviewsV1ReviewReviews_universal_d_BulkCreateReviewResponse = BulkCreateReviewResponse;
    type reviewsV1ReviewReviews_universal_d_BulkReviewResult = BulkReviewResult;
    type reviewsV1ReviewReviews_universal_d_ItemMetadata = ItemMetadata;
    type reviewsV1ReviewReviews_universal_d_ApplicationError = ApplicationError;
    type reviewsV1ReviewReviews_universal_d_BulkActionMetadata = BulkActionMetadata;
    type reviewsV1ReviewReviews_universal_d_UpdateReviewContentRequest = UpdateReviewContentRequest;
    type reviewsV1ReviewReviews_universal_d_UpdateReviewContentResponse = UpdateReviewContentResponse;
    type reviewsV1ReviewReviews_universal_d_ModerationStatusChanged = ModerationStatusChanged;
    type reviewsV1ReviewReviews_universal_d_UpdateReviewRequest = UpdateReviewRequest;
    type reviewsV1ReviewReviews_universal_d_UpdateReviewResponse = UpdateReviewResponse;
    type reviewsV1ReviewReviews_universal_d_DeleteReviewRequest = DeleteReviewRequest;
    type reviewsV1ReviewReviews_universal_d_DeleteReviewResponse = DeleteReviewResponse;
    type reviewsV1ReviewReviews_universal_d_BulkDeleteReviewsRequest = BulkDeleteReviewsRequest;
    type reviewsV1ReviewReviews_universal_d_BulkDeleteReviewsResponse = BulkDeleteReviewsResponse;
    type reviewsV1ReviewReviews_universal_d_QueryReviewsRequest = QueryReviewsRequest;
    type reviewsV1ReviewReviews_universal_d_QueryV2 = QueryV2;
    type reviewsV1ReviewReviews_universal_d_Sorting = Sorting;
    type reviewsV1ReviewReviews_universal_d_SortOrder = SortOrder;
    const reviewsV1ReviewReviews_universal_d_SortOrder: typeof SortOrder;
    type reviewsV1ReviewReviews_universal_d_CursorPaging = CursorPaging;
    type reviewsV1ReviewReviews_universal_d_QueryReviewsResponse = QueryReviewsResponse;
    type reviewsV1ReviewReviews_universal_d_PagingMetadataV2 = PagingMetadataV2;
    type reviewsV1ReviewReviews_universal_d_Cursors = Cursors;
    type reviewsV1ReviewReviews_universal_d_SetReplyRequest = SetReplyRequest;
    type reviewsV1ReviewReviews_universal_d_SetReplyResponse = SetReplyResponse;
    type reviewsV1ReviewReviews_universal_d_RemoveReplyRequest = RemoveReplyRequest;
    type reviewsV1ReviewReviews_universal_d_RemoveReplyResponse = RemoveReplyResponse;
    type reviewsV1ReviewReviews_universal_d_UpdateModerationStatusRequest = UpdateModerationStatusRequest;
    type reviewsV1ReviewReviews_universal_d_UpdateModerationStatusRequestModerationStatus = UpdateModerationStatusRequestModerationStatus;
    const reviewsV1ReviewReviews_universal_d_UpdateModerationStatusRequestModerationStatus: typeof UpdateModerationStatusRequestModerationStatus;
    type reviewsV1ReviewReviews_universal_d_UpdateModerationStatusResponse = UpdateModerationStatusResponse;
    type reviewsV1ReviewReviews_universal_d_BulkUpdateModerationStatusRequest = BulkUpdateModerationStatusRequest;
    type reviewsV1ReviewReviews_universal_d_ModerationStatus = ModerationStatus;
    const reviewsV1ReviewReviews_universal_d_ModerationStatus: typeof ModerationStatus;
    type reviewsV1ReviewReviews_universal_d_BulkUpdateModerationStatusResponse = BulkUpdateModerationStatusResponse;
    type reviewsV1ReviewReviews_universal_d_CountReviewsRequest = CountReviewsRequest;
    type reviewsV1ReviewReviews_universal_d_CountReviewsResponse = CountReviewsResponse;
    const reviewsV1ReviewReviews_universal_d_getReview: typeof getReview;
    type reviewsV1ReviewReviews_universal_d_GetReviewOptions = GetReviewOptions;
    const reviewsV1ReviewReviews_universal_d_createReviewAndContact: typeof createReviewAndContact;
    type reviewsV1ReviewReviews_universal_d_CreateReviewAndContactOptions = CreateReviewAndContactOptions;
    const reviewsV1ReviewReviews_universal_d_createReview: typeof createReview;
    type reviewsV1ReviewReviews_universal_d_BulkCreateReviewOptions = BulkCreateReviewOptions;
    type reviewsV1ReviewReviews_universal_d_UpdateReviewContentOptions = UpdateReviewContentOptions;
    const reviewsV1ReviewReviews_universal_d_updateReview: typeof updateReview;
    type reviewsV1ReviewReviews_universal_d_UpdateReview = UpdateReview;
    type reviewsV1ReviewReviews_universal_d_UpdateReviewOptions = UpdateReviewOptions;
    const reviewsV1ReviewReviews_universal_d_deleteReview: typeof deleteReview;
    type reviewsV1ReviewReviews_universal_d_BulkDeleteReviewsOptions = BulkDeleteReviewsOptions;
    const reviewsV1ReviewReviews_universal_d_queryReviews: typeof queryReviews;
    type reviewsV1ReviewReviews_universal_d_QueryReviewsOptions = QueryReviewsOptions;
    type reviewsV1ReviewReviews_universal_d_ReviewsQueryResult = ReviewsQueryResult;
    type reviewsV1ReviewReviews_universal_d_ReviewsQueryBuilder = ReviewsQueryBuilder;
    const reviewsV1ReviewReviews_universal_d_setReply: typeof setReply;
    const reviewsV1ReviewReviews_universal_d_removeReply: typeof removeReply;
    type reviewsV1ReviewReviews_universal_d_UpdateModerationStatusOptions = UpdateModerationStatusOptions;
    type reviewsV1ReviewReviews_universal_d_BulkUpdateModerationStatusOptions = BulkUpdateModerationStatusOptions;
    const reviewsV1ReviewReviews_universal_d_countReviews: typeof countReviews;
    type reviewsV1ReviewReviews_universal_d_CountReviewsOptions = CountReviewsOptions;
    namespace reviewsV1ReviewReviews_universal_d {
        export { reviewsV1ReviewReviews_universal_d_Review as Review, reviewsV1ReviewReviews_universal_d_ReviewContent as ReviewContent, reviewsV1ReviewReviews_universal_d_Media as Media, reviewsV1ReviewReviews_universal_d_MediaMediaOneOf as MediaMediaOneOf, reviewsV1ReviewReviews_universal_d_VideoResolution as VideoResolution, reviewsV1ReviewReviews_universal_d_Author as Author, reviewsV1ReviewReviews_universal_d_AuthorType as AuthorType, reviewsV1ReviewReviews_universal_d_Reply as Reply, reviewsV1ReviewReviews_universal_d_Moderation as Moderation, reviewsV1ReviewReviews_universal_d_ModerationModerationStatus as ModerationModerationStatus, reviewsV1ReviewReviews_universal_d_Origin as Origin, reviewsV1ReviewReviews_universal_d_OriginType as OriginType, reviewsV1ReviewReviews_universal_d_Source as Source, reviewsV1ReviewReviews_universal_d_SourceSourceTypeOptionsOneOf as SourceSourceTypeOptionsOneOf, reviewsV1ReviewReviews_universal_d_SourceType as SourceType, reviewsV1ReviewReviews_universal_d_ReviewRequestOptions as ReviewRequestOptions, reviewsV1ReviewReviews_universal_d_RequestLinkOptions as RequestLinkOptions, reviewsV1ReviewReviews_universal_d_DomainEvent as DomainEvent, reviewsV1ReviewReviews_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf, reviewsV1ReviewReviews_universal_d_EntityCreatedEvent as EntityCreatedEvent, reviewsV1ReviewReviews_universal_d_RestoreInfo as RestoreInfo, reviewsV1ReviewReviews_universal_d_EntityUpdatedEvent as EntityUpdatedEvent, reviewsV1ReviewReviews_universal_d_EntityDeletedEvent as EntityDeletedEvent, reviewsV1ReviewReviews_universal_d_ActionEvent as ActionEvent, reviewsV1ReviewReviews_universal_d_Empty as Empty, reviewsV1ReviewReviews_universal_d_MessageEnvelope as MessageEnvelope, reviewsV1ReviewReviews_universal_d_IdentificationData as IdentificationData, reviewsV1ReviewReviews_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf, reviewsV1ReviewReviews_universal_d_WebhookIdentityType as WebhookIdentityType, reviewsV1ReviewReviews_universal_d_GetReviewRequest as GetReviewRequest, reviewsV1ReviewReviews_universal_d_GetReviewResponse as GetReviewResponse, reviewsV1ReviewReviews_universal_d_GetDeletedReviewRequest as GetDeletedReviewRequest, reviewsV1ReviewReviews_universal_d_GetDeletedReviewResponse as GetDeletedReviewResponse, reviewsV1ReviewReviews_universal_d_CreateReviewAndContactRequest as CreateReviewAndContactRequest, reviewsV1ReviewReviews_universal_d_CreateReviewResponse as CreateReviewResponse, reviewsV1ReviewReviews_universal_d_CreateReviewRequest as CreateReviewRequest, reviewsV1ReviewReviews_universal_d_ReviewPublished as ReviewPublished, reviewsV1ReviewReviews_universal_d_BulkCreateReviewRequest as BulkCreateReviewRequest, reviewsV1ReviewReviews_universal_d_BulkCreateReviewResponse as BulkCreateReviewResponse, reviewsV1ReviewReviews_universal_d_BulkReviewResult as BulkReviewResult, reviewsV1ReviewReviews_universal_d_ItemMetadata as ItemMetadata, reviewsV1ReviewReviews_universal_d_ApplicationError as ApplicationError, reviewsV1ReviewReviews_universal_d_BulkActionMetadata as BulkActionMetadata, reviewsV1ReviewReviews_universal_d_UpdateReviewContentRequest as UpdateReviewContentRequest, reviewsV1ReviewReviews_universal_d_UpdateReviewContentResponse as UpdateReviewContentResponse, reviewsV1ReviewReviews_universal_d_ModerationStatusChanged as ModerationStatusChanged, reviewsV1ReviewReviews_universal_d_UpdateReviewRequest as UpdateReviewRequest, reviewsV1ReviewReviews_universal_d_UpdateReviewResponse as UpdateReviewResponse, reviewsV1ReviewReviews_universal_d_DeleteReviewRequest as DeleteReviewRequest, reviewsV1ReviewReviews_universal_d_DeleteReviewResponse as DeleteReviewResponse, reviewsV1ReviewReviews_universal_d_BulkDeleteReviewsRequest as BulkDeleteReviewsRequest, reviewsV1ReviewReviews_universal_d_BulkDeleteReviewsResponse as BulkDeleteReviewsResponse, reviewsV1ReviewReviews_universal_d_QueryReviewsRequest as QueryReviewsRequest, reviewsV1ReviewReviews_universal_d_QueryV2 as QueryV2, reviewsV1ReviewReviews_universal_d_Sorting as Sorting, reviewsV1ReviewReviews_universal_d_SortOrder as SortOrder, reviewsV1ReviewReviews_universal_d_CursorPaging as CursorPaging, reviewsV1ReviewReviews_universal_d_QueryReviewsResponse as QueryReviewsResponse, reviewsV1ReviewReviews_universal_d_PagingMetadataV2 as PagingMetadataV2, reviewsV1ReviewReviews_universal_d_Cursors as Cursors, reviewsV1ReviewReviews_universal_d_SetReplyRequest as SetReplyRequest, reviewsV1ReviewReviews_universal_d_SetReplyResponse as SetReplyResponse, reviewsV1ReviewReviews_universal_d_RemoveReplyRequest as RemoveReplyRequest, reviewsV1ReviewReviews_universal_d_RemoveReplyResponse as RemoveReplyResponse, reviewsV1ReviewReviews_universal_d_UpdateModerationStatusRequest as UpdateModerationStatusRequest, reviewsV1ReviewReviews_universal_d_UpdateModerationStatusRequestModerationStatus as UpdateModerationStatusRequestModerationStatus, reviewsV1ReviewReviews_universal_d_UpdateModerationStatusResponse as UpdateModerationStatusResponse, reviewsV1ReviewReviews_universal_d_BulkUpdateModerationStatusRequest as BulkUpdateModerationStatusRequest, reviewsV1ReviewReviews_universal_d_ModerationStatus as ModerationStatus, reviewsV1ReviewReviews_universal_d_BulkUpdateModerationStatusResponse as BulkUpdateModerationStatusResponse, reviewsV1ReviewReviews_universal_d_CountReviewsRequest as CountReviewsRequest, reviewsV1ReviewReviews_universal_d_CountReviewsResponse as CountReviewsResponse, reviewsV1ReviewReviews_universal_d_getReview as getReview, reviewsV1ReviewReviews_universal_d_GetReviewOptions as GetReviewOptions, reviewsV1ReviewReviews_universal_d_createReviewAndContact as createReviewAndContact, reviewsV1ReviewReviews_universal_d_CreateReviewAndContactOptions as CreateReviewAndContactOptions, reviewsV1ReviewReviews_universal_d_createReview as createReview, reviewsV1ReviewReviews_universal_d_BulkCreateReviewOptions as BulkCreateReviewOptions, reviewsV1ReviewReviews_universal_d_UpdateReviewContentOptions as UpdateReviewContentOptions, reviewsV1ReviewReviews_universal_d_updateReview as updateReview, reviewsV1ReviewReviews_universal_d_UpdateReview as UpdateReview, reviewsV1ReviewReviews_universal_d_UpdateReviewOptions as UpdateReviewOptions, reviewsV1ReviewReviews_universal_d_deleteReview as deleteReview, reviewsV1ReviewReviews_universal_d_BulkDeleteReviewsOptions as BulkDeleteReviewsOptions, reviewsV1ReviewReviews_universal_d_queryReviews as queryReviews, reviewsV1ReviewReviews_universal_d_QueryReviewsOptions as QueryReviewsOptions, reviewsV1ReviewReviews_universal_d_ReviewsQueryResult as ReviewsQueryResult, reviewsV1ReviewReviews_universal_d_ReviewsQueryBuilder as ReviewsQueryBuilder, reviewsV1ReviewReviews_universal_d_setReply as setReply, reviewsV1ReviewReviews_universal_d_removeReply as removeReply, reviewsV1ReviewReviews_universal_d_UpdateModerationStatusOptions as UpdateModerationStatusOptions, reviewsV1ReviewReviews_universal_d_BulkUpdateModerationStatusOptions as BulkUpdateModerationStatusOptions, reviewsV1ReviewReviews_universal_d_countReviews as countReviews, reviewsV1ReviewReviews_universal_d_CountReviewsOptions as CountReviewsOptions, };
    }
    export { reviewsV1ReviewReviews_universal_d as reviews };
}
