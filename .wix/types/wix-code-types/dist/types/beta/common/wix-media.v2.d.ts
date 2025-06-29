declare module "wix-media.v2" {
  interface EnterpriseCategory {
      /**
       * Id of the category
       * @readonly
       */
      _id?: string;
      /** The display name that will be shown for the item */
      displayName?: string | null;
      /** Id of the parent category, will default to the account master category */
      parentCategoryId?: string | null;
      /** Sort order number of the category, will determine the order of the category with other categories under the same parent category */
      sortOrder?: number | null;
      /** Publish status of the category */
      publishStatus?: PublishStatus$1;
      /**
       * Date and time the category was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the category was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * the media type of the category - should be ignored - will add mixed
       * @internal
       */
      mediaType?: MediaType$3;
  }
  enum PublishStatus$1 {
      UNDEFINED = "UNDEFINED",
      UNPUBLISHED = "UNPUBLISHED",
      PUBLISHED = "PUBLISHED",
      WIX_ONLY = "WIX_ONLY"
  }
  enum MediaType$3 {
      MIXED = "MIXED",
      IMAGE = "IMAGE",
      VIDEO = "VIDEO",
      AUDIO = "AUDIO",
      DOCUMENT = "DOCUMENT",
      VECTOR = "VECTOR",
      ARCHIVE = "ARCHIVE",
      MODEL3D = "MODEL3D"
  }
  interface CreateCategoryRequest {
      /** The category object that will be created */
      category: EnterpriseCategory;
  }
  interface CreateCategoryResponse {
      /** A list of items matching the request */
      category?: EnterpriseCategory;
  }
  interface DeleteCategoryRequest {
      /** Category id */
      categoryId: string;
  }
  interface DeleteCategoryResponse {
  }
  interface UpdateCategoryRequest {
      /** The category object that will be created */
      category: EnterpriseCategory;
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateCategoryResponse {
      /** The updated category */
      category?: EnterpriseCategory;
  }
  interface GetCategoryRequest {
      /** Category id */
      categoryId: string;
      /** number of sub category levels */
      levels?: number | null;
      /** filter categories by publish statuses. When empty will return PUBLISHED and UNPUBLISHED */
      publishStatus?: PublishStatus$1;
  }
  interface GetCategoryResponse {
      /** The category details */
      category?: EnterpriseCategoryTree;
  }
  interface EnterpriseCategoryTree {
      /** Category information */
      category?: EnterpriseCategory;
      /** Information about the sub categories */
      subCategories?: EnterpriseCategoryTree[];
  }
  interface EnterpriseOnboardingRequest {
      /** The account id of the organization - will be used as the organization category id */
      accountId: string;
      /** The account name of the organization - will be used as the organization category name */
      accountName?: string;
  }
  interface EnterpriseOnboardingResponse {
      /** The enterprise category */
      category?: EnterpriseCategory;
  }
  interface LinkItemsToCategoryRequest {
      /** The category to link to */
      categoryId: string;
      /** The item ids that will be added to the category */
      itemIds?: string[];
  }
  interface LinkItemsToCategoryResponse {
  }
  interface UnlinkItemsFromCategoryRequest {
      /** The category to link to */
      categoryId: string;
      /** The item ids that will be added to the category */
      itemIds?: string[];
  }
  interface UnlinkItemsFromCategoryResponse {
  }
  interface GetMediaManagerCategoriesRequest {
  }
  interface GetMediaManagerCategoriesResponse {
      /** The category details */
      category?: EnterpriseCategoryTree;
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
      /** Event timestamp. */
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
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
  }
  interface EntityUpdatedEvent$3 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
  }
  interface EntityDeletedEvent$3 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
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
   * Fetch a list of random media from different providers, using site information to customize results when available
   * @param category - The category object that will be created
   * @public
   * @documentationMaturity preview
   * @requiredField category
   * @requiredField category.displayName
   * @permissionId MEDIA.ENTERPRISE_MEDIA_CATEGORIES_CREATE
   * @adminMethod
   * @returns A list of items matching the request
   */
  function createCategory(category: EnterpriseCategory): Promise<EnterpriseCategory>;
  /**
   * Delete a category including all its subcategories - but not the items
   * @param categoryId - Category id
   * @public
   * @documentationMaturity preview
   * @requiredField categoryId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_CATEGORIES_DELETE
   * @adminMethod
   */
  function deleteCategory(categoryId: string): Promise<void>;
  /**
   * Update category details
   * @param _id - Id of the category
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField category
   * @permissionId MEDIA.ENTERPRISE_MEDIA_CATEGORIES_UPDATE
   * @adminMethod
   * @returns The updated category
   */
  function updateCategory(_id: string, category: UpdateCategory, options?: UpdateCategoryOptions): Promise<EnterpriseCategory>;
  interface UpdateCategory {
      /**
       * Id of the category
       * @readonly
       */
      _id?: string;
      /** The display name that will be shown for the item */
      displayName?: string | null;
      /** Id of the parent category, will default to the account master category */
      parentCategoryId?: string | null;
      /** Sort order number of the category, will determine the order of the category with other categories under the same parent category */
      sortOrder?: number | null;
      /** Publish status of the category */
      publishStatus?: PublishStatus$1;
      /**
       * Date and time the category was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the category was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * the media type of the category - should be ignored - will add mixed
       * @internal
       */
      mediaType?: MediaType$3;
  }
  interface UpdateCategoryOptions {
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Get information about a specific category
   * @param categoryId - Category id
   * @public
   * @documentationMaturity preview
   * @requiredField categoryId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_CATEGORIES_READ
   * @adminMethod
   * @returns The category details
   */
  function getCategory(categoryId: string, options?: GetCategoryOptions): Promise<EnterpriseCategoryTree>;
  interface GetCategoryOptions {
      /** number of sub category levels */
      levels?: number | null;
      /** filter categories by publish statuses. When empty will return PUBLISHED and UNPUBLISHED */
      publishStatus?: PublishStatus$1;
  }
  /**
   * Create the enterprise category under "enterprise-media" main category
   * the caller identity must be have the same accountId of the request
   * @param accountId - The account id of the organization - will be used as the organization category id
   * @public
   * @documentationMaturity preview
   * @requiredField accountId
   * @adminMethod
   */
  function enterpriseOnboarding(accountId: string, options?: EnterpriseOnboardingOptions): Promise<EnterpriseOnboardingResponse>;
  interface EnterpriseOnboardingOptions {
      /** The account name of the organization - will be used as the organization category name */
      accountName?: string;
  }
  /**
   * link multiple items to the same category
   * @param categoryId - The category to link to
   * @internal
   * @documentationMaturity preview
   * @requiredField categoryId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_CATEGORIES_UPDATE_ITEMS
   * @adminMethod
   */
  function linkItemsToCategory(categoryId: string, options?: LinkItemsToCategoryOptions): Promise<void>;
  interface LinkItemsToCategoryOptions {
      /** The item ids that will be added to the category */
      itemIds?: string[];
  }
  /**
   * unlink multiple items from a category
   * @param categoryId - The category to link to
   * @internal
   * @documentationMaturity preview
   * @requiredField categoryId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_CATEGORIES_UPDATE_ITEMS
   * @adminMethod
   */
  function unlinkItemsFromCategory(categoryId: string, options?: UnlinkItemsFromCategoryOptions): Promise<void>;
  interface UnlinkItemsFromCategoryOptions {
      /** The item ids that will be added to the category */
      itemIds?: string[];
  }
  /**
   * Get the account category tree details
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function getMediaManagerCategories(): Promise<GetMediaManagerCategoriesResponse>;
  
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseCategory = EnterpriseCategory;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_CreateCategoryRequest = CreateCategoryRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_CreateCategoryResponse = CreateCategoryResponse;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_DeleteCategoryRequest = DeleteCategoryRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_DeleteCategoryResponse = DeleteCategoryResponse;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategoryRequest = UpdateCategoryRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategoryResponse = UpdateCategoryResponse;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetCategoryRequest = GetCategoryRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetCategoryResponse = GetCategoryResponse;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseCategoryTree = EnterpriseCategoryTree;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseOnboardingRequest = EnterpriseOnboardingRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseOnboardingResponse = EnterpriseOnboardingResponse;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_LinkItemsToCategoryRequest = LinkItemsToCategoryRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_LinkItemsToCategoryResponse = LinkItemsToCategoryResponse;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UnlinkItemsFromCategoryRequest = UnlinkItemsFromCategoryRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UnlinkItemsFromCategoryResponse = UnlinkItemsFromCategoryResponse;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetMediaManagerCategoriesRequest = GetMediaManagerCategoriesRequest;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetMediaManagerCategoriesResponse = GetMediaManagerCategoriesResponse;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_createCategory: typeof createCategory;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_deleteCategory: typeof deleteCategory;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_updateCategory: typeof updateCategory;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategory = UpdateCategory;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategoryOptions = UpdateCategoryOptions;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_getCategory: typeof getCategory;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetCategoryOptions = GetCategoryOptions;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_enterpriseOnboarding: typeof enterpriseOnboarding;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseOnboardingOptions = EnterpriseOnboardingOptions;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_linkItemsToCategory: typeof linkItemsToCategory;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_LinkItemsToCategoryOptions = LinkItemsToCategoryOptions;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_unlinkItemsFromCategory: typeof unlinkItemsFromCategory;
  type mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UnlinkItemsFromCategoryOptions = UnlinkItemsFromCategoryOptions;
  const mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_getMediaManagerCategories: typeof getMediaManagerCategories;
  namespace mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d {
    export {
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseCategory as EnterpriseCategory,
      PublishStatus$1 as PublishStatus,
      MediaType$3 as MediaType,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_CreateCategoryRequest as CreateCategoryRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_CreateCategoryResponse as CreateCategoryResponse,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_DeleteCategoryRequest as DeleteCategoryRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_DeleteCategoryResponse as DeleteCategoryResponse,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategoryRequest as UpdateCategoryRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategoryResponse as UpdateCategoryResponse,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetCategoryRequest as GetCategoryRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetCategoryResponse as GetCategoryResponse,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseCategoryTree as EnterpriseCategoryTree,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseOnboardingRequest as EnterpriseOnboardingRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseOnboardingResponse as EnterpriseOnboardingResponse,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_LinkItemsToCategoryRequest as LinkItemsToCategoryRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_LinkItemsToCategoryResponse as LinkItemsToCategoryResponse,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UnlinkItemsFromCategoryRequest as UnlinkItemsFromCategoryRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UnlinkItemsFromCategoryResponse as UnlinkItemsFromCategoryResponse,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetMediaManagerCategoriesRequest as GetMediaManagerCategoriesRequest,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetMediaManagerCategoriesResponse as GetMediaManagerCategoriesResponse,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_createCategory as createCategory,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_deleteCategory as deleteCategory,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_updateCategory as updateCategory,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategory as UpdateCategory,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UpdateCategoryOptions as UpdateCategoryOptions,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_getCategory as getCategory,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_GetCategoryOptions as GetCategoryOptions,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_enterpriseOnboarding as enterpriseOnboarding,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_EnterpriseOnboardingOptions as EnterpriseOnboardingOptions,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_linkItemsToCategory as linkItemsToCategory,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_LinkItemsToCategoryOptions as LinkItemsToCategoryOptions,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_unlinkItemsFromCategory as unlinkItemsFromCategory,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_UnlinkItemsFromCategoryOptions as UnlinkItemsFromCategoryOptions,
      mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d_getMediaManagerCategories as getMediaManagerCategories,
    };
  }
  
  /**
   * Duration for video fits better if there will be type specific media item.. however, is it ok to implement
   * an additional one of field called details?
   */
  interface EnterpriseMediaItem {
      /**
       * Id of the item in public media
       * @readonly
       */
      _id?: string;
      /**
       * Media type of the item
       * @readonly
       */
      mediaType?: MediaType$2;
      /**
       * Size of the uploaded file in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /** The item title, part of searchable fields */
      title?: string | null;
      /**
       * The aspect ratio of the item
       * An object containing urls for different views of the item
       * @readonly
       */
      assets?: ItemAssets;
      /** Tags describing the image, part of searchable fields */
      displayTags?: string[] | null;
      /** Tags for internal client use, part of searchable fields */
      internalTags?: string[] | null;
      /**
       * Tags for filtering items in the search
       * @readonly
       */
      systemTags?: string[] | null;
      /**
       * Category ids this item belongs to
       * @readonly
       */
      parentCategoryIds?: string[] | null;
      /** Status of the item */
      publishStatus?: PublishStatus;
      /**
       * Date and time the item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * An internal id used with different wix media systems
       * @readonly
       */
      internalId?: string | null;
  }
  enum MediaType$2 {
      MIXED = "MIXED",
      IMAGE = "IMAGE",
      VIDEO = "VIDEO",
      AUDIO = "AUDIO",
      DOCUMENT = "DOCUMENT",
      VECTOR = "VECTOR",
      ARCHIVE = "ARCHIVE",
      MODEL3D = "MODEL3D"
  }
  interface ItemAssets extends ItemAssetsAssetsOneOf {
      /** Assets for image media type */
      image?: string;
      /** Assets for video media type */
      video?: string;
      /** Assets for vector media type */
      vector?: string;
      /** Assets for audio media type */
      audio?: string;
      /** Assets for document media type */
      document?: string;
      /** Information about the archive. */
      archive?: Archive$2;
      /** Information about the 3D Model. */
      model3d?: Model3D$2;
  }
  /** @oneof */
  interface ItemAssetsAssetsOneOf {
      /** Assets for image media type */
      image?: string;
      /** Assets for video media type */
      video?: string;
      /** Assets for vector media type */
      vector?: string;
      /** Assets for audio media type */
      audio?: string;
      /** Assets for document media type */
      document?: string;
      /** Information about the archive. */
      archive?: Archive$2;
      /** Information about the 3D Model. */
      model3d?: Model3D$2;
  }
  interface VideoResolution$2 {
      /** Video URL. */
      url?: string;
      /** Video height. */
      height?: number;
      /** Video width. */
      width?: number;
      /**
       * Deprecated. Use the `posters` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      poster?: string;
      /**
       * Video format
       * Possible values: ['144p.mp4' '144p.webm' '240p.mp4' '240p.webm' '360p.mp4' '360p.webm' '480p.mp4' '480p.webm'
       * '720p.mp4' '720p.webm' '1080p.mp4' '1080p.webm' ]
       */
      format?: string;
      /**
       * Deprecated. Use the `urlExpirationDate` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      urlExpirationDate?: Date | null;
      /**
       * Deprecated. Use the `sizeInBytes` property in the parent entity instead. Size cannot be provided per resolution.
       * @internal
       * @deprecated
       */
      sizeInBytes?: string | null;
      /**
       * Video quality. For example: 480p, 720p.
       * @internal
       */
      quality?: string | null;
      /**
       * Video filename.
       * @internal
       */
      filename?: string | null;
      /**
       * Video duration in seconds.
       * @internal
       * @readonly
       */
      durationInSeconds?: number | null;
      /**
       * When true, this is a protected asset, and calling the URL will return a 403 error.
       * In order to access private assets, make a request to:
       * `GenerateFileDownloadUrl` with the WixMedia id and specify the asset_key in the request
       * @internal
       * @readonly
       */
      private?: boolean | null;
      /**
       * Key to identify the video resolution's relationship to the original media in WixMedia.
       * Can be used to request a download for the specific video resolution.
       * For example: 480p.mp4, 720p.mp4, 1080p.mp4, trailer-720p.mp4, clip-720p.mp4
       * @internal
       * @readonly
       */
      assetKey?: string | null;
  }
  interface Archive$2 {
      /** WixMedia ID. */
      _id?: string;
      /** Archive URL. */
      url?: string;
      /**
       * Archive URL expiration date (when relevant).
       * @readonly
       */
      urlExpirationDate?: Date | null;
      /** Archive size in bytes. */
      sizeInBytes?: string | null;
      /** Archive filename. */
      filename?: string | null;
  }
  interface Model3D$2 {
      /** WixMedia 3D ID. */
      _id?: string;
      /** 3D URL. */
      url?: string;
      /** 3D thumbnail Image */
      thumbnail?: string;
      /** 3D alt text. */
      altText?: string | null;
      /**
       * 3D URL expiration date (when relevant).
       * @readonly
       */
      urlExpirationDate?: Date | null;
      /**
       * 3D filename.
       * @readonly
       */
      filename?: string | null;
      /**
       * 3D size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
  }
  enum PublishStatus {
      UNDEFINED = "UNDEFINED",
      UNPUBLISHED = "UNPUBLISHED",
      PUBLISHED = "PUBLISHED",
      WIX_ONLY = "WIX_ONLY"
  }
  interface ItemCategoriesChanged {
      /** A list of the current item categories */
      itemCategoryIds?: string[] | null;
      /** A list of the categories that where unlinked from the item */
      unlinkedCategoryIds?: string[] | null;
      /** A list of the categories that where linked to the item */
      linkedCategoryIds?: string[] | null;
      /** The full updated item information */
      entity?: EnterpriseMediaItem;
  }
  interface ItemUploadCallbackRequest {
      /** The item id of the created item */
      itemId?: string;
      /** The callback passed to the upload endpoint */
      callbackToken?: string;
  }
  interface ItemUploadCallbackResponse {
      /** A message describing what happened on the endpoint */
      message?: string | null;
  }
  interface GenerateFileUploadUrlRequest$1 {
      /** The uploaded original file name including the extension */
      fileName?: string;
      /** The file mime-type - will be used to identify the type of media */
      contentType?: string;
      /** The file size in bytes */
      sizeInBytes?: number;
      /**
       * An optional list of categories to link the created item to
       * The item will be linked to the account category automatically
       */
      categoryIds?: string[] | null;
  }
  interface GenerateFileUploadUrlResponse$1 {
      /** The upload url to upload the file to */
      uploadUrl?: string;
  }
  interface ImportFileRequest$1 {
      /** The url to the file to be imported */
      url: string;
      /** The uploaded original file name including the extension - will be used as the initial display name */
      fileName?: string | null;
      /** The file mime-type - will be used to identify the type of media */
      contentType?: string | null;
      /** The file size in bytes */
      sizeInBytes?: number | null;
      /**
       * An optional list of categories to link the created item to
       * The item will be linked to the account category automatically
       */
      categoryIds?: string[] | null;
      /** The media type of the uploaded file */
      mediaType?: MediaType$2;
      /**
       * A unique identifier of the client that imported the file
       * This information will exist in the system_tags field prefixed by '_external_uploader:{uploader_system_tag}'
       */
      uploaderSystemTag?: string | null;
      /**
       * An additional container for external information
       * mostly used to pass identifying information of related entities in external services
       * This information will exist in the system_tags field prefixed by '_external_uploader_info:{uploader_info_system_tag}'
       */
      uploaderInfoSystemTag?: string | null;
  }
  interface ImportFileResponse$1 {
      /**
       * Partial item - without the assets
       * At this stage of implementation only the 'internal_id' will be filled
       * all other required values will be fake values
       */
      item?: EnterpriseMediaItem;
  }
  interface BulkImportFilesRequest$1 {
      /** Information about the files to import. */
      importFileRequests: ImportFileRequest$1[];
      /**
       * Whether to include the imported File Descriptor in the response. Set to `false` to exclude the File Descriptor from the returned object.
       * Default: `true`
       */
      returnEntity?: boolean | null;
      /**
       * An optional list of categories to link all the items to
       * The item will be linked to the account category automatically
       */
      categoryIds?: string[] | null;
  }
  interface BulkImportFilesResponse$1 {
      /** Items created by bulk action. */
      results?: BulkImportFilesResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkImportFilesResult {
      /** Item metadata. */
      itemMetadata?: ItemMetadata$1;
      /** Imported file. This field is returned if the operation was successful and `returnEntity` is not set to `false`. */
      item?: EnterpriseMediaItem;
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
  interface BulkActionMetadata$1 {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface SearchItemsRequest {
      /** Items search query */
      query?: Search;
  }
  interface Search extends SearchPagingMethodOneOf {
      /** Pointer to page of results using offset. Can not be used together with 'cursor_paging' */
      paging?: Paging;
      /** A filter object. See documentation [here](https://bo.wix.com/wix-docs/rnd/platformization-guidelines/api-query-language#platformization-guidelines_api-query-language_defining-in-protobuf) */
      filter?: Record<string, any> | null;
      /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
      sort?: Sorting$3[];
      /** free text to match in searchable fields */
      search?: SearchDetails;
  }
  /** @oneof */
  interface SearchPagingMethodOneOf {
      /** Pointer to page of results using offset. Can not be used together with 'cursor_paging' */
      paging?: Paging;
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
  interface SearchDetails {
      /** search term or expression */
      expression?: string | null;
  }
  interface Paging {
      /** Number of items to load. */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface SearchItemsResponse {
      /** A list of items matching the request */
      items?: EnterpriseMediaItem[];
      /** Information about the search results. */
      pagingMetadata?: PagingMetadataV2$3;
  }
  interface PagingMetadataV2$3 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$3;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$3 {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
  }
  interface QueryItemsRequest {
      /** Items query */
      query?: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
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
      sort?: Sorting$3[];
  }
  /** @oneof */
  interface QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
  }
  interface QueryItemsResponse {
      /** A list of items matching the request */
      items?: EnterpriseMediaItem[];
      /** Information for the next request. */
      pagingMetadata?: PagingMetadataV2$3;
  }
  interface UpdateItemRequest {
      /** The category object that will be created */
      item: EnterpriseMediaItem;
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateItemResponse {
      /** Updated item info */
      item?: EnterpriseMediaItem;
  }
  interface PublishStatusChanged {
      /** The new item status */
      publishStatus?: PublishStatus;
      /** The full updated item information */
      entity?: EnterpriseMediaItem;
  }
  interface BulkUpdateItemRequest {
      /** Requests to update individual item */
      updateItemRequests: UpdateItemRequest[];
      /** Should the response return the updated item */
      returnEntity?: boolean;
  }
  interface BulkUpdateItemResponse {
      /** Requests to update individual item */
      results?: BulkItemUpdateResult[];
      /** Metadata of the operation */
      bulkActionMetadata?: BulkActionMetadata$1;
  }
  interface BulkItemUpdateResult {
      /** updated item metadata */
      itemMetadata?: ItemMetadata$1;
      /** only returned if operation was successful and if returnEntity flag was on */
      item?: EnterpriseMediaItem;
  }
  interface GetItemRequest {
      /** Item id */
      itemId: string;
  }
  interface GetItemResponse {
      /** item info */
      item?: EnterpriseMediaItem;
  }
  interface LinkItemToCategoriesRequest {
      /** The item id */
      itemId: string;
      /** The category ids that the item will be linked to */
      categoryIds?: string[];
  }
  interface LinkItemToCategoriesResponse {
      /** The linked category ids */
      linkedCategoryIds?: string[] | null;
  }
  interface UnlinkItemFromCategoriesRequest {
      /** The item id */
      itemId: string;
      /** The category ids that the item will be unlinked from */
      categoryIds?: string[];
  }
  interface UnlinkItemFromCategoriesResponse {
      /** The unlinked category ids */
      unlinkedCategoryIds?: string[] | null;
  }
  interface OverwriteItemCategoriesRequest {
      /** The item id */
      itemId: string;
      /** The category ids the item will be linked to after this operation */
      categoryIds?: string[];
  }
  interface OverwriteItemCategoriesResponse {
      /** The linked category ids */
      linkedCategoryIds?: string[] | null;
      /** The unlinked category ids */
      unlinkedCategoryIds?: string[] | null;
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
  interface DomainEventBodyOneOf$2 {
      createdEvent?: EntityCreatedEvent$2;
      updatedEvent?: EntityUpdatedEvent$2;
      deletedEvent?: EntityDeletedEvent$2;
      actionEvent?: ActionEvent$2;
  }
  interface EntityCreatedEvent$2 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$2;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$2 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$2 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent$2 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface ActionEvent$2 {
      bodyAsJson?: string;
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
   * Internal API called by the public media backend, notify about a file that was created enterprise public media server
   * @public
   * @documentationMaturity preview
   * @adminMethod
   */
  function itemUploadCallback(options?: ItemUploadCallbackOptions): Promise<ItemUploadCallbackResponse>;
  interface ItemUploadCallbackOptions {
      /** The item id of the created item */
      itemId?: string;
      /** The callback passed to the upload endpoint */
      callbackToken?: string;
  }
  /**
   * Generate an upload url that will make public media to call the enterprise callback endpoint
   * @public
   * @documentationMaturity preview
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_GENERATE_UPLOAD_URL
   * @adminMethod
   */
  function generateFileUploadUrl$1(options?: GenerateFileUploadUrlOptions$1): Promise<GenerateFileUploadUrlResponse$1>;
  interface GenerateFileUploadUrlOptions$1 {
      /** The uploaded original file name including the extension */
      fileName?: string;
      /** The file mime-type - will be used to identify the type of media */
      contentType?: string;
      /** The file size in bytes */
      sizeInBytes?: number;
      /**
       * An optional list of categories to link the created item to
       * The item will be linked to the account category automatically
       */
      categoryIds?: string[] | null;
  }
  /**
   * Import a file using a url
   * @param url - The url to the file to be imported
   * @public
   * @documentationMaturity preview
   * @requiredField url
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_IMPORT
   * @adminMethod
   */
  function importFile$1(url: string, options?: ImportFileOptions$1): Promise<ImportFileResponse$1>;
  interface ImportFileOptions$1 {
      /** The uploaded original file name including the extension - will be used as the initial display name */
      fileName?: string | null;
      /** The file mime-type - will be used to identify the type of media */
      contentType?: string | null;
      /** The file size in bytes */
      sizeInBytes?: number | null;
      /**
       * An optional list of categories to link the created item to
       * The item will be linked to the account category automatically
       */
      categoryIds?: string[] | null;
      /** The media type of the uploaded file */
      mediaType?: MediaType$2;
      /**
       * A unique identifier of the client that imported the file
       * This information will exist in the system_tags field prefixed by '_external_uploader:{uploader_system_tag}'
       */
      uploaderSystemTag?: string | null;
      /**
       * An additional container for external information
       * mostly used to pass identifying information of related entities in external services
       * This information will exist in the system_tags field prefixed by '_external_uploader_info:{uploader_info_system_tag}'
       */
      uploaderInfoSystemTag?: string | null;
  }
  /** @param importFileRequests - Information about the files to import.
   * @public
   * @documentationMaturity preview
   * @requiredField importFileRequests
   * @requiredField importFileRequests.url
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_IMPORT
   * @adminMethod
   */
  function bulkImportFiles$1(importFileRequests: ImportFileRequest$1[], options?: BulkImportFilesOptions): Promise<BulkImportFilesResponse$1>;
  interface BulkImportFilesOptions {
      /**
       * Whether to include the imported File Descriptor in the response. Set to `false` to exclude the File Descriptor from the returned object.
       * Default: `true`
       */
      returnEntity?: boolean | null;
      /**
       * An optional list of categories to link all the items to
       * The item will be linked to the account category automatically
       */
      categoryIds?: string[] | null;
  }
  /**
   * Search items, all filters only support equality
   * Each query must contain a categoryId filter
   * @public
   * @documentationMaturity preview
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_READ
   * @adminMethod
   */
  function searchItems(options?: SearchItemsOptions): Promise<SearchItemsResponse>;
  interface SearchItemsOptions {
      /** Items search query */
      query?: Search;
  }
  /**
   * Query items allowing to sort by specified fields, all filters only support equality
   * Each query must contain a categoryId filter
   * @public
   * @documentationMaturity preview
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_READ
   * @adminMethod
   */
  function queryItems(): ItemsQueryBuilder;
  interface QueryOffsetResult {
      currentPage: number | undefined;
      totalPages: number | undefined;
      totalCount: number | undefined;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ItemsQueryResult extends QueryOffsetResult {
      items: EnterpriseMediaItem[];
      query: ItemsQueryBuilder;
      next: () => Promise<ItemsQueryResult>;
      prev: () => Promise<ItemsQueryResult>;
  }
  interface ItemsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'sizeInBytes' | 'title' | '_createdDate' | '_updatedDate', value: any) => ItemsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `values`.
       * @param values - List of values to compare against.
       * @documentationMaturity preview
       */
      hasSome: (propertyName: 'parentCategoryIds', value: any[]) => ItemsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'sizeInBytes' | 'title' | '_createdDate' | '_updatedDate'>) => ItemsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'sizeInBytes' | 'title' | '_createdDate' | '_updatedDate'>) => ItemsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ItemsQueryBuilder;
      /** @param skip - Number of items to skip in the query results before returning the results.
       * @documentationMaturity preview
       */
      skip: (skip: number) => ItemsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ItemsQueryResult>;
  }
  /**
   * Update an item
   * @param _id - Id of the item in public media
   * @public
   * @documentationMaturity preview
   * @requiredField _id
   * @requiredField item
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_UPDATE
   * @adminMethod
   * @returns Updated item info
   */
  function updateItem(_id: string, item: UpdateItem, options?: UpdateItemOptions): Promise<EnterpriseMediaItem>;
  interface UpdateItem {
      /**
       * Id of the item in public media
       * @readonly
       */
      _id?: string;
      /**
       * Media type of the item
       * @readonly
       */
      mediaType?: MediaType$2;
      /**
       * Size of the uploaded file in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /** The item title, part of searchable fields */
      title?: string | null;
      /**
       * The aspect ratio of the item
       * An object containing urls for different views of the item
       * @readonly
       */
      assets?: ItemAssets;
      /** Tags describing the image, part of searchable fields */
      displayTags?: string[] | null;
      /** Tags for internal client use, part of searchable fields */
      internalTags?: string[] | null;
      /**
       * Tags for filtering items in the search
       * @readonly
       */
      systemTags?: string[] | null;
      /**
       * Category ids this item belongs to
       * @readonly
       */
      parentCategoryIds?: string[] | null;
      /** Status of the item */
      publishStatus?: PublishStatus;
      /**
       * Date and time the item was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the item was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * An internal id used with different wix media systems
       * @readonly
       */
      internalId?: string | null;
  }
  interface UpdateItemOptions {
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Bulk update an item
   * @param updateItemRequests - Requests to update individual item
   * @public
   * @documentationMaturity preview
   * @requiredField updateItemRequests
   * @requiredField updateItemRequests.item._id
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_UPDATE
   * @adminMethod
   */
  function bulkUpdateItem(updateItemRequests: UpdateItemRequest[], options?: BulkUpdateItemOptions): Promise<BulkUpdateItemResponse>;
  interface BulkUpdateItemOptions {
      /** Should the response return the updated item */
      returnEntity?: boolean;
  }
  /**
   * Get item details
   * @param itemId - Item id
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_READ
   * @adminMethod
   * @returns item info
   */
  function getItem(itemId: string): Promise<EnterpriseMediaItem>;
  /**
   * Link the item to multiple categories
   * @param itemId - The item id
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_UPDATE_CATEGORIES
   * @adminMethod
   */
  function linkItemToCategories(itemId: string, options?: LinkItemToCategoriesOptions): Promise<LinkItemToCategoriesResponse>;
  interface LinkItemToCategoriesOptions {
      /** The category ids that the item will be linked to */
      categoryIds?: string[];
  }
  /**
   * Unlink the item from multiple categories
   * @param itemId - The item id
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_UPDATE_CATEGORIES
   * @adminMethod
   */
  function unlinkItemFromCategories(itemId: string, options?: UnlinkItemFromCategoriesOptions): Promise<UnlinkItemFromCategoriesResponse>;
  interface UnlinkItemFromCategoriesOptions {
      /** The category ids that the item will be unlinked from */
      categoryIds?: string[];
  }
  /**
   * Overwrite item categories
   * @param itemId - The item id
   * @public
   * @documentationMaturity preview
   * @requiredField itemId
   * @permissionId MEDIA.ENTERPRISE_MEDIA_ITEMS_UPDATE_CATEGORIES
   * @adminMethod
   */
  function overwriteItemCategories(itemId: string, options?: OverwriteItemCategoriesOptions): Promise<OverwriteItemCategoriesResponse>;
  interface OverwriteItemCategoriesOptions {
      /** The category ids the item will be linked to after this operation */
      categoryIds?: string[];
  }
  
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_EnterpriseMediaItem = EnterpriseMediaItem;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemAssets = ItemAssets;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemAssetsAssetsOneOf = ItemAssetsAssetsOneOf;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_PublishStatus = PublishStatus;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_PublishStatus: typeof PublishStatus;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemCategoriesChanged = ItemCategoriesChanged;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemUploadCallbackRequest = ItemUploadCallbackRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemUploadCallbackResponse = ItemUploadCallbackResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkImportFilesResult = BulkImportFilesResult;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchItemsRequest = SearchItemsRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_Search = Search;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchPagingMethodOneOf = SearchPagingMethodOneOf;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchDetails = SearchDetails;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_Paging = Paging;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchItemsResponse = SearchItemsResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryItemsRequest = QueryItemsRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryV2 = QueryV2;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryItemsResponse = QueryItemsResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItemRequest = UpdateItemRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItemResponse = UpdateItemResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_PublishStatusChanged = PublishStatusChanged;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkUpdateItemRequest = BulkUpdateItemRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkUpdateItemResponse = BulkUpdateItemResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkItemUpdateResult = BulkItemUpdateResult;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_GetItemRequest = GetItemRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_GetItemResponse = GetItemResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_LinkItemToCategoriesRequest = LinkItemToCategoriesRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_LinkItemToCategoriesResponse = LinkItemToCategoriesResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UnlinkItemFromCategoriesRequest = UnlinkItemFromCategoriesRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UnlinkItemFromCategoriesResponse = UnlinkItemFromCategoriesResponse;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_OverwriteItemCategoriesRequest = OverwriteItemCategoriesRequest;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_OverwriteItemCategoriesResponse = OverwriteItemCategoriesResponse;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_itemUploadCallback: typeof itemUploadCallback;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemUploadCallbackOptions = ItemUploadCallbackOptions;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkImportFilesOptions = BulkImportFilesOptions;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_searchItems: typeof searchItems;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchItemsOptions = SearchItemsOptions;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_queryItems: typeof queryItems;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemsQueryResult = ItemsQueryResult;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemsQueryBuilder = ItemsQueryBuilder;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_updateItem: typeof updateItem;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItem = UpdateItem;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItemOptions = UpdateItemOptions;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_bulkUpdateItem: typeof bulkUpdateItem;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkUpdateItemOptions = BulkUpdateItemOptions;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_getItem: typeof getItem;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_linkItemToCategories: typeof linkItemToCategories;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_LinkItemToCategoriesOptions = LinkItemToCategoriesOptions;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_unlinkItemFromCategories: typeof unlinkItemFromCategories;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UnlinkItemFromCategoriesOptions = UnlinkItemFromCategoriesOptions;
  const mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_overwriteItemCategories: typeof overwriteItemCategories;
  type mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_OverwriteItemCategoriesOptions = OverwriteItemCategoriesOptions;
  namespace mediaEnterprisePublicMediaV1EnterpriseItem_universal_d {
    export {
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_EnterpriseMediaItem as EnterpriseMediaItem,
      MediaType$2 as MediaType,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemAssets as ItemAssets,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemAssetsAssetsOneOf as ItemAssetsAssetsOneOf,
      VideoResolution$2 as VideoResolution,
      Archive$2 as Archive,
      Model3D$2 as Model3D,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_PublishStatus as PublishStatus,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemCategoriesChanged as ItemCategoriesChanged,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemUploadCallbackRequest as ItemUploadCallbackRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemUploadCallbackResponse as ItemUploadCallbackResponse,
      GenerateFileUploadUrlRequest$1 as GenerateFileUploadUrlRequest,
      GenerateFileUploadUrlResponse$1 as GenerateFileUploadUrlResponse,
      ImportFileRequest$1 as ImportFileRequest,
      ImportFileResponse$1 as ImportFileResponse,
      BulkImportFilesRequest$1 as BulkImportFilesRequest,
      BulkImportFilesResponse$1 as BulkImportFilesResponse,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkImportFilesResult as BulkImportFilesResult,
      ItemMetadata$1 as ItemMetadata,
      ApplicationError$1 as ApplicationError,
      BulkActionMetadata$1 as BulkActionMetadata,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchItemsRequest as SearchItemsRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_Search as Search,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchPagingMethodOneOf as SearchPagingMethodOneOf,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchDetails as SearchDetails,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_Paging as Paging,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchItemsResponse as SearchItemsResponse,
      PagingMetadataV2$3 as PagingMetadataV2,
      Cursors$3 as Cursors,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryItemsRequest as QueryItemsRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryV2 as QueryV2,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_QueryItemsResponse as QueryItemsResponse,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItemRequest as UpdateItemRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItemResponse as UpdateItemResponse,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_PublishStatusChanged as PublishStatusChanged,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkUpdateItemRequest as BulkUpdateItemRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkUpdateItemResponse as BulkUpdateItemResponse,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkItemUpdateResult as BulkItemUpdateResult,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_GetItemRequest as GetItemRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_GetItemResponse as GetItemResponse,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_LinkItemToCategoriesRequest as LinkItemToCategoriesRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_LinkItemToCategoriesResponse as LinkItemToCategoriesResponse,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UnlinkItemFromCategoriesRequest as UnlinkItemFromCategoriesRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UnlinkItemFromCategoriesResponse as UnlinkItemFromCategoriesResponse,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_OverwriteItemCategoriesRequest as OverwriteItemCategoriesRequest,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_OverwriteItemCategoriesResponse as OverwriteItemCategoriesResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_itemUploadCallback as itemUploadCallback,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemUploadCallbackOptions as ItemUploadCallbackOptions,
      generateFileUploadUrl$1 as generateFileUploadUrl,
      GenerateFileUploadUrlOptions$1 as GenerateFileUploadUrlOptions,
      importFile$1 as importFile,
      ImportFileOptions$1 as ImportFileOptions,
      bulkImportFiles$1 as bulkImportFiles,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkImportFilesOptions as BulkImportFilesOptions,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_searchItems as searchItems,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_SearchItemsOptions as SearchItemsOptions,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_queryItems as queryItems,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemsQueryResult as ItemsQueryResult,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_ItemsQueryBuilder as ItemsQueryBuilder,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_updateItem as updateItem,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItem as UpdateItem,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UpdateItemOptions as UpdateItemOptions,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_bulkUpdateItem as bulkUpdateItem,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_BulkUpdateItemOptions as BulkUpdateItemOptions,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_getItem as getItem,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_linkItemToCategories as linkItemToCategories,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_LinkItemToCategoriesOptions as LinkItemToCategoriesOptions,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_unlinkItemFromCategories as unlinkItemFromCategories,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_UnlinkItemFromCategoriesOptions as UnlinkItemFromCategoriesOptions,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_overwriteItemCategories as overwriteItemCategories,
      mediaEnterprisePublicMediaV1EnterpriseItem_universal_d_OverwriteItemCategoriesOptions as OverwriteItemCategoriesOptions,
    };
  }
  
  interface GeneratedImage {
      /** a url pointing to the generated image */
      url?: string;
  }
  interface GenerateImageRequest {
      /** Text description of the generated image */
      textPrompt?: string | null;
      /**
       * A string containing information about the style of the generated image
       * Can be taken from the Configuration response
       */
      style?: string | null;
      /** The image width */
      width?: number | null;
      /** The image height */
      height?: number | null;
      /**
       * The client that is making this request, Used for quota enforcement
       * Please contact the media team to add your own client here
       */
      requestSource?: RequestSource;
      /** Text description of things to be excluded from the image */
      negativePrompt?: string | null;
      /**
       * The product feature that the image is generated from
       * @internal
       */
      productFeature?: ProductFeature;
  }
  enum RequestSource {
      UNDEFINED = "UNDEFINED",
      STORES = "STORES",
      PHOTO_STUDIO = "PHOTO_STUDIO",
      MEDIA_MANAGER = "MEDIA_MANAGER",
      MOBILE_BRANDED_APPS = "MOBILE_BRANDED_APPS",
      FUNNEL_RESTAURANTS_MENU = "FUNNEL_RESTAURANTS_MENU",
      FUNNEL_STORES = "FUNNEL_STORES",
      FUNNEL_BLOG = "FUNNEL_BLOG",
      FUNNEL_BOOKINGS = "FUNNEL_BOOKINGS",
      FUNNEL_EVENTS = "FUNNEL_EVENTS",
      FUNNEL_ONLINE_PROGRAMS = "FUNNEL_ONLINE_PROGRAMS",
      FUNNEL_PORTFOLIO = "FUNNEL_PORTFOLIO",
      FUNNEL_PRICING_PLANS = "FUNNEL_PRICING_PLANS",
      MEDIA_MANAGER_MOBILE = "MEDIA_MANAGER_MOBILE",
      SITE_GENERATOR = "SITE_GENERATOR"
  }
  enum ProductFeature {
      UNDEFINED_PRODUCT_FEATURE = "UNDEFINED_PRODUCT_FEATURE",
      REGENERATION = "REGENERATION"
  }
  interface GenerateImageResponse {
      /**
       * A list of image objects containing urls for the generated images
       * Using
       */
      variations?: GeneratedImage[];
      /** The number of generated images for this site */
      usedQuota?: number | null;
      /** The number of generated images for this user - limited to 1000 */
      userUsedQuota?: number | null;
  }
  interface ConfigurationRequest {
  }
  interface ConfigurationResponse {
      /** A list of possible image styles that can be used when generating media */
      generationStyles?: string[] | null;
  }
  interface SetUserQuotaRequest {
      /** The user count of generated images */
      quota?: number;
      /** The user to change the quota for selected user  only */
      userId?: string | null;
  }
  interface SetUserQuotaResponse {
  }
  interface ResetQuotaRequest {
  }
  interface ResetQuotaResponse {
  }
  /**
   * Generate images according to the specified prompt
   * Due to provider limitations, we may need to switch between providers.
   * This means that the result size of the image (width and height) may not be the same as the requested size
   * This method will always try to find the closest size that the AI provider allows
   * @internal
   * @documentationMaturity preview
   * @permissionId MEDIA.GENERATION_TEXT_TO_IMAGE
   * @adminMethod
   * @deprecated
   * @targetRemovalDate 2024-11-01
   */
  function generateImage(options?: GenerateImageOptions): Promise<GenerateImageResponse>;
  interface GenerateImageOptions {
      /** Text description of the generated image */
      textPrompt?: string | null;
      /**
       * A string containing information about the style of the generated image
       * Can be taken from the Configuration response
       */
      style?: string | null;
      /** The image width */
      width?: number | null;
      /** The image height */
      height?: number | null;
      /**
       * The client that is making this request, Used for quota enforcement
       * Please contact the media team to add your own client here
       */
      requestSource?: RequestSource;
      /** Text description of things to be excluded from the image */
      negativePrompt?: string | null;
      /**
       * The product feature that the image is generated from
       * @internal
       */
      productFeature?: ProductFeature;
  }
  /**
   * Return service level configurations to the client for dropdown fields content
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function configuration(): Promise<ConfigurationResponse>;
  /**
   * Return quota record for a site
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function setUserQuota(options?: SetUserQuotaOptions): Promise<void>;
  interface SetUserQuotaOptions {
      /** The user count of generated images */
      quota?: number;
      /** The user to change the quota for selected user  only */
      userId?: string | null;
  }
  /**
   * only allowed for specific users, resets the quota for all users
   * @internal
   * @documentationMaturity preview
   * @adminMethod
   */
  function resetQuota(): Promise<void>;
  
  type mediaGenerationV1GeneratedImage_universal_d_GeneratedImage = GeneratedImage;
  type mediaGenerationV1GeneratedImage_universal_d_GenerateImageRequest = GenerateImageRequest;
  type mediaGenerationV1GeneratedImage_universal_d_RequestSource = RequestSource;
  const mediaGenerationV1GeneratedImage_universal_d_RequestSource: typeof RequestSource;
  type mediaGenerationV1GeneratedImage_universal_d_ProductFeature = ProductFeature;
  const mediaGenerationV1GeneratedImage_universal_d_ProductFeature: typeof ProductFeature;
  type mediaGenerationV1GeneratedImage_universal_d_GenerateImageResponse = GenerateImageResponse;
  type mediaGenerationV1GeneratedImage_universal_d_ConfigurationRequest = ConfigurationRequest;
  type mediaGenerationV1GeneratedImage_universal_d_ConfigurationResponse = ConfigurationResponse;
  type mediaGenerationV1GeneratedImage_universal_d_SetUserQuotaRequest = SetUserQuotaRequest;
  type mediaGenerationV1GeneratedImage_universal_d_SetUserQuotaResponse = SetUserQuotaResponse;
  type mediaGenerationV1GeneratedImage_universal_d_ResetQuotaRequest = ResetQuotaRequest;
  type mediaGenerationV1GeneratedImage_universal_d_ResetQuotaResponse = ResetQuotaResponse;
  const mediaGenerationV1GeneratedImage_universal_d_generateImage: typeof generateImage;
  type mediaGenerationV1GeneratedImage_universal_d_GenerateImageOptions = GenerateImageOptions;
  const mediaGenerationV1GeneratedImage_universal_d_configuration: typeof configuration;
  const mediaGenerationV1GeneratedImage_universal_d_setUserQuota: typeof setUserQuota;
  type mediaGenerationV1GeneratedImage_universal_d_SetUserQuotaOptions = SetUserQuotaOptions;
  const mediaGenerationV1GeneratedImage_universal_d_resetQuota: typeof resetQuota;
  namespace mediaGenerationV1GeneratedImage_universal_d {
    export {
      mediaGenerationV1GeneratedImage_universal_d_GeneratedImage as GeneratedImage,
      mediaGenerationV1GeneratedImage_universal_d_GenerateImageRequest as GenerateImageRequest,
      mediaGenerationV1GeneratedImage_universal_d_RequestSource as RequestSource,
      mediaGenerationV1GeneratedImage_universal_d_ProductFeature as ProductFeature,
      mediaGenerationV1GeneratedImage_universal_d_GenerateImageResponse as GenerateImageResponse,
      mediaGenerationV1GeneratedImage_universal_d_ConfigurationRequest as ConfigurationRequest,
      mediaGenerationV1GeneratedImage_universal_d_ConfigurationResponse as ConfigurationResponse,
      mediaGenerationV1GeneratedImage_universal_d_SetUserQuotaRequest as SetUserQuotaRequest,
      mediaGenerationV1GeneratedImage_universal_d_SetUserQuotaResponse as SetUserQuotaResponse,
      mediaGenerationV1GeneratedImage_universal_d_ResetQuotaRequest as ResetQuotaRequest,
      mediaGenerationV1GeneratedImage_universal_d_ResetQuotaResponse as ResetQuotaResponse,
      mediaGenerationV1GeneratedImage_universal_d_generateImage as generateImage,
      mediaGenerationV1GeneratedImage_universal_d_GenerateImageOptions as GenerateImageOptions,
      mediaGenerationV1GeneratedImage_universal_d_configuration as configuration,
      mediaGenerationV1GeneratedImage_universal_d_setUserQuota as setUserQuota,
      mediaGenerationV1GeneratedImage_universal_d_SetUserQuotaOptions as SetUserQuotaOptions,
      mediaGenerationV1GeneratedImage_universal_d_resetQuota as resetQuota,
    };
  }
  
  interface FileDescriptor$1 {
      /**
       * File ID. Generated when a file is uploaded to the Media Manager.
       * @readonly
       */
      _id?: string;
      /** File name as it appears in the Media Manager. */
      displayName?: string;
      /**
       * Static URL of the file.
       * @readonly
       */
      url?: string;
      /** ID of the file's parent folder. */
      parentFolderId?: string | null;
      /**
       * File hash.
       * @readonly
       */
      hash?: string;
      /**
       * Size of the uploaded file in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /**
       * Whether the file is public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)).
       * @readonly
       */
      private?: boolean;
      /**
       * Media file type.
       * @readonly
       */
      mediaType?: MediaType$1;
      /**
       * Media file content.
       * @readonly
       */
      media?: FileMedia$1;
      /**
       * Status of the file that was uploaded.
       * * `FAILED`: The file failed to upload, for example, during media post processing.
       * * `READY`: The file uploaded, finished all processing, and is ready for use.
       * * `PENDING`: The file is processing and the URLs are not yet available. This response is returned when importing a file.
       * @readonly
       */
      operationStatus?: OperationStatus$1;
      /**
       * URL where the file was uploaded from.
       * @readonly
       */
      sourceUrl?: string | null;
      /**
       * URL of the file's thumbnail.
       * @readonly
       */
      thumbnailUrl?: string | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[];
      /**
       * Date and time the file was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the file was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * The Wix site ID where the media file is stored.
       * @readonly
       */
      siteId?: string;
      /**
       * State of the file.
       * @readonly
       */
      state?: State$2;
      /**
       * Internal tags describing the item, can be used in specific client use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The namespace containing the file
       * @internal
       */
      namespace?: Namespace$2;
      /**
       * Information about the identity that added this file
       * @internal
       */
      addedBy?: IdentityInfo$1;
      /**
       * The raw namespace containing the file
       * @internal
       * @readonly
       */
      rawNamespace?: string | null;
      /**
       * The date this file was last viewed from the last day, can be used to know if this file is still in use
       * @internal
       * @readonly
       */
      lastUsedDate?: Date | null;
      /**
       * The date this file was last viewed from the last day, can be used to know if this file is still in use
       * @internal
       * @readonly
       */
      mimeType?: string | null;
  }
  enum MediaType$1 {
      UNKNOWN = "UNKNOWN",
      IMAGE = "IMAGE",
      VIDEO = "VIDEO",
      AUDIO = "AUDIO",
      DOCUMENT = "DOCUMENT",
      VECTOR = "VECTOR",
      ARCHIVE = "ARCHIVE",
      MODEL3D = "MODEL3D",
      OTHER = "OTHER",
      ICON = "ICON",
      FLASH = "FLASH",
      FONT = "FONT"
  }
  interface FileMedia$1 extends FileMediaMediaOneOf$1 {
      /** Information about the image. */
      image?: ImageMedia$1;
      /** Information about the video. */
      video?: string;
      /** Information about the audio. */
      audio?: AudioV2$1;
      /** Information about the document. */
      document?: string;
      /** Information about the vector. */
      vector?: ImageMedia$1;
      /** Information about the archive. */
      archive?: Archive$1;
      /** Information about the 3D Model. */
      model3d?: Model3D$1;
      /**
       * Information about other file types
       * @internal
       */
      other?: OtherMedia$1;
      /**
       * Information about the icon.
       * @internal
       */
      icon?: ImageMedia$1;
      /**
       * Information about flash
       * @internal
       */
      flash?: OtherMedia$1;
      /**
       * Information about the font
       * @internal
       */
      font?: FontMedia$1;
  }
  /** @oneof */
  interface FileMediaMediaOneOf$1 {
      /** Information about the image. */
      image?: ImageMedia$1;
      /** Information about the video. */
      video?: string;
      /** Information about the audio. */
      audio?: AudioV2$1;
      /** Information about the document. */
      document?: string;
      /** Information about the vector. */
      vector?: ImageMedia$1;
      /** Information about the archive. */
      archive?: Archive$1;
      /** Information about the 3D Model. */
      model3d?: Model3D$1;
      /**
       * Information about other file types
       * @internal
       */
      other?: OtherMedia$1;
      /**
       * Information about the icon.
       * @internal
       */
      icon?: ImageMedia$1;
      /**
       * Information about flash
       * @internal
       */
      flash?: OtherMedia$1;
      /**
       * Information about the font
       * @internal
       */
      font?: FontMedia$1;
  }
  interface ImageMedia$1 {
      /** Image data. */
      image?: string;
      /** Image colors. */
      colors?: Colors$1;
      /** Information about faces in the image. Use to crop images without cutting out faces. */
      faces?: FaceRecognition$1[];
      /**
       * Information about the image preview.
       * You can use this to display a preview for private images.
       */
      previewImage?: string;
      /**
       * Optional, An AI generated description of the image
       * @readonly
       */
      caption?: string | null;
      /**
       * Optional, return true or false if the image has text, or empty for unknown
       * @internal
       * @readonly
       */
      containsText?: boolean | null;
      /**
       * Optional, return true or false if the image has text, or empty for unknown
       * @internal
       * @readonly
       */
      animated?: boolean | null;
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
  interface Colors$1 {
      /** Main color of the image. */
      prominent?: Color$1;
      /** Color palette of the image. */
      palette?: Color$1[];
  }
  interface Color$1 {
      /** HEX color. */
      hex?: string | null;
      /** RGB color. */
      rgb?: ColorRGB$1;
  }
  interface ColorRGB$1 {
      /** Red channel. */
      r?: number | null;
      /** Green channel. */
      g?: number | null;
      /** Blue channel. */
      b?: number | null;
  }
  /**
   * Using this object you can crop images while centering on faces
   * ------------------------
   * |                      |
   * |    x,y               |
   * |    *--------         |
   * |    |  .  . |         |
   * |    |   |   | height  |
   * |    |  \ /  |         |
   * |    |       |         |
   * |    ---------         |
   * |     width            |
   * |                      |
   * |______________________|
   */
  interface FaceRecognition$1 {
      /** The accuracy percentage of the face recognition. The likelihood that a face is detected. */
      confidence?: number;
      /** Top left x pixel coordinate of the face. */
      x?: number;
      /** Top left y pixel coordinate of the face. */
      y?: number;
      /** Face pixel height. */
      height?: number;
      /** Face pixel width. */
      width?: number;
  }
  interface VideoResolution$1 {
      /** Video URL. */
      url?: string;
      /** Video height. */
      height?: number;
      /** Video width. */
      width?: number;
      /**
       * Deprecated. Use the `posters` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      poster?: string;
      /**
       * Video format
       * Possible values: ['144p.mp4' '144p.webm' '240p.mp4' '240p.webm' '360p.mp4' '360p.webm' '480p.mp4' '480p.webm'
       * '720p.mp4' '720p.webm' '1080p.mp4' '1080p.webm', 'hls' ]
       */
      format?: string;
      /**
       * Deprecated. Use the `urlExpirationDate` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      urlExpirationDate?: Date | null;
      /**
       * Deprecated. Use the `sizeInBytes` property in the parent entity instead. Size cannot be provided per resolution.
       * @internal
       * @deprecated
       */
      sizeInBytes?: string | null;
      /**
       * Video quality. For example: 480p, 720p.
       * @internal
       */
      quality?: string | null;
      /**
       * Video filename.
       * @internal
       */
      filename?: string | null;
      /**
       * Video duration in seconds.
       * @internal
       * @readonly
       * @deprecated Video duration in seconds.
       * @replacedBy duration_in_milliseconds
       * @targetRemovalDate 2024-08-01
       */
      durationInSeconds?: number | null;
      /**
       * Video duration in milliseconds.
       * @internal
       * @readonly
       */
      durationInMilliseconds?: number | null;
      /**
       * When true, this is a protected asset, and calling the URL will return a 403 error.
       * In order to access private assets, make a request to:
       * `GenerateFileDownloadUrl` with the WixMedia id and specify the asset_key in the request
       * @internal
       * @readonly
       */
      private?: boolean | null;
      /**
       * Key to identify the video resolution's relationship to the original media in WixMedia.
       * Can be used to request a download for the specific video resolution.
       * For example: 480p.mp4, 720p.mp4, 1080p.mp4, trailer-720p.mp4, clip-720p.mp4
       * @internal
       * @readonly
       */
      assetKey?: string | null;
  }
  interface AudioV2$1 {
      /** WixMedia ID. */
      _id?: string;
      /** Audio formats available for this file. */
      assets?: string[];
      /**
       * Audio bitrate.
       * @readonly
       */
      bitrate?: number | null;
      /**
       * Audio format.
       * @readonly
       */
      format?: string | null;
      /**
       * Audio duration in seconds.
       * @readonly
       */
      duration?: number | null;
      /**
       * Audio size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
  }
  interface Archive$1 {
      /** WixMedia ID. */
      _id?: string;
      /** Archive URL. */
      url?: string;
      /**
       * Archive URL expiration date (when relevant).
       * @readonly
       */
      urlExpirationDate?: Date | null;
      /** Archive size in bytes. */
      sizeInBytes?: string | null;
      /** Archive filename. */
      filename?: string | null;
  }
  interface Model3D$1 {
      /** WixMedia 3D ID. */
      _id?: string;
      /** 3D URL. */
      url?: string;
      /** 3D thumbnail Image */
      thumbnail?: string;
      /** 3D alt text. */
      altText?: string | null;
      /**
       * 3D URL expiration date (when relevant).
       * @readonly
       */
      urlExpirationDate?: Date | null;
      /**
       * 3D filename.
       * @readonly
       */
      filename?: string | null;
      /**
       * 3D size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
  }
  interface OtherMedia$1 {
      /** WixMedia ID. for use with Site Media APIs only */
      _id?: string;
      /**
       * The media type of the file: 'package', 'raw'
       * @readonly
       */
      internalMediaType?: string | null;
      /**
       * size in bytes. Optional.
       * @readonly
       */
      sizeInBytes?: string | null;
      /** The file URL. */
      url?: string;
  }
  interface FontMedia$1 {
      /** WixMedia ID. for use with Site Media APIs only */
      _id?: string | null;
      /**
       * size in bytes. Optional.
       * @readonly
       */
      sizeInBytes?: string | null;
      /** The format of the font asset. ttf, woff, woff2 */
      format?: string | null;
      /** The font family name. */
      family?: string | null;
      /** The font name */
      fontName?: string | null;
      /** Font formats available for this file. */
      assets?: FontAsset$1[];
  }
  interface FontAsset$1 {
      /**
       * Keys for downloading different assets of a file.
       * Default: `src`, key representing the original file's format and quality.
       */
      assetKey?: string | null;
      /** The URL of the font asset. */
      url?: string | null;
      /** The format of the font asset. ttf, woff, woff2 */
      format?: string | null;
  }
  enum OperationStatus$1 {
      /** File upload or processing failed */
      FAILED = "FAILED",
      /** File is ready for consumption */
      READY = "READY",
      /** File is waiting for processing or currently being processed */
      PENDING = "PENDING"
  }
  enum State$2 {
      /** File is ready for consumption */
      OK = "OK",
      /** Deleted file */
      DELETED = "DELETED"
  }
  enum Namespace$2 {
      NO_NAMESPACE = "NO_NAMESPACE",
      OTHERS = "OTHERS",
      /** ANY = 2; */
      WIX_VIDEO = "WIX_VIDEO",
      /** _nsWixMusic */
      WIX_MUSIC = "WIX_MUSIC",
      /** _nsArtStore */
      ALBUMS_AND_ART_STORE = "ALBUMS_AND_ART_STORE",
      /** _nsDigitalProduct */
      WIX_ECOM = "WIX_ECOM",
      /** _nsPhotoShareApp */
      PHOTO_SHARE_APP = "PHOTO_SHARE_APP",
      /** _nsSharingApp, */
      SHARING_APP = "SHARING_APP",
      /** engage */
      CHAT = "CHAT",
      /** logobuilder */
      LOGO_BUILDER = "LOGO_BUILDER",
      /** WixExposure */
      ALBUMS_OLD = "ALBUMS_OLD",
      /** chat-mobile-uploads */
      CHAT_MOBILE = "CHAT_MOBILE",
      /** _nsWixForms */
      WIX_FORMS = "WIX_FORMS",
      /** _nsDraft */
      DRAFTS = "DRAFTS"
  }
  interface IdentityInfo$1 {
      /** The type of the user that uploaded the file */
      identityType?: IdentityType$1;
      /** User Id. empty when UNKNOWN */
      identityId?: string | null;
  }
  enum IdentityType$1 {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  interface FileReady {
      /** File entity that is ready with full information. */
      file?: FileDescriptor$1;
      /** External information specified in the file import or upload. */
      externalInfo?: ExternalInfo;
      /** File was restored from the trash-bin. */
      triggeredByUndelete?: boolean;
  }
  interface ExternalInfo {
      /** External information to specify in the File Ready or File Failed events. */
      origin?: string;
      /** External IDs to specify in the File Ready or File Failed events. */
      externalIds?: string[];
  }
  interface FileFailed {
      /** External information specified in the file import or upload. */
      externalInfo?: ExternalInfo;
      /** Error information. */
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
  interface DraftFilePublished {
      /** The file after it was published */
      file?: FileDescriptor$1;
      /** The namespace the file was published to */
      namespace?: Namespace$2;
  }
  interface BulkAnnotateImagesRequest {
      /** The file ids to run detection on */
      fileIds: string[];
      /** A list of detections types to fill for the image */
      annotationTypes: ImageAnnotationType[];
      /** When true the endpoint will detect listed information even if the image has this information */
      overwrite?: boolean | null;
      /** Should the response return the item following the operation */
      returnEntity?: boolean;
  }
  enum ImageAnnotationType {
      UNKNOWN_IMAGE_ANNOTATION_TYPE = "UNKNOWN_IMAGE_ANNOTATION_TYPE",
      CONTAINS_TEXT = "CONTAINS_TEXT",
      IS_ANIMATED = "IS_ANIMATED",
      FACES = "FACES",
      LABELS = "LABELS",
      COLORS = "COLORS",
      CAPTION = "CAPTION"
  }
  interface BulkAnnotateImagesResponse {
      /** Results of individual items */
      results?: BulkAnnotateImageResult[];
      /** Metadata of the operation */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkAnnotateImageResult {
      /** Item metadata */
      itemMetadata?: ItemMetadata;
      /**
       * The item following the operation
       * Only returned if operation was successful and if returnEntity flag was on
       */
      item?: FileDescriptor$1;
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
  interface BulkActionMetadata {
      /** Number of items that were successfully processed. */
      totalSuccesses?: number;
      /** Number of items that couldn't be processed. */
      totalFailures?: number;
      /** Number of failures without details because detailed failure threshold was exceeded. */
      undetailedFailures?: number;
  }
  interface GenerateFilesDownloadUrlRequest {
      /**
       * IDs of the files to download.
       *
       * You can also specify the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileIds: string[];
  }
  interface GenerateFilesDownloadUrlResponse {
      /** URL for downloading the compressed file containing the specified files in the Media Manager. */
      downloadUrl?: string;
  }
  interface GenerateFileDownloadUrlRequest {
      /**
       * File ID.
       *
       * You can also specify the file's Wix media URL. For example, `wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileId: string;
      /**
       * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type. <br />
       *
       * **Note:** The name that appears in the Media Manager is taken from the `filename` parameter in the Generate File Upload Url call.
       */
      downloadFileName?: string | null;
      /**
       * The time that it takes in minutes for the download URL to expire. <br />
       * Default: `600`. <br />
       * Limit: `525600` (1 year).
       */
      expirationInMinutes?: number | null;
      /**
       * The redirect URL for when the temporary download URL with a token expires. <br />
       * Default: A 403 Forbidden response page.
       */
      expirationRedirectUrl?: string | null;
      /**
       * Keys for downloading different assets (format and quality) of a file.
       * Default: `src`, key representing the original file's format and quality.
       */
      assetKeys?: string[] | null;
      /**
       * Whether the link downloads the file or opens the file in the browser.
       *
       * - `ATTACHMENT`: The link downloads the file.
       * - `INLINE`: The link opens the file in the browser.
       *
       * Default: `ATTACHMENT`
       */
      contentDisposition?: ContentDisposition;
  }
  enum ContentDisposition {
      /** Using the link in the browser will download the file */
      ATTACHMENT = "ATTACHMENT",
      /** Using the link in the browser will open the file in the browser */
      INLINE = "INLINE"
  }
  interface GenerateFileDownloadUrlResponse {
      /** URL for downloading a specific file in the Media Manager. */
      downloadUrls?: DownloadUrl[];
  }
  interface DownloadUrl {
      /** The file download URL. */
      url?: string;
      /**
       * Key for downloading a different asset (format and quality) of a file.
       * Default: `src`, key representing the original file's format and quality.
       */
      assetKey?: string;
  }
  interface ServiceError {
      /**
       * Error codes are groups of related errors
       * The error code can be used to provide additional details to wix support while debugging service errors
       */
      internalCode?: string | null;
      /** Debugging information, http status code returned from wix media internal API */
      internalHttpStatusCode?: number | null;
      /** Optional Debugging information, error key will represent the error "family" returned from wix media internal API */
      internalKey?: string | null;
  }
  interface GetFileDescriptorRequest {
      /**
       * File ID.
       *
       * You can also specify the file's Wix media URL. For example, `wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       *
       * If you are working in REST, note that you must encode the Wix media URL to specify it as a query param because it contains special characters. For example, `wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032` becomes `wix%3Aimage%3A%2F%2Fv1%2F0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg%2Fleon.jpg%23originWidth%3D3024%26originHeight%3D4032`.
       */
      fileId: string;
  }
  interface GetFileDescriptorResponse {
      /** Information about the file. */
      file?: FileDescriptor$1;
  }
  interface GetFileDescriptorsRequest {
      /**
       * File IDs.
       *
       * You can also specify the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileIds: string[];
  }
  interface GetFileDescriptorsResponse {
      /** Information about the requested files. */
      files?: FileDescriptor$1[];
  }
  interface UpdateFileDescriptorRequest {
      /** The file to update. */
      file: FileDescriptor$1;
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateFileDescriptorResponse {
      /** Information about the updated file. */
      file?: FileDescriptor$1;
  }
  interface UnsupportedRequestValueError$2 {
      /** Optional A list of allowed values */
      allowedValues?: string[];
      /** The unsupported value send in the request */
      requestValue?: string;
  }
  interface GenerateFileUploadUrlRequest {
      /** File mime type. */
      mimeType: string | null;
      /**
       * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
       * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` parameter in the Generate File Upload Url call.
       */
      fileName?: string | null;
      /**
       * File size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`.<br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Whether the file will be public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
      /** A place to map an external entity to an uploaded file in the Wix Media Manager. */
      externalInfo?: ExternalInfo;
      /**
       * The uploaded file will be created under this namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The uploaded file will be created under this namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /**
       * Internal tags describing the item, can be used in specific clients use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The time in hours for a draft file to expire and be deleted
       * Allowed only on DRAFT namespace
       * parent folder id and file path are not allowed when using draft_ttl_in_hours
       * @internal
       */
      draftTtlInHours?: number | null;
      /**
       * Configure what annotations will be done for an image file
       * @internal
       */
      imageAnnotationConfigurations?: ImageAnnotationConfigurations;
  }
  interface ImageAnnotationConfigurations {
      /** Whether to skip detection for the image */
      skipDetection?: boolean | null;
      /**
       * A list of detections types to fill for the image
       * If specified at least one valid annotation type should be provided
       * Default will be all detections
       */
      annotationTypes?: ImageAnnotationType[];
  }
  interface GenerateFileUploadUrlResponse {
      /** The URL for uploading a file to the Media Manager. */
      uploadUrl?: string;
  }
  interface SiteQuotaExceededError {
      /**
       * Error codes are groups of related errors
       * The error code can be used to provide additional details to wix support while debugging service errors
       */
      internalCode?: string | null;
      /** Debugging information, http status code returned from wix media internal API */
      internalHttpStatusCode?: number | null;
      /** Optional Debugging information, error key will represent the error "family" returned from wix media internal API */
      internalKey?: string | null;
      /** The quota details */
      quota?: TotalQuota$1;
  }
  interface TotalQuota$1 {
      /** Storage quota in bytes */
      storage?: string | null;
      /** Plans that are related to the quota */
      plans?: Plans$1;
      /** Time for which the quota is relevant - When the plans were retrieved from premium */
      timestamp?: Date | null;
  }
  interface Plans$1 {
      /** Premium Plan */
      premium?: Plan$1;
      /** Upgrade URL - the URL which a site owner can use to upgrade their quota. May be empty if an upgrade is not available. */
      upgradeUrl?: string;
  }
  interface Plan$1 {
      /**
       * Plan ID - Premium product ID
       * @readonly
       */
      _id?: string;
      /** Plan name */
      name?: string;
      /** When the plan was created */
      createdAt?: Date | null;
      /** When then plan expires */
      expiresAt?: Date | null;
  }
  interface GenerateFileResumableUploadUrlRequest {
      /** File mime type. */
      mimeType: string | null;
      /**
       * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
       * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` parameter in the Generate File Upload Url call.
       */
      fileName?: string | null;
      /**
       * File size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`.<br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Whether the file will be public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
      /** The upload protocol to use for implementing the resumable upload. */
      uploadProtocol?: UploadProtocol;
      /**
       * The uploaded file will be created under this namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The uploaded file will be created under this namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /**
       * Internal tags describing the item, can be used in specific clients use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The time in hours for a draft file to expire and be deleted
       * Allowed only on DRAFT namespace
       * @internal
       */
      draftTtlInHours?: number | null;
      /**
       * Configure what annotations will be done for an image file
       * @internal
       */
      imageAnnotationConfigurations?: ImageAnnotationConfigurations;
  }
  enum UploadProtocol {
      /** The upload protocol to use for implementing the resumable upload. */
      TUS = "TUS"
  }
  interface GenerateFileResumableUploadUrlResponse {
      /** The upload protocol to use for implementing the resumable upload. */
      uploadProtocol?: UploadProtocol;
      /** The URL for uploading a file to the Media Manager. */
      uploadUrl?: string;
      /** Single-use upload token. */
      uploadToken?: string;
  }
  interface ImportFileRequest {
      /** Publicly accessible external file URL. */
      url: string;
      /**
       * Media type of the file to import.
       * excluding: OTHER media type
       */
      mediaType?: MediaType$1;
      /** File name that appears in the Media Manager. */
      displayName?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Whether the file will be public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
      /** File mime type. */
      mimeType?: string;
      /** Information sent to the File Ready and File Failed events. See Importing Files ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/importing-files#backend-modules_media_files_using-externalinfo) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/importing-files#using-externalinfo)) to learn more. */
      externalInfo?: ExternalInfo;
      /** Optional parameters that should be sent with the external URL. */
      urlParams?: Record<string, any> | null;
      /** Optional headers that should be sent with the external URL. */
      urlHeaders?: Record<string, any> | null;
      /**
       * The imported file will be created under this namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The imported file will be created under this namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /**
       * Internal tags describing the item, can be used in specific clients use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The time in hours for a draft file to expire and be deleted
       * Allowed only on DRAFT namespace
       * @internal
       */
      draftTtlInHours?: number | null;
      /**
       * Configure what annotations will be done for an image file
       * @internal
       */
      imageAnnotationConfigurations?: ImageAnnotationConfigurations;
  }
  interface ImportFileResponse {
      /** Information about the imported file. */
      file?: FileDescriptor$1;
  }
  interface BulkImportFilesRequest {
      /** Information about the files to import. */
      importFileRequests: ImportFileRequest[];
  }
  interface BulkImportFilesResponse {
      /** Information about the imported files. */
      files?: FileDescriptor$1[];
  }
  interface BulkImportFileRequest {
      /** Information about the files to import. */
      importFileRequests: ImportFileRequest[];
      /** Default: `true` */
      returnEntity?: boolean | null;
  }
  interface BulkImportFileResponse {
      /** Items created by bulk action. */
      results?: BulkImportFileResult[];
      /** Bulk action metadata. */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkImportFileResult {
      /** Item metadata. */
      itemMetadata?: ItemMetadata;
      /** Imported file. This field is included in the response if the operation was successful and `returnEntity` is not set to `false`. */
      item?: FileDescriptor$1;
  }
  interface ListFilesRequest {
      /**
       * ID of the file's parent folder. <br />
       * Default:`media-root`.
       */
      parentFolderId?: string | null;
      /** File media type. */
      mediaTypes?: MediaType$1[];
      /** \n`true`: Returns only private files. \n`false`: Returns only public files. \n`undefined`: Returns public and private files. \n Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$2;
      /** Cursor and paging information. */
      paging?: CursorPaging$2;
      /**
       * List files of the specified namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List files of the specified namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
  }
  interface Sorting$2 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$2;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
  }
  enum SortOrder$2 {
      ASC = "ASC",
      DESC = "DESC"
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
  interface ListFilesResponse {
      /** List of files in the Media Manager. */
      files?: FileDescriptor$1[];
      /** The next cursor if it exists. */
      nextCursor?: PagingMetadataV2$2;
  }
  interface PagingMetadataV2$2 {
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$2;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$2 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
  }
  interface SearchFilesRequest {
      /**
       * Term to search for. Possible terms include the value of a file's
       * `displayName`, `mimeType`, and `label`. <br />
       * For example, if a file's label is cat, the search term is 'cat'.
       */
      search?: string | null;
      /**
       * A root folder in the media manager to search in. <br />
       * Default: `MEDIA_ROOT`.
       */
      rootFolder?: RootFolder$2;
      /** File media type. */
      mediaTypes?: MediaType$1[];
      /** \n`true`: Returns only private files. \n`false`: Returns only public files. \n`undefined`: Returns public and private files. \n Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$2;
      /** Cursor and paging information. */
      paging?: CursorPaging$2;
      /**
       * search by an internal tag that describe the item - for internal wix use only
       * @internal
       */
      internalTag?: string | null;
      /**
       * Search files of the specified namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * Search files of the specified namespace <br/>
       * Note - Namespace value `Others` is not supported in this request and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
  }
  enum RootFolder$2 {
      /** Root of all site media */
      MEDIA_ROOT = "MEDIA_ROOT",
      /** Root of the trash system folder */
      TRASH_ROOT = "TRASH_ROOT",
      /** Root of all visitor uploads */
      VISITOR_UPLOADS_ROOT = "VISITOR_UPLOADS_ROOT"
  }
  interface SearchFilesResponse {
      /** Files matching the query. */
      files?: FileDescriptor$1[];
      /** The next cursor if it exists. */
      nextCursor?: PagingMetadataV2$2;
  }
  interface GenerateVideoStreamingUrlRequest {
      /**
       * File ID.
       *
       * You can also specify the file's Wix media URL. For example, `wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileId: string;
      /** Video stream format. */
      format?: StreamFormat;
  }
  enum StreamFormat {
      UNKNOWN = "UNKNOWN",
      HLS = "HLS",
      DASH = "DASH"
  }
  interface GenerateVideoStreamingUrlResponse {
      /** URL for streaming a specific file in the Media Manager. */
      downloadUrl?: DownloadUrl;
  }
  interface GenerateWebSocketTokenRequest {
  }
  interface GenerateWebSocketTokenResponse {
      /** The web socket token for the identity in the request */
      token?: string;
  }
  interface BulkDeleteFilesRequest {
      /**
       * IDs of the files to move to the Media Manager's trash bin.
       *
       * You can also specify the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileIds: string[];
      /**
       * Whether the specified files are permanently deleted. <br />
       * Default: `false`
       */
      permanent?: boolean;
  }
  interface BulkDeleteFilesResponse {
  }
  interface BulkRestoreFilesFromTrashBinRequest {
      /**
       * IDs of the files to restore from the Media Manager's trash bin.
       *
       * You can also specify the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileIds: string[];
  }
  interface BulkRestoreFilesFromTrashBinResponse {
  }
  interface ListDeletedFilesRequest {
      /**
       * ID of the file's parent folder. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** File media type. */
      mediaTypes?: MediaType$1[];
      /** \n`true`: Returns only private files. \n`false`: Returns only public files. \n`undefined`: Returns public and private files. \n Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$2;
      /** Cursor and paging information. */
      paging?: CursorPaging$2;
      /**
       * List files of the specified namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List files of the specified namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
  }
  interface ListDeletedFilesResponse {
      /** List of files in the Media Manager's trash bin. */
      files?: FileDescriptor$1[];
      /** The next cursor if it exists. */
      nextCursor?: PagingMetadataV2$2;
  }
  interface BulkPublishDraftFilesRequest {
      /**
       * IDs of the draft files to be published.
       *
       * You can also specify the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileIds: string[];
      /**
       * The namespace the files will be published to
       * Note, private files must have a namespace
       */
      namespace?: Namespace$2;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /** Should the response return the item following the operation */
      returnEntity?: boolean;
  }
  interface BulkPublishDraftFilesResponse {
      /** Results of individual items */
      results?: BulkPublishDraftFileResult[];
      /** Metadata of the operation */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface BulkPublishDraftFileResult {
      /** Item metadata */
      itemMetadata?: ItemMetadata;
      /**
       * The item following the operation
       * Only returned if operation was successful and if returnEntity flag was on
       */
      item?: FileDescriptor$1;
  }
  interface UpdateFileRequest {
      /**
       * ID of the file to update.
       *
       * You can also specify the file's Wix media URL. For example, `wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032`.
       * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
       */
      fileId: string;
      /** File name that appears in the Media Manager. */
      displayName?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
  }
  interface UpdateFileResponse {
      /** Information about the updated file. */
      file?: FileDescriptor$1;
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
  interface DomainEventBodyOneOf$1 {
      createdEvent?: EntityCreatedEvent$1;
      updatedEvent?: EntityUpdatedEvent$1;
      deletedEvent?: EntityDeletedEvent$1;
      actionEvent?: ActionEvent$1;
  }
  interface EntityCreatedEvent$1 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$1;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$1 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$1 {
      /**
       * Since platformized APIs only expose PATCH and not PUT we can't assume that the fields sent from the client are the actual diff.
       * This means that to generate a list of changed fields (as opposed to sent fields) one needs to traverse both objects.
       * We don't want to impose this on all developers and so we leave this traversal to the notification recipients which need it.
       */
      currentEntityAsJson?: string;
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and previous values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent$1 {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface ActionEvent$1 {
      bodyAsJson?: string;
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
  /**
   * Run Image Annotation process on provided list of file ids
   * Note - the processes of this endpoint are synchronous and may take time to complete
   * @param fileIds - The file ids to run detection on
   * @internal
   * @documentationMaturity preview
   * @requiredField fileIds
   * @requiredField options.annotationTypes
   * @permissionId MEDIA.SITE_MEDIA_FILES_IMAGE_DETECTION
   * @adminMethod
   */
  function bulkAnnotateImages(fileIds: string[], options?: BulkAnnotateImagesOptions): Promise<BulkAnnotateImagesResponse>;
  interface BulkAnnotateImagesOptions {
      /** A list of detections types to fill for the image */
      annotationTypes: ImageAnnotationType[];
      /** When true the endpoint will detect listed information even if the image has this information */
      overwrite?: boolean | null;
      /** Should the response return the item following the operation */
      returnEntity?: boolean;
  }
  /**
   * Generates a URL for downloading a compressed file containing specific files in the Media Manager.
   *
   * The compressed file can contain up to 1000 files.
   *
   * To generate a permanent URL for downloading a compressed file that contains multiple files in the Media Manager, call the Generate Files Download URL endpoint.
   * Since this is a permanent URL, it is less secure.
   * Therefore, to download private files, call the Generate File Download URL endpoint for each private file that you want to generate a download URL for.
   * @public
   * @requiredField fileIds
   * @param fileIds - IDs of the files to download.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_DOWNLOAD
   * @adminMethod
   */
  function generateFilesDownloadUrl(fileIds: string[]): Promise<GenerateFilesDownloadUrlResponse>;
  /**
   * Generates one or more temporary URLs for downloading a specific file in the Media Manager.
   *
   * To download different assets of the file, specify the `assetKeys` parameter which generates a download URL for each asset.
   * If no `assetKey` is specified, it defaults to `src`, which generates one download URL in the original file's format and quality.
   *
   * Call this endpoint to grant external clients access to a private media file. Specify the `expirationInMinutes` parameter to set the URL expiration time, and the `expirationRedirectUrl` parameter to add a redirect url when the URL expires.
   *
   * To generate a permanent URL for downloading a compressed file that contains multiple files in the Media Manager, call the Generate Files Download URL endpoint.
   * Since this is a permanent URL, it is less secure.
   * Therefore, to download private files, call the Generate File Download URL endpoint for each private file that you want to generate a download URL for.
   * @public
   * @requiredField fileId
   * @param options - Options to use when generating a file's download URL.
   * @param fileId - File ID.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_DOWNLOAD_URL
   * @adminMethod
   */
  function generateFileDownloadUrl(fileId: string, options?: GenerateFileDownloadUrlOptions): Promise<GenerateFileDownloadUrlResponse>;
  interface GenerateFileDownloadUrlOptions {
      /**
       * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type. <br />
       *
       * **Note:** The name that appears in the Media Manager is taken from the `filename` parameter in the Generate File Upload Url call.
       */
      downloadFileName?: string | null;
      /**
       * The time that it takes in minutes for the download URL to expire. <br />
       * Default: `600`. <br />
       * Limit: `525600` (1 year).
       */
      expirationInMinutes?: number | null;
      /**
       * The redirect URL for when the temporary download URL with a token expires. <br />
       * Default: A 403 Forbidden response page.
       */
      expirationRedirectUrl?: string | null;
      /**
       * Keys for downloading different assets (format and quality) of a file.
       * Default: `src`, key representing the original file's format and quality.
       */
      assetKeys?: string[] | null;
      /**
       * Whether the link downloads the file or opens the file in the browser.
       *
       * - `ATTACHMENT`: The link downloads the file.
       * - `INLINE`: The link opens the file in the browser.
       *
       * Default: `ATTACHMENT`
       */
      contentDisposition?: ContentDisposition;
  }
  /**
   * Gets information about a specific file in the Media Manager.
   * @public
   * @requiredField fileId
   * @param fileId - File ID.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_READ
   * @adminMethod
   * @returns Information about the file.
   */
  function getFileDescriptor(fileId: string): Promise<FileDescriptor$1>;
  /**
   * Gets information about specific files in the Media Manager.
   * @public
   * @requiredField fileIds
   * @param fileIds - File IDs.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_READ
   * @adminMethod
   */
  function getFileDescriptors(fileIds: string[]): Promise<GetFileDescriptorsResponse>;
  /**
   * Updates a file. <br />
   *
   * Specify the `parentFolderId` parameter to move a file from its current folder to a different folder.
   * @param file - The file to update.
   * @public
   * @requiredField file
   * @requiredField file._id
   * @permissionId MEDIA.SITE_MEDIA_FILES_UPDATE
   * @adminMethod
   * @returns Information about the updated file.
   */
  function updateFileDescriptor(file: FileDescriptor$1, options?: UpdateFileDescriptorOptions): Promise<FileDescriptor$1>;
  interface UpdateFileDescriptorOptions {
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Generates an upload URL to allow external clients to upload a file to the Media Manager. <br/>
   *
   * To learn how external clients can use the generated upload URL in the response to upload a file to the Media Manager, see Upload API ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/upload-api) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/upload-api)).
   * > **Notes:**
   * > - When you upload a file, it's not immediately available, meaning you can't manage or use the file straight away. Learn more about knowing when a file is ready ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/importing-files#backend-modules_media_files_knowing-when-a-file-is-ready) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/importing-files#knowing-when-a-file-is-ready)).
   * > - Any interruption in the upload process stops the file upload. For files larger than 10MB, or when network connection is poor, call Generate File Resumable Upload URL instead. With the resumable upload URL, any interruption in the upload process pauses the file upload, and resumes the file upload process after the interruption.
   * @param mimeType - File mime type.
   * @public
   * @requiredField mimeType
   * @param options - Options to use when generating a file's upload URL.
   * @permissionId MEDIA.SITE_MEDIA_FILES_UPLOAD
   * @adminMethod
   */
  function generateFileUploadUrl(mimeType: string | null, options?: GenerateFileUploadUrlOptions): Promise<GenerateFileUploadUrlResponse>;
  interface GenerateFileUploadUrlOptions {
      /**
       * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
       * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` parameter in the Generate File Upload Url call.
       */
      fileName?: string | null;
      /**
       * File size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`.<br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Whether the file will be public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
      /** A place to map an external entity to an uploaded file in the Wix Media Manager. */
      externalInfo?: ExternalInfo;
      /**
       * The uploaded file will be created under this namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The uploaded file will be created under this namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /**
       * Internal tags describing the item, can be used in specific clients use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The time in hours for a draft file to expire and be deleted
       * Allowed only on DRAFT namespace
       * parent folder id and file path are not allowed when using draft_ttl_in_hours
       * @internal
       */
      draftTtlInHours?: number | null;
      /**
       * Configure what annotations will be done for an image file
       * @internal
       */
      imageAnnotationConfigurations?: ImageAnnotationConfigurations;
  }
  /**
   * Generates a resumable upload URL to allow external clients to easily upload large files over 10MB to the Media Manager. <br/>
   *
   * With the resumable upload URL, any interruptions in the upload process pauses the file upload, and resumes the file upload process after the interruption. The resumable upload URL is also helpful when network connection is poor.
   * To learn how external clients can use the generated upload URL in the response to upload large files to the Media Manager, see Resumable Upload API ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/resumable-upload-api) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/resumable-upload-api)).
   *
   * > **Note:** When you upload a file, it's not immediately available, meaning you can't manage or use the file straight away. Learn more about knowing when a file is ready ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/importing-files#backend-modules_media_files_knowing-when-a-file-is-ready) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/importing-files#knowing-when-a-file-is-ready)).
   * @param mimeType - File mime type.
   * @public
   * @requiredField mimeType
   * @param options - Options to use when generating a resumable upload URL.
   * @permissionId MEDIA.SITE_MEDIA_FILES_UPLOAD
   * @adminMethod
   */
  function generateFileResumableUploadUrl(mimeType: string | null, options?: GenerateFileResumableUploadUrlOptions): Promise<GenerateFileResumableUploadUrlResponse>;
  interface GenerateFileResumableUploadUrlOptions {
      /**
       * Temporary file name used to identify the file type. For example, a file named "myFile.jpeg" identifies as an "image/jpeg" file type.
       * <br /> **Note:** The name that appears in the Media Manager is taken from the `filename` parameter in the Generate File Upload Url call.
       */
      fileName?: string | null;
      /**
       * File size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`.<br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Whether the file will be public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
      /** The upload protocol to use for implementing the resumable upload. */
      uploadProtocol?: UploadProtocol;
      /**
       * The uploaded file will be created under this namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The uploaded file will be created under this namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /**
       * Internal tags describing the item, can be used in specific clients use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The time in hours for a draft file to expire and be deleted
       * Allowed only on DRAFT namespace
       * @internal
       */
      draftTtlInHours?: number | null;
      /**
       * Configure what annotations will be done for an image file
       * @internal
       */
      imageAnnotationConfigurations?: ImageAnnotationConfigurations;
  }
  /**
   * Imports a file to the Media Manager using an external url.
   *
   * Returns information about the imported file.
   * Specify the `parentFolderId` and `filePath` parameters to specify which folder you want the file to be imported to.
   * If no folder is specified, the file is imported to the `media-root` folder.
   *
   * >**Notes:**
   * > - The `media` property isn't returned in the `files` response object.
   * > - When you import a file, it's not immediately available, meaning you can't manage or use the file straight away. Learn more about knowing when a file is ready ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/importing-files#backend-modules_media_files_knowing-when-a-file-is-ready) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/importing-files#knowing-when-a-file-is-ready)).
   *
   * To import a file, you need to do one of the following:
   * - Specify its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the `mimeType` field of the request. For example, `mimeType: 'image/jpeg'`.
   * - Specify its extension in either the `displayName` or `url` field of the request. For example, `displayName: 'Example Image.jpeg` or `url: https://www.example.com/image.jpeg`.
   * - Ensure the server hosting the file supports HEAD requests. In these cases the Wix servers can retrieve the MIME type from the hosting server.
   * > **Note:** If you want to validate the media type, specify the file's expected media type in the optional `mediaType` field of the request.  For example, `mediaType: 'IMAGE'`.
   * @param url - Publicly accessible external file URL.
   * @public
   * @requiredField url
   * @param options - Options to use when importing a single file.
   * @permissionId MEDIA.SITE_MEDIA_FILES_IMPORT
   * @adminMethod
   */
  function importFile(url: string, options?: ImportFileOptions): Promise<ImportFileResponse>;
  interface ImportFileOptions {
      /**
       * Media type of the file to import.
       * excluding: OTHER media type
       */
      mediaType?: MediaType$1;
      /** File name that appears in the Media Manager. */
      displayName?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Whether the file will be public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
      /** File mime type. */
      mimeType?: string;
      /** Information sent to the File Ready and File Failed events. See Importing Files ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/importing-files#backend-modules_media_files_using-externalinfo) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/importing-files#using-externalinfo)) to learn more. */
      externalInfo?: ExternalInfo;
      /** Optional parameters that should be sent with the external URL. */
      urlParams?: Record<string, any> | null;
      /** Optional headers that should be sent with the external URL. */
      urlHeaders?: Record<string, any> | null;
      /**
       * The imported file will be created under this namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The imported file will be created under this namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /**
       * Internal tags describing the item, can be used in specific clients use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The time in hours for a draft file to expire and be deleted
       * Allowed only on DRAFT namespace
       * @internal
       */
      draftTtlInHours?: number | null;
      /**
       * Configure what annotations will be done for an image file
       * @internal
       */
      imageAnnotationConfigurations?: ImageAnnotationConfigurations;
  }
  /**
   * Imports a bulk of files to the Media Manager using external urls. <br/>
   * <blockquote class='warning'>
   *
   * __Deprecation Notice:__
   *
   * This endpoint has been replaced with Bulk Import File and will be removed on March 31, 2024.
   *
   * </blockquote>
   *
   * Returns information about the imported files.
   *
   * Use the `parentFolderId` and `filePath` parameters to specify the folder you want each file to be imported to.
   * If no folder is specified, the file is imported to the `media-root` folder.
   *
   * >**Notes:**
   * > - The `media` property isn't returned in the `files` response object.
   * > - When you import a file, it's not immediately available, meaning you can't manage or use the file straight away. Learn more about knowing when a file is ready ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/importing-files#backend-modules_media_files_knowing-when-a-file-is-ready) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/importing-files#knowing-when-a-file-is-ready)).
   *
   * To import files, you need to do one of the following for each file:
   * - Specify its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the `mimeType` field of the request. For example, `mimeType: 'image/jpeg'`.
   * - Include its extension in either the `displayName` or `url` field of the request. For example, `displayName: 'Example Image.jpeg` or `url: https://www.example.com/image.jpeg`.
   * - Ensure the server hosting the file supports HEAD requests. In these cases the Wix servers can retrieve the MIME type from the hosting server.
   * > **Note:** If you want to validate the media type, specify the file's expected media type in the optional `mediaType` field of the request.  For example, `mediaType: 'IMAGE'`.
   * @param importFileRequests - Information about the files to import.
   * @public
   * @requiredField importFileRequests
   * @requiredField importFileRequests.url
   * @param options - Options to use when uploading multiple files.
   * @permissionId MEDIA.SITE_MEDIA_FILES_IMPORT
   * @adminMethod
   * @deprecated
   * @replacedBy com.wix.media.site_media.v1.FilesService.BulkImportFile
   * @targetRemovalDate 2024-03-31
   */
  function bulkImportFiles(importFileRequests: ImportFileRequest[]): Promise<BulkImportFilesResponse>;
  /**
   * Imports a bulk of files to the Media Manager using external urls. <br/>
   *
   * Returns information about the imported files.
   *
   * Specify the `parentFolderId` and `filePath` parameters to specify the folder you want each file to be imported to.
   * If no folder is specified, the file is imported to the `media-root` folder.
   *
   * >**Notes:**
   * > - The `media` property isn't returned in the `files` response object.
   * > - When you import a file, it's not immediately available, meaning you can't manage or use the file straight away. Learn more about knowing when a file is ready ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/importing-files#backend-modules_media_files_knowing-when-a-file-is-ready) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/importing-files#knowing-when-a-file-is-ready)).
   *
   * To import files, you need to do one of the following for each file:
   * - Specify its [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types) in the `mimeType` field of the request. For example, `mimeType: 'image/jpeg'`.
   * - Include its extension in either the `displayName` or `url` field of the request. For example, `displayName: 'Example Image.jpeg` or `url: https://www.example.com/image.jpeg`.
   * - Ensure the server hosting the file supports HEAD requests. In these cases the Wix servers can retrieve the MIME type from the hosting server.
   * > **Note:** If you want to validate the media type, specify the file's expected media type in the optional `mediaType` field of the request.  For example, `mediaType: 'IMAGE'`.
   * @param importFileRequests - Information about the files to import.
   * @public
   * @requiredField importFileRequests
   * @requiredField importFileRequests.url
   * @param options - Options to include the file descriptor in the response.
   * @permissionId MEDIA.SITE_MEDIA_FILES_IMPORT
   * @adminMethod
   */
  function bulkImportFile(importFileRequests: ImportFileRequest[], options?: BulkImportFileOptions): Promise<BulkImportFileResponse>;
  interface BulkImportFileOptions {
      /** Default: `true` */
      returnEntity?: boolean | null;
  }
  /**
   * Retrieves a list of files in the Media Manager.
   *
   * To retrieve a list of files within a specific folder in the Media Manager, specify the folder's ID in the `parentFolderId` parameter. If no folder is specified, the method retrieves the list of files in the root folder of the Media Manager.
   * @public
   * @param options - Options to use when listing media files.
   * @permissionId MEDIA.SITE_MEDIA_FILES_LIST
   * @adminMethod
   */
  function listFiles(options?: ListFilesOptions): Promise<ListFilesResponse>;
  interface ListFilesOptions {
      /**
       * ID of the file's parent folder. <br />
       * Default:`media-root`.
       */
      parentFolderId?: string | null;
      /** File media type. */
      mediaTypes?: MediaType$1[];
      /** \n`true`: Returns only private files. \n`false`: Returns only public files. \n`undefined`: Returns public and private files. \n Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$2;
      /** Cursor and paging information. */
      paging?: CursorPaging$2;
      /**
       * List files of the specified namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List files of the specified namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
  }
  /**
   * Searches all folders in the Media Manager and returns a list of files that match the terms specified in the parameters. <br/>
   *
   * If no parameters are specified, the endpoint returns all files in the `MEDIA_ROOT` folder.
   * @public
   * @param options - Options to specify which folders to search.
   * @permissionId MEDIA.SITE_MEDIA_FILES_LIST
   * @adminMethod
   */
  function searchFiles(options?: SearchFilesOptions): Promise<SearchFilesResponse>;
  interface SearchFilesOptions {
      /**
       * Term to search for. Possible terms include the value of a file's
       * `displayName`, `mimeType`, and `label`. <br />
       * For example, if a file's label is cat, the search term is 'cat'.
       */
      search?: string | null;
      /**
       * A root folder in the media manager to search in. <br />
       * Default: `MEDIA_ROOT`.
       */
      rootFolder?: RootFolder$2;
      /** File media type. */
      mediaTypes?: MediaType$1[];
      /** \n`true`: Returns only private files. \n`false`: Returns only public files. \n`undefined`: Returns public and private files. \n Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$2;
      /** Cursor and paging information. */
      paging?: CursorPaging$2;
      /**
       * search by an internal tag that describe the item - for internal wix use only
       * @internal
       */
      internalTag?: string | null;
      /**
       * Search files of the specified namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * Search files of the specified namespace <br/>
       * Note - Namespace value `Others` is not supported in this request and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
  }
  /**
   * Generates a URL for streaming a specific video file in the Media Manager. <br/>
   *
   * To stream different assets of the file, specify the `assetKeys` parameter which generates a video streaming URL for each asset. If no assetKey is specified, it defaults to `src`, which generates one video streaming URL in the original file's format and quality.
   * @public
   * @requiredField fileId
   * @param options - Options to use when generating a video file's streaming URL.
   * @param fileId - File ID.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_READ
   * @adminMethod
   */
  function generateVideoStreamingUrl(fileId: string, options?: GenerateVideoStreamingUrlOptions): Promise<GenerateVideoStreamingUrlResponse>;
  interface GenerateVideoStreamingUrlOptions {
      /** Video stream format. */
      format?: StreamFormat;
  }
  /**
   * Return a token for a direct web socket notification channel
   * This API is not platformized (Contact the Media team for use instructions)
   * This API should be internal only
   * @internal
   * @documentationMaturity preview
   * @permissionId MEDIA.SITE_MEDIA_WEB_NOTIFICATIONS_TOKEN
   * @adminMethod
   */
  function generateWebSocketToken(): Promise<GenerateWebSocketTokenResponse>;
  /**
   * Deletes the specified files from the Media Manager. <br/>
   *
   * The deleted files are moved to the Media Manager's trash bin (`TRASH-ROOT` folder) unless permanently deleted. To permanently delete files, specify the `permanent` parameter with the value `true`. Permanently deleting files isn't reversible, so make sure that these files aren't being used in a site or in any other way as the files will no longer be accessible.
   *
   * Note the following:
   * * The specified files can be from different folders.
   * * Moving multiple files at once is an asynchronous action, and may take time for the changes to appear in the Media Manager.
   * * Attempting to delete files that are already in the trash bin doesn't result in an error.
   * * If a site contains deleted media files, the deleted media files still appear on the site as the files are still in the Media Manager (in the trash bin).
   * * You can use Bulk Restore Files From Trash Bin to restore files from the Media Manager's trash bin.
   * @public
   * @requiredField fileIds
   * @param options - Options to use when deleting files.
   * @param fileIds - IDs of the files to move to the Media Manager's trash bin.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_MOVE_TO_TRASH
   * @adminMethod
   */
  function bulkDeleteFiles(fileIds: string[], options?: BulkDeleteFilesOptions): Promise<void>;
  interface BulkDeleteFilesOptions {
      /**
       * Whether the specified files are permanently deleted. <br />
       * Default: `false`
       */
      permanent?: boolean;
  }
  /**
   * Restores the specified files from the Media Manager's trash bin, and moves them to their original locations in the Media Manager.
   * @public
   * @requiredField fileIds
   * @param fileIds - IDs of the files to restore from the Media Manager's trash bin.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_RESTORE_FROM_TRASH
   * @adminMethod
   */
  function bulkRestoreFilesFromTrashBin(fileIds: string[]): Promise<void>;
  /**
   * Retrieves a list of files in the Media Manager's trash bin. <br/>
   *
   * >**Note:** The Media Manager's trash bin (`TRASH-ROOT` folder) only contains temporarily deleted files, not permanently deleted files.
   * @public
   * @param options - Options to use when listing deleted files from the trash bin.
   * @permissionId MEDIA.SITE_MEDIA_FILES_LIST_DELETED
   * @adminMethod
   */
  function listDeletedFiles(options?: ListDeletedFilesOptions): Promise<ListDeletedFilesResponse>;
  interface ListDeletedFilesOptions {
      /**
       * ID of the file's parent folder. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** File media type. */
      mediaTypes?: MediaType$1[];
      /** \n`true`: Returns only private files. \n`false`: Returns only public files. \n`undefined`: Returns public and private files. \n Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)). */
      private?: boolean | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$2;
      /** Cursor and paging information. */
      paging?: CursorPaging$2;
      /**
       * List files of the specified namespace
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List files of the specified namespace
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$2;
  }
  /**
   * @param fileIds - IDs of the draft files to be published.
   *
   * You can also specify the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more about the file ID parameter ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/file-and-folder-ids#file-id-as-a-parameter) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/file-id#file-id-as-a-parameter)).
   * @internal
   * @documentationMaturity preview
   * @requiredField fileIds
   * @permissionId MEDIA.SITE_MEDIA_FILES_PUBLISH
   * @adminMethod
   */
  function bulkPublishDraftFiles(fileIds: string[], options?: BulkPublishDraftFilesOptions): Promise<BulkPublishDraftFilesResponse>;
  interface BulkPublishDraftFilesOptions {
      /**
       * The namespace the files will be published to
       * Note, private files must have a namespace
       */
      namespace?: Namespace$2;
      /**
       * ID of the file's parent folder. <br />
       * This folder is the path root for the `filePath`. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /**
       * Path to the folder where the file will be stored.
       * For example, `/videos/2024/december`. <br/>
       * If `parentFolderId` is defined, the parent folder is used as the path root. Otherwise, the root is `media-root`.
       * The folders in the path will be created if they don't already exist.  <br />
       */
      filePath?: string | null;
      /** Should the response return the item following the operation */
      returnEntity?: boolean;
  }
  /**
   * Updates a file.
   *
   * <blockquote class='warning'>
   *
   * __Deprecation Notice:__
   *
   * This endpoint has been replaced with [Update File Descriptor](https://dev.wix.com/api/rest/media/media-manager/files/update-file-descriptor) and will be removed on March 31, 2023.
   *
   * </blockquote>
   *
   * Specify the `parentFolderId` parameter to move a file from its current folder to a different folder.
   * @internal
   * @requiredField fileId
   * @param options - Fields to update.
   * @param fileId - ID of the file to update.
   *
   * You can also pass the files' Wix media URLs. For example, `["wix:image://v1/0abec0_b291a9349a0b4da59067f76287e386fb~mv2.jpg/leon.jpg#originWidth=3024&originHeight=4032"]`.
   * Learn more in the File and Folder IDs article.
   * @permissionId MEDIA.SITE_MEDIA_FILES_UPDATE
   * @adminMethod
   * @deprecated method is deprecated due to standard aligning
   * @replacedBy com.wix.media.site_media.v1.filesService.UpdateFileDescriptor
   * @targetRemovalDate 2023-03-31
   */
  function updateFile(fileId: string, options?: UpdateFileOptions): Promise<UpdateFileResponse>;
  interface UpdateFileOptions {
      /** File name that appears in the Media Manager. */
      displayName?: string | null;
      /**
       * ID of the file's parent folder. <br />
       * Default: `media-root`.
       */
      parentFolderId?: string | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[] | null;
  }
  
  type mediaSiteMediaV1FileDescriptor_universal_d_FileReady = FileReady;
  type mediaSiteMediaV1FileDescriptor_universal_d_ExternalInfo = ExternalInfo;
  type mediaSiteMediaV1FileDescriptor_universal_d_FileFailed = FileFailed;
  type mediaSiteMediaV1FileDescriptor_universal_d_ApplicationError = ApplicationError;
  type mediaSiteMediaV1FileDescriptor_universal_d_DraftFilePublished = DraftFilePublished;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImagesRequest = BulkAnnotateImagesRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_ImageAnnotationType = ImageAnnotationType;
  const mediaSiteMediaV1FileDescriptor_universal_d_ImageAnnotationType: typeof ImageAnnotationType;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImagesResponse = BulkAnnotateImagesResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImageResult = BulkAnnotateImageResult;
  type mediaSiteMediaV1FileDescriptor_universal_d_ItemMetadata = ItemMetadata;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkActionMetadata = BulkActionMetadata;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFilesDownloadUrlRequest = GenerateFilesDownloadUrlRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFilesDownloadUrlResponse = GenerateFilesDownloadUrlResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileDownloadUrlRequest = GenerateFileDownloadUrlRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_ContentDisposition = ContentDisposition;
  const mediaSiteMediaV1FileDescriptor_universal_d_ContentDisposition: typeof ContentDisposition;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileDownloadUrlResponse = GenerateFileDownloadUrlResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_DownloadUrl = DownloadUrl;
  type mediaSiteMediaV1FileDescriptor_universal_d_ServiceError = ServiceError;
  type mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorRequest = GetFileDescriptorRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorResponse = GetFileDescriptorResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorsRequest = GetFileDescriptorsRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorsResponse = GetFileDescriptorsResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileDescriptorRequest = UpdateFileDescriptorRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileDescriptorResponse = UpdateFileDescriptorResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileUploadUrlRequest = GenerateFileUploadUrlRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_ImageAnnotationConfigurations = ImageAnnotationConfigurations;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileUploadUrlResponse = GenerateFileUploadUrlResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_SiteQuotaExceededError = SiteQuotaExceededError;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileResumableUploadUrlRequest = GenerateFileResumableUploadUrlRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_UploadProtocol = UploadProtocol;
  const mediaSiteMediaV1FileDescriptor_universal_d_UploadProtocol: typeof UploadProtocol;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileResumableUploadUrlResponse = GenerateFileResumableUploadUrlResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_ImportFileRequest = ImportFileRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_ImportFileResponse = ImportFileResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFilesRequest = BulkImportFilesRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFilesResponse = BulkImportFilesResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileRequest = BulkImportFileRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileResponse = BulkImportFileResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileResult = BulkImportFileResult;
  type mediaSiteMediaV1FileDescriptor_universal_d_ListFilesRequest = ListFilesRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_ListFilesResponse = ListFilesResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_SearchFilesRequest = SearchFilesRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_SearchFilesResponse = SearchFilesResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateVideoStreamingUrlRequest = GenerateVideoStreamingUrlRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_StreamFormat = StreamFormat;
  const mediaSiteMediaV1FileDescriptor_universal_d_StreamFormat: typeof StreamFormat;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateVideoStreamingUrlResponse = GenerateVideoStreamingUrlResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateWebSocketTokenRequest = GenerateWebSocketTokenRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateWebSocketTokenResponse = GenerateWebSocketTokenResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkDeleteFilesRequest = BulkDeleteFilesRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkDeleteFilesResponse = BulkDeleteFilesResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkRestoreFilesFromTrashBinRequest = BulkRestoreFilesFromTrashBinRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkRestoreFilesFromTrashBinResponse = BulkRestoreFilesFromTrashBinResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_ListDeletedFilesRequest = ListDeletedFilesRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_ListDeletedFilesResponse = ListDeletedFilesResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFilesRequest = BulkPublishDraftFilesRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFilesResponse = BulkPublishDraftFilesResponse;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFileResult = BulkPublishDraftFileResult;
  type mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileRequest = UpdateFileRequest;
  type mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileResponse = UpdateFileResponse;
  const mediaSiteMediaV1FileDescriptor_universal_d_bulkAnnotateImages: typeof bulkAnnotateImages;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImagesOptions = BulkAnnotateImagesOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_generateFilesDownloadUrl: typeof generateFilesDownloadUrl;
  const mediaSiteMediaV1FileDescriptor_universal_d_generateFileDownloadUrl: typeof generateFileDownloadUrl;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileDownloadUrlOptions = GenerateFileDownloadUrlOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_getFileDescriptor: typeof getFileDescriptor;
  const mediaSiteMediaV1FileDescriptor_universal_d_getFileDescriptors: typeof getFileDescriptors;
  const mediaSiteMediaV1FileDescriptor_universal_d_updateFileDescriptor: typeof updateFileDescriptor;
  type mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileDescriptorOptions = UpdateFileDescriptorOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_generateFileUploadUrl: typeof generateFileUploadUrl;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileUploadUrlOptions = GenerateFileUploadUrlOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_generateFileResumableUploadUrl: typeof generateFileResumableUploadUrl;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileResumableUploadUrlOptions = GenerateFileResumableUploadUrlOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_importFile: typeof importFile;
  type mediaSiteMediaV1FileDescriptor_universal_d_ImportFileOptions = ImportFileOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_bulkImportFiles: typeof bulkImportFiles;
  const mediaSiteMediaV1FileDescriptor_universal_d_bulkImportFile: typeof bulkImportFile;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileOptions = BulkImportFileOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_listFiles: typeof listFiles;
  type mediaSiteMediaV1FileDescriptor_universal_d_ListFilesOptions = ListFilesOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_searchFiles: typeof searchFiles;
  type mediaSiteMediaV1FileDescriptor_universal_d_SearchFilesOptions = SearchFilesOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_generateVideoStreamingUrl: typeof generateVideoStreamingUrl;
  type mediaSiteMediaV1FileDescriptor_universal_d_GenerateVideoStreamingUrlOptions = GenerateVideoStreamingUrlOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_generateWebSocketToken: typeof generateWebSocketToken;
  const mediaSiteMediaV1FileDescriptor_universal_d_bulkDeleteFiles: typeof bulkDeleteFiles;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkDeleteFilesOptions = BulkDeleteFilesOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_bulkRestoreFilesFromTrashBin: typeof bulkRestoreFilesFromTrashBin;
  const mediaSiteMediaV1FileDescriptor_universal_d_listDeletedFiles: typeof listDeletedFiles;
  type mediaSiteMediaV1FileDescriptor_universal_d_ListDeletedFilesOptions = ListDeletedFilesOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_bulkPublishDraftFiles: typeof bulkPublishDraftFiles;
  type mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFilesOptions = BulkPublishDraftFilesOptions;
  const mediaSiteMediaV1FileDescriptor_universal_d_updateFile: typeof updateFile;
  type mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileOptions = UpdateFileOptions;
  namespace mediaSiteMediaV1FileDescriptor_universal_d {
    export {
      FileDescriptor$1 as FileDescriptor,
      MediaType$1 as MediaType,
      FileMedia$1 as FileMedia,
      FileMediaMediaOneOf$1 as FileMediaMediaOneOf,
      ImageMedia$1 as ImageMedia,
      FocalPoint$1 as FocalPoint,
      Colors$1 as Colors,
      Color$1 as Color,
      ColorRGB$1 as ColorRGB,
      FaceRecognition$1 as FaceRecognition,
      VideoResolution$1 as VideoResolution,
      AudioV2$1 as AudioV2,
      Archive$1 as Archive,
      Model3D$1 as Model3D,
      OtherMedia$1 as OtherMedia,
      FontMedia$1 as FontMedia,
      FontAsset$1 as FontAsset,
      OperationStatus$1 as OperationStatus,
      State$2 as State,
      Namespace$2 as Namespace,
      IdentityInfo$1 as IdentityInfo,
      IdentityType$1 as IdentityType,
      mediaSiteMediaV1FileDescriptor_universal_d_FileReady as FileReady,
      mediaSiteMediaV1FileDescriptor_universal_d_ExternalInfo as ExternalInfo,
      mediaSiteMediaV1FileDescriptor_universal_d_FileFailed as FileFailed,
      mediaSiteMediaV1FileDescriptor_universal_d_ApplicationError as ApplicationError,
      mediaSiteMediaV1FileDescriptor_universal_d_DraftFilePublished as DraftFilePublished,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImagesRequest as BulkAnnotateImagesRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_ImageAnnotationType as ImageAnnotationType,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImagesResponse as BulkAnnotateImagesResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImageResult as BulkAnnotateImageResult,
      mediaSiteMediaV1FileDescriptor_universal_d_ItemMetadata as ItemMetadata,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkActionMetadata as BulkActionMetadata,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFilesDownloadUrlRequest as GenerateFilesDownloadUrlRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFilesDownloadUrlResponse as GenerateFilesDownloadUrlResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileDownloadUrlRequest as GenerateFileDownloadUrlRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_ContentDisposition as ContentDisposition,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileDownloadUrlResponse as GenerateFileDownloadUrlResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_DownloadUrl as DownloadUrl,
      mediaSiteMediaV1FileDescriptor_universal_d_ServiceError as ServiceError,
      mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorRequest as GetFileDescriptorRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorResponse as GetFileDescriptorResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorsRequest as GetFileDescriptorsRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_GetFileDescriptorsResponse as GetFileDescriptorsResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileDescriptorRequest as UpdateFileDescriptorRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileDescriptorResponse as UpdateFileDescriptorResponse,
      UnsupportedRequestValueError$2 as UnsupportedRequestValueError,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileUploadUrlRequest as GenerateFileUploadUrlRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_ImageAnnotationConfigurations as ImageAnnotationConfigurations,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileUploadUrlResponse as GenerateFileUploadUrlResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_SiteQuotaExceededError as SiteQuotaExceededError,
      TotalQuota$1 as TotalQuota,
      Plans$1 as Plans,
      Plan$1 as Plan,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileResumableUploadUrlRequest as GenerateFileResumableUploadUrlRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_UploadProtocol as UploadProtocol,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileResumableUploadUrlResponse as GenerateFileResumableUploadUrlResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_ImportFileRequest as ImportFileRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_ImportFileResponse as ImportFileResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFilesRequest as BulkImportFilesRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFilesResponse as BulkImportFilesResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileRequest as BulkImportFileRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileResponse as BulkImportFileResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileResult as BulkImportFileResult,
      mediaSiteMediaV1FileDescriptor_universal_d_ListFilesRequest as ListFilesRequest,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      CursorPaging$2 as CursorPaging,
      mediaSiteMediaV1FileDescriptor_universal_d_ListFilesResponse as ListFilesResponse,
      PagingMetadataV2$2 as PagingMetadataV2,
      Cursors$2 as Cursors,
      mediaSiteMediaV1FileDescriptor_universal_d_SearchFilesRequest as SearchFilesRequest,
      RootFolder$2 as RootFolder,
      mediaSiteMediaV1FileDescriptor_universal_d_SearchFilesResponse as SearchFilesResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateVideoStreamingUrlRequest as GenerateVideoStreamingUrlRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_StreamFormat as StreamFormat,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateVideoStreamingUrlResponse as GenerateVideoStreamingUrlResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateWebSocketTokenRequest as GenerateWebSocketTokenRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateWebSocketTokenResponse as GenerateWebSocketTokenResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkDeleteFilesRequest as BulkDeleteFilesRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkDeleteFilesResponse as BulkDeleteFilesResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkRestoreFilesFromTrashBinRequest as BulkRestoreFilesFromTrashBinRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkRestoreFilesFromTrashBinResponse as BulkRestoreFilesFromTrashBinResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_ListDeletedFilesRequest as ListDeletedFilesRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_ListDeletedFilesResponse as ListDeletedFilesResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFilesRequest as BulkPublishDraftFilesRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFilesResponse as BulkPublishDraftFilesResponse,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFileResult as BulkPublishDraftFileResult,
      mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileRequest as UpdateFileRequest,
      mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileResponse as UpdateFileResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      mediaSiteMediaV1FileDescriptor_universal_d_bulkAnnotateImages as bulkAnnotateImages,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkAnnotateImagesOptions as BulkAnnotateImagesOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_generateFilesDownloadUrl as generateFilesDownloadUrl,
      mediaSiteMediaV1FileDescriptor_universal_d_generateFileDownloadUrl as generateFileDownloadUrl,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileDownloadUrlOptions as GenerateFileDownloadUrlOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_getFileDescriptor as getFileDescriptor,
      mediaSiteMediaV1FileDescriptor_universal_d_getFileDescriptors as getFileDescriptors,
      mediaSiteMediaV1FileDescriptor_universal_d_updateFileDescriptor as updateFileDescriptor,
      mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileDescriptorOptions as UpdateFileDescriptorOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_generateFileUploadUrl as generateFileUploadUrl,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileUploadUrlOptions as GenerateFileUploadUrlOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_generateFileResumableUploadUrl as generateFileResumableUploadUrl,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateFileResumableUploadUrlOptions as GenerateFileResumableUploadUrlOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_importFile as importFile,
      mediaSiteMediaV1FileDescriptor_universal_d_ImportFileOptions as ImportFileOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_bulkImportFiles as bulkImportFiles,
      mediaSiteMediaV1FileDescriptor_universal_d_bulkImportFile as bulkImportFile,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkImportFileOptions as BulkImportFileOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_listFiles as listFiles,
      mediaSiteMediaV1FileDescriptor_universal_d_ListFilesOptions as ListFilesOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_searchFiles as searchFiles,
      mediaSiteMediaV1FileDescriptor_universal_d_SearchFilesOptions as SearchFilesOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_generateVideoStreamingUrl as generateVideoStreamingUrl,
      mediaSiteMediaV1FileDescriptor_universal_d_GenerateVideoStreamingUrlOptions as GenerateVideoStreamingUrlOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_generateWebSocketToken as generateWebSocketToken,
      mediaSiteMediaV1FileDescriptor_universal_d_bulkDeleteFiles as bulkDeleteFiles,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkDeleteFilesOptions as BulkDeleteFilesOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_bulkRestoreFilesFromTrashBin as bulkRestoreFilesFromTrashBin,
      mediaSiteMediaV1FileDescriptor_universal_d_listDeletedFiles as listDeletedFiles,
      mediaSiteMediaV1FileDescriptor_universal_d_ListDeletedFilesOptions as ListDeletedFilesOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_bulkPublishDraftFiles as bulkPublishDraftFiles,
      mediaSiteMediaV1FileDescriptor_universal_d_BulkPublishDraftFilesOptions as BulkPublishDraftFilesOptions,
      mediaSiteMediaV1FileDescriptor_universal_d_updateFile as updateFile,
      mediaSiteMediaV1FileDescriptor_universal_d_UpdateFileOptions as UpdateFileOptions,
    };
  }
  
  interface Folder {
      /** Folder ID. Generated when a folder is created in the Media Manager. */
      _id?: string;
      /** Folder name as it appears in the Media Manager. */
      displayName?: string;
      /** ID of the folder's parent folder. <br /> Default: `media-root` folder. */
      parentFolderId?: string;
      /**
       * Date the folder was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the folder was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * State of the folder.
       * @readonly
       */
      state?: State$1;
      /**
       * Namespace of the folder.
       * @internal
       */
      namespace?: Namespace$1;
  }
  enum State$1 {
      OK = "OK",
      DELETED = "DELETED"
  }
  enum Namespace$1 {
      NO_NAMESPACE = "NO_NAMESPACE",
      OTHERS = "OTHERS",
      /** ANY = 2; */
      WIX_VIDEO = "WIX_VIDEO",
      /** _nsWixMusic */
      WIX_MUSIC = "WIX_MUSIC",
      /** _nsArtStore */
      ALBUMS_AND_ART_STORE = "ALBUMS_AND_ART_STORE",
      /** _nsDigitalProduct */
      WIX_ECOM = "WIX_ECOM",
      /** _nsPhotoShareApp */
      PHOTO_SHARE_APP = "PHOTO_SHARE_APP",
      /** _nsSharingApp, */
      SHARING_APP = "SHARING_APP",
      /** engage */
      CHAT = "CHAT",
      /** logobuilder */
      LOGO_BUILDER = "LOGO_BUILDER",
      /** WixExposure */
      ALBUMS_OLD = "ALBUMS_OLD",
      /** chat-mobile-uploads */
      CHAT_MOBILE = "CHAT_MOBILE",
      /** _nsWixForms */
      WIX_FORMS = "WIX_FORMS",
      /** _nsDraft */
      DRAFTS = "DRAFTS"
  }
  interface CreateFolderRequest {
      /** Folder name that appears in the Media Manager. */
      displayName: string;
      /** ID of the folder's parent folder. */
      parentFolderId?: string | null;
      /**
       * The namespace this folder will be created under
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The namespace this folder will be created under
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  interface CreateFolderResponse {
      /** Information about the newly created folder. */
      folder?: Folder;
  }
  interface GetFolderRequest {
      /** Folder ID. */
      folderId: string;
  }
  interface GetFolderResponse {
      /** Information about the folder. */
      folder?: Folder;
  }
  interface ListFoldersRequest {
      /**
       * ID of the folder's parent folder.
       * <br /> Default: `media-root` folder.
       */
      parentFolderId?: string | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$1;
      /** Cursor and paging information. */
      paging?: CursorPaging$1;
      /**
       * List folders of the specified namespace.
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List folders of the specified namespace.
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder$1;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
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
  interface ListFoldersResponse {
      /** Information about the folders in the requested folder. */
      folders?: Folder[];
      /** The next cursor if it exists. */
      nextCursor?: PagingMetadataV2$1;
  }
  interface PagingMetadataV2$1 {
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors$1;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors$1 {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
  }
  interface SearchFoldersRequest {
      /**
       * A root folder in the Media Manager to search in. <br />
       * Default: `MEDIA_ROOT`.
       */
      rootFolder?: RootFolder$1;
      /**
       * Field name and order to sort by. One of:
       * * `displayName`
       * * `updatedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$1;
      /** Cursor and paging information. */
      paging?: CursorPaging$1;
      /**
       * Term to search for, such as the value of a folder's `displayName`. <br />
       * For example, if a folder's `displayName` is 'my-videos-folder', the search term is 'my-videos-folder'.
       */
      search?: string | null;
      /**
       * Search folders of the specified namespace.
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * Search folders of the specified namespace.
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  enum RootFolder$1 {
      /** Root of all site media */
      MEDIA_ROOT = "MEDIA_ROOT",
      /** Root of the trash system folder */
      TRASH_ROOT = "TRASH_ROOT",
      /** Root of all visitor uploads */
      VISITOR_UPLOADS_ROOT = "VISITOR_UPLOADS_ROOT"
  }
  interface SearchFoldersResponse {
      /** Information about the folders in the requested folder. */
      folders?: Folder[];
      /** The next cursor if it exists. */
      nextCursor?: PagingMetadataV2$1;
  }
  interface UpdateFolderRequest {
      /** Folder to update. */
      folder: Folder;
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  interface UpdateFolderResponse {
      /** Information about the updated folder. */
      folder?: Folder;
  }
  interface UnsupportedRequestValueError$1 {
      /** Optional A list of allowed values */
      allowedValues?: string[];
      /** The unsupported value send in the request */
      requestValue?: string;
  }
  interface GenerateFolderDownloadUrlRequest {
      /** Folder ID. */
      folderId: string;
  }
  interface GenerateFolderDownloadUrlResponse {
      /** URL for downloading a specific folder in the Media Manager. */
      downloadUrl?: string;
  }
  interface BulkDeleteFoldersRequest {
      /** IDs of the folders to move to the Media Manager's trash bin. */
      folderIds: string[];
      /**
       * Whether the specified folders are permanently deleted. <br />
       * Default: `false`
       */
      permanent?: boolean;
  }
  interface BulkDeleteFoldersResponse {
  }
  interface BulkRestoreFoldersFromTrashBinRequest {
      /** IDs of the folders to restore from the Media Manager's trash bin. */
      folderIds: string[];
  }
  interface BulkRestoreFoldersFromTrashBinResponse {
  }
  interface ListDeletedFoldersRequest {
      /** ID of the folder's parent folder. */
      parentFolderId?: string | null;
      /**
       * Field name and order to sort by. One of:
       * * `displayName`
       * * `updatedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$1;
      /** Cursor and paging information. */
      paging?: CursorPaging$1;
      /**
       * List folders of the specified namespace.
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List folders of the specified namespace.
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  interface ListDeletedFoldersResponse {
      /** List of folders in the Media Manager's trash bin. */
      folders?: Folder[];
      /** The next cursor if it exists. */
      nextCursor?: PagingMetadataV2$1;
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
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
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
      /**
       * This field is currently part of the of the EntityUpdatedEvent msg, but scala/node libraries which implements the domain events standard
       * wont populate it / have any reference to it in the API.
       * The main reason for it is that fetching the old entity from the DB will have a performance hit on an update operation so unless truly needed,
       * the developer should send only the new (current) entity.
       * An additional reason is not wanting to send this additional entity over the wire (kafka) since in some cases it can be really big
       * Developers that must reflect the old entity will have to implement their own domain event sender mechanism which will follow the DomainEvent proto message.
       * @internal
       * @deprecated
       */
      previousEntityAsJson?: string | null;
      /**
       * WIP - This property will hold both names and previous values of the updated fields of the entity.
       * For more details please see [adr](https://docs.google.com/document/d/1PdqsOM20Ph2HAkmx8zvUnzzk3Sekp3BR9h34wSvsRnI/edit#heading=h.phlw87mh2imx) or [issue](https://github.com/wix-private/nile-tracker/issues/363)
       * @internal
       */
      modifiedFields?: Record<string, any>;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface EntityDeletedEvent {
      /**
       * Indicates if the entity is sent to trash-bin. only available when trash-bin is enabled
       * @internal
       */
      movedToTrash?: boolean | null;
      /** Entity that was deleted */
      deletedEntityAsJson?: string | null;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
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
   * Creates a new folder in the Media Manager. <br/>
   *
   * Use the `parentFolderId` parameter to specify in which existing folder you want the new folder to be created.
   * If no folder is specified, the new folder is created in the `media-root` folder.
   * @param displayName - Folder name that appears in the Media Manager.
   * @public
   * @requiredField displayName
   * @param options - Options for specifying where to create a folder.
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_CREATE
   * @adminMethod
   */
  function createFolder(displayName: string, options?: CreateFolderOptions): Promise<CreateFolderResponse>;
  interface CreateFolderOptions {
      /** ID of the folder's parent folder. */
      parentFolderId?: string | null;
      /**
       * The namespace this folder will be created under
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * The namespace this folder will be created under
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  /**
   * Gets information from a specific folder in the Media Manager.
   * @param folderId - Folder ID.
   * @public
   * @requiredField folderId
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_READ
   * @adminMethod
   * @returns Information about the folder.
   */
  function getFolder(folderId: string): Promise<Folder>;
  /**
   * Retrieves a list of folders in the Media Manager. To retrieve a list of folders within a specific folder in the Media Manager, specify the specific folder's ID in the `parentFolderId` parameter. If no folder is specified, the method retrieves a list of folders within the root folder of the Media Manager.
   * @public
   * @param options - Options to use when listing folders from the Media Manager.
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_LIST
   * @adminMethod
   */
  function listFolders(options?: ListFoldersOptions): Promise<ListFoldersResponse>;
  interface ListFoldersOptions {
      /**
       * ID of the folder's parent folder.
       * <br /> Default: `media-root` folder.
       */
      parentFolderId?: string | null;
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$1;
      /** Cursor and paging information. */
      paging?: CursorPaging$1;
      /**
       * List folders of the specified namespace.
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List folders of the specified namespace.
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  /**
   * Searches the Media Manager and returns a list of folders that match the terms specified in the parameters. <br/>
   *
   * If no parameters are specified, the method returns all folders in the `MEDIA_ROOT` folder.
   * @public
   * @param options - Options specifying which folders to search.
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_LIST
   * @adminMethod
   */
  function searchFolders(options?: SearchFoldersOptions): Promise<SearchFoldersResponse>;
  interface SearchFoldersOptions {
      /**
       * A root folder in the Media Manager to search in. <br />
       * Default: `MEDIA_ROOT`.
       */
      rootFolder?: RootFolder$1;
      /**
       * Field name and order to sort by. One of:
       * * `displayName`
       * * `updatedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$1;
      /** Cursor and paging information. */
      paging?: CursorPaging$1;
      /**
       * Term to search for, such as the value of a folder's `displayName`. <br />
       * For example, if a folder's `displayName` is 'my-videos-folder', the search term is 'my-videos-folder'.
       */
      search?: string | null;
      /**
       * Search folders of the specified namespace.
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * Search folders of the specified namespace.
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  /**
   * Updates a folder. <br />
   *
   * You can use the `parentFolderId` parameter to move a folder from its current parent folder to a different parent folder.
   * @param _id - Folder ID. Generated when a folder is created in the Media Manager.
   * @public
   * @requiredField _id
   * @requiredField folder
   * @param folder - Folder to update.
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_UPDATE
   * @adminMethod
   * @returns Information about the updated folder.
   */
  function updateFolder(_id: string, folder: UpdateFolder, options?: UpdateFolderOptions): Promise<Folder>;
  interface UpdateFolder {
      /** Folder ID. Generated when a folder is created in the Media Manager. */
      _id?: string;
      /** Folder name as it appears in the Media Manager. */
      displayName?: string;
      /** ID of the folder's parent folder. <br /> Default: `media-root` folder. */
      parentFolderId?: string;
      /**
       * Date the folder was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date the folder was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * State of the folder.
       * @readonly
       */
      state?: State$1;
      /**
       * Namespace of the folder.
       * @internal
       */
      namespace?: Namespace$1;
  }
  interface UpdateFolderOptions {
      /**
       * Set of fields to update. Fields that aren't included in `fieldMask.paths` are ignored.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Generates a URL for downloading a compressed file containing a specific folder in the Media Manager. <br/>
   *
   * The compressed file can contain sub-folders, and up to 1000 files.
   * @param folderId - Folder ID.
   * @public
   * @requiredField folderId
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_DOWNLOAD
   * @adminMethod
   */
  function generateFolderDownloadUrl(folderId: string): Promise<GenerateFolderDownloadUrlResponse>;
  /**
   * Temporarily deletes the specified folders from the Media Manager. <br/>
   *
   * The deleted folders are moved to the Media Manager's `trash-root` folder (trash bin) unless permanently deleted. To permanently delete folders, specify the `permanent` parameter with the value `true`. Permanently deleting folders isn't reversible, so make sure that the files in these folders aren't being used in a site or in any other way as the files will no longer be accessible.
   *
   * Note the following:
   * * When a folder is deleted, the files in that folder are deleted.
   * * The specified folders can be from different parent folders.
   * * Moving multiple folders at once is an asynchronous action, and may take time for the changes to appear in the Media Manager.
   * * Attempting to delete folders that are already in the trash bin doesn't result in an error.
   * * If a site contains files from a deleted media folder, the files still appear on the site as the deleted folder is still in the Media Manager (in the trash bin).
   * * You can also use the Bulk Restore Folders From Trash Bin ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/folders/bulk-restore-folders-from-trash-bin) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/folders/bulk-restore-folders-from-trash-bin)) method to restore folders from the Media Manager's trash bin.
   * @param folderIds - IDs of the folders to move to the Media Manager's trash bin.
   * @public
   * @requiredField folderIds
   * @param options - Options to use when deleting folders.
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_MOVE_TO_TRASH
   * @adminMethod
   */
  function bulkDeleteFolders(folderIds: string[], options?: BulkDeleteFoldersOptions): Promise<void>;
  interface BulkDeleteFoldersOptions {
      /**
       * Whether the specified folders are permanently deleted. <br />
       * Default: `false`
       */
      permanent?: boolean;
  }
  /**
   * Restores the specified folders from the Media Manager's trash bin, and moves them to their original locations in the Media Manager.
   * @param folderIds - IDs of the folders to restore from the Media Manager's trash bin.
   * @public
   * @requiredField folderIds
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_RESTORE_FROM_TRASH
   * @adminMethod
   */
  function bulkRestoreFoldersFromTrashBin(folderIds: string[]): Promise<void>;
  /**
   * Retrieves a list of folders in the Media Manager's trash bin.
   * @public
   * @param options - Options to use when listing deleted folders from the trash bin.
   * @permissionId MEDIA.SITE_MEDIA_FOLDERS_LIST_DELETED
   * @adminMethod
   */
  function listDeletedFolders(options?: ListDeletedFoldersOptions): Promise<ListDeletedFoldersResponse>;
  interface ListDeletedFoldersOptions {
      /** ID of the folder's parent folder. */
      parentFolderId?: string | null;
      /**
       * Field name and order to sort by. One of:
       * * `displayName`
       * * `updatedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting$1;
      /** Cursor and paging information. */
      paging?: CursorPaging$1;
      /**
       * List folders of the specified namespace.
       * @internal
       */
      rawNamespace?: string | null;
      /**
       * List folders of the specified namespace.
       * Note - Namespace value `Others` is not supported and will produce an error
       * @internal
       */
      namespace?: Namespace$1;
  }
  
  type mediaSiteMediaV1Folder_universal_d_Folder = Folder;
  type mediaSiteMediaV1Folder_universal_d_CreateFolderRequest = CreateFolderRequest;
  type mediaSiteMediaV1Folder_universal_d_CreateFolderResponse = CreateFolderResponse;
  type mediaSiteMediaV1Folder_universal_d_GetFolderRequest = GetFolderRequest;
  type mediaSiteMediaV1Folder_universal_d_GetFolderResponse = GetFolderResponse;
  type mediaSiteMediaV1Folder_universal_d_ListFoldersRequest = ListFoldersRequest;
  type mediaSiteMediaV1Folder_universal_d_ListFoldersResponse = ListFoldersResponse;
  type mediaSiteMediaV1Folder_universal_d_SearchFoldersRequest = SearchFoldersRequest;
  type mediaSiteMediaV1Folder_universal_d_SearchFoldersResponse = SearchFoldersResponse;
  type mediaSiteMediaV1Folder_universal_d_UpdateFolderRequest = UpdateFolderRequest;
  type mediaSiteMediaV1Folder_universal_d_UpdateFolderResponse = UpdateFolderResponse;
  type mediaSiteMediaV1Folder_universal_d_GenerateFolderDownloadUrlRequest = GenerateFolderDownloadUrlRequest;
  type mediaSiteMediaV1Folder_universal_d_GenerateFolderDownloadUrlResponse = GenerateFolderDownloadUrlResponse;
  type mediaSiteMediaV1Folder_universal_d_BulkDeleteFoldersRequest = BulkDeleteFoldersRequest;
  type mediaSiteMediaV1Folder_universal_d_BulkDeleteFoldersResponse = BulkDeleteFoldersResponse;
  type mediaSiteMediaV1Folder_universal_d_BulkRestoreFoldersFromTrashBinRequest = BulkRestoreFoldersFromTrashBinRequest;
  type mediaSiteMediaV1Folder_universal_d_BulkRestoreFoldersFromTrashBinResponse = BulkRestoreFoldersFromTrashBinResponse;
  type mediaSiteMediaV1Folder_universal_d_ListDeletedFoldersRequest = ListDeletedFoldersRequest;
  type mediaSiteMediaV1Folder_universal_d_ListDeletedFoldersResponse = ListDeletedFoldersResponse;
  type mediaSiteMediaV1Folder_universal_d_DomainEvent = DomainEvent;
  type mediaSiteMediaV1Folder_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type mediaSiteMediaV1Folder_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type mediaSiteMediaV1Folder_universal_d_RestoreInfo = RestoreInfo;
  type mediaSiteMediaV1Folder_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type mediaSiteMediaV1Folder_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type mediaSiteMediaV1Folder_universal_d_ActionEvent = ActionEvent;
  type mediaSiteMediaV1Folder_universal_d_MessageEnvelope = MessageEnvelope;
  type mediaSiteMediaV1Folder_universal_d_IdentificationData = IdentificationData;
  type mediaSiteMediaV1Folder_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type mediaSiteMediaV1Folder_universal_d_WebhookIdentityType = WebhookIdentityType;
  const mediaSiteMediaV1Folder_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const mediaSiteMediaV1Folder_universal_d_createFolder: typeof createFolder;
  type mediaSiteMediaV1Folder_universal_d_CreateFolderOptions = CreateFolderOptions;
  const mediaSiteMediaV1Folder_universal_d_getFolder: typeof getFolder;
  const mediaSiteMediaV1Folder_universal_d_listFolders: typeof listFolders;
  type mediaSiteMediaV1Folder_universal_d_ListFoldersOptions = ListFoldersOptions;
  const mediaSiteMediaV1Folder_universal_d_searchFolders: typeof searchFolders;
  type mediaSiteMediaV1Folder_universal_d_SearchFoldersOptions = SearchFoldersOptions;
  const mediaSiteMediaV1Folder_universal_d_updateFolder: typeof updateFolder;
  type mediaSiteMediaV1Folder_universal_d_UpdateFolder = UpdateFolder;
  type mediaSiteMediaV1Folder_universal_d_UpdateFolderOptions = UpdateFolderOptions;
  const mediaSiteMediaV1Folder_universal_d_generateFolderDownloadUrl: typeof generateFolderDownloadUrl;
  const mediaSiteMediaV1Folder_universal_d_bulkDeleteFolders: typeof bulkDeleteFolders;
  type mediaSiteMediaV1Folder_universal_d_BulkDeleteFoldersOptions = BulkDeleteFoldersOptions;
  const mediaSiteMediaV1Folder_universal_d_bulkRestoreFoldersFromTrashBin: typeof bulkRestoreFoldersFromTrashBin;
  const mediaSiteMediaV1Folder_universal_d_listDeletedFolders: typeof listDeletedFolders;
  type mediaSiteMediaV1Folder_universal_d_ListDeletedFoldersOptions = ListDeletedFoldersOptions;
  namespace mediaSiteMediaV1Folder_universal_d {
    export {
      mediaSiteMediaV1Folder_universal_d_Folder as Folder,
      State$1 as State,
      Namespace$1 as Namespace,
      mediaSiteMediaV1Folder_universal_d_CreateFolderRequest as CreateFolderRequest,
      mediaSiteMediaV1Folder_universal_d_CreateFolderResponse as CreateFolderResponse,
      mediaSiteMediaV1Folder_universal_d_GetFolderRequest as GetFolderRequest,
      mediaSiteMediaV1Folder_universal_d_GetFolderResponse as GetFolderResponse,
      mediaSiteMediaV1Folder_universal_d_ListFoldersRequest as ListFoldersRequest,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      CursorPaging$1 as CursorPaging,
      mediaSiteMediaV1Folder_universal_d_ListFoldersResponse as ListFoldersResponse,
      PagingMetadataV2$1 as PagingMetadataV2,
      Cursors$1 as Cursors,
      mediaSiteMediaV1Folder_universal_d_SearchFoldersRequest as SearchFoldersRequest,
      RootFolder$1 as RootFolder,
      mediaSiteMediaV1Folder_universal_d_SearchFoldersResponse as SearchFoldersResponse,
      mediaSiteMediaV1Folder_universal_d_UpdateFolderRequest as UpdateFolderRequest,
      mediaSiteMediaV1Folder_universal_d_UpdateFolderResponse as UpdateFolderResponse,
      UnsupportedRequestValueError$1 as UnsupportedRequestValueError,
      mediaSiteMediaV1Folder_universal_d_GenerateFolderDownloadUrlRequest as GenerateFolderDownloadUrlRequest,
      mediaSiteMediaV1Folder_universal_d_GenerateFolderDownloadUrlResponse as GenerateFolderDownloadUrlResponse,
      mediaSiteMediaV1Folder_universal_d_BulkDeleteFoldersRequest as BulkDeleteFoldersRequest,
      mediaSiteMediaV1Folder_universal_d_BulkDeleteFoldersResponse as BulkDeleteFoldersResponse,
      mediaSiteMediaV1Folder_universal_d_BulkRestoreFoldersFromTrashBinRequest as BulkRestoreFoldersFromTrashBinRequest,
      mediaSiteMediaV1Folder_universal_d_BulkRestoreFoldersFromTrashBinResponse as BulkRestoreFoldersFromTrashBinResponse,
      mediaSiteMediaV1Folder_universal_d_ListDeletedFoldersRequest as ListDeletedFoldersRequest,
      mediaSiteMediaV1Folder_universal_d_ListDeletedFoldersResponse as ListDeletedFoldersResponse,
      mediaSiteMediaV1Folder_universal_d_DomainEvent as DomainEvent,
      mediaSiteMediaV1Folder_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      mediaSiteMediaV1Folder_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      mediaSiteMediaV1Folder_universal_d_RestoreInfo as RestoreInfo,
      mediaSiteMediaV1Folder_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      mediaSiteMediaV1Folder_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      mediaSiteMediaV1Folder_universal_d_ActionEvent as ActionEvent,
      mediaSiteMediaV1Folder_universal_d_MessageEnvelope as MessageEnvelope,
      mediaSiteMediaV1Folder_universal_d_IdentificationData as IdentificationData,
      mediaSiteMediaV1Folder_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      mediaSiteMediaV1Folder_universal_d_WebhookIdentityType as WebhookIdentityType,
      mediaSiteMediaV1Folder_universal_d_createFolder as createFolder,
      mediaSiteMediaV1Folder_universal_d_CreateFolderOptions as CreateFolderOptions,
      mediaSiteMediaV1Folder_universal_d_getFolder as getFolder,
      mediaSiteMediaV1Folder_universal_d_listFolders as listFolders,
      mediaSiteMediaV1Folder_universal_d_ListFoldersOptions as ListFoldersOptions,
      mediaSiteMediaV1Folder_universal_d_searchFolders as searchFolders,
      mediaSiteMediaV1Folder_universal_d_SearchFoldersOptions as SearchFoldersOptions,
      mediaSiteMediaV1Folder_universal_d_updateFolder as updateFolder,
      mediaSiteMediaV1Folder_universal_d_UpdateFolder as UpdateFolder,
      mediaSiteMediaV1Folder_universal_d_UpdateFolderOptions as UpdateFolderOptions,
      mediaSiteMediaV1Folder_universal_d_generateFolderDownloadUrl as generateFolderDownloadUrl,
      mediaSiteMediaV1Folder_universal_d_bulkDeleteFolders as bulkDeleteFolders,
      mediaSiteMediaV1Folder_universal_d_BulkDeleteFoldersOptions as BulkDeleteFoldersOptions,
      mediaSiteMediaV1Folder_universal_d_bulkRestoreFoldersFromTrashBin as bulkRestoreFoldersFromTrashBin,
      mediaSiteMediaV1Folder_universal_d_listDeletedFolders as listDeletedFolders,
      mediaSiteMediaV1Folder_universal_d_ListDeletedFoldersOptions as ListDeletedFoldersOptions,
    };
  }
  
  interface StorageInfo {
  }
  interface ListStorageFilesRequest {
      /** File media type. */
      mediaTypes?: MediaType[];
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * * `lastUsedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting;
      /** Cursor and paging information. */
      paging?: CursorPaging;
      /** Get files with update date greater than set value */
      fromUpdatedDate?: Date | null;
      /** Get files with update date lower than set value */
      toUpdatedDate?: Date | null;
      /**
       * Get files with size greater than set value
       * @readonly
       */
      fromSizeInBytes?: string | null;
      /**
       * Get files with size greater than set value
       * @readonly
       */
      toSizeInBytes?: string | null;
      /**
       * Term to search for. Possible terms include the value of a file's
       * `displayName`, `mimeType`, and `label`. <br />
       * For example, if a file's label is cat, the search term is 'cat'.
       */
      search?: string | null;
      /** Get files that were added by the provided entity */
      addedBy?: IdentityInfo;
      /**
       * A list of root folders. <br />
       * Default: empty list will get files from all root folders.
       */
      rootFolders?: RootFolder[];
      /**
       * A list of namespaces to list files from <br/>
       * Default: empty list will get files from all root folders.
       * Note - Namespace value `Others` is not supported in this request and will produce an error
       */
      namespaces?: Namespace[];
      /** Get files with update date greater than set value */
      fromLastUsedDate?: Date | null;
      /** Get files with update date lower than set value */
      toLastUsedDate?: Date | null;
  }
  enum MediaType {
      UNKNOWN = "UNKNOWN",
      IMAGE = "IMAGE",
      VIDEO = "VIDEO",
      AUDIO = "AUDIO",
      DOCUMENT = "DOCUMENT",
      VECTOR = "VECTOR",
      ARCHIVE = "ARCHIVE",
      MODEL3D = "MODEL3D",
      OTHER = "OTHER",
      ICON = "ICON",
      FLASH = "FLASH",
      FONT = "FONT"
  }
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
      /**
       * When `field_name` is a property of repeated field that is marked as `MATCH_ITEMS` and sort should be done by
       * a specific element from a collection, filter can/should be provided to ensure correct sort value is picked.
       *
       * If multiple filters are provided, they are combined with AND operator.
       *
       * Example:
       * Given we have document like {"id": "1", "nestedField": [{"price": 10, "region": "EU"}, {"price": 20, "region": "US"}]}
       * and `nestedField` is marked as `MATCH_ITEMS`, to ensure that sorting is done by correct region, filter should be
       * { fieldName: "nestedField.price", "select_items_by": [{"nestedField.region": "US"}] }
       * @internal
       */
      selectItemsBy?: Record<string, any>[] | null;
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
  interface IdentityInfo {
      /** The type of the user that uploaded the file */
      identityType?: IdentityType;
      /** User Id. empty when UNKNOWN */
      identityId?: string | null;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      ANONYMOUS_VISITOR = "ANONYMOUS_VISITOR",
      MEMBER = "MEMBER",
      WIX_USER = "WIX_USER",
      APP = "APP"
  }
  enum RootFolder {
      /** Root of all site media */
      MEDIA_ROOT = "MEDIA_ROOT",
      /** Root of the trash system folder */
      TRASH_ROOT = "TRASH_ROOT",
      /** Root of all visitor uploads */
      VISITOR_UPLOADS_ROOT = "VISITOR_UPLOADS_ROOT"
  }
  enum Namespace {
      NO_NAMESPACE = "NO_NAMESPACE",
      OTHERS = "OTHERS",
      /** ANY = 2; */
      WIX_VIDEO = "WIX_VIDEO",
      /** _nsWixMusic */
      WIX_MUSIC = "WIX_MUSIC",
      /** _nsArtStore */
      ALBUMS_AND_ART_STORE = "ALBUMS_AND_ART_STORE",
      /** _nsDigitalProduct */
      WIX_ECOM = "WIX_ECOM",
      /** _nsPhotoShareApp */
      PHOTO_SHARE_APP = "PHOTO_SHARE_APP",
      /** _nsSharingApp, */
      SHARING_APP = "SHARING_APP",
      /** engage */
      CHAT = "CHAT",
      /** logobuilder */
      LOGO_BUILDER = "LOGO_BUILDER",
      /** WixExposure */
      ALBUMS_OLD = "ALBUMS_OLD",
      /** chat-mobile-uploads */
      CHAT_MOBILE = "CHAT_MOBILE",
      /** _nsWixForms */
      WIX_FORMS = "WIX_FORMS",
      /** _nsDraft */
      DRAFTS = "DRAFTS"
  }
  interface ListStorageFilesResponse {
      /** List of files in the Media Manager. */
      files?: FileDescriptor[];
      /** The next cursor if it exists. */
      nextCursor?: PagingMetadataV2;
  }
  interface FileDescriptor {
      /**
       * File ID. Generated when a file is uploaded to the Media Manager.
       * @readonly
       */
      _id?: string;
      /** File name as it appears in the Media Manager. */
      displayName?: string;
      /**
       * Static URL of the file.
       * @readonly
       */
      url?: string;
      /** ID of the file's parent folder. */
      parentFolderId?: string | null;
      /**
       * File hash.
       * @readonly
       */
      hash?: string;
      /**
       * Size of the uploaded file in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
      /**
       * Whether the file is public or private. Learn more about private files ([SDK](https://dev.wix.com/docs/rest/assets/media/media-manager/files/private-files) | [REST](https://dev.wix.com/docs/sdk/backend-modules/media/files/private-files)).
       * @readonly
       */
      private?: boolean;
      /**
       * Media file type.
       * @readonly
       */
      mediaType?: MediaType;
      /**
       * Media file content.
       * @readonly
       */
      media?: FileMedia;
      /**
       * Status of the file that was uploaded.
       * * `FAILED`: The file failed to upload, for example, during media post processing.
       * * `READY`: The file uploaded, finished all processing, and is ready for use.
       * * `PENDING`: The file is processing and the URLs are not yet available. This response is returned when importing a file.
       * @readonly
       */
      operationStatus?: OperationStatus;
      /**
       * URL where the file was uploaded from.
       * @readonly
       */
      sourceUrl?: string | null;
      /**
       * URL of the file's thumbnail.
       * @readonly
       */
      thumbnailUrl?: string | null;
      /** Labels assigned to media files that describe and categorize them. Provided by the Wix user, or generated by [Google Vision API](https://cloud.google.com/vision/docs/drag-and-drop) for images. */
      labels?: string[];
      /**
       * Date and time the file was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the file was updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * The Wix site ID where the media file is stored.
       * @readonly
       */
      siteId?: string;
      /**
       * State of the file.
       * @readonly
       */
      state?: State;
      /**
       * Internal tags describing the item, can be used in specific client use cases
       * @internal
       */
      internalTags?: string[];
      /**
       * The namespace containing the file
       * @internal
       */
      namespace?: Namespace;
      /**
       * Information about the identity that added this file
       * @internal
       */
      addedBy?: IdentityInfo;
      /**
       * The raw namespace containing the file
       * @internal
       * @readonly
       */
      rawNamespace?: string | null;
      /**
       * The date this file was last viewed from the last day, can be used to know if this file is still in use
       * @internal
       * @readonly
       */
      lastUsedDate?: Date | null;
      /**
       * The date this file was last viewed from the last day, can be used to know if this file is still in use
       * @internal
       * @readonly
       */
      mimeType?: string | null;
  }
  interface FileMedia extends FileMediaMediaOneOf {
      /** Information about the image. */
      image?: ImageMedia;
      /** Information about the video. */
      video?: string;
      /** Information about the audio. */
      audio?: AudioV2;
      /** Information about the document. */
      document?: string;
      /** Information about the vector. */
      vector?: ImageMedia;
      /** Information about the archive. */
      archive?: Archive;
      /** Information about the 3D Model. */
      model3d?: Model3D;
      /**
       * Information about other file types
       * @internal
       */
      other?: OtherMedia;
      /**
       * Information about the icon.
       * @internal
       */
      icon?: ImageMedia;
      /**
       * Information about flash
       * @internal
       */
      flash?: OtherMedia;
      /**
       * Information about the font
       * @internal
       */
      font?: FontMedia;
  }
  /** @oneof */
  interface FileMediaMediaOneOf {
      /** Information about the image. */
      image?: ImageMedia;
      /** Information about the video. */
      video?: string;
      /** Information about the audio. */
      audio?: AudioV2;
      /** Information about the document. */
      document?: string;
      /** Information about the vector. */
      vector?: ImageMedia;
      /** Information about the archive. */
      archive?: Archive;
      /** Information about the 3D Model. */
      model3d?: Model3D;
      /**
       * Information about other file types
       * @internal
       */
      other?: OtherMedia;
      /**
       * Information about the icon.
       * @internal
       */
      icon?: ImageMedia;
      /**
       * Information about flash
       * @internal
       */
      flash?: OtherMedia;
      /**
       * Information about the font
       * @internal
       */
      font?: FontMedia;
  }
  interface ImageMedia {
      /** Image data. */
      image?: string;
      /** Image colors. */
      colors?: Colors;
      /** Information about faces in the image. Use to crop images without cutting out faces. */
      faces?: FaceRecognition[];
      /**
       * Information about the image preview.
       * You can use this to display a preview for private images.
       */
      previewImage?: string;
      /**
       * Optional, An AI generated description of the image
       * @readonly
       */
      caption?: string | null;
      /**
       * Optional, return true or false if the image has text, or empty for unknown
       * @internal
       * @readonly
       */
      containsText?: boolean | null;
      /**
       * Optional, return true or false if the image has text, or empty for unknown
       * @internal
       * @readonly
       */
      animated?: boolean | null;
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
  interface Colors {
      /** Main color of the image. */
      prominent?: Color;
      /** Color palette of the image. */
      palette?: Color[];
  }
  interface Color {
      /** HEX color. */
      hex?: string | null;
      /** RGB color. */
      rgb?: ColorRGB;
  }
  interface ColorRGB {
      /** Red channel. */
      r?: number | null;
      /** Green channel. */
      g?: number | null;
      /** Blue channel. */
      b?: number | null;
  }
  /**
   * Using this object you can crop images while centering on faces
   * ------------------------
   * |                      |
   * |    x,y               |
   * |    *--------         |
   * |    |  .  . |         |
   * |    |   |   | height  |
   * |    |  \ /  |         |
   * |    |       |         |
   * |    ---------         |
   * |     width            |
   * |                      |
   * |______________________|
   */
  interface FaceRecognition {
      /** The accuracy percentage of the face recognition. The likelihood that a face is detected. */
      confidence?: number;
      /** Top left x pixel coordinate of the face. */
      x?: number;
      /** Top left y pixel coordinate of the face. */
      y?: number;
      /** Face pixel height. */
      height?: number;
      /** Face pixel width. */
      width?: number;
  }
  interface VideoResolution {
      /** Video URL. */
      url?: string;
      /** Video height. */
      height?: number;
      /** Video width. */
      width?: number;
      /**
       * Deprecated. Use the `posters` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      poster?: string;
      /**
       * Video format
       * Possible values: ['144p.mp4' '144p.webm' '240p.mp4' '240p.webm' '360p.mp4' '360p.webm' '480p.mp4' '480p.webm'
       * '720p.mp4' '720p.webm' '1080p.mp4' '1080p.webm', 'hls' ]
       */
      format?: string;
      /**
       * Deprecated. Use the `urlExpirationDate` property in the parent entity instead.
       * @internal
       * @deprecated
       */
      urlExpirationDate?: Date | null;
      /**
       * Deprecated. Use the `sizeInBytes` property in the parent entity instead. Size cannot be provided per resolution.
       * @internal
       * @deprecated
       */
      sizeInBytes?: string | null;
      /**
       * Video quality. For example: 480p, 720p.
       * @internal
       */
      quality?: string | null;
      /**
       * Video filename.
       * @internal
       */
      filename?: string | null;
      /**
       * Video duration in seconds.
       * @internal
       * @readonly
       * @deprecated Video duration in seconds.
       * @replacedBy duration_in_milliseconds
       * @targetRemovalDate 2024-08-01
       */
      durationInSeconds?: number | null;
      /**
       * Video duration in milliseconds.
       * @internal
       * @readonly
       */
      durationInMilliseconds?: number | null;
      /**
       * When true, this is a protected asset, and calling the URL will return a 403 error.
       * In order to access private assets, make a request to:
       * `GenerateFileDownloadUrl` with the WixMedia id and specify the asset_key in the request
       * @internal
       * @readonly
       */
      private?: boolean | null;
      /**
       * Key to identify the video resolution's relationship to the original media in WixMedia.
       * Can be used to request a download for the specific video resolution.
       * For example: 480p.mp4, 720p.mp4, 1080p.mp4, trailer-720p.mp4, clip-720p.mp4
       * @internal
       * @readonly
       */
      assetKey?: string | null;
  }
  interface AudioV2 {
      /** WixMedia ID. */
      _id?: string;
      /** Audio formats available for this file. */
      assets?: string[];
      /**
       * Audio bitrate.
       * @readonly
       */
      bitrate?: number | null;
      /**
       * Audio format.
       * @readonly
       */
      format?: string | null;
      /**
       * Audio duration in seconds.
       * @readonly
       */
      duration?: number | null;
      /**
       * Audio size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
  }
  interface Archive {
      /** WixMedia ID. */
      _id?: string;
      /** Archive URL. */
      url?: string;
      /**
       * Archive URL expiration date (when relevant).
       * @readonly
       */
      urlExpirationDate?: Date | null;
      /** Archive size in bytes. */
      sizeInBytes?: string | null;
      /** Archive filename. */
      filename?: string | null;
  }
  interface Model3D {
      /** WixMedia 3D ID. */
      _id?: string;
      /** 3D URL. */
      url?: string;
      /** 3D thumbnail Image */
      thumbnail?: string;
      /** 3D alt text. */
      altText?: string | null;
      /**
       * 3D URL expiration date (when relevant).
       * @readonly
       */
      urlExpirationDate?: Date | null;
      /**
       * 3D filename.
       * @readonly
       */
      filename?: string | null;
      /**
       * 3D size in bytes.
       * @readonly
       */
      sizeInBytes?: string | null;
  }
  interface OtherMedia {
      /** WixMedia ID. for use with Site Media APIs only */
      _id?: string;
      /**
       * The media type of the file: 'package', 'raw'
       * @readonly
       */
      internalMediaType?: string | null;
      /**
       * size in bytes. Optional.
       * @readonly
       */
      sizeInBytes?: string | null;
      /** The file URL. */
      url?: string;
  }
  interface FontMedia {
      /** WixMedia ID. for use with Site Media APIs only */
      _id?: string | null;
      /**
       * size in bytes. Optional.
       * @readonly
       */
      sizeInBytes?: string | null;
      /** The format of the font asset. ttf, woff, woff2 */
      format?: string | null;
      /** The font family name. */
      family?: string | null;
      /** The font name */
      fontName?: string | null;
      /** Font formats available for this file. */
      assets?: FontAsset[];
  }
  interface FontAsset {
      /**
       * Keys for downloading different assets of a file.
       * Default: `src`, key representing the original file's format and quality.
       */
      assetKey?: string | null;
      /** The URL of the font asset. */
      url?: string | null;
      /** The format of the font asset. ttf, woff, woff2 */
      format?: string | null;
  }
  enum OperationStatus {
      /** File upload or processing failed */
      FAILED = "FAILED",
      /** File is ready for consumption */
      READY = "READY",
      /** File is waiting for processing or currently being processed */
      PENDING = "PENDING"
  }
  enum State {
      /** File is ready for consumption */
      OK = "OK",
      /** Deleted file */
      DELETED = "DELETED"
  }
  interface PagingMetadataV2 {
      /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
      total?: number | null;
      /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor string pointing to the next page in the list of results. */
      next?: string | null;
  }
  interface UnsupportedRequestValueError {
      /** Optional A list of allowed values */
      allowedValues?: string[];
      /** The unsupported value send in the request */
      requestValue?: string;
  }
  interface GetSiteStorageRequest {
  }
  interface GetSiteStorageResponse {
      /** Site level storage details */
      total?: StorageDetails;
      /** Storage information about big files */
      bigFiles?: StorageDetails;
      /** Trash storage details */
      trash?: StorageDetails;
      /** Storage information by media types for public files */
      storageByMediaType?: MediaTypeStorageDetails[];
      /**
       * The last date the storage information was calculated
       * @readonly
       */
      _updatedDate?: Date | null;
      /** The quota details */
      quota?: TotalQuota;
      /** The user id of the site owner - use this id to identify files uploaded by the current site owner */
      siteOwnerInfo?: IdentityInfo;
  }
  /** Information about storage */
  interface StorageDetails {
      /** The number of files */
      fileCount?: number | null;
      /**
       * The size of the stored files in bytes
       * @readonly
       */
      sizeInBytes?: string | null;
  }
  /** Storage information of a specific media type */
  interface MediaTypeStorageDetails {
      /** The media type */
      mediaType?: MediaType;
      /** Storage details about the media type */
      details?: StorageDetails;
  }
  interface TotalQuota {
      /** Storage quota in bytes */
      storage?: string | null;
      /** Plans that are related to the quota */
      plans?: Plans;
      /** Time for which the quota is relevant - When the plans were retrieved from premium */
      timestamp?: Date | null;
  }
  interface Plans {
      /** Premium Plan */
      premium?: Plan;
      /** Upgrade URL - the URL which a site owner can use to upgrade their quota. May be empty if an upgrade is not available. */
      upgradeUrl?: string;
  }
  interface Plan {
      /**
       * Plan ID - Premium product ID
       * @readonly
       */
      _id?: string;
      /** Plan name */
      name?: string;
      /** When the plan was created */
      createdAt?: Date | null;
      /** When then plan expires */
      expiresAt?: Date | null;
  }
  /**
   * Retrieves a list of files in the Media Manager.
   *
   * To retrieve a list of files from all the folders in the Media Manager
   * @internal
   * @documentationMaturity preview
   * @permissionId MEDIA.SITE_MEDIA_FILES_LIST
   * @adminMethod
   */
  function listStorageFiles(options?: ListStorageFilesOptions): Promise<ListStorageFilesResponse>;
  interface ListStorageFilesOptions {
      /** File media type. */
      mediaTypes?: MediaType[];
      /**
       * Field name and order to sort by. One of: <br />
       * * `displayName`
       * * `updatedDate`
       * * `sizeInBytes`
       * * `lastUsedDate`
       * Default: `updatedDate` in `desc` order.
       */
      sort?: Sorting;
      /** Cursor and paging information. */
      paging?: CursorPaging;
      /** Get files with update date greater than set value */
      fromUpdatedDate?: Date | null;
      /** Get files with update date lower than set value */
      toUpdatedDate?: Date | null;
      /**
       * Get files with size greater than set value
       * @readonly
       */
      fromSizeInBytes?: string | null;
      /**
       * Get files with size greater than set value
       * @readonly
       */
      toSizeInBytes?: string | null;
      /**
       * Term to search for. Possible terms include the value of a file's
       * `displayName`, `mimeType`, and `label`. <br />
       * For example, if a file's label is cat, the search term is 'cat'.
       */
      search?: string | null;
      /** Get files that were added by the provided entity */
      addedBy?: IdentityInfo;
      /**
       * A list of root folders. <br />
       * Default: empty list will get files from all root folders.
       */
      rootFolders?: RootFolder[];
      /**
       * A list of namespaces to list files from <br/>
       * Default: empty list will get files from all root folders.
       * Note - Namespace value `Others` is not supported in this request and will produce an error
       */
      namespaces?: Namespace[];
      /** Get files with update date greater than set value */
      fromLastUsedDate?: Date | null;
      /** Get files with update date lower than set value */
      toLastUsedDate?: Date | null;
  }
  /**
   * Get information about the site storage
   * @internal
   * @documentationMaturity preview
   * @permissionId MEDIA.SITE_MEDIA_STORAGE_READ
   * @adminMethod
   */
  function getSiteStorage(): Promise<GetSiteStorageResponse>;
  
  type mediaSiteMediaV1StorageInfo_universal_d_StorageInfo = StorageInfo;
  type mediaSiteMediaV1StorageInfo_universal_d_ListStorageFilesRequest = ListStorageFilesRequest;
  type mediaSiteMediaV1StorageInfo_universal_d_MediaType = MediaType;
  const mediaSiteMediaV1StorageInfo_universal_d_MediaType: typeof MediaType;
  type mediaSiteMediaV1StorageInfo_universal_d_Sorting = Sorting;
  type mediaSiteMediaV1StorageInfo_universal_d_SortOrder = SortOrder;
  const mediaSiteMediaV1StorageInfo_universal_d_SortOrder: typeof SortOrder;
  type mediaSiteMediaV1StorageInfo_universal_d_CursorPaging = CursorPaging;
  type mediaSiteMediaV1StorageInfo_universal_d_IdentityInfo = IdentityInfo;
  type mediaSiteMediaV1StorageInfo_universal_d_IdentityType = IdentityType;
  const mediaSiteMediaV1StorageInfo_universal_d_IdentityType: typeof IdentityType;
  type mediaSiteMediaV1StorageInfo_universal_d_RootFolder = RootFolder;
  const mediaSiteMediaV1StorageInfo_universal_d_RootFolder: typeof RootFolder;
  type mediaSiteMediaV1StorageInfo_universal_d_Namespace = Namespace;
  const mediaSiteMediaV1StorageInfo_universal_d_Namespace: typeof Namespace;
  type mediaSiteMediaV1StorageInfo_universal_d_ListStorageFilesResponse = ListStorageFilesResponse;
  type mediaSiteMediaV1StorageInfo_universal_d_FileDescriptor = FileDescriptor;
  type mediaSiteMediaV1StorageInfo_universal_d_FileMedia = FileMedia;
  type mediaSiteMediaV1StorageInfo_universal_d_FileMediaMediaOneOf = FileMediaMediaOneOf;
  type mediaSiteMediaV1StorageInfo_universal_d_ImageMedia = ImageMedia;
  type mediaSiteMediaV1StorageInfo_universal_d_FocalPoint = FocalPoint;
  type mediaSiteMediaV1StorageInfo_universal_d_Colors = Colors;
  type mediaSiteMediaV1StorageInfo_universal_d_Color = Color;
  type mediaSiteMediaV1StorageInfo_universal_d_ColorRGB = ColorRGB;
  type mediaSiteMediaV1StorageInfo_universal_d_FaceRecognition = FaceRecognition;
  type mediaSiteMediaV1StorageInfo_universal_d_VideoResolution = VideoResolution;
  type mediaSiteMediaV1StorageInfo_universal_d_AudioV2 = AudioV2;
  type mediaSiteMediaV1StorageInfo_universal_d_Archive = Archive;
  type mediaSiteMediaV1StorageInfo_universal_d_Model3D = Model3D;
  type mediaSiteMediaV1StorageInfo_universal_d_OtherMedia = OtherMedia;
  type mediaSiteMediaV1StorageInfo_universal_d_FontMedia = FontMedia;
  type mediaSiteMediaV1StorageInfo_universal_d_FontAsset = FontAsset;
  type mediaSiteMediaV1StorageInfo_universal_d_OperationStatus = OperationStatus;
  const mediaSiteMediaV1StorageInfo_universal_d_OperationStatus: typeof OperationStatus;
  type mediaSiteMediaV1StorageInfo_universal_d_State = State;
  const mediaSiteMediaV1StorageInfo_universal_d_State: typeof State;
  type mediaSiteMediaV1StorageInfo_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type mediaSiteMediaV1StorageInfo_universal_d_Cursors = Cursors;
  type mediaSiteMediaV1StorageInfo_universal_d_UnsupportedRequestValueError = UnsupportedRequestValueError;
  type mediaSiteMediaV1StorageInfo_universal_d_GetSiteStorageRequest = GetSiteStorageRequest;
  type mediaSiteMediaV1StorageInfo_universal_d_GetSiteStorageResponse = GetSiteStorageResponse;
  type mediaSiteMediaV1StorageInfo_universal_d_StorageDetails = StorageDetails;
  type mediaSiteMediaV1StorageInfo_universal_d_MediaTypeStorageDetails = MediaTypeStorageDetails;
  type mediaSiteMediaV1StorageInfo_universal_d_TotalQuota = TotalQuota;
  type mediaSiteMediaV1StorageInfo_universal_d_Plans = Plans;
  type mediaSiteMediaV1StorageInfo_universal_d_Plan = Plan;
  const mediaSiteMediaV1StorageInfo_universal_d_listStorageFiles: typeof listStorageFiles;
  type mediaSiteMediaV1StorageInfo_universal_d_ListStorageFilesOptions = ListStorageFilesOptions;
  const mediaSiteMediaV1StorageInfo_universal_d_getSiteStorage: typeof getSiteStorage;
  namespace mediaSiteMediaV1StorageInfo_universal_d {
    export {
      mediaSiteMediaV1StorageInfo_universal_d_StorageInfo as StorageInfo,
      mediaSiteMediaV1StorageInfo_universal_d_ListStorageFilesRequest as ListStorageFilesRequest,
      mediaSiteMediaV1StorageInfo_universal_d_MediaType as MediaType,
      mediaSiteMediaV1StorageInfo_universal_d_Sorting as Sorting,
      mediaSiteMediaV1StorageInfo_universal_d_SortOrder as SortOrder,
      mediaSiteMediaV1StorageInfo_universal_d_CursorPaging as CursorPaging,
      mediaSiteMediaV1StorageInfo_universal_d_IdentityInfo as IdentityInfo,
      mediaSiteMediaV1StorageInfo_universal_d_IdentityType as IdentityType,
      mediaSiteMediaV1StorageInfo_universal_d_RootFolder as RootFolder,
      mediaSiteMediaV1StorageInfo_universal_d_Namespace as Namespace,
      mediaSiteMediaV1StorageInfo_universal_d_ListStorageFilesResponse as ListStorageFilesResponse,
      mediaSiteMediaV1StorageInfo_universal_d_FileDescriptor as FileDescriptor,
      mediaSiteMediaV1StorageInfo_universal_d_FileMedia as FileMedia,
      mediaSiteMediaV1StorageInfo_universal_d_FileMediaMediaOneOf as FileMediaMediaOneOf,
      mediaSiteMediaV1StorageInfo_universal_d_ImageMedia as ImageMedia,
      mediaSiteMediaV1StorageInfo_universal_d_FocalPoint as FocalPoint,
      mediaSiteMediaV1StorageInfo_universal_d_Colors as Colors,
      mediaSiteMediaV1StorageInfo_universal_d_Color as Color,
      mediaSiteMediaV1StorageInfo_universal_d_ColorRGB as ColorRGB,
      mediaSiteMediaV1StorageInfo_universal_d_FaceRecognition as FaceRecognition,
      mediaSiteMediaV1StorageInfo_universal_d_VideoResolution as VideoResolution,
      mediaSiteMediaV1StorageInfo_universal_d_AudioV2 as AudioV2,
      mediaSiteMediaV1StorageInfo_universal_d_Archive as Archive,
      mediaSiteMediaV1StorageInfo_universal_d_Model3D as Model3D,
      mediaSiteMediaV1StorageInfo_universal_d_OtherMedia as OtherMedia,
      mediaSiteMediaV1StorageInfo_universal_d_FontMedia as FontMedia,
      mediaSiteMediaV1StorageInfo_universal_d_FontAsset as FontAsset,
      mediaSiteMediaV1StorageInfo_universal_d_OperationStatus as OperationStatus,
      mediaSiteMediaV1StorageInfo_universal_d_State as State,
      mediaSiteMediaV1StorageInfo_universal_d_PagingMetadataV2 as PagingMetadataV2,
      mediaSiteMediaV1StorageInfo_universal_d_Cursors as Cursors,
      mediaSiteMediaV1StorageInfo_universal_d_UnsupportedRequestValueError as UnsupportedRequestValueError,
      mediaSiteMediaV1StorageInfo_universal_d_GetSiteStorageRequest as GetSiteStorageRequest,
      mediaSiteMediaV1StorageInfo_universal_d_GetSiteStorageResponse as GetSiteStorageResponse,
      mediaSiteMediaV1StorageInfo_universal_d_StorageDetails as StorageDetails,
      mediaSiteMediaV1StorageInfo_universal_d_MediaTypeStorageDetails as MediaTypeStorageDetails,
      mediaSiteMediaV1StorageInfo_universal_d_TotalQuota as TotalQuota,
      mediaSiteMediaV1StorageInfo_universal_d_Plans as Plans,
      mediaSiteMediaV1StorageInfo_universal_d_Plan as Plan,
      mediaSiteMediaV1StorageInfo_universal_d_listStorageFiles as listStorageFiles,
      mediaSiteMediaV1StorageInfo_universal_d_ListStorageFilesOptions as ListStorageFilesOptions,
      mediaSiteMediaV1StorageInfo_universal_d_getSiteStorage as getSiteStorage,
    };
  }
  
  export { mediaEnterprisePublicMediaV1EnterpriseCategory_universal_d as enterpriseMediaCategories, mediaEnterprisePublicMediaV1EnterpriseItem_universal_d as enterpriseMediaItems, mediaSiteMediaV1FileDescriptor_universal_d as files, mediaSiteMediaV1Folder_universal_d as folders, mediaGenerationV1GeneratedImage_universal_d as generation, mediaSiteMediaV1StorageInfo_universal_d as storage };
}
