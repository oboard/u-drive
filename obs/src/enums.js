export const AclPrivate = 'private';
export const AclPublicRead = 'public-read';
export const AclPublicReadWrite = 'public-read-write';
export const AclPublicReadDelivered = 'public-read-delivered';
export const AclPublicReadWriteDelivered = 'public-read-write-delivered';
export const AclAuthenticatedRead = 'authenticated-read';
export const AclBucketOwnerRead = 'bucket-owner-read';
export const AclBucketOwnerFullControl = 'bucket-owner-full-control';
export const AclLogDeliveryWrite = 'log-delivery-write';

export const StorageClassStandard = 'STANDARD';
export const StorageClassWarm = 'WARM';
export const StorageClassCold = 'COLD';
export const StorageClassDeepArchive = 'DEEP_ARCHIVE';

export const PermissionRead = 'READ';
export const PermissionWrite = 'WRITE';
export const PermissionReadAcp = 'READ_ACP';
export const PermissionWriteAcp = 'WRITE_ACP';
export const PermissionFullControl = 'FULL_CONTROL';

export const GroupAllUsers = 'AllUsers';
export const GroupAuthenticatedUsers = 'AuthenticatedUsers';
export const GroupLogDelivery = 'LogDelivery';

export const RestoreTierExpedited = 'Expedited';
export const RestoreTierStandard = 'Standard';
export const RestoreTierBulk = 'Bulk';

export const GranteeGroup = 'Group';
export const GranteeUser = 'CanonicalUser';

export const CopyMetadata = 'COPY';
export const ReplaceMetadata = 'REPLACE';

export const EventObjectCreatedAll = 'ObjectCreated:*';
export const EventObjectCreatedPut = 'ObjectCreated:Put';
export const EventObjectCreatedPost = 'ObjectCreated:Post';
export const EventObjectCreatedCopy = 'ObjectCreated:Copy';
export const EventObjectCreatedCompleteMultipartUpload = 'ObjectCreated:CompleteMultipartUpload';
export const EventObjectRemovedAll = 'ObjectRemoved:*';
export const EventObjectRemovedDelete = 'ObjectRemoved:Delete';
export const EventObjectRemovedDeleteMarkerCreated = 'ObjectRemoved:DeleteMarkerCreated';

export const ContentMD5 = 'Content-MD5';
export const ContentSHA256 = 'Content-SHA256';