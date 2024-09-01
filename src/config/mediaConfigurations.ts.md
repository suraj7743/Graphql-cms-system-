## Media Configurations Documentation 

**Table of Contents** 
* [Overview](#overview)
* [Configuration Interface](#configuration-interface)
* [Media Configuration Map](#media-configuration-map)

### Overview 

This module defines configurations for media uploads, including maximum file size and supported extensions. The configuration is mapped by the `MediaType` enum, allowing for flexible and specific settings for different media types.

### Configuration Interface

The `MediaConfig` interface defines the structure for media configurations:

| Property | Type | Description |
|---|---|---|
| `maxFileSize` | `number` | The maximum allowed file size in bytes. |
| `supportedExtensions` | `string[]` | An array of supported file extensions. |

### Media Configuration Map

The `MediaConfigurations` object maps each `MediaType` to its corresponding `MediaConfig`:

| MediaType | maxFileSize | supportedExtensions |
|---|---|---|
| `MediaType.PROPOSAL` | 3 * 1024 * 1024 (3MB) | `["jpg", "jpeg", "png"]` |
| `MediaType.USER_AVATAR` | 3 * 1024 * 1024 (3MB) | `["jpg", "jpeg", "png"]` |
| `MediaType.USER_DOCUMENT` | 3 * 1024 * 1024 (3MB) | `["jpg", "jpeg", "png"]` |
| `MediaType.LOGO` | 3 * 1024 * 1024 (3MB) | `["jpg", "jpeg", "png"]` |

**Note:** All media types currently have a maximum file size of 3MB and support the following extensions: `jpg`, `jpeg`, and `png`. 
