declare module "wix-crm.v2" {
  interface ContactAttachment extends ContactAttachmentMediaOneOf {
      /** Image details when the attachment type is `IMAGE`. */
      image?: string;
      /** Document details when the attachment type is `OTHER`. */
      document?: string;
      /**
       * Attachment ID.
       * @readonly
       */
      _id?: string;
      /**
       * Details of the preview image reduced size when the attachment is of type `IMAGE`.
       * @readonly
       */
      previewImage?: string;
      /**
       * Name of the attachment file.
       * @readonly
       */
      fileName?: string;
      /**
       * Mime type of the attachment. See supported mime types
       * ([REST](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/attachments/attachment-v4/supported-mime-types)|[SDK](https://dev.wix.com/docs/sdk/backend-modules/crm/attachments/supported-mime-types)).
       * @readonly
       */
      mimeType?: string;
      /**
       * Type of the attachment.
       * @readonly
       */
      attachmentType?: AttachmentType;
      /**
       * TODO: can delete after migration to crm-attachments
       * Legacy media path
       * @internal
       * @readonly
       */
      mediaPath?: string;
      /**
       * TODO: can delete after migration to crm-attachments
       * Legacy preview media path
       * @internal
       * @readonly
       */
      previewMediaPath?: string | null;
  }
  /** @oneof */
  interface ContactAttachmentMediaOneOf {
      /** Image details when the attachment type is `IMAGE`. */
      image?: string;
      /** Document details when the attachment type is `OTHER`. */
      document?: string;
  }
  enum AttachmentType {
      /** Unknown attachment type. */
      UNKNOWN = "UNKNOWN",
      /** Attachment is an image file. */
      IMAGE = "IMAGE",
      /** Attachment is a document or any non-image file type. */
      OTHER = "OTHER"
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
  interface DomainEventBodyOneOf$4 {
      createdEvent?: EntityCreatedEvent$4;
      updatedEvent?: EntityUpdatedEvent$4;
      deletedEvent?: EntityDeletedEvent$4;
      actionEvent?: ActionEvent$4;
  }
  interface EntityCreatedEvent$4 {
      entityAsJson?: string;
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$4;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
  }
  interface RestoreInfo$4 {
      deletedDate?: Date | null;
  }
  interface EntityUpdatedEvent$4 {
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
  interface EntityDeletedEvent$4 {
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
  interface ActionEvent$4 {
      bodyAsJson?: string;
  }
  interface Empty$1 {
  }
  interface MediaFileUploadedEvent {
      fileId?: string;
      path?: string;
      mimeType?: string;
      acl?: string | null;
      size?: string | null;
      dateCreated?: Date | null;
      dateUpdated?: Date | null;
  }
  interface CrmAttachmentUploadedEvent {
      attachment?: CrmAttachment;
      uploadJobId?: string;
  }
  interface CrmAttachment {
      /** @readonly */
      _id?: string | null;
      revision?: string | null;
      /** @readonly */
      _createdDate?: Date | null;
      /** @readonly */
      _updatedDate?: Date | null;
      /** @readonly */
      source?: AttachmentSource;
      metadata?: AttachmentMetadata;
      media?: AttachmentMedia;
      /**
       * Inferred by the media type
       * @readonly
       */
      attachmentType?: CrmAttachmentAttachmentType;
  }
  interface AttachmentSource {
      appId?: string;
  }
  interface AttachmentMetadata {
      /** Entity type e.g: INVOICES */
      entityType?: string | null;
      /** Id of the entity, e.g: invoice id */
      entityId?: string | null;
      contactId?: string | null;
      externalId?: string | null;
  }
  interface AttachmentMedia extends AttachmentMediaMediaOneOf {
      image?: string;
      document?: string;
      /** @readonly */
      previewImage?: string;
      fileName?: string;
      mimeType?: string;
  }
  /** @oneof */
  interface AttachmentMediaMediaOneOf {
      image?: string;
      document?: string;
  }
  enum CrmAttachmentAttachmentType {
      UNKNOWN = "UNKNOWN",
      DOCUMENT = "DOCUMENT",
      IMAGE = "IMAGE"
  }
  interface CreateDemoAttachmentRequest {
      /** The contact id whose demo attachment is being created */
      contactId: string;
      /** The type of the demo contact */
      demoContactType?: DemoContactType;
  }
  enum DemoContactType {
      KAT = "KAT",
      DAN = "DAN"
  }
  interface CreateDemoAttachmentResponse {
      /** The created attachment */
      attachment?: ContactAttachment;
  }
  interface GenerateAttachmentUploadUrlRequest {
      /** ID of the contact for whom the attachment is being uploaded. */
      contactId: string;
      /** File name of the attachment including the extension, for example, `contact-cv.pdf`. */
      fileName: string;
      /**
       * Mime type of the attachment file, for example, `application/pdf`.
       * See supported mime types ([REST](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/attachments/attachment-v4/supported-mime-types)|
       * [SDK](https://dev.wix.com/docs/sdk/backend-modules/crm/attachments/supported-mime-types)).
       */
      mimeType: string;
  }
  interface GenerateAttachmentUploadUrlResponse {
      /** The URL for uploading a file as an attachment to the contact. */
      uploadUrl?: string;
      /**
       * The upload ID of the attachment.
       * @internal
       */
      uploadId?: string;
  }
  interface ListAttachmentsRequest {
      /** Contact ID for the attachments to be listed. */
      contactId: string;
      /** Allow paginating, default: limit = 100 and offset = 0 */
      paging?: Paging$4;
  }
  interface Paging$4 {
      /**
       * Number of items to return.
       *
       * Default: `100`
       * Max: `100`
       */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  interface ListAttachmentsResponse {
      /** List of attachments for the specified contact. */
      attachments?: ContactAttachment[];
      /** Metadata for the paginated results. */
      metadata?: PagingMetadata$3;
  }
  interface PagingMetadata$3 {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      offset?: number | null;
      /** Total number of items that match the query. */
      total?: number | null;
      /** Whether the server failed to calculate the `total` field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface DeleteAttachmentRequest {
      /** Contact ID for the attachment to delete. */
      contactId: string;
      /** Attachment ID to delete. */
      attachmentId: string;
  }
  interface DeleteAttachmentResponse {
  }
  interface GetAttachmentRequest {
      /** Contact ID for the attachment to retrieve. */
      contactId: string;
      /** Attachment ID to retrieve. */
      attachmentId: string;
  }
  interface GetAttachmentResponse {
      /** The requested attachment. */
      attachment?: ContactAttachment;
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
   * Create Demo Attachments.
   * Use this endpoint only if the media already uploaded to wixmp
   * @param contactId - The contact id whose demo attachment is being created
   * @internal
   * @documentationMaturity preview
   * @requiredField contactId
   * @permissionId CONTACTS_ATTACHMENTS.MODIFY
   * @adminMethod
   */
  function createDemoAttachment(contactId: string, options?: CreateDemoAttachmentOptions): Promise<CreateDemoAttachmentResponse>;
  interface CreateDemoAttachmentOptions {
      /** The type of the demo contact */
      demoContactType?: DemoContactType;
  }
  /**
   * Generates an upload URL for uploading a file as an attachment to a specified contact.
   *
   * To learn how to use the generated upload URL in the response to upload an attachment file,
   * see the Upload API ([SDK](https://dev.wix.com/docs/sdk/backend-modules/media/files/upload-api) | [REST](https://dev.wix.com/docs/rest/assets/media/media-manager/files/upload-api)).
   * @param contactId - ID of the contact for whom the attachment is being uploaded.
   * @param fileName - File name of the attachment including the extension, for example, `contact-cv.pdf`.
   * @public
   * @documentationMaturity preview
   * @requiredField contactId
   * @requiredField fileName
   * @requiredField options
   * @requiredField options.mimeType
   * @permissionId CONTACTS_ATTACHMENTS.MODIFY
   * @adminMethod
   */
  function generateAttachmentUploadUrl(contactId: string, fileName: string, options: GenerateAttachmentUploadUrlOptions): Promise<GenerateAttachmentUploadUrlResponse>;
  interface GenerateAttachmentUploadUrlOptions {
      /**
       * Mime type of the attachment file, for example, `application/pdf`.
       * See supported mime types ([REST](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/attachments/attachment-v4/supported-mime-types)|
       * [SDK](https://dev.wix.com/docs/sdk/backend-modules/crm/attachments/supported-mime-types)).
       */
      mimeType: string;
  }
  /**
   * Retrieves a list of attachments associated with a specified contact.
   * @param contactId - Contact ID for the attachments to be listed.
   * @public
   * @documentationMaturity preview
   * @requiredField contactId
   * @permissionId CONTACTS_ATTACHMENTS.VIEW
   * @adminMethod
   */
  function listAttachments(contactId: string, options?: ListAttachmentsOptions): Promise<ListAttachmentsResponse>;
  interface ListAttachmentsOptions {
      /** Allow paginating, default: limit = 100 and offset = 0 */
      paging?: Paging$4;
  }
  /**
   * Deletes the specified attachment from the specified contact.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.attachmentId
   * @requiredField identifiers.contactId
   * @permissionId CONTACTS_ATTACHMENTS.MODIFY
   * @adminMethod
   */
  function deleteAttachment(identifiers: DeleteAttachmentIdentifiers): Promise<void>;
  interface DeleteAttachmentIdentifiers {
      /** Contact ID for the attachment to delete. */
      contactId: string;
      /** Attachment ID to delete. */
      attachmentId: string;
  }
  /**
   * Retrieves the specified attachment for the specified contact.
   * @public
   * @documentationMaturity preview
   * @requiredField identifiers
   * @requiredField identifiers.attachmentId
   * @requiredField identifiers.contactId
   * @permissionId CONTACTS_ATTACHMENTS.VIEW
   * @adminMethod
   * @returns The requested attachment.
   */
  function getAttachment(identifiers: GetAttachmentIdentifiers): Promise<ContactAttachment>;
  interface GetAttachmentIdentifiers {
      /** Contact ID for the attachment to retrieve. */
      contactId: string;
      /** Attachment ID to retrieve. */
      attachmentId: string;
  }
  
  type contactsV4Attachment_universal_d_ContactAttachment = ContactAttachment;
  type contactsV4Attachment_universal_d_ContactAttachmentMediaOneOf = ContactAttachmentMediaOneOf;
  type contactsV4Attachment_universal_d_AttachmentType = AttachmentType;
  const contactsV4Attachment_universal_d_AttachmentType: typeof AttachmentType;
  type contactsV4Attachment_universal_d_MediaFileUploadedEvent = MediaFileUploadedEvent;
  type contactsV4Attachment_universal_d_CrmAttachmentUploadedEvent = CrmAttachmentUploadedEvent;
  type contactsV4Attachment_universal_d_CrmAttachment = CrmAttachment;
  type contactsV4Attachment_universal_d_AttachmentSource = AttachmentSource;
  type contactsV4Attachment_universal_d_AttachmentMetadata = AttachmentMetadata;
  type contactsV4Attachment_universal_d_AttachmentMedia = AttachmentMedia;
  type contactsV4Attachment_universal_d_AttachmentMediaMediaOneOf = AttachmentMediaMediaOneOf;
  type contactsV4Attachment_universal_d_CrmAttachmentAttachmentType = CrmAttachmentAttachmentType;
  const contactsV4Attachment_universal_d_CrmAttachmentAttachmentType: typeof CrmAttachmentAttachmentType;
  type contactsV4Attachment_universal_d_CreateDemoAttachmentRequest = CreateDemoAttachmentRequest;
  type contactsV4Attachment_universal_d_DemoContactType = DemoContactType;
  const contactsV4Attachment_universal_d_DemoContactType: typeof DemoContactType;
  type contactsV4Attachment_universal_d_CreateDemoAttachmentResponse = CreateDemoAttachmentResponse;
  type contactsV4Attachment_universal_d_GenerateAttachmentUploadUrlRequest = GenerateAttachmentUploadUrlRequest;
  type contactsV4Attachment_universal_d_GenerateAttachmentUploadUrlResponse = GenerateAttachmentUploadUrlResponse;
  type contactsV4Attachment_universal_d_ListAttachmentsRequest = ListAttachmentsRequest;
  type contactsV4Attachment_universal_d_ListAttachmentsResponse = ListAttachmentsResponse;
  type contactsV4Attachment_universal_d_DeleteAttachmentRequest = DeleteAttachmentRequest;
  type contactsV4Attachment_universal_d_DeleteAttachmentResponse = DeleteAttachmentResponse;
  type contactsV4Attachment_universal_d_GetAttachmentRequest = GetAttachmentRequest;
  type contactsV4Attachment_universal_d_GetAttachmentResponse = GetAttachmentResponse;
  const contactsV4Attachment_universal_d_createDemoAttachment: typeof createDemoAttachment;
  type contactsV4Attachment_universal_d_CreateDemoAttachmentOptions = CreateDemoAttachmentOptions;
  const contactsV4Attachment_universal_d_generateAttachmentUploadUrl: typeof generateAttachmentUploadUrl;
  type contactsV4Attachment_universal_d_GenerateAttachmentUploadUrlOptions = GenerateAttachmentUploadUrlOptions;
  const contactsV4Attachment_universal_d_listAttachments: typeof listAttachments;
  type contactsV4Attachment_universal_d_ListAttachmentsOptions = ListAttachmentsOptions;
  const contactsV4Attachment_universal_d_deleteAttachment: typeof deleteAttachment;
  type contactsV4Attachment_universal_d_DeleteAttachmentIdentifiers = DeleteAttachmentIdentifiers;
  const contactsV4Attachment_universal_d_getAttachment: typeof getAttachment;
  type contactsV4Attachment_universal_d_GetAttachmentIdentifiers = GetAttachmentIdentifiers;
  namespace contactsV4Attachment_universal_d {
    export {
      contactsV4Attachment_universal_d_ContactAttachment as ContactAttachment,
      contactsV4Attachment_universal_d_ContactAttachmentMediaOneOf as ContactAttachmentMediaOneOf,
      contactsV4Attachment_universal_d_AttachmentType as AttachmentType,
      DomainEvent$4 as DomainEvent,
      DomainEventBodyOneOf$4 as DomainEventBodyOneOf,
      EntityCreatedEvent$4 as EntityCreatedEvent,
      RestoreInfo$4 as RestoreInfo,
      EntityUpdatedEvent$4 as EntityUpdatedEvent,
      EntityDeletedEvent$4 as EntityDeletedEvent,
      ActionEvent$4 as ActionEvent,
      Empty$1 as Empty,
      contactsV4Attachment_universal_d_MediaFileUploadedEvent as MediaFileUploadedEvent,
      contactsV4Attachment_universal_d_CrmAttachmentUploadedEvent as CrmAttachmentUploadedEvent,
      contactsV4Attachment_universal_d_CrmAttachment as CrmAttachment,
      contactsV4Attachment_universal_d_AttachmentSource as AttachmentSource,
      contactsV4Attachment_universal_d_AttachmentMetadata as AttachmentMetadata,
      contactsV4Attachment_universal_d_AttachmentMedia as AttachmentMedia,
      contactsV4Attachment_universal_d_AttachmentMediaMediaOneOf as AttachmentMediaMediaOneOf,
      contactsV4Attachment_universal_d_CrmAttachmentAttachmentType as CrmAttachmentAttachmentType,
      contactsV4Attachment_universal_d_CreateDemoAttachmentRequest as CreateDemoAttachmentRequest,
      contactsV4Attachment_universal_d_DemoContactType as DemoContactType,
      contactsV4Attachment_universal_d_CreateDemoAttachmentResponse as CreateDemoAttachmentResponse,
      contactsV4Attachment_universal_d_GenerateAttachmentUploadUrlRequest as GenerateAttachmentUploadUrlRequest,
      contactsV4Attachment_universal_d_GenerateAttachmentUploadUrlResponse as GenerateAttachmentUploadUrlResponse,
      contactsV4Attachment_universal_d_ListAttachmentsRequest as ListAttachmentsRequest,
      Paging$4 as Paging,
      contactsV4Attachment_universal_d_ListAttachmentsResponse as ListAttachmentsResponse,
      PagingMetadata$3 as PagingMetadata,
      contactsV4Attachment_universal_d_DeleteAttachmentRequest as DeleteAttachmentRequest,
      contactsV4Attachment_universal_d_DeleteAttachmentResponse as DeleteAttachmentResponse,
      contactsV4Attachment_universal_d_GetAttachmentRequest as GetAttachmentRequest,
      contactsV4Attachment_universal_d_GetAttachmentResponse as GetAttachmentResponse,
      MessageEnvelope$5 as MessageEnvelope,
      IdentificationData$5 as IdentificationData,
      IdentificationDataIdOneOf$5 as IdentificationDataIdOneOf,
      WebhookIdentityType$5 as WebhookIdentityType,
      contactsV4Attachment_universal_d_createDemoAttachment as createDemoAttachment,
      contactsV4Attachment_universal_d_CreateDemoAttachmentOptions as CreateDemoAttachmentOptions,
      contactsV4Attachment_universal_d_generateAttachmentUploadUrl as generateAttachmentUploadUrl,
      contactsV4Attachment_universal_d_GenerateAttachmentUploadUrlOptions as GenerateAttachmentUploadUrlOptions,
      contactsV4Attachment_universal_d_listAttachments as listAttachments,
      contactsV4Attachment_universal_d_ListAttachmentsOptions as ListAttachmentsOptions,
      contactsV4Attachment_universal_d_deleteAttachment as deleteAttachment,
      contactsV4Attachment_universal_d_DeleteAttachmentIdentifiers as DeleteAttachmentIdentifiers,
      contactsV4Attachment_universal_d_getAttachment as getAttachment,
      contactsV4Attachment_universal_d_GetAttachmentIdentifiers as GetAttachmentIdentifiers,
    };
  }
  
  interface Contact {
      /**
       * Contact ID.
       * @readonly
       */
      _id?: string;
      /**
       * Revision number, which increments by 1 each time the contact is updated.
       * To prevent conflicting changes,
       * the existing `revision` must be specified when updating a contact.
       * @readonly
       */
      revision?: number;
      /**
       * Details about the contact's source.
       * @readonly
       */
      source?: ContactSource;
      /**
       * Date and time the contact was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the contact was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Details about the contact's last action in the site.
       * @readonly
       */
      lastActivity?: ContactActivity$1;
      /**
       * Contact's primary phone and email.
       * @readonly
       */
      primaryInfo?: PrimaryContactInfo;
      /**
       * Contact's profile picture.
       * This can contain an image URL and a Wix Media image ID.
       *
       * > **Deprecation Notice:**
       * > This property has been replaced with
       * > `info.picture`
       * > and will be removed on March 31, 2022. If your app uses this property,
       * > we recommend updating your code as soon as possible.
       * @internal
       * @readonly
       * @deprecated
       */
      picture?: string;
      /** Contact's details. */
      info?: ContactInfo$2;
      /**
       * Contact's segment IDs
       * @internal
       * @readonly
       */
      segments?: SegmentsWrapper;
      /**
       * Contact's primary email details.
       * @internal
       * @readonly
       */
      primaryEmail?: PrimaryEmail;
      /**
       * Contact's primary phone details.
       * @internal
       * @readonly
       */
      primaryPhone?: PrimaryPhone;
      /**
       * Contact's member info.
       * @internal
       * @readonly
       */
      memberInfo?: MemberInfo;
  }
  interface ContactSource {
      /**
       * Source type.
       * @readonly
       */
      sourceType?: ContactSourceType$1;
      /**
       * App ID, if the contact was created by a Wix app.
       *
       * > **Deprecation Notice:**
       * > This property has been replaced with
       * > `appId`
       * > and will be removed on March 31, 2022. If your app uses this property,
       * > we recommend updating your code as soon as possible.
       * @internal
       * @readonly
       * @deprecated
       */
      wixAppId?: string | null;
      /**
       * App ID, if the contact was created by an app.
       * @readonly
       */
      appId?: string | null;
  }
  enum ContactSourceType$1 {
      OTHER = "OTHER",
      ADMIN = "ADMIN",
      WIX_APP = "WIX_APP",
      IMPORT = "IMPORT",
      THIRD_PARTY = "THIRD_PARTY",
      WIX_BOOKINGS = "WIX_BOOKINGS",
      WIX_CHAT = "WIX_CHAT",
      WIX_EMAIL_MARKETING = "WIX_EMAIL_MARKETING",
      WIX_EVENTS = "WIX_EVENTS",
      WIX_FORMS = "WIX_FORMS",
      WIX_GROUPS = "WIX_GROUPS",
      WIX_HOTELS = "WIX_HOTELS",
      WIX_MARKET_PLACE = "WIX_MARKET_PLACE",
      WIX_MUSIC = "WIX_MUSIC",
      WIX_RESTAURANTS = "WIX_RESTAURANTS",
      WIX_SITE_MEMBERS = "WIX_SITE_MEMBERS",
      WIX_STORES = "WIX_STORES",
      WIX_CODE = "WIX_CODE",
      HOPP = "HOPP"
  }
  interface ContactActivity$1 {
      /** Date and time of the last action. */
      activityDate?: Date | null;
      /** Contact's last action in the site. */
      activityType?: ContactActivityType$1;
      /**
       * Date and time of the activity.
       * @internal
       */
      date?: Date | null;
      /**
       * Activity description. Translated.
       * @internal
       */
      description?: string | null;
      /**
       * Activity Icon
       * @internal
       */
      icon?: ActivityIcon$1;
  }
  enum ContactActivityType$1 {
      /** Visited the site. */
      GENERAL = "GENERAL",
      /** Became a new contact. */
      CONTACT_CREATED = "CONTACT_CREATED",
      /** Logged in. */
      MEMBER_LOGIN = "MEMBER_LOGIN",
      /** Requested a site membership. */
      MEMBER_REGISTER = "MEMBER_REGISTER",
      /** Was approved, blocked, or unblocked. */
      MEMBER_STATUS_CHANGED = "MEMBER_STATUS_CHANGED",
      /** Submitted a form. */
      FORM_SUBMITTED = "FORM_SUBMITTED",
      /** Started a chat. */
      INBOX_FORM_SUBMITTED = "INBOX_FORM_SUBMITTED",
      /** Paid a payment request. */
      INBOX_PAYMENT_REQUEST_PAID = "INBOX_PAYMENT_REQUEST_PAID",
      /** Received a message from the site. */
      INBOX_MESSAGE_TO_CUSTOMER = "INBOX_MESSAGE_TO_CUSTOMER",
      /** Sent a new message to the site. */
      INBOX_MESSAGE_FROM_CUSTOMER = "INBOX_MESSAGE_FROM_CUSTOMER",
      /** Subscribed to a site newsletter through a form. */
      NEWSLETTER_SUBSCRIPTION_FORM_SUBMITTED = "NEWSLETTER_SUBSCRIPTION_FORM_SUBMITTED",
      /** Unsubscribed from a site newsletter. */
      NEWSLETTER_SUBSCRIPTION_UNSUBSCRIBE = "NEWSLETTER_SUBSCRIPTION_UNSUBSCRIBE",
      /** Made a purchase. */
      ECOM_PURCHASE = "ECOM_PURCHASE",
      /** Abandoned a shopping cart. */
      ECOM_CART_ABANDON = "ECOM_CART_ABANDON",
      /** Checked out shopping cart and submitted buyer info (but didn’t complete the purchase yet). */
      ECOM_CHECKOUT_BUYER = "ECOM_CHECKOUT_BUYER",
      /** Booked an appointment. */
      BOOKINGS_APPOINTMENT = "BOOKINGS_APPOINTMENT",
      /** Made a Wix Hotels reservation. */
      HOTELS_RESERVATION = "HOTELS_RESERVATION",
      /** Paid for a Wix Hotels reservation. */
      HOTELS_PURCHASE = "HOTELS_PURCHASE",
      /** Confirmed a Wix Hotels reservation. */
      HOTELS_CONFIRMATION = "HOTELS_CONFIRMATION",
      /** Canceled a Wix Hotels reservation. */
      HOTELS_CANCEL = "HOTELS_CANCEL",
      /** Purchased a video. */
      VIDEO_PURCHASE = "VIDEO_PURCHASE",
      /** Rented a video. */
      VIDEO_RENT = "VIDEO_RENT",
      /** Made a purchase with a pay button. */
      CASHIER_BUTTON_PURCHASE = "CASHIER_BUTTON_PURCHASE",
      /** Became a new Wix Marketplace lead. */
      ARENA_NEW_LEAD = "ARENA_NEW_LEAD",
      /** RSVP'd to an event. */
      EVENTS_RSVP = "EVENTS_RSVP",
      /** Paid an invoice. */
      INVOICE_PAY = "INVOICE_PAY",
      /** An invoice is now overdue. */
      INVOICE_OVERDUE = "INVOICE_OVERDUE",
      /** Accepted a price quote. */
      PRICE_QUOTE_ACCEPT = "PRICE_QUOTE_ACCEPT",
      /** A price quote has expired. */
      PRICE_QUOTE_EXPIRE = "PRICE_QUOTE_EXPIRE",
      /** Ordered food with Wix Restaurants. */
      RESTAURANTS_ORDER = "RESTAURANTS_ORDER",
      /** Made a Wix Restaurants reservation. */
      RESTAURANTS_RESERVATION = "RESTAURANTS_RESERVATION",
      /** Opened an email from the site. */
      SHOUTOUT_OPEN = "SHOUTOUT_OPEN",
      /** Clicked a link in an email from the site. */
      SHOUTOUT_CLICK = "SHOUTOUT_CLICK",
      /** Merged with another contact. */
      CONTACT_MERGED = "CONTACT_MERGED",
      /** Subscribed to a site newsletter. */
      NEWSLETTER_SUBSCRIPTION_SUBSCRIBE = "NEWSLETTER_SUBSCRIPTION_SUBSCRIBE",
      /** Subscription status to site newsletters is pending confirmation. */
      NEWSLETTER_SUBSCRIPTION_PENDING = "NEWSLETTER_SUBSCRIPTION_PENDING",
      /** Subscription status to site newsletters is not set. */
      NEWSLETTER_SUBSCRIPTION_NOT_SET = "NEWSLETTER_SUBSCRIPTION_NOT_SET",
      /** Subscribed to phone notifications. */
      PHONE_SUBSCRIPTION_SUBSCRIBE = "PHONE_SUBSCRIPTION_SUBSCRIBE",
      /** Subscription to phone notificatons is pending confirmation. */
      PHONE_SUBSCRIPTION_PENDING = "PHONE_SUBSCRIPTION_PENDING",
      /** Subscription to phone notificatons is not set. */
      PHONE_SUBSCRIPTION_NOT_SET = "PHONE_SUBSCRIPTION_NOT_SET",
      /** Subscribed to phone notifications. */
      PHONE_SUBSCRIPTION_UNSUBSCRIBE = "PHONE_SUBSCRIPTION_UNSUBSCRIBE"
  }
  interface ActivityIcon$1 {
      /** Icon name */
      name?: string | null;
      /** Icon url */
      url?: string | null;
  }
  interface PrimaryContactInfo {
      /**
       * Primary email address.
       *
       * This property reflects the email address in `info.emails`
       * where `primary` is `true`.
       * @readonly
       */
      email?: string | null;
      /**
       * Primary phone number.
       *
       * This property reflects the phone number in `info.phones`
       * where `primary` is `true`.
       * @readonly
       */
      phone?: string | null;
  }
  interface ContactInfo$2 {
      /** Contact's first and last name. */
      name?: ContactName$1;
      /** Contact's email addresses. */
      emails?: ContactEmailsWrapper$1;
      /** Contact's phone numbers. */
      phones?: ContactPhonesWrapper$1;
      /** Contact's street addresses. */
      addresses?: ContactAddressesWrapper$1;
      /** Contact's company name. */
      company?: string | null;
      /** Contact's job title. */
      jobTitle?: string | null;
      /** Birth date in `YYYY-MM-DD` format. For example, `2020-03-15`. */
      birthdate?: string | null;
      /**
       * Site contributors
       * who are assigned to manage communication with the contact.
       * @internal
       */
      assignedUserIds?: AssigneesWrapper$1;
      /**
       * Locale in
       * [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * Typically, this is a lowercase 2-letter language code,
       * followed by a hyphen, followed by an uppercase 2-letter country code.
       * For example, `en-US` for U.S. English, and `de-DE` for Germany German.
       */
      locale?: string | null;
      /**
       * List of contact's labels.
       *
       * Labels are used to organize contacts. Labels can be
       * added and removed using Label Contact and Unlabel Contact, respectively.
       *
       * To view or manage contact labels, use the Labels API.
       */
      labelKeys?: LabelsWrapper$1;
      /**
       * Additional custom fields.
       *
       * Empty fields are not returned.
       */
      extendedFields?: ExtendedFieldsWrapper$1;
      /**
       * Contact locations.
       * @internal
       */
      locations?: LocationsWrapper$1;
      /** Contact's profile picture. */
      picture?: ContactPicture$1;
  }
  interface ContactName$1 {
      /** Contact's first name. */
      first?: string | null;
      /** Contact's last name. */
      last?: string | null;
  }
  interface ContactEmailsWrapper$1 {
      /** List of up to 50 email addresses. */
      items?: ContactEmail$1[];
  }
  interface ContactEmail$1 {
      /**
       * Email ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Email type.
       *
       * `UNTAGGED` is shown as "Other" in the Contact List.
       */
      tag?: EmailTag$1;
      /** Email address. */
      email?: string;
      /**
       * Indicates whether this is the contact's primary email address.
       * When changing `primary` to `true` for an email,
       * the contact's other emails become `false`.
       * Changing the primary email of a contact also affects the subscription status to marketing emails that are decided based on the primary email.
       */
      primary?: boolean | null;
  }
  enum EmailTag$1 {
      UNTAGGED = "UNTAGGED",
      MAIN = "MAIN",
      HOME = "HOME",
      WORK = "WORK"
  }
  interface ContactPhonesWrapper$1 {
      /** List of up to 50 phone numbers. */
      items?: ContactPhone$1[];
  }
  interface ContactPhone$1 {
      /**
       * Phone ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Phone type.
       *
       * `UNTAGGED` is shown as "Other" in the Contact List.
       */
      tag?: PhoneTag$1;
      /** [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. */
      countryCode?: string | null;
      /** Phone number. */
      phone?: string;
      /**
       * [ITU E.164-formatted](https://www.itu.int/rec/T-REC-E.164/)
       * phone number.
       * Automatically generated using `phone` and `countryCode`, pending both values are valid.
       * @readonly
       */
      e164Phone?: string | null;
      /**
       * Formatted phone. Automatically generated using phone and countryCode.
       * @internal
       * @readonly
       */
      formattedPhone?: string | null;
      /**
       * Indicates whether this is the contact's primary phone number.
       * When changing `primary` to `true` for a phone,
       * the contact's `primary` field for other phones becomes `false`.
       * Changing the primary phone number also affects the subscription status to SMS messages that are decided based on the primary phone.
       */
      primary?: boolean | null;
  }
  enum PhoneTag$1 {
      UNTAGGED = "UNTAGGED",
      MAIN = "MAIN",
      HOME = "HOME",
      MOBILE = "MOBILE",
      WORK = "WORK",
      FAX = "FAX"
  }
  interface ContactAddressesWrapper$1 {
      /** List of up to 50 addresses. */
      items?: ContactAddress$1[];
  }
  interface ContactAddress$1 {
      /**
       * Street address ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Address type.
       * `UNTAGGED` is shown as "Other" in the Contact List.
       */
      tag?: AddressTag$1;
      /** Street address. */
      address?: Address$1;
  }
  enum AddressTag$1 {
      UNTAGGED = "UNTAGGED",
      HOME = "HOME",
      WORK = "WORK",
      BILLING = "BILLING",
      SHIPPING = "SHIPPING"
  }
  /** Physical address */
  interface Address$1 extends AddressStreetOneOf$1 {
      /** Street address object, with number and name in separate fields. */
      streetAddress?: StreetAddress$1;
      /** Main address line, usually street and number, as free text. */
      addressLine1?: string | null;
      /**
       * 2-letter country code in an
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
       */
      country?: string | null;
      /**
       * Code for a subdivision (such as state, prefecture, or province) in an
       * [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) format.
       */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Postal or zip code. */
      postalCode?: string | null;
      /**
       * Free text providing more detailed address information,
       * such as apartment, suite, or floor.
       */
      addressLine2?: string | null;
      /**
       * Human-readable address string.
       * If not provided, the value is generated from the available address data.
       * @internal
       */
      formatted?: string | null;
      /**
       * Coordinates of the physical address.
       * @internal
       */
      location?: AddressLocation$1;
  }
  /** @oneof */
  interface AddressStreetOneOf$1 {
      /** Street address object, with number and name in separate fields. */
      streetAddress?: StreetAddress$1;
      /** Main address line, usually street and number, as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress$1 {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /**
       * Apartment number.
       * @internal
       */
      apt?: string;
      /**
       * Optional address line 1
       * @internal
       */
      formattedAddressLine?: string | null;
  }
  interface AddressLocation$1 {
      /** Address's latitude. */
      latitude?: number | null;
      /** Address's longitude. */
      longitude?: number | null;
  }
  interface Subdivision$1 {
      /** subdivision short code */
      code?: string;
      /** Full subdivision name. */
      name?: string;
      /** @internal */
      type?: SubdivisionType$1;
      /**
       * Free text that describes the subdivision type.
       *
       * Examples: `"state"`, `"province"`, `"prefecture"`.
       * @internal
       */
      typeInfo?: string | null;
  }
  enum SubdivisionType$1 {
      UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
      /** State */
      ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
      /** County */
      ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
      /** City/town */
      ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
      /** Neighborhood/quarter */
      ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
      /** Street/block */
      ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
      /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
      COUNTRY = "COUNTRY"
  }
  interface AssigneesWrapper$1 {
      /** List of site contributor user IDs. */
      items?: string[];
  }
  interface LabelsWrapper$1 {
      /**
       * List of contact label keys.
       *
       * Contact labels help categorize contacts. Label keys must exist to be added to the contact.
       * Contact labels can be created or retrieved with Find or Create Label or List Labels.
       */
      items?: string[];
  }
  interface ExtendedFieldsWrapper$1 {
      /**
       * Contact's extended fields,
       * where each key is the field key,
       * and each value is the field's value for the contact.
       *
       * To view and manage extended fields, use the Extended Fields API.
       */
      items?: Record<string, any>;
  }
  interface LocationsWrapper$1 {
      /** List of location ids. */
      items?: string[];
  }
  /** TEST contact picture description */
  interface ContactPicture$1 {
      /**
       * Image.
       * This can contain an image URL or a Wix Media image ID.
       */
      image?: string;
      /**
       * Indicates whether the image is retrieved from Wix Media
       * or an external provider.
       *
       * - `EXTERNAL`: The image is retrieved from an external provider.
       * - `WIX_MEDIA`: The image is retrieved from Wix Media.
       * @internal
       * @deprecated
       */
      imageProvider?: ImageProvider$1;
  }
  enum ImageProvider$1 {
      UNKNOWN = "UNKNOWN",
      /** Image stored outside Wix */
      EXTERNAL = "EXTERNAL",
      /** Stored in wix media platform, Must be uploaded by using `GeneratePictureUploadUrl` */
      WIX_MEDIA = "WIX_MEDIA"
  }
  interface SegmentsWrapper {
      /** List of Contact segment IDs */
      items?: string[];
  }
  interface PrimaryEmail {
      /**
       * Primary email address.
       *
       * This property reflects the email address in `info.emails`
       * where `primary` is `true`.
       * @readonly
       */
      email?: string | null;
      /**
       * Indicates the recipient's opt-in or opt-out status for marketing emails.
       *
       * - `NOT_SET`: No status specified. Default.
       * - `PENDING`: Subscription confirmation was requested,
       * but recipient hasn't confirmed yet.
       * - `SUBSCRIBED`: Recipient has opted in to marketing emails.
       * - `UNSUBSCRIBED`: Recipient has opted out of marketing emails.
       * @readonly
       */
      subscriptionStatus?: SubscriptionStatus;
      /**
       * Indicates last reported status of sent emails.
       *
       * - `NOT_SET`: No status reported. Default.
       * - `VALID`: Emails are being successfully delivered.
       * - `BOUNCED`: The last email to the recipient bounced or was rejected.
       * - `SPAM_COMPLAINT`: Recipient registered a spam complaint
       * with their email provider.
       * - `INACTIVE`: Multiple emails have been delivered without any kind of engagement from the recipient.
       * @readonly
       */
      deliverabilityStatus?: EmailDeliverabilityStatus;
  }
  enum SubscriptionStatus {
      NO_SUBSCRIPTION_STATUS = "NO_SUBSCRIPTION_STATUS",
      NOT_SET = "NOT_SET",
      PENDING = "PENDING",
      SUBSCRIBED = "SUBSCRIBED",
      UNSUBSCRIBED = "UNSUBSCRIBED"
  }
  enum EmailDeliverabilityStatus {
      UNKNOWN_EMAIL_DELIVERABILITY_STATUS = "UNKNOWN_EMAIL_DELIVERABILITY_STATUS",
      NOT_SET = "NOT_SET",
      VALID = "VALID",
      BOUNCED = "BOUNCED",
      SPAM_COMPLAINT = "SPAM_COMPLAINT",
      INACTIVE = "INACTIVE"
  }
  interface PrimaryPhone {
      /** [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code of the primary phone. */
      countryCode?: string | null;
      /**
       * [ITU E.164-formatted](https://www.itu.int/rec/T-REC-E.164/)
       * phone number.
       * Automatically generated using `phone` and `countryCode`,
       * as long as both of those values are valid.
       * @readonly
       */
      e164Phone?: string | null;
      /**
       * Formatted phone. Automatically generated using phone and countryCode.
       * @readonly
       */
      formattedPhone?: string | null;
      /**
       * Indicates the recipient's opt-in or opt-out status for SMS messages.
       *
       * - `NO_SUBSCRIPTION_STATUS`: No status exists. This is the status when the phone is not a valid E164 phone.
       * - `NOT_SET`: No status specified. Default when the phone is a valid E164 phone.
       * - `PENDING`: Subscription confirmation was requested,
       * but recipient hasn't confirmed yet.
       * - `SUBSCRIBED`: Recipient has opted in to SMS messages.
       * - `UNSUBSCRIBED`: Recipient has opted out of SMS messages.
       * @readonly
       */
      subscriptionStatus?: SubscriptionStatus;
      /**
       * - `NO_PHONE_DELIVERABILITY_STATUS`: No status exists. This is the status when the phone is not a valid E164 phone.
       * - `NOT_SET`: No status reported. Default when the phone is a valid E164 phone.
       * @internal
       * @readonly
       */
      deliverabilityStatus?: PhoneDeliverabilityStatus;
      /**
       * Primary phone number.
       *
       * This property reflects the phone number in `info.phones`
       * where `primary` is `true`.
       * @readonly
       */
      phone?: string | null;
  }
  enum PhoneDeliverabilityStatus {
      NO_PHONE_DELIVERABILITY_STATUS = "NO_PHONE_DELIVERABILITY_STATUS",
      NOT_SET = "NOT_SET"
  }
  interface MemberInfo {
      /** Member ID */
      memberId?: string | null;
      /** Signup date */
      signupDate?: Date | null;
      /** Login email */
      email?: string | null;
      /** Indicate whether the email is verified */
      emailVerified?: boolean | null;
      /** Indicates whether the member is required to verify their email */
      emailVerificationRequired?: boolean | null;
      /**
       * Member status.
       * - `PENDING`: Member created and is waiting for approval by site owner.
       * - `ACTIVE`: Member can log in to the site.
       * - `OFFLINE`: Member is a [managed writer](https://support.wix.com/en/article/wix-blog-adding-managed-writers-to-your-blog) for the site blog and cannot log in to the site.
       * - `BLOCKED': Member is blocked and cannot log in to the site.
       */
      status?: MemberStatus;
      /** Profile info */
      profileInfo?: ProfileInfo;
      /** User info */
      userInfo?: UserInfo;
      /** Session info */
      sessionInfo?: SessionInfo;
      /** Group info */
      groupInfo?: GroupInfo;
  }
  enum MemberStatus {
      UNKNOWN_MEMBER_STATUS = "UNKNOWN_MEMBER_STATUS",
      PENDING = "PENDING",
      ACTIVE = "ACTIVE",
      DELETED = "DELETED",
      BLOCKED = "BLOCKED",
      OFFLINE = "OFFLINE"
  }
  interface ProfileInfo {
      /** Nickname */
      nickname?: string | null;
      /** Privacy status */
      privacyStatus?: PrivacyStatus;
      /** Indicate whether the member is reported */
      reported?: boolean | null;
      /** Indicate whether the member is muted */
      muted?: boolean | null;
      /** Profile photo */
      photo?: string;
  }
  enum PrivacyStatus {
      UNKNOWN_PRIVACY_STATUS = "UNKNOWN_PRIVACY_STATUS",
      PRIVATE = "PRIVATE",
      PUBLIC = "PUBLIC"
  }
  interface UserInfo {
      /** User ID */
      userId?: string;
      /** The user's role on the website */
      role?: Role;
  }
  enum Role {
      UNSPECIFIED_ROLE = "UNSPECIFIED_ROLE",
      OWNER = "OWNER",
      CONTRIBUTOR = "CONTRIBUTOR"
  }
  interface SessionInfo {
      /** Last time the member logged in to the website */
      lastWebLogin?: Date | null;
      /** Last time the member logged in to one of the mobile apps */
      lastMobileLogin?: Date | null;
      /** List of mobile apps that the member has ever logged in to */
      mobileAppNames?: string[];
  }
  interface GroupInfo {
      /** Group IDs */
      groupIds?: string[];
  }
  interface ContactSubmitted {
      /** Pass through data, submitted with the contact */
      passThroughData?: string | null;
      /** Submitted activity */
      activity?: ContactActivity$1;
      /** Submitted Contact (after processing) */
      contact?: Contact;
  }
  interface ContactChanged {
      /** The Contact before the changes */
      previousContact?: Contact;
      /** The Contact after the changes */
      currentContact?: Contact;
  }
  interface ContactEmailSubscriptionUpdated {
      /** The updated contact ID. */
      contactId?: string;
      /** The revision of the contact. */
      revision?: number;
      /** The primary email of the contact with the updated subscription and deliverability status. */
      primaryEmail?: PrimaryEmail;
      /** Date and time the contact was updated with the email subscription or deliverability status. */
      _updatedDate?: Date | null;
  }
  interface ContactPhoneSubscriptionUpdated {
      /** The updated contact ID. */
      contactId?: string;
      /** The revision of the contact. */
      revision?: number;
      /** The primary phone of the contact with the updated subscription status. */
      primaryPhone?: PrimaryPhone;
      /** Date and time the contact was updated with the SMS subscription status. */
      _updatedDate?: Date | null;
  }
  /**
   * This message is an internal message used by this app and it is used to trigger
   * the update of the subscription status of the contact asynchronously.
   * It is published after a contact is created/updated/merged.
   */
  interface ContactPrimaryInfoUpdated {
      /** The updated contact ID. */
      contactId?: string;
      /** Indication whether the primary email was updated. */
      primaryEmailUpdated?: boolean;
      /** Indication whether primary phone was updated. */
      primaryPhoneUpdated?: boolean;
      /** previous primary email subscription status */
      previousPrimaryEmailSubscriptionStatus?: PrimarySubscriptionStatus;
      /** previous primary phone subscription status */
      previousPrimaryPhoneSubscriptionStatus?: PrimarySubscriptionStatus;
  }
  interface PrimarySubscriptionStatus {
      /** subscription status */
      subscriptionStatus?: SubscriptionStatus;
  }
  /**
   * This message is an internal message used by this app and it is used to trigger
   * the update of the contact's last activity is done asynchronously.
   */
  interface LastActivityUpdate {
      /** The contact ID. */
      contactId?: string;
      /** Activity date. */
      activityDate?: Date | null;
      /** Activity translation key. */
      activityTranslationKey?: string;
      /** Activity icon. */
      icon?: string | null;
  }
  /** Contact creation options. */
  interface CreateContactRequest {
      /** Contact info. */
      info: ContactInfo$2;
      /**
       * Controls whether the call will succeed
       * if the new contact information contains an email or a phone number already used by another contact.
       *
       * If set to `true`,
       * the call will succeed even if an email address or phone number is used by another contact.
       * If set to `false`,
       * the call will fail if the given email address is used by another contact or,
       * if the email address is not given and the given phone number is used by another contact.
       *
       * Default: `false`
       */
      allowDuplicates?: boolean;
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /** Contact. */
  interface CreateContactResponse {
      /** Contact. */
      contact?: Contact;
  }
  interface DuplicateContactExists {
      duplicateContactId?: string | null;
      duplicateEmail?: string | null;
      duplicatePhone?: string | null;
  }
  interface UpdateContactRequest {
      /** ID of the contact to update. */
      contactId: string;
      /**
       * Revision number.
       * When updating, include the existing `revision`
       * to prevent conflicting updates.
       */
      revision: number | null;
      /**
       * Controls whether the call will succeed
       * if the new contact information contains an email or a phone number already used by another contact.
       *
       * If set to `true`,
       * the call will succeed even if an email address or phone number is used by another contact.
       * If set to `false`,
       * the call will fail if the given email address is used by another contact or,
       * if the email address is not given and the given phone number is used by another contact.
       *
       * Default: `false`
       */
      allowDuplicates?: boolean;
      /** Contact info. */
      info: ContactInfo$2;
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * See
       * [Field Masks in Update Requests](https://dev.wix.com/api/rest/contacts/contacts/field-masks-in-update-requests)
       * for details on working with field masks.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /** Updated contact. */
  interface UpdateContactResponse {
      /** Updated contact. */
      contact?: Contact;
  }
  interface MergeContactsRequest {
      /** Target contact ID. */
      targetContactId: string;
      /**
       * Target contact revision number, which increments by 1 each time the contact is updated.
       * To prevent conflicting changes,
       * the target contact's current `revision` must be specified.
       */
      targetContactRevision: number | null;
      /**
       * IDs of up to 5 contacts to merge into the target contact.
       * When you merge more than one source contact,
       * the first source is given precedence, then the second, and so on.
       */
      sourceContactIds?: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  interface MergeContactsResponse {
      /** Updated target contact. */
      contact?: Contact;
  }
  interface ContactMerged {
      /** ID of the contact the source contacts were merged into. */
      targetContactId?: string;
      /** IDs of contacts that were merged into the target contact. */
      sourceContactIds?: string[];
      /** Updated target contact. */
      targetContact?: Contact;
  }
  interface PreviewMergeContactsRequest {
      /** Target contact ID. */
      targetContactId: string;
      /**
       * IDs of up to 5 contacts to merge into the target contact.
       * When you merge more than one source contact,
       * the first source is given precedence, then the second, and so on.
       */
      sourceContactIds?: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  interface PreviewMergeContactsResponse {
      /** Preview of the updated target contact. */
      contact?: Contact;
  }
  interface DeleteContactRequest {
      /** ID of the contact to delete. */
      contactId: string;
      /**
       * Indicates whether to delete the contact that is a member. If set to `true`, the contact is deleted even
       * if it is a member and the member is also deleted. Default: `false`
       * @internal
       */
      deleteMember?: boolean | null;
  }
  interface DeleteContactResponse {
  }
  interface LabelContactRequest {
      /** ID of the contact to add labels to. */
      contactId: string;
      /**
       * List of label keys to add to the contact.
       *
       * Label keys must exist to be added to the contact.
       * Use the Labels API to create or retrieve labels.
       */
      labelKeys: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /** Updated contact. */
  interface LabelContactResponse {
      /** Updated contact. */
      contact?: Contact;
  }
  interface UnlabelContactRequest {
      /** ID of the contact to remove labels from. */
      contactId: string;
      /** List of label keys to remove from the contact. */
      labelKeys: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /** Updated contact. */
  interface UnlabelContactResponse {
      /** Updated contact. */
      contact?: Contact;
  }
  interface LabelAndUnlabelContactRequest {
      /** Contact ID. */
      contactId: string;
      /**
       * List of label keys to add to the contact.
       *
       * Label keys must exist to be added to the contact.
       * Contact labels can be created or retrieved with
       * [Find or Create Label](https://dev.wix.com/api/rest/contacts/labels/find-or-create-label)
       * or
       * [List Labels](https://dev.wix.com/api/rest/contacts/labels/list-labels).
       */
      labelKeysToAdd: string[];
      /** List of label keys to remove from the contact. */
      labelKeysToRemove: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  interface LabelAndUnlabelContactResponse {
      /** Updated contact. */
      contact?: Contact;
  }
  interface ListContactsRequest {
      /** [Sort order](https://dev.wix.com/api/rest/contacts/contacts/sort-and-filter). */
      sort?: Sorting$3;
      /** [Pagination](https://dev.wix.com/api/rest/getting-started/pagination), defaults to offset = 0 and limit = 50 (max limit 1,000). */
      paging?: Paging$3;
      /**
       * List of projected fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       * `id` and `revision` are always returned.
       *
       * Supported properties:
       * `source`, `createdDate`, `updatedDate`, `lastActivity`, `primaryInfo`,
       * `info.name`, `info.emails`, `info.phones`, `info.addresses`, `info.company`,
       * `info.jobTitle`, `info.picture`, `info.birthdate`, `info.locale`,
       * `info.labelKeys`, `info.locations`, `info.extendedFields`
       */
      fields?: string[];
      fieldsets?: ContactFieldSet[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  interface Sorting$3 {
      /**
       * Field to sort by.
       *
       * Supported properties:
       * `createdDate`, `lastActivity.activityDate`, `primaryInfo.email`, `info.name.first`, `info.name.last`, `info.company`,
       * `info.jobTitle`, `info.birthdate`
       */
      fieldName?: string;
      /**
       * Sort order.
       * Use `ASC` for ascending order or `DESC` for descending order.
       *
       * Defaults to `ASC`.
       */
      order?: SortOrder$3;
  }
  enum SortOrder$3 {
      ASC = "ASC",
      DESC = "DESC"
  }
  interface Paging$3 {
      /**
       * Number of items to return. Learn more about pagination in API Query Language([SDK](https://dev.wix.com/docs/sdk/articles/work-with-the-sdk/api-query-language)|[REST](https://dev.wix.com/docs/rest/articles/getting-started/api-query-language#paging).
       *
       * Default: `50`. <br>
       * Maximum: `1000`.
       */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  enum ContactFieldSet {
      /** name, primaryEmail, primaryPhone */
      BASIC = "BASIC",
      /** name, phones, emails, addresses */
      COMMUNICATION_DETAILS = "COMMUNICATION_DETAILS",
      /** name, primaryInfo(email, phone), extendedFields */
      EXTENDED = "EXTENDED",
      /** Full contact object */
      FULL = "FULL"
  }
  /** List of contacts. */
  interface ListContactsResponse {
      /** List of contacts. */
      contacts?: Contact[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadata$2;
  }
  interface PagingMetadata$2 {
      /** The number of items returned in this response. */
      count?: number | null;
      /** The offset which was requested. */
      offset?: number | null;
      /** The total number of items that match the query. */
      total?: number | null;
      /** A flag that indicates the server failed to calculate 'total' field. */
      tooManyToCount?: boolean | null;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface QueryContactsRequest {
      /**
       * @internal
       * @internal */
      search?: string | null;
      /** Query options. */
      query?: Query$2;
      /**
       * Whether to calculate the total count the number of contacts
       * @internal
       */
      omitTotal?: boolean | null;
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  interface Query$2 {
      /**
       * Filter object.
       * See [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language)
       * for more information.
       *
       * For a detailed list of supported filters, see
       * [Supported Filters](https://dev.wix.com/api/rest/contacts/contacts/supported-filters).
       */
      filter?: Record<string, any> | null;
      /**
       * Sorting options.
       * See [Sorting and Paging](https://dev.wix.com/api/rest/getting-started/pagination)
       * for more information.
       *
       * Max: 1 sort object
       */
      sort?: Sorting$3[];
      /** Pagination options. */
      paging?: Paging$3;
      /**
       * List of projected fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       * `id` and `revision` are always returned.
       *
       * Supported properties:
       * `source`, `createdDate`, `updatedDate`, `lastActivity`, `primaryInfo`,
       * `info.name`, `info.emails`, `info.phones`, `info.addresses`, `info.company`,
       * `info.jobTitle`, `info.picture`, `info.birthdate`, `info.locale`,
       * `info.labelKeys`, `info.locations`, `info.extendedFields`
       */
      fields?: string[];
      /**
       * Predefined sets of fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       *
       * - `BASIC`: Returns `id`, `revision`, `primaryInfo`, `info.name`.
       * - `COMMUNICATION_DETAILS`: Returns `id`, `revision`, `primaryInfo`, `info.name`, `info.emails`, `info.phones`, `info.addresses`.
       * - `EXTENDED`: Returns `id`, `revision`, `primaryInfo`, `info.name`, `info.extendedFields`.
       * - `FULL`: Returns all fields.
       *
       * Default: If `fields` is omitted from the request, `FULL`.
       */
      fieldsets?: ContactFieldSet[];
  }
  /** List of contacts. */
  interface QueryContactsResponse {
      /** List of contacts. */
      contacts?: Contact[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadata$2;
  }
  interface ListFacetsRequest {
      /** Pagination options. */
      paging?: Paging$3;
      /** Language for localization. */
      language?: string | null;
      /**
       * Whether to count the number of contacts per facet
       * @internal
       */
      omitCount?: boolean;
  }
  interface ListFacetsResponse {
      /** List of facets. */
      facets?: ContactsFacet[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadata$2;
  }
  interface ContactsFacet {
      /** Type of facet. */
      facetType?: ContactsFacetType;
      /**
       * Scope for facet keys.
       * When a facet key exists in a namespace,
       * each key is unique within that namespace.
       *
       * Currently, facets not created by Wix are in the `custom` namespace.
       */
      namespace?: string | null;
      /** Human-readable display name. */
      namespaceDisplayName?: string | null;
      /** Facet key, automatically generated. */
      facetKey?: string | null;
      /** Human-readable name. Shown in the Wix UI. */
      facetDisplayName?: string | null;
      /** Number of contacts the facet applies to. */
      count?: number | null;
      /**
       * Legacy ID of the facet label
       * @internal
       */
      legacyId?: string | null;
      /** Filter used to query contacts of this facet. */
      queryFilter?: Record<string, any> | null;
  }
  enum ContactsFacetType {
      UNKNOWN = "UNKNOWN",
      ALL_CONTACTS = "ALL_CONTACTS",
      NOT_LABELED = "NOT_LABELED",
      LABEL = "LABEL",
      SUBSCRIPTION_STATUS = "SUBSCRIPTION_STATUS",
      MEMBERSHIP_STATUS = "MEMBERSHIP_STATUS"
  }
  interface QueryFacetsRequest {
      /** Pagination options. */
      paging?: Paging$3;
      /** Language for localization. */
      language?: string | null;
      /**
       * Whether to count the number of contacts per facet
       * @internal
       */
      omitCount?: boolean;
      /**
       * Filterable fields:
       * - `'info.extendedFields.emailSubscriptions.effectiveEmail'` (`$exists`).
       * - `'info.extendedFields.emailSubscriptions.subscriptionStatus'` (`$eq`, `$ne`, `$in`, `$nin`).
       * - `'info.extendedFields.emailSubscriptions.deliverabilityStatus'` (`$eq`, `$ne`, `$in`, `$nin`).
       */
      filter?: Record<string, any> | null;
  }
  interface QueryFacetsResponse {
      /** List of facets. */
      facets?: ContactsFacet[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadata$2;
  }
  interface BulkDeleteContactsRequest {
      /**
       * Filter object.
       *
       * Possible filters:
       * `$eq`, `$exists`, `$gt`, `$gte`, `$hasAll`, `$hasSome`, `$in`, `$lt`, `$lte`, `$ne`, `$startsWith`.
       *
       * See [Sort, Filter, and Search](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a detailed list of supported filters for contact properties, extended fields, and custom fields.
       *
       *
       * Example:
       * `{ "filter": { "info.name.last": "Smith" } }`
       */
      filter?: Record<string, any> | null;
      /**
       * Plain text search for an exact match, up to 100 characters.
       *
       * Searchable fields:
       *
       * - `info.name.first`
       * - `info.name.last`
       * - `info.emails.email`
       * - `info.phones.phone`
       */
      search?: string | null;
      /**
       * Indicates whether to delete the contact that is a member. If set to `true`, the contact is deleted even
       * if it is a member and the member is also deleted. Default: `false`
       * @internal
       */
      deleteMember?: boolean | null;
  }
  interface BulkDeleteContactsResponse {
      /**
       * Bulk job ID.
       * The job's status can be retrieved with
       * [Get Bulk Job](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/get-bulk-job) or
       * [List Bulk Jobs](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/list-bulk-jobs).
       */
      jobId?: string;
  }
  interface BulkUpdateContactsRequest {
      /**
       * Filter object.
       *
       * Possible filters:
       * `$eq`, `$exists`, `$gt`, `$gte`, `$hasAll`, `$hasSome`, `$in`, `$lt`, `$lte`, `$ne`, `$startsWith`.
       *
       * See [Sort, Filter, and Search](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a detailed list of supported filters for contact properties, extended fields, and custom fields.
       *
       *
       * Example:
       * `{ "filter": { "info.name.last": "Smith" } }`
       */
      filter?: Record<string, any> | null;
      /**
       * Plain text search for an exact match, up to 100 characters.
       *
       * Searchable fields:
       *
       * - `info.name.first`
       * - `info.name.last`
       * - `info.emails.email`
       * - `info.phones.phone`
       */
      search?: string | null;
      /** Contact info. */
      info?: ContactInfo$2;
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * See
       * [Field Masks in Update Requests](https://dev.wix.com/api/rest/contacts/contacts/field-masks-in-update-requests)
       * for details on working with field masks.
       * @internal
       */
      fieldMask?: string[];
  }
  interface BulkUpdateContactsResponse {
      /**
       * Bulk job ID.
       * The job's status can be retrieved with
       * [Get Bulk Job](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/get-bulk-job) or
       * [List Bulk Jobs](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/list-bulk-jobs).
       */
      jobId?: string;
  }
  interface BulkLabelAndUnlabelContactsRequest {
      /**
       * Filter options.
       * Labels will be removed from contacts that meet the `filter` and `search` criteria.
       *
       * See
       * [Field Support for Filtering, Sorting, and Searching](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a list of supported filters and fields.
       */
      filter?: Record<string, any> | null;
      /**
       * Plain text search for an exact match, up to 100 characters.
       * Labels will be removed from contacts that meet the `filter` and `search` criteria.
       *
       * See
       * [Field Support for Filtering, Sorting, and Searching](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a list of searchable fields.
       */
      search?: string | null;
      /**
       * List of label keys to add to the contacts.
       *
       * Label keys must exist to be added to the contact.
       * Contact labels can be created or retrieved with
       * [Find or Create Label](https://dev.wix.com/api/rest/contacts/labels/find-or-create-label)
       * or
       * [List Labels](https://dev.wix.com/api/rest/contacts/labels/list-labels)
       */
      labelKeysToAdd?: string[];
      /** List of label keys to remove from the contacts. */
      labelKeysToRemove?: string[];
  }
  interface BulkLabelAndUnlabelContactsResponse {
      /**
       * Bulk job ID.
       * The job's status can be retrieved with
       * [Get Bulk Job](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/get-bulk-job) or
       * [List Bulk Jobs](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/list-bulk-jobs).
       */
      jobId?: string;
  }
  interface BulkUpsertContactsRequest {
      info?: ContactInfo$2[];
      returnFullEntity?: boolean;
  }
  interface BulkUpsertContactsResponse {
      results?: Item[];
      metadata?: BulkUpsertContactsResponseMetadata;
  }
  enum Action {
      UNKNOWN = "UNKNOWN",
      UPDATED = "UPDATED",
      CREATED = "CREATED"
  }
  interface Error {
      /** Error code. */
      code?: string;
      /** Error details. */
      message?: string | null;
  }
  interface Metadata {
      _id?: string | null;
      originalIndex?: number;
      action?: Action;
      success?: boolean;
      error?: Error;
  }
  interface Item {
      contact?: Contact;
      metadata?: Metadata;
  }
  interface BulkUpsertContactsResponseMetadata {
      totalSuccess?: number;
      totalFailure?: number;
      totalCreated?: number;
      totalUpdated?: number;
  }
  interface UpsertContactRequest {
      info: ContactInfo$2;
  }
  interface UpsertContactResponse {
      /** Upserted contact. */
      contact?: Contact;
      action?: UpsertContactResponseAction;
  }
  enum UpsertContactResponseAction {
      UNKNOWN = "UNKNOWN",
      UPDATED = "UPDATED",
      CREATED = "CREATED"
  }
  interface GeneratePictureUploadUrlRequest {
      /** ID of the contact whose picture is being updated. */
      contactId: string;
      /**
       * Mime Type. Must be one of:
       * `image/png`, `image/jpeg`.
       * Defaults to `image/png`.
       */
      mimeType?: string | null;
  }
  interface GeneratePictureUploadUrlResponse {
      /** URL to upload the image */
      uploadUrl?: string;
      /** @internal */
      uploadId?: string;
  }
  interface GetContactRequest {
      /** ID of the contact to retrieve. */
      _id: string;
      /**
       * List of projected fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       * `id` and `revision` are always returned.
       *
       * Supported properties:
       * `source`, `createdDate`, `updatedDate`, `lastActivity`, `primaryInfo`,
       * `info.name`, `info.emails`, `info.phones`, `info.addresses`, `info.company`,
       * `info.jobTitle`, `info.picture`, `info.birthdate`, `info.locale`,
       * `info.labelKeys`, `info.locations`, `info.extendedFields`
       */
      fields?: string[];
      /**
       * Predefined sets of fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       *
       * - `BASIC`: Returns `id`, `revision`, `primaryInfo`, `info.name`.
       * - `COMMUNICATION_DETAILS`: Returns `id`, `revision`, `primaryInfo`, `info.name`, `info.emails`, `info.phones`, `info.addresses`.
       * - `EXTENDED`: Returns `id`, `revision`, `primaryInfo`, `info.name`, `info.extendedFields`.
       * - `FULL`: Returns all fields.
       *
       * Default: If `fields` is omitted from the request, `FULL`.
       */
      fieldsets?: ContactFieldSet[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /** The requested contact. */
  interface GetContactResponse {
      /** The requested contact. */
      contact?: Contact;
      /** Contact response type. */
      responseType?: GetContactResponseType;
  }
  enum GetContactResponseType {
      /** The specified contact was returned. */
      REGULAR = "REGULAR",
      /** Not used. */
      IMPLICIT = "IMPLICIT",
      /** The specified contact was previously merged with another contact and the new contact was returned. */
      MERGED = "MERGED"
  }
  interface SyncSubmitContactRequest {
      contactInfo?: ContactInfo$2;
      activity?: ContactActivity$1;
      passThroughData?: string | null;
      contactId?: string;
      submitOperation?: SubmitOperation$1;
      /** Need to resolve source in allocator, because of server sign */
      sourceType?: ContactSourceType$1;
      sourceId?: string | null;
      hideFromContactList?: boolean;
  }
  enum SubmitOperation$1 {
      UNKNOWN = "UNKNOWN",
      CREATE = "CREATE",
      UPDATE = "UPDATE"
  }
  interface SyncSubmitContactResponse {
  }
  interface CountContactsRequest {
  }
  interface CountContactsResponse {
      count?: number;
  }
  interface SearchContactsRequest {
      /** Search object. Encapsulates filter, sorting, paging and other details */
      search?: Search;
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  interface Search extends SearchPagingMethodOneOf {
      /** Cursor pointing to page of results. 'cursorPaging.cursor' can not be used together with 'filter' or 'sort' */
      cursorPaging?: CursorPaging$1;
      /** A filter object. See documentation [here](https://bo.wix.com/wix-docs/rnd/platformization-guidelines/api-query-language#platformization-guidelines_api-query-language_defining-in-protobuf) */
      filter?: Record<string, any> | null;
      /** Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}] */
      sort?: Sorting$3[];
      /**
       * List of projected fields to return.
       *
       * If used in the request,
       * all the fields contained in `fields` and `fieldsets` are returned.
       * If left blank, `fieldsets` is used to determine which fields to return.
       *
       * For a list of valid projected fields, see
       * [Valid Contact Projection Fields](https://dev.wix.com/api/rest/contacts/contacts/fieldsets-and-projected-fields#contacts_contacts_fieldsets-and-projected-fields_valid-contact-projection-fields).
       */
      fields?: string[];
      /**
       * Predefined sets of fields to return.
       *
       * Defaults to `FULL`.
       * Ignored if left empty when `fields` is used in the request.
       *
       * For more information,
       * see [Contact Fieldsets](https://dev.wix.com/api/rest/contacts/contacts/fieldsets-and-projected-fields#contacts_contacts_fieldsets-and-projected-fields_contact-fieldsets).
       */
      fieldsets?: string[];
      /** free text to match in searchable fields */
      search?: SearchDetails;
  }
  /** @oneof */
  interface SearchPagingMethodOneOf {
      /** Cursor pointing to page of results. 'cursorPaging.cursor' can not be used together with 'filter' or 'sort' */
      cursorPaging?: CursorPaging$1;
  }
  interface SearchDetails {
      /** boolean search mode. Default is `OR` */
      mode?: Mode;
      /** search term or expression */
      expression?: string | null;
      /**
       * fields to search in. if empty - server will search in own default fieldsDefault searchable fields:
       *
       * - `info.name.first`
       * - `info.name.last`
       * - `info.emails.email`
       * - `info.phones.phone`
       */
      fields?: string[];
      /** flag if should use auto fuzzy search (allowing typos by a managed proximity algorithm) */
      fuzzy?: boolean;
  }
  enum Mode {
      /** any */
      OR = "OR",
      /** all */
      AND = "AND"
  }
  interface CursorPaging$1 {
      /** The number of contacts to load (default = 50, max = 1000) */
      limit?: number | null;
      /** Cursor returned in last query response. Should not be provided on first page request */
      cursor?: string | null;
  }
  interface SearchContactsResponse {
      /** List of contacts. */
      contacts?: Contact[];
      /** Details on the paged set of results returned. */
      cursorPagingMetadata?: CursorPagingMetadata$1;
  }
  /** This is the preferred message for cursor-paging enabled services */
  interface CursorPagingMetadata$1 {
      /** Number of items returned in the response. */
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
      /** Cursor pointing to next result page */
      next?: string | null;
      /** Cursor pointing to previous result page */
      prev?: string | null;
  }
  interface BulkAddSegmentToContactsRequest {
      /** Segment id */
      segmentId?: string;
      /** List of Contact ids */
      contactIds?: string[];
      /** List of existing segment ids */
      existsSegmentIds?: string[];
  }
  interface BulkAddSegmentToContactsResponse {
      /** List of action results */
      results?: ItemMetadata[];
      /** Metadata on the bulk action */
      bulkActionMetadata?: BulkActionMetadata;
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
  interface ContactAddedToSegment {
      /** Id of the segment to which the contact was added */
      segmentId?: string;
      /** The contact that was added */
      contact?: Contact;
  }
  interface BulkRemoveSegmentFromContactsRequest {
      /** Segment id */
      segmentId?: string;
      /** List of Contact ids */
      contactIds?: string[];
  }
  interface BulkRemoveSegmentFromContactsResponse {
      /** List of action results */
      results?: ItemMetadata[];
      /** Metadata on the bulk action */
      bulkActionMetadata?: BulkActionMetadata;
  }
  interface ContactRemovedFromSegment {
      /** Id of the segment from which the contact was removed */
      segmentId?: string;
      /** The contact that was removed */
      contact?: Contact;
  }
  interface ListContactIdsBySegmentRequest {
      /** Segment id */
      segmentId?: string;
      /** Cursor paging. */
      cursorPaging?: CursorPaging$1;
  }
  interface ListContactIdsBySegmentResponse {
      /** List of contact IDs */
      contactIds?: string[];
      /** Paging metadata */
      cursorPagingMetadata?: CursorPagingMetadata$1;
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
      /**
       * Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity
       * @internal
       */
      triggeredByUndelete?: boolean | null;
      /** Indicates the event was triggered by a restore-from-trashbin operation for a previously deleted entity */
      restoreInfo?: RestoreInfo$3;
      /**
       * WIP
       * @internal
       */
      additionalMetadataAsJson?: string | null;
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
  interface EntityDeletedEvent$3 {
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
  interface ActionEvent$3 {
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
   * Creates a new contact.
   *
   * The `info` object must include at least one of the following:
   * - Name
   * - Phone number
   * - Email address
   *
   * By default, if the call contains an email already in use by another contact,
   * the new contact won't be created. To override this behavior, set `allowDuplicates` to `true`.
   * @param info - Contact info.
   * @public
   * @requiredField info
   * @param options - Create contact options.
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   * @returns Contact.
   */
  function createContact(info: ContactInfo$2, options?: CreateContactOptions): Promise<CreateContactResponse>;
  interface CreateContactOptions {
      /**
       * Controls whether the call will succeed
       * if the new contact information contains an email or a phone number already used by another contact.
       *
       * If set to `true`,
       * the call will succeed even if an email address or phone number is used by another contact.
       * If set to `false`,
       * the call will fail if the given email address is used by another contact or,
       * if the email address is not given and the given phone number is used by another contact.
       *
       * Default: `false`
       */
      allowDuplicates?: boolean;
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Updates a contact.
   *
   * Each time the contact is updated,
   * `revision` increments by 1.
   * The existing `revision` must be included when updating the contact.
   * This ensures you're working with the latest contact information,
   * and it prevents unintended overwrites.
   *
   * You can't call Update Contact to update the `primaryEmail` of a contact who is also a member.
   * Instead, use the Members API to update the member's login email, which will also update the contact's primary email.
   *
   * Members are typically linked to contacts, and while they share a relationship, the member ID and contact ID are distinct identifiers. Make sure to specifiy the contact ID when calling Update Contact.
   * @param contactId - ID of the contact to update.
   * @param info - Contact info.
   * @param revision - Revision number.
   * When updating, include the existing `revision`
   * to prevent conflicting updates.
   * @public
   * @requiredField contactId
   * @requiredField info
   * @requiredField revision
   * @param options - Contact update options.
   * @permissionId CONTACTS.MODIFY
   * @permissionId CONTACTS.MODIFY_MEMBERSHIP_STATUS
   * @permissionId CONTACTS.MODIFY_MEMBER_PRIMARY_EMAIL_PERMISSION
   * @adminMethod
   * @returns Updated contact.
   */
  function updateContact(contactId: string, info: ContactInfo$2, revision: number | null, options?: UpdateContactOptions): Promise<UpdateContactResponse>;
  interface UpdateContactOptions {
      /**
       * Controls whether the call will succeed
       * if the new contact information contains an email or a phone number already used by another contact.
       *
       * If set to `true`,
       * the call will succeed even if an email address or phone number is used by another contact.
       * If set to `false`,
       * the call will fail if the given email address is used by another contact or,
       * if the email address is not given and the given phone number is used by another contact.
       *
       * Default: `false`
       */
      allowDuplicates?: boolean;
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * See
       * [Field Masks in Update Requests](https://dev.wix.com/api/rest/contacts/contacts/field-masks-in-update-requests)
       * for details on working with field masks.
       * @internal
       */
      fieldMask?: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Merges source contacts into a target contact.
   *
   * Merging contacts has the following effects on the target contact:
   *
   * - No target contact data is overwritten or deleted.
   * - Arrays (emails, phone numbers, addresses, and labels) from the source contacts are added to the target contact's arrays.
   * - If you merge more than one source contact, the 1st source contact specified is added first, then the 2nd, and so on.
   * - If there is duplicate information between the target contact and the source contact, the information isn't dupilcated in the target contact's arrays.
   *
   * <blockquote class="important">
   *
   * __Important:__
   * Merges cannot be undone.
   * In REST, call Preview Merge Contacts to test before merging.
   *
   * </blockquote>
   *
   * When you merge contacts, source contacts are typically deleted.
   * However, if a source contact is a site member or a Wix user,
   * the merge will fail because site members and Wix users can't be deleted.
   * This means that site members and Wix users can only be specified as target contacts in a merge.
   *
   * After merging, calling Get Contact with a deleted source contact ID returns the target contact ID.
   * Specifying a deleted source contact ID is not supported on any other method.
   *
   * When contacts are merged:
   *
   * - The Contact Merged event is triggered.
   * - The Contact Updated event is triggered for the target contact. `originatedFrom` is set to `merge`.
   * - The Contact Deleted event is triggered for each source contact. `originatedFrom` is set to `merge`.
   * @param targetContactId - Target contact ID.
   * @param targetContactRevision - Target contact revision number, which increments by 1 each time the contact is updated.
   * To prevent conflicting changes,
   * the target contact's current `revision` must be specified.
   * @public
   * @requiredField targetContactId
   * @requiredField targetContactRevision
   * @param options - Merge contacts options.
   * @permissionId CONTACTS.MERGE
   * @adminMethod
   */
  function mergeContacts(targetContactId: string, targetContactRevision: number | null, options?: MergeContactsOptions): Promise<MergeContactsResponse>;
  interface MergeContactsOptions {
      /**
       * IDs of up to 5 contacts to merge into the target contact.
       * When you merge more than one source contact,
       * the first source is given precedence, then the second, and so on.
       */
      sourceContactIds?: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Previews merging source contacts into a target contact.
   *
   * This method performs a dry run without deleting or updating any contacts.
   * A preview of the updated target contact is returned,
   * but no data is changed in the contact list.
   *
   * To perform the actual merge, use Merge Contacts.
   * @param targetContactId - Target contact ID.
   * @internal
   * @documentationMaturity preview
   * @requiredField targetContactId
   * @param options - Preview merge contacts options.
   * @permissionId CONTACTS.MERGE
   * @adminMethod
   */
  function previewMergeContacts(targetContactId: string, options?: PreviewMergeContactsOptions): Promise<PreviewMergeContactsResponse>;
  interface PreviewMergeContactsOptions {
      /**
       * IDs of up to 5 contacts to merge into the target contact.
       * When you merge more than one source contact,
       * the first source is given precedence, then the second, and so on.
       */
      sourceContactIds?: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Deletes a contact.
   *
   * Deleting a contact permanently removes it from the contact list.
   * If a contact is also a site member or Wix user, or has a valid billing subscription,
   * the contact can't be deleted. The related site member or Wix user must first be deleted
   * and any valid billing subscriptions must be canceled, before the contact can be deleted.
   *
   * Members are typically linked to contacts, and while they share a relationship, the member ID and contact ID are distinct identifiers.
   * Make sure to specify the contact ID when calling Delete Contact.
   * @param contactId - ID of the contact to delete.
   * @public
   * @requiredField contactId
   * @permissionId CONTACTS.MODIFY
   * @permissionId MEMBERS.MEMBER_DELETE
   * @adminMethod
   */
  function deleteContact(contactId: string, options?: DeleteContactOptions): Promise<void>;
  interface DeleteContactOptions {
      /**
       * Indicates whether to delete the contact that is a member. If set to `true`, the contact is deleted even
       * if it is a member and the member is also deleted. Default: `false`
       * @internal
       */
      deleteMember?: boolean | null;
  }
  /**
   * Adds labels to a contact.
   *
   * Use the Labels API to create or retrieve labels.
   *
   * Members are typically linked to contacts, and while they share a relationship, the member ID and contact ID are distinct identifiers.
   * Make sure to specify the contact ID when calling Label Contact.
   * @param contactId - ID of the contact to add labels to.
   * @param labelKeys - List of label keys to add to the contact.
   *
   * Label keys must exist to be added to the contact.
   * Use the Labels API to create or retrieve labels.
   * @public
   * @requiredField contactId
   * @requiredField labelKeys
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   * @returns Updated contact.
   */
  function labelContact(contactId: string, labelKeys: string[], options?: LabelContactOptions): Promise<LabelContactResponse>;
  interface LabelContactOptions {
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Removes labels from a contact.
   *
   * If a label is no longer needed
   * and you want to remove it from all contacts,
   * you can delete by calling Delete Label from the Labels API.
   *
   * Members are typically linked to contacts, and while they share a relationship, the member ID and contact ID are distinct identifiers.
   * Make sure to specify the contact ID when calling Unlabel Contact.
   * @param contactId - ID of the contact to remove labels from.
   * @param labelKeys - List of label keys to remove from the contact.
   * @public
   * @requiredField contactId
   * @requiredField labelKeys
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   * @returns Updated contact.
   */
  function unlabelContact(contactId: string, labelKeys: string[], options?: UnlabelContactOptions): Promise<UnlabelContactResponse>;
  interface UnlabelContactOptions {
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Adds and removes labels from a contact.
   * The requested labels must already exist for the site.
   * To create new labels, use
   * [Find or Create Label](https://dev.wix.com/api/rest/contacts/labels/find-or-create-label)
   * (in the Contact Labels API) before running this request.
   * @param contactId - Contact ID.
   * @param labelKeysToAdd - List of label keys to add to the contact.
   *
   * Label keys must exist to be added to the contact.
   * Contact labels can be created or retrieved with
   * [Find or Create Label](https://dev.wix.com/api/rest/contacts/labels/find-or-create-label)
   * or
   * [List Labels](https://dev.wix.com/api/rest/contacts/labels/list-labels).
   * @internal
   * @documentationMaturity preview
   * @requiredField contactId
   * @requiredField labelKeysToAdd
   * @requiredField options.labelKeysToRemove
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   */
  function labelAndUnlabelContact(contactId: string, labelKeysToAdd: string[], options?: LabelAndUnlabelContactOptions): Promise<LabelAndUnlabelContactResponse>;
  interface LabelAndUnlabelContactOptions {
      /** List of label keys to remove from the contact. */
      labelKeysToRemove: string[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Retrieves a list of up to 1,000 contacts per request.
   * @internal
   * @documentationMaturity preview
   * @param options - Object containing list of options for retrieving contacts.
   * @permissionId CONTACTS.VIEW
   * @adminMethod
   * @returns List of contacts.
   */
  function listContacts(options?: ListContactsOptions): Promise<ListContactsResponse>;
  interface ListContactsOptions {
      /** [Sort order](https://dev.wix.com/api/rest/contacts/contacts/sort-and-filter). */
      sort?: Sorting$3;
      /** [Pagination](https://dev.wix.com/api/rest/getting-started/pagination), defaults to offset = 0 and limit = 50 (max limit 1,000). */
      paging?: Paging$3;
      /**
       * List of projected fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       * `id` and `revision` are always returned.
       *
       * Supported properties:
       * `source`, `createdDate`, `updatedDate`, `lastActivity`, `primaryInfo`,
       * `info.name`, `info.emails`, `info.phones`, `info.addresses`, `info.company`,
       * `info.jobTitle`, `info.picture`, `info.birthdate`, `info.locale`,
       * `info.labelKeys`, `info.locations`, `info.extendedFields`
       */
      fields?: string[];
      fieldsets?: ContactFieldSet[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /**
   * Creates a query to retrieve a list of contacts.
   *
   * The `queryContacts()` function builds a query to retrieve a list of contacts and returns a `ContactsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is typically used to run the query using the `find()` function.
   *
   * You can refine the query by chaining `ContactsQueryBuilder` functions onto the query. `ContactsQueryBuilder` functions enable you to sort, filter, and control the results `queryContacts()` returns.
   *
   * `queryContacts()` runs with these `ContactsQueryBuilder` defaults, which you can override:
   *
   * - `skip(0)`
   * - `limit(50)`
   * - `descending(\"_createdDate\")`
   *
   * The functions that are chained to `queryContacts()` are applied in the order they are called. For example, if you apply `ascending('info.company')` and then `descending('info.name.last')`, the results are sorted first by the company name, and then, if there are multiple results with the same company, the items are sorted by last name.
   * @public
   * @documentationMaturity preview
   * @param options - Query contact options.
   * @permissionId CONTACTS.VIEW
   * @adminMethod
   */
  function queryContacts(options?: QueryContactsOptions): ContactsQueryBuilder;
  interface QueryContactsOptions {
      /** @internal */
      search?: string | null | undefined;
      /**
       * Whether to calculate the total count the number of contacts
       * @internal
       */
      omitTotal?: boolean | null | undefined;
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null | undefined;
  }
  interface QueryOffsetResult$2 {
      currentPage: number | undefined;
      totalPages: number | undefined;
      totalCount: number | undefined;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface ContactsQueryResult extends QueryOffsetResult$2 {
      items: Contact[];
      query: ContactsQueryBuilder;
      next: () => Promise<ContactsQueryResult>;
      prev: () => Promise<ContactsQueryResult>;
  }
  interface ContactsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'lastActivity.activityDate' | 'primaryInfo.email' | 'primaryInfo.phone' | 'info.name.first' | 'info.name.last' | 'info.company' | 'info.jobTitle' | 'info.birthdate' | 'info.locale', value: any) => ContactsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'lastActivity.activityDate' | 'primaryInfo.email' | 'primaryInfo.phone' | 'info.name.first' | 'info.name.last' | 'info.company' | 'info.jobTitle' | 'info.birthdate' | 'info.locale', value: any) => ContactsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate' | 'lastActivity.activityDate', value: any) => ContactsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate' | 'lastActivity.activityDate', value: any) => ContactsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate' | 'lastActivity.activityDate', value: any) => ContactsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate' | 'lastActivity.activityDate', value: any) => ContactsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'primaryInfo.email' | 'primaryInfo.phone' | 'info.name.first' | 'info.name.last' | 'info.company' | 'info.jobTitle', value: string) => ContactsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: '_id' | 'primaryInfo.email' | 'primaryInfo.phone' | 'info.name.first' | 'info.name.last' | 'info.company' | 'info.jobTitle' | 'info.locale', value: any) => ContactsQueryBuilder;
      /** @documentationMaturity preview */
      exists: (propertyName: '_id' | 'primaryInfo.email' | 'primaryInfo.phone' | 'info.name.first' | 'info.name.last' | 'info.company' | 'info.jobTitle' | 'info.locale', value: boolean) => ContactsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'_createdDate' | 'lastActivity.activityDate' | 'primaryInfo.email' | 'info.name.first' | 'info.name.last' | 'info.company' | 'info.jobTitle' | 'info.birthdate'>) => ContactsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'_createdDate' | 'lastActivity.activityDate' | 'primaryInfo.email' | 'info.name.first' | 'info.name.last' | 'info.company' | 'info.jobTitle' | 'info.birthdate'>) => ContactsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => ContactsQueryBuilder;
      /** @param skip - Number of items to skip in the query results before returning the results.
       * @documentationMaturity preview
       */
      skip: (skip: number) => ContactsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<ContactsQueryResult>;
  }
  /**
   * Lists facets from the site’s contact list.
   * Facets include labels and subscription statuses.
   * @internal
   * @documentationMaturity preview
   * @param options - List facets options.
   * @permissionId CONTACTS.VIEW
   * @adminMethod
   */
  function listFacets(options?: ListFacetsOptions): Promise<ListFacetsResponse>;
  interface ListFacetsOptions {
      /** Pagination options. */
      paging?: Paging$3;
      /** Language for localization. */
      language?: string | null;
      /**
       * Whether to count the number of contacts per facet
       * @internal
       */
      omitCount?: boolean;
  }
  /**
   * Retrieves facets from the site’s contact list by filter.
   * Facets include labels and subscription statuses.
   * @internal
   * @documentationMaturity preview
   * @param options - Query facets options.
   * @permissionId CONTACTS.VIEW
   * @adminMethod
   */
  function queryFacets(options?: QueryFacetsOptions): Promise<QueryFacetsResponse>;
  interface QueryFacetsOptions {
      /** Pagination options. */
      paging?: Paging$3;
      /** Language for localization. */
      language?: string | null;
      /**
       * Whether to count the number of contacts per facet
       * @internal
       */
      omitCount?: boolean;
      /**
       * Filterable fields:
       * - `'info.extendedFields.emailSubscriptions.effectiveEmail'` (`$exists`).
       * - `'info.extendedFields.emailSubscriptions.subscriptionStatus'` (`$eq`, `$ne`, `$in`, `$nin`).
       * - `'info.extendedFields.emailSubscriptions.deliverabilityStatus'` (`$eq`, `$ne`, `$in`, `$nin`).
       */
      filter?: Record<string, any> | null;
  }
  /**
   * Deletes multiple contacts.
   *
   * All contacts that meet the specified `filter` and `search` criteria are deleted.
   * The request should contain a `filter` value or a `search` value, or both.
   * To perform a dry run, call Query Contacts with the intended filter options.
   *
   * When this method is called, a bulk job is started and the job ID is returned.
   * The job might not complete right away, depending on its size.
   * The job's status can be retrieved with Get Bulk Job or List Bulk Jobs.
   *
   * The following errors might occur during the bulk processing and will appear in the bulk job:
   * - `CANNOT_DELETE_SITE_MEMBERS` - Contact is a site member and can't be deleted. Member must be deleted first.
   * - `CANNOT_DELETE_CONTACT_WITH_BILLING_SUBSCRIPTION` - Contact has a valid billing subscription and can't be deleted.
   * - `CANNOT_DELETE_MEMBER_OWNER_OR_CONTRIBUTOR` - Member is a Wix user and can't be deleted. This can happen only if the request indicated to delete the member.
   * - `FAILED_DELETE_CONTACT_AFTER_MEMBER_DELETION` - Member was deleted, but contact was not. This can happen only if the request indicated to delete the member.
   * - `FAILED_DELETE_CONTACT` - Contact could not be deleted.
   * @internal
   * @documentationMaturity preview
   * @param options - Bulk delete contacts options.
   * @permissionId CONTACTS.MODIFY
   * @permissionId MEMBERS.MEMBER_DELETE
   * @adminMethod
   */
  function bulkDeleteContacts(options?: BulkDeleteContactsOptions): Promise<BulkDeleteContactsResponse>;
  interface BulkDeleteContactsOptions {
      /**
       * Filter object.
       *
       * Possible filters:
       * `$eq`, `$exists`, `$gt`, `$gte`, `$hasAll`, `$hasSome`, `$in`, `$lt`, `$lte`, `$ne`, `$startsWith`.
       *
       * See [Sort, Filter, and Search](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a detailed list of supported filters for contact properties, extended fields, and custom fields.
       *
       *
       * Example:
       * `{ "filter": { "info.name.last": "Smith" } }`
       */
      filter?: Record<string, any> | null;
      /**
       * Plain text search for an exact match, up to 100 characters.
       *
       * Searchable fields:
       *
       * - `info.name.first`
       * - `info.name.last`
       * - `info.emails.email`
       * - `info.phones.phone`
       */
      search?: string | null;
      /**
       * Indicates whether to delete the contact that is a member. If set to `true`, the contact is deleted even
       * if it is a member and the member is also deleted. Default: `false`
       * @internal
       */
      deleteMember?: boolean | null;
  }
  /**
   * Updates the specified properties for multiple contacts.
   * Fields that are included in fieldMask.paths are updated,
   * while all other fields stay the same.
   *
   * All contacts that meet the specified `filter` and `search` criteria are updated.
   * To perform a dry run, call Query Contacts with the intended filter options.
   *
   * When this method is used, a bulk job is started and the job ID is returned.
   * The job may not complete right away, depending on its size.
   * The job's status can be retrieved with
   * [Get Bulk Job](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/get-bulk-job) or
   * [List Bulk Jobs](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/list-bulk-jobs).
   * @internal
   * @documentationMaturity preview
   * @param options - Bulk update contacts options.
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   */
  function bulkUpdateContacts(options?: BulkUpdateContactsOptions): Promise<BulkUpdateContactsResponse>;
  interface BulkUpdateContactsOptions {
      /**
       * Filter object.
       *
       * Possible filters:
       * `$eq`, `$exists`, `$gt`, `$gte`, `$hasAll`, `$hasSome`, `$in`, `$lt`, `$lte`, `$ne`, `$startsWith`.
       *
       * See [Sort, Filter, and Search](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a detailed list of supported filters for contact properties, extended fields, and custom fields.
       *
       *
       * Example:
       * `{ "filter": { "info.name.last": "Smith" } }`
       */
      filter?: Record<string, any> | null;
      /**
       * Plain text search for an exact match, up to 100 characters.
       *
       * Searchable fields:
       *
       * - `info.name.first`
       * - `info.name.last`
       * - `info.emails.email`
       * - `info.phones.phone`
       */
      search?: string | null;
      /** Contact info. */
      info?: ContactInfo$2;
      /**
       * Set of fields to update.
       * Fields that aren't included in `fieldMask.paths` are ignored.
       * See
       * [Field Masks in Update Requests](https://dev.wix.com/api/rest/contacts/contacts/field-masks-in-update-requests)
       * for details on working with field masks.
       * @internal
       */
      fieldMask?: string[];
  }
  /**
   * Adds and removes labels from multiple contacts.
   *
   * Labels are added to and removed from all contacts that meet the specified
   * `filter` and `search` criteria.
   * The request should specify a `filter` value, a `search` value, or both.
   * To perform a dry run, call Query Contacts with the intended filter options.
   *
   * When this method is used, a bulk job is started and the job ID is returned.
   * The job might not not complete right away, depending on its size.
   * The job's status can be retrieved with
   * [Get Bulk Job](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/get-bulk-job) or
   * [List Bulk Jobs](https://dev.wix.com/api/rest/contacts/contacts/bulk-jobs/list-bulk-jobs).
   * @internal
   * @documentationMaturity preview
   * @param options - Bulk label and unlabel contacts options.
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   */
  function bulkLabelAndUnlabelContacts(options?: BulkLabelAndUnlabelContactsOptions): Promise<BulkLabelAndUnlabelContactsResponse>;
  interface BulkLabelAndUnlabelContactsOptions {
      /**
       * Filter options.
       * Labels will be removed from contacts that meet the `filter` and `search` criteria.
       *
       * See
       * [Field Support for Filtering, Sorting, and Searching](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a list of supported filters and fields.
       */
      filter?: Record<string, any> | null;
      /**
       * Plain text search for an exact match, up to 100 characters.
       * Labels will be removed from contacts that meet the `filter` and `search` criteria.
       *
       * See
       * [Field Support for Filtering, Sorting, and Searching](https://dev.wix.com/docs/rest/crm/members-contacts/contacts/contacts/contact-v4/sort-filter-and-search)
       * for a list of searchable fields.
       */
      search?: string | null;
      /**
       * List of label keys to add to the contacts.
       *
       * Label keys must exist to be added to the contact.
       * Contact labels can be created or retrieved with
       * [Find or Create Label](https://dev.wix.com/api/rest/contacts/labels/find-or-create-label)
       * or
       * [List Labels](https://dev.wix.com/api/rest/contacts/labels/list-labels)
       */
      labelKeysToAdd?: string[];
      /** List of label keys to remove from the contacts. */
      labelKeysToRemove?: string[];
  }
  /**
   * Upserts multiple contacts.
   * @internal
   * @documentationMaturity preview
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   */
  function bulkUpsertContacts(options?: BulkUpsertContactsOptions): Promise<BulkUpsertContactsResponse>;
  interface BulkUpsertContactsOptions {
      info?: ContactInfo$2[];
      returnFullEntity?: boolean;
  }
  /**
   * Update the requested contact, when found by given email and/or phone, otherwise create the contact.
   * @internal
   * @documentationMaturity preview
   * @requiredField info
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   */
  function upsertContact(info: ContactInfo$2): Promise<UpsertContactResponse>;
  /**
   * Generates an URL that can be used to upload a contact picture
   * @param contactId - ID of the contact whose picture is being updated.
   * @internal
   * @documentationMaturity preview
   * @requiredField contactId
   * @permissionId CONTACTS.MODIFY
   * @adminMethod
   */
  function generatePictureUploadUrl(contactId: string, options?: GeneratePictureUploadUrlOptions): Promise<GeneratePictureUploadUrlResponse>;
  interface GeneratePictureUploadUrlOptions {
      /**
       * Mime Type. Must be one of:
       * `image/png`, `image/jpeg`.
       * Defaults to `image/png`.
       */
      mimeType?: string | null;
  }
  /**
   * Retrieves a contact.
   *
   * #### Getting Merged Contacts
   *
   * When a source contact is merged
   * with a target contact, the source contact is deleted.
   * When calling Get Contact for a merged contact,
   * you can use the source or target contact ID.
   * In both bases, the target contact is returned.
   *
   * This is supported only when calling Get Contact on merged contacts.
   * Previously deleted source contact IDs can't be used for any other method.
   * @param _id - ID of the contact to retrieve.
   * @public
   * @requiredField _id
   * @param options - Get contact options.
   * @permissionId CONTACTS.VIEW
   * @adminMethod
   * @returns The requested contact.
   */
  function getContact(_id: string, options?: GetContactOptions): Promise<Contact>;
  interface GetContactOptions {
      /**
       * List of projected fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       * `id` and `revision` are always returned.
       *
       * Supported properties:
       * `source`, `createdDate`, `updatedDate`, `lastActivity`, `primaryInfo`,
       * `info.name`, `info.emails`, `info.phones`, `info.addresses`, `info.company`,
       * `info.jobTitle`, `info.picture`, `info.birthdate`, `info.locale`,
       * `info.labelKeys`, `info.locations`, `info.extendedFields`
       */
      fields?: string[];
      /**
       * Predefined sets of fields to return.
       * If both `fields` and `fieldsets` are sent in the request,
       * the union of both lists is returned.
       *
       * - `BASIC`: Returns `id`, `revision`, `primaryInfo`, `info.name`.
       * - `COMMUNICATION_DETAILS`: Returns `id`, `revision`, `primaryInfo`, `info.name`, `info.emails`, `info.phones`, `info.addresses`.
       * - `EXTENDED`: Returns `id`, `revision`, `primaryInfo`, `info.name`, `info.extendedFields`.
       * - `FULL`: Returns all fields.
       *
       * Default: If `fields` is omitted from the request, `FULL`.
       */
      fieldsets?: ContactFieldSet[];
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  /** @internal
   * @documentationMaturity preview
   * @permissionId CONTACTS.VIEW
   * @adminMethod
   */
  function countContacts(): Promise<CountContactsResponse>;
  /**
   * Retrieves a list of contacts, given the provided cursorPaging, [filtering, and sorting](https://dev.wix.com/api/rest/contacts/contacts/sorting,-filtering,-and-searching).
   * Up to 1,000 contacts can be returned per request.
   *
   * For a detailed list of supported operations, see
   * filtering and sorting for
   * [contact properties](https://dev.wix.com/api/rest/contacts/contacts/sorting,-filtering,-and-searching#contact-properties-filtering-sorting-and-searching),
   * [extended fields](https://dev.wix.com/api/rest/contacts/contacts/sorting,-filtering,-and-searching#extended-fields-filtering-sorting-and-searching),
   * and [custom fields](https://dev.wix.com/api/rest/contacts/contacts/sorting,-filtering,-and-searching#custom-fields-filtering-sorting-and-searching).
   * To learn how to query contacts, see
   * [API Query Language](https://dev.wix.com/api/rest/getting-started/api-query-language).
   * @internal
   * @documentationMaturity preview
   * @permissionId CONTACTS.VIEW
   * @adminMethod
   */
  function searchContacts(options?: SearchContactsOptions): Promise<SearchContactsResponse>;
  interface SearchContactsOptions {
      /** Search object. Encapsulates filter, sorting, paging and other details */
      search?: Search;
      /**
       * Language for localization.
       * @internal
       */
      language?: string | null;
  }
  
  type contactsV4Contact_universal_d_Contact = Contact;
  type contactsV4Contact_universal_d_ContactSource = ContactSource;
  type contactsV4Contact_universal_d_PrimaryContactInfo = PrimaryContactInfo;
  type contactsV4Contact_universal_d_SegmentsWrapper = SegmentsWrapper;
  type contactsV4Contact_universal_d_PrimaryEmail = PrimaryEmail;
  type contactsV4Contact_universal_d_SubscriptionStatus = SubscriptionStatus;
  const contactsV4Contact_universal_d_SubscriptionStatus: typeof SubscriptionStatus;
  type contactsV4Contact_universal_d_EmailDeliverabilityStatus = EmailDeliverabilityStatus;
  const contactsV4Contact_universal_d_EmailDeliverabilityStatus: typeof EmailDeliverabilityStatus;
  type contactsV4Contact_universal_d_PrimaryPhone = PrimaryPhone;
  type contactsV4Contact_universal_d_PhoneDeliverabilityStatus = PhoneDeliverabilityStatus;
  const contactsV4Contact_universal_d_PhoneDeliverabilityStatus: typeof PhoneDeliverabilityStatus;
  type contactsV4Contact_universal_d_MemberInfo = MemberInfo;
  type contactsV4Contact_universal_d_MemberStatus = MemberStatus;
  const contactsV4Contact_universal_d_MemberStatus: typeof MemberStatus;
  type contactsV4Contact_universal_d_ProfileInfo = ProfileInfo;
  type contactsV4Contact_universal_d_PrivacyStatus = PrivacyStatus;
  const contactsV4Contact_universal_d_PrivacyStatus: typeof PrivacyStatus;
  type contactsV4Contact_universal_d_UserInfo = UserInfo;
  type contactsV4Contact_universal_d_Role = Role;
  const contactsV4Contact_universal_d_Role: typeof Role;
  type contactsV4Contact_universal_d_SessionInfo = SessionInfo;
  type contactsV4Contact_universal_d_GroupInfo = GroupInfo;
  type contactsV4Contact_universal_d_ContactSubmitted = ContactSubmitted;
  type contactsV4Contact_universal_d_ContactChanged = ContactChanged;
  type contactsV4Contact_universal_d_ContactEmailSubscriptionUpdated = ContactEmailSubscriptionUpdated;
  type contactsV4Contact_universal_d_ContactPhoneSubscriptionUpdated = ContactPhoneSubscriptionUpdated;
  type contactsV4Contact_universal_d_ContactPrimaryInfoUpdated = ContactPrimaryInfoUpdated;
  type contactsV4Contact_universal_d_PrimarySubscriptionStatus = PrimarySubscriptionStatus;
  type contactsV4Contact_universal_d_LastActivityUpdate = LastActivityUpdate;
  type contactsV4Contact_universal_d_CreateContactRequest = CreateContactRequest;
  type contactsV4Contact_universal_d_CreateContactResponse = CreateContactResponse;
  type contactsV4Contact_universal_d_DuplicateContactExists = DuplicateContactExists;
  type contactsV4Contact_universal_d_UpdateContactRequest = UpdateContactRequest;
  type contactsV4Contact_universal_d_UpdateContactResponse = UpdateContactResponse;
  type contactsV4Contact_universal_d_MergeContactsRequest = MergeContactsRequest;
  type contactsV4Contact_universal_d_MergeContactsResponse = MergeContactsResponse;
  type contactsV4Contact_universal_d_ContactMerged = ContactMerged;
  type contactsV4Contact_universal_d_PreviewMergeContactsRequest = PreviewMergeContactsRequest;
  type contactsV4Contact_universal_d_PreviewMergeContactsResponse = PreviewMergeContactsResponse;
  type contactsV4Contact_universal_d_DeleteContactRequest = DeleteContactRequest;
  type contactsV4Contact_universal_d_DeleteContactResponse = DeleteContactResponse;
  type contactsV4Contact_universal_d_LabelContactRequest = LabelContactRequest;
  type contactsV4Contact_universal_d_LabelContactResponse = LabelContactResponse;
  type contactsV4Contact_universal_d_UnlabelContactRequest = UnlabelContactRequest;
  type contactsV4Contact_universal_d_UnlabelContactResponse = UnlabelContactResponse;
  type contactsV4Contact_universal_d_LabelAndUnlabelContactRequest = LabelAndUnlabelContactRequest;
  type contactsV4Contact_universal_d_LabelAndUnlabelContactResponse = LabelAndUnlabelContactResponse;
  type contactsV4Contact_universal_d_ListContactsRequest = ListContactsRequest;
  type contactsV4Contact_universal_d_ContactFieldSet = ContactFieldSet;
  const contactsV4Contact_universal_d_ContactFieldSet: typeof ContactFieldSet;
  type contactsV4Contact_universal_d_ListContactsResponse = ListContactsResponse;
  type contactsV4Contact_universal_d_QueryContactsRequest = QueryContactsRequest;
  type contactsV4Contact_universal_d_QueryContactsResponse = QueryContactsResponse;
  type contactsV4Contact_universal_d_ListFacetsRequest = ListFacetsRequest;
  type contactsV4Contact_universal_d_ListFacetsResponse = ListFacetsResponse;
  type contactsV4Contact_universal_d_ContactsFacet = ContactsFacet;
  type contactsV4Contact_universal_d_ContactsFacetType = ContactsFacetType;
  const contactsV4Contact_universal_d_ContactsFacetType: typeof ContactsFacetType;
  type contactsV4Contact_universal_d_QueryFacetsRequest = QueryFacetsRequest;
  type contactsV4Contact_universal_d_QueryFacetsResponse = QueryFacetsResponse;
  type contactsV4Contact_universal_d_BulkDeleteContactsRequest = BulkDeleteContactsRequest;
  type contactsV4Contact_universal_d_BulkDeleteContactsResponse = BulkDeleteContactsResponse;
  type contactsV4Contact_universal_d_BulkUpdateContactsRequest = BulkUpdateContactsRequest;
  type contactsV4Contact_universal_d_BulkUpdateContactsResponse = BulkUpdateContactsResponse;
  type contactsV4Contact_universal_d_BulkLabelAndUnlabelContactsRequest = BulkLabelAndUnlabelContactsRequest;
  type contactsV4Contact_universal_d_BulkLabelAndUnlabelContactsResponse = BulkLabelAndUnlabelContactsResponse;
  type contactsV4Contact_universal_d_BulkUpsertContactsRequest = BulkUpsertContactsRequest;
  type contactsV4Contact_universal_d_BulkUpsertContactsResponse = BulkUpsertContactsResponse;
  type contactsV4Contact_universal_d_Action = Action;
  const contactsV4Contact_universal_d_Action: typeof Action;
  type contactsV4Contact_universal_d_Error = Error;
  type contactsV4Contact_universal_d_Metadata = Metadata;
  type contactsV4Contact_universal_d_Item = Item;
  type contactsV4Contact_universal_d_BulkUpsertContactsResponseMetadata = BulkUpsertContactsResponseMetadata;
  type contactsV4Contact_universal_d_UpsertContactRequest = UpsertContactRequest;
  type contactsV4Contact_universal_d_UpsertContactResponse = UpsertContactResponse;
  type contactsV4Contact_universal_d_UpsertContactResponseAction = UpsertContactResponseAction;
  const contactsV4Contact_universal_d_UpsertContactResponseAction: typeof UpsertContactResponseAction;
  type contactsV4Contact_universal_d_GeneratePictureUploadUrlRequest = GeneratePictureUploadUrlRequest;
  type contactsV4Contact_universal_d_GeneratePictureUploadUrlResponse = GeneratePictureUploadUrlResponse;
  type contactsV4Contact_universal_d_GetContactRequest = GetContactRequest;
  type contactsV4Contact_universal_d_GetContactResponse = GetContactResponse;
  type contactsV4Contact_universal_d_GetContactResponseType = GetContactResponseType;
  const contactsV4Contact_universal_d_GetContactResponseType: typeof GetContactResponseType;
  type contactsV4Contact_universal_d_SyncSubmitContactRequest = SyncSubmitContactRequest;
  type contactsV4Contact_universal_d_SyncSubmitContactResponse = SyncSubmitContactResponse;
  type contactsV4Contact_universal_d_CountContactsRequest = CountContactsRequest;
  type contactsV4Contact_universal_d_CountContactsResponse = CountContactsResponse;
  type contactsV4Contact_universal_d_SearchContactsRequest = SearchContactsRequest;
  type contactsV4Contact_universal_d_Search = Search;
  type contactsV4Contact_universal_d_SearchPagingMethodOneOf = SearchPagingMethodOneOf;
  type contactsV4Contact_universal_d_SearchDetails = SearchDetails;
  type contactsV4Contact_universal_d_Mode = Mode;
  const contactsV4Contact_universal_d_Mode: typeof Mode;
  type contactsV4Contact_universal_d_SearchContactsResponse = SearchContactsResponse;
  type contactsV4Contact_universal_d_BulkAddSegmentToContactsRequest = BulkAddSegmentToContactsRequest;
  type contactsV4Contact_universal_d_BulkAddSegmentToContactsResponse = BulkAddSegmentToContactsResponse;
  type contactsV4Contact_universal_d_ItemMetadata = ItemMetadata;
  type contactsV4Contact_universal_d_ApplicationError = ApplicationError;
  type contactsV4Contact_universal_d_BulkActionMetadata = BulkActionMetadata;
  type contactsV4Contact_universal_d_ContactAddedToSegment = ContactAddedToSegment;
  type contactsV4Contact_universal_d_BulkRemoveSegmentFromContactsRequest = BulkRemoveSegmentFromContactsRequest;
  type contactsV4Contact_universal_d_BulkRemoveSegmentFromContactsResponse = BulkRemoveSegmentFromContactsResponse;
  type contactsV4Contact_universal_d_ContactRemovedFromSegment = ContactRemovedFromSegment;
  type contactsV4Contact_universal_d_ListContactIdsBySegmentRequest = ListContactIdsBySegmentRequest;
  type contactsV4Contact_universal_d_ListContactIdsBySegmentResponse = ListContactIdsBySegmentResponse;
  const contactsV4Contact_universal_d_createContact: typeof createContact;
  type contactsV4Contact_universal_d_CreateContactOptions = CreateContactOptions;
  const contactsV4Contact_universal_d_updateContact: typeof updateContact;
  type contactsV4Contact_universal_d_UpdateContactOptions = UpdateContactOptions;
  const contactsV4Contact_universal_d_mergeContacts: typeof mergeContacts;
  type contactsV4Contact_universal_d_MergeContactsOptions = MergeContactsOptions;
  const contactsV4Contact_universal_d_previewMergeContacts: typeof previewMergeContacts;
  type contactsV4Contact_universal_d_PreviewMergeContactsOptions = PreviewMergeContactsOptions;
  const contactsV4Contact_universal_d_deleteContact: typeof deleteContact;
  type contactsV4Contact_universal_d_DeleteContactOptions = DeleteContactOptions;
  const contactsV4Contact_universal_d_labelContact: typeof labelContact;
  type contactsV4Contact_universal_d_LabelContactOptions = LabelContactOptions;
  const contactsV4Contact_universal_d_unlabelContact: typeof unlabelContact;
  type contactsV4Contact_universal_d_UnlabelContactOptions = UnlabelContactOptions;
  const contactsV4Contact_universal_d_labelAndUnlabelContact: typeof labelAndUnlabelContact;
  type contactsV4Contact_universal_d_LabelAndUnlabelContactOptions = LabelAndUnlabelContactOptions;
  const contactsV4Contact_universal_d_listContacts: typeof listContacts;
  type contactsV4Contact_universal_d_ListContactsOptions = ListContactsOptions;
  const contactsV4Contact_universal_d_queryContacts: typeof queryContacts;
  type contactsV4Contact_universal_d_QueryContactsOptions = QueryContactsOptions;
  type contactsV4Contact_universal_d_ContactsQueryResult = ContactsQueryResult;
  type contactsV4Contact_universal_d_ContactsQueryBuilder = ContactsQueryBuilder;
  const contactsV4Contact_universal_d_listFacets: typeof listFacets;
  type contactsV4Contact_universal_d_ListFacetsOptions = ListFacetsOptions;
  const contactsV4Contact_universal_d_queryFacets: typeof queryFacets;
  type contactsV4Contact_universal_d_QueryFacetsOptions = QueryFacetsOptions;
  const contactsV4Contact_universal_d_bulkDeleteContacts: typeof bulkDeleteContacts;
  type contactsV4Contact_universal_d_BulkDeleteContactsOptions = BulkDeleteContactsOptions;
  const contactsV4Contact_universal_d_bulkUpdateContacts: typeof bulkUpdateContacts;
  type contactsV4Contact_universal_d_BulkUpdateContactsOptions = BulkUpdateContactsOptions;
  const contactsV4Contact_universal_d_bulkLabelAndUnlabelContacts: typeof bulkLabelAndUnlabelContacts;
  type contactsV4Contact_universal_d_BulkLabelAndUnlabelContactsOptions = BulkLabelAndUnlabelContactsOptions;
  const contactsV4Contact_universal_d_bulkUpsertContacts: typeof bulkUpsertContacts;
  type contactsV4Contact_universal_d_BulkUpsertContactsOptions = BulkUpsertContactsOptions;
  const contactsV4Contact_universal_d_upsertContact: typeof upsertContact;
  const contactsV4Contact_universal_d_generatePictureUploadUrl: typeof generatePictureUploadUrl;
  type contactsV4Contact_universal_d_GeneratePictureUploadUrlOptions = GeneratePictureUploadUrlOptions;
  const contactsV4Contact_universal_d_getContact: typeof getContact;
  type contactsV4Contact_universal_d_GetContactOptions = GetContactOptions;
  const contactsV4Contact_universal_d_countContacts: typeof countContacts;
  const contactsV4Contact_universal_d_searchContacts: typeof searchContacts;
  type contactsV4Contact_universal_d_SearchContactsOptions = SearchContactsOptions;
  namespace contactsV4Contact_universal_d {
    export {
      contactsV4Contact_universal_d_Contact as Contact,
      contactsV4Contact_universal_d_ContactSource as ContactSource,
      ContactSourceType$1 as ContactSourceType,
      ContactActivity$1 as ContactActivity,
      ContactActivityType$1 as ContactActivityType,
      ActivityIcon$1 as ActivityIcon,
      contactsV4Contact_universal_d_PrimaryContactInfo as PrimaryContactInfo,
      ContactInfo$2 as ContactInfo,
      ContactName$1 as ContactName,
      ContactEmailsWrapper$1 as ContactEmailsWrapper,
      ContactEmail$1 as ContactEmail,
      EmailTag$1 as EmailTag,
      ContactPhonesWrapper$1 as ContactPhonesWrapper,
      ContactPhone$1 as ContactPhone,
      PhoneTag$1 as PhoneTag,
      ContactAddressesWrapper$1 as ContactAddressesWrapper,
      ContactAddress$1 as ContactAddress,
      AddressTag$1 as AddressTag,
      Address$1 as Address,
      AddressStreetOneOf$1 as AddressStreetOneOf,
      StreetAddress$1 as StreetAddress,
      AddressLocation$1 as AddressLocation,
      Subdivision$1 as Subdivision,
      SubdivisionType$1 as SubdivisionType,
      AssigneesWrapper$1 as AssigneesWrapper,
      LabelsWrapper$1 as LabelsWrapper,
      ExtendedFieldsWrapper$1 as ExtendedFieldsWrapper,
      LocationsWrapper$1 as LocationsWrapper,
      ContactPicture$1 as ContactPicture,
      ImageProvider$1 as ImageProvider,
      contactsV4Contact_universal_d_SegmentsWrapper as SegmentsWrapper,
      contactsV4Contact_universal_d_PrimaryEmail as PrimaryEmail,
      contactsV4Contact_universal_d_SubscriptionStatus as SubscriptionStatus,
      contactsV4Contact_universal_d_EmailDeliverabilityStatus as EmailDeliverabilityStatus,
      contactsV4Contact_universal_d_PrimaryPhone as PrimaryPhone,
      contactsV4Contact_universal_d_PhoneDeliverabilityStatus as PhoneDeliverabilityStatus,
      contactsV4Contact_universal_d_MemberInfo as MemberInfo,
      contactsV4Contact_universal_d_MemberStatus as MemberStatus,
      contactsV4Contact_universal_d_ProfileInfo as ProfileInfo,
      contactsV4Contact_universal_d_PrivacyStatus as PrivacyStatus,
      contactsV4Contact_universal_d_UserInfo as UserInfo,
      contactsV4Contact_universal_d_Role as Role,
      contactsV4Contact_universal_d_SessionInfo as SessionInfo,
      contactsV4Contact_universal_d_GroupInfo as GroupInfo,
      contactsV4Contact_universal_d_ContactSubmitted as ContactSubmitted,
      contactsV4Contact_universal_d_ContactChanged as ContactChanged,
      contactsV4Contact_universal_d_ContactEmailSubscriptionUpdated as ContactEmailSubscriptionUpdated,
      contactsV4Contact_universal_d_ContactPhoneSubscriptionUpdated as ContactPhoneSubscriptionUpdated,
      contactsV4Contact_universal_d_ContactPrimaryInfoUpdated as ContactPrimaryInfoUpdated,
      contactsV4Contact_universal_d_PrimarySubscriptionStatus as PrimarySubscriptionStatus,
      contactsV4Contact_universal_d_LastActivityUpdate as LastActivityUpdate,
      contactsV4Contact_universal_d_CreateContactRequest as CreateContactRequest,
      contactsV4Contact_universal_d_CreateContactResponse as CreateContactResponse,
      contactsV4Contact_universal_d_DuplicateContactExists as DuplicateContactExists,
      contactsV4Contact_universal_d_UpdateContactRequest as UpdateContactRequest,
      contactsV4Contact_universal_d_UpdateContactResponse as UpdateContactResponse,
      contactsV4Contact_universal_d_MergeContactsRequest as MergeContactsRequest,
      contactsV4Contact_universal_d_MergeContactsResponse as MergeContactsResponse,
      contactsV4Contact_universal_d_ContactMerged as ContactMerged,
      contactsV4Contact_universal_d_PreviewMergeContactsRequest as PreviewMergeContactsRequest,
      contactsV4Contact_universal_d_PreviewMergeContactsResponse as PreviewMergeContactsResponse,
      contactsV4Contact_universal_d_DeleteContactRequest as DeleteContactRequest,
      contactsV4Contact_universal_d_DeleteContactResponse as DeleteContactResponse,
      contactsV4Contact_universal_d_LabelContactRequest as LabelContactRequest,
      contactsV4Contact_universal_d_LabelContactResponse as LabelContactResponse,
      contactsV4Contact_universal_d_UnlabelContactRequest as UnlabelContactRequest,
      contactsV4Contact_universal_d_UnlabelContactResponse as UnlabelContactResponse,
      contactsV4Contact_universal_d_LabelAndUnlabelContactRequest as LabelAndUnlabelContactRequest,
      contactsV4Contact_universal_d_LabelAndUnlabelContactResponse as LabelAndUnlabelContactResponse,
      contactsV4Contact_universal_d_ListContactsRequest as ListContactsRequest,
      Sorting$3 as Sorting,
      SortOrder$3 as SortOrder,
      Paging$3 as Paging,
      contactsV4Contact_universal_d_ContactFieldSet as ContactFieldSet,
      contactsV4Contact_universal_d_ListContactsResponse as ListContactsResponse,
      PagingMetadata$2 as PagingMetadata,
      contactsV4Contact_universal_d_QueryContactsRequest as QueryContactsRequest,
      Query$2 as Query,
      contactsV4Contact_universal_d_QueryContactsResponse as QueryContactsResponse,
      contactsV4Contact_universal_d_ListFacetsRequest as ListFacetsRequest,
      contactsV4Contact_universal_d_ListFacetsResponse as ListFacetsResponse,
      contactsV4Contact_universal_d_ContactsFacet as ContactsFacet,
      contactsV4Contact_universal_d_ContactsFacetType as ContactsFacetType,
      contactsV4Contact_universal_d_QueryFacetsRequest as QueryFacetsRequest,
      contactsV4Contact_universal_d_QueryFacetsResponse as QueryFacetsResponse,
      contactsV4Contact_universal_d_BulkDeleteContactsRequest as BulkDeleteContactsRequest,
      contactsV4Contact_universal_d_BulkDeleteContactsResponse as BulkDeleteContactsResponse,
      contactsV4Contact_universal_d_BulkUpdateContactsRequest as BulkUpdateContactsRequest,
      contactsV4Contact_universal_d_BulkUpdateContactsResponse as BulkUpdateContactsResponse,
      contactsV4Contact_universal_d_BulkLabelAndUnlabelContactsRequest as BulkLabelAndUnlabelContactsRequest,
      contactsV4Contact_universal_d_BulkLabelAndUnlabelContactsResponse as BulkLabelAndUnlabelContactsResponse,
      contactsV4Contact_universal_d_BulkUpsertContactsRequest as BulkUpsertContactsRequest,
      contactsV4Contact_universal_d_BulkUpsertContactsResponse as BulkUpsertContactsResponse,
      contactsV4Contact_universal_d_Action as Action,
      contactsV4Contact_universal_d_Error as Error,
      contactsV4Contact_universal_d_Metadata as Metadata,
      contactsV4Contact_universal_d_Item as Item,
      contactsV4Contact_universal_d_BulkUpsertContactsResponseMetadata as BulkUpsertContactsResponseMetadata,
      contactsV4Contact_universal_d_UpsertContactRequest as UpsertContactRequest,
      contactsV4Contact_universal_d_UpsertContactResponse as UpsertContactResponse,
      contactsV4Contact_universal_d_UpsertContactResponseAction as UpsertContactResponseAction,
      contactsV4Contact_universal_d_GeneratePictureUploadUrlRequest as GeneratePictureUploadUrlRequest,
      contactsV4Contact_universal_d_GeneratePictureUploadUrlResponse as GeneratePictureUploadUrlResponse,
      contactsV4Contact_universal_d_GetContactRequest as GetContactRequest,
      contactsV4Contact_universal_d_GetContactResponse as GetContactResponse,
      contactsV4Contact_universal_d_GetContactResponseType as GetContactResponseType,
      contactsV4Contact_universal_d_SyncSubmitContactRequest as SyncSubmitContactRequest,
      SubmitOperation$1 as SubmitOperation,
      contactsV4Contact_universal_d_SyncSubmitContactResponse as SyncSubmitContactResponse,
      contactsV4Contact_universal_d_CountContactsRequest as CountContactsRequest,
      contactsV4Contact_universal_d_CountContactsResponse as CountContactsResponse,
      contactsV4Contact_universal_d_SearchContactsRequest as SearchContactsRequest,
      contactsV4Contact_universal_d_Search as Search,
      contactsV4Contact_universal_d_SearchPagingMethodOneOf as SearchPagingMethodOneOf,
      contactsV4Contact_universal_d_SearchDetails as SearchDetails,
      contactsV4Contact_universal_d_Mode as Mode,
      CursorPaging$1 as CursorPaging,
      contactsV4Contact_universal_d_SearchContactsResponse as SearchContactsResponse,
      CursorPagingMetadata$1 as CursorPagingMetadata,
      Cursors$1 as Cursors,
      contactsV4Contact_universal_d_BulkAddSegmentToContactsRequest as BulkAddSegmentToContactsRequest,
      contactsV4Contact_universal_d_BulkAddSegmentToContactsResponse as BulkAddSegmentToContactsResponse,
      contactsV4Contact_universal_d_ItemMetadata as ItemMetadata,
      contactsV4Contact_universal_d_ApplicationError as ApplicationError,
      contactsV4Contact_universal_d_BulkActionMetadata as BulkActionMetadata,
      contactsV4Contact_universal_d_ContactAddedToSegment as ContactAddedToSegment,
      contactsV4Contact_universal_d_BulkRemoveSegmentFromContactsRequest as BulkRemoveSegmentFromContactsRequest,
      contactsV4Contact_universal_d_BulkRemoveSegmentFromContactsResponse as BulkRemoveSegmentFromContactsResponse,
      contactsV4Contact_universal_d_ContactRemovedFromSegment as ContactRemovedFromSegment,
      contactsV4Contact_universal_d_ListContactIdsBySegmentRequest as ListContactIdsBySegmentRequest,
      contactsV4Contact_universal_d_ListContactIdsBySegmentResponse as ListContactIdsBySegmentResponse,
      DomainEvent$3 as DomainEvent,
      DomainEventBodyOneOf$3 as DomainEventBodyOneOf,
      EntityCreatedEvent$3 as EntityCreatedEvent,
      RestoreInfo$3 as RestoreInfo,
      EntityUpdatedEvent$3 as EntityUpdatedEvent,
      EntityDeletedEvent$3 as EntityDeletedEvent,
      ActionEvent$3 as ActionEvent,
      MessageEnvelope$4 as MessageEnvelope,
      IdentificationData$4 as IdentificationData,
      IdentificationDataIdOneOf$4 as IdentificationDataIdOneOf,
      WebhookIdentityType$4 as WebhookIdentityType,
      contactsV4Contact_universal_d_createContact as createContact,
      contactsV4Contact_universal_d_CreateContactOptions as CreateContactOptions,
      contactsV4Contact_universal_d_updateContact as updateContact,
      contactsV4Contact_universal_d_UpdateContactOptions as UpdateContactOptions,
      contactsV4Contact_universal_d_mergeContacts as mergeContacts,
      contactsV4Contact_universal_d_MergeContactsOptions as MergeContactsOptions,
      contactsV4Contact_universal_d_previewMergeContacts as previewMergeContacts,
      contactsV4Contact_universal_d_PreviewMergeContactsOptions as PreviewMergeContactsOptions,
      contactsV4Contact_universal_d_deleteContact as deleteContact,
      contactsV4Contact_universal_d_DeleteContactOptions as DeleteContactOptions,
      contactsV4Contact_universal_d_labelContact as labelContact,
      contactsV4Contact_universal_d_LabelContactOptions as LabelContactOptions,
      contactsV4Contact_universal_d_unlabelContact as unlabelContact,
      contactsV4Contact_universal_d_UnlabelContactOptions as UnlabelContactOptions,
      contactsV4Contact_universal_d_labelAndUnlabelContact as labelAndUnlabelContact,
      contactsV4Contact_universal_d_LabelAndUnlabelContactOptions as LabelAndUnlabelContactOptions,
      contactsV4Contact_universal_d_listContacts as listContacts,
      contactsV4Contact_universal_d_ListContactsOptions as ListContactsOptions,
      contactsV4Contact_universal_d_queryContacts as queryContacts,
      contactsV4Contact_universal_d_QueryContactsOptions as QueryContactsOptions,
      contactsV4Contact_universal_d_ContactsQueryResult as ContactsQueryResult,
      contactsV4Contact_universal_d_ContactsQueryBuilder as ContactsQueryBuilder,
      contactsV4Contact_universal_d_listFacets as listFacets,
      contactsV4Contact_universal_d_ListFacetsOptions as ListFacetsOptions,
      contactsV4Contact_universal_d_queryFacets as queryFacets,
      contactsV4Contact_universal_d_QueryFacetsOptions as QueryFacetsOptions,
      contactsV4Contact_universal_d_bulkDeleteContacts as bulkDeleteContacts,
      contactsV4Contact_universal_d_BulkDeleteContactsOptions as BulkDeleteContactsOptions,
      contactsV4Contact_universal_d_bulkUpdateContacts as bulkUpdateContacts,
      contactsV4Contact_universal_d_BulkUpdateContactsOptions as BulkUpdateContactsOptions,
      contactsV4Contact_universal_d_bulkLabelAndUnlabelContacts as bulkLabelAndUnlabelContacts,
      contactsV4Contact_universal_d_BulkLabelAndUnlabelContactsOptions as BulkLabelAndUnlabelContactsOptions,
      contactsV4Contact_universal_d_bulkUpsertContacts as bulkUpsertContacts,
      contactsV4Contact_universal_d_BulkUpsertContactsOptions as BulkUpsertContactsOptions,
      contactsV4Contact_universal_d_upsertContact as upsertContact,
      contactsV4Contact_universal_d_generatePictureUploadUrl as generatePictureUploadUrl,
      contactsV4Contact_universal_d_GeneratePictureUploadUrlOptions as GeneratePictureUploadUrlOptions,
      contactsV4Contact_universal_d_getContact as getContact,
      contactsV4Contact_universal_d_GetContactOptions as GetContactOptions,
      contactsV4Contact_universal_d_countContacts as countContacts,
      contactsV4Contact_universal_d_searchContacts as searchContacts,
      contactsV4Contact_universal_d_SearchContactsOptions as SearchContactsOptions,
    };
  }
  
  /** Extended field that was found or created. */
  interface ExtendedField {
      /**
       * Extended field namespace.
       *
       * Extended fields created through by calling the Find Or Create Extended Field method
       * are automatically assigned to the `custom` namespace.
       * @readonly
       */
      namespace?: string | null;
      /**
       * Extended field key.
       *
       * When accessing contact data,
       * extended field data is available at `extendedFields[key]`.
       * For example, if the key is "custom.notes",
       * the value can be accessed at `extendedFields["custom.notes"]`.
       *
       * `key` is generated when the extended field is created
       * and can't be modified, even if `displayName` changes.
       * @readonly
       */
      key?: string;
      /** Display name shown in the contact list. */
      displayName?: string;
      /**
       * Type of data the field holds.
       * @readonly
       */
      dataType?: FieldDataType;
      /**
       * Indicates whether the extended field is a system field or custom field.
       * @readonly
       */
      fieldType?: FieldType;
      /**
       * Date and time the field was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the field was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Legacy Id of field. For internal use.
       * @internal
       * @readonly
       */
      legacyId?: string | null;
      /**
       * Field description, if the field is a system field.
       * @readonly
       */
      description?: string | null;
      /**
       * Wix search field name. For internal use.
       * @internal
       * @readonly
       */
      wixSearchColumn?: string | null;
      /**
       * Data Extensions Schema Field Id. Available only for v5 sites. For internal use.
       * @internal
       * @readonly
       */
      schemaFieldId?: string | null;
  }
  enum FieldDataType {
      /** Undefined data type. */
      UNKNOWN_DATA_TYPE = "UNKNOWN_DATA_TYPE",
      /** Accepts strings. */
      TEXT = "TEXT",
      /** Accepts floats. */
      NUMBER = "NUMBER",
      /** Accepts dates formatted as `YYYY-MM-DD`. */
      DATE = "DATE",
      /** Accepts strings. Prepends `https://` if no protocol is included. */
      URL = "URL"
  }
  enum FieldType {
      /** Undefined field type. */
      UNKNOWN = "UNKNOWN",
      /** Field is a system field managed by Wix. System fields can't be modified by calling the Update Extended Field method. */
      SYSTEM = "SYSTEM",
      /** Field is a custom field and can be modified by calling the Update Extended Field method. */
      USER_DEFINED = "USER_DEFINED"
  }
  /** Extended field filter options. */
  interface ListExtendedFieldsRequest {
      /** Filter for fields of the specified type. */
      fieldType?: FieldType;
      /**
       * Filter for fields in the specified namespace.
       * Fields created by calling the Find Or Create Extended Field method
       * are automatically assigned to the `custom` namespace.
       */
      namespace?: string | null;
      /** Filter for fields where `displayName` starts with the specified case-sensitive string. */
      startsWith?: string | null;
      /** Sorting options. */
      sort?: Sorting$2;
      /** Paging options. */
      paging?: Paging$2;
  }
  interface Sorting$2 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /**
       * Sort order.
       *
       * Default: `ASC`.
       */
      order?: SortOrder$2;
  }
  enum SortOrder$2 {
      /** Sort by ascending order. */
      ASC = "ASC",
      /** Sort by descending order. */
      DESC = "DESC"
  }
  interface Paging$2 {
      /**
       * Number of items to return.
       *
       * Defaults to `100`.
       */
      limit?: number | null;
      /**
       * Number of items to skip in the current sort order.
       *
       * Defaults to `0`.
       */
      offset?: number | null;
  }
  /** List of extended fields. */
  interface ListExtendedFieldsResponse {
      /** List of extended fields. */
      fields?: ExtendedField[];
      /** Metadata for the page of results. */
      metadata?: PagingMetadata$1;
  }
  interface PagingMetadata$1 {
      /** Number of items returned. */
      count?: number | null;
      /** Requested offset. */
      offset?: number | null;
      /** Number of items that matched the query. */
      total?: number | null;
      /**
       * Indicates if `total` calculation timed out before the response was sent.
       * Typically this happens if there is a large set of results.
       */
      tooManyToCount?: boolean | null;
  }
  /** Custom field to find or create. */
  interface FindOrCreateExtendedFieldRequest {
      /**
       * Display name to retrieve or create.
       *
       * If an existing custom field is an exact match
       * for the specified display name,
       * the existing field is returned.
       * If not, a new field is created and returned.
       */
      displayName: string;
      /**
       * Type of data the field holds.
       * Ignored if an existing field is an exact match
       * for the specified display name.
       */
      dataType?: FieldDataType;
  }
  /** Extended field that was found or created. */
  interface FindOrCreateExtendedFieldResponse {
      /** Extended field that was found or created. */
      field?: ExtendedField;
      /**
       * Indicates whether the extended field was just created or already existed.
       *
       * Returns `true` if the field was just created.
       */
      newField?: boolean;
  }
  interface GetExtendedFieldRequest {
      /**
       * Extended field key.
       *
       * When accessing contact data,
       * extended field values are available at `info.extendedFields.items[key]`.
       * For example, if the key is "custom.patronus",
       * the value can be accessed at `info.extendedFields.items["custom.patronus"]`.
       *
       * `key` is generated when the extended field is created.
       * It can't be modified, even if `displayName` is updated.
       */
      key: string;
  }
  /** The specified field. */
  interface GetExtendedFieldResponse {
      /** The specified field. */
      field?: ExtendedField;
  }
  interface GetExtendedFieldByLegacyIdRequest {
      /** Legacy ID of the extended field. */
      legacyId?: string;
  }
  interface GetExtendedFieldByLegacyIdResponse {
      /** The requested extended field. */
      field?: ExtendedField;
  }
  interface UpdateExtendedFieldRequest {
      /** Extended field to rename. */
      field?: ExtendedField;
  }
  /** Updated extended field. */
  interface UpdateExtendedFieldResponse {
      /** Renamed extended field. */
      field?: ExtendedField;
  }
  interface DeleteExtendedFieldRequest {
      /** Extended field key. */
      key: string;
  }
  interface DeleteExtendedFieldResponse {
  }
  interface PurgeRequest$1 {
      /** Instance ID of the site. */
      instanceId?: string;
  }
  interface PurgeResponse$1 {
      /** Number of items deleted. */
      deletedItems?: number;
  }
  interface GdprListRequest$1 {
      /** Instance ID of the site. */
      instanceId?: string;
  }
  interface GdprListResponse$1 {
      /** List of extended fields. */
      fields?: ExtendedField[];
  }
  interface QueryExtendedFieldsRequest {
      /** Query options. */
      query?: Query$1;
  }
  interface Query$1 {
      /**
       * ilter object.
       *
       * Possible filters: `$eq`, `$gt`, `$gte`, `$in`, `$lt`, `$lte`, `$ne`, `$startsWith`.
       *
       * For a detailed list of supported filters, see [sorting and filtering for extended fields](https://dev.wix.com/api/rest/contacts/extended-fields/sort-and-filter).
       *
       * Example: `{ "filter": {
       * "displayName": {
       * "$startsWith": "Referral"
       * }
       * }
       * }`
       */
      filter?: Record<string, any> | null;
      /**
       * Sorting options. Currently supports sorting on one field only.
       *
       * Example: `{ "sort": [{"fieldName": "displayName", "order": "DESC"}] }`
       */
      sort?: Sorting$2[];
      /** Pagination options. */
      paging?: Paging$2;
  }
  interface QueryExtendedFieldsResponse {
      /** List of extended fields. */
      fields?: ExtendedField[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadata$1;
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
   * Retrieves a list of extended fields.
   * @internal
   * @documentationMaturity preview
   * @permissionId CONTACTS_SCHEMA.VIEW
   * @adminMethod
   * @returns List of extended fields.
   */
  function listExtendedFields(options?: ListExtendedFieldsOptions): Promise<ListExtendedFieldsResponse>;
  interface ListExtendedFieldsOptions {
      /** Filter for fields of the specified type. */
      fieldType?: FieldType;
      /**
       * Filter for fields in the specified namespace.
       * Fields created by calling the Find Or Create Extended Field method
       * are automatically assigned to the `custom` namespace.
       */
      namespace?: string | null;
      /** Filter for fields where `displayName` starts with the specified case-sensitive string. */
      startsWith?: string | null;
      /** Sorting options. */
      sort?: Sorting$2;
      /** Paging options. */
      paging?: Paging$2;
  }
  /**
   * Retrieves a custom field with a specified name, or creates one if it doesn't exist.
   * The number of custom fields is limited to 100.
   *
   * Successful calls to this method always return a field,
   * which can be specified in subsequent calls.
   *
   * To find an existing custom field without potentially creating a new one, call Get Extended Field or
   * Query Extended Fields.
   * @param displayName - Display name to retrieve or create.
   *
   * If an existing custom field is an exact match
   * for the specified display name,
   * the existing field is returned.
   * If not, a new field is created and returned.
   * @param dataType - Type of data the field holds.
   * Ignored if an existing field is an exact match
   * for the specified display name.
   * @public
   * @documentationMaturity preview
   * @requiredField dataType
   * @requiredField displayName
   * @permissionId CONTACTS_SCHEMA.MODIFY
   * @adminMethod
   * @returns Extended field that was found or created.
   */
  function findOrCreateExtendedField(displayName: string, dataType: FieldDataType): Promise<FindOrCreateExtendedFieldResponse>;
  /**
   * Retrieves an extended field by the specified extended field key.
   * @public
   * @documentationMaturity preview
   * @requiredField key
   * @param key - null
   * @permissionId CONTACTS_SCHEMA.VIEW
   * @adminMethod
   * @returns The specified field.
   */
  function getExtendedField(key: string): Promise<ExtendedField>;
  /**
   * Renames an extended field.
   * @public
   * @documentationMaturity preview
   * @requiredField field
   * @requiredField field.displayName
   * @requiredField key
   * @param key - null
   * @param field - null
   * @permissionId CONTACTS_SCHEMA.MODIFY
   * @adminMethod
   * @returns Renamed extended field.
   */
  function renameExtendedField(key: string, field: RenameExtendedField): Promise<ExtendedField>;
  interface RenameExtendedField {
      /**
       * Extended field namespace.
       *
       * Extended fields created through by calling the Find Or Create Extended Field method
       * are automatically assigned to the `custom` namespace.
       * @readonly
       */
      namespace?: string | null;
      /** Display name shown in the contact list. */
      displayName?: string;
      /**
       * Type of data the field holds.
       * @readonly
       */
      dataType?: FieldDataType;
      /**
       * Indicates whether the extended field is a system field or custom field.
       * @readonly
       */
      fieldType?: FieldType;
      /**
       * Date and time the field was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the field was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Legacy Id of field. For internal use.
       * @internal
       * @readonly
       */
      legacyId?: string | null;
      /**
       * Field description, if the field is a system field.
       * @readonly
       */
      description?: string | null;
      /**
       * Wix search field name. For internal use.
       * @internal
       * @readonly
       */
      wixSearchColumn?: string | null;
      /**
       * Data Extensions Schema Field Id. Available only for v5 sites. For internal use.
       * @internal
       * @readonly
       */
      schemaFieldId?: string | null;
  }
  /**
   * Deletes an extended field.
   *
   * When an extended field is deleted,
   * any contact data stored in the field is also permanently deleted.
   * @param key - Extended field key.
   * @public
   * @documentationMaturity preview
   * @requiredField key
   * @permissionId CONTACTS_SCHEMA.MODIFY
   * @adminMethod
   */
  function deleteExtendedField(key: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of extended fields.
   *
   * The `queryExtendedFields()` method builds a query to retrieve a list of extended fields and returns an `FieldsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to run the query using the `find()` method.
   *
   * You can refine the query by chaining `FieldsQueryBuilder` methods onto the query. `FieldsQueryBuilder` methods enable you to filter, sort, and control the results that `queryExtendedFields()` returns.
   *
   * `queryExtendedFields()` runs with these `FieldsQueryBuilder` defaults, which you can override:
   * - `skip()`
   * - `limit(50)`
   * - `descending('_createdDate')`
   *
   * The following `FieldsQueryBuilder` methods are supported for `queryExtendedFields()`. For a full description of the `Extended Field` object, see the object returned for the `items` property in `FieldsQueryResult`.
   * @public
   * @documentationMaturity preview
   * @permissionId CONTACTS_SCHEMA.VIEW
   * @adminMethod
   */
  function queryExtendedFields(): FieldsQueryBuilder;
  interface QueryOffsetResult$1 {
      currentPage: number | undefined;
      totalPages: number | undefined;
      totalCount: number | undefined;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface FieldsQueryResult extends QueryOffsetResult$1 {
      items: ExtendedField[];
      query: FieldsQueryBuilder;
      next: () => Promise<FieldsQueryResult>;
      prev: () => Promise<FieldsQueryResult>;
  }
  interface FieldsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'namespace' | 'key' | 'displayName' | 'dataType' | 'fieldType' | '_createdDate' | '_updatedDate', value: any) => FieldsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'namespace' | 'key' | 'displayName' | 'dataType' | '_createdDate' | '_updatedDate', value: any) => FieldsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => FieldsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => FieldsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => FieldsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => FieldsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'displayName', value: string) => FieldsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'key' | 'displayName', value: any) => FieldsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'displayName' | '_createdDate' | '_updatedDate'>) => FieldsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'displayName' | '_createdDate' | '_updatedDate'>) => FieldsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => FieldsQueryBuilder;
      /** @param skip - Number of items to skip in the query results before returning the results.
       * @documentationMaturity preview
       */
      skip: (skip: number) => FieldsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<FieldsQueryResult>;
  }
  
  type contactsV4ExtendedField_universal_d_ExtendedField = ExtendedField;
  type contactsV4ExtendedField_universal_d_FieldDataType = FieldDataType;
  const contactsV4ExtendedField_universal_d_FieldDataType: typeof FieldDataType;
  type contactsV4ExtendedField_universal_d_FieldType = FieldType;
  const contactsV4ExtendedField_universal_d_FieldType: typeof FieldType;
  type contactsV4ExtendedField_universal_d_ListExtendedFieldsRequest = ListExtendedFieldsRequest;
  type contactsV4ExtendedField_universal_d_ListExtendedFieldsResponse = ListExtendedFieldsResponse;
  type contactsV4ExtendedField_universal_d_FindOrCreateExtendedFieldRequest = FindOrCreateExtendedFieldRequest;
  type contactsV4ExtendedField_universal_d_FindOrCreateExtendedFieldResponse = FindOrCreateExtendedFieldResponse;
  type contactsV4ExtendedField_universal_d_GetExtendedFieldRequest = GetExtendedFieldRequest;
  type contactsV4ExtendedField_universal_d_GetExtendedFieldResponse = GetExtendedFieldResponse;
  type contactsV4ExtendedField_universal_d_GetExtendedFieldByLegacyIdRequest = GetExtendedFieldByLegacyIdRequest;
  type contactsV4ExtendedField_universal_d_GetExtendedFieldByLegacyIdResponse = GetExtendedFieldByLegacyIdResponse;
  type contactsV4ExtendedField_universal_d_UpdateExtendedFieldRequest = UpdateExtendedFieldRequest;
  type contactsV4ExtendedField_universal_d_UpdateExtendedFieldResponse = UpdateExtendedFieldResponse;
  type contactsV4ExtendedField_universal_d_DeleteExtendedFieldRequest = DeleteExtendedFieldRequest;
  type contactsV4ExtendedField_universal_d_DeleteExtendedFieldResponse = DeleteExtendedFieldResponse;
  type contactsV4ExtendedField_universal_d_QueryExtendedFieldsRequest = QueryExtendedFieldsRequest;
  type contactsV4ExtendedField_universal_d_QueryExtendedFieldsResponse = QueryExtendedFieldsResponse;
  const contactsV4ExtendedField_universal_d_listExtendedFields: typeof listExtendedFields;
  type contactsV4ExtendedField_universal_d_ListExtendedFieldsOptions = ListExtendedFieldsOptions;
  const contactsV4ExtendedField_universal_d_findOrCreateExtendedField: typeof findOrCreateExtendedField;
  const contactsV4ExtendedField_universal_d_getExtendedField: typeof getExtendedField;
  const contactsV4ExtendedField_universal_d_renameExtendedField: typeof renameExtendedField;
  type contactsV4ExtendedField_universal_d_RenameExtendedField = RenameExtendedField;
  const contactsV4ExtendedField_universal_d_deleteExtendedField: typeof deleteExtendedField;
  const contactsV4ExtendedField_universal_d_queryExtendedFields: typeof queryExtendedFields;
  type contactsV4ExtendedField_universal_d_FieldsQueryResult = FieldsQueryResult;
  type contactsV4ExtendedField_universal_d_FieldsQueryBuilder = FieldsQueryBuilder;
  namespace contactsV4ExtendedField_universal_d {
    export {
      contactsV4ExtendedField_universal_d_ExtendedField as ExtendedField,
      contactsV4ExtendedField_universal_d_FieldDataType as FieldDataType,
      contactsV4ExtendedField_universal_d_FieldType as FieldType,
      contactsV4ExtendedField_universal_d_ListExtendedFieldsRequest as ListExtendedFieldsRequest,
      Sorting$2 as Sorting,
      SortOrder$2 as SortOrder,
      Paging$2 as Paging,
      contactsV4ExtendedField_universal_d_ListExtendedFieldsResponse as ListExtendedFieldsResponse,
      PagingMetadata$1 as PagingMetadata,
      contactsV4ExtendedField_universal_d_FindOrCreateExtendedFieldRequest as FindOrCreateExtendedFieldRequest,
      contactsV4ExtendedField_universal_d_FindOrCreateExtendedFieldResponse as FindOrCreateExtendedFieldResponse,
      contactsV4ExtendedField_universal_d_GetExtendedFieldRequest as GetExtendedFieldRequest,
      contactsV4ExtendedField_universal_d_GetExtendedFieldResponse as GetExtendedFieldResponse,
      contactsV4ExtendedField_universal_d_GetExtendedFieldByLegacyIdRequest as GetExtendedFieldByLegacyIdRequest,
      contactsV4ExtendedField_universal_d_GetExtendedFieldByLegacyIdResponse as GetExtendedFieldByLegacyIdResponse,
      contactsV4ExtendedField_universal_d_UpdateExtendedFieldRequest as UpdateExtendedFieldRequest,
      contactsV4ExtendedField_universal_d_UpdateExtendedFieldResponse as UpdateExtendedFieldResponse,
      contactsV4ExtendedField_universal_d_DeleteExtendedFieldRequest as DeleteExtendedFieldRequest,
      contactsV4ExtendedField_universal_d_DeleteExtendedFieldResponse as DeleteExtendedFieldResponse,
      PurgeRequest$1 as PurgeRequest,
      PurgeResponse$1 as PurgeResponse,
      GdprListRequest$1 as GdprListRequest,
      GdprListResponse$1 as GdprListResponse,
      contactsV4ExtendedField_universal_d_QueryExtendedFieldsRequest as QueryExtendedFieldsRequest,
      Query$1 as Query,
      contactsV4ExtendedField_universal_d_QueryExtendedFieldsResponse as QueryExtendedFieldsResponse,
      DomainEvent$2 as DomainEvent,
      DomainEventBodyOneOf$2 as DomainEventBodyOneOf,
      EntityCreatedEvent$2 as EntityCreatedEvent,
      RestoreInfo$2 as RestoreInfo,
      EntityUpdatedEvent$2 as EntityUpdatedEvent,
      EntityDeletedEvent$2 as EntityDeletedEvent,
      ActionEvent$2 as ActionEvent,
      MessageEnvelope$3 as MessageEnvelope,
      IdentificationData$3 as IdentificationData,
      IdentificationDataIdOneOf$3 as IdentificationDataIdOneOf,
      WebhookIdentityType$3 as WebhookIdentityType,
      contactsV4ExtendedField_universal_d_listExtendedFields as listExtendedFields,
      contactsV4ExtendedField_universal_d_ListExtendedFieldsOptions as ListExtendedFieldsOptions,
      contactsV4ExtendedField_universal_d_findOrCreateExtendedField as findOrCreateExtendedField,
      contactsV4ExtendedField_universal_d_getExtendedField as getExtendedField,
      contactsV4ExtendedField_universal_d_renameExtendedField as renameExtendedField,
      contactsV4ExtendedField_universal_d_RenameExtendedField as RenameExtendedField,
      contactsV4ExtendedField_universal_d_deleteExtendedField as deleteExtendedField,
      contactsV4ExtendedField_universal_d_queryExtendedFields as queryExtendedFields,
      contactsV4ExtendedField_universal_d_FieldsQueryResult as FieldsQueryResult,
      contactsV4ExtendedField_universal_d_FieldsQueryBuilder as FieldsQueryBuilder,
    };
  }
  
  /** Label that was found or created. */
  interface ContactLabel {
      /**
       * Label namespace.
       *
       * Labels created by calling the Find Or Create Label method
       * are automatically assigned to the `custom` namespace.
       * @readonly
       */
      namespace?: string | null;
      /**
       * Display name for the namespace,
       * used to organize the list of labels in the site dashboard.
       * @readonly
       */
      namespaceDisplayName?: string | null;
      /**
       * Label key.
       *
       * `key` is generated when the label is created.
       * It can't be modified, even if `displayName` is updated.
       * @readonly
       */
      key?: string;
      /** Label display name shown in the dashboard. */
      displayName?: string;
      /**
       * Label type indicating how the label was created.
       * @readonly
       */
      labelType?: LabelType;
      /**
       * Date and time the label was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the label was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Legacy ID of label. For internal use only.
       * @internal
       * @readonly
       */
      legacyId?: string | null;
      /**
       * ID of the parallel contacts-v5 tag. For internal use only.
       * @internal
       * @readonly
       */
      tagId?: string | null;
  }
  enum LabelType {
      /** Fetch all labels. */
      UNKNOWN = "UNKNOWN",
      /** Default system label for the contact list. */
      SYSTEM = "SYSTEM",
      /** Label created by calling the Find Or Create Label method. */
      USER_DEFINED = "USER_DEFINED",
      /** Label created by an app built by Wix. */
      WIX_APP_DEFINED = "WIX_APP_DEFINED"
  }
  /** Label filter options. */
  interface ListLabelsRequest {
      /** Filter for labels of the specified type. */
      labelType?: LabelType;
      /** Filter for labels in the specified namespace. */
      namespace?: string | null;
      /** Filter for labels where `displayName` starts with the specified case-sensitive string. */
      startsWith?: string | null;
      /** Sorting options. */
      sort?: Sorting$1;
      /** Paging options. */
      paging?: Paging$1;
      language?: string | null;
  }
  interface Sorting$1 {
      /** Name of the field to sort by. */
      fieldName?: string;
      /**
       * Sort order.
       *
       * Default: `ASC`.
       */
      order?: SortOrder$1;
  }
  enum SortOrder$1 {
      /** Sort by ascending order. */
      ASC = "ASC",
      /** Sort by descending order. */
      DESC = "DESC"
  }
  interface Paging$1 {
      /**
       * Number of items to return.
       *
       * Defaults to `1000`. <br>
       * Maximum: `2000`.
       */
      limit?: number | null;
      /** Number of items to skip in the current sort order. */
      offset?: number | null;
  }
  /** List of labels. */
  interface ListLabelsResponse {
      /** List of labels. */
      labels?: ContactLabel[];
      /** Metadata for the page of results. */
      metadata?: PagingMetadata;
  }
  interface PagingMetadata {
      /** Number of items returned. */
      count?: number | null;
      /** Requested offset. */
      offset?: number | null;
      /** Number of items that matched the query. */
      total?: number | null;
      /**
       * Indicates if `total` calculation timed out before the response was sent.
       * Typically this happens if there is a large set of results.
       */
      tooManyToCount?: boolean | null;
  }
  /** Label to find or create. */
  interface FindOrCreateLabelRequest {
      /**
       * Display name to retrieve or create.
       *
       * If an existing label is an exact match
       * for the specified display name,
       * the existing label is returned.
       * If not, a new label is created and returned.
       */
      displayName: string;
      /**
       * Label namespace.
       * Labels created by calling the Find Or Create Label method
       * are automatically assigned to the `custom` namespace.
       *
       * This field is read-only and is ignored when creating a label.
       * @internal
       */
      namespace?: string | null;
      /**
       * Label type.
       *
       * - `SYSTEM`: The label is a default system label for the Contact List.
       * - `USER_DEFINED`: The label was created by a site contributor or 3rd-party app.
       * - `WIX_APP_DEFINED`: The label was created by a Wix app.
       *
       * This field is read-only and will be ignored when creating a label.
       * @internal
       */
      labelType?: LabelType;
      /**
       * Language for localization.
       * 2-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) format.
       */
      language?: string | null;
  }
  /** Label that was found or created. */
  interface FindOrCreateLabelResponse {
      /** Label that was found or created. */
      label?: ContactLabel;
      /**
       * Indicates whether the label was just created or already existed.
       *
       * Returns `true` if the label was just created.
       */
      newLabel?: boolean;
  }
  interface LabelsQuotaReached {
      /** The maximum number of labels allowed for the site. */
      labelsQuota?: string | null;
      /** The current total number of labels on the site. */
      labelsCurrentTotal?: string | null;
  }
  interface ListLabelNamespacesRequest {
      /** Language for localization */
      language?: string | null;
  }
  interface ListLabelNamespacesResponse {
      /** List of namespaces */
      namespaces?: ContactLabelNamespace[];
  }
  interface ContactLabelNamespace {
      /**
       * Namespace key
       * @readonly
       */
      key?: string;
      /**
       * Namespace display name
       * @readonly
       */
      displayName?: string | null;
  }
  interface GetLabelRequest {
      /**
       * Label key.
       *
       * `key` is generated when the label is created.
       * It can't be modified, even if `displayName` is updated.
       */
      key: string;
      /**
       * Language for localization.
       * 2-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) format.
       */
      language?: string | null;
  }
  /** The specified label. */
  interface GetLabelResponse {
      /** The specified label. */
      label?: ContactLabel;
  }
  interface GetLabelByLegacyIdRequest {
      /** Legacy id of the label */
      legacyId?: string;
      /** Language for localization */
      language?: string | null;
  }
  interface GetLabelByLegacyIdResponse {
      /** Requested label */
      label?: ContactLabel;
  }
  interface UpdateLabelRequest {
      /** Label to rename. */
      label?: ContactLabel;
      /**
       * Language for localization.
       * 2-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) format.
       */
      language?: string | null;
  }
  /** Updated label. */
  interface UpdateLabelResponse {
      /** Renamed label. */
      label?: ContactLabel;
  }
  interface DeleteLabelRequest {
      /** Label key to delete. */
      key: string;
  }
  interface DeleteLabelResponse {
  }
  interface PurgeRequest {
      /** Contacts Instance ID of the site. */
      instanceId?: string;
      /** Labels to exclude from the purge. */
      exludingLabelKeys?: string[];
  }
  interface PurgeResponse {
      /** Number of deleted items */
      deletedItems?: number;
  }
  interface GdprListRequest {
      /** Contacts Instance ID of the site. */
      instanceId?: string;
  }
  interface GdprListResponse {
      /** List of labels */
      labels?: ContactLabel[];
  }
  interface QueryLabelsRequest {
      /** Query options. */
      query?: Query;
      /**
       * Language for localization.
       * 2-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) format.
       */
      language?: string | null;
  }
  interface Query {
      /**
       * ilter object.
       *
       * Possible filters: `$eq`, `$gt`, `$gte`, `$in`, `$lt`, `$lte`, `$ne`, `$startsWith`.
       *
       * For a detailed list of supported filters, see [sorting and filtering for labels](https://dev.wix.com/api/rest/contacts/labels/sort-and-filter).
       *
       * Example: `{ "filter": {
       * "displayName": {
       * "$startsWith": "Referral"
       * }
       * }
       * }`
       */
      filter?: Record<string, any> | null;
      /**
       * Sorting options. For a list of fields that can be sorted, see [sorting and filtering for labels](https://dev.wix.com/api/rest/contacts/labels/sort-and-filter).
       *
       * Example: `{ "sort": [{"fieldName": "displayName", "order": "DESC"}] }`
       */
      sort?: Sorting$1[];
      /** Pagination options. */
      paging?: Paging$1;
  }
  interface QueryLabelsResponse {
      /** List of labels */
      labels?: ContactLabel[];
      /** Details on the paged set of results returned. */
      pagingMetadata?: PagingMetadata;
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
   * Lists all contact labels for a site.
   * @internal
   * @documentationMaturity preview
   * @permissionId CONTACTS_LABELS.VIEW
   * @adminMethod
   * @returns List of labels.
   */
  function listLabels(options?: ListLabelsOptions): Promise<ListLabelsResponse>;
  interface ListLabelsOptions {
      /** Filter for labels of the specified type. */
      labelType?: LabelType;
      /** Filter for labels in the specified namespace. */
      namespace?: string | null;
      /** Filter for labels where `displayName` starts with the specified case-sensitive string. */
      startsWith?: string | null;
      /** Sorting options. */
      sort?: Sorting$1;
      /** Paging options. */
      paging?: Paging$1;
      language?: string | null;
  }
  /**
   * Retrieves a label with a specified name, or creates one if it doesn't exist.
   *
   * Successful calls to this method always return a label,
   * which can be specified in subsequent calls.
   *
   * For example, in the Contacts API, Label Contact and Unlabel Contact
   * calls will fail if you include a non-existant label.
   * To ensure successful calls, you can call this method first,
   * and then use the response in the Label Contact and Unlabel Contact calls.
   *
   * To find an existing label without potentially creating a new one, call
   * Get Label or Query Labels.
   * @param displayName - Display name to retrieve or create.
   *
   * If an existing label is an exact match
   * for the specified display name,
   * the existing label is returned.
   * If not, a new label is created and returned.
   * @public
   * @documentationMaturity preview
   * @requiredField displayName
   * @param options - Language options.
   * @permissionId CONTACTS_LABELS.MODIFY
   * @adminMethod
   * @returns Label that was found or created.
   */
  function findOrCreateLabel(displayName: string, options?: FindOrCreateLabelOptions): Promise<FindOrCreateLabelResponse>;
  interface FindOrCreateLabelOptions {
      /**
       * Label namespace.
       * Labels created by calling the Find Or Create Label method
       * are automatically assigned to the `custom` namespace.
       *
       * This field is read-only and is ignored when creating a label.
       * @internal
       */
      namespace?: string | null;
      /**
       * Label type.
       *
       * - `SYSTEM`: The label is a default system label for the Contact List.
       * - `USER_DEFINED`: The label was created by a site contributor or 3rd-party app.
       * - `WIX_APP_DEFINED`: The label was created by a Wix app.
       *
       * This field is read-only and will be ignored when creating a label.
       * @internal
       */
      labelType?: LabelType;
      /**
       * Language for localization.
       * 2-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) format.
       */
      language?: string | null;
  }
  /**
   * Lists Namespaces.
   * @internal
   * @documentationMaturity preview
   * @permissionId CONTACTS_LABELS.VIEW
   * @adminMethod
   */
  function listLabelNamespaces(options?: ListLabelNamespacesOptions): Promise<ListLabelNamespacesResponse>;
  interface ListLabelNamespacesOptions {
      /** Language for localization */
      language?: string | null;
  }
  /**
   * Retrieves a label by the specified label key.
   * @param key - Label key.
   *
   * `key` is generated when the label is created.
   * It can't be modified, even if `displayName` is updated.
   * @public
   * @documentationMaturity preview
   * @requiredField key
   * @param options - Language options.
   * @permissionId CONTACTS_LABELS.VIEW
   * @adminMethod
   * @returns The specified label.
   */
  function getLabel(key: string, options?: GetLabelOptions): Promise<ContactLabel>;
  interface GetLabelOptions {
      /**
       * Language for localization.
       * 2-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) format.
       */
      language?: string | null;
  }
  /**
   * Renames a label.
   * @param key - Label key.
   *
   * `key` is generated when the label is created.
   * It can't be modified, even if `displayName` is updated.
   * @public
   * @documentationMaturity preview
   * @requiredField key
   * @requiredField label
   * @requiredField label.displayName
   * @param options - Language options.
   * @param label - Label to rename.
   * @permissionId CONTACTS_LABELS.MODIFY
   * @adminMethod
   * @returns Renamed label.
   */
  function renameLabel(key: string, label: RenameLabel, options?: RenameLabelOptions): Promise<ContactLabel>;
  interface RenameLabel {
      /**
       * Label namespace.
       *
       * Labels created by calling the Find Or Create Label method
       * are automatically assigned to the `custom` namespace.
       * @readonly
       */
      namespace?: string | null;
      /**
       * Display name for the namespace,
       * used to organize the list of labels in the site dashboard.
       * @readonly
       */
      namespaceDisplayName?: string | null;
      /** Label display name shown in the dashboard. */
      displayName?: string;
      /**
       * Label type indicating how the label was created.
       * @readonly
       */
      labelType?: LabelType;
      /**
       * Date and time the label was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the label was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /**
       * Legacy ID of label. For internal use only.
       * @internal
       * @readonly
       */
      legacyId?: string | null;
      /**
       * ID of the parallel contacts-v5 tag. For internal use only.
       * @internal
       * @readonly
       */
      tagId?: string | null;
  }
  interface RenameLabelOptions {
      /**
       * Language for localization.
       * 2-letter language code in [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) format.
       */
      language?: string | null;
  }
  /**
   * Deletes the specified label from a site and removes it from the contacts it applies to.
   * @param key - Label key to delete.
   * @public
   * @documentationMaturity preview
   * @requiredField key
   * @permissionId CONTACTS_LABELS.MODIFY
   * @adminMethod
   */
  function deleteLabel(key: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of labels.
   *
   * The `queryLabels()` method builds a query to retrieve a list of labels and returns a `LabelsQueryBuilder` object.
   *
   * The returned object contains the query definition, which is used to call the query using the `find()` method.
   *
   * You can refine the query by chaining `LabelsQueryBuilder` methods onto the query. `LabelsQueryBuilder` methods enable you to filter, sort, and control the response that `queryLabels()` returns.
   *
   * `queryLabels()` is called with the following `LabelsQueryBuilder` defaults, which you can override:
   * - `skip(0)`
   * - `limit(50)`
   * - `descending('_createdDate')`
   *
   * The following `LabelsQueryBuilder` methods are supported for `queryLabels()`. For a full description of the `Labels` object, see the object returned for the `items` field in `LabelsQueryResult`.
   *
   *
   * @public
   * @documentationMaturity preview
   * @param options - Language options.
   * @permissionId CONTACTS_LABELS.VIEW
   * @adminMethod
   */
  function queryLabels(options?: QueryLabelsOptions): LabelsQueryBuilder;
  interface QueryLabelsOptions {
      /**
       * Language for localization.
       *
       * 2-letter language code in
       * [ISO 639-1 alpha-2](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) format.
       */
      language?: string | null | undefined;
  }
  interface QueryOffsetResult {
      currentPage: number | undefined;
      totalPages: number | undefined;
      totalCount: number | undefined;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface LabelsQueryResult extends QueryOffsetResult {
      items: ContactLabel[];
      query: LabelsQueryBuilder;
      next: () => Promise<LabelsQueryResult>;
      prev: () => Promise<LabelsQueryResult>;
  }
  interface LabelsQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      eq: (propertyName: 'namespace' | 'key' | 'displayName' | 'labelType' | '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ne: (propertyName: 'namespace' | 'key' | 'displayName' | '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      ge: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      gt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      le: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       * @documentationMaturity preview
       */
      lt: (propertyName: '_createdDate' | '_updatedDate', value: any) => LabelsQueryBuilder;
      /** @param propertyName - Property whose value is compared with `string`.
       * @param string - String to compare against. Case-insensitive.
       * @documentationMaturity preview
       */
      startsWith: (propertyName: 'displayName', value: string) => LabelsQueryBuilder;
      /** @documentationMaturity preview */
      in: (propertyName: 'key' | 'displayName', value: any) => LabelsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      ascending: (...propertyNames: Array<'displayName' | '_createdDate' | '_updatedDate'>) => LabelsQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments.
       * @documentationMaturity preview
       */
      descending: (...propertyNames: Array<'displayName' | '_createdDate' | '_updatedDate'>) => LabelsQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object.
       * @documentationMaturity preview
       */
      limit: (limit: number) => LabelsQueryBuilder;
      /** @param skip - Number of items to skip in the query results before returning the results.
       * @documentationMaturity preview
       */
      skip: (skip: number) => LabelsQueryBuilder;
      /** @documentationMaturity preview */
      find: () => Promise<LabelsQueryResult>;
  }
  
  type contactsV4Label_universal_d_ContactLabel = ContactLabel;
  type contactsV4Label_universal_d_LabelType = LabelType;
  const contactsV4Label_universal_d_LabelType: typeof LabelType;
  type contactsV4Label_universal_d_ListLabelsRequest = ListLabelsRequest;
  type contactsV4Label_universal_d_ListLabelsResponse = ListLabelsResponse;
  type contactsV4Label_universal_d_PagingMetadata = PagingMetadata;
  type contactsV4Label_universal_d_FindOrCreateLabelRequest = FindOrCreateLabelRequest;
  type contactsV4Label_universal_d_FindOrCreateLabelResponse = FindOrCreateLabelResponse;
  type contactsV4Label_universal_d_LabelsQuotaReached = LabelsQuotaReached;
  type contactsV4Label_universal_d_ListLabelNamespacesRequest = ListLabelNamespacesRequest;
  type contactsV4Label_universal_d_ListLabelNamespacesResponse = ListLabelNamespacesResponse;
  type contactsV4Label_universal_d_ContactLabelNamespace = ContactLabelNamespace;
  type contactsV4Label_universal_d_GetLabelRequest = GetLabelRequest;
  type contactsV4Label_universal_d_GetLabelResponse = GetLabelResponse;
  type contactsV4Label_universal_d_GetLabelByLegacyIdRequest = GetLabelByLegacyIdRequest;
  type contactsV4Label_universal_d_GetLabelByLegacyIdResponse = GetLabelByLegacyIdResponse;
  type contactsV4Label_universal_d_UpdateLabelRequest = UpdateLabelRequest;
  type contactsV4Label_universal_d_UpdateLabelResponse = UpdateLabelResponse;
  type contactsV4Label_universal_d_DeleteLabelRequest = DeleteLabelRequest;
  type contactsV4Label_universal_d_DeleteLabelResponse = DeleteLabelResponse;
  type contactsV4Label_universal_d_PurgeRequest = PurgeRequest;
  type contactsV4Label_universal_d_PurgeResponse = PurgeResponse;
  type contactsV4Label_universal_d_GdprListRequest = GdprListRequest;
  type contactsV4Label_universal_d_GdprListResponse = GdprListResponse;
  type contactsV4Label_universal_d_QueryLabelsRequest = QueryLabelsRequest;
  type contactsV4Label_universal_d_Query = Query;
  type contactsV4Label_universal_d_QueryLabelsResponse = QueryLabelsResponse;
  const contactsV4Label_universal_d_listLabels: typeof listLabels;
  type contactsV4Label_universal_d_ListLabelsOptions = ListLabelsOptions;
  const contactsV4Label_universal_d_findOrCreateLabel: typeof findOrCreateLabel;
  type contactsV4Label_universal_d_FindOrCreateLabelOptions = FindOrCreateLabelOptions;
  const contactsV4Label_universal_d_listLabelNamespaces: typeof listLabelNamespaces;
  type contactsV4Label_universal_d_ListLabelNamespacesOptions = ListLabelNamespacesOptions;
  const contactsV4Label_universal_d_getLabel: typeof getLabel;
  type contactsV4Label_universal_d_GetLabelOptions = GetLabelOptions;
  const contactsV4Label_universal_d_renameLabel: typeof renameLabel;
  type contactsV4Label_universal_d_RenameLabel = RenameLabel;
  type contactsV4Label_universal_d_RenameLabelOptions = RenameLabelOptions;
  const contactsV4Label_universal_d_deleteLabel: typeof deleteLabel;
  const contactsV4Label_universal_d_queryLabels: typeof queryLabels;
  type contactsV4Label_universal_d_QueryLabelsOptions = QueryLabelsOptions;
  type contactsV4Label_universal_d_LabelsQueryResult = LabelsQueryResult;
  type contactsV4Label_universal_d_LabelsQueryBuilder = LabelsQueryBuilder;
  namespace contactsV4Label_universal_d {
    export {
      contactsV4Label_universal_d_ContactLabel as ContactLabel,
      contactsV4Label_universal_d_LabelType as LabelType,
      contactsV4Label_universal_d_ListLabelsRequest as ListLabelsRequest,
      Sorting$1 as Sorting,
      SortOrder$1 as SortOrder,
      Paging$1 as Paging,
      contactsV4Label_universal_d_ListLabelsResponse as ListLabelsResponse,
      contactsV4Label_universal_d_PagingMetadata as PagingMetadata,
      contactsV4Label_universal_d_FindOrCreateLabelRequest as FindOrCreateLabelRequest,
      contactsV4Label_universal_d_FindOrCreateLabelResponse as FindOrCreateLabelResponse,
      contactsV4Label_universal_d_LabelsQuotaReached as LabelsQuotaReached,
      contactsV4Label_universal_d_ListLabelNamespacesRequest as ListLabelNamespacesRequest,
      contactsV4Label_universal_d_ListLabelNamespacesResponse as ListLabelNamespacesResponse,
      contactsV4Label_universal_d_ContactLabelNamespace as ContactLabelNamespace,
      contactsV4Label_universal_d_GetLabelRequest as GetLabelRequest,
      contactsV4Label_universal_d_GetLabelResponse as GetLabelResponse,
      contactsV4Label_universal_d_GetLabelByLegacyIdRequest as GetLabelByLegacyIdRequest,
      contactsV4Label_universal_d_GetLabelByLegacyIdResponse as GetLabelByLegacyIdResponse,
      contactsV4Label_universal_d_UpdateLabelRequest as UpdateLabelRequest,
      contactsV4Label_universal_d_UpdateLabelResponse as UpdateLabelResponse,
      contactsV4Label_universal_d_DeleteLabelRequest as DeleteLabelRequest,
      contactsV4Label_universal_d_DeleteLabelResponse as DeleteLabelResponse,
      contactsV4Label_universal_d_PurgeRequest as PurgeRequest,
      contactsV4Label_universal_d_PurgeResponse as PurgeResponse,
      contactsV4Label_universal_d_GdprListRequest as GdprListRequest,
      contactsV4Label_universal_d_GdprListResponse as GdprListResponse,
      contactsV4Label_universal_d_QueryLabelsRequest as QueryLabelsRequest,
      contactsV4Label_universal_d_Query as Query,
      contactsV4Label_universal_d_QueryLabelsResponse as QueryLabelsResponse,
      DomainEvent$1 as DomainEvent,
      DomainEventBodyOneOf$1 as DomainEventBodyOneOf,
      EntityCreatedEvent$1 as EntityCreatedEvent,
      RestoreInfo$1 as RestoreInfo,
      EntityUpdatedEvent$1 as EntityUpdatedEvent,
      EntityDeletedEvent$1 as EntityDeletedEvent,
      ActionEvent$1 as ActionEvent,
      MessageEnvelope$2 as MessageEnvelope,
      IdentificationData$2 as IdentificationData,
      IdentificationDataIdOneOf$2 as IdentificationDataIdOneOf,
      WebhookIdentityType$2 as WebhookIdentityType,
      contactsV4Label_universal_d_listLabels as listLabels,
      contactsV4Label_universal_d_ListLabelsOptions as ListLabelsOptions,
      contactsV4Label_universal_d_findOrCreateLabel as findOrCreateLabel,
      contactsV4Label_universal_d_FindOrCreateLabelOptions as FindOrCreateLabelOptions,
      contactsV4Label_universal_d_listLabelNamespaces as listLabelNamespaces,
      contactsV4Label_universal_d_ListLabelNamespacesOptions as ListLabelNamespacesOptions,
      contactsV4Label_universal_d_getLabel as getLabel,
      contactsV4Label_universal_d_GetLabelOptions as GetLabelOptions,
      contactsV4Label_universal_d_renameLabel as renameLabel,
      contactsV4Label_universal_d_RenameLabel as RenameLabel,
      contactsV4Label_universal_d_RenameLabelOptions as RenameLabelOptions,
      contactsV4Label_universal_d_deleteLabel as deleteLabel,
      contactsV4Label_universal_d_queryLabels as queryLabels,
      contactsV4Label_universal_d_QueryLabelsOptions as QueryLabelsOptions,
      contactsV4Label_universal_d_LabelsQueryResult as LabelsQueryResult,
      contactsV4Label_universal_d_LabelsQueryBuilder as LabelsQueryBuilder,
    };
  }
  
  /** Dummy message for fqdn validation */
  interface SubmitContact {
      /** Submit Contact Id */
      _id?: string | null;
  }
  interface SubmitContactRequest {
      /**
       * Contact's information.
       * To reconcile with an existing contact,
       * a phone or email must be provided,
       * or the current session identity must be attached to a contact or member.
       *
       * If no existing contact can be found,
       * a new contact is created with the specified information.
       *
       * <!--ONLY:REST-->
       * Required if there's no contextual identity or given `contactId`.
       * <!--END:ONLY:REST-->
       */
      info?: ContactInfo$1;
      /**
       * The activity that triggered this request (optional).
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       * @internal
       */
      activity?: ContactActivity;
      /** Pass through data, to be posted on Contact Submitted Domain Event (optional). */
      passThroughData?: string | null;
      /**
       * Existing Contact ID (optional).
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       */
      contactId?: string | null;
      /**
       * Additional submit options
       * @internal
       */
      options?: SubmitContactOptions;
  }
  interface ContactInfo$1 {
      /** Contact's first and last name. */
      name?: ContactName;
      /** Contact's email addresses. */
      emails?: ContactEmailsWrapper;
      /** Contact's phone numbers. */
      phones?: ContactPhonesWrapper;
      /** Contact's street addresses. */
      addresses?: ContactAddressesWrapper;
      /** Contact's company name. */
      company?: string | null;
      /** Contact's job title. */
      jobTitle?: string | null;
      /** Birth date in `YYYY-MM-DD` format. For example, `2020-03-15`. */
      birthdate?: string | null;
      /**
       * Site contributors
       * who are assigned to manage communication with the contact.
       * @internal
       */
      assignedUserIds?: AssigneesWrapper;
      /**
       * Locale in
       * [IETF BCP 47 language tag](https://en.wikipedia.org/wiki/IETF_language_tag) format.
       * Typically, this is a lowercase 2-letter language code,
       * followed by a hyphen, followed by an uppercase 2-letter country code.
       * For example, `en-US` for U.S. English, and `de-DE` for Germany German.
       */
      locale?: string | null;
      /**
       * List of contact's labels.
       *
       * Labels are used to organize contacts. Labels can be
       * added and removed using Label Contact and Unlabel Contact, respectively.
       *
       * To view or manage contact labels, use the Labels API.
       */
      labelKeys?: LabelsWrapper;
      /**
       * Additional custom fields.
       *
       * Empty fields are not returned.
       */
      extendedFields?: ExtendedFieldsWrapper;
      /**
       * Contact locations.
       * @internal
       */
      locations?: LocationsWrapper;
      /** Contact's profile picture. */
      picture?: ContactPicture;
  }
  interface ContactName {
      /** Contact's first name. */
      first?: string | null;
      /** Contact's last name. */
      last?: string | null;
  }
  interface ContactEmailsWrapper {
      /** List of up to 50 email addresses. */
      items?: ContactEmail[];
  }
  interface ContactEmail {
      /**
       * Email ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Email type.
       *
       * `UNTAGGED` is shown as "Other" in the Contact List.
       */
      tag?: EmailTag;
      /** Email address. */
      email?: string;
      /**
       * Indicates whether this is the contact's primary email address.
       * When changing `primary` to `true` for an email,
       * the contact's other emails become `false`.
       * Changing the primary email of a contact also affects the subscription status to marketing emails that are decided based on the primary email.
       */
      primary?: boolean | null;
  }
  enum EmailTag {
      UNTAGGED = "UNTAGGED",
      MAIN = "MAIN",
      HOME = "HOME",
      WORK = "WORK"
  }
  interface ContactPhonesWrapper {
      /** List of up to 50 phone numbers. */
      items?: ContactPhone[];
  }
  interface ContactPhone {
      /**
       * Phone ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Phone type.
       *
       * `UNTAGGED` is shown as "Other" in the Contact List.
       */
      tag?: PhoneTag;
      /** [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. */
      countryCode?: string | null;
      /** Phone number. */
      phone?: string;
      /**
       * [ITU E.164-formatted](https://www.itu.int/rec/T-REC-E.164/)
       * phone number.
       * Automatically generated using `phone` and `countryCode`, pending both values are valid.
       * @readonly
       */
      e164Phone?: string | null;
      /**
       * Formatted phone. Automatically generated using phone and countryCode.
       * @internal
       * @readonly
       */
      formattedPhone?: string | null;
      /**
       * Indicates whether this is the contact's primary phone number.
       * When changing `primary` to `true` for a phone,
       * the contact's `primary` field for other phones becomes `false`.
       * Changing the primary phone number also affects the subscription status to SMS messages that are decided based on the primary phone.
       */
      primary?: boolean | null;
  }
  enum PhoneTag {
      UNTAGGED = "UNTAGGED",
      MAIN = "MAIN",
      HOME = "HOME",
      MOBILE = "MOBILE",
      WORK = "WORK",
      FAX = "FAX"
  }
  interface ContactAddressesWrapper {
      /** List of up to 50 addresses. */
      items?: ContactAddress[];
  }
  interface ContactAddress {
      /**
       * Street address ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Address type.
       * `UNTAGGED` is shown as "Other" in the Contact List.
       */
      tag?: AddressTag;
      /** Street address. */
      address?: Address;
  }
  enum AddressTag {
      UNTAGGED = "UNTAGGED",
      HOME = "HOME",
      WORK = "WORK",
      BILLING = "BILLING",
      SHIPPING = "SHIPPING"
  }
  /** Physical address */
  interface Address extends AddressStreetOneOf {
      /** Street address object, with number and name in separate fields. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number, as free text. */
      addressLine1?: string | null;
      /**
       * 2-letter country code in an
       * [ISO-3166 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) format.
       */
      country?: string | null;
      /**
       * Code for a subdivision (such as state, prefecture, or province) in an
       * [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) format.
       */
      subdivision?: string | null;
      /** City name. */
      city?: string | null;
      /** Postal or zip code. */
      postalCode?: string | null;
      /**
       * Free text providing more detailed address information,
       * such as apartment, suite, or floor.
       */
      addressLine2?: string | null;
      /**
       * Human-readable address string.
       * If not provided, the value is generated from the available address data.
       * @internal
       */
      formatted?: string | null;
      /**
       * Coordinates of the physical address.
       * @internal
       */
      location?: AddressLocation;
  }
  /** @oneof */
  interface AddressStreetOneOf {
      /** Street address object, with number and name in separate fields. */
      streetAddress?: StreetAddress;
      /** Main address line, usually street and number, as free text. */
      addressLine?: string | null;
  }
  interface StreetAddress {
      /** Street number. */
      number?: string;
      /** Street name. */
      name?: string;
      /**
       * Apartment number.
       * @internal
       */
      apt?: string;
      /**
       * Optional address line 1
       * @internal
       */
      formattedAddressLine?: string | null;
  }
  interface AddressLocation {
      /** Address's latitude. */
      latitude?: number | null;
      /** Address's longitude. */
      longitude?: number | null;
  }
  interface Subdivision {
      /** subdivision short code */
      code?: string;
      /** Full subdivision name. */
      name?: string;
      /** @internal */
      type?: SubdivisionType;
      /**
       * Free text that describes the subdivision type.
       *
       * Examples: `"state"`, `"province"`, `"prefecture"`.
       * @internal
       */
      typeInfo?: string | null;
  }
  enum SubdivisionType {
      UNKNOWN_SUBDIVISION_TYPE = "UNKNOWN_SUBDIVISION_TYPE",
      /** State */
      ADMINISTRATIVE_AREA_LEVEL_1 = "ADMINISTRATIVE_AREA_LEVEL_1",
      /** County */
      ADMINISTRATIVE_AREA_LEVEL_2 = "ADMINISTRATIVE_AREA_LEVEL_2",
      /** City/town */
      ADMINISTRATIVE_AREA_LEVEL_3 = "ADMINISTRATIVE_AREA_LEVEL_3",
      /** Neighborhood/quarter */
      ADMINISTRATIVE_AREA_LEVEL_4 = "ADMINISTRATIVE_AREA_LEVEL_4",
      /** Street/block */
      ADMINISTRATIVE_AREA_LEVEL_5 = "ADMINISTRATIVE_AREA_LEVEL_5",
      /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
      COUNTRY = "COUNTRY"
  }
  interface AssigneesWrapper {
      /** List of site contributor user IDs. */
      items?: string[];
  }
  interface LabelsWrapper {
      /**
       * List of contact label keys.
       *
       * Contact labels help categorize contacts. Label keys must exist to be added to the contact.
       * Contact labels can be created or retrieved with Find or Create Label or List Labels.
       */
      items?: string[];
  }
  interface ExtendedFieldsWrapper {
      /**
       * Contact's extended fields,
       * where each key is the field key,
       * and each value is the field's value for the contact.
       *
       * To view and manage extended fields, use the Extended Fields API.
       */
      items?: Record<string, any>;
  }
  interface LocationsWrapper {
      /** List of location ids. */
      items?: string[];
  }
  /** TEST contact picture description */
  interface ContactPicture {
      /**
       * Image.
       * This can contain an image URL or a Wix Media image ID.
       */
      image?: string;
      /**
       * Indicates whether the image is retrieved from Wix Media
       * or an external provider.
       *
       * - `EXTERNAL`: The image is retrieved from an external provider.
       * - `WIX_MEDIA`: The image is retrieved from Wix Media.
       * @internal
       * @deprecated
       */
      imageProvider?: ImageProvider;
  }
  enum ImageProvider {
      UNKNOWN = "UNKNOWN",
      /** Image stored outside Wix */
      EXTERNAL = "EXTERNAL",
      /** Stored in wix media platform, Must be uploaded by using `GeneratePictureUploadUrl` */
      WIX_MEDIA = "WIX_MEDIA"
  }
  interface ContactActivity {
      /** Date and time of the last action. */
      activityDate?: Date | null;
      /** Contact's last action in the site. */
      activityType?: ContactActivityType;
      /**
       * Date and time of the activity.
       * @internal
       */
      date?: Date | null;
      /**
       * Activity description. Translated.
       * @internal
       */
      description?: string | null;
      /**
       * Activity Icon
       * @internal
       */
      icon?: ActivityIcon;
  }
  enum ContactActivityType {
      /** Visited the site. */
      GENERAL = "GENERAL",
      /** Became a new contact. */
      CONTACT_CREATED = "CONTACT_CREATED",
      /** Logged in. */
      MEMBER_LOGIN = "MEMBER_LOGIN",
      /** Requested a site membership. */
      MEMBER_REGISTER = "MEMBER_REGISTER",
      /** Was approved, blocked, or unblocked. */
      MEMBER_STATUS_CHANGED = "MEMBER_STATUS_CHANGED",
      /** Submitted a form. */
      FORM_SUBMITTED = "FORM_SUBMITTED",
      /** Started a chat. */
      INBOX_FORM_SUBMITTED = "INBOX_FORM_SUBMITTED",
      /** Paid a payment request. */
      INBOX_PAYMENT_REQUEST_PAID = "INBOX_PAYMENT_REQUEST_PAID",
      /** Received a message from the site. */
      INBOX_MESSAGE_TO_CUSTOMER = "INBOX_MESSAGE_TO_CUSTOMER",
      /** Sent a new message to the site. */
      INBOX_MESSAGE_FROM_CUSTOMER = "INBOX_MESSAGE_FROM_CUSTOMER",
      /** Subscribed to a site newsletter through a form. */
      NEWSLETTER_SUBSCRIPTION_FORM_SUBMITTED = "NEWSLETTER_SUBSCRIPTION_FORM_SUBMITTED",
      /** Unsubscribed from a site newsletter. */
      NEWSLETTER_SUBSCRIPTION_UNSUBSCRIBE = "NEWSLETTER_SUBSCRIPTION_UNSUBSCRIBE",
      /** Made a purchase. */
      ECOM_PURCHASE = "ECOM_PURCHASE",
      /** Abandoned a shopping cart. */
      ECOM_CART_ABANDON = "ECOM_CART_ABANDON",
      /** Checked out shopping cart and submitted buyer info (but didn’t complete the purchase yet). */
      ECOM_CHECKOUT_BUYER = "ECOM_CHECKOUT_BUYER",
      /** Booked an appointment. */
      BOOKINGS_APPOINTMENT = "BOOKINGS_APPOINTMENT",
      /** Made a Wix Hotels reservation. */
      HOTELS_RESERVATION = "HOTELS_RESERVATION",
      /** Paid for a Wix Hotels reservation. */
      HOTELS_PURCHASE = "HOTELS_PURCHASE",
      /** Confirmed a Wix Hotels reservation. */
      HOTELS_CONFIRMATION = "HOTELS_CONFIRMATION",
      /** Canceled a Wix Hotels reservation. */
      HOTELS_CANCEL = "HOTELS_CANCEL",
      /** Purchased a video. */
      VIDEO_PURCHASE = "VIDEO_PURCHASE",
      /** Rented a video. */
      VIDEO_RENT = "VIDEO_RENT",
      /** Made a purchase with a pay button. */
      CASHIER_BUTTON_PURCHASE = "CASHIER_BUTTON_PURCHASE",
      /** Became a new Wix Marketplace lead. */
      ARENA_NEW_LEAD = "ARENA_NEW_LEAD",
      /** RSVP'd to an event. */
      EVENTS_RSVP = "EVENTS_RSVP",
      /** Paid an invoice. */
      INVOICE_PAY = "INVOICE_PAY",
      /** An invoice is now overdue. */
      INVOICE_OVERDUE = "INVOICE_OVERDUE",
      /** Accepted a price quote. */
      PRICE_QUOTE_ACCEPT = "PRICE_QUOTE_ACCEPT",
      /** A price quote has expired. */
      PRICE_QUOTE_EXPIRE = "PRICE_QUOTE_EXPIRE",
      /** Ordered food with Wix Restaurants. */
      RESTAURANTS_ORDER = "RESTAURANTS_ORDER",
      /** Made a Wix Restaurants reservation. */
      RESTAURANTS_RESERVATION = "RESTAURANTS_RESERVATION",
      /** Opened an email from the site. */
      SHOUTOUT_OPEN = "SHOUTOUT_OPEN",
      /** Clicked a link in an email from the site. */
      SHOUTOUT_CLICK = "SHOUTOUT_CLICK",
      /** Merged with another contact. */
      CONTACT_MERGED = "CONTACT_MERGED",
      /** Subscribed to a site newsletter. */
      NEWSLETTER_SUBSCRIPTION_SUBSCRIBE = "NEWSLETTER_SUBSCRIPTION_SUBSCRIBE",
      /** Subscription status to site newsletters is pending confirmation. */
      NEWSLETTER_SUBSCRIPTION_PENDING = "NEWSLETTER_SUBSCRIPTION_PENDING",
      /** Subscription status to site newsletters is not set. */
      NEWSLETTER_SUBSCRIPTION_NOT_SET = "NEWSLETTER_SUBSCRIPTION_NOT_SET",
      /** Subscribed to phone notifications. */
      PHONE_SUBSCRIPTION_SUBSCRIBE = "PHONE_SUBSCRIPTION_SUBSCRIBE",
      /** Subscription to phone notificatons is pending confirmation. */
      PHONE_SUBSCRIPTION_PENDING = "PHONE_SUBSCRIPTION_PENDING",
      /** Subscription to phone notificatons is not set. */
      PHONE_SUBSCRIPTION_NOT_SET = "PHONE_SUBSCRIPTION_NOT_SET",
      /** Subscribed to phone notifications. */
      PHONE_SUBSCRIPTION_UNSUBSCRIBE = "PHONE_SUBSCRIPTION_UNSUBSCRIBE"
  }
  interface ActivityIcon {
      /** Icon name */
      name?: string | null;
      /** Icon url */
      url?: string | null;
  }
  interface SubmitContactOptions {
      /**
       * Overrides `visitorId`
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       */
      overrideVisitorId?: string | null;
      /**
       * Overrides `memberId`
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       */
      overrideMemberId?: string | null;
      /**
       * Overrides `app_id`
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       */
      overrideAppId?: string | null;
      /**
       * Indicates primary email is verified (first email on contact.emails)
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       */
      emailVerified?: boolean | null;
      /**
       * Indicates primary phone is verified (first phone on contact.phones)
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       */
      phoneVerified?: boolean | null;
      /**
       * Indicates if the process of creating/updating the contact should happen asynchronously.
       * In which case, the contact referenced by the returned `contactId` will only be available after a [Contact Submitted Domain Event](https://bo.wix.com/wix-docs/rest/crm/contacts/contacts-v4/contact-submitted-domain-event)
       * will be sent.
       * @internal
       */
      async?: boolean | null;
      /**
       * TODO: Not implemented yet
       * 1. Use contact type "app:ImplicitContact"
       * 2. Make sure GDPR handles it.
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       * @internal
       */
      hideFromContactList?: boolean | null;
  }
  interface SubmitContactResponse {
      /** ID of the contact that was found or created. */
      contactId?: string;
      /**
       * Identity type of the returned contact.
       *
       * - `CONTACT`: The returned contact ID belongs to a new or existing contact.
       * - `MEMBER`: The returned contact ID belongs to the currently logged-in site member.
       * - `NOT_AUTHENTICATED_MEMBER`: The returned contact ID belongs to a site member who is not currently logged in.
       */
      identityType?: IdentityType;
      /**
       * Indicates whether the contact was just created or already existed.
       *
       * If the contact was just created, returns `true`.
       * If it already existed, returns `false`.
       */
      newContact?: boolean;
  }
  enum IdentityType {
      UNKNOWN = "UNKNOWN",
      /** Existing or new contact */
      CONTACT = "CONTACT",
      /** Member is logged in, matching logic skipped */
      MEMBER = "MEMBER",
      /** Matching contact is a member, Merge logic won't be applied */
      NOT_AUTHENTICATED_MEMBER = "NOT_AUTHENTICATED_MEMBER"
  }
  interface ContactToSubmit {
      /**
       * reserved  6;
       * reserved  "raw_source";
       */
      contactInfo?: ContactInfo$1;
      /** Last activity */
      activity?: ContactActivity;
      /** Pass through data */
      passThroughData?: string | null;
      /** Contact Id */
      contactId?: string;
      /** Create/Update */
      submitOperation?: SubmitOperation;
      /**
       * Raw source
       * @deprecated
       */
      rawSource?: string | null;
      /** Need to resolve source in allocator, because of server sign */
      sourceType?: ContactSourceType;
      /** Source Id */
      sourceId?: string | null;
      /** Hide from contact list (implicit contact) */
      hideFromContactList?: boolean;
  }
  enum SubmitOperation {
      UNKNOWN = "UNKNOWN",
      CREATE = "CREATE",
      UPDATE = "UPDATE"
  }
  enum ContactSourceType {
      OTHER = "OTHER",
      ADMIN = "ADMIN",
      WIX_APP = "WIX_APP",
      IMPORT = "IMPORT",
      THIRD_PARTY = "THIRD_PARTY",
      WIX_BOOKINGS = "WIX_BOOKINGS",
      WIX_CHAT = "WIX_CHAT",
      WIX_EMAIL_MARKETING = "WIX_EMAIL_MARKETING",
      WIX_EVENTS = "WIX_EVENTS",
      WIX_FORMS = "WIX_FORMS",
      WIX_GROUPS = "WIX_GROUPS",
      WIX_HOTELS = "WIX_HOTELS",
      WIX_MARKET_PLACE = "WIX_MARKET_PLACE",
      WIX_MUSIC = "WIX_MUSIC",
      WIX_RESTAURANTS = "WIX_RESTAURANTS",
      WIX_SITE_MEMBERS = "WIX_SITE_MEMBERS",
      WIX_STORES = "WIX_STORES",
      WIX_CODE = "WIX_CODE",
      HOPP = "HOPP"
  }
  interface SubmitVisitorIdRequest {
      /** Existing Contact ID */
      contactId: string;
      /** The visitor ID to be attached to the given `contactId` */
      visitorId: string;
  }
  interface SubmitVisitorIdResponse {
      /** The mapped Contact ID */
      contactId?: string;
      /** The mapped visitor ID */
      visitorId?: string;
      /** Date in the `visitorId` was attached to the given `contactId` */
      validFrom?: Date | null;
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
   * Appends an existing contact or creates a contact if it doesn't exist.
   *
   * For internal docs, see
   * [Submit Contacts](crm.contact-submit-service.introduction).
   * @public
   * @documentationMaturity preview
   * @permissionId CONTACTS.SUBMIT
   */
  function appendOrCreateContact(options?: AppendOrCreateContactOptions): Promise<SubmitContactResponse>;
  interface AppendOrCreateContactOptions {
      /**
       * Contact's information.
       * To reconcile with an existing contact,
       * a phone or email must be provided,
       * or the current session identity must be attached to a contact or member.
       *
       * If no existing contact can be found,
       * a new contact is created with the specified information.
       *
       * <!--ONLY:REST-->
       * Required if there's no contextual identity or given `contactId`.
       * <!--END:ONLY:REST-->
       */
      info?: ContactInfo$1;
      /**
       * The activity that triggered this request (optional).
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       * @internal
       */
      activity?: ContactActivity;
      /** Pass through data, to be posted on Contact Submitted Domain Event (optional). */
      passThroughData?: string | null;
      /**
       * Existing Contact ID (optional).
       * Requires permission `CONTACTS.SUBMIT_WITH_OVERRIDES`
       */
      contactId?: string | null;
      /**
       * Additional submit options
       * @internal
       */
      options?: SubmitContactOptions;
  }
  /**
   * Submit visitor Id to be mapped to an existing contact Id.
   * If the visitorId already mapped to provided contactId, no action is performed
   * If no mapping exists, or visitor Id mapped to another contact Id,
   * new mapping will be created
   * @param contactId - Existing Contact ID
   * @param visitorId - The visitor ID to be attached to the given `contactId`
   * @internal
   * @documentationMaturity preview
   * @requiredField contactId
   * @requiredField visitorId
   * @permissionId CONTACTS.SUBMIT_VISITOR_ID
   * @adminMethod
   */
  function submitVisitorId(contactId: string, visitorId: string): Promise<SubmitVisitorIdResponse>;
  
  type contactsV4SubmitContact_universal_d_SubmitContact = SubmitContact;
  type contactsV4SubmitContact_universal_d_SubmitContactRequest = SubmitContactRequest;
  type contactsV4SubmitContact_universal_d_ContactName = ContactName;
  type contactsV4SubmitContact_universal_d_ContactEmailsWrapper = ContactEmailsWrapper;
  type contactsV4SubmitContact_universal_d_ContactEmail = ContactEmail;
  type contactsV4SubmitContact_universal_d_EmailTag = EmailTag;
  const contactsV4SubmitContact_universal_d_EmailTag: typeof EmailTag;
  type contactsV4SubmitContact_universal_d_ContactPhonesWrapper = ContactPhonesWrapper;
  type contactsV4SubmitContact_universal_d_ContactPhone = ContactPhone;
  type contactsV4SubmitContact_universal_d_PhoneTag = PhoneTag;
  const contactsV4SubmitContact_universal_d_PhoneTag: typeof PhoneTag;
  type contactsV4SubmitContact_universal_d_ContactAddressesWrapper = ContactAddressesWrapper;
  type contactsV4SubmitContact_universal_d_ContactAddress = ContactAddress;
  type contactsV4SubmitContact_universal_d_AddressTag = AddressTag;
  const contactsV4SubmitContact_universal_d_AddressTag: typeof AddressTag;
  type contactsV4SubmitContact_universal_d_Address = Address;
  type contactsV4SubmitContact_universal_d_AddressStreetOneOf = AddressStreetOneOf;
  type contactsV4SubmitContact_universal_d_StreetAddress = StreetAddress;
  type contactsV4SubmitContact_universal_d_AddressLocation = AddressLocation;
  type contactsV4SubmitContact_universal_d_Subdivision = Subdivision;
  type contactsV4SubmitContact_universal_d_SubdivisionType = SubdivisionType;
  const contactsV4SubmitContact_universal_d_SubdivisionType: typeof SubdivisionType;
  type contactsV4SubmitContact_universal_d_AssigneesWrapper = AssigneesWrapper;
  type contactsV4SubmitContact_universal_d_LabelsWrapper = LabelsWrapper;
  type contactsV4SubmitContact_universal_d_ExtendedFieldsWrapper = ExtendedFieldsWrapper;
  type contactsV4SubmitContact_universal_d_LocationsWrapper = LocationsWrapper;
  type contactsV4SubmitContact_universal_d_ContactPicture = ContactPicture;
  type contactsV4SubmitContact_universal_d_ImageProvider = ImageProvider;
  const contactsV4SubmitContact_universal_d_ImageProvider: typeof ImageProvider;
  type contactsV4SubmitContact_universal_d_ContactActivity = ContactActivity;
  type contactsV4SubmitContact_universal_d_ContactActivityType = ContactActivityType;
  const contactsV4SubmitContact_universal_d_ContactActivityType: typeof ContactActivityType;
  type contactsV4SubmitContact_universal_d_ActivityIcon = ActivityIcon;
  type contactsV4SubmitContact_universal_d_SubmitContactOptions = SubmitContactOptions;
  type contactsV4SubmitContact_universal_d_SubmitContactResponse = SubmitContactResponse;
  type contactsV4SubmitContact_universal_d_IdentityType = IdentityType;
  const contactsV4SubmitContact_universal_d_IdentityType: typeof IdentityType;
  type contactsV4SubmitContact_universal_d_ContactToSubmit = ContactToSubmit;
  type contactsV4SubmitContact_universal_d_SubmitOperation = SubmitOperation;
  const contactsV4SubmitContact_universal_d_SubmitOperation: typeof SubmitOperation;
  type contactsV4SubmitContact_universal_d_ContactSourceType = ContactSourceType;
  const contactsV4SubmitContact_universal_d_ContactSourceType: typeof ContactSourceType;
  type contactsV4SubmitContact_universal_d_SubmitVisitorIdRequest = SubmitVisitorIdRequest;
  type contactsV4SubmitContact_universal_d_SubmitVisitorIdResponse = SubmitVisitorIdResponse;
  const contactsV4SubmitContact_universal_d_appendOrCreateContact: typeof appendOrCreateContact;
  type contactsV4SubmitContact_universal_d_AppendOrCreateContactOptions = AppendOrCreateContactOptions;
  const contactsV4SubmitContact_universal_d_submitVisitorId: typeof submitVisitorId;
  namespace contactsV4SubmitContact_universal_d {
    export {
      contactsV4SubmitContact_universal_d_SubmitContact as SubmitContact,
      contactsV4SubmitContact_universal_d_SubmitContactRequest as SubmitContactRequest,
      ContactInfo$1 as ContactInfo,
      contactsV4SubmitContact_universal_d_ContactName as ContactName,
      contactsV4SubmitContact_universal_d_ContactEmailsWrapper as ContactEmailsWrapper,
      contactsV4SubmitContact_universal_d_ContactEmail as ContactEmail,
      contactsV4SubmitContact_universal_d_EmailTag as EmailTag,
      contactsV4SubmitContact_universal_d_ContactPhonesWrapper as ContactPhonesWrapper,
      contactsV4SubmitContact_universal_d_ContactPhone as ContactPhone,
      contactsV4SubmitContact_universal_d_PhoneTag as PhoneTag,
      contactsV4SubmitContact_universal_d_ContactAddressesWrapper as ContactAddressesWrapper,
      contactsV4SubmitContact_universal_d_ContactAddress as ContactAddress,
      contactsV4SubmitContact_universal_d_AddressTag as AddressTag,
      contactsV4SubmitContact_universal_d_Address as Address,
      contactsV4SubmitContact_universal_d_AddressStreetOneOf as AddressStreetOneOf,
      contactsV4SubmitContact_universal_d_StreetAddress as StreetAddress,
      contactsV4SubmitContact_universal_d_AddressLocation as AddressLocation,
      contactsV4SubmitContact_universal_d_Subdivision as Subdivision,
      contactsV4SubmitContact_universal_d_SubdivisionType as SubdivisionType,
      contactsV4SubmitContact_universal_d_AssigneesWrapper as AssigneesWrapper,
      contactsV4SubmitContact_universal_d_LabelsWrapper as LabelsWrapper,
      contactsV4SubmitContact_universal_d_ExtendedFieldsWrapper as ExtendedFieldsWrapper,
      contactsV4SubmitContact_universal_d_LocationsWrapper as LocationsWrapper,
      contactsV4SubmitContact_universal_d_ContactPicture as ContactPicture,
      contactsV4SubmitContact_universal_d_ImageProvider as ImageProvider,
      contactsV4SubmitContact_universal_d_ContactActivity as ContactActivity,
      contactsV4SubmitContact_universal_d_ContactActivityType as ContactActivityType,
      contactsV4SubmitContact_universal_d_ActivityIcon as ActivityIcon,
      contactsV4SubmitContact_universal_d_SubmitContactOptions as SubmitContactOptions,
      contactsV4SubmitContact_universal_d_SubmitContactResponse as SubmitContactResponse,
      contactsV4SubmitContact_universal_d_IdentityType as IdentityType,
      contactsV4SubmitContact_universal_d_ContactToSubmit as ContactToSubmit,
      contactsV4SubmitContact_universal_d_SubmitOperation as SubmitOperation,
      contactsV4SubmitContact_universal_d_ContactSourceType as ContactSourceType,
      contactsV4SubmitContact_universal_d_SubmitVisitorIdRequest as SubmitVisitorIdRequest,
      contactsV4SubmitContact_universal_d_SubmitVisitorIdResponse as SubmitVisitorIdResponse,
      MessageEnvelope$1 as MessageEnvelope,
      IdentificationData$1 as IdentificationData,
      IdentificationDataIdOneOf$1 as IdentificationDataIdOneOf,
      WebhookIdentityType$1 as WebhookIdentityType,
      contactsV4SubmitContact_universal_d_appendOrCreateContact as appendOrCreateContact,
      contactsV4SubmitContact_universal_d_AppendOrCreateContactOptions as AppendOrCreateContactOptions,
      contactsV4SubmitContact_universal_d_submitVisitorId as submitVisitorId,
    };
  }
  
  interface Task {
      /**
       * Task ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the task is updated. To prevent conflicting changes, the existing `revision` must be used when updating a task.
       * @readonly
       */
      revision?: string | null;
      /** Title of the task. */
      title?: string | null;
      /** Description of the task. */
      description?: string | null;
      /**
       * Date and time the task was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the task was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Due date for the task. */
      dueDate?: Date | null;
      /**
       * Status of the task.
       *
       * Default: `ACTION_NEEDED`
       */
      status?: TaskStatus;
      /** Details about the task source. */
      source?: TaskSource;
      /**
       * ID of user assigned to the task.
       * @internal
       */
      assigneeId?: string | null;
      /** Information about the contact associated with the task. */
      contact?: ContactInfo;
  }
  /** Possible statuses in which the task may be. */
  enum TaskStatus {
      /** Undefined task status. */
      UNKNOWN_STATUS = "UNKNOWN_STATUS",
      /** Action needed. */
      ACTION_NEEDED = "ACTION_NEEDED",
      /** Task completed. */
      COMPLETED = "COMPLETED"
  }
  interface TaskSource {
      /**
       * How the task was created.
       * @readonly
       */
      sourceType?: SourceType;
      /**
       * App ID, if the task was created by an app.
       * @readonly
       */
      appId?: string | null;
      /**
       * User ID, if the task was created by a Wix user.
       * @readonly
       */
      userId?: string | null;
  }
  /** Possible sources that can create tasks. */
  enum SourceType {
      /** Undefined source type. */
      UNKNOWN_SOURCE_TYPE = "UNKNOWN_SOURCE_TYPE",
      /** Task was created by an app. */
      APP = "APP",
      /** Task was created by a Wix user. */
      USER = "USER"
  }
  interface ContactInfo {
      /** ID of the contact associated with the task. */
      _id?: string | null;
      /**
       * Contact's first name.
       * @readonly
       */
      firstName?: string | null;
      /**
       * Contact's last name.
       * @readonly
       */
      lastName?: string | null;
      /**
       * Contact's image URL.
       * @readonly
       */
      imageUrl?: string | null;
      /**
       * Contact's primary email.
       * @readonly
       */
      email?: string | null;
      /**
       * Contact's primary phone.
       * @readonly
       */
      phone?: string | null;
  }
  interface DeleteCompletedTasksRequest {
      /** Optional list of tasks ids of the tasks to delete. If the list is not provided the filter is used. */
      taskIds?: string[];
      /** An optional filter of tasks to count. See 'queryTasks' for supported filter options. */
      filter?: Record<string, any> | null;
  }
  interface DeleteCompletedTasksResponse {
  }
  interface SendTasksReminderRequest {
      /** Ids of the tasks to remind */
      taskIds?: string[];
      /** The reminder type */
      reminderType?: ReminderType;
  }
  enum ReminderType {
      UNKNOWN_REMINDER_TYPE = "UNKNOWN_REMINDER_TYPE",
      FIRST_REMINDER = "FIRST_REMINDER",
      LAST_REMINDER = "LAST_REMINDER"
  }
  interface SendTasksReminderResponse {
  }
  interface RepositionTask {
      /** The id of the last task that was re-positioned */
      taskId?: string | null;
      /** The position of the last task that was re-positioned */
      position?: string | null;
  }
  interface TaskOverdue {
      /** The overdue task. */
      task?: Task;
  }
  interface TaskAssigned {
      /** The id of the assignee */
      assigneeId?: string;
      /** The task that was assigned */
      task?: Task;
  }
  interface CreateTaskRequest {
      /** Task to create. */
      task: Task;
  }
  interface CreateTaskResponse {
      /** The created task. */
      task?: Task;
  }
  interface ContactNotFoundError {
      contactId?: string;
  }
  interface GetTaskRequest {
      /** ID of the task to retrieve. */
      taskId: string;
  }
  interface GetTaskResponse {
      /** The retrieved task. */
      task?: Task;
  }
  interface UpdateTaskRequest {
      /** Task to update. */
      task: Task;
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  interface UpdateTaskResponse {
      /** The updated task. */
      task?: Task;
  }
  interface DeleteTaskRequest {
      /** ID of the task to delete. */
      taskId: string;
  }
  interface DeleteTaskResponse {
  }
  interface QueryTasksRequest {
      /** Query options. */
      query?: CursorQuery;
  }
  interface CursorQuery extends CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
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
      sort?: Sorting[];
  }
  /** @oneof */
  interface CursorQueryPagingMethodOneOf {
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
  }
  interface Sorting {
      /** Name of the field to sort by. */
      fieldName?: string;
      /** Sort order. */
      order?: SortOrder;
  }
  enum SortOrder {
      /** Sort by ascending order. */
      ASC = "ASC",
      /** Sort by descending order. */
      DESC = "DESC"
  }
  interface CursorPaging {
      /** Number of items to load. */
      limit?: number | null;
      /**
       * Pointer to the next or previous page in the list of results.
       *
       * You can get the relevant cursor token
       * from the `pagingMetadata` object in the previous call's response.
       * Not relevant for the first request.
       */
      cursor?: string | null;
  }
  interface QueryTasksResponse {
      /** The retrieved tasks. */
      tasks?: Task[];
      /** Paging metadata. */
      pagingMetadata?: CursorPagingMetadata;
  }
  interface CursorPagingMetadata {
      /** Number of items returned in the response. */
      count?: number | null;
      /** Offset that was requested. */
      cursors?: Cursors;
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       */
      hasNext?: boolean | null;
  }
  interface Cursors {
      /** Cursor pointing to next page in the list of results. */
      next?: string | null;
      /** Cursor pointing to previous page in the list of results. */
      prev?: string | null;
  }
  interface CountTasksRequest {
      /**
       * Filter which tasks to count. See the list of supported filters in `queryContacts`.
       *
       * Filterable fields include:
       * - `_id`
       * - `_createdDate`
       * - `_updatedDate`
       * - `dueDate`
       * - `status`
       * - `contact.id`
       */
      filter?: Record<string, any> | null;
  }
  interface CountTasksResponse {
      /** The number of tasks that match the specified filter. */
      count?: number;
  }
  interface QueryTasksInternalRequest {
      /** WQL expression */
      query?: QueryV2;
  }
  interface QueryV2 extends QueryV2PagingMethodOneOf {
      /** Paging options to limit and skip the number of items. */
      paging?: Paging;
      /** Cursor token pointing to a page of results. Not used in the first request. Following requests use the cursor token and not `filter` or `sort`. */
      cursorPaging?: CursorPaging;
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
  interface QueryTasksInternalResponse {
      /** The retrieved tasks. */
      tasks?: Task[];
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
      /**
       * Indicates if there are more results after the current page.
       * If `true`, another page of results can be retrieved.
       * If `false`, this is the last page.
       * @internal
       */
      hasNext?: boolean | null;
  }
  interface MoveTaskAfterRequest {
      /** ID of the task to move. */
      taskId: string;
      /**
       * The ID of the task after which the moved task is positioned in the task display.
       * If `beforeTaskId` is not specified, the moved task is positioned first in the task display.
       */
      beforeTaskId?: string | null;
  }
  interface MoveTaskAfterResponse {
  }
  interface TaskNotFoundError {
      /** The task id that was not found */
      taskId?: string;
  }
  interface Empty {
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
   * Creates a new task.
   *
   * All fields in the `task` object are optional. If you don't pass any fields in the `task` object, the function returns a task with the following core properties:
   * - `_id`
   * - `_createdDate`
   * - `_updatedDate`
   * - `status`
   * - `source`
   * - `revision`
   *
   * @param task - Task to create.
   * @public
   * @requiredField task
   * @permissionId CRM_TASKS.TASK_CREATE
   * @adminMethod
   * @returns The created task.
   */
  function createTask(task: Task): Promise<Task>;
  /**
   * Retrieves a task by ID.
   * @param taskId - ID of the task to retrieve.
   * @public
   * @requiredField taskId
   * @permissionId CRM_TASKS.TASK_READ
   * @adminMethod
   * @returns The retrieved task.
   */
  function getTask(taskId: string): Promise<Task>;
  /**
   * Updates a task.
   *
   * Each time the task is updated, `revision` increments by 1.
   * The existing `revision` must be included when updating the task.
   * This ensures you're working with the latest task
   * and prevents unintended overwrites.
   * @param _id - Task ID.
   * @public
   * @requiredField _id
   * @requiredField task
   * @requiredField task.revision
   * @param task - Task to update.
   * @permissionId CRM_TASKS.TASK_UPDATE
   * @adminMethod
   * @returns The updated task.
   */
  function updateTask(_id: string | null, task: UpdateTask, options?: UpdateTaskOptions): Promise<Task>;
  interface UpdateTask {
      /**
       * Task ID.
       * @readonly
       */
      _id?: string | null;
      /**
       * Revision number, which increments by 1 each time the task is updated. To prevent conflicting changes, the existing `revision` must be used when updating a task.
       * @readonly
       */
      revision?: string | null;
      /** Title of the task. */
      title?: string | null;
      /** Description of the task. */
      description?: string | null;
      /**
       * Date and time the task was created.
       * @readonly
       */
      _createdDate?: Date | null;
      /**
       * Date and time the task was last updated.
       * @readonly
       */
      _updatedDate?: Date | null;
      /** Due date for the task. */
      dueDate?: Date | null;
      /**
       * Status of the task.
       *
       * Default: `ACTION_NEEDED`
       */
      status?: TaskStatus;
      /** Details about the task source. */
      source?: TaskSource;
      /**
       * ID of user assigned to the task.
       * @internal
       */
      assigneeId?: string | null;
      /** Information about the contact associated with the task. */
      contact?: ContactInfo;
  }
  interface UpdateTaskOptions {
      /**
       * Explicit list of fields to update.
       * @internal
       */
      mask?: string[];
  }
  /**
   * Deletes a task by ID.
   * @param taskId - ID of the task to delete.
   * @public
   * @requiredField taskId
   * @permissionId CRM_TASKS.TASK_DELETE
   * @adminMethod
   */
  function deleteTask(taskId: string): Promise<void>;
  /**
   * Creates a query to retrieve a list of tasks.
   *
   * The `queryTasks()` function builds a query to retrieve a list of tasks and returns a `TasksQueryBuilder` object.
   *
   * The returned object contains the query definition which is typically used to run the query using the `find()` function. You can refine the query by chaining `TasksQueryBuilder` functions onto the query. `TasksQueryBuilder` functions enable you to sort, filter, and control the results that `queryTasks()` returns.
   *
   * `queryTasks()` runs with these `TasksQueryBuilder` defaults, which you can override:
   * - `limit(50)`
   * - `descending('_createdDate')`
   *
   * The functions that are chained to `queryTasks()` are applied in the order they are called. For example, if you apply `ascending('_createdDate')` and then `descending('_updatedDate')`, the results are sorted first by the created date and then, if there are multiple results with the same date, the items are sorted by the updated date.
   *
   * The following `TasksQueryBuilder` functions are supported for `queryTasks()`. For a full description of the `task` object, see the object returned for the `items` property in `TasksQueryResult`.
   * @public
   * @permissionId CRM_TASKS.TASK_READ
   * @adminMethod
   */
  function queryTasks(): TasksQueryBuilder;
  interface QueryCursorResult {
      cursors: Cursors;
      hasNext: () => boolean;
      hasPrev: () => boolean;
      length: number;
      pageSize: number;
  }
  interface TasksQueryResult extends QueryCursorResult {
      items: Task[];
      query: TasksQueryBuilder;
      next: () => Promise<TasksQueryResult>;
      prev: () => Promise<TasksQueryResult>;
  }
  interface TasksQueryBuilder {
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      eq: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'dueDate' | 'status' | 'contact.id', value: any) => TasksQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ne: (propertyName: '_id' | '_createdDate' | '_updatedDate' | 'dueDate' | 'status' | 'contact.id', value: any) => TasksQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      ge: (propertyName: '_createdDate' | '_updatedDate' | 'dueDate', value: any) => TasksQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      gt: (propertyName: '_createdDate' | '_updatedDate' | 'dueDate', value: any) => TasksQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      le: (propertyName: '_createdDate' | '_updatedDate' | 'dueDate', value: any) => TasksQueryBuilder;
      /** @param propertyName - Property whose value is compared with `value`.
       * @param value - Value to compare against.
       */
      lt: (propertyName: '_createdDate' | '_updatedDate' | 'dueDate', value: any) => TasksQueryBuilder;
      in: (propertyName: '_id' | 'status' | 'contact.id', value: any) => TasksQueryBuilder;
      exists: (propertyName: 'contact.id', value: boolean) => TasksQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      ascending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'dueDate'>) => TasksQueryBuilder;
      /** @param propertyNames - Properties used in the sort. To sort by multiple properties, pass properties as additional arguments. */
      descending: (...propertyNames: Array<'_id' | '_createdDate' | '_updatedDate' | 'dueDate'>) => TasksQueryBuilder;
      /** @param limit - Number of items to return, which is also the `pageSize` of the results object. */
      limit: (limit: number) => TasksQueryBuilder;
      /** @param cursor - A pointer to specific record */
      skipTo: (cursor: string) => TasksQueryBuilder;
      find: () => Promise<TasksQueryResult>;
  }
  /**
   * Counts the number of tasks.
   *
   *
   * This method returns the count of all tasks regardless of their `status`.
   *
   * Optionally, you can specify a filter to count only tasks that meet certain criteria.
   * @public
   * @param options - Filtering options.
   * @permissionId CRM_TASKS.TASK_READ
   * @adminMethod
   */
  function countTasks(options?: CountTasksOptions): Promise<CountTasksResponse>;
  interface CountTasksOptions {
      /**
       * Filter which tasks to count. See the list of supported filters in `queryContacts`.
       *
       * Filterable fields include:
       * - `_id`
       * - `_createdDate`
       * - `_updatedDate`
       * - `dueDate`
       * - `status`
       * - `contact.id`
       */
      filter?: Record<string, any> | null;
  }
  /**
   * Moves a task specified by ID to be placed after another task in the task display.
   *
   * You can reposition a task to be first in the display by omitting `beforeTaskId`.
   * @param taskId - ID of the task to move.
   * @public
   * @requiredField taskId
   * @param options - Options for moving the task.
   * @permissionId CRM_TASKS.TASK_UPDATE
   * @adminMethod
   */
  function moveTaskAfter(taskId: string, options?: MoveTaskAfterOptions): Promise<void>;
  interface MoveTaskAfterOptions {
      /**
       * The ID of the task after which the moved task is positioned in the task display.
       * If `beforeTaskId` is not specified, the moved task is positioned first in the task display.
       */
      beforeTaskId?: string | null;
  }
  
  type crmTasksV2Task_universal_d_Task = Task;
  type crmTasksV2Task_universal_d_TaskStatus = TaskStatus;
  const crmTasksV2Task_universal_d_TaskStatus: typeof TaskStatus;
  type crmTasksV2Task_universal_d_TaskSource = TaskSource;
  type crmTasksV2Task_universal_d_SourceType = SourceType;
  const crmTasksV2Task_universal_d_SourceType: typeof SourceType;
  type crmTasksV2Task_universal_d_ContactInfo = ContactInfo;
  type crmTasksV2Task_universal_d_DeleteCompletedTasksRequest = DeleteCompletedTasksRequest;
  type crmTasksV2Task_universal_d_DeleteCompletedTasksResponse = DeleteCompletedTasksResponse;
  type crmTasksV2Task_universal_d_SendTasksReminderRequest = SendTasksReminderRequest;
  type crmTasksV2Task_universal_d_ReminderType = ReminderType;
  const crmTasksV2Task_universal_d_ReminderType: typeof ReminderType;
  type crmTasksV2Task_universal_d_SendTasksReminderResponse = SendTasksReminderResponse;
  type crmTasksV2Task_universal_d_RepositionTask = RepositionTask;
  type crmTasksV2Task_universal_d_TaskOverdue = TaskOverdue;
  type crmTasksV2Task_universal_d_TaskAssigned = TaskAssigned;
  type crmTasksV2Task_universal_d_CreateTaskRequest = CreateTaskRequest;
  type crmTasksV2Task_universal_d_CreateTaskResponse = CreateTaskResponse;
  type crmTasksV2Task_universal_d_ContactNotFoundError = ContactNotFoundError;
  type crmTasksV2Task_universal_d_GetTaskRequest = GetTaskRequest;
  type crmTasksV2Task_universal_d_GetTaskResponse = GetTaskResponse;
  type crmTasksV2Task_universal_d_UpdateTaskRequest = UpdateTaskRequest;
  type crmTasksV2Task_universal_d_UpdateTaskResponse = UpdateTaskResponse;
  type crmTasksV2Task_universal_d_DeleteTaskRequest = DeleteTaskRequest;
  type crmTasksV2Task_universal_d_DeleteTaskResponse = DeleteTaskResponse;
  type crmTasksV2Task_universal_d_QueryTasksRequest = QueryTasksRequest;
  type crmTasksV2Task_universal_d_CursorQuery = CursorQuery;
  type crmTasksV2Task_universal_d_CursorQueryPagingMethodOneOf = CursorQueryPagingMethodOneOf;
  type crmTasksV2Task_universal_d_Sorting = Sorting;
  type crmTasksV2Task_universal_d_SortOrder = SortOrder;
  const crmTasksV2Task_universal_d_SortOrder: typeof SortOrder;
  type crmTasksV2Task_universal_d_CursorPaging = CursorPaging;
  type crmTasksV2Task_universal_d_QueryTasksResponse = QueryTasksResponse;
  type crmTasksV2Task_universal_d_CursorPagingMetadata = CursorPagingMetadata;
  type crmTasksV2Task_universal_d_Cursors = Cursors;
  type crmTasksV2Task_universal_d_CountTasksRequest = CountTasksRequest;
  type crmTasksV2Task_universal_d_CountTasksResponse = CountTasksResponse;
  type crmTasksV2Task_universal_d_QueryTasksInternalRequest = QueryTasksInternalRequest;
  type crmTasksV2Task_universal_d_QueryV2 = QueryV2;
  type crmTasksV2Task_universal_d_QueryV2PagingMethodOneOf = QueryV2PagingMethodOneOf;
  type crmTasksV2Task_universal_d_Paging = Paging;
  type crmTasksV2Task_universal_d_QueryTasksInternalResponse = QueryTasksInternalResponse;
  type crmTasksV2Task_universal_d_PagingMetadataV2 = PagingMetadataV2;
  type crmTasksV2Task_universal_d_MoveTaskAfterRequest = MoveTaskAfterRequest;
  type crmTasksV2Task_universal_d_MoveTaskAfterResponse = MoveTaskAfterResponse;
  type crmTasksV2Task_universal_d_TaskNotFoundError = TaskNotFoundError;
  type crmTasksV2Task_universal_d_Empty = Empty;
  type crmTasksV2Task_universal_d_DomainEvent = DomainEvent;
  type crmTasksV2Task_universal_d_DomainEventBodyOneOf = DomainEventBodyOneOf;
  type crmTasksV2Task_universal_d_EntityCreatedEvent = EntityCreatedEvent;
  type crmTasksV2Task_universal_d_RestoreInfo = RestoreInfo;
  type crmTasksV2Task_universal_d_EntityUpdatedEvent = EntityUpdatedEvent;
  type crmTasksV2Task_universal_d_EntityDeletedEvent = EntityDeletedEvent;
  type crmTasksV2Task_universal_d_ActionEvent = ActionEvent;
  type crmTasksV2Task_universal_d_MessageEnvelope = MessageEnvelope;
  type crmTasksV2Task_universal_d_IdentificationData = IdentificationData;
  type crmTasksV2Task_universal_d_IdentificationDataIdOneOf = IdentificationDataIdOneOf;
  type crmTasksV2Task_universal_d_WebhookIdentityType = WebhookIdentityType;
  const crmTasksV2Task_universal_d_WebhookIdentityType: typeof WebhookIdentityType;
  const crmTasksV2Task_universal_d_createTask: typeof createTask;
  const crmTasksV2Task_universal_d_getTask: typeof getTask;
  const crmTasksV2Task_universal_d_updateTask: typeof updateTask;
  type crmTasksV2Task_universal_d_UpdateTask = UpdateTask;
  type crmTasksV2Task_universal_d_UpdateTaskOptions = UpdateTaskOptions;
  const crmTasksV2Task_universal_d_deleteTask: typeof deleteTask;
  const crmTasksV2Task_universal_d_queryTasks: typeof queryTasks;
  type crmTasksV2Task_universal_d_TasksQueryResult = TasksQueryResult;
  type crmTasksV2Task_universal_d_TasksQueryBuilder = TasksQueryBuilder;
  const crmTasksV2Task_universal_d_countTasks: typeof countTasks;
  type crmTasksV2Task_universal_d_CountTasksOptions = CountTasksOptions;
  const crmTasksV2Task_universal_d_moveTaskAfter: typeof moveTaskAfter;
  type crmTasksV2Task_universal_d_MoveTaskAfterOptions = MoveTaskAfterOptions;
  namespace crmTasksV2Task_universal_d {
    export {
      crmTasksV2Task_universal_d_Task as Task,
      crmTasksV2Task_universal_d_TaskStatus as TaskStatus,
      crmTasksV2Task_universal_d_TaskSource as TaskSource,
      crmTasksV2Task_universal_d_SourceType as SourceType,
      crmTasksV2Task_universal_d_ContactInfo as ContactInfo,
      crmTasksV2Task_universal_d_DeleteCompletedTasksRequest as DeleteCompletedTasksRequest,
      crmTasksV2Task_universal_d_DeleteCompletedTasksResponse as DeleteCompletedTasksResponse,
      crmTasksV2Task_universal_d_SendTasksReminderRequest as SendTasksReminderRequest,
      crmTasksV2Task_universal_d_ReminderType as ReminderType,
      crmTasksV2Task_universal_d_SendTasksReminderResponse as SendTasksReminderResponse,
      crmTasksV2Task_universal_d_RepositionTask as RepositionTask,
      crmTasksV2Task_universal_d_TaskOverdue as TaskOverdue,
      crmTasksV2Task_universal_d_TaskAssigned as TaskAssigned,
      crmTasksV2Task_universal_d_CreateTaskRequest as CreateTaskRequest,
      crmTasksV2Task_universal_d_CreateTaskResponse as CreateTaskResponse,
      crmTasksV2Task_universal_d_ContactNotFoundError as ContactNotFoundError,
      crmTasksV2Task_universal_d_GetTaskRequest as GetTaskRequest,
      crmTasksV2Task_universal_d_GetTaskResponse as GetTaskResponse,
      crmTasksV2Task_universal_d_UpdateTaskRequest as UpdateTaskRequest,
      crmTasksV2Task_universal_d_UpdateTaskResponse as UpdateTaskResponse,
      crmTasksV2Task_universal_d_DeleteTaskRequest as DeleteTaskRequest,
      crmTasksV2Task_universal_d_DeleteTaskResponse as DeleteTaskResponse,
      crmTasksV2Task_universal_d_QueryTasksRequest as QueryTasksRequest,
      crmTasksV2Task_universal_d_CursorQuery as CursorQuery,
      crmTasksV2Task_universal_d_CursorQueryPagingMethodOneOf as CursorQueryPagingMethodOneOf,
      crmTasksV2Task_universal_d_Sorting as Sorting,
      crmTasksV2Task_universal_d_SortOrder as SortOrder,
      crmTasksV2Task_universal_d_CursorPaging as CursorPaging,
      crmTasksV2Task_universal_d_QueryTasksResponse as QueryTasksResponse,
      crmTasksV2Task_universal_d_CursorPagingMetadata as CursorPagingMetadata,
      crmTasksV2Task_universal_d_Cursors as Cursors,
      crmTasksV2Task_universal_d_CountTasksRequest as CountTasksRequest,
      crmTasksV2Task_universal_d_CountTasksResponse as CountTasksResponse,
      crmTasksV2Task_universal_d_QueryTasksInternalRequest as QueryTasksInternalRequest,
      crmTasksV2Task_universal_d_QueryV2 as QueryV2,
      crmTasksV2Task_universal_d_QueryV2PagingMethodOneOf as QueryV2PagingMethodOneOf,
      crmTasksV2Task_universal_d_Paging as Paging,
      crmTasksV2Task_universal_d_QueryTasksInternalResponse as QueryTasksInternalResponse,
      crmTasksV2Task_universal_d_PagingMetadataV2 as PagingMetadataV2,
      crmTasksV2Task_universal_d_MoveTaskAfterRequest as MoveTaskAfterRequest,
      crmTasksV2Task_universal_d_MoveTaskAfterResponse as MoveTaskAfterResponse,
      crmTasksV2Task_universal_d_TaskNotFoundError as TaskNotFoundError,
      crmTasksV2Task_universal_d_Empty as Empty,
      crmTasksV2Task_universal_d_DomainEvent as DomainEvent,
      crmTasksV2Task_universal_d_DomainEventBodyOneOf as DomainEventBodyOneOf,
      crmTasksV2Task_universal_d_EntityCreatedEvent as EntityCreatedEvent,
      crmTasksV2Task_universal_d_RestoreInfo as RestoreInfo,
      crmTasksV2Task_universal_d_EntityUpdatedEvent as EntityUpdatedEvent,
      crmTasksV2Task_universal_d_EntityDeletedEvent as EntityDeletedEvent,
      crmTasksV2Task_universal_d_ActionEvent as ActionEvent,
      crmTasksV2Task_universal_d_MessageEnvelope as MessageEnvelope,
      crmTasksV2Task_universal_d_IdentificationData as IdentificationData,
      crmTasksV2Task_universal_d_IdentificationDataIdOneOf as IdentificationDataIdOneOf,
      crmTasksV2Task_universal_d_WebhookIdentityType as WebhookIdentityType,
      crmTasksV2Task_universal_d_createTask as createTask,
      crmTasksV2Task_universal_d_getTask as getTask,
      crmTasksV2Task_universal_d_updateTask as updateTask,
      crmTasksV2Task_universal_d_UpdateTask as UpdateTask,
      crmTasksV2Task_universal_d_UpdateTaskOptions as UpdateTaskOptions,
      crmTasksV2Task_universal_d_deleteTask as deleteTask,
      crmTasksV2Task_universal_d_queryTasks as queryTasks,
      crmTasksV2Task_universal_d_TasksQueryResult as TasksQueryResult,
      crmTasksV2Task_universal_d_TasksQueryBuilder as TasksQueryBuilder,
      crmTasksV2Task_universal_d_countTasks as countTasks,
      crmTasksV2Task_universal_d_CountTasksOptions as CountTasksOptions,
      crmTasksV2Task_universal_d_moveTaskAfter as moveTaskAfter,
      crmTasksV2Task_universal_d_MoveTaskAfterOptions as MoveTaskAfterOptions,
    };
  }
  
  export { contactsV4Attachment_universal_d as attachments, contactsV4Contact_universal_d as contacts, contactsV4ExtendedField_universal_d as extendedFields, contactsV4Label_universal_d as labels, contactsV4SubmitContact_universal_d as submittedContact, crmTasksV2Task_universal_d as tasks };
}
