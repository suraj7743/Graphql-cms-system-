## Media Configuration

**Table of Contents**

* [Overview](#overview)
* [Interface: MediaConfig](#interface-mediaconfig)
* [Enum: MediaType](#enum-mediatype)
* [Constant: MediaConfigurations](#constant-mediaconfigurations)

### Overview

This code defines the configuration settings for media uploads in the application. It specifies the maximum allowed file size and supported file extensions for different media types.

### Interface: MediaConfig

This interface defines the structure for media configuration settings.

| Property | Data Type | Description |
|---|---|---|
| `maxFileSize` | `number` | Maximum allowed file size in bytes. |
| `supportedExtensions` | `string[]` | Array of supported file extensions. |

### Enum: MediaType

This enum defines the different media types used in the application.

| Enum Value | Description |
|---|---|
| `PROPOSAL` | Media related to proposals. |
| `USER_AVATAR` | Media related to user avatars. |
| `USER_DOCUMENT` | Media related to user documents. |
| `LOGO` | Media related to logos. |

### Constant: MediaConfigurations

This constant object stores the configuration settings for each media type.

| MediaType | Max File Size | Supported Extensions |
|---|---|---|
| `PROPOSAL` | 3 MB | `jpg`, `jpeg`, `png` |
| `USER_AVATAR` | 3 MB | `jpg`, `jpeg`, `png` |
| `USER_DOCUMENT` | 3 MB | `jpg`, `jpeg`, `png` |
| `LOGO` | 3 MB | `jpg`, `jpeg`, `png` |

**Note:** The file size limit is currently set to 3 MB for all media types. The supported extensions are also currently limited to `jpg`, `jpeg`, and `png`. These settings can be adjusted based on application requirements. 
